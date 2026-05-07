import type { Metadata } from "next";
import { AccountBonusesView } from "@/components/Account";

export const metadata: Metadata = {
  title: "Meus bonus | Casino",
  description: "Acompanhe status e progresso dos bonus ativos.",
};

export default function AccountBonusesPage() {
  return <AccountBonusesView />;
}
