import type { Metadata } from "next";
import "./globals.css";
import { SiteFrame } from "@/components/SiteFrame";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourtarot.cc";
const ogImagePath = "/og/yourtarot_og_kr1.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "유어타로 결과",
  description: "타로 결과를 확인하고 당신의 운세를 알아보세요.",
  keywords: ["타로", "타로카드", "운세", "오늘의 운세", "타로 테스트"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "유어타로",
    title: "유어타로 결과",
    description: "당신의 운세는?",
    url: "/",
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: "유어타로 결과 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "당신의 타로 결과가 공개되었습니다",
    description: "지금 당신에게 가장 중요한 운명의 흐름",
    images: [ogImagePath],
  },
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
