import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "의견 보내기",
  "유어타로에 소중한 의견과 아이디어를 남겨 주세요. 서비스 개선에 반영합니다.",
  "/recommended",
  {
    ogTitle: "작은 아이디어가 큰 힘이 됩니다 | 유어타로",
    ogDescription: "불편·개선·칭찬 모두 환영이에요. 남겨 주신 내용을 꼼꼼히 읽습니다.",
  },
);

export default function RecommendedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
