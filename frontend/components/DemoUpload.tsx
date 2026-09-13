"use client";

import { useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { AnalyzeResponse } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function downloadTemplate() {
  const rows = [
    ["ماه", "شعبه یا محصول", "مبلغ فروش (تومان)", "تعداد فروش"],
    ["1404/03", "شعبه مرکزی", "850000000", "420"],
    ["1404/03", "شعبه غرب", "410000000", "190"],
    ["1404/04", "شعبه مرکزی", "790000000", "388"],
    ["1404/04", "شعبه غرب", "430000000", "201"],
    ["1404/05", "شعبه مرکزی", "610000000", "305"],
    ["1404/05", "شعبه غرب", "445000000", "208"],
  ];
  const csv = "\uFEFF" + rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "نمونه-فروش.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("fa-IR");
}

export default function DemoUpload() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setStatus("loading");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${API_URL}/api/analyze`, { method: "POST", body: form });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || "پردازش فایل با خطا مواجه شد.");
      }
      const data: AnalyzeResponse = await res.json();
      setResult(data);
      setStatus("done");
    } catch (err: any) {
      setError(err.message || "خطای غیرمنتظره رخ داد.");
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setResult(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  const chartData =
    result?.months.map((m, i) => {
      const prev = result.months[i - 1]?.total;
      return { month: m.month, total: m.total, down: prev !== undefined && m.total < prev };
    }) ?? [];

  return (
    <section id="demo" className="max-w-5xl mx-auto px-6 pb-24">
      <div className="bg-bgWash border border-lilacLine rounded-[26px] p-2.5 shadow-[0_30px_60px_-30px_rgba(76,24,99,0.25)]">
        <div className="flex gap-1.5 px-4 py-3">
          <span className="w-2.5 h-2.5 rounded-full bg-lilacLine" />
          <span className="w-2.5 h-2.5 rounded-full bg-lilacLine" />
          <span className="w-2.5 h-2.5 rounded-full bg-lilacLine" />
        </div>
        <div className="bg-white rounded-[18px] px-8 py-9">
          <div className="text-[13.5px] font-bold text-violet mb-1">مرحله تعاملی</div>
          <h2 className="text-[22px] font-extrabold mb-2">یک فایل نمونه بده، نتیجه رو همین‌جا ببین</h2>
          <p className="text-inkSoft text-[14.5px] mb-6 max-w-[60ch]">
            فایل نمونه رو دانلود کن، با اطلاعات خودت پر کن (حداقل ۲ ماه)، و دوباره همین‌جا آپلودش کن.
          </p>

          {status === "idle" || status === "error" ? (
            <>
              <div className="flex flex-wrap gap-3 mb-5">
                <button
                  onClick={downloadTemplate}
                  className="rounded-xl bg-lilac text-violetDeep font-bold text-sm px-5 py-2.5 hover:bg-lilacLine transition"
                >
                  ⬇ دانلود فایل نمونه
                </button>
              </div>
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const f = e.dataTransfer.files[0];
                  if (f) handleFile(f);
                }}
                className={`border-2 border-dashed rounded-2xl py-9 px-5 text-center cursor-pointer transition ${
                  dragOver ? "border-violetBright bg-lilac" : "border-lilacLine"
                }`}
              >
                <div className="text-2xl mb-2">📄</div>
                <div className="font-bold text-[15px]">فایل رو اینجا رها کن یا کلیک کن</div>
                <div className="text-[13px] text-inkFaint mt-1">فرمت‌های .xlsx و .csv پشتیبانی می‌شوند</div>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
              {error && (
                <div className="mt-3.5 bg-roseSoft text-rose rounded-xl px-4 py-3 text-sm font-semibold">
                  {error}
                </div>
              )}
            </>
          ) : status === "loading" ? (
            <div className="text-center py-11">
              <div className="w-8 h-8 mx-auto mb-4 rounded-full border-[3px] border-lilacLine border-t-violet animate-spin" />
              <div className="text-inkSoft font-semibold text-[14.5px]">در حال پردازش داده‌های فروش...</div>
            </div>
          ) : result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                <div className="bg-bgWash border border-lilacLine rounded-2xl px-4 py-4">
                  <div className="text-xs font-semibold text-inkSoft mb-2">فروش آخرین ماه</div>
                  <div className="font-mono text-[21px] font-semibold">
                    {fmt(result.months[result.months.length - 1]?.total ?? 0)} تومان
                  </div>
                </div>
                <div className="bg-bgWash border border-lilacLine rounded-2xl px-4 py-4">
                  <div className="text-xs font-semibold text-inkSoft mb-2">تغییر نسبت به ماه قبل</div>
                  <div className={`font-mono text-[21px] font-semibold ${
                    result.growth_pct !== null && result.growth_pct < 0 ? "text-rose" : "text-violet"
                  }`}>
                    {result.growth_pct === null ? "—" : `${result.growth_pct >= 0 ? "▲" : "▼"} ${Math.abs(result.growth_pct).toFixed(1)}٪`}
                  </div>
                </div>
                <div className="bg-bgWash border border-lilacLine rounded-2xl px-4 py-4">
                  <div className="text-xs font-semibold text-inkSoft mb-2">ماه‌های ثبت‌شده</div>
                  <div className="font-mono text-[21px] font-semibold">{result.months.length.toLocaleString("fa-IR")}</div>
                </div>
              </div>

              <div className="border border-lilacLine rounded-2xl p-5 mb-4">
                <h3 className="text-[13.5px] font-bold text-inkSoft mb-3">روند فروش ماهانه</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false}
                      tickFormatter={(v) => `${(v / 1_000_000).toLocaleString("fa-IR")} م`} />
                    <Tooltip formatter={(v: number) => `${fmt(v)} تومان`} />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                      {chartData.map((d, i) => (
                        <Cell key={i} fill={d.down ? "#A21B6D" : "#6B21A8"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gradient-to-b from-lilac to-white rounded-2xl border border-lilacLine px-5 pt-5 pb-4">
                <div className="text-[12.5px] font-bold text-violetDeep mb-2.5">🔍 تحلیل و پیشنهاد</div>
                <div className="text-[15px] leading-[1.85] whitespace-pre-wrap">{result.insight}</div>
              </div>

              <div className="text-center mt-5">
                <button onClick={reset} className="text-inkSoft text-[13.5px] font-bold underline">
                  آپلود یک فایل دیگه
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
