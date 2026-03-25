import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "메뉴",
  "유어타로 메뉴입니다. 마이페이지, 약관, 문의 등으로 이동할 수 있습니다.",
  "/menu",
);

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
