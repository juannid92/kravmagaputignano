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

export default function CorsiKidsPage() {
  return (
    <>
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
