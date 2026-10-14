"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

const percorsiImages = {
  adulti: "https://images.pexels.com/photos/7045757/pexels-photo-7045757.jpeg?auto=compress&cs=tinysrgb&w=1200",
  bambini: "https://images.pexels.com/photos/7045661/pexels-photo-7045661.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export function Percorsi() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"adulti" | "bambini">("adulti");
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // Initial animation
      gsap.fromTo(
        ".percorso-initial",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleTabSwitch = (tab: "adulti" | "bambini") => {
    if (tab === activeTab || !contentRef.current || !imageRef.current) return;

    const tl = gsap.timeline();

    // Fade out current
    tl.to(contentRef.current.querySelector(".percorso-content"), {
      opacity: 0,
      y: -30,
      duration: 0.3,
      ease: "power2.in",
    })
    .to(imageRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.in",
    }, "<")

    // Switch content
    .call(() => setActiveTab(tab))

    // Fade in new
    .to(contentRef.current.querySelector(".percorso-content"), {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    })
    .to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
    }, "<");
  };

  const adultiContent = {
    title: "ADULTI",
    age: "DAI 16 ANNI",
    description: "Un allenamento concreto per chi vuole imparare a proteggere se stesso e i propri cari. Nessuna pretesa agonistica — solo risultati che contano.",
    features: [
      "Difesa da prese, strangolamenti e colpi",
      "Gestione di attacchi multipli",
      "Utilizzo di oggetti comuni come difesa",
      "Controllo dello stress in situazioni reali",
    ],
  };

  const bambiniContent = {
    title: "BAMBINI",
    age: "DAI 6 AI 15 ANNI",
    description: "Consapevolezza, disciplina e autostima. Gioco e apprendimento insieme.",
    features: [
      "Riconoscimento e prevenzione dei pericoli",
      "Tecniche adatte all'età",
      "Fiducia in se stessi",
      "Rispetto, disciplina e gruppo",
    ],
  };

  const content = activeTab === "adulti" ? adultiContent : bambiniContent;

  return (
    <section
      id="percorsi"
      data-section="4"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Red glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[50%] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(255, 61, 0, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,61,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,61,0,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="percorso-initial text-center mb-12">
          <span className="text-[#FF3D00] font-body text-xs tracking-[0.4em] uppercase block mb-4">
            I Percorsi
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            SCEGLI IL TUO PERCORSO
          </h2>
          <p className="text-white/50 text-base font-body max-w-md mx-auto">
            Stessi principi, metodi diversi
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="percorso-initial flex justify-center mb-12">
          <div className="relative inline-flex bg-[#1A1A1A] p-1 rounded-full border border-[#FF3D00]/30">
            <div
              className="absolute top-1 bottom-1 w-1/2 bg-[#FF3D00] rounded-full transition-all duration-300 ease-out"
              style={{
                left: activeTab === "adulti" ? "4px" : "calc(50% - 4px)",
              }}
            />
            <button
              onClick={() => handleTabSwitch("adulti")}
              className={`relative z-10 px-8 py-3 font-display text-sm tracking-wider transition-colors duration-300 rounded-full ${
                activeTab === "adulti" ? "text-white" : "text-white/50 hover:text-white"
              }`}
            >
              ADULTI
            </button>
            <button
              onClick={() => handleTabSwitch("bambini")}
              className={`relative z-10 px-8 py-3 font-display text-sm tracking-wider transition-colors duration-300 rounded-full ${
                activeTab === "bambini" ? "text-white" : "text-white/50 hover:text-white"
              }`}
            >
              BAMBINI
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="percorso-initial grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
            <div className="absolute inset-0 bg-[#FF3D00]/20" />
            <img
              src={activeTab === "adulti" ? percorsiImages.adulti : percorsiImages.bambini}
              alt={`Krav Maga ${activeTab === "adulti" ? "Adulti" : "Bambini"}`}
              className="w-full h-full object-cover"
            />
            {/* Red overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#FF3D00]/20" />

            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#FF3D00]" />
            <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[#FF3D00]" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[#FF3D00]" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#FF3D00]" />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <div className="percorso-content">
              {/* Age badge */}
              <div className="inline-flex items-center gap-3 bg-[#1A1A1A] border border-[#FF3D00]/30 px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-[#FF3D00] rounded-full animate-pulse" />
                <span className="text-[#FF3D00] font-body text-xs tracking-[0.2em] uppercase">
                  {content.age}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-6 leading-none">
                {content.title}
              </h3>

              {/* Red line */}
              <div className="w-24 h-[2px] bg-[#FF3D00] mb-8" />

              {/* Description */}
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                {content.description}
              </p>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {content.features.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-white/60">
                    <div className="w-5 h-5 rounded-full border-2 border-[#FF3D00] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#FF3D00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant="default"
                size="lg"
                className="group bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white border-2 border-[#FF3D00] shadow-[0_0_20px_rgba(255,61,0,0.3)] hover:shadow-[0_0_40px_rgba(255,61,0,0.5)] transition-all duration-300"
              >
                Scopri i corsi {activeTab === "adulti" ? "adulti" : "bambini"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="percorso-initial mt-16 grid grid-cols-3 gap-8 border-t border-[#FF3D00]/20 pt-12">
          <div className="text-center">
            <Shield className="w-8 h-8 text-[#FF3D00] mx-auto mb-3" />
            <div className="font-display text-3xl text-white mb-1">100%</div>
            <div className="text-white/40 text-xs uppercase tracking-wider">Pratico</div>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-[#FF3D00] mx-auto mb-3" />
            <div className="font-display text-3xl text-white mb-1">2</div>
            <div className="text-white/40 text-xs uppercase tracking-wider">Sedi</div>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-[#FF3D00] mx-auto mb-3" />
            <div className="font-display text-3xl text-white mb-1">200+</div>
            <div className="text-white/40 text-xs uppercase tracking-wider">Studenti</div>
          </div>
        </div>
      </div>
    </section>
  );
}
