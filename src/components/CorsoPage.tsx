"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import {
  Shield,
  Users,
  Zap,
  Heart,
  Eye,
  Target,
  Star,
  Award,
  MessageCircle,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Check,
  Quote,
} from "lucide-react";
import { sedi } from "@/lib/sedi";

type Variant = "adulti" | "kids";

type Palette = {
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
  /**
   * Foto provvisorie (stock). Sostituire con le foto reali della scuola
   * appena disponibili, ad es. "/images/corsi/adulti-hero.jpg".
   */
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
};

const WHATSAPP = "https://wa.me/393407106618";
const PHONE_HREF = "tel:+393407106618";
const PHONE_DISPLAY = "+39 340 710 6618";
const GOLD = "#D4AF37";

const PALETTES: Record<Variant, Palette> = {
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
      "Il corso adulti segue il programma Federkravmaga: si parte dalle basi — postura, distanze, colpi — e si arriva a gestire prese, strangolamenti, aggressioni multiple e oggetti. Ogni tecnica viene provata sotto pressione crescente, sempre in sicurezza, perché sotto stress il corpo fa solo ciò che ha allenato.",
    highlights: [
      "Nessun requisito fisico di partenza",
      "Programma a livelli con esami federali",
      "Gruppi seguiti direttamente dall'istruttore",
    ],
    facts: [
      { label: "Età", value: "13+" },
      { label: "Durata lezione", value: "90 min" },
      { label: "Frequenza", value: "2-3 / sett." },
      { label: "Sedi", value: "2" },
    ],
    marquee: ["Difesa reale", "Gestione dello stress", "Prese e strangolamenti", "Aggressioni multiple", "Oggetti comuni", "Consapevolezza"],
    images: {
      hero: "/images/adulti-gruppo.jpg",
      intro: "/images/hero-istruttori.jpg",
      quote: "/images/maestro-saverio.jpg",
      other: "/images/kids-diplomi.jpg",
    },
    federLogo: "/images/federkravmaga-adulti.jpg",
    federLogoAlt: "Federkravmaga Italia — Global Defender SRL Putignano Conversano",
    whyHeading: "Perché questo percorso",
    whyIntro: "Costruito su scenari reali, pensato per chi vuole strumenti che funzionano davvero.",
    scheduleHeading: "Quando ci si allena",
    scheduleIntro: "Due sedi, cinque serate a settimana. Scegli quella che si incastra nella tua agenda — puoi anche alternarle.",
    lessonHeading: "Come si svolge una lezione",
    lessonIntro: "Un'ora e mezza di lavoro ritmato e progressivo. Sempre diversa, sempre concreta.",
    quote: sedi[0].maestro.bioSeconda,
    ctaHeading: "La prima lezione è gratuita",
    ctaSubtitle: "Vieni a conoscere il maestro, prova una sessione intera, decidi dopo.",
    whatsappMessage: "Ciao, vorrei prenotare una lezione di prova per il corso adulti.",
    otherCourseHref: "/corsi/kids",
    otherCourseTitle: "Kids",
    otherCourseAge: "6 - 12 anni",
    features: [
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
      intro: "/images/kids-diplomi.jpg",
      quote: "/images/maestro-saverio.jpg",
      other: "/images/adulti-gruppo.jpg",
    },
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
    ctaHeading: "La prima lezione è gratuita",
    ctaSubtitle: "Vieni con tuo figlio, conosci l'istruttore, prova una sessione intera.",
    whatsappMessage: "Ciao, vorrei informazioni sul corso per bambini.",
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

const WEEK = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
const DAY_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  7: "md:grid-cols-7",
};
const SEDE_COLORS = [undefined, GOLD] as const;

const display = "font-[family-name:var(--font-display)]";

function Kicker({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className={`${display} inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase mb-5`} style={{ color }}>
      <span aria-hidden className="h-px w-8" style={{ background: color }} />
      {children}
    </span>
  );
}

export function CorsoPage({ variant }: { variant: Variant }) {
  const sectionRef = useRef<HTMLElement>(null);
  const p = PALETTES[variant];
  const waHref = `${WHATSAPP}?text=${encodeURIComponent(p.whatsappMessage)}`;
  const totalMinutes = p.lessonSteps.reduce((sum, s) => sum + s.minutes, 0);

  const slots = sedi.flatMap((sede, sedeIndex) =>
    (variant === "adulti" ? sede.orariAdulti : sede.orariBambini).map((o) => ({
      ...o,
      sede,
      color: SEDE_COLORS[sedeIndex] ?? p.accent,
    }))
  );
  const activeDays = WEEK.filter((d) => slots.some((s) => s.giorno === d));
  const sedeColor = (i: number) => SEDE_COLORS[i] ?? p.accent;

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.fromTo(
        ".corso-hero-content > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(
        ".corso-fact",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.6 }
      );
      gsap.fromTo(
        ".corso-index",
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, duration: 1.4, ease: "power3.out", delay: 0.2 }
      );

      gsap.to(".corso-hero-bg", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: ".corso-hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.fromTo(
        ".corso-intro-img",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".corso-intro", start: "top 75%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".corso-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });

      gsap.fromTo(
        ".corso-why-row",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".corso-why-list", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".corso-day",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".corso-week", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".corso-bar-seg",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ".corso-bar", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".corso-quote-bg",
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".corso-quote", start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <main id="main-content" tabIndex={-1} ref={sectionRef} className="bg-[#0A0A0A] text-white overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="corso-hero relative min-h-[100svh] flex items-end pt-28 pb-14 sm:pb-16 overflow-hidden">
        <div className="corso-hero-bg absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
          <Image
            src={p.images.hero}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ filter: "grayscale(55%) contrast(1.1) brightness(0.6)" }}
          />
        </div>
        <div aria-hidden className="absolute inset-0 mix-blend-color" style={{ background: p.accent, opacity: 0.18 }} />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.78) 42%, rgba(10,10,10,0.25) 100%)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.7) 0%, transparent 25%, transparent 65%, #0A0A0A 100%)" }}
        />
        <div aria-hidden className="grain absolute inset-0 pointer-events-none" />

        {/* Numero gigante del percorso */}
        <span
          aria-hidden
          className={`corso-index ${display} absolute right-[-3vw] bottom-[-6vw] leading-none select-none pointer-events-none font-bold`}
          style={{ fontSize: "clamp(14rem, 40vw, 36rem)", WebkitTextStroke: `2px ${p.accent}`, color: "transparent", opacity: 0.32 }}
        >
          {p.indexNumber}
        </span>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Percorso di navigazione" className={`${display} flex items-center justify-between gap-4 mb-14 sm:mb-20 text-xs tracking-[0.25em] uppercase`}>
            <ol className="flex items-center gap-2 text-white/50">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/#percorsi" className="hover:text-white transition-colors">Corsi</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white" aria-current="page">{p.pageTitle}</li>
            </ol>
            <Link href={p.otherCourseHref} className="group hidden sm:inline-flex items-center gap-2 transition-colors" style={{ color: p.accent }}>
              Corso {p.otherCourseTitle}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </nav>

          <div className="corso-hero-content max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={p.federLogo}
                alt={p.federLogoAlt}
                width={72}
                height={72}
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover ring-2"
                style={{ ["--tw-ring-color" as string]: p.accentBorder }}
                priority
              />
              <div className={`${display} uppercase leading-tight`}>
                <span className="block text-xs tracking-[0.35em]" style={{ color: p.accent }}>{p.eyebrow}</span>
                <span className="block text-sm tracking-[0.25em] text-white/70 mt-1">{p.ageLabel}</span>
              </div>
            </div>

            <h1
              className={`${display} uppercase text-white font-bold leading-[0.82] tracking-tight`}
              style={{ fontSize: "clamp(4.5rem, 14vw, 12rem)" }}
            >
              {p.pageTitle}
              <span style={{ color: p.accent }}>.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-2xl text-white/80 max-w-xl leading-snug">{p.pageSubtitle}</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${display} group inline-flex items-center justify-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:-translate-y-0.5`}
                style={{ background: p.accent, color: p.onAccent, boxShadow: `0 10px 40px ${p.accentSoft}, 0 0 30px ${p.accentSoft}` }}
              >
                <MessageCircle className="w-5 h-5" />
                Prenota la prova gratuita
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={PHONE_HREF}
                className={`${display} inline-flex items-center justify-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white border border-white/25 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white/50 transition-colors`}
              >
                <Phone className="w-5 h-5" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Facts strip */}
          <dl className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-white/15">
            {p.facts.map((f, i) => (
              <div
                key={f.label}
                className={`corso-fact pt-5 pb-1 pr-4 ${i % 2 === 1 ? "pl-4 md:pl-6 border-l border-white/10" : ""} ${i >= 2 ? "md:pl-6 md:border-l md:border-white/10" : ""}`}
              >
                <dt className={`${display} text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/50`}>{f.label}</dt>
                <dd className={`${display} text-3xl sm:text-4xl text-white mt-1`}>
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="relative overflow-hidden py-4 sm:py-5 -rotate-1 scale-[1.02] origin-center" style={{ background: p.accent }} aria-hidden>
        <div className="flex w-max animate-[corso-marquee_35s_linear_infinite] motion-reduce:animate-none">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {p.marquee.map((w) => (
                <span key={`${k}-${w}`} className={`${display} flex items-center uppercase text-xl sm:text-3xl font-semibold tracking-wide`} style={{ color: p.onAccent }}>
                  <span className="px-6 sm:px-8">{w}</span>
                  <span className="opacity-60">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= INTRO ================= */}
      <section className="corso-intro relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div aria-hidden className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-full h-full border-2" style={{ borderColor: p.accentBorder }} />
            <div className="corso-intro-img relative aspect-[4/5] overflow-hidden bg-[#141414]">
              <Image
                src={p.images.intro}
                alt={`Allenamento corso ${p.pageTitle}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                style={{ filter: "grayscale(30%) contrast(1.05)" }}
              />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.85) 100%)" }} />
            </div>
            <div
              className="absolute -bottom-6 right-4 sm:-right-6 px-6 py-5 shadow-2xl"
              style={{ background: p.accent, color: p.onAccent }}
            >
              <span className={`${display} block text-[10px] tracking-[0.35em] uppercase opacity-80`}>Prima lezione</span>
              <span className={`${display} block text-3xl font-bold uppercase leading-none mt-1`}>Gratis</span>
            </div>
          </div>

          <div className="lg:col-span-7 corso-reveal">
            <Kicker color={p.accent}>{p.introKicker}</Kicker>
            <h2 className={`${display} uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-white mb-8`}>
              {p.introHeading}
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">{p.pageDescription}</p>
            <ul className="mt-10 grid sm:grid-cols-3 gap-4">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 border-t pt-4" style={{ borderColor: p.accentBorder }}>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: p.accentSoft, color: p.accent }}>
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-sm text-white/80 leading-snug">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= PERCHÉ ================= */}
      <section className="relative py-24 sm:py-32 bg-[#0D0D0D] border-y border-white/5">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 corso-reveal">
              <Kicker color={p.accent}>{p.eyebrow.split(" · ")[0]}</Kicker>
              <h2 className={`${display} uppercase text-4xl sm:text-5xl leading-[0.95] text-white mb-6`}>{p.whyHeading}</h2>
              <p className="text-white/60 leading-relaxed">{p.whyIntro}</p>
            </div>
          </div>

          <ol className="corso-why-list lg:col-span-8 border-t border-white/10">
            {p.features.map((f, i) => (
              <li
                key={f.title}
                className="corso-why-row group relative grid grid-cols-[auto_1fr] sm:grid-cols-[5rem_auto_1fr] gap-x-6 gap-y-3 py-8 sm:py-10 border-b border-white/10"
              >
                <span
                  aria-hidden
                  className="absolute left-0 bottom-[-1px] h-px w-0 group-hover:w-full transition-[width] duration-700 ease-out"
                  style={{ background: p.accent }}
                />
                <span
                  className={`${display} hidden sm:block text-5xl font-bold leading-none transition-colors duration-300`}
                  style={{ WebkitTextStroke: `1px ${p.accent}`, color: "transparent" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: p.accentSoft, color: p.accent, border: `1px solid ${p.accentBorder}` }}
                >
                  <f.Icon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className={`${display} uppercase text-xl sm:text-2xl text-white tracking-wide mb-2`}>{f.title}</h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">{f.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= ORARI (settimana) ================= */}
      <section className="relative py-24 sm:py-32">
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[60%] h-[70%] pointer-events-none opacity-20"
          style={{ background: `radial-gradient(ellipse at top right, ${p.accent}66 0%, transparent 70%)` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="corso-reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <Kicker color={p.accent}>Programma settimanale</Kicker>
              <h2 className={`${display} uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-white mb-5`}>{p.scheduleHeading}</h2>
              <p className="text-white/60 leading-relaxed">{p.scheduleIntro}</p>
            </div>
            <ul className={`${display} flex flex-wrap gap-5 text-xs tracking-[0.25em] uppercase`}>
              {sedi.map((s, i) => (
                <li key={s.slug} className="flex items-center gap-2 text-white/70">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: sedeColor(i), boxShadow: `0 0 12px ${sedeColor(i)}` }} />
                  {s.comune}
                </li>
              ))}
            </ul>
          </div>

          <div className={`corso-week grid grid-cols-1 sm:grid-cols-2 ${DAY_COLS[activeDays.length] ?? "md:grid-cols-5"} gap-3`}>
            {activeDays.map((day) => (
              <div key={day} className="corso-day bg-[#111111] border border-white/[0.07] p-5 flex flex-col">
                <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-white/10">
                  <span className={`${display} text-3xl uppercase text-white font-bold`}>{day.slice(0, 3)}</span>
                  <span className={`${display} text-[10px] tracking-[0.3em] uppercase text-white/40`}>{day}</span>
                </div>
                <div className="space-y-3 flex-1">
                  {slots
                    .filter((s) => s.giorno === day)
                    .map((s) => (
                      <Link
                        key={`${day}-${s.sede.slug}`}
                        href={`/sedi/${s.sede.slug}`}
                        className="group block pl-4 py-2 border-l-2 hover:bg-white/[0.03] transition-colors"
                        style={{ borderColor: s.color }}
                      >
                        <span className={`${display} block text-xl text-white tabular-nums`}>{s.ora}</span>
                        <span className={`${display} flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase mt-1`} style={{ color: s.color }}>
                          {s.sede.comune}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <span className="block text-xs text-white/40 mt-0.5">{s.sede.nomePalestra}</span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sedi */}
          <div className="mt-6 grid md:grid-cols-2 gap-3">
            {sedi.map((sede, i) => (
              <Link
                key={sede.slug}
                href={`/sedi/${sede.slug}`}
                className="corso-reveal group relative flex items-center justify-between gap-6 overflow-hidden bg-[#111111] border border-white/[0.07] p-6 sm:p-8 hover:border-white/20 transition-colors"
              >
                <span aria-hidden className="absolute inset-y-0 left-0 w-1" style={{ background: sedeColor(i) }} />
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 shrink-0" style={{ color: sedeColor(i) }} />
                  <div>
                    <span className={`${display} block text-2xl sm:text-3xl uppercase text-white`}>{sede.comune}</span>
                    <span className="block text-sm text-white/55 mt-1">
                      {sede.nomePalestra} · {sede.indirizzo}
                    </span>
                  </div>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 group-hover:border-white/40 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-300" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LEZIONE ================= */}
      <section className="relative py-24 sm:py-32 bg-[#0D0D0D] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="corso-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <Kicker color={p.accent}>Metodo</Kicker>
              <h2 className={`${display} uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-white mb-5`}>{p.lessonHeading}</h2>
              <p className="text-white/60 leading-relaxed">{p.lessonIntro}</p>
            </div>
            <div className="text-right">
              <span className={`${display} block text-7xl sm:text-8xl font-bold leading-none`} style={{ color: p.accent }}>
                {totalMinutes}
              </span>
              <span className={`${display} text-xs tracking-[0.35em] uppercase text-white/50`}>Minuti totali</span>
            </div>
          </div>

          {/* Barra proporzionale */}
          <div className="corso-bar flex h-3 w-full gap-1 mb-10" aria-hidden>
            {p.lessonSteps.map((s, i) => (
              <span
                key={s.label}
                className="corso-bar-seg h-full origin-left"
                style={{ width: `${(s.minutes / totalMinutes) * 100}%`, background: p.accent, opacity: 1 - i * 0.18 }}
              />
            ))}
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.07] border border-white/[0.07]">
            {p.lessonSteps.map((step, i) => (
              <li key={step.label} className="corso-reveal relative bg-[#0D0D0D] p-6 sm:p-8 group hover:bg-[#121212] transition-colors">
                <div className="flex items-center justify-between mb-8">
                  <span className={`${display} text-sm tracking-[0.3em]`} style={{ color: p.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`${display} text-xs tracking-[0.2em] uppercase px-3 py-1 border`} style={{ borderColor: p.accentBorder, color: p.accent }}>
                    {step.minutes} min
                  </span>
                </div>
                <h3 className={`${display} uppercase text-2xl text-white mb-3`}>{step.label}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= ARGOMENTI (kids) ================= */}
      {p.courseTopics && p.courseTopics.length > 0 && (
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="corso-reveal max-w-2xl mb-14">
              <Kicker color={p.accent}>Cosa si lavora in aula</Kicker>
              <h2 className={`${display} uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-white mb-5`}>{p.courseTopicsHeading}</h2>
              {p.courseTopicsIntro && <p className="text-white/60 leading-relaxed">{p.courseTopicsIntro}</p>}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {p.courseTopics.map((topic, i) => (
                <div
                  key={topic.title}
                  className="corso-reveal group relative overflow-hidden bg-gradient-to-br from-[#141414] to-[#0A0A0A] border border-white/[0.07] p-7 sm:p-8 hover:-translate-y-1 transition-transform duration-300"
                >
                  <span
                    aria-hidden
                    className={`${display} absolute -right-2 -top-6 text-[8rem] font-bold leading-none select-none transition-opacity duration-300 opacity-40 group-hover:opacity-80`}
                    style={{ WebkitTextStroke: `1px ${p.accentBorder}`, color: "transparent" }}
                  >
                    {i + 1}
                  </span>
                  <span aria-hidden className="block h-1 w-10 mb-6" style={{ background: p.accent }} />
                  <h3 className={`${display} relative uppercase text-xl sm:text-2xl text-white mb-3`}>{topic.title}</h3>
                  <p className="relative text-white/55 text-sm leading-relaxed">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CITAZIONE ISTRUTTORE ================= */}
      <section className="corso-quote relative py-28 sm:py-40 overflow-hidden">
        <div className="corso-quote-bg absolute inset-0 will-change-transform">
          <Image
            src={p.images.quote}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(85%) contrast(1.15) brightness(0.35)" }}
          />
        </div>
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0A0A0A 0%, rgba(10,10,10,0.4) 30%, rgba(10,10,10,0.4) 70%, #0A0A0A 100%)" }} />
        <div className="corso-reveal relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Quote className="w-12 h-12 sm:w-16 sm:h-16 mb-8" style={{ color: p.accent }} />
          <blockquote className="font-marcellus text-2xl sm:text-4xl lg:text-5xl leading-[1.25] text-white">
            {p.quote}
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <span aria-hidden className="h-px w-12" style={{ background: p.accent }} />
            <div className={`${display} uppercase`}>
              <span className="block text-white tracking-[0.15em]">{sedi[0].maestro.nome}</span>
              <span className="block text-xs tracking-[0.3em] text-white/50 mt-1">{sedi[0].maestro.ruolo}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden" style={{ background: p.accent, color: p.onAccent }}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)" }}
        />
        <span
          aria-hidden
          className={`${display} absolute -bottom-[0.18em] right-0 leading-none font-bold uppercase select-none pointer-events-none`}
          style={{ fontSize: "clamp(8rem, 24vw, 22rem)", WebkitTextStroke: `2px ${p.onAccent}`, color: "transparent", opacity: 0.12 }}
        >
          Gratis
        </span>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 corso-reveal">
            <h2 className={`${display} uppercase font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.9] mb-6`}>{p.ctaHeading}</h2>
            <p className="text-lg sm:text-xl max-w-xl opacity-85">{p.ctaSubtitle}</p>
            <ul className={`${display} mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs sm:text-sm uppercase tracking-[0.2em] opacity-90`}>
              {["Nessun impegno", "Conosci l'istruttore", "Sessione intera"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 corso-reveal flex flex-col gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${display} group flex items-center justify-between gap-4 bg-[#0A0A0A] text-white px-8 py-6 text-sm sm:text-base uppercase tracking-[0.2em] hover:bg-[#1a1a1a] transition-colors`}
            >
              <span className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5" /> Scrivici su WhatsApp
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={PHONE_HREF}
              className={`${display} group flex items-center justify-between gap-4 border-2 px-8 py-6 text-sm sm:text-base uppercase tracking-[0.2em] hover:bg-black/10 transition-colors`}
              style={{ borderColor: p.onAccent }}
            >
              <span className="flex items-center gap-3">
                <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= ALTRO CORSO ================= */}
      <section className="relative">
        <Link href={p.otherCourseHref} className="group relative block overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={p.images.other}
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              style={{ filter: "grayscale(80%) brightness(0.35)" }}
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div>
              <span className={`${display} block text-xs tracking-[0.4em] uppercase text-white/60 mb-3`}>Scopri anche</span>
              <span className={`${display} block uppercase font-bold text-6xl sm:text-8xl text-white leading-none`}>
                {p.otherCourseTitle}
              </span>
              <span className={`${display} block text-sm tracking-[0.3em] uppercase text-white/60 mt-3`}>{p.otherCourseAge}</span>
            </div>
            <span className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-white/30 group-hover:bg-white group-hover:border-white transition-colors duration-300">
              <ArrowRight className="w-8 h-8 text-white group-hover:text-[#0A0A0A] group-hover:translate-x-1 transition-all duration-300" />
            </span>
          </div>
        </Link>
      </section>
    </main>
  );
}
