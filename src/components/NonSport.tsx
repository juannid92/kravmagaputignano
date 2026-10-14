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
  const stickyRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
        gsap.set(".concept-item-1", { opacity: 0, y: 80 });
        gsap.set(".concept-item-2", { opacity: 0, y: 80 });

        // 1. PARALLAX on side lines - they move slower during scroll
        gsap.to(leftLineRef.current, {
          yPercent: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        gsap.to(rightLineRef.current, {
          yPercent: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        // 2. BREATHING effect on main card (subtle oscillating scale)
        cardRefs.current.forEach((card) => {
          if (card) {
            gsap.to(card, {
              scale: 1.015,
              duration: 2.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        });

        // 3. CORNER BRACKETS animation when active (expand slightly)
        cardRefs.current.forEach((card) => {
          if (card) {
            const corners = card.querySelectorAll('.corner-bracket');
            if (corners.length > 0) {
              gsap.to(corners, {
                width: "3rem",
                height: "3rem",
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              });
            }
          }
        });

        // 4. TITLE REVEAL animation + nasconde durante scroll pinned
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, scale: 0.8, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // NASCONDI header SUBITO quando inizia scroll pinned
        gsap.to(".nonsport-header", {
          opacity: 0,
          y: -60,
          duration: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=2% top",
            end: "top+=8% top",
            scrub: 0.3,
          },
        });

        // Animazioni migliorate con scale e glow
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=500%",
            scrub: 1.5,
            pin: stickyRef.current,
            anticipatePin: 1,
          },
        });

        // 01 -> 02: slide out con scale down + fade
        tl.to(".concept-item-0", {
          opacity: 0,
          y: -100,
          scale: 0.85,
          rotation: -3,
          duration: 0.6,
        }, ">-0.4")
          .fromTo(".concept-item-1",
            { opacity: 0, y: 100, scale: 1.1, rotation: 3 },
            { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.8, ease: "power3.out" },
            "<0.1"
          );

        // 02 -> 03: slide out con scale down + fade
        tl.to(".concept-item-1", {
          opacity: 0,
          y: -100,
          scale: 0.85,
          rotation: -3,
          duration: 0.6,
        }, ">-0.4")
          .fromTo(".concept-item-2",
            { opacity: 0, y: 100, scale: 1.1, rotation: 3 },
            { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.8, ease: "power3.out" },
            "<0.1"
          );

        // Glow pulsante sul numero
        gsap.to(".concept-number", {
          textShadow: "0 0 40px rgba(204, 0, 0, 0.9), 0 0 80px rgba(204, 0, 0, 0.6), 0 0 120px rgba(204, 0, 0, 0.4)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Hover effect sul card (mouse tracking)
        const sticky = stickyRef.current;
        if (sticky) {
          const card = sticky.querySelector('.concept-item:not([style*="opacity: 0"])');
          if (card) {
            sticky.addEventListener('mousemove', (e) => {
              const rect = sticky.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
              const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

              gsap.to(card, {
                rotateY: x * 5,
                rotateX: -y * 5,
                duration: 0.5,
                ease: "power2.out"
              });
            });

            sticky.addEventListener('mouseleave', () => {
              gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.5,
                ease: "power2.out"
              });
            });
          }
        }
      });

      mm.add("(max-width: 767px)", () => {
        concepts.forEach((_, i) => {
          if (prefersReducedMotion) {
            gsap.set(`.concept-item-${i}`, { opacity: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            `.concept-item-${i}`,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: `.concept-item-${i}`,
                start: "top 80%",
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
      data-section="2"
      className="relative"
      style={{ height: "500vh" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />

      {/* Red glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[40%] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(204, 0, 0, 0.6) 0%, transparent 70%)',
        }}
      />

      {/* Side accent lines with parallax */}
      <div ref={leftLineRef} className="absolute top-0 left-[8%] w-px h-full bg-gradient-to-b from-transparent via-[#CC0000]/15 to-transparent" />
      <div ref={rightLineRef} className="absolute top-0 right-[8%] w-px h-full bg-gradient-to-b from-transparent via-[#CC0000]/15 to-transparent" />

      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full max-w-4xl mx-auto px-6">
          {/* Section header - titolo piccolo che sparisce subito */}
          <div className="nonsport-header text-center mb-6 relative">
            {/* Linee tattiche */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-[#CC0000]/30 to-transparent" />

            <span className="text-[#D4AF37] font-display text-[10px] tracking-[0.4em] uppercase block mb-1">
              LA FILOSOFIA
            </span>
            <h2 ref={titleRef} className="font-stencil text-sm sm:text-base text-white/50 tracking-[0.3em]">
              NON È UNO SPORT
            </h2>
          </div>

          {concepts.map((concept, i) => (
            <div
              key={concept.number}
              className={`concept-item-${i} concept-item absolute inset-0 flex flex-col items-center justify-center px-6 pt-16`}
            >
              {/* Card con sfondo più visibile e breathing animation */}
              <div ref={(el) => { cardRefs.current[i] = el; }} className="relative max-w-3xl w-full bg-gradient-to-b from-[#131318] to-[#0A0A0A] border border-[#CC0000]/30 p-8 sm:p-10 md:p-14 shadow-[0_0_80px_rgba(204,0,0,0.15)]">
                {/* Corner accents con animazione */}
                <div className="corner-bracket absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#CC0000]" />
                <div className="corner-bracket absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#CC0000]" />
                <div className="corner-bracket absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#CC0000]" />
                <div className="corner-bracket absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#CC0000]" />

                {/* Glow interno */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#CC0000]/5 to-transparent pointer-events-none" />

                {/* Number grande con glow */}
                <div className="mb-6 text-center">
                  <span className="concept-number font-stencil text-[clamp(5rem,15vw,10rem)] text-[#CC0000] leading-none"
                    style={{ textShadow: '0 0 60px rgba(204,0,0,0.6), 0 0 120px rgba(204,0,0,0.4)' }}>
                    {concept.number}
                  </span>
                </div>

                {/* Title più grande */}
                <h3 className="font-stencil text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-6 tracking-wider text-center">
                  {concept.title}
                </h3>

                {/* Divider accent */}
                <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />

                {/* Description con contrasto alto */}
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
      </div>
    </section>
  );
}
