import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FLOW_MASTERS } from "@/lib/flowData";
import { masterProfileWith } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "타로 마스터 소개",
  "9명의 마스터 중 한 명을 선택해 나에게 맞는 리딩 스타일을 확인해 보세요.",
  "/masters",
  {
    ogTitle: "9명의 마스터, 리딩 톤부터 골라보기 | 유어타로",
    ogDescription: "공감형·직설형·분석형… 나에게 맞는 목소리를 먼저 고르세요.",
  },
);

export default function MastersPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-5 pt-8 pb-6">
        <div className="mx-auto w-full max-w-[350px]">
          <h1 className="text-[18px] font-semibold">타로 마스터 소개</h1>
          <p className="mt-3 text-[16px] leading-[22px] text-white">
            9명의 마스터 중 한 명을 선택해, 당신에게 맞는 리딩 스타일을 확인해보세요.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {FLOW_MASTERS.map((m) => (
              <Link
                key={m.id}
                href={masterProfileWith(m.id)}
                className="rounded-xl bg-[rgba(255,255,255,0.02)] p-3 text-center text-neutral-10 transition-colors hover:bg-[rgba(255,255,255,0.05)]"
              >
                <div className="relative mx-auto h-[122px] w-[122px] overflow-hidden rounded-xl">
                  <Image src={m.image} alt={m.name} fill className="object-cover" />
                </div>
                <div className="mt-2 text-[16px] font-semibold">{m.name}</div>
                <div className="text-[12px] text-[#cfc4ff]">({m.type})</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

