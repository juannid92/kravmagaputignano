"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Istruttore() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set([
          ".istruttore-image",
          ".istruttore-content > *",
        ], { opacity: 1, x: 0, y: 0 });
        return;
      }

      // Image reveal animation
      gsap.fromTo(
        imageContainerRef.current,
        {
          clipPath: "inset(0 100% 0 0)",
          opacity: 0
        },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      // Badge pop animation
      gsap.fromTo(
        badgeRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      // Parallax effect on image
      gsap.to(".istruttore-image-inner", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content stagger
      gsap.fromTo(
        ".istruttore-content > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
          },
        }
      );

      // Hover on certifications
      gsap.utils.toArray(".cert-card").forEach((card) => {
        const el = card as HTMLElement;

        el.addEventListener("mouseenter", () => {
          gsap.to(el, {
            x: 10,
            backgroundColor: "#2a2a2a",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            x: 0,
            backgroundColor: "#222",
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="istruttore"
      className="py-24 bg-[#181818] overflow-hidden"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageContainerRef} className="istruttore-image relative">
            <div className="aspect-[4/5] bg-[#222] relative overflow-hidden">
              {/* Parallax inner */}
              <div
                className="istruttore-image-inner absolute inset-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, #222 0%, #1a1a1a 100%)`,
                }}
              >
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-[#FF3D00]/20 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-[#FF3D00]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-[#666] text-sm uppercase tracking-wider">
                    Foto Istruttore
                  </span>
                </div>
              </div>

              {/* Accent corner */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#FF3D00]" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#FF3D00]" />
            </div>

            {/* Experience badge */}
            <div
              ref={badgeRef}
              className="absolute -bottom-6 -right-6 bg-[#FF3D00] p-6"
            >
              <div className="font-display text-4xl text-white">10+</div>
              <div className="text-xs uppercase tracking-wider text-white/80">
                Anni di Esperienza
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="istruttore-content">
            <span className="text-xs uppercase tracking-[0.3em] text-[#FF3D00] mb-4 block">
              L'Istruttore
            </span>

            <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-[1] mb-6">
              MARCO
              <br />
              <span className="text-[#FF3D00]">ROSSI</span>
            </h2>

            <p className="text-lg text-[#888] mb-8 leading-relaxed">
              Istruttore certificato Krav Maga, con oltre dieci anni di
              esperienza nelle arti marziali e nella difesa personale. Formato
              secondo i più alti standard internazionali.
            </p>

            {/* Certifications */}
            <div className="space-y-4 mb-8">
              <div className="cert-card flex items-center gap-4 p-4 bg-[#222] transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-[#FF3D00]/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#FF3D00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Certificazione IKMF</div>
                  <div className="text-sm text-[#888]">
                    Istruttore di 1° Livello
                  </div>
                </div>
              </div>

              <div className="cert-card flex items-center gap-4 p-4 bg-[#222] transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-[#FF3D00]/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#FF3D00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Esperienza Tattica</div>
                  <div className="text-sm text-[#888]">
                    Sicurezza e protezione personale
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-[#FF3D00] pl-6 py-2">
              <p className="text-lg italic text-[#888]">
                "Non ti insegno a combattere. Ti insegno a non dover combattere.
                Ma se devi farlo, devi saperlo fare."
              </p>
            </blockquote>

            {/* CTA */}
            <a href="#prova" className="btn-primary mt-8 inline-flex group">
              Conosci Marco di Persona
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
