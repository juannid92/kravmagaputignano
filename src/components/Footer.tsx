"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowRight, Zap } from "lucide-react";
import { openCookieSettings } from "@/components/CookieConsent";

const sedi = [
  {
    nome: "Putignano",
    indirizzo: "Palestra Joy Fit · Via G. Leopardi, 56\n70017 Putignano (BA)",
  },
  {
    nome: "Conversano",
    indirizzo: "Palestra Imperial Gym · Via M. La Volpe, 32\n70014 Conversano (BA)",
  },
];

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".footer-content", { y: 0, opacity: 1 });
        return;
      }

      // CTA Section animation
      gsap.fromTo(
        ".footer-cta-content > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Background glow pulse
      gsap.to(".footer-glow", {
        scale: 1.05,
        opacity: 0.4,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef }
  );

  return (
    <footer ref={sectionRef} className="relative">
      {/* CTA Section - Full Width Red/Black */}
      <section className="relative bg-[#CC0000] overflow-hidden">
        {/* Background effects */}
        <div className="footer-glow absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%)',
          }}
        />

        {/* Diagonal stripes */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="stripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="black" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#stripes)" />
          </svg>
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        {/* Content */}
        <div className="footer-cta-content relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#0A0A0A]" />

          <div className="text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0A0A0A] rounded-full mb-8">
              <Zap className="w-8 h-8 text-[#CC0000]" />
            </div>

            {/* Heading */}
            <h2 className="font-stencil text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight tracking-wider">
              INIZIA ORA
            </h2>

            {/* Red line */}
            <div className="w-32 h-[3px] bg-[#0A0A0A] mx-auto mb-8" />

            {/* Subtext */}
            <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-body">
              La prima lezione è gratuita e senza impegno.
              <br />
              <span className="font-medium">Contattaci e prenota oggi.</span>
            </p>

            {/* Phone CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12">
              <a
                href="tel:+393407106618"
                className="flex items-center gap-4 bg-[#0A0A0A] hover:bg-[#0A0A0A]/90 text-white px-8 py-4 transition-all duration-300 hover:scale-105 group"
              >
                <Phone className="w-6 h-6 text-[#CC0000]" />
                <span className="font-stencil text-2xl">+39 340 710 6618</span>
              </a>
            </div>

            {/* Form hint */}
            <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
              <span>Oppure</span>
              <button className="text-white underline hover:text-white/80 transition-colors">
                scrivici un messaggio
              </button>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#0A0A0A]" />
        </div>
      </section>

      {/* Mappa Section */}
      <section className="bg-[#0A0A0A] py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#D4AF37] font-[family-name:var(--font-display)] text-xs tracking-[0.4em] uppercase block mb-3">
              Dove Trovarci
            </span>
            <h3 className="font-stencil text-2xl sm:text-3xl text-white tracking-wider">
              LE NOSTRE SEDI
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Mappa Putignano */}
            <div className="relative h-[300px] bg-[#0D0D0D] overflow-hidden military-badge">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CC0000] z-10" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#CC0000] z-10" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#CC0000] z-10" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CC0000] z-10" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.5!2d17.0!3d40.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDUxJzAwLjAiTiAxN8KwMDAnMDAuMCJF!5e0!3m2!1sit!2sit!4v1600000000000!5m2!1sit!2sit"
                className="w-full h-full border-0 grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Putignano"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0A] to-transparent h-12 pointer-events-none" />
              <span className="absolute top-3 left-3 military-id text-white/50">LOC: PUT-01</span>
            </div>

            {/* Mappa Conversano */}
            <div className="relative h-[300px] bg-[#0D0D0D] overflow-hidden military-badge">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CC0000] z-10" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#CC0000] z-10" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#CC0000] z-10" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CC0000] z-10" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.5!2d17.1!3d40.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU4JzA2LjAiTiAxN8KwMDYnMDAuMCJF!5e0!3m2!1sit!2sit!4v1600000000000!5m2!1sit!2sit"
                className="w-full h-full border-0 grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Conversano"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0A] to-transparent h-12 pointer-events-none" />
              <span className="absolute top-3 left-3 military-id text-white/50">LOC: CON-02</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info Section */}
      <section className="bg-[#0A0A0A] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 md:gap-8">
            {/* Brand */}
            <div className="footer-content md:col-span-1">
              <Link href="/" className="inline-flex items-center gap-3 mb-5" aria-label="Krav Maga Putignano — torna alla home">
                <Image
                  src="/images/federkravmaga-logo.jpg"
                  alt="Federkravmaga Italia — Global Defender Putignano"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
                <span className="flex flex-col leading-none">
                  <span className="font-display text-2xl text-white tracking-tight">
                    KRAV MAGA
                  </span>
                  <span className="text-white/40 text-[10px] font-body mt-1 uppercase tracking-wider">
                    Putignano & Conversano
                  </span>
                </span>
              </Link>
              <p className="text-white/50 text-sm font-body leading-relaxed max-w-xs">
                Scuola di Krav Maga in provincia di Bari. Corsi per adulti e bambini,
                tenuti da istruttori certificati Federkravmaga.
              </p>

              {/* Identità legale (placeholder da compilare) */}
              <div className="mt-5 space-y-0.5 text-[11px] text-white/40 font-body leading-relaxed">
                <p>[INSERIRE RAGIONE SOCIALE]</p>
                <p>P.IVA / C.F. [INSERIRE]</p>
                <p>REA [INSERIRE] — Bari</p>
              </div>

              {/* Social */}
              <div className="flex items-center gap-3 mt-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#CC0000]/30 flex items-center justify-center hover:border-[#CC0000] hover:bg-[#CC0000]/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white/50 hover:text-[#CC0000]" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#CC0000]/30 flex items-center justify-center hover:border-[#CC0000] hover:bg-[#CC0000]/10 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-white/50 hover:text-[#CC0000]" />
                </a>
              </div>
            </div>

            {/* Sedi */}
            <div className="footer-content">
              <h4 className="font-body text-xs text-[#CC0000] uppercase tracking-[0.2em] mb-6">
                Le Nostre Sedi
              </h4>
              <div className="space-y-6">
                {sedi.map((sede) => (
                  <div key={sede.nome}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-[#CC0000]" />
                      <h5 className="font-display text-xl text-white">{sede.nome}</h5>
                    </div>
                    <p className="text-white/50 text-sm font-body whitespace-pre-line pl-4">
                      {sede.indirizzo}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Link utili */}
            <div className="footer-content">
              <h4 className="font-body text-xs text-[#CC0000] uppercase tracking-[0.2em] mb-6">
                Link Utili
              </h4>
              <ul className="space-y-3 text-sm font-body">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-white/60 hover:text-[#CC0000] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="text-white/60 hover:text-[#CC0000] transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={openCookieSettings}
                    className="text-white/60 hover:text-[#CC0000] transition-colors text-left"
                  >
                    Gestisci cookie
                  </button>
                </li>
                <li>
                  <Link
                    href="/termini"
                    className="text-white/60 hover:text-[#CC0000] transition-colors"
                  >
                    Termini &amp; Condizioni
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:segreteria@global-defender.com"
                    className="text-white/60 hover:text-[#CC0000] transition-colors"
                  >
                    Reclami e segnalazioni
                  </a>
                </li>
              </ul>
            </div>

            {/* Contatti */}
            <div className="footer-content">
              <h4 className="font-body text-xs text-[#CC0000] uppercase tracking-[0.2em] mb-6">
                Contatti
              </h4>
              <div className="space-y-4">
                <a
                  href="tel:+393407106618"
                  className="flex items-center gap-3 text-white/50 hover:text-[#CC0000] transition-colors group"
                >
                  <Phone className="w-5 h-5 text-[#CC0000]/60 group-hover:text-[#CC0000]" />
                  <span className="text-sm font-body">+39 340 710 6618</span>
                </a>
                <a
                  href="mailto:segreteria@global-defender.com"
                  className="flex items-center gap-3 text-white/50 hover:text-[#CC0000] transition-colors group"
                >
                  <Mail className="w-5 h-5 text-[#CC0000]/60 group-hover:text-[#CC0000]" />
                  <span className="text-sm font-body">segreteria@global-defender.com</span>
                </a>
                <div className="flex items-center gap-3 text-white/50 pt-2">
                  <MapPin className="w-5 h-5 text-[#CC0000]/60" />
                  <span className="text-sm font-body">Bari, Italia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs font-body">
              © {new Date().getFullYear()} [INSERIRE RAGIONE SOCIALE] — P.IVA [INSERIRE]. Tutti i diritti riservati.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="border-[#CC0000]/30 text-white/50 hover:text-white hover:border-[#CC0000] hover:bg-[#CC0000]/10 transition-all duration-300"
            >
              Torna su
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </footer>
  );
}
