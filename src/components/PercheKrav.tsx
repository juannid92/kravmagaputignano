"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Reale, Non Spettacolo",
    description: "Techniche testate in situazioni reali. Niente flessioni inutili, niente kata. Solo ciò che funziona davvero.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Risultati Veloci",
    description: "Dopo poche lezioni saprai gestire le situazioni più comuni. Non servono anni per essere pronto.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Per Tutti",
    description: "Età, fitness, esperienza: non importa. Le tecniche si adattano a te, non il contrario.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Autodifesa Totale",
    description: "Verbal, psicologico, fisico. Impari a leggere il pericolo prima che diventi minaccia.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Disciplina Mentale",
    description: "Il Krav Maga forma la mente oltre il corpo. Fiducia, concentrazione, capacità di restare calmi sotto pressione.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Metodo Strutturato",
    description: "Programma progressivo con obiettivi chiari. Sai sempre dove sei e dove stai andando.",
  },
];

export function PercheKrav() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set([
          ".reason-card",
          headerRef.current,
          statsRef.current
        ], { opacity: 1, y: 0 });
        return;
      }

      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger with pin
      gsap.fromTo(
        ".reason-card",
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: "start"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        }
      );

      // Hover effects
      gsap.utils.toArray(".reason-card").forEach((card) => {
        const el = card as HTMLElement;

        el.addEventListener("mouseenter", () => {
          gsap.to(el, {
            y: -8,
            boxShadow: "0 20px 40px rgba(255, 61, 0, 0.15)",
            borderColor: "#FF3D00",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            y: 0,
            boxShadow: "0 0 0 rgba(255, 61, 0, 0)",
            borderColor: "#2A2A2A",
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });

      // Stats counter animation
      gsap.fromTo(
        statsRef.current?.children ? Array.from(statsRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#181818]">
      <div className="container-wide">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#FF3D00] mb-4 block">
            Perché Krav Maga
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1] mb-6">
            NON È UNO SPORT.
            <br />
            <span className="text-[#FF3D00]">È SOPRAVVIVENZA.</span>
          </h2>
          <p className="text-lg text-[#888]">
            Mentre altri ti insegnano a dare calci in aria e fare spaccate,
            noi ti prepariamo per la strada, il parcheggio, il locale.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="reason-card bg-[#222] p-8 border border-[#2A2A2A] transition-colors group cursor-pointer"
            >
              <div className="text-[#FF3D00] mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>
              <h3 className="font-display text-xl mb-3 tracking-wide">
                {reason.title.toUpperCase()}
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-[#2A2A2A]">
          <div className="text-center">
            <div className="font-display text-5xl text-[#FF3D00] mb-2">10+</div>
            <div className="text-sm text-[#888] uppercase tracking-wider">Anni di Esperienza</div>
          </div>
          <div className="text-center">
            <div className="font-display text-5xl text-[#FF3D00] mb-2">150+</div>
            <div className="text-sm text-[#888] uppercase tracking-wider">Studenti Formati</div>
          </div>
          <div className="text-center">
            <div className="font-display text-5xl text-[#FF3D00] mb-2">3</div>
            <div className="text-sm text-[#888] uppercase tracking-wider">Corsi Disponibili</div>
          </div>
          <div className="text-center">
            <div className="font-display text-5xl text-[#FF3D00] mb-2">100%</div>
            <div className="text-sm text-[#888] uppercase tracking-wider">FOCUS DIFESA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
