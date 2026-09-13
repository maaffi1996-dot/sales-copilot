"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { branchData } from "@/lib/sampleData";

const colors = ["#6B21A8", "#A21B6D", "#A21B6D", "#8B5CF6"];

export default function BranchChart() {
  return (
    <div className="bg-white border border-lilacLine rounded-[18px] p-[22px]">
      <h3 className="text-[14.5px] font-bold mb-4">مقایسه شعبه‌ها (ماه جاری)</h3>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={branchData}>
          <XAxis dataKey="branch" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v} م`} />
          <Tooltip formatter={(v: number) => `${v} میلیون تومان`} />
          <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={44}>
            {branchData.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
