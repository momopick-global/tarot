"use client";

import Image from "next/image";
import Link from "next/link";
import { FlowScene } from "@/components/FlowScene";
import { FLOW_MASTERS } from "@/lib/flowData";
import { useMemo, useState } from "react";

const MASTER_1 = "/assets/master_01_Cassian_thum-4f10f821-c817-4965-8914-064d2df141f8.png";
const MASTER_2 = "/assets/master_02_Aiden__thum-157fb7f3-0bbf-4bec-a633-5ce0db9fedd0.png";
const MENU = "/assets/svg-ic-menu.svg-8f8ccbd3-7b89-472d-880a-9360e04887f7.png";
const LOGO = "/assets/svg-logo-yourtarot.svg-699577b6-cedf-4beb-8082-e9fc60a6227c.png";
const MASTER_SHEET = "/assets/page_01_masters_list_1-722a2797-a250-4191-bd9e-f41173ad0383.png";
const MASTER_CROPS = [
  { x: 16, y: 194 },
  { x: 105, y: 194 },
  { x: 193, y: 194 },
  { x: 16, y: 287 },
  { x: 105, y: 287 },
  { x: 193, y: 287 },
  { x: 16, y: 380 },
  { x: 105, y: 380 },
  { x: 193, y: 380 },
] as const;

export default function Page02MastersList2() {
  const list = useMemo(
    () =>
      FLOW_MASTERS.map((m) => [
    m.id,
    m.name,
    m.type,
    m.image ?? (m.id === "cassian" ? MASTER_1 : m.id === "kaien" ? MASTER_2 : ""),
      ] as const),
    [],
  );
  const [currentId, setCurrentId] = useState("cassian");
  const current = FLOW_MASTERS.find((m) => m.id === currentId) ?? FLOW_MASTERS[0];

  return (
    <main className="w-full">
      <FlowScene>
        <div className="mb-3 flex items-center justify-between">
          <Image src={MENU} alt="" width={18} height={18} />
          <Image src={LOGO} alt="" width={22} height={22} />
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#A992E2_0%,#6F42C1_55%,#4E2B8C_100%)] text-[12px]">
            🦄
          </span>
        </div>

        <h1 className="mt-3 text-[28px] font-semibold leading-[1.3] text-white">
          오늘의 운명을 해석할 마스터를 선택하세요
        </h1>

        <div className="mt-4 rounded-xl border border-primary bg-[rgba(8,7,22,0.78)] p-3">
          <div className="grid grid-cols-3 gap-3">
            {list.slice(0, 3).map(([id, name, kind, image], idx) => (
              <button key={name} type="button" className="text-center" onClick={() => setCurrentId(id)}>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  {image ? (
                    <Image
                      src={image}
                      alt={name}
                      width={98}
                      height={98}
                      className={`h-auto w-full rounded-xl ${current.id === id ? "ring-2 ring-primary" : ""}`}
                    />
                  ) : (
                    <Image
                      src={MASTER_SHEET}
                      alt={name}
                      width={288}
                      height={624}
                      className="absolute max-w-none"
                      unoptimized
                      style={{
                        width: 288,
                        height: 624,
                        transform: `translate(-${MASTER_CROPS[idx].x}px, -${MASTER_CROPS[idx].y}px)`,
                      }}
                    />
                  )}
                </div>
                <div className="mt-1 text-[13px] text-white">
                  {name}
                  <br />
                  <span className="text-[#d6cbff]">({kind})</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-3 rounded-lg border border-primary p-3 text-[12px] leading-[1.45] text-white">
            <div className="font-semibold">{current.name} / {current.type}</div>
            <div className="mt-1 text-[#d6cbff]">
              {current.desc}
            </div>
            <div className="mt-2 text-[#d6cbff]">🌌 미래형 · 분석형 · 객관형</div>
            <div className="mt-1 text-[#d6cbff]">🌙 신비형 · 고전형</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                href={`/page-master-profile_01?master=${current.id}`}
                className="rounded-lg bg-[#6422AB] px-3 py-2 text-center text-[12px] font-semibold"
              >
                자세히 보기
              </Link>
              <Link
                href={`/page_03_card-selection_1?master=${current.id}`}
                className="rounded-lg border border-primary px-3 py-2 text-center text-[12px] text-[#d6cbff]"
              >
                받기
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5 pb-6">
          {list.slice(3).map(([id, name, kind], idx) => (
            <button key={name} type="button" className="text-center" onClick={() => setCurrentId(id)}>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={MASTER_SHEET}
                  alt={name}
                  width={288}
                  height={624}
                  className="absolute max-w-none"
                  unoptimized
                  style={{
                    width: 288,
                    height: 624,
                    transform: `translate(-${MASTER_CROPS[idx + 3].x}px, -${MASTER_CROPS[idx + 3].y}px)`,
                  }}
                />
              </div>
              <div className="mt-1 text-[12px] text-white">
                {name}
                <br />
                <span className="text-[#d6cbff]">({kind})</span>
              </div>
            </button>
          ))}
        </div>
      </FlowScene>

      <div className="mx-auto w-full max-w-[430px] px-4">
        <Link
          href={`/page_03_card-selection_1?master=${current.id}`}
          className="block min-h-[52px] rounded-xl bg-[#6422AB] px-5 py-3.5 text-center text-[20px] font-semibold text-white"
        >
          마스터선택 완료
        </Link>
      </div>
    </main>
  );
}

