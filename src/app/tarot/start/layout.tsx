import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "마스터 선택",
  "타로 리딩 스타일에 맞는 마스터를 고릅니다. 선택한 마스터와 함께 카드 뽑기로 이어집니다.",
  "/tarot/start",
  {
    ogTitle: "내게 맞는 타로 마스터는 누구? 지금 고르기 | 유어타로",
    ogDescription:
      "리딩 톤이 달라져요. 한 명만 골라도 분위기가 바뀝니다 — 바로 카드로 이어져요.",
  },
);

export default function Page01Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
