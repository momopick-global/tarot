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
import { withAssetBase } from "@/lib/publicPath";

function Page03CardSelection1Inner() {
  const searchParams = useSearchParams();
  const master = (searchParams?.get("master") ?? "cassian").toLowerCase();
  const [isCardStage, setIsCardStage] = useState(false);
  const [isCardGuidePopupOpen, setIsCardGuidePopupOpen] = useState(false);
  const [isCardOpened, setIsCardOpened] = useState(false);
  const [isCardDropAnimating, setIsCardDropAnimating] = useState(false);
  const current = FLOW_MASTERS.find((m) => m.id === master) ?? FLOW_MASTERS[0];

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
        backgroundImageClassName={isCardStage ? "brightness-[1.08] contrast-[1.08]" : ""}
        backImageSrc={withAssetBase("/assets/btn-back-page03.png")}
        backImageSize={42}
        hideDimOverlay={isCardStage}
      >
        <div className="relative z-0 left-1/2 -mt-[30px] min-h-[744px] w-screen max-w-[390px] -translate-x-1/2">
          {/* 가이드 팝업이 닫힌 뒤에만 카드 덱 표시 */}
          {isCardStage && !isCardGuidePopupOpen ? (
            <div className={isCardDropAnimating ? "card-drop-in" : ""}>
              <CardSwipeDeck
                masterId={current.id}
                onRevealChange={(revealed) => {
                  setIsCardOpened(revealed);
                }}
              />
            </div>
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
          <CardGuidePopup
            onClose={() => {
              setIsCardGuidePopupOpen(false);
              setIsCardDropAnimating(true);
              window.setTimeout(() => setIsCardDropAnimating(false), 950);
            }}
          />
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
