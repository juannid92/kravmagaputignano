"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const concepts = [
  {
    number: "01",
    title: "NESSUNA REGOLA",
    description:
      "Il Krav Maga non ha arbitri, categorie di peso o tempi regolamentari. Si impara a rispondere a qualsiasi minaccia, in qualsiasi situazione, con qualsiasi cosa sia disponibile.",
  },
  {
    number: "02",
    title: "ISTINTO PRIMA DI TECNICA",
    description:
      "Non c'è tempo per pensare. Gli allenamenti trasformano le reazioni naturali in risposte automatiche, così il corpo reagisce prima che la mente possa bloccarsi.",
  },
  {
    number: "03",
    title: "SITUAZIONI VERE",
    description:
      "Ogni esercitazione parte da scenari realistici: aggressioni, prese, cadute, attacchi multipli. Nessun kata, nessun rituale — solo preparazione concreta.",
  },
];

export function NonSport() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (prefersReducedMotion) {
          gsap.set(".concept-item", { opacity: 1, y: 0 });
          return;
        }

        if (!sectionRef.current || !stickyRef.current) return;

        // Initial states
        gsap.set(".concept-item-0", { opacity: 1, y: 0 });
        gsap.set(".concept-item-1", { opacity: 0, y: 100 });
        gsap.set(".concept-item-2", { opacity: 0, y: 100 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=500%", // Rallentato da 300% a 500%
            scrub: 2, // Rallentato da 1 a 2 per transizioni più fluide
            pin: stickyRef.current,
            anticipatePin: 1,
          },
        });

        // 01 -> 02 - Transizione più lenta
        tl.to(".concept-item-0", { opacity: 0, y: -100, duration: 0.6 }, ">-0.2")
          .to(".concept-item-1", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "<");

        // 02 -> 03 - Transizione più lenta
        tl.to(".concept-item-1", { opacity: 0, y: -100, duration: 0.6 }, ">-0.2")
          .to(".concept-item-2", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "<");

        // Pulsing red glow on numbers
        gsap.to(".concept-number", {
          textShadow: "0 0 60px rgba(255, 61, 0, 0.8)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.1,
        });
      });

      mm.add("(max-width: 767px)", () => {
        concepts.forEach((_, i) => {
          if (prefersReducedMotion) {
            gsap.set(`.concept-item-${i}`, { opacity: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            `.concept-item-${i}`,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: `.concept-item-${i}`,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* Red glow background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-[60%] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 61, 0, 0.4) 0%, transparent 70%)',
          }}
        />
      </div>

      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
      >
        {/* Red accent lines */}
        <div className="absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-transparent via-[#FF3D00]/20 to-transparent" />
        <div className="absolute top-0 right-[10%] w-px h-full bg-gradient-to-b from-transparent via-[#FF3D00]/20 to-transparent" />

        <div className="relative w-full max-w-5xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-[#FF3D00] font-body text-xs tracking-[0.4em] uppercase block mb-4">
              La Filosofia
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              NON È UNO SPORT
            </h2>
          </div>

          {concepts.map((concept, i) => (
            <div
              key={concept.number}
              className={`concept-item-${i} concept-item absolute inset-0 flex flex-col items-center justify-center px-6`}
            >
              {/* Card container with aggressive borders */}
              <div className="relative max-w-3xl w-full">
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-[#FF3D00]/10 blur-2xl rounded-lg" />

                {/* Card */}
                <div className="relative bg-[#0A0A0A] border-2 border-[#FF3D00]/30 p-8 sm:p-12 md:p-16">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FF3D00]" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FF3D00]" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#FF3D00]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF3D00]" />

                  {/* Red line */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#FF3D00]" />

                  {/* Number with aggressive glow */}
                  <div className="mb-6">
                    <span className="concept-number font-display text-[clamp(5rem,12vw,10rem)] text-[#FF3D00] leading-none block">
                      {concept.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-white mb-6 tracking-wide text-center">
                    {concept.title}
                  </h3>

                  {/* Red divider */}
                  <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#FF3D00] to-transparent mx-auto mb-8" />

                  {/* Description */}
                  <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed text-center">
                    {concept.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {[0, 1, 2].map((dot) => (
                      <div
                        key={dot}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          i === dot ? 'bg-[#FF3D00]' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/30 text-xs font-body uppercase tracking-widest">
            Scorri
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#FF3D00] to-transparent" />
        </div>
      </div>
    </section>
  );
}
