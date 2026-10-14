"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // Video reveal animation
      if (videoRef.current && contentRef.current) {
        gsap.fromTo(
          videoRef.current,
          { opacity: 0, scale: 1.1 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
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
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-section="3"
      className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background con pattern mimetico */}
      <div className="absolute inset-0 military-camouflage opacity-30" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={contentRef} className="text-center mb-12">
          <span className="text-[#D4AF37] font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase block mb-3">
            Dal Vivo
          </span>
          <h2 className="font-stencil text-3xl sm:text-4xl md:text-5xl text-white tracking-wider mb-4">
            ALLENAMENTI IN AZIONE
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Guarda come si allenano i nostri allievi. Tecnica, intensità e determinazione in ogni sessione.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Video wrapper con angoli militari */}
          <div className="relative aspect-video bg-[#0D0D0D] overflow-hidden military-badge">
            {/* Corner brackets decorativi */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#CC0000] z-10" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#CC0000] z-10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#CC0000] z-10" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#CC0000] z-10" />

            {/* Video placeholder - nascosto finché non si ha un video reale */}
            {false && (
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}

            {/* Placeholder quando video non disponibile */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#131318] to-[#0A0A0A]">
              {/* Icona play stilizzata */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full border-2 border-[#CC0000]/50 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-[#CC0000]/30 flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#CC0000] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Pulsing ring */}
                <div className="absolute inset-0 w-24 h-24 rounded-full border border-[#CC0000]/20 animate-ping" />
              </div>
              
              <span className="font-stencil text-xl text-white/80 tracking-wider">
                SCINTILLA KM
              </span>
              <span className="text-white/40 text-sm mt-2 tracking-widest">
                PUTIGNANO
              </span>

              {/* Info overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="military-id text-white/30">DURATA: 2:34</span>
                <span className="military-id text-white/30">HD 1080p</span>
              </div>
            </div>

            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none opacity-30" />
          </div>

          {/* Descrizione sotto il video */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 border border-white/10 bg-[#0D0D0D]/50">
              <span className="font-stencil text-2xl text-[#CC0000]">150+</span>
              <p className="text-white/50 text-sm mt-1">Ore di Training Annuali</p>
            </div>
            <div className="p-4 border border-white/10 bg-[#0D0D0D]/50">
              <span className="font-stencil text-2xl text-[#CC0000]">12</span>
              <p className="text-white/50 text-sm mt-1">Tecniche Base</p>
            </div>
            <div className="p-4 border border-white/10 bg-[#0D0D0D]/50">
              <span className="font-stencil text-2xl text-[#CC0000]">365</span>
              <p className="text-white/50 text-sm mt-1">Giorni all&apos;Anno</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
