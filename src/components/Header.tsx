"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";

const ICON_MENU = "/assets/icon-menu-header-v3.png";
const ICON_EYE = "/assets/icon-eye-header-v2.png";
const ICON_UNICORN = "/assets/icon-unicorn-auth-v2.png";
const ICON_GUEST = "/assets/icon-user-guest-v1.png";

export function Header({
  onMenuClick,
}: Readonly<{
  onMenuClick?: () => void;
}>) {
  const { user } = useUser();
  const isLoggedIn = Boolean(user);

  return (
    <header className="w-full bg-[#17182E]">
      <div className="mx-auto flex h-[42px] w-full max-w-[430px] items-center justify-between px-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="메뉴 열기"
          className="flex h-[42px] w-[42px] items-center justify-center"
        >
          <Image src={ICON_MENU} alt="" width={42} height={42} />
        </button>

        <Link href="/" aria-label="홈">
          <Image src={ICON_EYE} alt="YourTarot" width={46} height={28} />
        </Link>

        {isLoggedIn ? (
          <Link
            href="/mypage"
            className="flex h-[42px] w-[42px] items-center justify-center"
            aria-label="마이페이지로 이동"
          >
            <Image src={ICON_UNICORN} alt="" width={42} height={42} />
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex h-[42px] w-[42px] items-center justify-center"
            aria-label="로그인 페이지로 이동"
          >
            <Image src={ICON_GUEST} alt="" width={42} height={42} />
          </Link>
        )}
      </div>
    </header>
  );
}

