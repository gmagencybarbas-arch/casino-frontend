"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccountStore } from "@/store/useAccountStore";
import { useGlobalModal } from "@/store/useGlobalModal";

export function AccountGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const loggedIn = useAccountStore((s) => s.loggedIn);
  const openModal = useGlobalModal((s) => s.open);

  useEffect(() => {
    if (!loggedIn) {
      openModal("login");
      router.push("/");
    }
  }, [loggedIn, openModal, router]);

  if (!loggedIn) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-sm text-[var(--color-text-muted)]">
        Redirecionando para login...
      </div>
    );
  }

  return <>{children}</>;
}
