const steps = [
  { icon: "📤", title: "آپلود داده", sub: "فایل اکسل یا CSV فروش" },
  { icon: "🏬", title: "زمینه کسب‌وکار", sub: "نوع کسب‌وکار و شعبه‌ها" },
  { icon: "📊", title: "تحلیل کامل", sub: "نمودار، KPI، علت افت" },
  { icon: "💬", title: "هر سؤالی بپرس", sub: "پاسخ فوری از داده‌ات" },
];

export default function StepFlow() {
  return (
    <div className="flex items-start justify-center gap-1 flex-wrap mt-14">
      {steps.map((s, i) => (
        <div key={s.title} className="flex items-center gap-1">
          <div className="flex flex-col items-center gap-2.5 w-[140px]">
            <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-violetBright to-violet flex items-center justify-center text-xl">
              {s.icon}
            </div>
            <div className="font-bold text-sm">{s.title}</div>
            <div className="text-xs text-inkFaint text-center">{s.sub}</div>
          </div>
          {i < steps.length - 1 && (
            <span className="hidden md:block text-lilacLine text-xl mt-6">←</span>
          )}
        </div>
      ))}
    </div>
  );
}
