import type { SidebarSectionKey } from "@/constants/sidebar";

/** Classes do wrapper do ícone: redes sociais com cores de marca (não usam cor do tema). */
export function getSidebarIconWrapperClass(
  sectionKey: SidebarSectionKey,
  iconName: string
): string {
  const base = "inline-flex shrink-0";
  if (sectionKey !== "social") {
    return `${base} text-[var(--color-primary)]`;
  }
  switch (iconName) {
    case "instagram":
      return base;
    case "telegram":
      return `${base} text-[#229ED9]`;
    case "whatsapp":
      return `${base} text-[#25D366]`;
    default:
      return `${base} text-[var(--color-primary)]`;
  }
}
