"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { withAssetBase } from "@/lib/publicPath";

const HOME_HERO_POSTER = withAssetBase("/images/main/yourtarot.webp");
const HOME_HERO_GIF = withAssetBase("/images/main/yourtarot.gif");

/** 느린 네트워크에서도 로딩 오버레이가 무한히 남지 않도록 상한 */
const LOAD_TIMEOUT_MS = 25_000;

export function HomeHeroBackground() {
  const [overlayDismissed, setOverlayDismissed] = useState(false);
  const [gifReady, setGifReady] = useState(false);
  const gifRef = useRef<HTMLImageElement>(null);

  const markGifOk = () => {
    setGifReady(true);
    setOverlayDismissed(true);
  };

  const markGifFailed = () => {
    setGifReady(false);
    setOverlayDismissed(true);
  };

  /** 이미 캐시되어 있으면 onLoad가 리스너보다 먼저 끝나 로딩이 영원히 남는 경우가 있음 */
  useLayoutEffect(() => {
    const el = gifRef.current;
    if (!el) return;
    if (el.complete && el.naturalWidth > 0) {
      markGifOk();
    }
  }, []);

  useEffect(() => {
    if (overlayDismissed) return;
    const t = window.setTimeout(() => setOverlayDismissed(true), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [overlayDismissed]);

  return (
    <>
      <img
        src={HOME_HERO_POSTER}
        alt=""
        width={390}
        height={620}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 z-0 h-full w-full object-cover object-top"
      />
      {/*
        큰 GIF는 모바일 Safari 등에서 next/image 래퍼와 함께 깨지거나 디코딩 실패하는 경우가 있어
        히어로만 네이티브 img로 둡니다.
      */}
      <img
        ref={gifRef}
        src={HOME_HERO_GIF}
        alt=""
        width={390}
        height={620}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onLoad={markGifOk}
        onError={markGifFailed}
        className={`absolute inset-0 z-[1] h-full w-full object-cover object-top transition-opacity duration-500 ${
          gifReady ? "opacity-100" : "opacity-0"
        }`}
      />
      {!overlayDismissed ? (
        <div className="pointer-events-none absolute inset-0 z-[15]" aria-hidden>
          <div className="absolute left-1/2 top-[26%] w-[100px] -translate-x-1/2">
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/15">
              <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-[#6422AB] home-hero-loading-bar" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
