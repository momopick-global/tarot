"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const CARD_BACK = "/assets/card-back-page04.png";
const TOTAL_CARDS = 78;
const VISIBLE_CARDS = 13;
const MAX_VISIBLE_OFFSET = Math.floor(VISIBLE_CARDS / 2);

export function CardInteractionBoard({
  masterId,
}: Readonly<{
  masterId: string;
}>) {
  const fan = useMemo(() => Array.from({ length: TOTAL_CARDS }, (_, idx) => idx), []);
  const [selectedCard, setSelectedCard] = useState(39);
  const [displayIndex, setDisplayIndex] = useState(39);
  const [dragX, setDragX] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragStartTime = useRef<number | null>(null);
  const lastMoveX = useRef<number | null>(null);
  const lastMoveTime = useRef<number | null>(null);
  const swipeVelocity = useRef(0); // px/ms
  const draggedEnough = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cardId = useMemo(() => `${selectedCard + 1}`.padStart(2, "0"), [selectedCard]);

  const moveCard = (direction: "left" | "right") => {
    setSelectedCard((prev) => {
      const next = direction === "left" ? Math.min(TOTAL_CARDS - 1, prev + 1) : Math.max(0, prev - 1);
      setDisplayIndex(next);
      return next;
    });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isShuffling) return;
    dragStartX.current = e.clientX;
    dragStartTime.current = performance.now();
    lastMoveX.current = e.clientX;
    lastMoveTime.current = performance.now();
    swipeVelocity.current = 0;
    draggedEnough.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 8) draggedEnough.current = true;
    setDragX(Math.max(-120, Math.min(120, delta)));

    const now = performance.now();
    if (lastMoveX.current !== null && lastMoveTime.current !== null) {
      const dt = now - lastMoveTime.current;
      if (dt > 0) swipeVelocity.current = (e.clientX - lastMoveX.current) / dt;
    }
    lastMoveX.current = e.clientX;
    lastMoveTime.current = now;
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current !== null) {
      const delta = e.clientX - dragStartX.current;
      const elapsed = Math.max(1, performance.now() - (dragStartTime.current ?? performance.now()));
      const avgVelocity = delta / elapsed; // px/ms
      const velocity = Math.abs(swipeVelocity.current) > Math.abs(avgVelocity) ? swipeVelocity.current : avgVelocity;
      const absVelocity = Math.abs(velocity);
      const absDelta = Math.abs(delta);

      // Fast swipe => skip multiple cards for acceleration feel.
      const steps = Math.max(
        1,
        Math.min(
          7,
          Math.floor(absDelta / 30) + Math.floor(absVelocity / 0.45),
        ),
      );

      if (delta <= -16) {
        setSelectedCard((prev) => {
          const next = Math.min(TOTAL_CARDS - 1, prev + steps);
          setDisplayIndex(next);
          return next;
        });
      } else if (delta >= 16) {
        setSelectedCard((prev) => {
          const next = Math.max(0, prev - steps);
          setDisplayIndex(next);
          return next;
        });
      }
    }
    dragStartX.current = null;
    dragStartTime.current = null;
    lastMoveX.current = null;
    lastMoveTime.current = null;
    swipeVelocity.current = 0;
    setDragX(0);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const shortestOffset = (from: number, to: number) => {
    let offset = to - from;
    if (offset > TOTAL_CARDS / 2) offset -= TOTAL_CARDS;
    if (offset < -TOTAL_CARDS / 2) offset += TOTAL_CARDS;
    return offset;
  };

  const normalize = (n: number) => {
    const m = n % TOTAL_CARDS;
    return m < 0 ? m + TOTAL_CARDS : m;
  };

  const startShuffleFlow = () => {
    if (isShuffling) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const target = Math.floor(Math.random() * TOTAL_CARDS);
    const start = displayIndex;
    const end = start + TOTAL_CARDS * 2 + shortestOffset(start, target);
    const duration = 1550;
    const startAt = performance.now();

    setIsShuffling(true);
    setDragX(0);

    const tick = (now: number) => {
      const t = Math.min(1, (now - startAt) / duration);
      // Fast spin at start, long deceleration tail (demo-like).
      const eased = t < 0.82
        ? 1 - Math.pow(1 - t / 0.82, 2.2)
        : 1 - Math.pow(1 - (t - 0.82) / 0.18, 5);
      const current = start + (end - start) * eased;
      setDisplayIndex(current);
      setSelectedCard(Math.round(normalize(current)));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const snapFrom = current;
      const snapDuration = 220;
      const snapStart = performance.now();

      const snapTick = (snapNow: number) => {
        const st = Math.min(1, (snapNow - snapStart) / snapDuration);
        const easedSnap = 1 - Math.pow(1 - st, 3);
        const snapped = snapFrom + shortestOffset(snapFrom, target) * easedSnap;
        setDisplayIndex(snapped);
        setSelectedCard(Math.round(normalize(snapped)));

        if (st < 1) {
          rafRef.current = requestAnimationFrame(snapTick);
          return;
        }

        setSelectedCard(target);
        setDisplayIndex(target);
        setIsShuffling(false);
        rafRef.current = null;
      };

      rafRef.current = requestAnimationFrame(snapTick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <div className="page-fade">
      <div
        className="relative mx-auto mt-10 h-[310px] w-[350px] touch-pan-y [perspective:1200px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {fan.map((idx) => {
          const offset = shortestOffset(displayIndex, idx);
          if (Math.abs(offset) > MAX_VISIBLE_OFFSET) return null;

          const distance = Math.abs(offset);
          const isCenter = offset === 0;
          const width = isCenter ? 126 : Math.max(92, 118 - distance * 2);
          const height = isCenter ? 198 : Math.max(156, 188 - distance * 3);
          const x = offset * 25 - 62 + dragX * (isCenter ? 0.5 : 0.22);
          const y = distance * 8;
          const rotate = offset * 6 + dragX * (isCenter ? 0.03 : 0.01);
          const rotateY = offset * -8;
          const scale = isCenter ? 1.04 : Math.max(0.84, 1 - distance * 0.04);
          const opacity = isCenter ? 1 : Math.max(0.72, 1 - distance * 0.08);
          const blur = isCenter ? 0 : Math.min(1.4, distance * 0.28);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (!draggedEnough.current) setSelectedCard(idx);
                if (!draggedEnough.current) setDisplayIndex(idx);
              }}
              className={`absolute bottom-0 left-1/2 overflow-hidden rounded-[14px] border bg-[#0f0a24] shadow-[0_14px_26px_rgba(4,3,14,0.5)] transition-[transform,filter,opacity] duration-200 ${
                isCenter ? "border-[#8F55FF]" : "border-[#7A5BC6]"
              }`}
              style={{
                width,
                height,
                transform: `translateX(${x}px) translateY(${y}px) rotate(${rotate}deg) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: 120 - distance,
                opacity,
                filter: `blur(${blur}px)`,
              }}
            >
              <Image src={CARD_BACK} alt="카드 뒷면" fill className="object-cover" />
            </button>
          );
        })}
      </div>

      <div className="pb-1 pt-1 text-center text-[24px] text-[#e5ddff]">⟷</div>
      <div className="pb-2 text-center text-[12px] text-[#d7ccff]">당신에게 끌리는 카드를 골라보세요</div>
      <div className="pb-6 text-center text-[11px] text-[#b9abdf]">선택 카드: #{cardId}</div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          href={`/page_05_masters_list5?master=${masterId}&card=${cardId}`}
          className="rounded-2xl bg-[#6422AB] px-3 py-3 text-center text-[20px] font-semibold text-white"
        >
          카드 열기
        </Link>
        <button
          type="button"
          onClick={startShuffleFlow}
          className="rounded-2xl border border-primary bg-[rgba(12,10,36,0.92)] px-3 py-3 text-center text-[16px] text-[#d8ccff]"
        >
          {isShuffling ? "섞는 중..." : "카드섞기"}
        </button>
      </div>
    </div>
  );
}

