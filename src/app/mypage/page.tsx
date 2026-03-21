"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { FLOW_MASTERS } from "@/lib/flowData";
import { getMasterCardFrontSrc } from "@/lib/masterCardAssets";
import {
  clearSavedReadings,
  readSavedReadings,
  removeSavedReading,
  type SavedReading,
} from "@/lib/savedReadings";

function formatSavedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "저장 시간 정보 없음";
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

export default function MyPage() {
  const router = useRouter();
  const { logout } = useUser();
  const [saved, setSaved] = useState<SavedReading[]>([]);

  useEffect(() => {
    setSaved(readSavedReadings());
  }, []);

  const masterMap = useMemo(() => {
    return new Map(FLOW_MASTERS.map((m) => [m.id, m]));
  }, []);

  const onLogout = async () => {
    await logout();
    router.push("/");
  };

  const onDeleteOne = (id: string) => {
    setSaved(removeSavedReading(id));
  };

  const onDeleteAll = () => {
    const ok = window.confirm("저장된 결과를 모두 삭제할까요?");
    if (!ok) return;
    setSaved(clearSavedReadings());
  };

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-5 pt-14">
        <div className="flex flex-col items-center gap-4">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#b79cff_0%,#6f42c1_60%,#2b173f_100%)] text-[34px]">
            🦄
          </div>
          <div className="text-[18px] text-neutral-10">YourTarot</div>
        </div>

        <div className="mt-8 rounded-xl border border-primary/40 bg-[rgba(10,8,28,0.82)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-[16px] font-semibold text-white">저장된 결과</div>
            <button
              type="button"
              onClick={onDeleteAll}
              disabled={saved.length === 0}
              className="rounded-md border border-white/20 px-2 py-1 text-[11px] text-[#d8ccff] disabled:cursor-not-allowed disabled:opacity-50"
            >
              전체 삭제
            </button>
          </div>
          {saved.length === 0 ? (
            <p className="text-[13px] text-[#d8ccff]">아직 저장된 결과가 없습니다.</p>
          ) : (
            <div className="space-y-2">
              {saved.map((item) => {
                const master = masterMap.get(item.masterId) ?? FLOW_MASTERS[0];
                const href = `/page_07_reading-result_typea?master=${item.masterId}&card=${item.card}`;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-[rgba(255,255,255,0.03)] p-2"
                  >
                    <div className="relative h-[64px] w-[43px] overflow-hidden rounded-md border border-white/20">
                      <Image
                        src={getMasterCardFrontSrc(item.masterId, item.card)}
                        alt={`${master.name} 카드 ${item.card + 1}`}
                        fill
                        className="object-cover"
                        sizes="43px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link href={href} className="block">
                        <div className="truncate text-[13px] font-semibold text-white">
                          {item.titleEn || `Card #${item.card + 1}`}
                        </div>
                        <div className="truncate text-[12px] text-[#d8ccff]">
                          {master.name} · {item.titleKo || `카드 ${item.card + 1}`}
                        </div>
                      </Link>
                      <div className="pt-1 text-[11px] text-[#aa9dce]">{formatSavedAt(item.createdAt)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteOne(item.id)}
                      className="shrink-0 rounded-md border border-white/20 px-2 py-1 text-[11px] text-[#e8deff]"
                    >
                      삭제
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={onLogout}
            className="block w-full rounded-xl bg-[#6422AB] px-5 py-4 text-center text-[20px] font-semibold text-neutral-10"
          >
            로그아웃
          </button>
        </div>
      </section>
    </main>
  );
}

