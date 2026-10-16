import type { Metadata } from "next";
import { getSedeBySlug, getAltraSede, sedi } from "@/lib/sedi";
import { SedeTemplate } from "@/components/sedi/SedeTemplate";

export const dynamicParams = false;

export function generateStaticParams() {
  return sedi.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sede = getSedeBySlug(slug);
  if (!sede) return { title: "Sede non trovata" };
  return {
    title: `${sede.comune} — Krav Maga ${sede.comune} & Putignano`,
    description: sede.introBreve,
  };
}

export default async function SedePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sede = getSedeBySlug(slug);
  const altraSede = getAltraSede(slug);
  return <SedeTemplate sede={sede!} altraSede={altraSede} />;
}
