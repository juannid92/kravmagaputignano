// Identità legale e contatti del Titolare.
// Unica fonte di verità: ogni consumer (privacy, cookie, termini, footer, JSON-LD)
// importa da qui. Non inserire valori finti: lasciare "" se non disponibili.

export const LEGAL = {
  legalName: "SSD Global Defender Srl",
  legalNameShort: "SSD Global Defender",
  registeredOffice: "Via G. Leopardi, 56 — 70017 Putignano (BA)",
  taxId: "",       // C.F. — compilare a cura del Titolare
  vatId: "",       // P.IVA — compilare a cura del Titolare
  rea: "",         // REA BA — n. di iscrizione, compilare a cura del Titolare
  shareCapital: "", // es. "10.000,00 €" — compilare a cura del Titolare
  email: "segreteria@global-defender.com",
  pec: "",         // PEC — compilare a cura del Titolare
  phone: "+39 340 710 6618",
  phoneE164: "+393407106618",
  whatsapp: "393407106618",
  website: "https://kravmagaputignano.it",
  federazione: "ENDAS — settore nazionale",
  direttoreTecnico: "Saverio Mauro Capozza — Istruttore 4° Livello",
  complaintsEmail: "segreteria@global-defender.com",
} as const;

export const LEGAL_LAST_UPDATED = "17 ottobre 2026";
export const LEGAL_UPDATE_ISO = "2026-10-17";

/** Indirizzo formattato per il footer e la privacy ("P.IVA / C.F. … — REA …"). */
export function legalIdentityLines(): string[] {
  const lines: string[] = [LEGAL.legalName];
  const id: string[] = [];
  if (LEGAL.vatId) id.push(`P.IVA ${LEGAL.vatId}`);
  if (LEGAL.taxId && LEGAL.taxId !== LEGAL.vatId) id.push(`C.F. ${LEGAL.taxId}`);
  if (id.length) lines.push(id.join(" · "));
  if (LEGAL.rea) lines.push(`REA ${LEGAL.rea} — Bari`);
  if (LEGAL.shareCapital) lines.push(`Capitale sociale: ${LEGAL.shareCapital}`);
  return lines;
}

/** Riga copyright in fondo al footer. */
export function legalCopyrightLine(): string {
  const id = LEGAL.vatId || LEGAL.taxId;
  const idSuffix = id ? ` — P.IVA ${id}` : "";
  return `© ${new Date().getFullYear()} ${LEGAL.legalName}${idSuffix}. Tutti i diritti riservati.`;
}

/** JSON-LD SportsActivityLocation per `<script type="application/ld+json">` in layout.tsx. */
export function legalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Krav Maga Putignano",
    legalName: LEGAL.legalName,
    description:
      "Scuola di Krav Maga a Putignano. Corsi per adulti, ragazzi e difesa personale femminile.",
    url: LEGAL.website,
    telephone: LEGAL.phoneE164,
    email: LEGAL.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via G. Leopardi, 56",
      addressLocality: "Putignano",
      addressRegion: "BA",
      postalCode: "70017",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.8522,
      longitude: 17.0212,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday"],    opens: "19:00", closes: "20:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday"],   opens: "18:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday"], opens: "18:15", closes: "20:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Thursday"],  opens: "18:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday"],    opens: "18:15", closes: "20:30" },
    ],
    sameAs: [
      "https://www.facebook.com/kravmagaputignano2",
      "https://www.instagram.com/krav_maga_putignano_conversano",
    ],
    priceRange: "€€",
    ...(LEGAL.vatId ? { taxID: LEGAL.vatId } : {}),
  } as const;
}
