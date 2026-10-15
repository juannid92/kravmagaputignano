"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { StructureManifesto } from "./StructureManifesto";

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

      <StructureManifesto />
    </>
  );
}
