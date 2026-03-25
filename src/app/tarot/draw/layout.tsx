import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "카드 선택",
  "선택한 마스터와 함께 타로 카드를 뽑습니다. 직관으로 카드를 고르세요.",
  "/tarot/draw",
  {
    ogTitle: "손끝으로 고르는 한 장 — 오늘의 메시지 | 유어타로",
    ogDescription: "직관으로 카드를 선택하면 해석이 열려요. 어떤 카드가 당신을 기다릴까요?",
  },
);

export default function Page03Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
