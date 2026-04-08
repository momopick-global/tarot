"use client";

import { ensureKakaoShareReady, hasKakaoJavaScriptKey, toAbsolutePublicUrl } from "@/lib/kakaoShareSdk";
import { absoluteSiteUrl, siteOrigin } from "@/lib/siteUrl";

type KakaoSharePayload = {
  title?: string;
  description?: string;
  imageUrl?: string;
  /** 메인 링크 (content.link) */
  url?: string;
  /** 버튼 1: 결과 보기 → 결과 상세 페이지 URL */
  resultUrl?: string;
  /** 버튼 2: 테스트 하기 → 테스트 시작 페이지 URL */
  testUrl?: string;
};

/** Supabase 등이 URL 해시에 넣는 토큰은 공유·복사에 절대 포함하지 않음 */
function shareSafeHashFragment(hash: string): string {
  if (!hash || hash === "#") return "";
  const body = hash.startsWith("#") ? hash.slice(1) : hash;
  const lower = body.toLowerCase();
  if (
    lower.includes("access_token=") ||
    lower.includes("refresh_token=") ||
    lower.includes("provider_token=") ||
    lower.includes("provider_refresh_token=")
  ) {
    return "";
  }
  return `#${body}`;
}

export function getCurrentShareUrl(): string {
  if (typeof window === "undefined") return "";
  try {
    const origin = siteOrigin();
    const pathAndQuery = `${window.location.pathname}${window.location.search}`;
    const url = new URL(pathAndQuery, `${origin}/`);
    // OAuth 실패/콜백 잔여 쿼리가 공유 링크에 섞이지 않도록 제거
    [
      "error",
      "error_code",
      "error_description",
      "error_uri",
      "code",
      "state",
    ].forEach((key) => url.searchParams.delete(key));
    const safeHash = shareSafeHashFragment(window.location.hash);
    return `${url.origin}${url.pathname}${url.search}${safeHash}`;
  } catch {
    const origin = siteOrigin();
    return `${origin}${window.location.pathname}`;
  }
}

export async function copyShareUrl(url = getCurrentShareUrl()): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return true;
    }
  } catch {
    // fall through to legacy copy
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = url;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function openShareWindow(url: string): void {
  if (typeof window === "undefined") return;
  window.open(url, "_blank", "noopener,noreferrer,width=600,height=700");
}

function shareToKakaoWeb(url: string): boolean {
  const target = encodeURIComponent(url);
  openShareWindow(`https://sharer.kakao.com/talk/friends/picker/link?url=${target}`);
  return true;
}

const DEFAULT_KAKAO_FEED_TITLE = "유어타로";
const DEFAULT_KAKAO_FEED_DESCRIPTION = "타로로 오늘의 흐름을 확인해 보세요.";

/** 카카오 디벨로퍼 콘솔에 등록한 커스텀 메시지 템플릿 ID */
const KAKAO_CUSTOM_TEMPLATE_ID = 131879;

/**
 * 커스텀 템플릿(ID: 131879)으로 카카오 공유.
 * 템플릿 변수: IMAGE_URL, TITLE, DESC, RESULT_URL, START_URL
 * 없거나 실패 시 기존 sharer.kakao.com 링크 피커로 폴백.
 */
export async function shareToKakao(payload: KakaoSharePayload = {}): Promise<boolean> {
  const url = payload.url ?? getCurrentShareUrl();
  const title = payload.title?.trim() || DEFAULT_KAKAO_FEED_TITLE;
  const description = payload.description?.trim() || DEFAULT_KAKAO_FEED_DESCRIPTION;
  const imageFromPayload = toAbsolutePublicUrl(payload.imageUrl);
  const fallbackOg = absoluteSiteUrl("/og/yourtarot_og_kr2.png");
  const imageUrl = imageFromPayload || fallbackOg;

  const absResultUrl = payload.resultUrl
    ? (toAbsolutePublicUrl(payload.resultUrl) ?? url)
    : url;
  const absTestUrl = payload.testUrl
    ? (toAbsolutePublicUrl(payload.testUrl) ?? url)
    : url;

  if (hasKakaoJavaScriptKey()) {
    try {
      const Kakao = await ensureKakaoShareReady();
      await Kakao.Share.sendCustom({
        templateId: KAKAO_CUSTOM_TEMPLATE_ID,
        templateArgs: {
          IMAGE_URL: imageUrl,
          TITLE: title,
          DESC: description,
          RESULT_URL: absResultUrl,
          START_URL: absTestUrl,
        },
      });
      return true;
    } catch (e) {
      console.warn("[shareToKakao] SDK 실패, 웹 공유로 폴백:", e);
    }
  }

  return shareToKakaoWeb(url);
}

export function shareToFacebook(url = getCurrentShareUrl()): void {
  const target = encodeURIComponent(url);
  openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${target}`);
}

export function shareToX(url = getCurrentShareUrl()): void {
  const target = encodeURIComponent(url);
  openShareWindow(`https://x.com/intent/post?url=${target}`);
}
