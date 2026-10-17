"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Trophy, Users, Shield } from "lucide-react";
import { VideoHero } from "./VideoHero";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const goldAccentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([
          eyebrowRef.current,
          titleRef.current,
          subtitleRef.current,
          ctaRef.current,
        ], { opacity: 1, y: 0 });
        return;
      }

      // Initial states
      gsap.set([
        eyebrowRef.current,
        titleRef.current,
        subtitleRef.current,
        ctaRef.current,
      ], { opacity: 0, y: 40 });

      // Eyebrow
      gsap.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Title reveal con fade normale, non clip-path
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out", delay: 0.4 }
      );

      // Gold accent line
      gsap.fromTo(
        ".gold-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "power3.out", delay: 0.8 }
      );

      // Subtitle
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.9,
      });

      // CTA
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.1,
      });

      // Video parallax
      gsap.to(videoRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Overlay fade
      gsap.to(overlayRef.current, {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content fade out on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });

      // Video scale
      gsap.to(videoRef.current, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-section="1"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 will-change-transform">
        <VideoHero
          videoMp4="/videos/hero-720p.mp4"
          videoWebm="/videos/hero-720p.webm"
          poster="/videos/hero-poster-720p.jpg"
          videoRef={videoRef}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 via-black/50 to-black/85 will-change-opacity"
      />

      {/* Accent Glow - Red */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[50%] z-[1] opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(220, 38, 38, 0.6) 0%, transparent 70%)',
        }}
      />

      {/* Gold Accent Glow */}
      <div ref={goldAccentRef} className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[30%] z-[1] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 z-[3] opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Side accent lines */}
      <div className="absolute top-0 left-0 w-full h-full z-[4] pointer-events-none">
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#D32F2F]/20 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#D32F2F]/20 to-transparent" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
          <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[#D4AF37] font-[family-name:var(--font-display)] text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.5em] uppercase whitespace-nowrap">
            Putignano · Conversano
          </span>
          <span className="text-[#D4AF37]/60 font-[family-name:var(--font-display)] text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.5em] uppercase">
            ·
          </span>
          <span className="text-[#D4AF37] font-[family-name:var(--font-display)] text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.5em] uppercase whitespace-nowrap">
            Puglia
          </span>
          <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Main Title */}
        <div className="relative mb-4">
          <h1
            ref={titleRef}
            className="relative font-[family-name:var(--font-display)] text-white mb-2 leading-[0.85]"
            style={{ fontSize: "clamp(4rem, 14vw, 12rem)", letterSpacing: "0.02em" }}
          >
            KRAV MAGA
          </h1>
          {/* Gold accent underline */}
          <div className="gold-line w-40 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2 origin-center" />
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-xl mx-auto font-[family-name:var(--font-display)] tracking-wide">
          DIFESA PERSONALE
          <span className="block text-[#D4AF37] text-sm mt-2 tracking-[0.3em]">
            SCUOLA UFFICIALE
          </span>
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+393407106618"
            className="inline-flex items-center bg-[#D32F2F] hover:bg-[#B71C1C] text-white border-2 border-[#D32F2F] shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-all duration-300 font-[family-name:var(--font-display)] tracking-wider px-6 py-3 text-base sm:text-lg"
            aria-label="Chiama per prenotare una lezione di prova gratuita"
          >
            <Play className="w-4 h-4 mr-2" />
            PROVA GRATIS
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>

          <Link
            href="/corsi/adulti"
            className="inline-flex items-center border-2 border-[#D4AF37]/50 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 font-[family-name:var(--font-display)] tracking-wider px-6 py-3 text-base sm:text-lg"
            aria-label="Vai alla pagina dei corsi per adulti"
          >
            SCOPRI I CORSI
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
            <div className="text-left">
              <span className="block text-white text-lg font-[family-name:var(--font-display)]">CERTIFICATO</span>
              <span className="text-white/40 text-xs tracking-wider">WKMF · SD Global Defender</span>
            </div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#D32F2F]" />
            <div className="text-left">
              <span className="block text-white text-lg font-[family-name:var(--font-display)]">200+</span>
              <span className="text-white/40 text-xs tracking-wider">STUDENTI</span>
            </div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-[#D4AF37]" />
            <div className="text-left">
              <span className="block text-white text-lg font-[family-name:var(--font-display)]">19+</span>
              <span className="text-white/40 text-xs tracking-wider">ANNI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-6 left-6 z-20 opacity-25">
        <div className="w-12 h-px bg-white" />
        <div className="w-px h-12 bg-white" />
      </div>
      <div className="absolute top-6 right-6 z-20 opacity-25">
        <div className="w-12 h-px bg-white ml-auto" />
        <div className="w-px h-12 bg-white ml-auto" />
      </div>
      <div className="absolute bottom-6 left-6 z-20 opacity-25">
        <div className="w-12 h-px bg-white" />
        <div className="w-px h-12 bg-white -mt-px" />
      </div>
      <div className="absolute bottom-6 right-6 z-20 opacity-25">
        <div className="w-12 h-px bg-white ml-auto" />
        <div className="w-px h-12 bg-white ml-auto -mt-px" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/30 text-[10px] font-[family-name:var(--font-display)] uppercase tracking-[0.3em]">
            Scorri
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </div>
      </div>
    </section>
  );
}
