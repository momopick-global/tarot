"use client";

import Image from "next/image";
import Link from "next/link";
import { FlowScene } from "@/components/FlowScene";
import { useMemo, useState } from "react";

const MASTER = "/assets/master_01_Cassian_thum-4f10f821-c817-4965-8914-064d2df141f8.png";

export default function Page04CardSelection2() {
  const [master] = useState(() => {
    if (typeof window === "undefined") return "cassian";
    const m = new URL(window.location.href).searchParams.get("master");
    return m ?? "cassian";
  });
  const fan = Array.from({ length: 11 });
  const [selectedCard, setSelectedCard] = useState(3);
  const cardId = useMemo(() => `${selectedCard}`.padStart(2, "0"), [selectedCard]);
  return (
    <main className="w-full">
      <FlowScene backHref="/page_03_card-selection_1">
        <div className="mt-1 flex justify-center">
          <Image src={MASTER} alt="카시안" width={170} height={170} className="rounded-xl" />
        </div>
        <div className="mt-4 rounded-xl border border-primary bg-[linear-gradient(180deg,rgba(131,78,255,0.96)_0%,rgba(106,56,208,0.94)_100%)] p-4 text-[14px] leading-[1.6] text-white">
          천천히 카드를 움직여 보세요.
          <br />
          당신에게 끌리는 카드가 있을 것입니다.
        </div>

        <div className="relative mx-auto mt-6 h-[210px] w-[320px]">
          {fan.map((_, idx) => {
            const offset = idx - Math.floor(fan.length / 2);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCard(idx)}
                className={`absolute bottom-0 left-1/2 h-[165px] w-[104px] rounded-xl border bg-[linear-gradient(180deg,#171035_0%,#0f0a24_100%)] ${selectedCard === idx ? "border-primary" : "border-[#8d71d4]"}`}
                style={{
                  transform: `translateX(${offset * 20 - 52}px) translateY(${Math.abs(offset) * 4}px) rotate(${offset * 4}deg)`,
                  zIndex: 20 - Math.abs(offset),
                }}
              />
            );
          })}
          <button
            type="button"
            onClick={() => setSelectedCard(5)}
            className="absolute bottom-0 left-1/2 z-30 h-[178px] w-[112px] -translate-x-1/2 rounded-xl border-2 border-primary bg-[linear-gradient(180deg,#1a123d_0%,#100b28_100%)]"
          >
            <div className="m-2 h-[160px] rounded-lg border border-[#a992e2]" />
          </button>
        </div>

        <div className="pb-3 pt-4 text-center text-[26px] text-[#e5ddff]">⟷</div>
        <div className="pb-5 text-center text-[12px] text-[#d7ccff]">선택 카드: #{cardId}</div>
        <div className="grid grid-cols-2 gap-3 pb-8">
          <Link
            href={`/page_05_masters_list5?master=${master}&card=${cardId}`}
            className="rounded-xl bg-[#6422AB] px-3 py-3 text-center text-[20px] font-semibold text-white"
          >
            카드 열기
          </Link>
          <Link
            href={`/page_03_card-selection_1?master=${master}`}
            className="rounded-xl border border-primary bg-[rgba(12,10,36,0.92)] px-3 py-3 text-center text-[16px] text-[#d8ccff]"
          >
            카드섞기
          </Link>
        </div>
      </FlowScene>
      <div className="mx-auto h-2 w-full max-w-[430px]" />
    </main>
  );
}
