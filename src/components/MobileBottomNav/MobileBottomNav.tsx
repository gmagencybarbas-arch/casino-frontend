"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutStore } from "@/store/useLayoutStore";
import { useHeaderAuthPreviewStore } from "@/store/useHeaderAuthPreviewStore";
import { SidebarIcon } from "@/components/Sidebar/SidebarIcon";

const NAV_ITEMS = [
  { href: "#", label: "Menu", action: "menu" as const, icon: "menu" as const },
  { href: "/casino", label: "Cassino", action: null, icon: "slot" as const },
  { href: "/", label: "Home", action: null, icon: "home" as const },
  { href: "/videobingo", label: "Videobingo", action: null, icon: "bingo" as const },
  { href: "/sports", label: "Esportes", action: null, icon: "trophy" as const },
  { href: "/promotions", label: "Promoções", action: "promotions" as const, icon: "gift" as const },
];

function NavIcon({
  name,
  sizeClass,
  colorClass,
}: {
  name: string;
  sizeClass: string;
  colorClass: string;
}) {
  return (
    <span className={`inline-flex shrink-0 ${colorClass}`}>
      <SidebarIcon name={name} className={sizeClass} />
    </span>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { openMobileMenu } = useLayoutStore();
  const setGuestPreview = useHeaderAuthPreviewStore((s) => s.setGuestPreview);
  const isHome = pathname === "/";

  const primaryIcon = "text-[var(--color-primary)]";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-2 mb-2 flex items-stretch justify-between gap-0 rounded-t-3xl border border-[var(--color-border)] border-b-0 bg-[var(--color-background-secondary)] px-0.5 py-2 shadow-[var(--shadow-elevated)] md:hidden">
      {NAV_ITEMS.map((item) => {
        const isCenter = item.action === null && item.href === "/";
        const isActive =
          item.href !== "#" &&
          (item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`));

        const iconColor = isCenter ? "text-black" : primaryIcon;
        const iconSize = isCenter ? "h-7 w-7" : "h-6 w-6";

        if (item.action === "menu") {
          return (
            <button
              key={item.label}
              type="button"
              onClick={openMobileMenu}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-0.5 py-1 ${primaryIcon} transition-colors active:opacity-80`}
            >
              <NavIcon name={item.icon} sizeClass={iconSize} colorClass={primaryIcon} />
              <span className="truncate text-[9px] font-medium leading-tight">{item.label}</span>
            </button>
          );
        }

        if (item.action === "promotions") {
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={() => setGuestPreview(true)}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-0.5 py-1 transition-all active:opacity-90 ${primaryIcon} ${
                isActive ? "opacity-100" : "opacity-80"
              }`}
            >
              <NavIcon name={item.icon} sizeClass={iconSize} colorClass={primaryIcon} />
              <span className="truncate text-[9px] font-medium leading-tight">{item.label}</span>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={item.href === "/"}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-0.5 py-1 transition-all active:opacity-90 ${
              isCenter ? "-mt-5" : ""
            } ${isCenter ? "" : `${primaryIcon} ${isActive ? "opacity-100" : "opacity-80"}`}`}
          >
            {isCenter ? (
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-accent)] shadow-[var(--shadow-card-hover)] ring-4 ring-[var(--color-background)]">
                  <NavIcon name={item.icon} sizeClass={iconSize} colorClass={iconColor} />
                </div>
                <span
                  className={`mt-1 max-w-full truncate px-0.5 text-[9px] font-semibold leading-tight ${
                    isHome ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ) : (
              <>
                <NavIcon name={item.icon} sizeClass={iconSize} colorClass={primaryIcon} />
                <span className="max-w-full truncate text-[9px] font-medium leading-tight">{item.label}</span>
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
