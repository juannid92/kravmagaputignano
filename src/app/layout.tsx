import type { Metadata } from "next";
import { Oswald, Marcellus } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CookieConsent } from "@/components/CookieConsent";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-next-display",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-next-marcellus",
});

export const metadata: Metadata = {
  title: "Krav Maga Putignano | Difesa Personale a Putignano e Conversano",
  description:
    "Scuola di Krav Maga a Putignano (BA). Corsi per adulti e bambini (6-12 anni) a Putignano e Conversano. Istruttore certificato 4° Livello Saverio Mauro Capozza. Prenota una lezione di prova gratuita.",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: [
    "krav maga putignano",
    "krav maga conversano",
    "krav maga bari",
    "krav maga provincia bari",
    "difesa personale putignano",
    "difesa personale bari",
    "difesa personale conversano",
    "autodifesa puglia",
    "corso krav maga putignano",
    "corso krav maga bambini",
    "defensystem kids putignano",
  ],
  authors: [{ name: "Krav Maga Putignano" }],
  openGraph: {
    title: "Krav Maga Putignano | Difesa Personale a Putignano e Conversano",
    description:
      "Corsi di Krav Maga per adulti e bambini a Putignano e Conversano. Istruttore certificato 4° Livello. Prima lezione gratuita.",
    locale: "it_IT",
    type: "website",
    siteName: "Krav Maga Putignano",
    images: [
      {
        url: "https://images.pexels.com/photos/7045757/pexels-photo-7045757.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 800,
        alt: "Krav Maga Putignano — allenamento di difesa personale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krav Maga Putignano | Difesa Personale",
    description:
      "Corsi di Krav Maga a Putignano e Conversano. Adulti e bambini. Prima lezione gratuita.",
    images: [
      "https://images.pexels.com/photos/7045757/pexels-photo-7045757.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://kravmagaputignano.it",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Krav Maga Putignano",
    description:
      "Scuola di Krav Maga a Putignano. Corsi per adulti, ragazzi e difesa personale femminile.",
    url: "https://kravmagaputignano.it",
    telephone: "+393407106618",
    email: "segreteria@global-defender.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via G. Leopardi, 56",
      addressLocality: "Putignano",
      addressRegion: "BA",
      postalCode: "70017",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.8522,
      longitude: 17.0212,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday"],
        opens: "19:30",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday"],
        opens: "20:00",
        closes: "21:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Wednesday"],
        opens: "17:00",
        closes: "18:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Thursday"],
        opens: "20:00",
        closes: "21:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "20:00",
        closes: "21:30",
      },
    ],
    sameAs: [
      "https://facebook.com/kravmagaputignano",
      "https://instagram.com/kravmagaputignano",
    ],
    priceRange: "€€",
  };

  return (
    <html lang="it" className={`${oswald.variable} ${marcellus.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/videos/hero-poster-720p.jpg"
          fetchPriority="high"
        />
        <link rel="preload" as="image" href="/images/federkravmaga-logo.jpg" />
      </head>
      <body className={`antialiased ${oswald.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <CustomCursor />
        <LenisProvider>{children}</LenisProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
