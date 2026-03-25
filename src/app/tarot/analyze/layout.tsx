import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "해석 중",
  "타로 카드 해석을 준비하고 있습니다. 잠시만 기다려 주세요.",
  "/tarot/analyze",
);

export default function Page06Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
