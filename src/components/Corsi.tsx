"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    slug: "adulti",
    title: "KRAV MAGA ADULTI",
    age: "18+",
    schedule: "Mar, Gio, Ven",
    time: "20:00 - 21:30",
    description:
      "Il corso completo per adulti. Tecniche di difesa, situazionali, combattimento. Adatto a tutti i livelli.",
    features: [
      "Difesa da presa",
      "Difesa da colpo",
      "Combattimento base",
      "Tecniche a terra",
      "Gestione stress",
    ],
    price: "€80/mese",
    accent: "#FF3D00",
    popular: true,
  },
  {
    slug: "ragazzi",
    title: "KRAV MAGA RAGAZZI",
    age: "8-14",
    schedule: "Mercoledì",
    time: "17:00 - 18:30",
    description:
      "Corso pensato per i più giovani. Giochi, disciplina e tecniche base in un ambiente sicuro e divertente.",
    features: [
      "Coordinazione",
      "Autocontrollo",
      "Difesa bullismo",
      "Lavoro di gruppo",
      "Rispetto disciplina",
    ],
    price: "€60/mese",
    accent: "#22C55E",
    popular: false,
  },
  {
    slug: "donne",
    title: "DIFESA DONNE",
    age: "16+",
    schedule: "Lunedì",
    time: "19:30 - 21:00",
    description:
      "Corso dedicato con focus su situazioni reali che riguardano le donne. Gestione dello stress, tecniche specifiche.",
    features: [
      "Situazioni quotidiane",
      "Difesa da aggressione",
      "Tecniche donne-uomo",
      "Consapevolezza",
      "Psicologia difensiva",
    ],
    price: "€70/mese",
    accent: "#A855F7",
    popular: false,
  },
];

export function Corsi() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".course-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="corsi" className="py-24 bg-[#0C0C0C]">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#FF3D00] mb-4 block">
            I Nostri Corsi
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1] mb-6">
            SCEGLI IL TUO
            <br />
            <span className="text-[#FF3D00]">PERCORSO</span>
          </h2>
          <p className="text-lg text-[#888] max-w-2xl mx-auto">
            Ogni corso è strutturato per portarti da zero a competente.
            Nessuna esperienza richiesta.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.slug}
              className="course-card relative bg-[#181818] border border-[#2A2A2A] overflow-hidden group"
            >
              {/* Popular badge */}
              {course.popular && (
                <div className="absolute top-4 right-4 bg-[#FF3D00] text-white text-xs uppercase tracking-wider px-3 py-1 font-medium z-10">
                  Più Scelto
                </div>
              )}

              {/* Accent bar */}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: course.accent }}
              />

              <div className="p-8">
                {/* Course header */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-xs uppercase tracking-wider px-3 py-1 border"
                    style={{ borderColor: course.accent, color: course.accent }}
                  >
                    {course.age}
                  </span>
                  <span className="text-2xl font-display" style={{ color: course.accent }}>
                    {course.price}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl mb-2">{course.title}</h3>

                {/* Schedule */}
                <div className="flex items-center gap-4 text-sm text-[#888] mb-6">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {course.schedule}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.time}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#888] text-sm mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: course.accent }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#prova"
                  className="block w-full text-center py-4 font-medium uppercase tracking-wider transition-all"
                  style={{
                    backgroundColor: course.accent,
                    color: "white",
                  }}
                >
                  Prenota Prove Gratuita
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-[#666] text-sm mt-8">
          Prima lezione sempre gratuita. Nessun impegno.
        </p>
      </div>
    </section>
  );
}
