import type { Metadata } from "next";
import { getSedeBySlug, getAltraSede, sedi } from "@/lib/sedi";
import { SedeTemplate } from "@/components/sedi/SedeTemplate";
import { BreadcrumbList } from "@/components/BreadcrumbList";
import { LEGAL } from "@/lib/legal";

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
    title: `Sede di ${sede.comune} — Palestra ${sede.nomePalestra} | Krav Maga Putignano`,
    description: `${sede.introBreve} Scuola ufficiale SSD Global Defender Srl, istruttore Saverio Mauro Capozza, 4° Livello.`,
    alternates: {
      canonical: `https://kravmagaputignano.it/sedi/${sede.slug}`,
    },
    openGraph: {
      title: `Sede di ${sede.comune} — Palestra ${sede.nomePalestra} | Krav Maga Putignano`,
      description: sede.introBreve,
      url: `https://kravmagaputignano.it/sedi/${sede.slug}`,
      type: "article",
      locale: "it_IT",
      images: [
        {
          url: sede.foto[0],
          width: 1200,
          height: 800,
          alt: `${sede.nomePalestra} — ${sede.comune}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Sede di ${sede.comune} — Krav Maga Putignano`,
      description: sede.introBreve,
      images: [sede.foto[0]],
    },
  };
}

const GIORNI_IT_TO_EN: Record<string, string> = {
  "Lunedì": "Monday",
  "Martedì": "Tuesday",
  "Mercoledì": "Wednesday",
  "Giovedì": "Thursday",
  "Venerdì": "Friday",
  "Sabato": "Saturday",
  "Domenica": "Sunday",
};

export default async function SedePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sede = getSedeBySlug(slug);
  const altraSede = getAltraSede(slug);

  const openingHoursSpecification = Array.from(
    new Set(
      [...sede!.orariAdulti, ...sede!.orariBambini].map(
        (o) => GIORNI_IT_TO_EN[o.giorno],
      ),
    ),
  )
    .filter(Boolean)
    .map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day,
      opens: "00:00",
      closes: "23:59",
    }));

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/SportsActivityLocation",
    name: `Krav Maga Putignano — ${sede!.comune}`,
    description: sede!.introBreve,
    url: `https://kravmagaputignano.it/sedi/${sede!.slug}`,
    image: sede!.foto[0],
    telephone: LEGAL.phoneE164,
    email: LEGAL.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: sede!.indirizzo,
      addressLocality: sede!.citta,
      addressRegion: sede!.provincia,
      postalCode: sede!.CAP,
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: sede!.geo.latitude,
      longitude: sede!.geo.longitude,
    },
    openingHoursSpecification,
    priceRange: "€€",
    parentOrganization: {
      "@type": "Organization",
      name: "Krav Maga Putignano",
      url: "https://kravmagaputignano.it",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <BreadcrumbList
        items={[
          { name: "Home", url: "https://kravmagaputignano.it" },
          { name: "Sedi", url: "https://kravmagaputignano.it#sedi" },
          { name: sede!.comune, url: `https://kravmagaputignano.it/sedi/${sede!.slug}` },
        ]}
      />
      <SedeTemplate sede={sede!} altraSede={altraSede} />
    </>
  );
}
