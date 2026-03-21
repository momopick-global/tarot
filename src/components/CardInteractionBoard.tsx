"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useRouter } from "next/navigation";

const CARD_BACK = "/assets/card-back-page04.png";
const TOTAL_CARDS = 78;
const VISIBLE_CARDS = 7;
const MAX_VISIBLE_OFFSET = Math.floor(VISIBLE_CARDS / 2);
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function CardInteractionBoard({
  masterId,
}: Readonly<{
  masterId: string;
}>) {
  const router = useRouter();
  const [deckOrder, setDeckOrder] = useState<number[]>(
    Array.from({ length: TOTAL_CARDS }, (_, idx) => idx),
  );
  const [selectedCard, setSelectedCard] = useState(39);
  const [displayIndex, setDisplayIndex] = useState(39); // fractional deck position
  const [isFlowing, setIsFlowing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  /** 드래그 중에는 CSS transition 끔 → 모바일에서 손가락과 1:1로 따라옴 */
  const [isDeckDragging, setIsDeckDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragStartDisplayIndex = useRef(0);
  const dragStartAt = useRef<number>(0);
  const lastMoveX = useRef<number | null>(null);
  const lastMoveTime = useRef<number | null>(null);
  const swipeVelocity = useRef(0); // px/ms (instant)
  const swipeVelocitySmooth = useRef(0); // px/ms (smoothed, 터치 노이즈 완화)
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

  const [dragSensitivityPx, setDragSensitivityPx] = useState(58);
  useEffect(() => {
    try {
      const mq = window.matchMedia("(pointer: coarse)");
      const apply = () => setDragSensitivityPx(mq.matches ? 44 : 58);
      apply();
      mq.addEventListener?.("change", apply);
      return () => mq.removeEventListener?.("change", apply);
    } catch {
      /* noop */
    }
  }, []);
  const animateToIndex = (
    target: number,
    onDone?: () => void,
    durationOverride?: number,
    easingFn: (t: number) => number = (t) => 1 - Math.pow(1 - t, 3),
  ) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const from = displayIndexRef.current;
    const distance = Math.abs(target - from);
    const duration = durationOverride ?? Math.min(420, 170 + distance * 28);
    const startedAt = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration);
      const eased = easingFn(t);
      const value = from + (target - from) * eased;
      setDisplayIndex(value);
      const rounded = mod(Math.round(value), TOTAL_CARDS);
      setSelectedCard(deckOrderRef.current[rounded] ?? 0);

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
    if (isOpening) return;
    // 스와이프 감속/스냅 중 다시 터치하면 즉시 정지하고 잡을 수 있게 처리
    if (rafRef.current && !isFlowing) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      setDisplayIndex(displayIndexRef.current);
    }
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
    swipeVelocitySmooth.current = 0;
    draggedEnough.current = false;
    setIsDeckDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isOpening) return;
    if (isFlowing) return;
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 8) draggedEnough.current = true;
    const nextDisplay = dragStartDisplayIndex.current + delta / dragSensitivityPx;
    setDisplayIndex(nextDisplay);
    displayIndexRef.current = nextDisplay;
    const rounded = mod(Math.round(nextDisplay), TOTAL_CARDS);
    setSelectedCard(deckOrderRef.current[rounded] ?? 0);

    const now = performance.now();
    if (lastMoveX.current !== null && lastMoveTime.current !== null) {
      const dt = now - lastMoveTime.current;
      if (dt > 0) {
        const instant = (e.clientX - lastMoveX.current) / dt;
        swipeVelocity.current = instant;
        const alpha = 0.35;
        swipeVelocitySmooth.current =
          swipeVelocitySmooth.current * (1 - alpha) + instant * alpha;
      }
    }
    lastMoveX.current = e.clientX;
    lastMoveTime.current = now;
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isOpening) return;
    if (isFlowing) return;
    if (dragStartX.current !== null) {
      const delta = e.clientX - dragStartX.current;
      const elapsed = Math.max(1, performance.now() - dragStartAt.current);
      const avgVelocity = delta / elapsed; // px/ms
      const smooth = swipeVelocitySmooth.current;
      const pick =
        Math.abs(smooth) > Math.abs(swipeVelocity.current) * 0.85 ? smooth : swipeVelocity.current;
      const velocity = Math.abs(pick) > Math.abs(avgVelocity) ? pick : avgVelocity;
      const absVelocity = Math.abs(velocity);

      // Swipe carousel: continuous drag -> short inertia -> snap (demo-like).
      if (Math.abs(delta) >= 8 || absVelocity >= 0.12) {
        const absProgress = Math.min(1, Math.abs(delta) / 52);
        const intent = absVelocity > 0.15 ? velocity : delta;
        const direction = intent > 0 ? 1 : -1; // swipe direction follows finger movement
        const projectedCards = absProgress * 1.55 + absVelocity * 7.8;
        let stepCount = Math.floor(projectedCards + 0.08);
        if (stepCount === 0 && (absProgress > 0.2 || absVelocity > 0.18)) stepCount = 1;
        stepCount = clamp(stepCount, 0, 12);

        const target = displayIndexRef.current + direction * stepCount;
        const duration = Math.min(2400, 980 + stepCount * 140);
        const easeOutLongTail = (t: number) => {
          if (t < 0.8) {
            const p = t / 0.8;
            return 0.88 * (1 - Math.pow(1 - p, 3));
          }
          const p = (t - 0.8) / 0.2;
          return 0.88 + 0.12 * (1 - Math.pow(1 - p, 5));
        };
        animateToIndex(target, undefined, duration, easeOutLongTail);
      } else {
        animateToIndex(Math.round(displayIndexRef.current), undefined, 240);
      }
    }
    dragStartX.current = null;
    lastMoveX.current = null;
    lastMoveTime.current = null;
    swipeVelocity.current = 0;
    swipeVelocitySmooth.current = 0;
    setIsDeckDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  const startShuffleFlow = () => {
    if (isOpening) return;
    if (isFlowing) return;
    beginFlow("left", 0.5, {
      shuffleDeck: true,
      resetToStart: true,
    });
  };

  const startOpenFlow = () => {
    if (isOpening) return;
    setIsOpening(true);
    window.setTimeout(() => {
      router.push(`/page_05_masters_list5?master=${masterId}&card=${cardId}`);
    }, 520);
  };

  return (
    <div className="page-fade">
      <div
        className={`relative left-1/2 mt-10 h-[310px] w-[390px] -translate-x-1/2 touch-none overflow-visible ${
          isOpening ? "pointer-events-none" : ""
        }`}
        style={{ touchAction: "none" }}
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
          const deckPos = mod(base + relative, TOTAL_CARDS);
          const cardIdx = deckOrder[deckPos] ?? 0;

          // 7-card fan: center + left/right 3 cards clearly visible.
          const clamped = clamp(offset, -3.2, 3.2);
          const absClamped = Math.abs(clamped);
          const dir = clamped === 0 ? 0 : clamped > 0 ? 1 : -1;

          let x = 0;
          let y = -6;
          let scale = 1.12;
          let rotate = 0;
          let opacity = 1;
          let blur = 0;

          if (absClamped <= 1) {
            x = dir * (absClamped * 102);
            y = -6 + absClamped * 32;
            scale = 1.12 - absClamped * 0.17;
            rotate = dir * (absClamped * 10);
          } else if (absClamped <= 2) {
            const local = absClamped - 1;
            x = dir * (102 + local * 66);
            y = 26 + local * 32;
            scale = 0.95 - local * 0.1;
            rotate = dir * (10 + local * 8);
            opacity = 1;
            blur = local * 0.2;
          } else {
            const local = Math.min(1, absClamped - 2);
            x = dir * (168 + local * 16);
            y = 58 + local * 26;
            scale = 0.85 - local * 0.06;
            rotate = dir * (18 + local * 6);
            opacity = 1;
            blur = local * 0.5;
          }

          if (absClamped > 3.1) {
            opacity = 0;
            blur = 4;
          }

          // Center card stays sharp; side cards keep a subtle blur.
          if (absClamped > 0.15) {
            blur = Math.max(1.2, blur);
          }

          const width = 128;
          const height = 198;
          const tx = x - width / 2;
          const zIndex = 320 - Math.round(absClamped * 52);
          const isVisibleCard = absClamped <= 3.1;
          const exitY = isOpening ? 120 + absClamped * 16 : 0;
          const exitScale = isOpening ? 0.9 : 1;
          const exitOpacity = isOpening ? Math.max(0, 0.12 - absClamped * 0.02) : 1;
          const exitBlur = isOpening ? 2.4 : 0;

          return (
            <button
              key={`${deckPos}-${cardIdx}`}
              type="button"
              onClick={() => {
                if (draggedEnough.current) return;
                setSelectedCard(cardIdx);
                animateToIndex(base + relative, undefined, 320);
              }}
              className={`absolute bottom-0 left-1/2 overflow-hidden rounded-[14px] border bg-[#0f0a24] shadow-[0_14px_26px_rgba(4,3,14,0.5)] ${
                isDeckDragging
                  ? ""
                  : "transition-[transform,filter,opacity] duration-500 ease-out"
              } ${absClamped < 0.55 ? "border-[#8F55FF]" : "border-[#7A5BC6]"}`}
              style={{
                width,
                height,
                transform: `translateX(-50%) translate(${x}px, ${y + exitY}px) scale(${scale * exitScale}) rotate(${rotate}deg)`,
                zIndex,
                opacity: opacity * exitOpacity,
                filter: `blur(${blur + exitBlur}px)`,
                pointerEvents: isVisibleCard ? "auto" : "none",
                willChange: isDeckDragging ? "transform, filter, opacity" : "auto",
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
        <button
          type="button"
          onClick={startOpenFlow}
          disabled={isOpening}
          className="rounded-2xl bg-[#6422AB] px-3 py-3 text-center text-[20px] font-semibold text-white"
        >
          {isOpening ? "카드 여는 중..." : "카드 열기"}
        </button>
        <button
          type="button"
          onClick={startShuffleFlow}
          disabled={isOpening}
          className="rounded-2xl border border-primary bg-[rgba(12,10,36,0.92)] px-3 py-3 text-center text-[16px] text-[#d8ccff]"
        >
          {isFlowing ? "흐름 중..." : "카드섞기"}
        </button>
      </div>
    </div>
  );
}

