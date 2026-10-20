"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap-config";
import { Menu, X, Phone, ArrowLeft } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const isSubpage = Boolean(pathname && pathname !== "/");
  const backHref = pathname?.startsWith("/corsi")
    ? "/#percorsi"
    : pathname?.startsWith("/sedi")
    ? "/#sedi"
    : "/";
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
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
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
            <div className="flex items-center gap-2 sm:gap-3">
              {isSubpage && (
                <Link
                  href={backHref}
                  onClick={(e) => {
                    if (typeof window !== "undefined" && window.history.length > 1) {
                      e.preventDefault();
                      window.history.back();
                    }
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white transition-all text-xs font-medium min-h-[36px] group"
                  aria-label="Torna indietro"
                  title="Torna indietro"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-accent" />
                  <span className="hidden sm:inline font-display uppercase tracking-wider text-[11px]">
                    Indietro
                  </span>
                </Link>
              )}
              <Link href="/" className="flex items-center gap-2 sm:gap-3" aria-label="Krav Maga Putignano — torna alla home">
                <Image
                  src="/images/federkravmaga-adulti.jpg"
                  alt="Federkravmaga Italia"
                  width={44}
                  height={44}
                  className="h-8 sm:h-11 w-auto shrink-0"
                  priority
                />
                <span className="flex flex-col leading-none">
                  <span className="font-display text-sm sm:text-lg tracking-tight text-white whitespace-nowrap">
                    KRAV MAGA
                  </span>
                  <span className="text-foreground/60 text-[9px] sm:text-xs font-body uppercase tracking-wider mt-0.5 whitespace-nowrap">
                    Putignano & Conversano
                  </span>
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-8" aria-label="Navigazione principale">
              <Link
                href="/corsi/adulti"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Corsi
              </Link>
              <Link
                href="/sedi/putignano"
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

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="tel:+393407106618"
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-accent text-white font-semibold text-xs sm:text-sm uppercase tracking-wider px-3 sm:px-6 py-2 sm:py-3 hover:bg-accent/90 transition-colors shrink-0"
                aria-label="Chiama per prenotare una lezione gratuita"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline sm:inline">Prova Gratuita</span>
                <span className="xs:hidden sm:hidden">Prova</span>
              </a>
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-surface rounded-lg transition-colors"
                aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className="fixed top-0 right-0 w-full sm:w-80 h-full bg-background/95 backdrop-blur-lg z-[60] translate-x-full border-l border-surface"
        style={{ boxShadow: "-20px 0 60px rgba(0,0,0,0.5)" }}
        role="dialog"
        aria-modal={menuOpen ? "true" : undefined}
        aria-label="Menu di navigazione"
      >
        <div className="p-6">
          {/* Header del menu */}
          <div className="flex items-center justify-between mb-10">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-3" aria-label="Krav Maga Putignano — torna alla home">
              <Image
                src="/images/federkravmaga-adulti.jpg"
                alt="Federkravmaga Italia"
                width={36}
                height={36}
                className="h-9 w-auto"
              />
              <span className="font-display text-lg text-white">KRAV MAGA</span>
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-surface rounded-lg transition-colors"
              aria-label="Chiudi menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="space-y-2" aria-label="Navigazione mobile">
            {isSubpage && (
              <Link
                href={backHref}
                onClick={(e) => {
                  closeMenu();
                  if (typeof window !== "undefined" && window.history.length > 1) {
                    e.preventDefault();
                    window.history.back();
                  }
                }}
                className="flex items-center gap-2.5 py-3 px-4 text-base font-semibold text-accent hover:bg-surface rounded-lg transition-colors border border-accent/30 mb-3"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Torna indietro</span>
              </Link>
            )}
            <Link
              href="/corsi/adulti"
              onClick={closeMenu}
              className="block py-3 px-4 text-lg font-medium hover:bg-surface rounded-lg transition-colors"
            >
              Corsi
            </Link>
            <Link
              href="/sedi/putignano"
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
              href="tel:+393407106618"
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
