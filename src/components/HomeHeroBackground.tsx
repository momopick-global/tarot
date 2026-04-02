"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { withAssetBase } from "@/lib/publicPath";

const HOME_HERO_POSTER = withAssetBase("/images/main/yourtarot.webp");
const HOME_HERO_VIDEO = withAssetBase("/images/main/main.mp4");

/** 느린 네트워크에서도 로딩 오버레이가 무한히 남지 않도록 상한 */
const LOAD_TIMEOUT_MS = 25_000;

export function HomeHeroBackground() {
  const [overlayDismissed, setOverlayDismissed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playCountRef = useRef(0);

  const markVideoOk = () => {
    setVideoReady(true);
    setOverlayDismissed(true);
  };

  const markVideoFailed = () => {
    setVideoReady(false);
    setOverlayDismissed(true);
  };

  /** 이미 캐시되어 있으면 로드 이벤트가 리스너보다 먼저 끝나 로딩이 남을 수 있음 */
  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      markVideoOk();
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
      <video
        ref={videoRef}
        width={390}
        height={620}
        playsInline
        muted
        autoPlay
        preload="auto"
        poster={HOME_HERO_POSTER}
        onLoadedData={markVideoOk}
        onError={markVideoFailed}
        onEnded={(e) => {
          playCountRef.current += 1;
          if (playCountRef.current < 3) {
            e.currentTarget.currentTime = 0;
            void e.currentTarget.play();
          }
        }}
        className={`absolute inset-0 z-[1] h-full w-full object-cover object-top transition-opacity duration-500 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={HOME_HERO_VIDEO} type="video/mp4" />
      </video>
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
