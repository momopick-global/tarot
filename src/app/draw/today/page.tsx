import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "오늘의 타로",
  "오늘의 타로 뽑기로 이동합니다. 마스터를 선택한 뒤 카드를 뽑아 보세요.",
  "/draw/today",
);

export default function DrawTodayPage() {
  redirect("/tarot/start");
}

