"use client";

import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap-config";
import { Menu, X, Phone } from "lucide-react";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);

    if (menuRef.current) {
      if (newState) {
        gsap.to(menuRef.current, {
          x: "0%",
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(menuRef.current, {
          x: "100%",
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: headerRef }
  );

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 sm:gap-3" aria-label="Krav Maga Putignano — torna alla home">
              <Image
                src="/images/federkravmaga-logo.jpg"
                alt="Federkravmaga Italia — Global Defender Putignano"
                width={44}
                height={44}
                className="h-9 sm:h-11 w-auto shrink-0"
                priority
              />
              <span className="hidden sm:flex flex-col leading-none">
                <span className="font-display text-base sm:text-lg tracking-tight text-white">
                  KRAV MAGA
                </span>
                <span className="text-foreground/60 text-[10px] sm:text-xs font-body uppercase tracking-wider mt-0.5">
                  Putignano & Conversano
                </span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8" aria-label="Navigazione principale">
              <Link
                href="/#percorsi"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Corsi
              </Link>
              <Link
                href="/#sedi"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Sedi
              </Link>
              <Link
                href="/#istruttore"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Istruttore
              </Link>
              <Link
                href="/#faq"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                FAQ
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="tel:+393334567890"
                className="hidden sm:inline-flex items-center gap-2 bg-accent text-white font-semibold text-sm uppercase tracking-wider px-6 py-3 hover:bg-accent/90 transition-colors"
                aria-label="Chiama per prenotare una lezione gratuita"
              >
                <Phone className="w-4 h-4" />
                Prova Gratuita
              </a>
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-surface rounded-lg transition-colors"
                aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full sm:w-80 h-full bg-background/95 backdrop-blur-lg z-[60] translate-x-full border-l border-surface"
        style={{ boxShadow: "-20px 0 60px rgba(0,0,0,0.5)" }}
      >
        <div className="p-6">
          {/* Header del menu */}
          <div className="flex items-center justify-between mb-10">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-3" aria-label="Krav Maga Putignano — torna alla home">
              <Image
                src="/images/federkravmaga-logo.jpg"
                alt="Federkravmaga Italia"
                width={36}
                height={36}
                className="h-9 w-auto"
              />
              <span className="font-display text-lg text-white">KRAV MAGA</span>
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
              aria-label="Chiudi menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="space-y-2" aria-label="Navigazione mobile">
            <Link
              href="/#percorsi"
              onClick={closeMenu}
              className="block py-3 px-4 text-lg font-medium hover:bg-surface rounded-lg transition-colors"
            >
              Corsi
            </Link>
            <Link
              href="/#sedi"
              onClick={closeMenu}
              className="block py-3 px-4 text-lg font-medium hover:bg-surface rounded-lg transition-colors"
            >
              Sedi
            </Link>
            <Link
              href="/#istruttore"
              onClick={closeMenu}
              className="block py-3 px-4 text-lg font-medium hover:bg-surface rounded-lg transition-colors"
            >
              Istruttore
            </Link>
            <Link
              href="/#faq"
              onClick={closeMenu}
              className="block py-3 px-4 text-lg font-medium hover:bg-surface rounded-lg transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* CTA */}
          <div className="mt-10 pt-6 border-t border-surface">
            <a
              href="tel:+393334567890"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 bg-accent text-white font-semibold text-sm uppercase tracking-wider px-6 py-4 hover:bg-accent/90 transition-colors rounded-lg"
            >
              <Phone className="w-4 h-4" />
              Prova Gratuita
            </a>
          </div>
        </div>
      </div>

      {/* Overlay scuro */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
