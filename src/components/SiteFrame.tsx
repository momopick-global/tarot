"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteFrame({
  children,
  hideFooter,
}: Readonly<{
  children: React.ReactNode;
  hideFooter?: boolean;
}>) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const hideHeaderOn = [
    "/page_03_card-selection_1",
    "/page_04_card-selection_2",
    "/page_05_masters_list5",
    "/page_06_analyzing",
    "/page_07_reading-result_typea",
    "/page-master-profile_01",
  ];
  const normalizedPathname = (pathname ?? "").replace(/\/+$/, "") || "/";
  const shouldHideHeader = hideHeaderOn.includes(normalizedPathname);
  const closeMenu = () => setIsMenuOpen(false);

  React.useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen w-full bg-[#202139] text-neutral-10">
      {!shouldHideHeader ? <Header onMenuClick={() => setIsMenuOpen(true)} /> : null}
      <div className="min-h-[1px]">{children}</div>
      {!hideFooter ? <Footer /> : null}

      {!shouldHideHeader ? (
        <div
          className={`fixed inset-0 z-50 transition ${
            isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-hidden={!isMenuOpen}
        >
          <button
            type="button"
            onClick={closeMenu}
            className={`absolute inset-0 bg-black/45 transition-opacity ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            aria-label="메뉴 닫기"
          />

          <aside
            className={`absolute left-0 top-0 h-full w-[82%] max-w-[330px] bg-neutral-10 p-6 text-neutral-90 shadow-2xl transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-[22px] font-semibold">YourTarot</div>
              <button
                type="button"
                onClick={closeMenu}
                className="grid h-9 w-9 place-items-center rounded-md border border-neutral-30 text-[18px]"
                aria-label="메뉴 닫기"
              >
                ×
              </button>
            </div>

            <nav className="mt-8 space-y-5 text-[18px] font-semibold">
              <Link href="/about" onClick={closeMenu} className="block">
                서비스 소개
              </Link>
              <Link href="/masters" onClick={closeMenu} className="block">
                타로 마스터 소개
              </Link>
              <Link href="/recommended" onClick={closeMenu} className="block">
                의견 받아요
              </Link>
              <Link href="/partner" onClick={closeMenu} className="block">
                제휴 문의
              </Link>
              <Link href="/login" onClick={closeMenu} className="block">
                로그인
              </Link>
              <Link href="/mypage" onClick={closeMenu} className="block">
                마이페이지
              </Link>
            </nav>

            <div className="mt-8 border-t border-neutral-30 pt-4 text-[14px] text-neutral-60">
              <Link href="/terms" onClick={closeMenu} className="hover:underline">
                이용약관
              </Link>
              {" · "}
              <Link href="/personal" onClick={closeMenu} className="hover:underline">
                개인정보처리방침
              </Link>
              {" · "}
              <Link href="/disclaimer" onClick={closeMenu} className="hover:underline">
                면책조항
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

