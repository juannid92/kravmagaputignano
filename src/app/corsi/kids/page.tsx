import type { Metadata } from "next";
import { CorsoPage } from "@/components/CorsoPage";

export const metadata: Metadata = {
  title: "Defensystem Kids 6-12 anni | Krav Maga Putignano",
  description:
    "Corso di Krav Maga e premartialità per bambini 6-12 anni. Mercoledì e venerdì 18.15-19.15 alla Palestra Joy Fit di Putignano; martedì e giovedì 18.00-19.00 all'Imperial Gym di Conversano. Antibullismo e cyberbullismo. Prima lezione di prova gratuita.",
  alternates: { canonical: "https://kravmagaputignano.it/corsi/kids" },
  openGraph: {
    title: "Defensystem Kids 6-12 anni | Krav Maga Putignano e Conversano",
    description:
      "Autodifesa e premartialità per bambini 6-12 anni. Sedi a Putignano e Conversano. Prima lezione di prova gratuita.",
    type: "article",
    locale: "it_IT",
  },
};

export default function CorsiKidsPage() {
  return <CorsoPage variant="kids" />;
}
