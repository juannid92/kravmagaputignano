import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CorsoPage } from "@/components/CorsoPage";
import { BreadcrumbList } from "@/components/BreadcrumbList";

export const metadata: Metadata = {
  title: "Corsi Krav Maga Adulti | Putignano e Conversano",
  description:
    "Corso di Krav Maga per adulti (dai 13 anni): difesa personale reale, situazioni concrete, metodo progressivo. Sedi a Putignano (Joy Fit) e Conversano (Imperial Gym). Prima lezione gratuita.",
  alternates: { canonical: "https://kravmagaputignano.it/corsi/adulti" },
  openGraph: {
    title: "Corsi Krav Maga Adulti a Putignano e Conversano",
    description:
      "Difesa personale reale per adulti. Sedi a Putignano e Conversano. Prima lezione gratuita.",
    type: "article",
    locale: "it_IT",
    images: [
      {
        url: "https://kravmagaputignano.it/images/adulti-gruppo.jpg",
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
      "https://kravmagaputignano.it/images/adulti-gruppo.jpg",
    ],
  },
};

export default function CorsiAdultiPage() {
  return (
    <>
      <BreadcrumbList
        items={[
          { name: "Home", url: "https://kravmagaputignano.it" },
          { name: "Corsi", url: "https://kravmagaputignano.it#percorsi" },
          { name: "Adulti", url: "https://kravmagaputignano.it/corsi/adulti" },
        ]}
      />
      <Header />
      <CorsoPage variant="adulti" />
      <Footer />
    </>
  );
}
