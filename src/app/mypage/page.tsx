"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function MyPage() {
  const router = useRouter();
  const { logout } = useUser();

  const onLogout = async () => {
    await logout();
    router.push("/");
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

