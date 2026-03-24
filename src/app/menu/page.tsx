"use client";

import { MenuContent } from "@/components/MenuContent";
import { useUser } from "@/hooks/useUser";
import { loginUrlWithReturnTo, MYPAGE_PATH } from "@/lib/authReturnPath";

export default function MenuPage() {
  const { user } = useUser();
  const mypageHref = user ? MYPAGE_PATH : loginUrlWithReturnTo(MYPAGE_PATH);

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-0 pt-6">
        <div className="mx-4 rounded-2xl bg-neutral-10 px-6 py-10 text-neutral-90">
          <MenuContent mypageHref={mypageHref} />
        </div>
      </section>
    </main>
  );
}
