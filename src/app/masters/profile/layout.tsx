import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "마스터 프로필",
  "타로 마스터의 성향, 리딩 스타일, 추천 대상을 자세히 살펴보세요.",
  "/masters/profile",
);

export default function PageMasterProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
