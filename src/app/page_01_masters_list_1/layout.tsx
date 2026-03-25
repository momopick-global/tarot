import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourtarot.cc";
const pagePath = "/page_01_masters_list_1/";
const ogImagePath = "/og/yourtarot_og_kr1.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    type: "website",
    title: "유어타로 결과",
    description: "당신의 운세는?",
    url: pagePath,
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

export default function Page01Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
