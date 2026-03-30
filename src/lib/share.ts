"use client";

type KakaoSharePayload = {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
};

export function getCurrentShareUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.href;
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

export async function shareToKakao(payload: KakaoSharePayload = {}): Promise<boolean> {
  const url = payload.url ?? getCurrentShareUrl();
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
