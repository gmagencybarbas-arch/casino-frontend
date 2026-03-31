/**
 * Brand configuration - White-label casino platform
 * Backend can override these values via API/config injection
 */

export interface BrandConfig {
  name: string;
  logo: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor?: string;
  backgroundColor: string;
  supportLinks?: { label: string; url: string }[];
  socialLinks?: { platform: string; url: string }[];
}

export const brandConfig: BrandConfig = {
  name: "CasinoBrand",
  logo: "/logo.png",
  favicon: "/favicon.ico",
  primaryColor: "#e5b318",
  secondaryColor: "#f0c420",
  backgroundColor: "#0a0a0d",
  supportLinks: [
    { label: "Central de Ajuda", url: "/help" },
    { label: "Jogo Responsável", url: "/responsible-gaming" },
    { label: "Contato", url: "/contact" },
  ],
  socialLinks: [
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "telegram", url: "https://t.me" },
    { platform: "whatsapp", url: "https://wa.me" },
  ],
};
