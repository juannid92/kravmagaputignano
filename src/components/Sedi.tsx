"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, ArrowUpRight, MapPin } from "lucide-react";
import { sedi } from "@/lib/sedi";

gsap.registerPlugin(ScrollTrigger);

export function Sedi() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Section header
      gsap.fromTo(
        ".sedi-header > *",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Per-sede: clip reveal on the photo + stagger on content
      const cards = gsap.utils.toArray<HTMLElement>(".sede-card");
      cards.forEach((card) => {
        if (reducedMotion) {
          gsap.set(card.querySelectorAll("[data-reveal]"), { opacity: 1, x: 0, y: 0 });
          gsap.set(card.querySelector(".sede-photo-clip"), { clipPath: "inset(0 0% 0 0)" });
          return;
        }

        gsap.fromTo(
          card.querySelector(".sede-photo-clip"),
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.0,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );

        gsap.fromTo(
          card.querySelectorAll("[data-reveal]"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="sedi"
      data-section="6"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Soft red glow accent (top-left) */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-[55%] h-[45%] pointer-events-none opacity-[0.18]"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(255,61,0,0.55) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="sedi-header text-center mb-20 sm:mb-28">
          <span className="text-[#D4AF37] font-display text-xs tracking-[0.4em] uppercase block mb-3">
            Le Sedi
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            DOVE ALLENARSI
          </h2>
          <p className="text-white/50 text-base font-body max-w-md mx-auto">
            Due palestre, stessa filosofia
          </p>
        </div>

        {/* Sede cards */}
        <div className="space-y-20 sm:space-y-28">
          {sedi.map((sede, index) => (
            <article
              key={sede.slug}
              className="sede-card grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              data-testid={`sede-${sede.slug}`}
            >
              {/* PHOTO */}
              <div
                className={`lg:col-span-7 sede-photo-wrap relative ${
                  index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                } order-1`}
              >
                <div
                  className="sede-photo-clip relative w-full aspect-video overflow-hidden"
                  style={{ background: "#141414" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Image
                    src={sede.foto[0]}
                    alt={`Palestra Krav Maga ${sede.comune}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover scale-[1.02]"
                    loading="lazy"
                  />
                  {/* Subtle bottom-left darken for caption legibility */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, rgba(10,10,10,0.7) 100%)",
                    }}
                  />
                  {/* City label, bottom-left, on the photo */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
                    <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/60 block mb-1">
                      Sede operativa
                    </span>
                    <span className="font-stencil text-white text-2xl sm:text-3xl tracking-wider">
                      {sede.comune.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div
                className={`lg:col-span-5 ${
                  index % 2 === 1 ? "lg:order-1 lg:pr-2" : "lg:order-2 lg:pl-2"
                } order-2`}
              >
                {/* Index + label */}
                <div data-reveal className="flex items-baseline gap-4 mb-4">
                  <span className="font-stencil text-[#FF3D00] text-5xl sm:text-6xl leading-none">
                    0{index + 1}
                  </span>
                  <span className="font-stencil text-white/30 text-xl leading-none">
                    / 02
                  </span>
                </div>

                {/* Eyebrow + name */}
                <div data-reveal>
                  <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] block mb-3">
                    {sede.nomePalestra}
                  </span>
                  <h3 className="font-stencil text-white text-5xl sm:text-6xl tracking-wider leading-[0.95] mb-6">
                    {sede.comune.toUpperCase()}
                  </h3>
                </div>

                {/* Accent line */}
                <div
                  data-reveal
                  className="h-px w-12 mb-6"
                  style={{
                    background: "#FF3D00",
                    boxShadow: "0 0 18px rgba(255,61,0,0.7)",
                  }}
                  aria-hidden
                />

                {/* Address */}
                <div data-reveal className="flex items-start gap-3 mb-8 text-white/70 font-body">
                  <MapPin className="w-4 h-4 text-[#FF3D00] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm sm:text-base">{sede.indirizzo}</p>
                    <p className="text-xs text-white/40 mt-0.5">
                      {sede.CAP} {sede.citta} ({sede.provincia})
                    </p>
                  </div>
                </div>

                {/* Schedules: two flat lists, no boxes */}
                <div data-reveal className="mb-10 space-y-6">
                  <ScheduleList
                    label="ORARI ADULTI"
                    orari={sede.orariAdulti}
                  />
                  {sede.orariBambini.length > 0 && (
                    <ScheduleList
                      label="ORARI KIDS"
                      orari={sede.orariBambini}
                    />
                  )}
                </div>

                {/* CTA */}
                <div data-reveal>
                  <Link
                    href={`/sedi/${sede.slug}`}
                    className="sede-cta group inline-flex items-center gap-3 font-display text-sm tracking-[0.25em] uppercase text-white hover:text-[#FF3D00] transition-colors duration-300"
                  >
                    <span>Apri la sede</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <span
                      aria-hidden
                      className="sede-cta-line block h-px bg-[#FF3D00] transition-[width] duration-500 ease-out"
                      style={{ width: 0, minWidth: 0 }}
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sede-cta:hover .sede-cta-line {
          width: 80px !important;
        }
      `}</style>
    </section>
  );
}

function ScheduleList({
  label,
  orari,
}: {
  label: string;
  orari: { giorno: string; ora: string; note?: string }[];
}) {
  return (
    <div>
      <div className="font-display text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">
        {label}
      </div>
      <ul className="border-t border-white/10">
        {orari.map((o, i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-4 py-3 border-b border-white/10"
          >
            <span className="flex items-center gap-2 text-white/80 text-sm font-body">
              <Clock className="w-3.5 h-3.5 text-[#FF3D00]/70" />
              {o.giorno}
              {o.note && (
                <span className="text-white/40 text-xs">· {o.note}</span>
              )}
            </span>
            <span className="font-display text-base sm:text-lg text-white">
              {o.ora}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
