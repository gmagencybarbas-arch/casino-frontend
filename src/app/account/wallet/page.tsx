import type { Metadata } from "next";
import { AccountWalletView } from "@/components/Account/AccountWalletView";

export const metadata: Metadata = {
  title: "Carteira | Casino",
  description: "Controle de saldo, deposito e saque da sua conta.",
};

export default function AccountWalletPage() {
  return <AccountWalletView />;
}
