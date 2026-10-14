"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { Award, Users, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const maestroImage = "https://images.pexels.com/photos/7045757/pexels-photo-7045757.jpeg?auto=compress&cs=tinysrgb&w=1200";

export function Maestro() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".maestro-image-wrap", { clipPath: "inset(0 0% 0 0)" });
        gsap.set(".maestro-content > *", { y: 0, opacity: 1 });
        return;
      }

      // Image reveal with aggressive animation
      gsap.fromTo(
        ".maestro-image-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Badge entrance
      gsap.fromTo(
        badgeRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Content stagger
      gsap.fromTo(
        ".maestro-content > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats counter animation
      gsap.utils.toArray(".stat-number").forEach((stat: any) => {
        gsap.fromTo(
          stat,
          { textContent: "0" },
          {
            textContent: stat.dataset.value,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="istruttore"
      data-section="6"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Red glow background */}
      <div className="absolute bottom-0 left-0 w-[80%] h-[60%] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(255, 61, 0, 0.5) 0%, transparent 70%)',
        }}
      />

      {/* Diagonal red line */}
      <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden">
        <div className="absolute top-0 right-0 w-[2px] h-[200%] bg-gradient-to-b from-[#FF3D00]/0 via-[#FF3D00]/20 to-[#FF3D00]/0 transform rotate-12 origin-top" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image - Cinematic Portrait */}
          <div className="relative order-2 lg:order-1">
            {/* Red glow behind image */}
            <div className="absolute -inset-8 bg-[#FF3D00]/20 blur-3xl rounded-full" />

            {/* Image container */}
            <div className="maestro-image-wrap relative aspect-[4/5] overflow-hidden bg-[#1A1A1A]">
              {/* Grayscale image with red overlay */}
              <img
                src={maestroImage}
                alt="Marco Santoro - Istruttore Krav Maga"
                className="w-full h-full object-cover grayscale-[100%] contrast-125"
              />

              {/* Red vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#FF3D00]/10 to-transparent" />

              {/* Side red accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#FF3D00] via-[#FF3D00]/50 to-transparent" />

              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#FF3D00]" />
              <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[#FF3D00]" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#FF3D00]" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#FF3D00]" />
            </div>

            {/* Experience badge - Aggressive style */}
            <div
              ref={badgeRef}
              className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-[#FF3D00] text-white p-4 md:p-5 shadow-[0_0_30px_rgba(255,61,0,0.5)]"
            >
              <div className="font-display text-3xl md:text-4xl">15+</div>
              <div className="text-white/90 text-[10px] font-body uppercase tracking-wider mt-1">
                Anni di<br />esperienza
              </div>
              {/* Red glow effect */}
              <div className="absolute -inset-1 bg-[#FF3D00]/50 blur-lg -z-10" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="maestro-content order-1 lg:order-2">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-[#FF3D00]" />
              <span className="text-[#FF3D00] font-body text-xs tracking-[0.4em] uppercase">
                L&apos;Istruttore
              </span>
            </div>

            {/* Name */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-none">
              MARCO<br />
              <span className="text-[#FF3D00]">SANTORO</span>
            </h2>

            {/* Credentials - Aggressive badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              <div className="flex items-center gap-3 bg-[#1A1A1A] border border-[#FF3D00]/30 px-5 py-3">
                <Award className="w-5 h-5 text-[#FF3D00]" />
                <span className="text-white text-sm font-body">
                  Istruttore 3° Livello KMFD
                </span>
              </div>
              <div className="flex items-center gap-3 bg-[#1A1A1A] border border-[#FF3D00]/30 px-5 py-3">
                <Users className="w-5 h-5 text-[#FF3D00]" />
                <span className="text-white text-sm font-body">Membro FIKM</span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-5 mb-10 border-l-2 border-[#FF3D00]/30 pl-6">
              <p className="text-white/70 font-body leading-relaxed">
                Ho iniziato a praticare Krav Maga nel 2009. Dopo anni di formazione
                in Israele e Italia, ho aperto la scuola di Putignano nel 2016,
                seguita da quella di Conversano nel 2020.
              </p>
              <p className="text-white/70 font-body leading-relaxed">
                Non mi interessa sfoggiare tecniche spettacolari. Mi interessa che
                i miei allievi, adulti o bambini, <span className="text-[#FF3D00] font-medium">sappiano reagire quando serve.</span>
              </p>
            </div>

            {/* Stats - Aggressive counters */}
            <div className="grid grid-cols-3 gap-4 py-8 border-t border-b border-[#FF3D00]/20 mb-10">
              <div className="text-center p-4 bg-[#1A1A1A]">
                <div className="font-display text-4xl md:text-5xl text-[#FF3D00] stat-number" data-value="200">200+</div>
                <div className="text-white/40 text-xs font-body uppercase tracking-wider mt-2">
                  Allievi
                </div>
              </div>
              <div className="text-center p-4 bg-[#1A1A1A]">
                <div className="font-display text-4xl md:text-5xl text-[#FF3D00]">2</div>
                <div className="text-white/40 text-xs font-body uppercase tracking-wider mt-2">
                  Sedi
                </div>
              </div>
              <div className="text-center p-4 bg-[#1A1A1A] flex flex-col items-center">
                <Target className="w-8 h-8 text-[#FF3D00] mb-1" />
                <div className="text-white/40 text-xs font-body uppercase tracking-wider">
                  Praticità
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button
              variant="default"
              size="lg"
              className="group bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white border-2 border-[#FF3D00] shadow-[0_0_20px_rgba(255,61,0,0.3)] hover:shadow-[0_0_40px_rgba(255,61,0,0.5)] transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Prenota un colloquio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
