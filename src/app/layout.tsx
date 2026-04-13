import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlobalModal } from "@/components/GlobalModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Casino - Jogos de Apostas Online",
  description: "Plataforma de cassino online com slots, live casino, videobingo e apostas esportivas. Jogue com responsabilidade.",
  openGraph: {
    title: "Casino - Jogos de Apostas Online",
    description: "Plataforma de cassino online com slots, live casino, videobingo e apostas esportivas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GlobalModal />
      </body>
    </html>
  );
}
