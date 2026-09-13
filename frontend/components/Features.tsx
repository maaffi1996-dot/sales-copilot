const features = [
  { icon: "📈", title: "تحلیل عملکرد و گزارش مدیریتی", desc: "داشبورد KPI به تفکیک شعبه، محصول، و بازه زمانی — بدون نیاز به ساخت دستی نمودار در اکسل." },
  { icon: "🔍", title: "تشخیص علت افت یا رشد فروش", desc: "به‌جای فقط دیدن عدد، می‌فهمی چرا آن عدد این‌طور شده و چه کاری باید انجام دهی." },
  { icon: "🔮", title: "پیش‌بینی فروش کوتاه‌مدت", desc: "پیش‌بینی ماه آینده و فصل آینده بر اساس روند واقعی داده‌های خودت." },
  { icon: "👥", title: "عملکرد کارکنان فروش", desc: "مشخص می‌کند کدام فروشنده یا شعبه در ماه‌های اخیر پیشرفت یا افت داشته." },
];

export default function Features() {
  return (
    <section id="features" className="max-w-5xl mx-auto px-6 py-[70px]">
      <div className="max-w-[56ch] mb-10">
        <h2 className="text-[26px] sm:text-[32px] font-extrabold mb-2.5">
          یک ابزار، همه کاری که یک تحلیلگر فروش انجام می‌دهد
        </h2>
        <p className="text-inkSoft text-[15.5px]">
          هرکدام از این‌ها به‌صورت جداگانه در دنیا وجود دارد؛ ما همه‌شان را برای کسب‌وکار
          ایرانی، به زبان فارسی، و با قیمت مناسب کنار هم گذاشتیم.
        </p>
      </div>
      <div className="flex flex-col">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`flex gap-5 items-start py-[22px] border-t border-lilacLine ${
              i === features.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="flex-none w-11 h-11 rounded-xl bg-lilac text-violetDeep flex items-center justify-center text-[19px]">
              {f.icon}
            </div>
            <div>
              <h3 className="text-[16.5px] font-bold mb-1">{f.title}</h3>
              <p className="text-[14.5px] text-inkSoft max-w-[62ch]">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
