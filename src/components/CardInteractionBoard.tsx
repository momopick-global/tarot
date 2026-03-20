"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const CARD_BACK = "/assets/card-back-page04.png";
const TOTAL_CARDS = 78;
const VISIBLE_CARDS = 11;
const MAX_VISIBLE_OFFSET = Math.floor(VISIBLE_CARDS / 2);

export function CardInteractionBoard({
  masterId,
}: Readonly<{
  masterId: string;
}>) {
  const cards = useMemo(() => Array.from({ length: TOTAL_CARDS }, (_, idx) => idx), []);
  const [deckOrder, setDeckOrder] = useState<number[]>(
    Array.from({ length: TOTAL_CARDS }, (_, idx) => idx),
  );
  const [selectedCard, setSelectedCard] = useState(39);
  const [displayIndex, setDisplayIndex] = useState(39); // fractional deck position
  const [dragX, setDragX] = useState(0);
  const [isFlowing, setIsFlowing] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragStartDisplayIndex = useRef(0);
  const dragStartAt = useRef<number>(0);
  const lastMoveX = useRef<number | null>(null);
  const lastMoveTime = useRef<number | null>(null);
  const swipeVelocity = useRef(0); // px/ms
  const displayIndexRef = useRef(39);
  const flowVelocity = useRef(0); // cards / frame(16.7ms 기준)
  const flowStopRequested = useRef(false);
  const flowLastTime = useRef(0);
  const flowTraveled = useRef(0);
  const draggedEnough = useRef(false);
  const rafRef = useRef<number | null>(null);
  const deckOrderRef = useRef(deckOrder);

  useEffect(() => {
    displayIndexRef.current = displayIndex;
  }, [displayIndex]);

  useEffect(() => {
    deckOrderRef.current = deckOrder;
  }, [deckOrder]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cardId = useMemo(() => `${selectedCard + 1}`.padStart(2, "0"), [selectedCard]);
  const deckPositionByCardId = useMemo(() => {
    const arr = Array.from({ length: TOTAL_CARDS }, () => 0);
    deckOrder.forEach((cardIdValue, pos) => {
      arr[cardIdValue] = pos;
    });
    return arr;
  }, [deckOrder]);

  const animateToIndex = (target: number, onDone?: () => void) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const from = displayIndexRef.current;
    const distance = Math.abs(target - from);
    const duration = Math.min(420, 170 + distance * 28);
    const startedAt = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = from + (target - from) * eased;
      setDisplayIndex(value);
      setSelectedCard(Math.round(normalize(value)));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      setDisplayIndex(target);
      const finalRounded = mod(Math.round(target), TOTAL_CARDS);
      const cardIdx = deckOrderRef.current[finalRounded] ?? 0;
      setSelectedCard(cardIdx);
      rafRef.current = null;
      onDone?.();
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const shuffledDeck = () => {
    const arr = Array.from({ length: TOTAL_CARDS }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const beginFlow = (
    direction: "left" | "right",
    initialBoost = 0,
    options?: {
      shuffleDeck?: boolean;
      resetToStart?: boolean;
    },
  ) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const shouldShuffle = options?.shuffleDeck ?? false;
    const shouldResetToStart = options?.resetToStart ?? false;

    if (shouldShuffle) {
      const newDeck = shuffledDeck();
      setDeckOrder(newDeck);
      deckOrderRef.current = newDeck;
    }

    if (shouldResetToStart) {
      setDisplayIndex(0);
      displayIndexRef.current = 0;
      setSelectedCard(deckOrderRef.current[0] ?? 0);
    } else {
      const rounded = mod(Math.round(displayIndexRef.current), TOTAL_CARDS);
      setSelectedCard(deckOrderRef.current[rounded] ?? 0);
    }
    setDragX(0);
    setIsFlowing(true);

    flowVelocity.current = (direction === "left" ? 1 : -1) * (1.45 + initialBoost * 0.85);
    flowStopRequested.current = false;
    flowLastTime.current = 0;
    flowTraveled.current = 0;

    const minTravel = TOTAL_CARDS * 1.1;

    const tick = (now: number) => {
      if (!flowLastTime.current) flowLastTime.current = now;
      const dt = Math.min(32, now - flowLastTime.current || 16.7);
      flowLastTime.current = now;

      const frameStep = flowVelocity.current * (dt / 16.7);
      const next = displayIndexRef.current + frameStep;
      flowTraveled.current += Math.abs(frameStep);

      setDisplayIndex(next);
      displayIndexRef.current = next;

      const rounded = mod(Math.round(next), TOTAL_CARDS);
      const cardIdx = deckOrderRef.current[rounded] ?? 0;
      setSelectedCard(cardIdx);

      if (flowStopRequested.current) {
        flowVelocity.current *= 0.92;
      } else if (flowTraveled.current >= minTravel) {
        flowVelocity.current *= 0.979;
        if (Math.abs(flowVelocity.current) <= 0.34) flowStopRequested.current = true;
      }

      if (flowStopRequested.current && Math.abs(flowVelocity.current) <= 0.09) {
        const target = mod(Math.round(displayIndexRef.current), TOTAL_CARDS);
        animateToIndex(target, () => {
          setIsFlowing(false);
          flowVelocity.current = 0;
          flowStopRequested.current = false;
          flowLastTime.current = 0;
          flowTraveled.current = 0;
        });
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isFlowing) {
      flowStopRequested.current = true;
      return;
    }
    dragStartAt.current = performance.now();
    dragStartX.current = e.clientX;
    dragStartDisplayIndex.current = displayIndexRef.current;
    lastMoveX.current = e.clientX;
    lastMoveTime.current = performance.now();
    swipeVelocity.current = 0;
    draggedEnough.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isFlowing) return;
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 8) draggedEnough.current = true;
    setDragX(Math.max(-120, Math.min(120, delta)));
    const dragSensitivity = 56; // px per card step
    const nextDisplay = dragStartDisplayIndex.current - delta / dragSensitivity;
    setDisplayIndex(nextDisplay);
    const rounded = mod(Math.round(nextDisplay), TOTAL_CARDS);
    setSelectedCard(deckOrderRef.current[rounded] ?? 0);

    const now = performance.now();
    if (lastMoveX.current !== null && lastMoveTime.current !== null) {
      const dt = now - lastMoveTime.current;
      if (dt > 0) swipeVelocity.current = (e.clientX - lastMoveX.current) / dt;
    }
    lastMoveX.current = e.clientX;
    lastMoveTime.current = now;
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isFlowing) return;
    if (dragStartX.current !== null) {
      const delta = e.clientX - dragStartX.current;
      const elapsed = Math.max(1, performance.now() - dragStartAt.current);
      const avgVelocity = delta / elapsed; // px/ms
      const velocity = Math.abs(swipeVelocity.current) > Math.abs(avgVelocity) ? swipeVelocity.current : avgVelocity;
      const absVelocity = Math.abs(velocity);
      const absDelta = Math.abs(delta);

      // Swipe: keep current deck and move like a carousel.
      // Quick/long swipe moves several cards, but no shuffle-flow animation.
      if (delta <= -14 || velocity <= -0.2) {
        const dragSensitivity = 56;
        const cardsPerFrame = (-velocity * 16.7) / dragSensitivity; // px/ms -> cards/frame
        const initial = Math.max(0.08, Math.min(0.85, Math.abs(cardsPerFrame)));
        const start = Math.max(0.12, initial + Math.min(0.38, absDelta / 220));
        setIsFlowing(true);
        flowVelocity.current = start;
        flowStopRequested.current = false;
        flowLastTime.current = 0;

        const tick = (now: number) => {
          if (!flowLastTime.current) flowLastTime.current = now;
          const dt = Math.min(32, now - flowLastTime.current || 16.7);
          flowLastTime.current = now;
          const step = flowVelocity.current * (dt / 16.7);
          const next = displayIndexRef.current + step;
          setDisplayIndex(next);
          displayIndexRef.current = next;
          const rounded = mod(Math.round(next), TOTAL_CARDS);
          setSelectedCard(deckOrderRef.current[rounded] ?? 0);

          flowVelocity.current *= 0.9;
          if (Math.abs(flowVelocity.current) <= 0.03) {
            const target = mod(Math.round(displayIndexRef.current), TOTAL_CARDS);
            animateToIndex(target, () => {
              setIsFlowing(false);
              flowVelocity.current = 0;
              flowLastTime.current = 0;
            });
            return;
          }
          rafRef.current = requestAnimationFrame(tick);
        };
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(tick);
      } else if (delta >= 14 || velocity >= 0.2) {
        const dragSensitivity = 56;
        const cardsPerFrame = (-velocity * 16.7) / dragSensitivity;
        const initial = Math.max(0.08, Math.min(0.85, Math.abs(cardsPerFrame)));
        const start = -Math.max(0.12, initial + Math.min(0.38, absDelta / 220));
        setIsFlowing(true);
        flowVelocity.current = start;
        flowStopRequested.current = false;
        flowLastTime.current = 0;

        const tick = (now: number) => {
          if (!flowLastTime.current) flowLastTime.current = now;
          const dt = Math.min(32, now - flowLastTime.current || 16.7);
          flowLastTime.current = now;
          const step = flowVelocity.current * (dt / 16.7);
          const next = displayIndexRef.current + step;
          setDisplayIndex(next);
          displayIndexRef.current = next;
          const rounded = mod(Math.round(next), TOTAL_CARDS);
          setSelectedCard(deckOrderRef.current[rounded] ?? 0);

          flowVelocity.current *= 0.9;
          if (Math.abs(flowVelocity.current) <= 0.03) {
            const target = mod(Math.round(displayIndexRef.current), TOTAL_CARDS);
            animateToIndex(target, () => {
              setIsFlowing(false);
              flowVelocity.current = 0;
              flowLastTime.current = 0;
            });
            return;
          }
          rafRef.current = requestAnimationFrame(tick);
        };
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(tick);
      } else {
        animateToIndex(displayIndexRef.current);
      }
    }
    dragStartX.current = null;
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

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  const startShuffleFlow = () => {
    if (isFlowing) return;
    beginFlow("left", 0.5, {
      shuffleDeck: true,
      resetToStart: true,
    });
  };

  return (
    <div className="page-fade">
      <div
        className="relative left-1/2 mt-10 h-[310px] w-[390px] -translate-x-1/2 touch-pan-y overflow-visible [perspective:1200px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {Array.from({ length: VISIBLE_CARDS }, (_, index) => {
          const relative = index - MAX_VISIBLE_OFFSET;
          const base = Math.floor(displayIndex);
          const fraction = displayIndex - base;
          const offset = relative - fraction;
          const distance = Math.abs(offset);
          const isCenter = distance < 0.18;
          const deckPos = mod(base + relative, TOTAL_CARDS);
          const cardIdx = deckOrder[deckPos] ?? 0;

          const width = isCenter ? 126 : Math.max(92, 118 - distance * 2);
          const height = isCenter ? 198 : Math.max(156, 188 - distance * 3);
          const x = offset * 31 - width / 2 + dragX * (isCenter ? 0.5 : 0.22);
          const y = distance * 8;
          const rotate = offset * 6 + dragX * (isCenter ? 0.03 : 0.01);
          const rotateY = offset * -8;
          const scale = isCenter ? 1.04 : Math.max(0.84, 1 - distance * 0.04);
          const opacity = isCenter ? 1 : Math.max(0.72, 1 - distance * 0.08);
          const blur = isCenter ? 0 : Math.min(1.4, distance * 0.28);

          return (
            <button
              key={`${deckPos}-${cardIdx}`}
              type="button"
              onClick={() => {
                if (draggedEnough.current) return;
                setSelectedCard(cardIdx);
                setDisplayIndex(base + relative);
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
          {isFlowing ? "흐름 중..." : "카드섞기"}
        </button>
      </div>
    </div>
  );
}

