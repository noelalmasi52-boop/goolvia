import type { Metadata } from "next";
import { Antonio } from "next/font/google";
import { Geist } from "next/font/google";
import "./globals.css";

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GOOLVIA — Zaži To Naživo",
  description: "Futbalové zážitky za najlepšiu cenu. Dostaň sa na zápas lacno.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`${antonio.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
