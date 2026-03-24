"use client";

import Image from "next/image";
import Link from "next/link";
import { FlowScene } from "@/components/FlowScene";
import { getMasterBackgroundSrc } from "@/lib/masterCardAssets";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { withAssetBase } from "@/lib/publicPath";

const POPUP_IMAGE_PATH = withAssetBase("/images/ch.png");

function Page06AnalyzingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const master = (searchParams?.get("master") ?? "cassian").toLowerCase();
  const card = searchParams?.get("card") ?? "05";
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
      <FlowScene backgroundSrc={getMasterBackgroundSrc(master, 3)}>
        <div className="flex min-h-[460px] flex-col items-center justify-center">
          <div className="mt-7 w-full max-w-[350px] rounded-xl border border-primary bg-[rgba(9,7,28,0.94)] p-4 text-white shadow-2xl">
            <div className="mb-3 flex justify-center">
              <div className="relative h-[124px] w-[124px] overflow-hidden rounded-full">
                <Image src={POPUP_IMAGE_PATH} alt="가이드 마스터 이미지" fill className="object-cover" />
              </div>
            </div>
            <div className="text-center text-[16px] leading-[1.6] text-white">
              카드 마스터가 카드의 의미를 해석하고 있습니다.
            </div>
            <div className="mt-4 h-[14px] w-full rounded-full bg-[#3b2a66]">
              <div
                className="h-full rounded-full bg-[#8e63ff] transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <Link
              href={`/page_07_reading-result_typea?master=${master}&card=${card}`}
              className="mt-4 block rounded-lg bg-[#6422AB] px-4 py-2.5 text-center text-[16px] font-semibold text-white"
            >
              결과화면보기
            </Link>
          </div>
        </div>
      </FlowScene>
    </main>
  );
}

export default function Page06Analyzing() {
  return (
    <Suspense fallback={null}>
      <Page06AnalyzingInner />
    </Suspense>
  );
}

