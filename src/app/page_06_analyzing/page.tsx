"use client";

import Image from "next/image";
import Link from "next/link";
import { FlowScene } from "@/components/FlowScene";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LOADING_ICON = "/assets/Frame_154-26dc58c4-a9ad-4649-b973-c08847b7f089.png";

export default function Page06Analyzing() {
  const router = useRouter();
  const [master] = useState(() => {
    if (typeof window === "undefined") return "cassian";
    return new URL(window.location.href).searchParams.get("master") ?? "cassian";
  });
  const [card] = useState(() => {
    if (typeof window === "undefined") return "05";
    return new URL(window.location.href).searchParams.get("card") ?? "05";
  });
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 7));
    }, 220);

    const move = setTimeout(() => {
      router.push(`/page_07_reading-result_typea?master=${master}&card=${card}`);
    }, 2600);

    return () => {
      clearInterval(timer);
      clearTimeout(move);
    };
  }, [router, master, card]);

  return (
    <main className="w-full">
      <FlowScene>
        <div className="flex min-h-[460px] flex-col items-center justify-center">
          <Image src={LOADING_ICON} alt="loading" width={180} height={120} />
          <div className="mt-5 h-[18px] w-[320px] rounded-full bg-[#5a4414]">
            <div
              className="h-full rounded-full bg-[#d8b86a] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-7 w-full rounded-xl border border-white/60 bg-[rgba(8,8,12,0.7)] px-4 py-4 text-[16px] text-white">
            카드 마스터가 카드의 의미를 해석하고 있습니다.
          </div>
        </div>
      </FlowScene>
      <div className="mx-auto h-2 w-full max-w-[390px]" />
      <div className="mx-auto w-full max-w-[390px] px-4">
        <Link
          href={`/page_07_reading-result_typea?master=${master}&card=${card}`}
          className="block rounded-xl bg-[#6422AB] px-4 py-3 text-center text-sm font-semibold text-white"
        >
          다음: 결과 화면 보기
        </Link>
      </div>
    </main>
  );
}

