"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FlowScene } from "@/components/FlowScene";
import { FLOW_MASTERS } from "@/lib/flowData";

const MASTER_1 = "/assets/master_01_Cassian_thum-4f10f821-c817-4965-8914-064d2df141f8.png";
const MASTER_2 = "/assets/master_02_Aiden__thum-157fb7f3-0bbf-4bec-a633-5ce0db9fedd0.png";
const SHARE_LINK = "/assets/svg-ic-share-link.svg-26940f47-d010-498b-b1e1-68303b31e59e.png";
const SHARE_KAKAO = "/assets/svg-ic-social-kakao.svg-20eca7d6-4d65-40b8-954f-17463d423b00.png";
const SHARE_FB = "/assets/svg-ic-share-facebook.svg-527221c9-1874-4fae-83ed-579ce7d4210b.png";
const SHARE_X = "/assets/svg-ic-share-x.svg-4ef9a083-7b44-439e-bfa4-3c305b5bf580.png";
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

export default function Page01MastersList1() {
  const [selected, setSelected] = useState("cassian");
  const masters = useMemo(
    () =>
      FLOW_MASTERS.map((m) => [
        m.id,
        m.name,
        m.type,
        m.image ?? (m.id === "cassian" ? MASTER_1 : m.id === "kaien" ? MASTER_2 : ""),
      ] as const),
    [],
  );

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

        <div className="mt-4 rounded-xl border border-primary bg-[rgba(8,7,22,0.78)] p-4 text-[13px] leading-[1.5] text-white">
          당신에게 가장 잘 맞는 타로 마스터를 선택하세요.
          <br />
          각 마스터는 서로 다른 방식으로 운명을 읽어 냅니다.
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5 pb-8">
          {masters.map(([id, name, kind, image], idx) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelected(id)}
              className={`rounded-xl p-1 ${selected === id ? "ring-2 ring-primary" : ""}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                {image ? (
                  <Image
                    src={image}
                    alt={name}
                    width={96}
                    height={96}
                    className="h-auto w-full rounded-xl"
                  />
                ) : (
                  <>
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
                    <div className="absolute inset-0 rounded-xl ring-1 ring-[#7d63c7]/50" />
                  </>
                )}
              </div>
              <div className="mt-1 text-center text-[12px] text-white">
                {name}
                <br />
                <span className="text-[#cfc4ff]">({kind})</span>
              </div>
            </button>
          ))}
        </div>
      </FlowScene>

      <div className="mx-auto mt-5 w-full max-w-[430px] px-4">
        <Link
          href={`/page_02_masters_list_2?master=${selected}`}
          className="block min-h-[52px] rounded-xl bg-[#6422AB] px-5 py-3.5 text-center text-[20px] font-semibold text-white"
        >
          마스터선택 완료
        </Link>

        <div className="mt-10 text-center text-[34px] font-semibold text-[#d9ccff]">
          <span aria-hidden>🧿</span>친구에게 공유하기
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <Image src={SHARE_LINK} alt="" width={46} height={46} />
          <Image src={SHARE_KAKAO} alt="" width={46} height={46} />
          <Image src={SHARE_FB} alt="" width={46} height={46} />
          <Image src={SHARE_X} alt="" width={46} height={46} />
        </div>
      </div>
    </main>
  );
}

