"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type HeaderBrandProps = {
  brandLogo: string | undefined;
};

export const HeaderBrand = memo(function HeaderBrand({ brandLogo }: HeaderBrandProps) {
  return (
    <Link href="/" prefetch className="flex min-w-0 shrink-0 items-center gap-2">
      {brandLogo ? (
        <Image
          src={brandLogo}
          alt="Logo"
          width={160}
          height={48}
          priority
          className="max-h-7 w-auto max-w-[112px] object-contain object-left sm:max-h-8 sm:max-w-[130px] md:max-h-10 md:max-w-[220px]"
          unoptimized
        />
      ) : (
        <span className="truncate text-sm font-bold tracking-tight text-[var(--color-text)] sm:text-base md:text-lg">
          ProjetoX
        </span>
      )}
    </Link>
  );
});
