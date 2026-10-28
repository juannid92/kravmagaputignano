import {
  Shield,
  Users,
  Zap,
  Heart,
  Eye,
  Target,
  Star,
  Award,
} from "lucide-react";
import { sedi } from "@/lib/sedi";

export type Variant = "adulti" | "kids";

export type Palette = {
  accent: string;
  accentSoft: string;
  accentBorder: string;
  /** Testo leggibile sopra il colore accent (bianco per adulti, nero per kids). */
  onAccent: string;
  indexNumber: string;
  eyebrow: string;
  ageLabel: string;
  pageTitle: string;
  pageSubtitle: string;
  introKicker: string;
  introHeading: string;
  pageDescription: string;
  highlights: string[];
  facts: { label: string; value: string }[];
  marquee: string[];
  images: { hero: string; intro: string; quote: string; other: string };
  federLogo: string;
  federLogoAlt: string;
  whyHeading: string;
  whyIntro: string;
  scheduleHeading: string;
  scheduleIntro: string;
  lessonHeading: string;
  lessonIntro: string;
  quote: string;
  ctaHeading: string;
  ctaSubtitle: string;
  whatsappMessage: string;
  otherCourseHref: string;
  otherCourseTitle: string;
  otherCourseAge: string;
  features: { Icon: typeof Shield; title: string; description: string }[];
  lessonSteps: { label: string; minutes: number; description: string }[];
  courseTopics?: { title: string; description: string }[];
  courseTopicsHeading?: string;
  courseTopicsIntro?: string;
  gallery?: {
    src: string;
    alt: string;
    tag: string;
    title: string;
    caption: string;
  }[];
  galleryKicker?: string;
  galleryHeading?: string;
  galleryIntro?: string;
  video?: string;
};

export const GOLD = "#D4AF37";

export const PALETTES: Record<Variant, Palette> = {
  adulti: {
    accent: "#FF3D00",
    accentSoft: "rgba(255, 61, 0, 0.14)",
    accentBorder: "rgba(255, 61, 0, 0.35)",
    onAccent: "#FFFFFF",
    indexNumber: "01",
    eyebrow: "Percorso 01",
    ageLabel: "Dai 13 anni in su",
    pageTitle: "Adulti",
    pageSubtitle: "Difesa personale reale. Situazioni concrete. Nessuna coreografia.",
    introKicker: "Il corso",
    introHeading: "Strumenti che funzionano quando serve davvero",
    pageDescription:
      "Il corso adulti parte dalla gestione dell'aggressione: dall'approccio iniziale impari a gestire le tue emozioni, a leggere l'ambiente circostante e, se serve, a sfruttarlo a tuo favore. Molte aggressioni possono chiudersi anche solo verbalmente. Poi si lavora sul programma Federkravmaga: postura, distanze, colpi, prese, strangolamenti, aggressioni multiple e oggetti. Ogni tecnica viene provata sotto pressione crescente, sempre in sicurezza, perché sotto stress il corpo fa solo ciò che ha allenato.",
    highlights: [
      "Si parte dalla gestione dell'aggressione",
      "Nessun requisito fisico di partenza",
      "Programma a livelli con esami federali",
    ],
    facts: [
      { label: "Età", value: "13+" },
      { label: "Durata lezione", value: "90 min" },
      { label: "Frequenza", value: "2 / sett." },
      { label: "Sedi", value: "2" },
    ],
    marquee: ["Gestione dell'aggressione", "Difesa reale", "Gestione dello stress", "Prese e strangolamenti", "Aggressioni multiple", "Oggetti comuni", "Consapevolezza"],
    images: {
      hero: "/images/adulti-gruppo.jpg",
      intro: "/images/adulti-tecniche-disarmo.jpg",
      quote: "/images/maestro-saverio.jpg",
      other: "/images/kids-diplomi.jpg",
    },
    video: "/videos/corsi-adulti.mp4",
    galleryKicker: "Pratica in palestra",
    galleryHeading: "Tecniche e situazioni reali",
    galleryIntro:
      "Dalle prese e strangolamenti alle difese da minaccia con coltello e gestione a terra: ogni tecnica viene studiata, provata e affinata in totale sicurezza sotto la guida dell'istruttore.",
    gallery: [
      {
        src: "/images/adulti-tecniche-difesa-1.jpg",
        alt: "Krav Maga Adulti — uscite da prese, strangolamenti e controllo a terra",
        tag: "Prese & Controllo",
        title: "Prese e controllo a terra",
        caption: "Uscite da strangolamento frontale e posteriore, leve articolari e immobilizzazione controllata dell'aggressore a terra.",
      },
      {
        src: "/images/adulti-tecniche-difesa-2.jpg",
        alt: "Krav Maga Adulti — reazioni istintive, deviazioni e colpi di arresto",
        tag: "Reazione Istintiva",
        title: "Deviazioni e arresto",
        caption: "Reazione rapida a tentativi di presa improvvisi, deviazione della traiettoria d'attacco ed esecuzione di colpi di arresto.",
      },
      {
        src: "/images/adulti-tecniche-disarmo.jpg",
        alt: "Krav Maga Adulti — difesa da minaccia con coltello e neutralizzazione",
        tag: "Disarmo da Lama",
        title: "Difesa da armi da taglio",
        caption: "Gestione delle distanze ravvicinate, deviazione della linea di minaccia, controllo del braccio armato e disarmo completo.",
      },
    ],
    federLogo: "/images/federkravmaga-adulti.jpg",
    federLogoAlt: "Federkravmaga Italia — Global Defender SRL Putignano Conversano",
    whyHeading: "Perché questo percorso",
    whyIntro: "Costruito su scenari reali, pensato per chi vuole strumenti che funzionano davvero.",
    scheduleHeading: "Quando ci si allena",
    scheduleIntro: "Due serate a settimana, dalle 20:00 alle 21:30. Scegli la sede che si incastra meglio con la tua agenda: Putignano il lunedì e il mercoledì, Conversano il martedì e il giovedì.",
    lessonHeading: "Come si svolge una lezione",
    lessonIntro: "Un'ora e mezza di lavoro ritmato e progressivo. Sempre diversa, sempre concreta.",
    quote: sedi[0].maestro.bioSeconda,
    ctaHeading: "Le prime due lezioni sono gratuite",
    ctaSubtitle: "Vieni a conoscere il maestro, prova due sessioni intere, decidi dopo.",
    whatsappMessage: "Ciao, vorrei prenotare le lezioni di prova gratuite per il corso adulti.",
    otherCourseHref: "/corsi/kids",
    otherCourseTitle: "Kids",
    otherCourseAge: "6 - 12 anni",
    features: [
      {
        Icon: Eye,
        title: "Gestione dell'aggressione",
        description: "Si parte dall'approccio iniziale: molte aggressioni si chiudono anche solo a parole. Impari a gestire le tue emozioni, a conoscere l'ambiente intorno a te e, se serve, a sfruttarlo.",
      },
      {
        Icon: Shield,
        title: "Difesa da prese e strangolamenti",
        description: "Le situazioni più comuni in aggressione fisica: prese al collo, da dietro, da davanti. Impari a uscire e a metterti in salvo.",
      },
      {
        Icon: Users,
        title: "Attacchi multipli e disarmati",
        description: "Scenario a due o più aggressori. Impari a gestire il caos, a usare il movimento e l'ambiente a tuo vantaggio.",
      },
      {
        Icon: Zap,
        title: "Oggetti comuni come strumenti",
        description: "Borsa, chiavi, cintura, bottiglia. Impari a trasformare ciò che hai in mano in un'estensione della difesa.",
      },
      {
        Icon: Heart,
        title: "Controllo dello stress reale",
        description: "Adrenalina, paura, freeze. Impari a riconoscere le reazioni del tuo corpo e a non restare bloccato.",
      },
    ],
    lessonSteps: [
      { label: "Warm-up", minutes: 15, description: "Riscaldamento dinamico, mobilità articolare, cardio a intensità progressiva." },
      { label: "Tecnica", minutes: 35, description: "Scenario della settimana: difese, attacchi, combinazioni. Dimostrazione, pratica, drill." },
      { label: "Sparring / drill", minutes: 30, description: "Applicazione controllata. Situazioni simulate a pressione crescente, con protezioni." },
      { label: "Stretching + debrief", minutes: 10, description: "Defaticamento, risposte alle domande, feedback individuale." },
    ],
  },
  kids: {
    accent: "#16B863",
    accentSoft: "rgba(22, 184, 99, 0.14)",
    accentBorder: "rgba(22, 184, 99, 0.4)",
    onAccent: "#0A0A0A",
    indexNumber: "02",
    eyebrow: "Percorso 02 · Defensystem Kids",
    ageLabel: "Dai 6 ai 12 anni",
    pageTitle: "Kids",
    pageSubtitle: "Consapevolezza, fiducia, rispetto. Attraverso il gioco, con metodo.",
    introKicker: "Defensystem Kids",
    introHeading: "Non insegniamo a combattere: insegniamo a sentirsi sicuri",
    pageDescription:
      "Defensystem Kids è un approccio alternativo alle arti marziali, focalizzato sui contesti sociali come il bullismo e il cyberbullismo. Si lavora sulla valutazione delle situazioni a rischio, sulla gestione dell'emotività e sul rafforzamento dell'autostima, con la preparazione psicomotoria e il divertimento come strumenti per imparare. Un corso dinamico fatto di gioco, disciplina positiva e nessun prerequisito.",
    highlights: [
      "Nessun contatto agonistico",
      "Programma antibullismo e cyberbullismo",
      "Supervisione costante dell'istruttore",
    ],
    facts: [
      { label: "Età", value: "6-12" },
      { label: "Durata lezione", value: "60 min" },
      { label: "Frequenza", value: "2 / sett." },
      { label: "Sedi", value: "2" },
    ],
    marquee: ["Fiducia in sé", "Antibullismo", "Rispetto", "Gioco strutturato", "Consapevolezza", "Spirito di gruppo"],
    images: {
      hero: "/images/kids-diplomi.jpg",
      intro: "/images/kids-lezione-joyfit.jpg",
      quote: "/images/maestro-saverio.jpg",
      other: "/images/adulti-gruppo.jpg",
    },
    video: "/videos/corsi-kids.mp4",
    federLogo: "/images/defensystem-kids.jpg",
    federLogoAlt: "Defensystem Kids — Federkravmaga Italia",
    whyHeading: "Perché questo percorso",
    whyIntro: "I bambini non imparano a combattere: imparano a riconoscere, a fidarsi di sé, a lavorare in gruppo.",
    scheduleHeading: "Quando ci si allena",
    scheduleIntro: "Mercoledì e venerdì a Putignano, martedì e giovedì a Conversano. Due appuntamenti a settimana per crescere con costanza.",
    lessonHeading: "Come si svolge una lezione",
    lessonIntro: "Un'ora di gioco strutturato. Niente contatto agonistico, massima supervisione.",
    quote:
      "Un bambino che si sente sicuro di sé cammina in modo diverso, parla in modo diverso, sceglie in modo diverso. È questo che portiamo fuori dalla palestra.",
    ctaHeading: "Le prime due lezioni sono gratuite",
    ctaSubtitle: "Vieni con tuo figlio, conosci l'istruttore, prova due sessioni intere.",
    whatsappMessage: "Ciao, vorrei informazioni sul corso per bambini e sulle lezioni di prova gratuite.",
    otherCourseHref: "/corsi/adulti",
    otherCourseTitle: "Adulti",
    otherCourseAge: "Dai 13 anni",
    features: [
      {
        Icon: Eye,
        title: "Riconoscimento del pericolo",
        description: "Impariamo a leggere i segnali: posture, sguardi, distanze, contesti. Prima ancora di qualsiasi tecnica.",
      },
      {
        Icon: Target,
        title: "Tecniche calibrate sull'età",
        description: "Ogni fascia d'età ha il suo programma. Niente contatto pieno, niente gesti traumatici, tutto supervisionato.",
      },
      {
        Icon: Star,
        title: "Costruzione della fiducia in sé",
        description: "Ogni lezione è una sfida calibrata che il bambino può vincere. Questo costruisce autostima reale.",
      },
      {
        Icon: Award,
        title: "Rispetto, disciplina, gruppo",
        description: "L'ambiente insegna le regole del vivere insieme: ascolto, turni, rispetto dell'altro. Valori che restano fuori dalla palestra.",
      },
    ],
    lessonSteps: [
      { label: "Gioco di riscaldamento", minutes: 10, description: "Giochi motori a coppie e in gruppo, mobilità, focus." },
      { label: "Esercitazione tecnica", minutes: 20, description: "Scenario a difficoltà progressiva, dimostrazione, pratica guidata." },
      { label: "Giochi di applicazione", minutes: 20, description: "Situazioni simulate sotto forma di gioco, con regole chiare e supervisione costante." },
      { label: "Stretching + debrief", minutes: 10, description: "Defaticamento, restituzione, saluto finale. Spazio per le domande dei bambini." },
    ],
    courseTopics: [
      { title: "Allenamento psicomotorio", description: "Coordinazione, equilibrio, reattività: le basi motorie che reggono tutto il resto." },
      { title: "Ludico-sportivo", description: "Giochi di movimento a coppie e in gruppo, perché a questa età si impara giocando." },
      { title: "Educativo nelle situazioni a rischio", description: "Come riconoscere i contesti pericolosi, chiedere aiuto, fidarsi del proprio istinto." },
      { title: "Gestione degli spazi e dell'emotività", description: "Distanze, postura, voce: gli strumenti per gestire ansia, rabbia e paura." },
      { title: "Antibullismo", description: "Lavoriamo su riconoscimento, difesa verbale, risposta assertiva. Il bullo non è più grande di te." },
      { title: "Cyberbullismo", description: "Cosa fare davanti a un messaggio cattivo, una foto, un'esclusione online. Strumenti e riferimenti." },
    ],
    courseTopicsHeading: "Programma e argomenti",
    courseTopicsIntro: "Sei aree di lavoro, ritmate e progressive. Niente improvvisazione: ogni lezione ha un obiettivo.",
  },
};
