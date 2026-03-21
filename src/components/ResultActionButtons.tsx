"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { readSavedReadings, removeSavedReading, upsertSavedReading } from "@/lib/savedReadings";

export function ResultActionButtons({
  masterId,
  cardIndex,
  titleEn,
  titleKo,
}: Readonly<{
  masterId: string;
  cardIndex: number;
  titleEn: string;
  titleKo: string;
}>) {
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState("");
  const readingId = useMemo(() => `${masterId}-${cardIndex}`, [masterId, cardIndex]);

  useEffect(() => {
    const exists = readSavedReadings().some((v) => v.id === readingId);
    setSaved(exists);
  }, [readingId]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 1400);
    return () => window.clearTimeout(t);
  }, [toast]);

  const onSave = () => {
    try {
      if (saved) {
        removeSavedReading(readingId);
        setSaved(false);
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
      setSaved(true);
      setToast("결과가 저장되었습니다.");
    } catch {
      window.alert("결과 저장 중 문제가 발생했습니다.");
    }
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
        <button
          type="button"
          onClick={onSave}
          className="rounded-xl border border-primary bg-[rgba(12,10,36,0.92)] px-4 py-3 text-[15px] text-[#d8ccff]"
        >
          {saved ? "저장 취소" : "결과 저장"}
        </button>
      </div>
      {toast ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[700] mx-auto w-[calc(100%-32px)] max-w-[358px] rounded-xl border border-[#8d6cd8]/70 bg-[rgba(22,16,48,0.94)] px-3 py-2 text-center text-[12px] text-[#efe7ff] shadow-[0_10px_30px_rgba(0,0,0,0.35)] animate-[toastIn_160ms_ease-out]">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
