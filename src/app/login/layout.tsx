import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "로그인",
  "유어타로에 로그인하고 타로 결과를 클라우드에 저장·마이페이지에서 모아보세요.",
  "/login",
  {
    ogTitle: "내 타로 기록, 어디서나 이어 보기 — 로그인 | 유어타로",
    ogDescription: "한 번 저장하면 기기 바꿔도 이어져요. 마이페이지에서 결과를 한곳에 모아요.",
  },
);

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
