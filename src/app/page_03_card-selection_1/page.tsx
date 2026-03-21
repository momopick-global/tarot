"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CardGuidePopup } from "@/components/CardGuidePopup";
import { CardSwipeDeck } from "@/components/CardSwipeDeck";
import { FlowScene } from "@/components/FlowScene";
import { MasterIntroPopup } from "@/components/MasterIntroPopup";
import { FLOW_MASTERS } from "@/lib/flowData";
import { getMasterBackgroundSrc } from "@/lib/masterCardAssets";

function Page03CardSelection1Inner() {
  const searchParams = useSearchParams();
  const master = (searchParams?.get("master") ?? "cassian").toLowerCase();
  const [isCardStage, setIsCardStage] = useState(false);
  const [isCardGuidePopupOpen, setIsCardGuidePopupOpen] = useState(false);
  const [isCardOpened, setIsCardOpened] = useState(false);
  const current = FLOW_MASTERS.find((m) => m.id === master) ?? FLOW_MASTERS[0];
  const debugBgLabel = !isCardStage ? "01" : isCardOpened ? "03" : "02";

  return (
    <main className="w-full">
      <FlowScene
        backHref="/page_01_masters_list_1"
        backgroundSrc={
          isCardStage
            ? isCardOpened
              ? getMasterBackgroundSrc(current.id, 3)
              : getMasterBackgroundSrc(current.id, 2)
            : getMasterBackgroundSrc(current.id, 1)
        }
        sceneClassName="h-[844px] min-h-[844px]"
        backImageSrc="/assets/btn-back-page03.png"
      >
        <div className="pointer-events-none mb-2 text-right text-[10px] text-[#d7c8ff]/80">
          DBG BG: {debugBgLabel}
        </div>
        <div className="relative z-0 left-1/2 min-h-[744px] w-screen max-w-[390px] -translate-x-1/2">
          {/* 덱은 카드 단계에서 항상 렌더 — 가이드 팝업은 z-index로 위에 덮음 */}
          {isCardStage ? (
            <CardSwipeDeck
              masterId={current.id}
              onRevealChange={(revealed) => {
                setIsCardOpened(revealed);
              }}
            />
          ) : null}
        </div>
        {!isCardStage ? (
          <MasterIntroPopup
            master={current}
            onCardReceive={() => {
              setIsCardStage(true);
              setIsCardOpened(false);
              setIsCardGuidePopupOpen(true);
            }}
          />
        ) : null}
        {isCardStage && isCardGuidePopupOpen ? (
          <CardGuidePopup onClose={() => setIsCardGuidePopupOpen(false)} />
        ) : null}
      </FlowScene>
      <div className="mx-auto h-[20px] w-full max-w-[390px] bg-[#17182E]" />
    </main>
  );
}

export default function Page03CardSelection1() {
  return (
    <Suspense fallback={null}>
      <Page03CardSelection1Inner />
    </Suspense>
  );
}
