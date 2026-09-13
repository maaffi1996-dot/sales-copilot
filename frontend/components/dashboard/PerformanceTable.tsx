import { performanceRows } from "@/lib/sampleData";

export default function PerformanceTable() {
  return (
    <div className="bg-white border border-lilacLine rounded-[18px] p-[22px]">
      <h3 className="text-[14.5px] font-bold mb-4">عملکرد شعبه‌ها و کارکنان</h3>
      <table className="w-full border-collapse text-[13.5px]">
        <thead>
          <tr>
            {["نام", "شعبه", "فروش ماه جاری", "تغییر", "وضعیت"].map((h) => (
              <th key={h} className="text-right font-semibold text-inkFaint text-xs pb-3 px-2.5 border-b border-lilacLine">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {performanceRows.map((r) => (
            <tr key={r.name}>
              <td className="py-3.5 px-2.5 border-b border-lilacLine">
                <div className="flex items-center gap-2.5">
                  <div className="w-[26px] h-[26px] rounded-full bg-lilacLine text-violetDeep text-[11px] font-bold flex items-center justify-center">
                    {r.name.slice(0, 2)}
                  </div>
                  {r.name}
                </div>
              </td>
              <td className="py-3.5 px-2.5 border-b border-lilacLine">{r.branch}</td>
              <td className="py-3.5 px-2.5 border-b border-lilacLine font-mono">{r.sales}</td>
              <td className={`py-3.5 px-2.5 border-b border-lilacLine font-mono ${r.status === "up" ? "text-violet" : "text-rose"}`}>
                {r.change}
              </td>
              <td className="py-3.5 px-2.5 border-b border-lilacLine">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                  r.status === "up" ? "bg-lilac text-violetDeep" : "bg-roseSoft text-rose"
                }`}>
                  {r.status === "up" ? "پیشرفت" : "نیاز به بررسی"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
