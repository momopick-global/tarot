import type { Metadata } from "next";
import "./globals.css";
import { SiteFrame } from "@/components/SiteFrame";

export const metadata: Metadata = {
  title: "YourTarot",
  description: "유어타로 - 오늘의 메시지와 조언",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-neutral-90 text-neutral-10">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
