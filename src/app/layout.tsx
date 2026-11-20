import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Memo",
  description: "간단한 개인 메모장",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
