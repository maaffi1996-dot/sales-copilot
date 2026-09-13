// Sample data used to render the internal dashboard prototype.
// Replace with real data fetched from the backend once accounts/branches exist.

export const trendData = [
  { month: "فروردین", total: 880 },
  { month: "اردیبهشت", total: 940 },
  { month: "خرداد", total: 1010 },
  { month: "تیر", total: 1140 },
  { month: "مرداد", total: 1055 },
];

export const branchData = [
  { branch: "مرکزی", total: 420 },
  { branch: "غرب", total: 290 },
  { branch: "شرق", total: 255 },
  { branch: "جنوب", total: 300 },
];

export const kpis = [
  { label: "فروش این ماه", value: "۱٬۰۵۵٬۰۰۰٬۰۰۰ تومان", sub: "مجموع همه شعبه‌ها", trend: "flat" as const },
  { label: "تغییر نسبت به ماه قبل", value: "▼ ۷.۳٪", sub: "عمدتاً از شعبه غرب", trend: "down" as const },
  { label: "شعبه‌های فعال", value: "۴", sub: "۱ شعبه در وضعیت هشدار", trend: "flat" as const },
  { label: "هشدارهای باز", value: "۳", sub: "نیاز به بررسی", trend: "down" as const },
];

export const insightsFeed = [
  {
    icon: "warn" as const,
    text: "فروش شعبه غرب در مرداد ۱۴٪ نسبت به تیر افت داشته؛ علت اصلی کاهش تعداد مشتری، نه کاهش قیمت فروش است.",
    time: "۲ ساعت پیش",
  },
  {
    icon: "up" as const,
    text: "شعبه مرکزی سه ماه متوالی رشد داشته؛ الگوی فروش آخر هفته این شعبه می‌تواند برای شعبه‌های دیگر الگو باشد.",
    time: "دیروز",
  },
  {
    icon: "warn" as const,
    text: "عملکرد یکی از فروشندگان شعبه شرق سه ماه پیاپی زیر میانگین تیم بوده — پیشنهاد می‌شود بررسی شود.",
    time: "۳ روز پیش",
  },
];

export const performanceRows = [
  { name: "علی محمدی", branch: "شعبه مرکزی", sales: "۳۱۰٬۰۰۰٬۰۰۰", change: "▲ ۹.۲٪", status: "up" as const },
  { name: "سارا حسینی", branch: "شعبه غرب", sales: "۱۹۰٬۰۰۰٬۰۰۰", change: "▼ ۱۴.۰٪", status: "down" as const },
  { name: "رضا کریمی", branch: "شعبه شرق", sales: "۱۶۵٬۰۰۰٬۰۰۰", change: "▼ ۵.۱٪", status: "down" as const },
  { name: "مینا نوری", branch: "شعبه جنوب", sales: "۲۲۰٬۰۰۰٬۰۰۰", change: "▲ ۴.۴٪", status: "up" as const },
];

export const dashboardContext =
  "داده نمونه فروش شعبه‌ها (میلیون تومان، ماه جاری): مرکزی=420 (رشد ۹.۲٪), غرب=290 (افت ۱۴٪), شرق=255 (افت ۵.۱٪), جنوب=300 (رشد ۴.۴٪). روند کلی فروش شرکت ۶ ماه اخیر (میلیون تومان): فروردین=880, اردیبهشت=940, خرداد=1010, تیر=1140, مرداد=1055.";
