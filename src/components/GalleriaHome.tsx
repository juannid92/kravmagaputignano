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
    const section = sectionRef.current;
    const viewport = stickyRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "gallery-horizontal",
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(distance(), viewport.clientHeight)}`,
          scrub: true,
          pin: viewport,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      timeline.to(track, { x: () => -distance(), duration: 1, ease: "none" }, 0);
      timeline.to(track.querySelectorAll(".gallery-img-inner"), { scale: 1.08, duration: 1, ease: "none" }, 0);
      timeline.to(section.querySelector(".gallery-progress"), { scaleX: 1, duration: 1, ease: "none" }, 0);
    }, section);
    // The content reveal is scoped and cleaned up with this matchMedia context.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const content = galleryContentRef.current;
      if (!content) return;
      gsap.fromTo(content.querySelectorAll(".gallery-content-item"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: content, start: "top 85%", toggleActions: "play none none reverse" } }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      {/* Horizontal Gallery Section */}
      <section
        ref={sectionRef}
        data-section="3"
        className="relative"
        data-testid="gallery"
      >
        <div
          ref={stickyRef}
          className="gallery-viewport relative flex items-center overflow-hidden bg-[#0A0A0A]"
        >
          {/* Title */}
          <div className="gallery-heading absolute left-6 md:left-8 z-20">
            <span className="text-[#D4AF37] font-display text-xs tracking-[0.4em] uppercase mb-2 block">
              Galleria
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-white">
              I NOSTRI ALLENAMENTI
            </h2>
          </div>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-30">
            <div className="gallery-progress h-full bg-gradient-to-r from-[#D32F2F] to-[#D4AF37]" style={{ transform: "scaleX(0)", transformOrigin: "left" }} />
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            className={cn(
              "gallery-track flex flex-row items-center gap-6 md:gap-8"
            )}
            style={{ willChange: "transform" }}
            data-testid="gallery-track"
          >
            {kravGalleryImages.map((img, i) => (
              <div
                key={i}
                className="gallery-img-wrap flex-shrink-0 relative overflow-hidden group"
                style={{
                  borderRadius: "1rem",
                }}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-0 md:translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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


          </div>

          {/* Mobile scroll hint */}
          <div className="gallery-hint absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-display uppercase tracking-widest">
            Scorri per esplorare
          </div>
        </div>
      </section>

      {/* Open editorial section: no repeated cards or framed panels. */}
      <section
        ref={galleryContentRef}
        aria-labelledby="structure-title"
        data-testid="structure"
        className="relative bg-[#0A0A0A] px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="gallery-content-item lg:col-span-5">
              <span className="mb-6 block font-display text-sm uppercase tracking-[0.25em] text-[#D4AF37]">
                La Nostra Struttura
              </span>
              <h2
                id="structure-title"
                className="font-stencil text-[clamp(2.5rem,4vw,3.25rem)] leading-[1.05] tracking-wide text-white"
              >
                PASSIONE<br />
                <span className="whitespace-nowrap text-[#D4AF37]">E DEDIZIONE</span>
              </h2>
              <span aria-hidden="true" className="mt-8 block h-[3px] w-16 bg-[#CC0000]" />
            </div>

            <div className="lg:col-span-7">
              {[
                {
                  number: "01",
                  title: "PALESTRUTTURA",
                  text: "Attrezzature professionali per l'allenamento funzionale e il combattimento. Spazi dedicati per ogni tipo di esercitazione.",
                },
                {
                  number: "02",
                  title: "ISTRUTTORI",
                  text: "Maestri certificati IKMF con anni di esperienza nel Krav Maga e nelle arti marziali. Formazione continua e aggiornamento.",
                },
                {
                  number: "03",
                  title: "SICUREZZA",
                  text: "Protocolli di sicurezza rigorosi per ogni allenamento. Protezioni adeguate e supervisione costante durante le esercitazioni.",
                },
              ].map((feature, index) => (
                <div
                  key={feature.number}
                  data-testid="structure-feature"
                  className={cn(
                    "gallery-content-item grid grid-cols-[2rem_minmax(0,1fr)] gap-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6",
                    index > 0 && "mt-8 border-t border-white/15 pt-8"
                  )}
                >
                  <span aria-hidden="true" className="pt-1 font-display text-sm tracking-wider text-[#D4AF37]">
                    {feature.number}
                  </span>
                  <div>
                    <h3 className="mb-3 font-display text-2xl tracking-wide text-white sm:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="max-w-[48ch] text-base leading-relaxed text-white/70">
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <dl className="gallery-content-item mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 pt-10 md:mt-24 md:grid-cols-4 md:gap-8 md:pt-12">
            {[
              { value: "200+", label: "Studenti Attivi" },
              { value: "15+", label: "Anni di Esperienza" },
              { value: "2", label: "Sedi Operative" },
              { value: "500+", label: "Lezioni Tenute" },
            ].map(stat => (
              <div key={stat.label} className="flex min-w-0 flex-col">
                <dt className="order-2 mt-3 text-sm leading-relaxed tracking-wide text-white/65">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-5xl leading-none tracking-tight text-white md:text-6xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
