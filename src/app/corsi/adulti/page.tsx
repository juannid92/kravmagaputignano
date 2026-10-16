import type { Metadata } from "next";
import { CorsoPage } from "@/components/CorsoPage";

export const metadata: Metadata = {
  title: "Corsi Adulti — Krav Maga Putignano & Conversano",
  description:
    "Corso di Krav Maga per adulti (16+): difesa personale reale, situazioni concrete, metodo progressivo. Sedi a Putignano e Conversano. Prima lezione gratuita.",
};

export default function CorsiAdultiPage() {
  return <CorsoPage variant="adulti" />;
}
