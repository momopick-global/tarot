"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_FLOW_BACKGROUND_SRC } from "@/lib/masterCardAssets";
import { withAssetBase } from "@/lib/publicPath";

const BG = DEFAULT_FLOW_BACKGROUND_SRC;
const BACK = withAssetBase("/assets/btn_back-de2e4927-d11f-4301-b319-3dee0a48266a.png");

export function FlowScene({
  children,
  backHref,
  hideBackgroundImage = false,
  backgroundSrc,
  backgroundFit = "cover",
  bottomFadeToBody = false,
  allowOverflow = false,
  hideDimOverlay = false,
  sceneClassName,
  contentClassName,
  backgroundImageClassName,
  backVariant = "default",
  backStyle = "image",
  backImageSrc,
  backImageSize,
  backLinkClassName,
  backgroundSpillColor,
}: Readonly<{
  children: React.ReactNode;
  backHref?: string;
  hideBackgroundImage?: boolean;
  backgroundSrc?: string;
  backgroundFit?: "cover" | "contain";
  bottomFadeToBody?: boolean;
  allowOverflow?: boolean;
  hideDimOverlay?: boolean;
  sceneClassName?: string;
  contentClassName?: string;
  backgroundImageClassName?: string;
  /** 공통 뒤로가기 버튼 프리셋 */
  backVariant?: "default" | "page03";
  backStyle?: "image" | "custom";
  backImageSrc?: string;
  backImageSize?: number;
  /** 뒤로가기 링크에만 적용 (예: /tarot/draw 에서 왼쪽 20px 간격) */
  backLinkClassName?: string;
  backgroundSpillColor?: string;
}>) {
  const pathname = usePathname() ?? "";
  const resolvedBackImageSrc =
    backImageSrc ??
    (backVariant === "page03" ? withAssetBase("/assets/btn-back-page03.png") : BACK);
  const resolvedBackImageSize = backImageSize ?? (backVariant === "page03" ? 42 : 52);
  const resolvedBackLinkClassName =
    backLinkClassName ?? (backVariant === "page03" ? "ml-[20px]" : "");

  const resolvedBgSrc = backgroundSrc ?? BG;
  const useSpillBackground = Boolean(backgroundSpillColor) && !hideBackgroundImage;

  return (
    <section
      key={pathname}
      className={`page-fade relative mx-auto min-h-[560px] w-full max-w-[390px] ${
        allowOverflow ? "overflow-visible" : "overflow-hidden"
      } ${
        hideBackgroundImage && !useSpillBackground ? "bg-[#07051c]" : ""
      } ${sceneClassName ?? ""}`}
      style={
        useSpillBackground
          ? {
              backgroundColor: backgroundSpillColor,
              backgroundImage: `url("${resolvedBgSrc}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top center",
              backgroundSize: "100% auto",
            }
          : undefined
      }
    >
      {!hideBackgroundImage && !useSpillBackground ? (
        <Image
          src={resolvedBgSrc}
          alt=""
          fill
          className={`${backgroundFit === "contain" ? "object-contain object-top" : "object-cover object-top"} ${backgroundImageClassName ?? ""}`}
          priority
        />
      ) : null}
      {!hideDimOverlay ? (
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,3,20,0.35)_0%,rgba(10,8,30,0.85)_100%)]" />
      ) : null}
      {bottomFadeToBody ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[80px] bg-gradient-to-b from-transparent to-[#202139]" />
      ) : null}

      <div
        className={`relative z-10 mx-auto w-full max-w-[390px] pt-4 ${contentClassName ?? "px-4"}`}
      >
        {backHref ? (
          <Link
            href={backHref}
            className={
              backStyle === "custom"
                ? `inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#8E63FF] bg-[rgba(14,10,35,0.88)] ${resolvedBackLinkClassName}`
                : `inline-flex ${resolvedBackLinkClassName}`
            }
            aria-label="뒤로가기"
          >
            {backStyle === "custom" ? (
              <span className="text-[22px] font-semibold leading-none text-[#BFA8FF]">←</span>
            ) : (
              <Image
                src={resolvedBackImageSrc}
                alt="뒤로가기"
                width={resolvedBackImageSize}
                height={resolvedBackImageSize}
              />
            )}
          </Link>
        ) : null}
        {children}
      </div>
    </section>
  );
}

