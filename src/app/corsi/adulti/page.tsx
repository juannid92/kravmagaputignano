import type { Metadata } from "next";
import { CorsoPage } from "@/components/CorsoPage";

export const metadata: Metadata = {
  title: "Corsi Krav Maga Adulti | Putignano e Conversano",
  description:
    "Corso di Krav Maga per adulti (dai 16 anni): difesa personale reale, situazioni concrete, metodo progressivo. Sedi a Putignano (Joy Fit) e Conversano (Imperial Gym). Prima lezione gratuita.",
  alternates: { canonical: "https://kravmagaputignano.it/corsi/adulti" },
  openGraph: {
    title: "Corsi Krav Maga Adulti a Putignano e Conversano",
    description:
      "Difesa personale reale per adulti. Sedi a Putignano e Conversano. Prima lezione gratuita.",
    type: "article",
    locale: "it_IT",
  },
};

export default function CorsiAdultiPage() {
  return <CorsoPage variant="adulti" />;
}
