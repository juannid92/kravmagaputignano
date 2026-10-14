"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const kravGalleryImages = [
  { src: "https://images.pexels.com/photos/7045757/pexels-photo-7045757.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Allenamento Krav Maga - Tecniche di difesa" },
  { src: "https://images.pexels.com/photos/6455245/pexels-photo-6455245.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Sessione di combattimento" },
  { src: "https://images.pexels.com/photos/7045661/pexels-photo-7045661.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Esercizi di potenza" },
  { src: "https://images.pexels.com/photos/6295757/pexels-photo-6295757.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Allenamento funzionale" },
  { src: "https://images.pexels.com/photos/6295767/pexels-photo-6295767.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Tecniche di combattimento" },
  { src: "https://images.pexels.com/photos/6296035/pexels-photo-6296035.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Preparazione fisica" },
];

export function GalleriaHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const galleryContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!trackRef.current || !sectionRef.current || !stickyRef.current) return;

      const track = trackRef.current;
      const getDistance = () => track.scrollWidth - window.innerWidth;

      // Horizontal scroll animation con spazio extra per arrivare fino all'ultima immagine
      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          // Abbastanza spazio per far vedere TUTTE le immagini
          end: () => `+=${getDistance() + window.innerWidth}`,
          scrub: 1.5,
          pin: stickyRef.current,
          pinSpacing: true, // Importante: dà spazio dopo la gallery per scrollare
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Immagini reveal con effetto cinema
      gsap.utils.toArray(".gallery-img-wrap").forEach((item: any) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            scale: 0.8,
            rotateY: 20,
            skewX: 5,
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            skewX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getDistance() + window.innerWidth}`,
              scrub: 0.8,
            },
          }
        );
      });

      // Parallax interno sulle immagini
      gsap.utils.toArray(".gallery-img-inner").forEach((img: any) => {
        gsap.to(img, {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getDistance() + window.innerWidth}`,
            scrub: true,
          },
        });
      });

      // Progress bar
      gsap.to(".gallery-progress", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance() + window.innerWidth}`,
          scrub: true,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray(".gallery-img-wrap").forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    // Content below gallery reveal
    gsap.fromTo(
      ".gallery-content-item",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryContentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cleanup
    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Horizontal Gallery Section */}
      <section
        ref={sectionRef}
        data-section="3"
        className="relative"
        style={{ height: "400vh" }} // Spazio per scroll orizzontale
      >
        {/* Mobile Title */}
        <div className="md:hidden text-center py-8 bg-[#0A0A0A]">
          <span className="text-[#D4AF37] font-display text-xs tracking-[0.4em] uppercase mb-2 block">
            Galleria
          </span>
          <h2 className="font-display text-2xl text-white">
            I NOSTRI ALLENAMENTI
          </h2>
        </div>

        <div
          ref={stickyRef}
          className="sticky top-0 md:h-screen flex items-center overflow-hidden bg-[#0A0A0A] md:py-0 py-8 z-50"
        >
          {/* Title */}
          <div className="absolute top-10 left-8 z-20 hidden md:block">
            <span className="text-[#D4AF37] font-display text-xs tracking-[0.4em] uppercase mb-2 block">
              Galleria
            </span>
            <h2 className="font-display text-3xl text-white">
              I NOSTRI ALLENAMENTI
            </h2>
          </div>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-30">
            <div className="gallery-progress h-full bg-gradient-to-r from-[#D32F2F] to-[#D4AF37]" style={{ width: "0%" }} />
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            className={cn(
              "flex md:flex-row flex-col md:items-center gap-6 md:gap-8",
              "md:pl-[20vw] pl-4 pr-4 w-full"
            )}
            style={{ willChange: "transform" }}
          >
            {kravGalleryImages.map((img, i) => (
              <div
                key={i}
                className="gallery-img-wrap flex-shrink-0 relative overflow-hidden cursor-pointer group md:w-[clamp(240px,25vw,320px)] md:h-[clamp(400px,55vw,650px)] w-full aspect-[3/4] max-w-[300px] mx-auto"
                style={{
                  borderRadius: "1rem",
                }}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Image */}
                <div className="gallery-img-inner absolute inset-0 will-change-transform rounded-xl overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 768px) 80vw, 30vw"
                  />
                </div>

                {/* Image info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-display tracking-wide">
                    {img.alt}
                  </p>
                  <div className="w-8 h-[2px] bg-[#D4AF37] mt-2" />
                </div>

                {/* Corner accent on hover */}
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/80 transition-colors duration-300 z-20" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D32F2F]/0 group-hover:border-[#D32F2F]/80 transition-colors duration-300 z-20" />
              </div>
            ))}

            {/* Last spacer */}
            <div className="flex-shrink-0 md:w-[20vw] w-4" />
          </div>

          {/* Mobile scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs font-display uppercase tracking-widest md:hidden">
            ← Scorri →
          </div>
        </div>
      </section>

      {/* Content Section Below Gallery */}
      <section ref={galleryContentRef} className="relative py-24 md:py-32 bg-[#0A0A0A]">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[60%] opacity-10"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.3) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          {/* Section Title */}
          <div className="gallery-content-item text-center mb-16">
            <span className="text-[#D4AF37] font-display text-xs tracking-[0.4em] uppercase block mb-4">
              La Nostra Struttura
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              PASSIONE E DEDIZIONE
            </h2>
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="gallery-content-item relative p-8 bg-[#0D0D0D] border border-white/5 hover:border-[#D32F2F]/30 transition-colors duration-300 group">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D32F2F]/50 group-hover:border-[#D32F2F] transition-colors" />

              <div className="w-14 h-14 bg-[#D32F2F]/10 flex items-center justify-center mb-6 group-hover:bg-[#D32F2F]/20 transition-colors">
                <svg className="w-7 h-7 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              <h3 className="font-display text-xl text-white mb-3 tracking-wide">
                PALESTRUTTURA
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Attrezzature professionali per l'allenamento funzionale e il combattimento. Spazi dedicati per ogni tipo di esercitazione.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="gallery-content-item relative p-8 bg-[#0D0D0D] border border-white/5 hover:border-[#D4AF37]/30 transition-colors duration-300 group">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />

              <div className="w-14 h-14 bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors">
                <svg className="w-7 h-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>

              <h3 className="font-display text-xl text-white mb-3 tracking-wide">
                ISTRUTTORI
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Maestri certificati IKMF con anni di esperienza nel Krav Maga e nelle arti marziali. Formazione continua e aggiornamento.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="gallery-content-item relative p-8 bg-[#0D0D0D] border border-white/5 hover:border-[#D32F2F]/30 transition-colors duration-300 group">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D32F2F]/50 group-hover:border-[#D32F2F] transition-colors" />

              <div className="w-14 h-14 bg-[#D32F2F]/10 flex items-center justify-center mb-6 group-hover:bg-[#D32F2F]/20 transition-colors">
                <svg className="w-7 h-7 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <h3 className="font-display text-xl text-white mb-3 tracking-wide">
                SICUREZZA
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Protocolli di sicurezza rigorosi per ogni allenamento. Protezioni adeguate e supervisione costante durante le esercitazioni.
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="gallery-content-item mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="block font-display text-4xl md:text-5xl text-[#D32F2F] mb-2">200+</span>
              <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Studenti Attivi</span>
            </div>
            <div>
              <span className="block font-display text-4xl md:text-5xl text-[#D4AF37] mb-2">15+</span>
              <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Anni di Esperienza</span>
            </div>
            <div>
              <span className="block font-display text-4xl md:text-5xl text-[#D32F2F] mb-2">2</span>
              <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Sedi Operative</span>
            </div>
            <div>
              <span className="block font-display text-4xl md:text-5xl text-[#D4AF37] mb-2">500+</span>
              <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Lezioni Tenute</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
