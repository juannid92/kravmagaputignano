"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sedi } from "@/lib/sedi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const maestroImage = "/images/maestro-saverio.jpg";

export function Maestro() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const maestro = sedi[0].maestro;

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) {
        gsap.set(photoRef.current, { scale: 1, opacity: 1 });
        gsap.set(".maestro-reveal", { opacity: 1, y: 0, letterSpacing: "0.05em" });
        return;
      }

      // Photo slow zoom on scroll
      gsap.fromTo(
        photoRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Title + eyebrow + caption + stats line: single stagger
      gsap.fromTo(
        ".maestro-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Title: letter-spacing collapse (imperial feel — lettere strette)
      gsap.fromTo(
        ".maestro-title",
        { letterSpacing: "0.4em" },
        {
          letterSpacing: "0.05em",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="istruttore"
      data-section="7"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0A0A]"
      style={{ height: "100svh", minHeight: 640 }}
    >
      {/* Full-bleed photo background */}
      <div className="absolute inset-0 z-0" ref={photoRef}>
        <Image
          src={maestroImage}
          alt="Maestro Saverio Mauro Capozza — Direttore Corsi Federkravmaga"
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-top sm:object-[center_20%]"
          style={{ filter: "grayscale(60%) contrast(1.15) brightness(0.45)" }}
          loading="lazy"
        />
        {/* Single dark gradient for legibility */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 40%, rgba(10,10,10,0.85) 100%)",
          }}
        />
      </div>

      {/* Centered content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4 text-center">
        <span
          className="maestro-reveal font-display text-[10px] sm:text-xs tracking-[0.5em] uppercase text-[#D4AF37] block mb-4 sm:mb-6"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
        >
          L&apos;Istruttore
        </span>

        <h2
          className="maestro-reveal maestro-title font-tactical uppercase text-white"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            lineHeight: 0.95,
            letterSpacing: "0.04em",
            textShadow:
              "0 4px 30px rgba(0,0,0,0.95), 0 0 60px rgba(255,0,0,0.45), 0 0 120px rgba(255,0,0,0.25)",
            fontWeight: 400,
          }}
        >
          Saverio
          <br />
          Capozza
        </h2>

        <div
          aria-hidden
          className="maestro-reveal mt-6 sm:mt-8 h-px w-16"
          style={{ background: "#FF0000", boxShadow: "0 0 18px rgba(255,0,0,0.7)" }}
        />

        {/* Single horizontal info line — NO boxes, just text separated by bullets */}
        <p
          className="maestro-reveal mt-5 sm:mt-6 font-display text-xs sm:text-sm tracking-[0.25em] uppercase text-white/80"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
        >
          19+ Anni <span className="text-[#FF0000] mx-3">·</span> 200+ Allievi{" "}
          <span className="text-[#FF0000] mx-3">·</span> 2 Sedi{" "}
          <span className="text-[#FF0000] mx-3">·</span> 4° Livello · Direttore Corsi
        </p>

        <span
          className="maestro-reveal mt-3 sm:mt-4 font-display text-[10px] sm:text-xs tracking-[0.35em] uppercase text-white/55"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
        >
          SSD Global Defender Srl · ENDAS
        </span>
      </div>

      {/* Bio appears AFTER the hero viewport */}
      <div className="relative z-10 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28 text-center">
          <p className="maestro-reveal font-marcellus text-xl sm:text-2xl leading-relaxed text-white/75">
            &ldquo;{maestro.bio}&rdquo;
          </p>
          <span
            aria-hidden
            className="block mx-auto mt-10 h-px w-12"
            style={{ background: "#FF0000", boxShadow: "0 0 18px rgba(255,0,0,0.7)" }}
          />
        </div>
      </div>
    </section>
  );
}
