"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { insertTarotResult } from "@/lib/tarotResultsDb";
import { readSavedReadings, removeSavedReading, upsertSavedReading } from "@/lib/savedReadings";

type CloudStatus = "idle" | "saving" | "saved" | "error" | "need-login";

export function ResultActionButtons({
  masterId,
  cardIndex,
  titleEn,
  titleKo,
  masterName,
  cardImagePath,
  interpretation,
}: Readonly<{
  masterId: string;
  cardIndex: number;
  titleEn: string;
  titleKo: string;
  masterName: string;
  /** `/images/...` 형태 권장 */
  cardImagePath: string;
  interpretation: string;
}>) {
  const { user, loading: authLoading } = useUser();
  const [savedLocal, setSavedLocal] = useState(false);
  const [toast, setToast] = useState("");
  const [cloudStatus, setCloudStatus] = useState<CloudStatus>("idle");

  const readingId = useMemo(() => `${masterId}-${cardIndex}`, [masterId, cardIndex]);
  const hasSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const cardDisplayName = `${titleKo} (${titleEn})`;

  useEffect(() => {
    if (hasSupabase) return;
    const exists = readSavedReadings().some((v) => v.id === readingId);
    setSavedLocal(exists);
  }, [hasSupabase, readingId]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(t);
  }, [toast]);

  /** 로그인 + Supabase: 결과 페이지 진입 직후 1회 클라우드 저장 (세션당 중복 방지) */
  useEffect(() => {
    if (!hasSupabase || authLoading) return;

    if (!user) {
      setCloudStatus("need-login");
      return;
    }

    const storageKey = `yourtarot_cloud_saved:v1:${user.id}:${masterId}:${cardIndex}`;
    if (sessionStorage.getItem(storageKey)) {
      setCloudStatus("saved");
      return;
    }

    setCloudStatus("saving");

    let cancelled = false;
    void (async () => {
      const { error } = await insertTarotResult({
        userId: user.id,
        cardName: cardDisplayName,
        masterName,
        cardImage: cardImagePath,
        interpretation,
      });
      if (cancelled) return;
      if (error) {
        setCloudStatus("error");
        setToast("클라우드 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }
      sessionStorage.setItem(storageKey, "1");
      setCloudStatus("saved");
    })();

    return () => {
      cancelled = true;
    };
  }, [
    authLoading,
    cardDisplayName,
    cardImagePath,
    cardIndex,
    hasSupabase,
    interpretation,
    masterId,
    masterName,
    user,
  ]);

  const onSaveLocal = () => {
    try {
      if (savedLocal) {
        removeSavedReading(readingId);
        setSavedLocal(false);
        setToast("저장이 취소되었습니다.");
        return;
      }

      upsertSavedReading({
        id: readingId,
        masterId,
        card: cardIndex,
        titleEn,
        titleKo,
        createdAt: new Date().toISOString(),
      });
      setSavedLocal(true);
      setToast("기기에 저장되었습니다.");
    } catch {
      window.alert("결과 저장 중 문제가 발생했습니다.");
    }
  };

  const cloudHint = () => {
    if (!hasSupabase) return null;
    if (authLoading || cloudStatus === "idle") {
      return <p className="mt-2 text-center text-[11px] text-[#aa9dce]">기록 상태 확인 중…</p>;
    }
    if (cloudStatus === "need-login") {
      return (
        <p className="mt-2 text-center text-[11px] leading-snug text-[#aa9dce]">
          로그인하면 결과가{" "}
          <Link href="/login" className="text-[#d8ccff] underline underline-offset-2">
            마이페이지
          </Link>
          에 자동으로 남아요.
        </p>
      );
    }
    if (cloudStatus === "saving") {
      return <p className="mt-2 text-center text-[11px] text-[#aa9dce]">클라우드에 저장하는 중…</p>;
    }
    if (cloudStatus === "saved") {
      return (
        <p className="mt-2 text-center text-[11px] text-[#9d8fd6]">
          ☁️ 이 리딩은 계정에 저장되었습니다.{" "}
          <Link href="/mypage" className="text-[#d8ccff] underline underline-offset-2">
            마이페이지
          </Link>
        </p>
      );
    }
    if (cloudStatus === "error") {
      return (
        <p className="mt-2 text-center text-[11px] text-[#e8a598]">
          클라우드 저장에 실패했습니다. 네트워크와 Supabase 설정을 확인해 주세요.
        </p>
      );
    }
    return null;
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-3">
        <Link
          href={`/page_03_card-selection_1?master=${masterId}`}
          className="rounded-xl bg-[#6422AB] px-4 py-3 text-center text-[15px] font-semibold text-white"
        >
          다시하기
        </Link>
        {hasSupabase ? (
          <Link
            href="/mypage"
            className="rounded-xl border border-primary bg-[rgba(12,10,36,0.92)] px-4 py-3 text-center text-[15px] text-[#d8ccff]"
          >
            기록 보기
          </Link>
        ) : (
          <button
            type="button"
            onClick={onSaveLocal}
            className="rounded-xl border border-primary bg-[rgba(12,10,36,0.92)] px-4 py-3 text-[15px] text-[#d8ccff]"
          >
            {savedLocal ? "저장 취소" : "기기에 저장"}
          </button>
        )}
      </div>
      {cloudHint()}
      {toast ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[700] mx-auto w-[calc(100%-32px)] max-w-[358px] rounded-xl border border-[#8d6cd8]/70 bg-[rgba(22,16,48,0.94)] px-3 py-2 text-center text-[12px] text-[#efe7ff] shadow-[0_10px_30px_rgba(0,0,0,0.35)] animate-[toastIn_160ms_ease-out]">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
