import type { Metadata, Viewport } from "next";
import { Golos_Text, Inter_Tight } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/store";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchOverlay } from "@/components/search-overlay";
import { CartToast } from "@/components/toast";
import { site } from "@/lib/content";

const display = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  variable: "--font-inter-tight",
  display: "swap",
});

const sans = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-golos",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "VERGELES — современная мебель с доставкой по России и Европе",
    template: "%s — VERGELES",
  },
  description: site.description,
  applicationName: "VERGELES",
  keywords: [
    "дизайнерская мебель",
    "премиальная мебель",
    "мебель из дуба",
    "диваны",
    "кресла",
    "обеденные столы",
    "мебель под заказ",
    "VERGELES",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "VERGELES",
    title: "VERGELES — Furniture for modern living",
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "VERGELES — Furniture for modern living" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VERGELES — Furniture for modern living",
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ef",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "VERGELES",
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Большая Пироговская ул., 27, стр. 3",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  areaServed: ["RU", "EU"],
  foundingDate: "2019",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-svh">
        <StoreProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
          >
            Перейти к содержанию
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <SearchOverlay />
          <CartToast />
        </StoreProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
