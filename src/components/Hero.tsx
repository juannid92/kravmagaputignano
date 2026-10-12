"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Video da Pexels - gratuito con CORS aperto
const kravVideo = "https://videos.pexels.com/video-files/5766254/5766254-uhd_2560_1440_25fps.mp4";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Show everything immediately
        gsap.set([
          eyebrowRef.current,
          lineRef.current,
          titleRef.current,
          subtitleRef.current,
          ctaRef.current,
        ], { opacity: 1, y: 0 });
        return;
      }

      // Initial states
      gsap.set([
        eyebrowRef.current,
        lineRef.current,
        titleRef.current,
        subtitleRef.current,
        ctaRef.current,
      ], { opacity: 0, y: 30 });

      // Eyebrow animation - più lento
      gsap.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      // Line animation - draw from left to right - più lento
      gsap.to(lineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });

      // Title reveal with clip - più lento
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(0 100% 0 0)", y: 20 },
        { clipPath: "inset(0 0% 0 0)", y: 0, duration: 1, ease: "power4.out", delay: 0.7 }
      );

      // Subtitle - più lento
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2,
      });

      // CTA - più lento
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.4,
      });

      // Video parallax on scroll
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

      // Overlay fade on scroll
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

      // Pulsing glow animation
      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 will-change-transform">
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.pexels.com/photos/7045757/pexels-photo-7045757.jpeg?auto=compress&cs=tinysrgb&w=1920"
        >
          <source src={kravVideo} type="video/mp4" />
          <source src="https://cdn.coverr.co/videos/coverr-boxing-training-in-gym-5764/1080p.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Red Glow Overlay - Top */}
      <div
        ref={glowRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[60%] z-[1] opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(255, 61, 0, 0.8) 0%, rgba(255, 61, 0, 0) 70%)',
        }}
      />

      {/* Red Glow Overlay - Bottom corners */}
      <div
        className="absolute bottom-0 left-0 w-[50%] h-[40%] z-[1] opacity-30"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(255, 61, 0, 0.6) 0%, rgba(255, 61, 0, 0) 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[50%] h-[40%] z-[1] opacity-30"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(255, 61, 0, 0.6) 0%, rgba(255, 61, 0, 0) 70%)',
        }}
      />

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2] bg-gradient-to-b from-black/70 via-black/50 to-black/80 will-change-opacity"
      />

      {/* Noise texture */}
      <div className="absolute inset-0 z-[3] opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Red accent lines */}
      <div className="absolute top-0 left-0 w-full h-full z-[4] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-[#FF3D00]/0 via-[#FF3D00]/20 to-[#FF3D00]/0" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-[#FF3D00]/0 via-[#FF3D00]/20 to-[#FF3D00]/0" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#FF3D00]" />
          <span className="text-[#FF3D00] font-body text-xs tracking-[0.4em] uppercase">
            Putignano • Bari
          </span>
          <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#FF3D00]" />
        </div>

        {/* Main Title */}
        <div className="relative mb-8">
          {/* Red glow behind title */}
          <div
            className="absolute inset-0 blur-[100px] opacity-50"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 61, 0, 0.8) 0%, transparent 70%)',
            }}
          />

          <h1
            ref={titleRef}
            className="relative font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-4 leading-[0.9] tracking-tight"
          >
            DIFESA
            <br />
            <span className="text-[#FF3D00]">PERSONALE</span>
          </h1>
        </div>

        {/* Accent line */}
        <div
          ref={lineRef}
          className="w-32 h-[3px] bg-[#FF3D00] mx-auto mb-8 origin-left"
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-body tracking-wide"
        >
          Impara a proteggere te stesso e i tuoi cari
          <br />
          <span className="text-[#FF3D00] font-medium">
            Con le tecniche del Krav Maga
          </span>
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button
            variant="default"
            size="lg"
            className="group bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white border-2 border-[#FF3D00] shadow-[0_0_30px_rgba(255,61,0,0.4)] hover:shadow-[0_0_50px_rgba(255,61,0,0.6)] transition-all duration-300"
          >
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Prenota Lezione Gratuita
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group border-2 border-white/30 text-white hover:border-[#FF3D00] hover:bg-[#FF3D00]/10 hover:text-[#FF3D00] transition-all duration-300"
          >
            Scopri i Corsi
          </Button>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF3D00] rounded-full" />
            <span className="text-sm font-body uppercase tracking-wider">Istruttore Certificato</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF3D00] rounded-full" />
            <span className="text-sm font-body uppercase tracking-wider">200+ Studenti</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF3D00] rounded-full" />
            <span className="text-sm font-body uppercase tracking-wider">15+ Anni Esperienza</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/30 text-xs font-body uppercase tracking-widest">
            Scorri
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#FF3D00] to-transparent" />
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 z-20 opacity-30">
        <div className="w-16 h-px bg-white" />
        <div className="w-px h-16 bg-white mt-0" />
      </div>
      <div className="absolute top-8 right-8 z-20 opacity-30">
        <div className="w-16 h-px bg-white ml-auto" />
        <div className="w-px h-16 bg-white mt-0 ml-auto" />
      </div>
      <div className="absolute bottom-8 left-8 z-20 opacity-30">
        <div className="w-16 h-px bg-white" />
        <div className="w-px h-16 bg-white mt-0 -mt-px" />
      </div>
      <div className="absolute bottom-8 right-8 z-20 opacity-30">
        <div className="w-16 h-px bg-white ml-auto" />
        <div className="w-px h-16 bg-white mt-0 ml-auto -mt-px" />
      </div>
    </section>
  );
}
