"use client";

import Image from "next/image";
import Link from "next/link";
import { DismissibleGuide } from "@/components/DismissibleGuide";
import { FlowScene } from "@/components/FlowScene";
import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const CARD_BACK = "/assets/card-back-page04.png";

export default function Page04CardSelection2() {
  const [master] = useState(() => {
    if (typeof window === "undefined") return "cassian";
    const m = new URL(window.location.href).searchParams.get("master");
    return m ?? "cassian";
  });
  const fan = Array.from({ length: 11 });
  const [selectedCard, setSelectedCard] = useState(5);
  const [dragX, setDragX] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const draggedEnough = useRef(false);
  const cardId = useMemo(() => `${selectedCard}`.padStart(2, "0"), [selectedCard]);

  const moveCard = (direction: "left" | "right") => {
    setSelectedCard((prev) => {
      if (direction === "left") return Math.min(fan.length - 1, prev + 1);
      return Math.max(0, prev - 1);
    });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    draggedEnough.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 8) draggedEnough.current = true;
    setDragX(Math.max(-50, Math.min(50, delta)));
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current !== null) {
      const delta = e.clientX - dragStartX.current;
      if (delta <= -28) moveCard("left");
      if (delta >= 28) moveCard("right");
    }
    dragStartX.current = null;
    setDragX(0);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <main className="w-full">
      <FlowScene backHref="/page_03_card-selection_1" sceneClassName="h-[844px] min-h-[844px]" backImageSrc="/assets/btn-back-page03.png">
        <DismissibleGuide className="mt-4 rounded-xl border border-primary bg-[rgba(8,7,22,0.78)] p-4 pr-10 text-[14px] leading-[1.6] text-white">
          천천히 카드를 움직여 보세요.
          <br />
          당신에게 끌리는 카드가 있을 것입니다.
        </DismissibleGuide>

        <div
          className="relative mx-auto mt-6 h-[250px] w-[350px] touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {fan.map((_, idx) => {
            const offset = idx - selectedCard;
            if (Math.abs(offset) > 5) return null;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (!draggedEnough.current) setSelectedCard(idx);
                }}
                className={`absolute bottom-0 left-1/2 overflow-hidden rounded-xl border bg-[#0f0a24] transition-transform duration-200 ${
                  selectedCard === idx ? "border-2 border-[#8F55FF]" : "border border-[#7152B8]"
                }`}
                style={{
                  width: selectedCard === idx ? 112 : 104,
                  height: selectedCard === idx ? 178 : 165,
                  transform: `translateX(${offset * 23 - 52 + dragX}px) translateY(${Math.abs(offset) * 4}px) rotate(${offset * 4}deg)`,
                  zIndex: 50 - Math.abs(offset),
                }}
              >
                <Image src={CARD_BACK} alt="카드 뒷면" fill className="object-cover" />
              </button>
            );
          })}
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
      <div className="mx-auto h-[20px] w-full max-w-[390px] bg-[#17182E]" />
    </main>
  );
}
