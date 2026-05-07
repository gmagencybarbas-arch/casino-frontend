import type { Metadata } from "next";
import { AccountProfileView } from "@/components/Account";

export const metadata: Metadata = {
  title: "Minha conta | Casino",
  description: "Dados pessoais, status KYC e progresso da conta.",
};

export default function AccountProfilePage() {
  return <AccountProfileView />;
}
