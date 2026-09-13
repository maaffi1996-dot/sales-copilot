export default function Pricing() {
  return (
    <section id="pricing" className="max-w-5xl mx-auto px-6 py-[70px]">
      <div className="max-w-[56ch] mb-10">
        <h2 className="text-[26px] sm:text-[32px] font-extrabold mb-2.5">قیمت‌گذاری ساده و شفاف</h2>
        <p className="text-inkSoft text-[15.5px]">
          شروع رایگان، بدون نیاز به کارت اعتباری. وقتی به نتیجه رسیدی، ارتقا بده.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-5">
        <div className="rounded-[22px] p-8 border border-lilacLine bg-white">
          <div className="text-[13px] font-bold text-violet mb-2.5">پایه</div>
          <h3 className="text-[22px] font-extrabold mb-1.5">برای کسب‌وکارهای کوچک</h3>
          <p className="text-sm text-inkSoft mb-5">
            مناسب یک فروشگاه یا چند شعبه محدود که می‌خواهند شروع کنند.
          </p>
          <ul className="flex flex-col gap-2.5 text-[14.5px] mb-6">
            {["داشبورد تحلیل عملکرد فروش", "گزارش مدیریتی خودکار", "KPIهای پیش‌فرض صنعتی", "آپلود ماهانه فایل اکسل"].map((li) => (
              <li key={li} className="flex gap-2 items-start">
                <span className="text-violet font-bold">✓</span>{li}
              </li>
            ))}
          </ul>
          <button className="w-full rounded-xl bg-lilac text-violetDeep font-bold py-3 text-[14.5px]">
            شروع رایگان
          </button>
          <div className="text-xs text-inkFaint mt-3">پرداخت ماهانه یا سالانه (با تخفیف)</div>
        </div>

        <div className="rounded-[22px] p-8 text-white bg-gradient-to-br from-violetDeep to-violet shadow-[0_30px_50px_-24px_rgba(76,24,99,0.55)]">
          <div className="text-[13px] font-bold text-lilac mb-2.5">حرفه‌ای</div>
          <h3 className="text-[22px] font-extrabold mb-1.5">برای زنجیره‌ها و کسب‌وکارهای در حال رشد</h3>
          <p className="text-sm text-[#E4D6FA] mb-5">
            برای کسب‌وکارهایی با چند شعبه یا حجم داده بالا که به تحلیل عمیق‌تر نیاز دارند.
          </p>
          <ul className="flex flex-col gap-2.5 text-[14.5px] mb-6">
            {[
              "همه امکانات پلن پایه",
              "تشخیص علت افت/رشد با هوش مصنوعی",
              "پیش‌بینی فروش کوتاه‌مدت",
              "مقایسه عملکرد شعبه‌ها و کارکنان",
              "پشتیبانی اختصاصی",
            ].map((li) => (
              <li key={li} className="flex gap-2 items-start">
                <span className="font-bold">✓</span>{li}
              </li>
            ))}
          </ul>
          <button className="w-full rounded-xl bg-white text-violetDeep font-bold py-3 text-[14.5px]">
            درخواست دمو
          </button>
          <div className="text-xs text-[#D8C4F2] mt-3">پرداخت سالانه با تخفیف حجمی برای چند شعبه</div>
        </div>
      </div>
    </section>
  );
}
