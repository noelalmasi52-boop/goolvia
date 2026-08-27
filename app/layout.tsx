import type { Metadata, Viewport } from "next";
import { Antonio } from "next/font/google";
import { Geist } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/layout/Footer";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://goolvia.com"),
  title: "GOOLVIA — Zaži To Naživo",
  description: "Futbalové zážitky za najlepšiu cenu. Let, hotel, vstupenka — všetko na jednom mieste.",
  openGraph: {
    title: "GOOLVIA — Zaži To Naživo",
    description: "Futbalové výlety do Európy za najlepšiu cenu.",
    images: [{ url: "/stadium.png", width: 1200, height: 630, alt: "Goolvia — futbalové výlety" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOOLVIA — Zaži To Naživo",
    description: "Futbalové výlety do Európy za najlepšiu cenu.",
    images: ["/stadium.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`${antonio.variable} ${geist.variable}`}>
      <body>
        {children}
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
