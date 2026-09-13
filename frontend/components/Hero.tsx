export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-16 pb-8 text-center">
      <h1 className="text-[32px] sm:text-[44px] font-extrabold tracking-tight max-w-[18ch] mx-auto mb-5">
        فروشت رو آپلود کن، علتش رو بفهم
      </h1>
      <p className="text-[17px] text-inkSoft max-w-[52ch] mx-auto mb-8">
        داده فروش خودت رو بده، ما زمینه کسب‌وکارت رو می‌گیریم، و بهت می‌گیم چرا فروش
        بالا یا پایین رفته — بدون نیاز به تحلیلگر یا اکسل پیچیده.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <a
          href="#demo"
          className="rounded-[13px] bg-violet text-white font-bold text-[15.5px] px-7 py-3.5 shadow-[0_8px_20px_-6px_rgba(107,33,168,0.55)] hover:bg-violetDeep transition"
        >
          همین الان امتحان کن
        </a>
        <a
          href="#pricing"
          className="rounded-[13px] bg-lilac text-violetDeep font-bold text-[15.5px] px-7 py-3.5 hover:bg-lilacLine transition"
        >
          دیدن قیمت‌ها
        </a>
      </div>
    </section>
  );
}
