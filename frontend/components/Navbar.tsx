"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// برای اضافه کردن گزینه یا گروه جدید فقط همین آرایه را ویرایش کنید
const menuGroups = [
  {
    title: "زیرساخت مالی",
    items: [
      {
        label: "قیمت تمام شده کالا",
        desc: "محاسبه قیمت تمام‌شده کالا",
        href: "/cost-price",
        icon: "🧮",
      },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // بستن منو با کلیک بیرون از آن یا کلید Esc
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-lilacLine">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg">
          <span className="w-[26px] h-[26px] rounded-lg bg-gradient-to-br from-violetBright to-violetDeep inline-block" />
          دستیار فروش
        </Link>

        <div className="flex items-center gap-4 sm:gap-7">
          {/* دکمه منو و پنل بازشونده */}
          <div ref={wrapRef} className="sm:relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-panel"
              className="flex items-center gap-2 rounded-[11px] border border-lilacLine bg-white px-4 py-[9px] text-sm font-bold text-inkSoft hover:border-violet hover:text-violet transition"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              منو
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {open && (
              <div
                id="menu-panel"
                className="absolute left-3 right-3 top-full mt-2 sm:left-auto sm:right-0 sm:mt-3 sm:w-80 rounded-2xl border border-lilacLine bg-white p-3 shadow-xl"
              >
                {menuGroups.map((group, i) => (
                  <section
                    key={group.title}
                    className={i > 0 ? "mt-3 pt-3 border-t border-lilacLine" : ""}
                  >
                    <h3 className="px-2 pb-2 text-xs font-bold text-inkSoft">
                      {group.title}
                    </h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-50 transition"
                          >
                            <span className="grid h-10 w-10 place-items-center rounded-xl border border-lilacLine bg-gray-50 text-lg">
                              {item.icon}
                            </span>
                            <span className="flex flex-col">
                              <strong className="text-sm">{item.label}</strong>
                              <small className="text-xs text-inkSoft">{item.desc}</small>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </div>

          <nav className="hidden sm:flex gap-7 text-sm font-semibold text-inkSoft">
            <a href="/#features" className="hover:text-violet">ویژگی‌ها</a>
            <a href="/#demo" className="hover:text-violet">امتحان کنید</a>
            <a href="/#pricing" className="hover:text-violet">قیمت‌گذاری</a>
          </nav>
        </div>

        <a
          href="/#demo"
          className="rounded-[11px] bg-violet text-white font-bold text-sm px-5 py-[11px] shadow-[0_8px_20px_-6px_rgba(107,33,168,0.55)] hover:bg-violetDeep transition"
        >
          شروع رایگان
        </a>
      </div>
    </header>
  );
}
