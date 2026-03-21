"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { requestTarotResultCloudSave } from "@/lib/tarotCloudInsertOnce";
import { buildTarotReadingId, upsertTarotResult } from "@/lib/tarotResultsDb";
import { readSavedReadings, removeSavedReading, upsertSavedReading } from "@/lib/savedReadings";

/** Supabase 사용 시: 비로그인(guest) | 저장 가능(idle) | 진행(saving) | 완료(saved) | 실패(error) */
type CloudUiState = "guest" | "idle" | "saving" | "saved" | "error";

const SESSION_SAVED_MARK = "1";

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
  const router = useRouter();
  const { user, loading: authLoading } = useUser();
  const [savedLocal, setSavedLocal] = useState(false);
  const [toast, setToast] = useState("");
  const [cloudUi, setCloudUi] = useState<CloudUiState>("idle");

  const localReadingKey = useMemo(() => `${masterId}-${cardIndex}`, [masterId, cardIndex]);
  const hasSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const cardDisplayName = `${titleKo} (${titleEn})`;
  const tarotReadingId = useMemo(() => buildTarotReadingId(masterId, cardIndex), [masterId, cardIndex]);

  useEffect(() => {
    if (hasSupabase) return;
    const exists = readSavedReadings().some((v) => v.id === localReadingKey);
    setSavedLocal(exists);
  }, [hasSupabase, localReadingKey]);

  useEffect(() => {
    if (!toast) return;
    let ms = 2000;
    if (toast.includes("마이페이지에 저장했어요")) ms = 2800;
    if (toast.includes("로그인 후 저장")) ms = 2400;
    const t = window.setTimeout(() => setToast(""), ms);
    return () => window.clearTimeout(t);
  }, [toast]);

  /**
   * Supabase 호출 없음. 같은 탭에서 이미 「저장하기」로 성공한 경우(sessionStorage)에만
   * 버튼을 「저장됨」으로 맞춤.
   */
  useEffect(() => {
    if (!hasSupabase || authLoading) return;
    if (!user) {
      setCloudUi("guest");
      return;
    }
    const key = `yourtarot_cloud_saved:${user.id}:${tarotReadingId}`;
    if (typeof window !== "undefined" && sessionStorage.getItem(key) === SESSION_SAVED_MARK) {
      setCloudUi("saved");
      return;
    }
    setCloudUi((prev) => (prev === "saving" ? prev : "idle"));
  }, [authLoading, hasSupabase, tarotReadingId, user]);

  const onGuestSaveClick = useCallback(() => {
    setToast("로그인 후 저장할 수 있어요");
    const returnTo =
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}` || "/"
        : "/";
    window.setTimeout(() => {
      router.push(`/login?returnTo=${encodeURIComponent(returnTo)}`);
    }, 650);
  }, [router]);

  const onCloudSave = useCallback(() => {
    if (!hasSupabase || !user || cloudUi === "saved" || cloudUi === "saving") return;

    const storageKey = `yourtarot_cloud_saved:${user.id}:${tarotReadingId}`;
    setCloudUi("saving");

    void requestTarotResultCloudSave(storageKey, () =>
      upsertTarotResult({
        userId: user.id,
        readingId: tarotReadingId,
        cardName: cardDisplayName,
        masterName,
        cardImage: cardImagePath,
        interpretation,
      }),
    ).then((result) => {
      if (result.ok) {
        setCloudUi("saved");
        setToast("마이페이지에 저장했어요");
        return;
      }
      setCloudUi("error");
      setToast("저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    });
  }, [
    cardDisplayName,
    cardImagePath,
    cloudUi,
    hasSupabase,
    interpretation,
    masterName,
    tarotReadingId,
    user,
  ]);

  const onSaveLocal = () => {
    try {
      if (savedLocal) {
        removeSavedReading(localReadingKey);
        setSavedLocal(false);
        setToast("저장이 취소되었습니다.");
        return;
      }

      upsertSavedReading({
        id: localReadingKey,
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
    if (authLoading) {
      return <p className="mt-2 text-center text-[11px] text-[#aa9dce]">로그인 확인 중…</p>;
    }
    if (cloudUi === "guest") {
      return (
        <p className="mt-2 text-center text-[11px] leading-snug text-[#aa9dce]">
          보관하려면 로그인한 뒤 <span className="text-[#d8ccff]">저장하기</span>를 눌러 주세요.
        </p>
      );
    }
    if (cloudUi === "error") {
      return (
        <p className="mt-2 text-center text-[11px] text-[#e8a598]">
          저장에 실패했습니다. 연결을 확인한 뒤 다시 눌러 주세요.
        </p>
      );
    }
    return (
      <p className="mt-2 text-center text-[11px] text-[#aa9dce]">
        <Link href="/mypage" className="text-[#d8ccff] underline underline-offset-2">
          마이페이지에서 기록 보기
        </Link>
      </p>
    );
  };

  const cloudSaveButton = () => {
    if (!hasSupabase) return null;

    if (authLoading) {
      return (
        <button
          type="button"
          disabled
          className="rounded-xl border border-primary/50 bg-[rgba(12,10,36,0.6)] px-4 py-3 text-center text-[15px] text-[#d8ccff]/60"
        >
          확인 중…
        </button>
      );
    }

    if (cloudUi === "guest") {
      return (
        <button
          type="button"
          onClick={onGuestSaveClick}
          className="rounded-xl border border-primary bg-[rgba(12,10,36,0.92)] px-4 py-3 text-center text-[15px] font-semibold text-[#d8ccff]"
        >
          저장하기
        </button>
      );
    }

    if (cloudUi === "saved") {
      return (
        <button
          type="button"
          disabled
          className="rounded-xl border border-[#6b5a9e] bg-[rgba(12,10,36,0.55)] px-4 py-3 text-center text-[15px] font-medium text-[#c4b8e8]"
        >
          저장됨
        </button>
      );
    }

    if (cloudUi === "saving") {
      return (
        <button
          type="button"
          disabled
          className="rounded-xl border border-primary/60 bg-[rgba(12,10,36,0.75)] px-4 py-3 text-center text-[15px] text-[#d8ccff]"
        >
          저장 중…
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={onCloudSave}
        className="rounded-xl border border-primary bg-[rgba(12,10,36,0.92)] px-4 py-3 text-center text-[15px] font-semibold text-[#d8ccff]"
      >
        저장하기
      </button>
    );
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
          cloudSaveButton()
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
