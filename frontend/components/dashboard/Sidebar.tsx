"use client";

import { useState } from "react";

const items = [
  { icon: "📊", label: "داشبورد" },
  { icon: "📤", label: "آپلود داده" },
  { icon: "🏬", label: "شعبه‌ها" },
  { icon: "👥", label: "کارکنان" },
  { icon: "🔮", label: "پیش‌بینی" },
  { icon: "🔔", label: "هشدارها", badge: "۳" },
];

export default function Sidebar() {
  const [active, setActive] = useState("داشبورد");

  return (
    <aside className="w-[236px] flex-none bg-white border-s border-lilacLine flex flex-col p-[22px_16px]">
      <div className="flex items-center gap-2 font-extrabold text-[17px] px-1.5 pb-6">
        <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violetBright to-violetDeep inline-block" />
        دستیار فروش
      </div>

      <div className="flex flex-col gap-[3px] mb-4">
        {items.map((it) => (
          <button
            key={it.label}
            onClick={() => setActive(it.label)}
            className={`flex items-center gap-[11px] px-3 py-2.5 rounded-xl text-[14.5px] font-semibold text-right transition ${
              active === it.label ? "bg-lilac text-violetDeep" : "text-inkSoft hover:bg-lilac hover:text-ink"
            }`}
          >
            <span className="w-[18px] text-center text-base">{it.icon}</span>
            {it.label}
            {it.badge && (
              <span className="ms-auto bg-roseSoft text-rose text-[11px] font-bold px-[7px] py-0.5 rounded-full">
                {it.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-[3px]">
        <button
          onClick={() => setActive("تنظیمات")}
          className={`flex items-center gap-[11px] px-3 py-2.5 rounded-xl text-[14.5px] font-semibold text-right transition ${
            active === "تنظیمات" ? "bg-lilac text-violetDeep" : "text-inkSoft hover:bg-lilac hover:text-ink"
          }`}
        >
          <span className="w-[18px] text-center text-base">⚙️</span>تنظیمات
        </button>
      </div>

      <div className="flex-1" />
      <div className="flex items-center gap-2.5 px-2 pt-2.5 border-t border-lilacLine">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violetBright to-violet text-white text-[13px] font-bold flex items-center justify-center flex-none">
          مر
        </div>
        <div>
          <div className="text-[13.5px] font-bold">مریم رضایی</div>
          <div className="text-[11.5px] text-inkFaint">مدیر فروش</div>
        </div>
      </div>
    </aside>
  );
}
