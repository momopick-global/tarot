"use client";

import { siteOrigin } from "@/lib/siteUrl";

/** 카카오 CDN 고정 버전 — 배포 재현성용 */
const KAKAO_SDK_SRC = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";

type KakaoShare = {
  sendDefault: (opts: Record<string, unknown>) => Promise<unknown>;
  sendCustom: (opts: { templateId: number; templateArgs?: Record<string, string> }) => Promise<unknown>;
};

type KakaoGlobal = {
  init: (key: string) => void;
  isInitialized?: () => boolean;
  Share: KakaoShare;
};

declare global {
  interface Window {
    Kakao?: KakaoGlobal;
  }
}

function getJavaScriptKey(): string | undefined {
  const k = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY?.trim();
  return k || undefined;
}

export function hasKakaoJavaScriptKey(): boolean {
  return Boolean(getJavaScriptKey());
}

let sdkLoadPromise: Promise<KakaoGlobal> | null = null;

function loadKakaoSdk(): Promise<KakaoGlobal> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("window 없음"));
  }
  if (window.Kakao) {
    return Promise.resolve(window.Kakao);
  }
  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = KAKAO_SDK_SRC;
    script.async = true;
    script.onload = () => {
      if (window.Kakao) resolve(window.Kakao);
      else reject(new Error("Kakao SDK 로드 후 객체 없음"));
    };
    script.onerror = () => reject(new Error("Kakao SDK 스크립트 로드 실패"));
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

export async function ensureKakaoShareReady(): Promise<KakaoGlobal> {
  const key = getJavaScriptKey();
  if (!key) {
    throw new Error("NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY 없음");
  }
  const Kakao = await loadKakaoSdk();
  if (!Kakao.isInitialized?.()) {
    Kakao.init(key);
  }
  return Kakao;
}

/** 상대·basePath 포함 경로 → 공유용 절대 https URL */
export function toAbsolutePublicUrl(pathOrUrl: string | undefined): string | undefined {
  if (!pathOrUrl?.trim()) return undefined;
  const raw = pathOrUrl.trim();
  if (raw.startsWith("https://") || raw.startsWith("http://")) {
    return raw.startsWith("http://") ? raw.replace(/^http:\/\//, "https://") : raw;
  }
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return new URL(path, `${siteOrigin()}/`).href;
}
