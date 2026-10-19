export interface Orario {
  giorno: string;
  ora: string;
  note?: string;
}

export interface Sede {
  slug: string;
  comune: string;
  nomePalestra: string;
  indirizzo: string;
  CAP: string;
  citta: string;
  provincia: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  whatsapp: string;
  telefono: string;
  email: string;
  introBreve: string;
  orariAdulti: Orario[];
  orariBambini: Orario[];
  foto: string[];
  puntiForti: string[];
  geo: { latitude: number; longitude: number };
  maestro: {
    nome: string;
    ruolo: string;
    bio: string;
    bioSeconda: string;
    grado: string;
    federazione: string;
    anniEsperienza: number;
    allievi: number;
  };
}

export const sedi: Sede[] = [
  {
    slug: "putignano",
    comune: "Putignano",
    nomePalestra: "Palestra Joy Fit",
    indirizzo: "Via G. Leopardi, 56",
    CAP: "70017",
    citta: "Putignano",
    provincia: "BA",
    mapsUrl: "https://maps.google.com/?q=Via+G.+Leopardi+56+Putignano+BA",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.5!2d17.0!3d40.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDUxJzAwLjAiTiAxN8KwMDAnMDAuMCJF!5e0!3m2!1sit!2sit!4v1234567890",
    whatsapp: "393407106618",
    telefono: "+39 340 710 6618",
    email: "segreteria@global-defender.com",
    introBreve:
      "La nostra sede principale, aperta nel 2016. Un locale attrezzato nel centro storico di Putignano, a pochi passi dalla famosa Basilica di San Domenico. Qui cresciamo ogni settimana centinaia di allievi — adulti e bambini — con la stessa dedizione che ci ha fatto diventare punto di riferimento per tutto il territorio sud-est barese.",
    orariAdulti: [
      { giorno: "Lunedì", ora: "19:00 - 20:30" },
      { giorno: "Mercoledì", ora: "19:00 - 20:30" },
      { giorno: "Venerdì", ora: "19:00 - 20:30" },
    ],
    orariBambini: [
      { giorno: "Mercoledì", ora: "18:15 - 19:15", note: "6-12 anni — Palestra Joy Fit" },
      { giorno: "Venerdì", ora: "18:15 - 19:15", note: "6-12 anni — Palestra Joy Fit" },
    ],
    foto: [
      "/images/hero-istruttori.jpg",
      "/images/kids-lezione-joyfit.jpg",
      "/images/adulti-gruppo.jpg",
      "/images/maestro-saverio.jpg",
      "/images/maestro-diploma.jpg",
      "/images/pilastro-1-sicurezza.jpg",
      "/images/pilastro-2-duro-lavoro.jpg",
      "/images/pilastro-3-confronto.jpg",
    ],
    puntiForti: [
      "Centro storico, parcheggio gratuito a 100 metri",
      "Spogliatoi uomini e donne separati con docce",
      "Zona riscaldamento e stretching dedicata",
    ],
    geo: { latitude: 40.8522, longitude: 17.0212 },
    maestro: {
      nome: "Saverio Mauro Capozza",
      ruolo: "Istruttore 4° Livello — Direttore Corsi",
      bio: "Ho aperto questa sede nel 2016, quando Putignano non aveva ancora un riferimento serio per la difesa personale. Ogni lezione qui è pensata per essere diretta, senza fronzoli — partiamo da situazioni vere e torniamo a situazioni vere.",
      bioSeconda: "Che tu abbia 13 o 60 anni, qui trovi un ambiente serio ma non intimidatorio. Il Krav Maga è per tutti quelli che vogliono essere pronti.",
      grado: "Istruttore 4° Livello — Direttore Corsi",
      federazione: "SSD Global Defender Srl · ENDAS",
      anniEsperienza: 19,
      allievi: 120,
    },
  },
  {
    slug: "conversano",
    comune: "Conversano",
    nomePalestra: "Palestra Imperial Gym",
    indirizzo: "Via M. La Volpe, 32",
    CAP: "70014",
    citta: "Conversano",
    provincia: "BA",
    mapsUrl: "https://maps.google.com/?q=Via+M.+La+Volpe+32+Conversano+BA",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.5!2d17.1!3d40.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU3JzAwLjAiTiAxN8KwMDYnMDAuMCJF!5e0!3m2!1sit!2sit!4v1234567890",
    whatsapp: "393407106618",
    telefono: "+39 340 710 6618",
    email: "segreteria@global-defender.com",
    introBreve:
      "Aperta nel 2020 per portare il Krav Maga anche nella zona sud di Conversano. Una palestra più raccolta, ideale per chi cerca un ambiente intimo dove lavorare con calma e attenzione. Corsi serali per adulti e pomeridiani per i bambini (martedì e giovedì) — sempre con lo stesso rigore che ci contraddistingue.",
    orariAdulti: [
      { giorno: "Martedì", ora: "19:30 - 21:00" },
      { giorno: "Giovedì", ora: "19:30 - 21:00" },
    ],
    orariBambini: [
      { giorno: "Martedì", ora: "18:00 - 19:00", note: "6-12 anni — Palestra Imperial Gym" },
      { giorno: "Giovedì", ora: "18:00 - 19:00", note: "6-12 anni — Palestra Imperial Gym" },
    ],
    foto: [
      "/images/kids-diplomi.jpg",
      "/images/adulti-gruppo.jpg",
      "/images/hero-istruttori.jpg",
      "/images/maestro-saverio.jpg",
      "/images/maestro-diploma.jpg",
      "/images/pilastro-4-side-skills.jpg",
      "/images/pilastro-5-su-misura.jpg",
    ],
    puntiForti: [
      "Zona residenziale tranquilla, vicino alle scuole medie",
      "Ampio parcheggio interno gratuito",
      "Palestra climatizzata estate e inverno",
    ],
    geo: { latitude: 40.9667, longitude: 17.1167 },
    maestro: {
      nome: "Saverio Mauro Capozza",
      ruolo: "Istruttore 4° Livello — Direttore Corsi",
      bio: "Ho aperto questa sede nel 2020, in un momento non facile per tutti. Ma il Krav Maga è nato proprio per questo — per dare strumenti concreti quando le cose si fanno difficili. Conversano è una sede più piccola, e questo ci permette di seguire ogni allievo con più attenzione.",
      bioSeconda: "Sei il benvenuto anche se non hai mai preso a pugni nessuno in vita tua. Non serve essere atleti — serve voler imparare.",
      grado: "Istruttore 4° Livello — Direttore Corsi",
      federazione: "SSD Global Defender Srl · ENDAS",
      anniEsperienza: 19,
      allievi: 80,
    },
  },
];

export function getSedeBySlug(slug: string): Sede | undefined {
  return sedi.find((s) => s.slug === slug);
}

export function getAltraSede(slug: string): Sede | undefined {
  return sedi.find((s) => s.slug !== slug);
}
