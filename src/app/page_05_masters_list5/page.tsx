"use client";

import Image from "next/image";
import Link from "next/link";
import { FlowScene } from "@/components/FlowScene";
import { FLOW_MASTERS } from "@/lib/flowData";
import { useMemo, useState } from "react";

const MASTER = "/assets/master_01_Cassian_thum-4f10f821-c817-4965-8914-064d2df141f8.png";
const MASTER_2 = "/assets/master_02_Aiden__thum-157fb7f3-0bbf-4bec-a633-5ce0db9fedd0.png";

export default function Page05MastersList5() {
  const [masterId] = useState(() => {
    if (typeof window === "undefined") return "cassian";
    return new URL(window.location.href).searchParams.get("master") ?? "cassian";
  });
  const [card] = useState(() => {
    if (typeof window === "undefined") return "05";
    return new URL(window.location.href).searchParams.get("card") ?? "05";
  });
  const [opened, setOpened] = useState(false);
  const current = useMemo(
    () => FLOW_MASTERS.find((m) => m.id === masterId) ?? FLOW_MASTERS[0],
    [masterId],
  );
  const masterImage =
    current.image ?? (current.id === "kaien" ? MASTER_2 : MASTER);

  return (
    <main className="w-full">
      <FlowScene backHref={`/page_03_card-selection_1?master=${current.id}`}>
        <div className="mt-1 flex justify-center">
          <Image src={masterImage} alt={current.name} width={170} height={170} className="rounded-xl" />
        </div>

        <div className="mt-4 rounded-xl border border-primary bg-[rgba(8,7,22,0.78)] p-4 text-[14px] leading-[1.6] text-white">
          깊은 숨을 한번 들이마시고
          <br />
          천천히 카드를 뒤집어 보세요.
        </div>

        <button
          type="button"
          onClick={() => setOpened((v) => !v)}
          className={`mx-auto mt-6 w-[150px] rounded-2xl border-2 border-primary bg-[linear-gradient(180deg,#171035_0%,#0f0a24_100%)] p-2 transition-transform duration-500 ${opened ? "rotate-y-180" : ""}`}
        >
          <div className="relative h-[220px] rounded-xl border border-[#a992e2]">
            <span className="absolute right-[-8px] top-[-8px] grid h-7 w-7 place-items-center rounded-full bg-[#6422AB] text-sm">
              ✓
            </span>
            {opened ? (
              <div className="absolute inset-2 grid place-items-center rounded-lg bg-[radial-gradient(circle_at_50%_25%,#5a4aa7_0%,#291f58_60%,#181334_100%)] text-xs text-white">
                선택 카드 #{card}
              </div>
            ) : null}
          </div>
        </button>

        <div className="grid grid-cols-2 gap-3 pb-8 pt-7">
          <Link
            href={`/page_06_analyzing?master=${current.id}&card=${card}`}
            className="rounded-xl bg-[#6422AB] px-3 py-3 text-center text-[20px] font-semibold text-white"
          >
            {opened ? "해석 시작" : "카드 열기"}
          </Link>
          <Link
            href={`/page_03_card-selection_1?master=${current.id}`}
            className="rounded-xl border border-primary bg-[rgba(12,10,36,0.92)] px-3 py-3 text-center text-[16px] text-[#d8ccff]"
          >
            다시 섞기
          </Link>
        </div>
      </FlowScene>
      <div className="mx-auto h-2 w-full max-w-[390px]" />
      <div className="mx-auto w-full max-w-[390px] px-4 pb-2">
        <Link
          href={`/page_06_analyzing?master=${current.id}&card=${card}`}
          className="block min-h-[48px] rounded-xl border border-primary bg-[rgba(12,10,36,0.92)] px-4 py-3 text-center text-sm font-semibold text-[#d8ccff]"
        >
          다음: 분석 화면 보기
        </Link>
      </div>
    </main>
  );
}

