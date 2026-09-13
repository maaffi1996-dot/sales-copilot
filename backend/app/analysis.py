"""
Parses an uploaded sales file (xlsx/csv) and produces the same monthly
aggregation + branch/product deltas the earlier HTML prototype computed
client-side in JavaScript -- now done server-side with pandas so it can
safely handle real, larger files.
"""
from io import BytesIO
from typing import Optional

import pandas as pd
from fastapi import HTTPException


MONTH_KEYWORDS = ["ماه"]
CATEGORY_KEYWORDS = ["شعبه", "محصول"]
AMOUNT_KEYWORDS = ["مبلغ"]


def _find_column(columns, keywords) -> Optional[str]:
    for col in columns:
        col_str = str(col)
        if any(k in col_str for k in keywords):
            return col
    return None


def read_uploaded_file(filename: str, raw_bytes: bytes) -> pd.DataFrame:
    lower = filename.lower()
    try:
        if lower.endswith(".csv"):
            return pd.read_csv(BytesIO(raw_bytes))
        return pd.read_excel(BytesIO(raw_bytes))
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=400,
            detail="خواندن فایل با خطا مواجه شد. فرمت .xlsx یا .csv را بررسی کن.",
        ) from exc


def analyze_sales(df: pd.DataFrame) -> dict:
    if df.empty:
        raise HTTPException(status_code=400, detail="فایل خالی به نظر می‌رسد.")

    month_col = _find_column(df.columns, MONTH_KEYWORDS)
    amount_col = _find_column(df.columns, AMOUNT_KEYWORDS)
    category_col = _find_column(df.columns, CATEGORY_KEYWORDS)

    if month_col is None or amount_col is None:
        raise HTTPException(
            status_code=400,
            detail="ستون «ماه» یا «مبلغ فروش» در فایل پیدا نشد. از فایل نمونه استفاده کن.",
        )

    work = df[[month_col, amount_col] + ([category_col] if category_col else [])].copy()
    work.columns = ["month", "amount"] + (["category"] if category_col else [])
    work["month"] = work["month"].astype(str).str.strip()
    work["amount"] = (
        work["amount"].astype(str).str.replace(",", "").str.replace(" ", "")
    )
    work["amount"] = pd.to_numeric(work["amount"], errors="coerce").fillna(0)
    if "category" not in work.columns:
        work["category"] = "کل"
    work = work[work["month"] != ""]

    if work.empty:
        raise HTTPException(status_code=400, detail="هیچ ردیف معتبری پیدا نشد.")

    # preserve first-appearance order of months (assumes user enters them chronologically)
    month_order = list(dict.fromkeys(work["month"].tolist()))
    monthly_totals = work.groupby("month")["amount"].sum().to_dict()
    months = [{"month": m, "total": float(monthly_totals[m])} for m in month_order]

    last_month = month_order[-1]
    prev_month = month_order[-2] if len(month_order) > 1 else None
    last_total = monthly_totals[last_month]
    prev_total = monthly_totals.get(prev_month) if prev_month else None
    growth_pct = (
        ((last_total - prev_total) / prev_total * 100) if prev_total else None
    )

    category_deltas = []
    if prev_month:
        pivot = work.groupby(["month", "category"])["amount"].sum()
        cats = set(work["category"].unique())
        for cat in cats:
            cur = float(pivot.get((last_month, cat), 0))
            prev = float(pivot.get((prev_month, cat), 0))
            category_deltas.append(
                {"category": cat, "current": cur, "previous": prev, "delta": cur - prev}
            )
        category_deltas.sort(key=lambda d: d["delta"])

    return {
        "months": months,
        "growth_pct": growth_pct,
        "category_deltas": category_deltas[:5],
    }
