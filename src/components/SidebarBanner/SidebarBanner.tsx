"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export function SidebarBanner() {
  const [banner, setBanner] = useState<{ id: string; image: string; link: string; title: string } | null>(null);

  useEffect(() => {
    api.getSidebarBanner().then(setBanner);
  }, []);

  if (!banner) return null;

  return (
    <Link
      href={banner.link}
      className="relative mb-4 block w-full shrink-0 overflow-hidden rounded-[12px] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-transform duration-300 hover:scale-[1.02]"
      style={{ aspectRatio: "329/198" }}
    >
      <Image
        src={banner.image}
        alt={banner.title}
        fill
        className="object-cover"
        sizes="280px"
        loading="eager"
        unoptimized
      />
    </Link>
  );
}
