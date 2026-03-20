"use client";

import React from "react";

export function DismissibleGuide({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  const [opened, setOpened] = React.useState(true);
  if (!opened) return null;

  return (
    <div className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpened(false)}
        aria-label="안내 닫기"
        className="absolute right-3 top-2 text-[20px] leading-none text-white/90 hover:text-white"
      >
        ×
      </button>
      {children}
    </div>
  );
}
