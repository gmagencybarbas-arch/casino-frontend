import type { Metadata } from "next";
import { CasinoLayout } from "@/components/CasinoLayout";
import { AccountGate, AccountShell } from "@/components/Account";

export const metadata: Metadata = {
  title: "Conta | Casino",
  description: "Painel da conta com carteira, historico, bonus, perfil e seguranca.",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <CasinoLayout>
      <AccountGate>
        <AccountShell>{children}</AccountShell>
      </AccountGate>
    </CasinoLayout>
  );
}
