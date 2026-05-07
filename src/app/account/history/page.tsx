import type { Metadata } from "next";
import { AccountHistoryView } from "@/components/Account";

export const metadata: Metadata = {
  title: "Extrato | Casino",
  description: "Extrato de movimentacoes da conta com filtros e busca.",
};

export default function AccountHistoryPage() {
  return <AccountHistoryView />;
}
