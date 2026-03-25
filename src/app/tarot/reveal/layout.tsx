import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "마스터 목록",
  "타로 마스터를 선택하고 리딩 흐름으로 이어집니다.",
  "/tarot/reveal",
);

export default function Page05Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
