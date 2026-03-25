import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "마이페이지",
  "저장한 타로 결과와 기록을 확인하고 관리합니다.",
  "/mypage",
  {
    ogTitle: "내가 저장한 타로 기록 모아보기 | 유어타로",
    ogDescription: "지난 리딩을 다시 열고, 필요하면 정리·삭제까지 한 번에.",
  },
);

export default function MypageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
