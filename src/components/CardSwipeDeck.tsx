"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./card-swipe-deck.css";

const TOTAL_CARDS = 78;
const CARD_LABELS = Array.from({ length: TOTAL_CARDS }, (_, i) =>
  `${String(i + 1).padStart(2, "0")}`,
);

/** `public/card_swipe_mobile_demo.html` 과 동일한 스와이프 덱 (iframe 없음) */
export function CardSwipeDeck({
  masterId,
}: Readonly<{
  masterId: string;
}>) {
  const router = useRouter();
  const deckAreaRef = useRef<HTMLDivElement | null>(null);
  const [deckIndex, setDeckIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const root = deckAreaRef.current;
    if (!root) return;
    const deckArea = root;

    let currentIndex = 0;
    let progress = 0;
    let targetProgress = 0;
    let displayProgress = 0;
    let isDragging = false;
    let startX = 0;
    const dragWidth = 170;
    let pointerId: number | null = null;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let rafId: number | null = null;
    let snapRafId: number | null = null;
    let isSnapping = false;
    const cardElements: HTMLDivElement[] = [];

    function notifyDeckIndex() {
      setDeckIndex(Math.max(0, Math.min(77, currentIndex)));
    }

    function clamp(value: number, min: number, max: number) {
      return Math.max(min, Math.min(max, value));
    }

    function wrapIndex(index: number) {
      return ((index % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS;
    }

    function wrapOffset(offset: number) {
      const half = Math.floor(TOTAL_CARDS / 2);
      let v = offset;
      if (v > half) v -= TOTAL_CARDS;
      if (v < -half) v += TOTAL_CARDS;
      return v;
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function getCardStyle(offset: number) {
      const side = offset === 0 ? 0 : offset > 0 ? 1 : -1;
      const abs = Math.abs(offset);

      const center = { x: 0, y: -6, scale: 1.12, rotate: 0 };
      const near = { x: 102, y: 26, scale: 0.95, rotate: 10 };
      const far = { x: 168, y: 58, scale: 0.85, rotate: 18 };
      const outer = { x: 184, y: 84, scale: 0.79, rotate: 16 };

      let x = 0;
      let y = 0;
      let scale = 1;
      let rotate = 0;

      if (abs <= 1) {
        const t = abs;
        x = lerp(center.x, near.x, t) * side;
        y = lerp(center.y, near.y, t);
        scale = lerp(center.scale, near.scale, t);
        rotate = lerp(center.rotate, near.rotate, t) * side;
      } else if (abs <= 2) {
        const t = clamp(abs - 1, 0, 1);
        x = lerp(near.x, far.x, t) * side;
        y = lerp(near.y, far.y, t);
        scale = lerp(near.scale, far.scale, t);
        rotate = lerp(near.rotate, far.rotate, t) * side;
      } else if (abs <= 3) {
        const t = clamp(abs - 2, 0, 1);
        x = lerp(far.x, outer.x, t) * side;
        y = lerp(far.y, outer.y, t);
        scale = lerp(far.scale, outer.scale, t);
        rotate = lerp(far.rotate, outer.rotate, t) * side;
      } else {
        x = outer.x * side;
        y = outer.y;
        scale = outer.scale;
        rotate = outer.rotate * side;
      }

      return { x, y, scale, rotate };
    }

    function updateCards(nextProgress: number) {
      progress = clamp(nextProgress, -1, 1);

      for (let i = 0; i < cardElements.length; i += 1) {
        const el = cardElements[i];
        const rawOffset = wrapOffset(i - currentIndex);
        const visualOffset = rawOffset + progress;

        if (Math.abs(visualOffset) > 3.1) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          continue;
        }

        const style = getCardStyle(visualOffset);
        const abs = Math.abs(visualOffset);
        const zIndex = 320 - Math.round(abs * 52);
        const opacity = abs <= 3 ? 1 : Math.max(0.75, 1 - (abs - 3) * 0.8);
        const blur = abs < 2.6 ? 0 : (abs - 2.6) * 0.5;

        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
        el.style.pointerEvents = abs < 0.6 ? "auto" : "none";
        el.style.filter = `blur(${blur.toFixed(2)}px)`;
        el.style.transform =
          `translateX(-50%) ` +
          `translate(${style.x.toFixed(2)}px, ${style.y.toFixed(2)}px) ` +
          `scale(${style.scale.toFixed(4)}) ` +
          `rotate(${style.rotate.toFixed(2)}deg)`;
      }
    }

    function requestRender() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(renderLoop);
    }

    function renderLoop() {
      rafId = null;
      const smoothing = isSnapping ? 0.22 : 0.34;
      displayProgress = lerp(displayProgress, targetProgress, smoothing);
      updateCards(displayProgress);

      if (Math.abs(targetProgress - displayProgress) > 0.001) {
        requestRender();
      } else {
        displayProgress = targetProgress;
        updateCards(displayProgress);
      }
    }

    function onPointerDown(e: PointerEvent) {
      if (snapRafId !== null) {
        cancelAnimationFrame(snapRafId);
        snapRafId = null;
        isSnapping = false;
        targetProgress = displayProgress;
        updateCards(displayProgress);
      }

      isDragging = true;
      pointerId = e.pointerId;
      startX = e.clientX;
      lastX = e.clientX;
      lastT = performance.now();
      velocity = 0;
      deckArea.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      targetProgress = clamp(dx / dragWidth, -1, 1);
      requestRender();

      const now = performance.now();
      const dt = now - lastT;
      if (dt > 0) velocity = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastT = now;
    }

    function onPointerUp(e: PointerEvent) {
      if (!isDragging || e.pointerId !== pointerId) return;
      isDragging = false;
      deckArea.releasePointerCapture(e.pointerId);
      pointerId = null;

      const absProgress = Math.abs(targetProgress);
      const absVelocity = Math.abs(velocity);
      const intent = absVelocity > 0.15 ? velocity : targetProgress;
      const direction = intent < 0 ? 1 : -1;
      const projectedCards = absProgress * 1.55 + absVelocity * 7.8;
      let stepCount = Math.floor(projectedCards + 0.08);

      if (stepCount === 0 && (absProgress > 0.2 || absVelocity > 0.18)) {
        stepCount = 1;
      }

      stepCount = clamp(stepCount, 0, 12);
      const step = direction * stepCount;
      snapToNearest(step);
    }

    function easeOutLongTail(t: number) {
      if (t < 0.8) {
        const p = t / 0.8;
        return 0.88 * (1 - (1 - p) ** 3);
      }
      const p = (t - 0.8) / 0.2;
      return 0.88 + 0.12 * (1 - (1 - p) ** 5);
    }

    function snapToNearest(step = 0) {
      if (snapRafId !== null) cancelAnimationFrame(snapRafId);
      isSnapping = true;

      const from = displayProgress;
      const to = step === 0 ? 0 : -step;
      const duration = clamp(980 + Math.abs(step) * 140, 980, 2400);
      const start = performance.now();

      function tick(now: number) {
        const t = clamp((now - start) / duration, 0, 1);
        const eased = easeOutLongTail(t);
        let p = lerp(from, to, eased);

        while (p <= -1) {
          currentIndex = wrapIndex(currentIndex + 1);
          p += 1;
        }
        while (p >= 1) {
          currentIndex = wrapIndex(currentIndex - 1);
          p -= 1;
        }

        targetProgress = p;
        displayProgress = p;
        updateCards(p);

        if (t < 1) {
          snapRafId = requestAnimationFrame(tick);
          return;
        }

        targetProgress = 0;
        displayProgress = 0;
        updateCards(0);
        isSnapping = false;
        snapRafId = null;
        notifyDeckIndex();
      }

      snapRafId = requestAnimationFrame(tick);
    }

    function createCards() {
      deckArea.innerHTML = "";
      cardElements.length = 0;
      for (let i = 0; i < TOTAL_CARDS; i += 1) {
        const el = document.createElement("div");
        const label = document.createElement("span");
        el.className = "card";
        label.textContent = CARD_LABELS[i];
        el.appendChild(label);
        el.dataset.index = String(i);
        deckArea.appendChild(el);
        cardElements.push(el);
      }
      updateCards(0);
      notifyDeckIndex();
    }

    function bindEvents() {
      deckArea.addEventListener("pointerdown", onPointerDown);
      deckArea.addEventListener("pointermove", onPointerMove);
      deckArea.addEventListener("pointerup", onPointerUp);
      deckArea.addEventListener("pointercancel", onPointerUp);
    }

    function unbindEvents() {
      deckArea.removeEventListener("pointerdown", onPointerDown);
      deckArea.removeEventListener("pointermove", onPointerMove);
      deckArea.removeEventListener("pointerup", onPointerUp);
      deckArea.removeEventListener("pointercancel", onPointerUp);
    }

    createCards();
    bindEvents();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (snapRafId !== null) cancelAnimationFrame(snapRafId);
      unbindEvents();
      deckArea.innerHTML = "";
      cardElements.length = 0;
    };
  }, [resetKey]);

  const cardParam = String(deckIndex);

  return (
    <div className="card-swipe-deck page-fade mx-auto w-full max-w-[390px] [color-scheme:dark]">
      <div ref={deckAreaRef} className="deck-area" />

      <div className="pb-1 pt-1 text-center text-[24px] text-[#e5ddff]">⟷</div>
      <div className="pb-2 text-center text-[12px] text-[#d7ccff]">당신에게 끌리는 카드를 골라보세요</div>
      <div className="pb-6 text-center text-[11px] text-[#b9abdf]">
        선택 카드: #{String(deckIndex + 1).padStart(2, "0")}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            if (isOpening) return;
            setIsOpening(true);
            window.setTimeout(() => {
              router.push(`/page_05_masters_list5?master=${masterId}&card=${cardParam}`);
            }, 320);
          }}
          disabled={isOpening}
          className="rounded-2xl bg-[#6422AB] px-3 py-3 text-center text-[20px] font-semibold text-white disabled:opacity-70"
        >
          {isOpening ? "카드 여는 중..." : "카드 열기"}
        </button>
        <button
          type="button"
          onClick={() => setResetKey((k) => k + 1)}
          disabled={isOpening}
          className="rounded-2xl border border-primary bg-[rgba(12,10,36,0.92)] px-3 py-3 text-center text-[16px] text-[#d8ccff] disabled:opacity-70"
        >
          카드섞기
        </button>
      </div>
    </div>
  );
}
