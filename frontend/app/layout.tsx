import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "دستیار فروش هوشمند",
  description: "پلتفرم تحلیل، پیش‌بینی و تشخیص علت افت فروش برای کسب‌وکارهای ایرانی",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
