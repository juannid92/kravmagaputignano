"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowUp } from "lucide-react";
import { openCookieSettings } from "@/components/CookieConsent";
import { MapEmbed } from "@/components/MapEmbed";
import { LEGAL, legalCopyrightLine, legalIdentityLines } from "@/lib/legal";

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

const MAPS_EMBED_BASE = "https://maps.google.com/maps?q=";
const MAPS_EMBED_TAIL = "&t=&z=16&ie=UTF8&iwloc=&output=embed";
const MAPS_LINK_BASE = "https://www.google.com/maps/search/?api=1&query=";

const mappeBase = [
  {
    id: "LOC: PUT-01",
    title: "Mappa Putignano - Palestra Joy Fit",
    query: "Palestra Joy Fit, Via G. Leopardi 56, 70017 Putignano BA",
  },
  {
    id: "LOC: CON-02",
    title: "Mappa Conversano - Palestra Imperial Gym",
    query: "Palestra Imperial Gym, Via M. La Volpe 32, 70014 Conversano BA",
  },
];

const mappe = mappeBase.map((m) => ({
  id: m.id,
  title: m.title,
  src: MAPS_EMBED_BASE + encodeURIComponent(m.query) + MAPS_EMBED_TAIL,
  mapsUrl: MAPS_LINK_BASE + encodeURIComponent(m.query),
}));

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <footer ref={sectionRef} className="relative">
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
            {mappe.map((m) => (
              <div
                key={m.id}
                className="relative h-[300px] bg-[#0D0D0D] overflow-hidden military-badge"
              >
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CC0000] z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#CC0000] z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#CC0000] z-10 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CC0000] z-10 pointer-events-none" />
                <MapEmbed
                  src={m.src}
                  title={m.title}
                  mapsUrl={m.mapsUrl}
                  className="w-full h-full border-0 grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                />
                <span className="absolute top-3 left-3 military-id text-white/50 pointer-events-none">{m.id}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliation strip */}
      <section className="bg-[#0A0A0A] border-t border-white/5 py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-display text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/45 block mb-6">
            Affiliato a
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <Image
              src="/images/federkravmaga-adulti.jpg"
              alt="Federkravmaga Italia — Global Defender SRL"
              width={120}
              height={120}
              className="h-14 sm:h-16 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/images/defensystem-kids.jpg"
              alt="Defensystem Kids — Federkravmaga Italia"
              width={120}
              height={120}
              className="h-14 sm:h-16 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/images/federkravmaga-oro.jpg"
              alt="Federkravmaga Italia — Sport & Security"
              width={120}
              height={120}
              className="h-14 sm:h-16 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
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
                  src="/images/federkravmaga-adulti.jpg"
                  alt="Federkravmaga Italia"
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
                Scuola di Krav Maga in provincia di Bari. Corsi per adulti (dai 13 anni) e bambini (6-12 anni),
                tenuti da istruttori certificati Federkravmaga.
              </p>

              {/* Identità legale */}
              <div className="mt-5 space-y-0.5 text-[11px] text-white/40 font-body leading-relaxed">
                {legalIdentityLines().map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              {/* Social */}
              <div className="flex items-center gap-3 mt-6">
                <a
                  href="https://www.instagram.com/krav_maga_putignano_conversano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#CC0000]/30 flex items-center justify-center hover:border-[#CC0000] hover:bg-[#CC0000]/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white/50 hover:text-[#CC0000]" />
                </a>
                <a
                  href="https://www.facebook.com/kravmagaputignano2"
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
                    href={"mailto:" + LEGAL.complaintsEmail}
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
            <p className="text-white/30 text-xs font-body">{legalCopyrightLine()}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="border-[#CC0000]/30 text-white/50 hover:text-white hover:border-[#CC0000] hover:bg-[#CC0000]/10 transition-all duration-300"
            >
              Torna su
              <ArrowUp className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </footer>
  );
}
