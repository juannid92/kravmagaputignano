"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";

export function Chiusura() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Check for reduced motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".chiusura-content > *", { y: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        ".chiusura-content > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} data-section="9" className="py-24 sm:py-32 bg-accent relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="chiusura-content relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Accent line */}
        <div className="w-16 h-[2px] bg-background/30 mx-auto mb-8" />

        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.9]">
          LA PRIMA
          <br />
          <span className="text-background/80">LEZIONE È</span>
          <br />
          <span className="bg-background text-white px-4">GRATUITA</span>
        </h2>

        <p className="text-white/70 text-base sm:text-lg font-body max-w-xl mx-auto mb-12">
          Nessun impegno. Vieni a provare, conosci il maestro e senti se il Krav Maga fa per te.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/393334567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-background text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 hover:bg-white hover:text-accent transition-colors group"
          >
            <MessageCircle className="w-5 h-5" />
            Scrivici su WhatsApp
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="tel:+393334567890"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-white border border-white/50 font-semibold text-sm uppercase tracking-wider px-8 py-4 hover:bg-white hover:text-accent transition-colors"
          >
            <Phone className="w-5 h-5" />
            Chiama ora
          </a>
        </div>
      </div>
    </section>
  );
}
