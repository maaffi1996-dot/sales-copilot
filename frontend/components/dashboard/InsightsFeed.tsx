import { insightsFeed } from "@/lib/sampleData";

export default function InsightsFeed() {
  return (
    <div className="bg-white border border-lilacLine rounded-[18px] p-[22px] mb-7">
      <h3 className="text-[14.5px] font-bold mb-4">آخرین یافته‌های هوش مصنوعی</h3>
      <div className="flex flex-col gap-2.5">
        {insightsFeed.map((f, i) => (
          <div key={i} className="flex gap-3.5 items-start bg-white border border-lilacLine rounded-2xl px-4 py-3.5">
            <div className={`flex-none w-[34px] h-[34px] rounded-[10px] flex items-center justify-center text-[15px] ${
              f.icon === "warn" ? "bg-roseSoft text-rose" : "bg-lilac text-violetDeep"
            }`}>
              {f.icon === "warn" ? "⚠" : "📈"}
            </div>
            <div>
              <div className="text-sm">{f.text}</div>
              <div className="text-xs text-inkFaint mt-[3px]">{f.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
