"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LegacyPathRedirectInner({ hrefBase }: { hrefBase: string }) {
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const q = sp.toString();
    router.replace(q ? `${hrefBase}?${q}` : hrefBase);
  }, [hrefBase, router, sp]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center text-[15px] text-[#d8ccff]">
      <p>새 주소로 이동 중…</p>
    </main>
  );
}

/** 구 URL 유지: 쿼리 보존하여 새 경로로 교체 이동 */
export function LegacyPathRedirect({ hrefBase }: { hrefBase: string }) {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center text-[15px] text-[#d8ccff]">
          <p>이동 중…</p>
        </main>
      }
    >
      <LegacyPathRedirectInner hrefBase={hrefBase} />
    </Suspense>
  );
}
