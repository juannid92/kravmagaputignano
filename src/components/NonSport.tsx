"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const concepts = [
  {
    number: "01",
    title: "NESSUNA REGOLA",
    description:
      "Il Krav Maga non ha arbitri, categorie di peso o tempi regolamentari. Si impara a rispondere a qualsiasi minaccia, in qualsiasi situazione.",
  },
  {
    number: "02",
    title: "ISTINTO PRIMA DI TECNICA",
    description:
      "Non c'è tempo per pensare. Gli allenamenti trasformano le reazioni naturali in risposte automatiche, così il corpo reagisce prima della mente.",
  },
  {
    number: "03",
    title: "SITUAZIONI REALI",
    description:
      "Ogni esercitazione parte da scenari realistici: aggressioni, prese, cadute, attacchi multipli. Nessun kata — solo preparazione concreta.",
  },
];

export function NonSport() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeConcept, setActiveConcept] = useState(0);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        setActiveConcept(0);
        return;
      }

      // Setup iniziale: nascondi concetti 2 e 3
      gsap.set(".concept-1", { opacity: 0, y: 60 });
      gsap.set(".concept-2", { opacity: 0, y: 60 });

      // Timeline per transizioni smooth tra concetti
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Calcola quale concetto mostrare
            const progress = self.progress;
            let newConcept = 0;
            if (progress > 0.66) newConcept = 2;
            else if (progress > 0.33) newConcept = 1;
            setActiveConcept(newConcept);
          },
        },
      });

      // Transizione da 01 a 02
      tl.to(".concept-0", { opacity: 0, y: -60, duration: 0.5 })
        .to(".concept-1", { opacity: 1, y: 0, duration: 0.5 }, "<0.1");

      // Transizione da 02 a 03
      tl.to(".concept-1", { opacity: 0, y: -60, duration: 0.5 })
        .to(".concept-2", { opacity: 1, y: 0, duration: 0.5 }, "<0.1");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(204, 0, 0, 0.4) 0%, transparent 70%)' }} />

      {/* Side lines */}
      <div className="absolute top-0 left-[8%] w-px h-full bg-gradient-to-b from-transparent via-[#CC0000]/10 to-transparent" />
      <div className="absolute top-0 right-[8%] w-px h-full bg-gradient-to-b from-transparent via-[#CC0000]/10 to-transparent" />

      {/* Header */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10">
        <span className="text-[#D4AF37] font-display text-[10px] tracking-[0.4em] uppercase block mb-2">
          LA FILOSOFIA
        </span>
        <h2 className="font-stencil text-sm text-white/50 tracking-[0.3em]">
          NON È UNO SPORT
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#CC0000]/40 to-transparent mx-auto mt-3" />
      </div>

      {/* Container cards */}
      <div className="relative w-full max-w-4xl mx-auto px-6">
        {concepts.map((concept, i) => (
          <div
            key={concept.number}
            className={`concept-${i} absolute inset-0 flex items-center justify-center px-6 transition-opacity duration-500`}
            style={{ opacity: i === 0 ? 1 : 0, pointerEvents: i === 0 ? 'auto' : 'none' }}
          >
            <div className="relative max-w-3xl w-full bg-gradient-to-b from-[#131318] to-[#0A0A0A] border border-[#CC0000]/30 p-8 md:p-14 shadow-[0_0_80px_rgba(204,0,0,0.15)]">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CC0000]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#CC0000]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#CC0000]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CC0000]" />

              {/* Glow interno */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#CC0000]/5 to-transparent pointer-events-none" />

              {/* Number grande */}
              <div className="mb-6 text-center">
                <span className="font-stencil text-[clamp(5rem,15vw,10rem)] text-[#CC0000] leading-none"
                  style={{ textShadow: '0 0 60px rgba(204,0,0,0.6), 0 0 120px rgba(204,0,0,0.4)' }}>
                  {concept.number}
                </span>
              </div>

              <h3 className="font-stencil text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-6 tracking-wider text-center">
                {concept.title}
              </h3>

              <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />

              <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed text-center max-w-xl mx-auto">
                {concept.description}
              </p>

              {/* Progress dots */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {[0, 1, 2].map((dot) => (
                  <div
                    key={dot}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      i === dot ? 'bg-[#CC0000] scale-150 shadow-[0_0_15px_rgba(204,0,0,0.8)]' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/20 text-[10px] font-display uppercase tracking-[0.2em]">
          Scorri
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
      </div>
    </section>
  );
}
