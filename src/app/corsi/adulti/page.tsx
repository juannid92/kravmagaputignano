import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CorsoPage } from "@/components/CorsoPage";
import { BreadcrumbList } from "@/components/BreadcrumbList";

export const metadata: Metadata = {
  title: "Corsi Krav Maga Adulti | Putignano e Conversano",
  description:
    "Corso di Krav Maga per adulti (dai 13 anni): difesa personale reale, situazioni concrete, metodo progressivo. Sedi a Putignano (Joy Fit) e Conversano (Imperial Gym). Prima lezione gratuita.",
  alternates: { canonical: "https://www.difesapersonalekravmaga.it/corsi/adulti" },
  openGraph: {
    title: "Corsi Krav Maga Adulti a Putignano e Conversano",
    description:
      "Difesa personale reale per adulti. Sedi a Putignano e Conversano. Prima lezione gratuita.",
    type: "article",
    locale: "it_IT",
    images: [
      {
        url: "https://www.difesapersonalekravmaga.it/images/adulti-gruppo.jpg",
        width: 1200,
        height: 800,
        alt: "Krav Maga Adulti — allenamento di difesa personale a Putignano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corsi Krav Maga Adulti | Putignano e Conversano",
    description:
      "Difesa personale reale per adulti. Sedi a Putignano e Conversano. Prima lezione gratuita.",
    images: [
      "https://www.difesapersonalekravmaga.it/images/adulti-gruppo.jpg",
    ],
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Corso Krav Maga Adulti — Difesa Personale Reale",
  description:
    "Corso di Krav Maga per adulti dai 13 anni: gestione dell'aggressione, difesa da prese e strangolamenti, attacchi multipli, disarmi. Programma FederKravMaga con esami federali. Sedi a Putignano e Conversano.",
  provider: {
    "@type": "Organization",
    name: "SSD Global Defender Srl",
    url: "https://www.difesapersonalekravmaga.it",
  },
  instructor: {
    "@type": "Person",
    name: "Saverio Mauro Capozza",
    jobTitle: "Istruttore 4° Livello Krav Maga",
  },
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "Adult",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Prime 2 lezioni di prova gratuite, senza impegno",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: [
    {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: {
        "@type": "Place",
        name: "Palestra Joy Fit",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Via G. Leopardi, 56",
          addressLocality: "Putignano",
          addressRegion: "BA",
          postalCode: "70017",
          addressCountry: "IT",
        },
      },
      schedule: {
        "@type": "Schedule",
        repeatFrequency: "P1W",
        byDay: ["http://schema.org/Monday", "http://schema.org/Wednesday"],
        startTime: "20:00",
        endTime: "21:30",
      },
    },
    {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: {
        "@type": "Place",
        name: "Imperial Gym",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Conversano",
          addressRegion: "BA",
          addressCountry: "IT",
        },
      },
      schedule: {
        "@type": "Schedule",
        repeatFrequency: "P1W",
        byDay: ["http://schema.org/Tuesday", "http://schema.org/Thursday"],
        startTime: "20:00",
        endTime: "21:30",
      },
    },
  ],
};

export default function CorsiAdultiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <BreadcrumbList
        items={[
          { name: "Home", url: "https://www.difesapersonalekravmaga.it" },
          { name: "Corsi", url: "https://www.difesapersonalekravmaga.it#percorsi" },
          { name: "Adulti", url: "https://www.difesapersonalekravmaga.it/corsi/adulti" },
        ]}
      />
      <Header />
      <CorsoPage variant="adulti" />
      <Footer />
    </>
  );
}
