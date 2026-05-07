import type { Metadata } from "next";
import { AccountBetsView } from "@/components/Account";

export const metadata: Metadata = {
  title: "Historico de apostas | Casino",
  description: "Lista de apostas, ganhos e perdas por jogo.",
};

export default function AccountBetsPage() {
  return <AccountBetsView />;
}
