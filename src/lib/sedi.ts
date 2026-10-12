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
    nomePalestra: "Krav Maga Academy Putignano",
    indirizzo: "Via San Francesco, 28",
    CAP: "70017",
    citta: "Putignano",
    provincia: "BA",
    mapsUrl: "https://maps.google.com/?q=Via+San+Francesco+28+Putignano+BA",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.5!2d17.0!3d40.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDUxJzAwLjAiTiAxN8KwMDAnMDAuMCJF!5e0!3m2!1sit!2sit!4v1234567890",
    whatsapp: "393334567890",
    telefono: "+39 333 456 7890",
    email: "putignano@kravmagapuglia.it",
    introBreve:
      "La nostra sede principale, aperta nel 2016. Un locale attrezzato nel centro storico di Putignano, a pochi passi dalla famosa Basilica di San Domenico. Qui cresciamo ogni settimana centinaia di allievi — adulti e bambini — con la stessa dedizione che ci ha fatto diventare punto di riferimento per tutto il territorio sud-est barese.",
    orariAdulti: [
      { giorno: "Lunedì", ora: "19:00 - 20:30" },
      { giorno: "Mercoledì", ora: "19:00 - 20:30" },
      { giorno: "Venerdì", ora: "19:00 - 20:30" },
    ],
    orariBambini: [
      { giorno: "Sabato", ora: "10:00 - 11:30", note: "6-10 anni" },
      { giorno: "Sabato", ora: "11:30 - 13:00", note: "11-15 anni" },
    ],
    foto: [
      "https://images.pexels.com/photos/7045757/pexels-photo-7045757.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/6455245/pexels-photo-6455245.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7045661/pexels-photo-7045661.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/6295757/pexels-photo-6295757.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/6295767/pexels-photo-6295767.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/6296035/pexels-photo-6296035.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    puntiForti: [
      "Centro storico, parcheggio gratuito a 100 metri",
      "Spogliatoi uomini e donne separati con docce",
      "Zona riscaldamento e stretching dedicata",
    ],
    maestro: {
      nome: "Marco Santoro",
      ruolo: "Istruttore 3° Livello KMFD",
      bio: "Ho aperto questa sede nel 2016, quando Putignano non aveva ancora un riferimento serio per la difesa personale. Ogni lezione qui è pensata per essere diretta, senza fronzoli — partiamo da situazioni vere e torniamo a situazioni vere.",
      bioSeconda: "Che tu abbia 16 o 60 anni, qui trovi un ambiente serio ma non intimidatorio. Il Krav Maga è per tutti quelli che vogliono essere pronti.",
      grado: "Istruttore 3° Livello KMFD",
      federazione: "Federazione Italiana Krav Maga",
      anniEsperienza: 15,
      allievi: 120,
    },
  },
  {
    slug: "conversano",
    comune: "Conversano",
    nomePalestra: "Krav Maga Academy Conversano",
    indirizzo: "Via Crocifisso, 45",
    CAP: "70014",
    citta: "Conversano",
    provincia: "BA",
    mapsUrl: "https://maps.google.com/?q=Via+Crocifisso+45+Conversano+BA",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.5!2d17.1!3d40.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU3JzAwLjAiTiAxN8KwMDYnMDAuMCJF!5e0!3m2!1sit!2sit!4v1234567890",
    whatsapp: "393334567891",
    telefono: "+39 333 456 7891",
    email: "conversano@kravmagapuglia.it",
    introBreve:
      "Aperta nel 2020 per portare il Krav Maga anche nella zona sud di Conversano. Una palestra più raccolta, ideale per chi cerca un ambiente intimo dove lavorare con calma e attenzione. Corsi serali per adulti, sabato pomeriggio per i ragazzi — sempre con lo stesso rigore che ci contraddistingue.",
    orariAdulti: [
      { giorno: "Martedì", ora: "19:30 - 21:00" },
      { giorno: "Giovedì", ora: "19:30 - 21:00" },
    ],
    orariBambini: [
      { giorno: "Sabato", ora: "16:00 - 17:30", note: "6-15 anni" },
    ],
    foto: [
      "https://images.pexels.com/photos/7045585/pexels-photo-7045585.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7045474/pexels-photo-7045474.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7045722/pexels-photo-7045722.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7045483/pexels-photo-7045483.jpeg?auto=compress&cs=tinysrgb&w=900",
      "https://images.pexels.com/photos/7045455/pexels-photo-7045455.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/16552870/pexels-photo-16552870/free-photo-of-martial-arts-training.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    puntiForti: [
      "Zona residenziale tranquilla, vicino alle scuole medie",
      "Ampio parcheggio interno gratuito",
      "Palestra climatizzata estate e inverno",
    ],
    maestro: {
      nome: "Marco Santoro",
      ruolo: "Istruttore 3° Livello KMFD",
      bio: "Ho aperto questa sede nel 2020, in un momento non facile per tutti. Ma il Krav Maga è nato proprio per questo — per dare strumenti concreti quando le cose si fanno difficili. Conversano è una sede più piccola, e questo ci permette di seguire ogni allievo con più attenzione.",
      bioSeconda: "Sei il benvenuto anche se non hai mai preso a pugni nessuno in vita tua. Non serve essere atleti — serve voler imparare.",
      grado: "Istruttore 3° Livello KMFD",
      federazione: "Federazione Italiana Krav Maga",
      anniEsperienza: 15,
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
