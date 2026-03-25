import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FLOW_MASTERS } from "@/lib/flowData";
import { MASTERS_DETAIL_SLUGS, MASTERS_DETAIL_SLUG_SET } from "@/lib/mastersDetailSlugs";
import { pageMetadata } from "@/lib/seo/pageMeta";

export function generateStaticParams() {
  return MASTERS_DETAIL_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: Readonly<{
  params: { slug: string };
}>): Metadata {
  const { slug } = params;
  const path = `/masters/${slug}`;
  if (!MASTERS_DETAIL_SLUG_SET.has(slug)) {
    return pageMetadata("마스터", "유어타로 마스터 상세 페이지입니다.", path, {
      ogTitle: "타로 마스터 살펴보기 | 유어타로",
      ogDescription: "마스터마다 리딩 톤이 달라요. 나에게 맞는 스타일을 골라 보세요.",
    });
  }
  const master = FLOW_MASTERS.find((m) => m.id === slug);
  const nameKo = master?.name ?? slug;
  const title = `${nameKo} 마스터`;
  const desc =
    master?.profileSummary ??
    `유어타로 타로 마스터「${nameKo}」의 리딩 성향과 소개를 확인합니다.`;
  const hook = master?.desc ?? master?.profileSummary ?? desc;
  return pageMetadata(title, desc, path, {
    ogTitle: `${nameKo}와 함께하는 타로 — 지금 흐름 읽기 | 유어타로`,
    ogDescription: hook,
  });
}

export default function MasterDetailPage({
  params,
}: Readonly<{
  params: { slug: string };
}>) {
  const { slug } = params;

  if (!MASTERS_DETAIL_SLUG_SET.has(slug)) notFound();

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-5 pt-8 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[18px] font-semibold">마스터 상세</h1>
          <Link href="/masters" className="text-[16px] text-primary">
            목록
          </Link>
        </div>

        <div className="mt-6 rounded-xl bg-[rgba(255,255,255,0.02)] p-5">
          <div className="text-[16px] text-neutral-60">선택된 slug</div>
          <div className="mt-2 text-[16px] font-semibold text-neutral-10">
            {slug}
          </div>

          <p className="mt-4 text-[16px] leading-[22px] text-neutral-60">
            (기능 구현 단계 아님) 이후 마스터별 말투/덱 정보를 연결해
            카드 뽑기 화면에서 개인화를 제공합니다.
          </p>
        </div>
      </section>
    </main>
  );
}

