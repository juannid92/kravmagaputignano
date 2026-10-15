"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Devo essere già allenato per iniziare?",
    answer:
      "Assolutamente no. Il Krav Maga è accessibile a tutti, indipendentemente dal livello di forma fisica. Gli allenamenti partono dalle basi e si adattano al tuo livello. Molti dei nostri allievi principianti non avevano mai praticato arti marziali prima.",
  },
  {
    question: "Da che età possono iscriversi i bambini?",
    answer:
      "Accogliamo bambini a partire dai 6 anni. Per i più piccoli abbiamo un programma specifico che privilegia la consapevolezza, il rispetto e le tecniche di evitamento, senza mai ricorrere al contatto diretto tra allievi.",
  },
  {
    question: "Cosa devo portare alla prima lezione?",
    answer:
      "Solo abbigliamento sportivo comodo: tuta, maglietta, pantaloncini. Puoi venire con le normali scarpe da ginnastica per la prima lezione. Ti forniremo noi tutto il resto. Non serve acquistare divise o attrezzature in anticipo.",
  },
  {
    question: "Il Krav Maga può essere pericoloso per un bambino?",
    answer:
      "Il Krav Maga per bambini è completamente diverso da quello per adulti. Non c'è contatto agonistico, nessuna tecnica traumatica. L'obiettivo è costruire fiducia, disciplina e consapevolezza. Ogni esercitazione è supervisionata direttamente dall'istruttore.",
  },
  {
    question: "Quanto costa l'iscrizione?",
    answer:
      "La quota mensile è di 60€ per un corso singolo (adulti o bambini) e 90€ per chi frequenta entrambi. La quota è agevolata per nuclei familiari con più iscritti. Contattaci per ricevere il tariffario completo senza impegno.",
  },
  {
    question: "Posso provare prima di iscrivermi?",
    answer:
      "Certo. La prima lezione è sempre gratuita e senza impegno. Vieni a provare, conosci l'istruttore, senti l'ambiente e poi decidi. Non ci sono pressioni commerciali: il nostro obiettivo è che tu ti trovi bene, non che tu firmi subito.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".faq-header", { y: 0, opacity: 1 });
        gsap.set(".faq-item", { y: 0, opacity: 1 });
        return;
      }

      // Header animation
      gsap.fromTo(
        ".faq-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Items stagger animation
      gsap.fromTo(
        ".faq-item",
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="faq"
      data-section="8"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Red glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[60%] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 61, 0, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,61,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,61,0,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="faq-header text-center mb-16">
          <span className="text-[#FF3D00] font-body text-xs tracking-[0.4em] uppercase block mb-4">
            Domande Frequenti
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-6">
            FAQ
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FF3D00] to-transparent mx-auto" />
        </div>

        {/* Accordion - Aggressive Style */}
        <Accordion.Root
          type="single"
          collapsible
          className="faq-list space-y-4"
        >
          {faqs.map((faq, i) => (
            <Accordion.Item
              key={i}
              value={`faq-${i}`}
              className="faq-item group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-px bg-[#FF3D00]/0 group-hover:bg-[#FF3D00]/10 transition-colors duration-300 rounded-sm" />

              <div className="relative bg-[#0D0D0D] border-2 border-[#FF3D00]/20 group-hover:border-[#FF3D00]/50 transition-colors duration-300">
                {/* Corner accents - hidden by default, show on hover */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-[#FF3D00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[#FF3D00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-[#FF3D00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-[#FF3D00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Accordion.Header>
                  <Accordion.Trigger className="faq-trigger group flex w-full items-center justify-between p-6 sm:p-8 text-left transition-colors">
                    <span className="font-display text-lg sm:text-xl text-white pr-4 group-hover:text-[#FF3D00] transition-colors duration-300">
                      {faq.question}
                    </span>
                    <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <div className="absolute inset-0 bg-[#FF3D00]/20 rounded-full group-data-[state=open]:bg-[#FF3D00]" />
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-white relative z-10 transition-transform duration-300",
                          "group-data-[state=open]:rotate-180"
                        )}
                      />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="faq-content overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#FF3D00]/20">
                    <p className="text-white/60 font-body leading-relaxed">
                      {faq.answer}
                    </p>
                    {/* Red accent line */}
                    <div className="w-12 h-[2px] bg-[#FF3D00] mt-6" />
                  </div>
                </Accordion.Content>
              </div>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
