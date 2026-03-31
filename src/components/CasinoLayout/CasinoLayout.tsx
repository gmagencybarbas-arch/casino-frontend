"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { MobileSidebarPanel } from "@/components/MobileSidebarPanel";
import { Footer } from "@/components/Footer";
import { useLayoutStore } from "@/store/useLayoutStore";
import { useThemeCustomizerModalStore } from "@/store/useThemeCustomizerModalStore";

/** Chunk do modal só após a 1.ª abertura — bundle inicial mais leve no mobile. */
const ThemeCustomizerModal = dynamic(
  () =>
    import("@/components/ThemeCustomizerModal").then((m) => ({
      default: m.ThemeCustomizerModal,
    })),
  { ssr: false, loading: () => null }
);

interface CasinoLayoutProps {
  children: React.ReactNode;
}

export function CasinoLayout({ children }: CasinoLayoutProps) {
  const { sidebarCollapsed } = useLayoutStore();
  const themeModalOpen = useThemeCustomizerModalStore((s) => s.open);
  const [themeModalMounted, setThemeModalMounted] = useState(false);

  useEffect(() => {
    if (themeModalOpen) setThemeModalMounted(true);
  }, [themeModalOpen]);

  return (
    <div className="flex min-h-screen w-full max-w-[100vw] min-w-0 flex-col overflow-x-hidden bg-[var(--color-background)]">
      <Header />

      <div className="flex min-w-0 flex-1 overflow-x-hidden">
        <Sidebar />

        <main
          className={`min-w-0 max-w-full flex-1 overflow-x-hidden transition-all duration-300 ${
            sidebarCollapsed ? "md:ml-0" : "md:ml-0"
          }`}
          style={{
            marginLeft: sidebarCollapsed ? undefined : undefined,
            paddingBottom: "var(--mobile-nav-height, 60px)",
          }}
        >
          <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-6 md:px-6 md:py-8">
            {children}
          </div>
        </main>
      </div>

      <Footer />
      <MobileBottomNav />
      <MobileSidebarPanel />
      {themeModalMounted ? <ThemeCustomizerModal /> : null}
    </div>
  );
}
