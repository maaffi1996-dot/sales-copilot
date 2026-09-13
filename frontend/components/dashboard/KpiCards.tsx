import { kpis } from "@/lib/sampleData";

export default function KpiCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      {kpis.map((k) => (
        <div key={k.label} className="bg-white border border-lilacLine rounded-2xl px-5 py-[18px]">
          <div className="text-[12.5px] font-semibold text-inkSoft mb-2.5">{k.label}</div>
          <div className={`font-mono text-[23px] font-semibold ${k.trend === "down" ? "text-rose" : ""}`}>
            {k.value}
          </div>
          <div className="text-xs text-inkFaint mt-1.5">{k.sub}</div>
        </div>
      ))}
    </div>
  );
}
