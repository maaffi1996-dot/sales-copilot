"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { trendData } from "@/lib/sampleData";

export default function TrendChart() {
  return (
    <div className="bg-white border border-lilacLine rounded-[18px] p-[22px]">
      <h3 className="text-[14.5px] font-bold mb-4">روند فروش ۶ ماه اخیر</h3>
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={trendData}>
          <CartesianGrid vertical={false} stroke="#E3DAF5" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v} م`} />
          <Tooltip formatter={(v: number) => `${v} میلیون تومان`} />
          <Line type="monotone" dataKey="total" stroke="#6B21A8" strokeWidth={2.5} dot={{ r: 4, fill: "#6B21A8" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
