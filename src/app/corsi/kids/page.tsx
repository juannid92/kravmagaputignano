import type { Metadata } from "next";
import { CorsoPage } from "@/components/CorsoPage";

export const metadata: Metadata = {
  title: "Corsi Kids (6-15 anni) — Krav Maga Putignano & Conversano",
  description:
    "Corso di Krav Maga per bambini e ragazzi dai 6 ai 15 anni: consapevolezza, fiducia, rispetto. Sabato e domenica, fasce orarie divise per età. Prima lezione gratuita.",
};

export default function CorsiKidsPage() {
  return <CorsoPage variant="kids" />;
}
