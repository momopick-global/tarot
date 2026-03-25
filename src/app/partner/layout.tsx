import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "파트너",
  "유어타로 파트너 안내 페이지입니다.",
  "/partner",
);

export default function PartnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
