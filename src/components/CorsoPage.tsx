"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { Shield, Users, Zap, Heart, Eye, Target, Star, Award, MessageCircle, Phone, MapPin, Clock, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { sedi } from "@/lib/sedi";

type Variant = "adulti" | "kids";

type Palette = {
  accent: string;
  accentBright: string;
  accentSoft: string;
  accentBorder: string;
  titleGradient: string;
  eyebrow: string;
  ageLabel: string;
  pageTitle: string;
  pageKicker: string;
  pageSubtitle: string;
  pageDescription?: string;
  federLogo: string;
  federLogoAlt: string;
  whyHeading: string;
  whyIntro: string;
  scheduleHeading: string;
  scheduleIntro: string;
  lessonHeading: string;
  lessonIntro: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaBg: string;
  ctaText: string;
  ctaShadow: string;
  ctaHoverBg: string;
  ctaBorder: string;
  ctaShadowHover: string;
  ctaWhatsappHover: string;
  ctaTelBorder: string;
  ctaTelHover: string;
  iconColor: string;
  bgAccentLine: string;
  textOnAccent: string;
  whatsappLink: string;
  whatsappMessage: string;
  phoneHref: string;
  phoneDisplay: string;
  otherCourseHref: string;
  otherCourseLabel: string;
  features: { Icon: typeof Shield; title: string; description: string }[];
  lessonSteps: { label: string; duration: string; description: string }[];
  courseTopics?: { title: string; description: string }[];
  courseTopicsHeading?: string;
  courseTopicsIntro?: string;
};

const PALETTES: Record<Variant, Palette> = {
  adulti: {
    accent: "#FF3D00",
    accentBright: "#FF6B00",
    accentSoft: "rgba(255, 61, 0, 0.18)",
    accentBorder: "rgba(255, 61, 0, 0.35)",
    titleGradient: "from-white via-white to-[#FF3D00]",
    eyebrow: "PERCORSO 01",
    ageLabel: "DAI 13 ANNI IN SU",
    pageTitle: "ADULTI",
    pageKicker: "Percorso 01",
    pageSubtitle: "Difesa personale reale. Situazioni concrete. Nessuna coreografia.",
    federLogo: "/images/federkravmaga-adulti.jpg",
    federLogoAlt: "Federkravmaga Italia — Global Defender SRL Putignano Conversano",
    whyHeading: "PERCHÉ QUESTO PERCORSO",
    whyIntro: "Costruito su scenari reali, pensato per chi vuole strumenti che funzionano davvero.",
    scheduleHeading: "QUANDO CI SI ALLENA",
    scheduleIntro: "Sedi, giorni, orari. Scegli quello che si incastra nella tua settimana.",
    lessonHeading: "COME SI SVOLGE UNA LEZIONE",
    lessonIntro: "Un'ora di lavoro, ritmata e progressiva. Sempre diversa, sempre concreta.",
    ctaHeading: "LA PRIMA LEZIONE È GRATUITA",
    ctaSubtitle: "Vieni a conoscere il maestro, prova una sessione intera, decidi dopo.",
    ctaBg: "bg-[#FF3D00]",
    ctaText: "text-white",
    ctaShadow: "shadow-[0_0_30px_rgba(255,61,0,0.4)]",
    ctaHoverBg: "hover:bg-[#FF5520]",
    ctaBorder: "border-2 border-[#FF3D00]",
    ctaShadowHover: "hover:shadow-[0_0_50px_rgba(255,61,0,0.65)]",
    ctaWhatsappHover: "hover:bg-[#FF3D00] hover:text-white",
    ctaTelBorder: "border border-[#FF3D00]/50",
    ctaTelHover: "hover:bg-[#FF3D00] hover:text-white",
    iconColor: "#FF3D00",
    bgAccentLine: "from-[#FF3D00] to-transparent",
    textOnAccent: "text-white",
    whatsappLink: "https://wa.me/393407106618",
    whatsappMessage: "Ciao, vorrei prenotare una lezione di prova per il corso adulti.",
    phoneHref: "tel:+393407106618",
    phoneDisplay: "+39 340 710 6618",
    otherCourseHref: "/corsi/kids",
    otherCourseLabel: "Vai al corso Kids",
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
      { label: "Warm-up", duration: "10 min", description: "Riscaldamento dinamico, mobilità articolare, cardio a intensità progressiva." },
      { label: "Tecnica", duration: "25 min", description: "Scenario della settimana: difese, attacchi, combinazioni. Dimostrazione, pratica, drill." },
      { label: "Sparring / drill", duration: "20 min", description: "Applicazione controllata. Situazioni simulate a pressione crescente, con protezioni." },
      { label: "Stretching + debrief", duration: "5 min", description: "Defaticamento, risposte alle domande, feedback individuale." },
    ],
  },
  kids: {
    accent: "#16B863",
    accentBright: "#22E27E",
    accentSoft: "rgba(22, 184, 99, 0.2)",
    accentBorder: "rgba(22, 184, 99, 0.45)",
    titleGradient: "from-white via-white to-[#22E27E]",
    eyebrow: "PERCORSO 02",
    ageLabel: "DAI 6 AI 12 ANNI",
    pageTitle: "KIDS",
    pageKicker: "Percorso 02",
    pageSubtitle: "Consapevolezza, fiducia, rispetto. Attraverso il gioco, con metodo.",
    pageDescription:
      "Defensystem Kids propone un corso per bambini e ragazzi dai 6 ai 12 anni. Un approccio alternativo alle arti marziali, focalizzato sui contesti sociali come il bullismo: si lavora sullo studio e sulla valutazione delle situazioni a rischio. Introducendo le tematiche di bullismo e cyberbullismo, il corso lavora anche sulla gestione dell'emotività e sul rafforzamento dell'autostima. Sono le fondamenta della disciplina, che per raggiungere i propri obiettivi ripone importanza nella preparazione psicomotoria e nel divertimento come strumento per imparare. Non proponiamo un corso statico, ma un corso dinamico che comprende gioco, divertimento e disciplina positiva. Non ci sono prerequisiti: è una disciplina per tutti.",
    federLogo: "/images/defensystem-kids.jpg",
    federLogoAlt: "Defensystem Kids — Federkravmaga Italia",
    whyHeading: "PERCHÉ QUESTO PERCORSO",
    whyIntro: "I bambini non imparano a combattere: imparano a riconoscere, a fidarsi di sé, a lavorare in gruppo.",
    scheduleHeading: "QUANDO CI SI ALLENA",
    scheduleIntro: "Mercoledì e venerdì a Putignano (18:15 - 19:15), martedì e giovedì a Conversano (18:00 - 19:00). Due appuntamenti a settimana per crescere con costanza.",
    lessonHeading: "COME SI SVOLGE UNA LEZIONE",
    lessonIntro: "Un'ora di gioco strutturato. Niente contatto agonistico, massima supervisione.",
    ctaHeading: "LA PRIMA LEZIONE È GRATUITA",
    ctaSubtitle: "Vieni con tuo figlio, conosci l'istruttore, prova una sessione intera.",
    ctaBg: "bg-[#16B863]",
    ctaText: "text-[#0A0A0A]",
    ctaShadow: "shadow-[0_0_30px_rgba(22,184,99,0.45)]",
    ctaHoverBg: "hover:bg-[#22E27E]",
    ctaBorder: "border-2 border-[#16B863]",
    ctaShadowHover: "hover:shadow-[0_0_50px_rgba(22,184,99,0.7)]",
    ctaWhatsappHover: "hover:bg-[#16B863] hover:text-[#0A0A0A]",
    ctaTelBorder: "border border-[#16B863]/50",
    ctaTelHover: "hover:bg-[#16B863] hover:text-[#0A0A0A]",
    iconColor: "#16B863",
    bgAccentLine: "from-[#16B863] to-transparent",
    textOnAccent: "text-[#0A0A0A]",
    whatsappLink: "https://wa.me/393407106618",
    whatsappMessage: "Ciao, vorrei informazioni sul corso per bambini.",
    phoneHref: "tel:+393407106618",
    phoneDisplay: "+39 340 710 6618",
    otherCourseHref: "/corsi/adulti",
    otherCourseLabel: "Vai al corso Adulti",
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
      { label: "Gioco di riscaldamento", duration: "10 min", description: "Giochi motori a coppie e in gruppo, mobilità, focus." },
      { label: "Esercitazione tecnica", duration: "20 min", description: "Scenario a difficoltà progressiva, dimostrazione, pratica guidata." },
      { label: "Giochi di applicazione", duration: "20 min", description: "Situazioni simulate sotto forma di gioco, con regole chiare e supervisione costante." },
      { label: "Stretching + debrief", duration: "10 min", description: "Defaticamento, restituzione, saluto finale. Spazio per le domande dei bambini." },
    ],
    courseTopics: [
      {
        title: "Allenamento psicomotorio",
        description: "Coordinazione, equilibrio, reattività: le basi motorie che reggono tutto il resto.",
      },
      {
        title: "Ludico-sportivo",
        description: "Giochi di movimento a coppie e in gruppo, perché a questa età si impara giocando.",
      },
      {
        title: "Educativo nelle situazioni a rischio",
        description: "Come riconoscere i contesti pericolosi, chiedere aiuto, fidarsi del proprio istinto.",
      },
      {
        title: "Gestione degli spazi e dell'emotività",
        description: "Distanze, postura, voce: gli strumenti per gestire ansia, rabbia e paura.",
      },
      {
        title: "Antibullismo",
        description: "Lavoriamo su riconoscimento, difesa verbale, risposta assertiva. Il bullo non è più grande di te.",
      },
      {
        title: "Cyberbullismo",
        description: "Cosa fare davanti a un messaggio cattivo, una foto, un'esclusione online. Strumenti e riferimenti.",
      },
    ],
    courseTopicsHeading: "PROGRAMMA E ARGOMENTI",
    courseTopicsIntro: "Sei aree di lavoro, ritmate e progressive. Niente improvvisazione: ogni lezione ha un obiettivo.",
  },
};

export function CorsoPage({ variant }: { variant: Variant }) {
  const sectionRef = useRef<HTMLElement>(null);
  const p = PALETTES[variant];

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(".corso-reveal", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".corso-hero > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.1 }
      );

      gsap.fromTo(
        ".corso-why-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".corso-why-grid", start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        ".corso-lesson-step",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".corso-lesson-list", start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        ".corso-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".corso-reveal", start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <main id="main-content" tabIndex={-1} ref={sectionRef} className="bg-[#0A0A0A] text-white">
      {/* HERO */}
      <section className="corso-hero relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[80%] pointer-events-none opacity-25"
          style={{
            background: `radial-gradient(ellipse at center top, ${p.accent}55 0%, transparent 70%)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Nav interna: torna ai corsi + passa all'altro corso */}
          <nav
            aria-label="Navigazione tra corsi"
            className="flex items-center justify-between mb-10"
          >
            <Link
              href="/#percorsi"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs sm:text-sm font-display uppercase tracking-[0.2em] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Torna ai corsi
            </Link>
            <Link
              href={p.otherCourseHref}
              className="inline-flex items-center gap-2 font-display uppercase tracking-[0.2em] text-xs sm:text-sm transition-colors group"
              style={{ color: p.accent }}
            >
              {p.otherCourseLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </nav>

          <Image
            src={p.federLogo}
            alt={p.federLogoAlt}
            width={160}
            height={160}
            className="mx-auto mb-6 h-24 sm:h-28 w-auto"
            priority
          />

          <span
            className="font-display text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ color: p.accent }}
          >
            {p.eyebrow}
          </span>

          <h1
            className={`font-stencil leading-[0.9] tracking-wider text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r ${p.titleGradient}`}
          >
            {p.pageTitle}
          </h1>

          <div
            aria-hidden
            className={`mx-auto mt-6 h-[2px] w-28 bg-gradient-to-r ${p.bgAccentLine}`}
            style={{ boxShadow: `0 0 18px ${p.accent}` }}
          />

          <p className="text-white/65 text-base sm:text-lg font-body max-w-2xl mx-auto mt-8 leading-relaxed">
            {p.pageSubtitle}
          </p>

          {p.pageDescription && (
            <p className="text-white/55 text-sm sm:text-base font-body max-w-3xl mx-auto mt-6 leading-relaxed text-left sm:text-center">
              {p.pageDescription}
            </p>
          )}

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${p.whatsappLink}?text=${encodeURIComponent(p.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${p.ctaBg} ${p.ctaText} ${p.ctaBorder} ${p.ctaShadow} ${p.ctaHoverBg} ${p.ctaShadowHover} font-semibold text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300`}
            >
              <MessageCircle className="w-5 h-5" />
              Scrivici su WhatsApp
            </a>
            <a
              href={p.phoneHref}
              className={`inline-flex items-center gap-2 ${p.textOnAccent} ${p.ctaTelBorder} ${p.ctaTelHover} font-semibold text-sm uppercase tracking-wider px-8 py-4 transition-colors duration-300`}
            >
              <Phone className="w-5 h-5" />
              {p.phoneDisplay}
            </a>
          </div>

          <span
            className="inline-block mt-8 font-display text-[10px] sm:text-xs tracking-[0.3em] uppercase"
            style={{ color: p.accent }}
          >
            {p.ageLabel}
          </span>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="corso-reveal text-center mb-14">
            <span
              className="font-display text-xs tracking-[0.4em] uppercase block mb-3"
              style={{ color: p.accent }}
            >
              {p.pageKicker}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
              {p.whyHeading}
            </h2>
            <div
              aria-hidden
              className="mx-auto h-[2px] w-20"
              style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
            />
            <p className="text-white/55 text-base font-body max-w-2xl mx-auto mt-6">
              {p.whyIntro}
            </p>
          </div>

          <div className="corso-why-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.features.map((f, i) => (
              <div
                key={i}
                className="corso-why-card group relative bg-gradient-to-b from-[#131318] to-[#0A0A0A] border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: p.accentBorder }}
              >
                <div
                  aria-hidden
                  className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2"
                  style={{ borderColor: p.accent }}
                />
                <div
                  aria-hidden
                  className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2"
                  style={{ borderColor: p.accent }}
                />

                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${p.accentSoft}, transparent)`,
                    border: `1px solid ${p.accentBorder}`,
                    color: p.accent,
                  }}
                >
                  <f.Icon className="w-5 h-5" />
                </div>

                <h3 className="font-stencil text-white text-base sm:text-lg tracking-wider mb-3 leading-snug">
                  {f.title}
                </h3>
                <p className="text-white/55 text-sm font-body leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A] relative">
        <div
          aria-hidden
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[45%] h-[80%] pointer-events-none opacity-[0.15]"
          style={{
            background: `radial-gradient(ellipse at right, ${p.accent}55 0%, transparent 70%)`,
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="corso-reveal text-center mb-14">
            <span
              className="font-display text-xs tracking-[0.4em] uppercase block mb-3"
              style={{ color: p.accent }}
            >
              Programma
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
              {p.scheduleHeading}
            </h2>
            <div
              aria-hidden
              className="mx-auto h-[2px] w-20 mb-6"
              style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
            />
            <p className="text-white/55 text-base font-body max-w-2xl mx-auto">
              {p.scheduleIntro}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {sedi.map((sede) => {
              const orari = variant === "adulti" ? sede.orariAdulti : sede.orariBambini;
              if (orari.length === 0) return null;
              return (
                <div
                  key={sede.slug}
                  className="corso-reveal relative bg-[#0D0D0D] border p-6 sm:p-8"
                  style={{ borderColor: p.accentBorder }}
                >
                  <div
                    aria-hidden
                    className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2"
                    style={{ borderColor: p.accent }}
                  />
                  <div
                    aria-hidden
                    className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2"
                    style={{ borderColor: p.accent }}
                  />

                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-5 h-5" style={{ color: p.accent }} />
                    <h3 className="font-stencil text-2xl text-white tracking-wider">
                      {sede.comune.toUpperCase()}
                    </h3>
                  </div>

                  <ul className="border-t border-white/10">
                    {orari.map((o, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-4 py-3 border-b border-white/10"
                      >
                        <span className="flex items-center gap-2 text-white/80 text-sm font-body">
                          <Clock className="w-3.5 h-3.5" style={{ color: p.accent, opacity: 0.8 }} />
                          {o.giorno}
                          {o.note && (
                            <span className="text-white/40 text-xs">· {o.note}</span>
                          )}
                        </span>
                        <span
                          className="font-display text-base sm:text-lg"
                          style={{ color: p.accent }}
                        >
                          {o.ora}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/sedi/${sede.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-display uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors group"
                  >
                    <span>Apri la sede</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LESSON STRUCTURE */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="corso-reveal text-center mb-14">
            <span
              className="font-display text-xs tracking-[0.4em] uppercase block mb-3"
              style={{ color: p.accent }}
            >
              Metodo
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
              {p.lessonHeading}
            </h2>
            <div
              aria-hidden
              className="mx-auto h-[2px] w-20 mb-6"
              style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
            />
            <p className="text-white/55 text-base font-body max-w-2xl mx-auto">
              {p.lessonIntro}
            </p>
          </div>

          <div className="corso-lesson-list space-y-5">
            {p.lessonSteps.map((step, i) => (
              <div
                key={i}
                className="corso-lesson-step flex items-start gap-5 sm:gap-7 bg-[#0D0D0D] border p-5 sm:p-7"
                style={{ borderColor: p.accentBorder }}
              >
                <div
                  className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center font-display text-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${p.accentSoft}, transparent)`,
                    border: `1px solid ${p.accentBorder}`,
                    color: p.accent,
                  }}
                >
                  0{i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="font-stencil text-white text-lg sm:text-xl tracking-wider">
                      {step.label}
                    </h3>
                    <span
                      className="font-display text-xs sm:text-sm tracking-[0.2em] uppercase"
                      style={{ color: p.accent }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-white/55 text-sm font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMA E ARGOMENTI (solo kids) */}
      {p.courseTopics && p.courseTopics.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#0A0A0A] relative border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="corso-reveal text-center mb-14">
              <span
                className="font-display text-xs tracking-[0.4em] uppercase block mb-3"
                style={{ color: p.accent }}
              >
                Cosa si lavora in aula
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
                {p.courseTopicsHeading}
              </h2>
              {p.courseTopicsIntro && (
                <p className="text-white/55 max-w-2xl mx-auto font-body leading-relaxed">
                  {p.courseTopicsIntro}
                </p>
              )}
              <div
                aria-hidden
                className="mx-auto h-[2px] w-20 mt-4"
                style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {p.courseTopics.map((topic, i) => (
                <div
                  key={topic.title}
                  className="corso-reveal bg-gradient-to-b from-[#131318] to-[#0A0A0A] border p-6 sm:p-7"
                  style={{ borderColor: p.accentBorder }}
                >
                  <div
                    className="font-stencil text-sm tracking-[0.25em] mb-3"
                    style={{ color: p.accent }}
                  >
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-white text-lg sm:text-xl mb-3 tracking-wide">
                    {topic.title}
                  </h3>
                  <p className="text-white/55 text-sm font-body leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEDI */}
      <section className="py-20 sm:py-28 bg-[#0A0A0A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="corso-reveal text-center mb-14">
            <span
              className="font-display text-xs tracking-[0.4em] uppercase block mb-3"
              style={{ color: p.accent }}
            >
              Dove
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
              LE SEDI
            </h2>
            <div
              aria-hidden
              className="mx-auto h-[2px] w-20"
              style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {sedi.map((sede) => (
              <Link
                key={sede.slug}
                href={`/sedi/${sede.slug}`}
                className="corso-reveal group relative block bg-gradient-to-b from-[#131318] to-[#0A0A0A] border p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: p.accentBorder }}
              >
                <div
                  aria-hidden
                  className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2"
                  style={{ borderColor: p.accent }}
                />
                <div
                  aria-hidden
                  className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2"
                  style={{ borderColor: p.accent }}
                />

                <span
                  className="font-stencil text-5xl sm:text-6xl block mb-3 leading-none"
                  style={{ color: p.accent }}
                >
                  {String(sedi.indexOf(sede) + 1).padStart(2, "0")}
                </span>

                <h3 className="font-stencil text-white text-3xl sm:text-4xl tracking-wider mb-4">
                  {sede.comune.toUpperCase()}
                </h3>

                <div className="flex items-start gap-3 mb-6 text-white/70 font-body">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: p.accent }} />
                  <div>
                    <p className="text-sm sm:text-base">{sede.indirizzo}</p>
                    <p className="text-xs text-white/40 mt-0.5">
                      {sede.CAP} {sede.citta} ({sede.provincia})
                    </p>
                  </div>
                </div>

                <span
                  className="inline-flex items-center gap-2 font-display text-xs sm:text-sm tracking-[0.25em] uppercase transition-colors duration-300"
                  style={{ color: p.accent }}
                >
                  Apri la sede
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className={`${p.ctaBg} py-20 sm:py-28 relative overflow-hidden`}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="corso-reveal relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-[2px] bg-white/40 mx-auto mb-8" />

          <h2 className="font-stencil text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight" style={{ color: variant === "kids" ? "#0A0A0A" : "white" }}>
            {p.ctaHeading}
          </h2>

          <p className={`text-base sm:text-lg font-body max-w-2xl mx-auto mb-10 ${variant === "kids" ? "text-[#0A0A0A]/80" : "text-white/85"}`}>
            {p.ctaSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${p.whatsappLink}?text=${encodeURIComponent(p.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 ${variant === "kids" ? "bg-[#0A0A0A] text-white" : "bg-[#0A0A0A] text-white"} font-semibold text-sm uppercase tracking-wider px-8 py-4 ${p.ctaWhatsappHover} transition-colors group`}
            >
              <MessageCircle className="w-5 h-5" />
              Scrivici su WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={p.phoneHref}
              className={`inline-flex items-center gap-3 ${variant === "kids" ? "border border-[#0A0A0A] text-[#0A0A0A]" : "border border-white text-white"} font-semibold text-sm uppercase tracking-wider px-8 py-4 ${variant === "kids" ? "hover:bg-[#0A0A0A] hover:text-white" : "hover:bg-white hover:text-[#FF3D00]"} transition-colors`}
            >
              <Phone className="w-5 h-5" />
              Chiama ora
            </a>
          </div>

          <ul className={`mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-body ${variant === "kids" ? "text-[#0A0A0A]/70" : "text-white/70"}`}>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5" /> Nessun impegno</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5" /> Conosci l'istruttore</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5" /> Sessione intera</li>
          </ul>
        </div>
      </section>

      {/* AFFILIAZIONE FEDERALE */}
      <section className="py-16 sm:py-20 bg-[#0A0A0A] border-t border-white/5">
        <div className="corso-reveal max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/45 block mb-8">
            Affiliato a
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <Image
              src="/images/federkravmaga-adulti.jpg"
              alt="Federkravmaga Italia — Global Defender SRL"
              width={180}
              height={180}
              className="h-20 sm:h-24 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/images/defensystem-kids.jpg"
              alt="Defensystem Kids — Federkravmaga Italia"
              width={180}
              height={180}
              className="h-20 sm:h-24 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/images/federkravmaga-oro.jpg"
              alt="Federkravmaga Italia — Global Defender SRL Sport & Security"
              width={180}
              height={180}
              className="h-20 sm:h-24 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
