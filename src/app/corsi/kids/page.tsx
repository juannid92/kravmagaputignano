import type { Metadata } from "next";
import { CorsoPage } from "@/components/CorsoPage";

export const metadata: Metadata = {
  title: "Defensystem Kids (6-12 anni) — Krav Maga Putignano",
  description:
    "Corso di autodifesa e premartialità per bambini dai 6 ai 12 anni. Mercoledì e venerdì 18.15-19.15 alla Palestra Joy Fit di Putignano. Allenamento fisico, comportamentale, tematiche di antibullismo e cyberbullismo. Direzione Istr. 4° Liv. Saverio Mauro Capozza. Prima lezione di prova gratuita.",
};

export default function CorsiKidsPage() {
  return <CorsoPage variant="kids" />;
}
