"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, MessageCircle, Navigation, Phone, ArrowRight, ChevronRight } from "lucide-react";
import { Sede } from "@/lib/sedi";
import { GrigliaFoto } from "./GrigliaFoto";
import { Lightbox } from "./Lightbox";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface SedeTemplateProps {
  sede: Sede;
  altraSede?: Sede;
}

export function SedeTemplate({ sede, altraSede }: SedeTemplateProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useGSAP(
    () => {
      // Hero reveal
      gsap.fromTo(
        ".sede-hero-content > *",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Intro
      gsap.fromTo(
        ".sede-intro",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sede-intro",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Orari table
      gsap.fromTo(
        ".orari-section",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".orari-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax depth on sede section
      gsap.matchMedia().add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".sede-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.to(".sede-hero-bg", { yPercent: -15, ease: "none" })
          .to(".sede-hero-content", { yPercent: -5, ease: "none" }, "<")
          .to(".sede-hero-overlay", { opacity: 0.9 }, "<");
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main ref={sectionRef} className="bg-background">
      {/* Hero */}
      <section className="sede-hero relative h-screen min-h-[600px] overflow-hidden">
        <div className="sede-hero-bg absolute inset-0">
          <Image
            src={sede.foto[0]}
            alt={sede.nomePalestra}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="sede-hero-overlay absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

        <div className="sede-hero-content relative z-10 h-full flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
          <span className="text-accent font-display text-sm tracking-widest mb-2">
            KRAV MAGA {sede.comune.toUpperCase()}
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-4">
            {sede.comune.toUpperCase()}
          </h1>
          <p className="text-foreground/80 text-lg sm:text-xl font-body max-w-xl">
            {sede.nomePalestra}
            <span className="mx-2">·</span>
            {sede.indirizzo}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="sede-intro py-16 sm:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-foreground/80 text-lg sm:text-xl font-body leading-relaxed">
            {sede.introBreve}
          </p>
        </div>
      </section>

      {/* Orari */}
      <section className="orari-section py-16 sm:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-foreground text-center mb-12">
            ORARI
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Adulti */}
            <div className="bg-surface rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-foreground">ADULTI</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-foreground/40 text-sm uppercase tracking-wider">
                    <th className="text-left font-body pb-3">Giorno</th>
                    <th className="text-right font-body pb-3">Orario</th>
                  </tr>
                </thead>
                <tbody>
                  {sede.orariAdulti.map((orario, i) => (
                    <tr key={i} className="border-t border-foreground/10">
                      <td className="py-4 text-foreground font-body">{orario.giorno}</td>
                      <td className="py-4 text-accent font-display text-lg text-right">{orario.ora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bambini */}
            <div className="bg-surface rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-foreground">BAMBINI</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-foreground/40 text-sm uppercase tracking-wider">
                    <th className="text-left font-body pb-3">Giorno</th>
                    <th className="text-right font-body pb-3">Orario</th>
                  </tr>
                </thead>
                <tbody>
                  {sede.orariBambini.map((orario, i) => (
                    <tr key={i} className="border-t border-foreground/10">
                      <td className="py-4 text-foreground font-body">
                        {orario.giorno}
                        {orario.note && (
                          <span className="block text-foreground/40 text-sm">{orario.note}</span>
                        )}
                      </td>
                      <td className="py-4 text-accent font-display text-lg text-right">{orario.ora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Punti forti */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {sede.puntiForti.map((punto, i) => (
              <div key={i} className="flex items-start gap-3 bg-surface/50 rounded-xl p-4">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-foreground/70 text-sm font-body">{punto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galleria */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-foreground text-center mb-12">
            GALLERIA
          </h2>
          <GrigliaFoto foto={sede.foto} onImageClick={openLightbox} />
        </div>
      </section>

      {/* Mappa */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl text-foreground text-center mb-12">
            DOVE TROVARCI
          </h2>
          <div className="rounded-2xl overflow-hidden bg-surface">
            <div className="aspect-video w-full">
              <iframe
                src={sede.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mappa ${sede.nomePalestra}`}
                className="grayscale"
              />
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-foreground font-body">{sede.indirizzo}</p>
                <p className="text-foreground/60 text-sm font-body">
                  {sede.CAP} {sede.citta} ({sede.provincia})
                </p>
              </div>
              <a
                href={sede.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white font-semibold text-sm uppercase tracking-wider px-6 py-3 hover:bg-accent/90 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Apri in Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-6">
            VUOI PROVARE?
          </h2>
          <p className="text-white/80 text-lg font-body mb-10">
            La prima lezione è gratuita. Contattaci e prenota il tuo posto a {sede.comune}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${sede.whatsapp}?text=${encodeURIComponent(`Ciao, vorrei prenotare una lezione di prova a ${sede.comune}.`)})}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 hover:bg-white hover:text-accent transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Scrivici su WhatsApp
            </a>
            <a
              href={`tel:${sede.telefono}`}
              className="inline-flex items-center gap-2 text-white hover:bg-white/10 border border-white/30 font-semibold text-sm uppercase tracking-wider px-8 py-4 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Chiama ora
            </a>
          </div>
        </div>
      </section>

      {/* Link altra sede */}
      {altraSede && (
        <section className="py-12 bg-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-foreground/60 text-sm font-body mb-4">
              Sei più vicino a {altraSede?.comune}?
            </p>
            <Link
              href={`/sedi/${altraSede.slug}`}
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors group"
            >
              <span className="font-display text-xl sm:text-2xl">
                VAI ALLA SEDE DI {altraSede.comune.toUpperCase()}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-background border-t border-foreground/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-block mb-4">
            <span className="font-display text-2xl text-foreground">KRAV MAGA</span>
            <span className="block text-foreground/40 text-xs font-body">Putignano & Conversano</span>
          </Link>
          <p className="text-foreground/40 text-xs font-body">
            © 2024 Krav Maga Putignano & Conversano. Tutti i diritti riservati.
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        foto={sede.foto}
        initialIndex={lightboxIndex}
      />
    </main>
  );
}
