import type { Metadata } from "next";
import { AccountSecurityView } from "@/components/Account";

export const metadata: Metadata = {
  title: "Seguranca | Casino",
  description: "Historico de logins e sessoes ativas da conta.",
};

export default function AccountSecurityPage() {
  return <AccountSecurityView />;
}
