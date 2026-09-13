"use client";

import { useState } from "react";
import { dashboardContext } from "@/lib/sampleData";
import type { AskResponse } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const suggestions = [
  "کدام شعبه بیشترین افت را داشته؟",
  "پیش‌بینی ماه آینده چیست؟",
  "بهترین فروشنده اخیر کیست؟",
];

export default function AskBar() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function ask(q: string) {
    setQuestion(q);
    setLoading(true);
    setAnswer(null);
    try {
      const res = await fetch(`${API_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, context: dashboardContext }),
      });
      if (!res.ok) throw new Error();
      const data: AskResponse = await res.json();
      setAnswer(data.answer);
    } catch {
      setAnswer("اتصال به سرویس تحلیل با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-7">
      <div className="flex items-center gap-4 flex-wrap mb-4">
        <h1 className="text-[22px] font-extrabold m-0">داشبورد</h1>
        <div className="flex-1 min-w-[240px] flex items-center gap-2.5 bg-white border border-lilacLine rounded-[13px] px-3.5 py-2.5">
          <span className="text-violet text-[15px]">🔍</span>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && question.trim()) ask(question.trim()); }}
            placeholder="از داده‌هات هر چیزی بپرس..."
            className="flex-1 border-none outline-none bg-transparent text-sm placeholder:text-inkFaint"
          />
        </div>
        <button className="bg-violet hover:bg-violetDeep text-white rounded-xl px-[18px] py-[11px] font-bold text-sm whitespace-nowrap transition">
          ⬆ آپلود فایل جدید
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => ask(s)}
            className="bg-lilac hover:bg-lilacLine text-violetDeep rounded-full px-3.5 py-[7px] text-[13px] font-semibold transition"
          >
            {s}
          </button>
        ))}
      </div>

      {(loading || answer) && (
        <div className="bg-gradient-to-b from-lilac to-white border border-lilacLine rounded-2xl px-5 pt-5 pb-4 mb-2 text-[14.5px] leading-[1.85]">
          <div className="text-[12.5px] font-bold text-violetDeep mb-2">🔍 پاسخ هوش مصنوعی</div>
          <div>{loading ? "در حال جست‌وجو در داده‌های فروش..." : answer}</div>
        </div>
      )}
    </div>
  );
}
