from typing import List, Optional
from pydantic import BaseModel


class MonthTotal(BaseModel):
    month: str
    total: float


class CategoryDelta(BaseModel):
    category: str
    current: float
    previous: float
    delta: float


class AnalyzeResponse(BaseModel):
    months: List[MonthTotal]
    growth_pct: Optional[float]
    category_deltas: List[CategoryDelta]
    insight: str


class AskRequest(BaseModel):
    question: str
    context: str


class AskResponse(BaseModel):
    answer: str
