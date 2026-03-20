"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FlowScene } from "@/components/FlowScene";
import { HomeShareSection } from "@/components/HomeShareSection";
import { FLOW_MASTERS } from "@/lib/flowData";

const DETAIL_DIAGRAM = "/assets/diagram-master-detail.png";

export default function Page01MastersList1() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(true);
  const masters = useMemo(
    () =>
      FLOW_MASTERS.map((m) => [
        m.id,
        m.name,
        m.type,
        m.image,
      ] as const),
    [],
  );
  const current = selected
    ? FLOW_MASTERS.find((m) => m.id === selected) ?? null
    : null;
  const selectedIndex = selected ? FLOW_MASTERS.findIndex((m) => m.id === selected) : -1;
  const selectedRowEndIndex =
    selectedIndex < 0 ? -1 : Math.min(Math.ceil((selectedIndex + 1) / 3) * 3 - 1, masters.length - 1);

  return (
    <main className="w-full">
      <FlowScene hideBackgroundImage>
        

        <h1 className="mx-auto mt-3 w-full max-w-[350px] text-center text-[24px] font-semibold leading-[1.3] text-white">
          오늘의 운명을 해석할 마스터를 선택하세요
        </h1>

        {showGuide ? (
          <div className="relative mt-4 rounded-xl border border-primary bg-[rgba(8,7,22,0.78)] p-4 pr-10 text-[13px] leading-[1.5] text-white">
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              aria-label="안내 닫기"
              className="absolute right-3 top-2 text-[20px] leading-none text-white/90 hover:text-white"
            >
              ×
            </button>
            당신에게 가장 잘 맞는 타로 마스터를 선택하세요.
            <br />
            각 마스터는 서로 다른 방식으로 운명을 읽어 냅니다.
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-3 gap-2.5 pb-8">
          {masters.map(([id, name, kind, image], idx) => (
            <div key={id} className="contents">
              <button
                type="button"
                onClick={() => setSelected(id)}
                className={`rounded-xl p-1 ${selected === id ? "ring-2 ring-primary" : ""}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={image}
                    alt={name}
                    width={96}
                    height={96}
                    className="h-auto w-full rounded-xl"
                  />
                </div>
                <div className="mt-1 text-center text-[12px] text-white">
                  {name}
                  <br />
                  <span className="text-[#cfc4ff]">({kind})</span>
                </div>
              </button>

              {current && idx === selectedRowEndIndex ? (
                <div className="relative col-span-3 mx-auto mt-1 w-full max-w-[350px] rounded-lg border border-primary bg-[rgba(9,7,28,0.78)] p-3 text-white">
                  <div className="mb-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      aria-label="상세 닫기"
                      className="text-[20px] leading-none text-white/90 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="relative h-[98px] w-[98px] shrink-0 overflow-hidden rounded-md">
                      <Image src={DETAIL_DIAGRAM} alt="마스터 다이어그램" fill className="object-cover" />
                    </div>
                    <div className="min-w-0 text-[12px] leading-[1.45]">
                      <div className="font-semibold">{current.profileTitle}</div>
                      <div className="mt-1 text-[#d6cbff]">{current.desc}</div>
                      <div className="mt-2 text-[#d6cbff]">🔮 미래형 🌕 분석형 ♍ 객관형</div>
                      <div className="mt-1 text-[#d6cbff]">🌙 신비형 🔮 고전형</div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 pb-[10px]">
                    <Link
                      href={`/page-master-profile_01?master=${current.id}`}
                        className="rounded-lg bg-[#6422AB] px-3 py-2 text-center text-[16px] font-semibold"
                    >
                      자세히 보기
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                        className="rounded-lg border border-primary px-3 py-2 text-center text-[16px] text-[#d6cbff]"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-2 flex w-full max-w-[390px] justify-center pb-[40px]">
          {selected ? (
            <Link
              href={`/page_03_card-selection_1?master=${selected}`}
              className="block w-full max-w-[350px] min-h-[52px] rounded-xl bg-[#6422AB] px-5 py-3.5 text-center text-[20px] font-semibold text-white"
            >
              마스터선택 완료
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="block w-full max-w-[350px] min-h-[52px] rounded-xl bg-[#6422AB]/55 px-5 py-3.5 text-center text-[20px] font-semibold text-white/75"
            >
              마스터선택 완료
            </button>
          )}
        </div>
      </FlowScene>
      <HomeShareSection />
    </main>
  );
}

