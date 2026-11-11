import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CorsoPage } from "@/components/CorsoPage";
import { BreadcrumbList } from "@/components/BreadcrumbList";

export const metadata: Metadata = {
  title: "Defensystem Kids 6-12 anni | Krav Maga Putignano",
  description:
    "Corso di Krav Maga e premartialità per bambini 6-12 anni. Mercoledì e venerdì 18.15-19.15 alla Palestra Joy Fit di Putignano; martedì e giovedì 18.00-19.00 all'Imperial Gym di Conversano. Antibullismo e cyberbullismo. Prima lezione di prova gratuita.",
  alternates: { canonical: "https://www.difesapersonalekravmaga.it/corsi/kids" },
  openGraph: {
    title: "Defensystem Kids 6-12 anni | Krav Maga Putignano e Conversano",
    description:
      "Autodifesa e premartialità per bambini 6-12 anni. Sedi a Putignano e Conversano. Prima lezione di prova gratuita.",
    type: "article",
    locale: "it_IT",
    images: [
      {
        url: "https://www.difesapersonalekravmaga.it/images/kids-diplomi.jpg",
        width: 1200,
        height: 800,
        alt: "Krav Maga Kids — allenamento di premartialità per bambini 6-12 anni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Defensystem Kids 6-12 anni | Krav Maga Putignano",
    description:
      "Autodifesa e premartialità per bambini 6-12 anni. Sedi a Putignano e Conversano. Prima lezione di prova gratuita.",
    images: [
      "https://www.difesapersonalekravmaga.it/images/kids-diplomi.jpg",
    ],
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Defensystem Kids — Krav Maga Bambini 6-12 Anni",
  description:
    "Corso di premartialità e difesa personale per bambini dai 6 ai 12 anni. Antibullismo, cyberbullismo, gestione delle emozioni e fiducia in sé attraverso il gioco strutturato. Programma Defensystem Kids FederKravMaga. Sedi a Putignano e Conversano.",
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
    educationalRole: "Children",
    suggestedMinAge: 6,
    suggestedMaxAge: 12,
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
        byDay: ["http://schema.org/Wednesday", "http://schema.org/Friday"],
        startTime: "18:15",
        endTime: "19:15",
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
        startTime: "18:00",
        endTime: "19:00",
      },
    },
  ],
};

export default function CorsiKidsPage() {
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
          { name: "Kids", url: "https://www.difesapersonalekravmaga.it/corsi/kids" },
        ]}
      />
      <Header />
      <CorsoPage variant="kids" />
      <Footer />
    </>
  );
}
