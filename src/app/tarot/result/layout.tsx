import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "타로 결과",
  "뽑은 카드에 대한 타로 해석과 오늘의 힌트를 확인합니다.",
  "/tarot/result",
  {
    ogTitle: "방금 뽑은 카드, 해석이 도착했습니다 | 유어타로",
    ogDescription: "오늘의 감정·행동 힌트를 확인하고 친구에게 공유해 보세요.",
  },
);

export default function Page07Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
