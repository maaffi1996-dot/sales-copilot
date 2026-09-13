export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-lilacLine">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-extrabold text-lg">
          <span className="w-[26px] h-[26px] rounded-lg bg-gradient-to-br from-violetBright to-violetDeep inline-block" />
          دستیار فروش
        </div>
        <nav className="hidden sm:flex gap-7 text-sm font-semibold text-inkSoft">
          <a href="#features" className="hover:text-violet">ویژگی‌ها</a>
          <a href="#demo" className="hover:text-violet">امتحان کنید</a>
          <a href="#pricing" className="hover:text-violet">قیمت‌گذاری</a>
        </nav>
        <a
          href="#demo"
          className="rounded-[11px] bg-violet text-white font-bold text-sm px-5 py-[11px] shadow-[0_8px_20px_-6px_rgba(107,33,168,0.55)] hover:bg-violetDeep transition"
        >
          شروع رایگان
        </a>
      </div>
    </header>
  );
}
