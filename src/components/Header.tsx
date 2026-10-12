"use client";

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { Menu, Phone } from "lucide-react";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

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
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="#" className="flex items-center gap-2">
            <span className="font-display text-xl sm:text-2xl tracking-tight">
              KRAV MAGA
            </span>
            <span className="hidden sm:inline text-foreground/60 text-sm font-body">
              Putignano & Conversano
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#percorsi"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Corsi
            </Link>
            <Link
              href="#sedi"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Sedi
            </Link>
            <Link
              href="#istruttore"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Istruttore
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-2 bg-accent text-white font-semibold text-sm uppercase tracking-wider px-6 py-3 hover:bg-accent/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Prova Gratuita
            </a>
            <button className="md:hidden p-2 hover:bg-surface rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
