"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, MapPin, ArrowRight, Maximize2 } from "lucide-react";
import { sedi } from "@/lib/sedi";

gsap.registerPlugin(ScrollTrigger);

const sediImages = {
  putignano: "https://images.pexels.com/photos/7045757/pexels-photo-7045757.jpeg?auto=compress&cs=tinysrgb&w=1200",
  conversano: "https://images.pexels.com/photos/6455245/pexels-photo-6455245.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export function Sedi() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSede, setActiveSede] = useState("putignano");
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // Parallax on images
      gsap.utils.toArray(".sede-image").forEach((img: any) => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Initial reveal
      gsap.fromTo(
        ".sedi-content",
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

  const handleSedeChange = (slug: string) => {
    if (slug === activeSede || !infoRef.current) return;

    const tl = gsap.timeline();

    // Fade out info
    tl.to(infoRef.current.querySelector(".sede-info-content"), {
      opacity: 0,
      x: -20,
      duration: 0.2,
      ease: "power2.in",
    });

    // Image transition
    tl.to(imageRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.2,
      ease: "power2.in",
    }, "<")

    // Switch content
    .call(() => setActiveSede(slug))

    // Fade in
    .to(infoRef.current.querySelector(".sede-info-content"), {
      opacity: 1,
      x: 0,
      duration: 0.3,
      ease: "power3.out",
    })
    .to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    }, "<");
  };

  const currentSede = sedi.find(s => s.slug === activeSede) || sedi[0];

  return (
    <section
      id="sedi"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Red glow accents */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] opacity-10"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(255, 61, 0, 0.6) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="sedi-content text-center mb-16">
          <span className="text-[#FF3D00] font-body text-xs tracking-[0.4em] uppercase block mb-4">
            Le Sedi
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            DOVE ALLENARSI
          </h2>
          <p className="text-white/50 text-base font-body max-w-md mx-auto">
            Due palestre, stessa filosofia
          </p>
        </div>

        {/* Main Content - Immersive Split */}
        <div className="sedi-content">
          {/* Toggle buttons */}
          <div className="flex justify-center gap-4 mb-12">
            {sedi.map((sede) => (
              <button
                key={sede.slug}
                onClick={() => handleSedeChange(sede.slug)}
                className={`relative px-8 py-4 font-display text-sm tracking-wider transition-all duration-300 ${
                  activeSede === sede.slug
                    ? "text-white bg-[#1A1A1A] border-2 border-[#FF3D00]"
                    : "text-white/50 bg-transparent border-2 border-white/10 hover:border-[#FF3D00]/50"
                }`}
              >
                {activeSede === sede.slug && (
                  <div className="absolute -inset-px bg-[#FF3D00]/10 rounded-sm" />
                )}
                {sede.comune.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-5 gap-0 min-h-[600px]">
            {/* Image - 60% */}
            <div
              ref={imageRef}
              className="lg:col-span-3 relative overflow-hidden bg-[#1A1A1A]"
            >
              {/* Red line divider */}
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#FF3D00] z-10" />

              <Link href={`/sedi/${activeSede}`} className="block w-full h-full">
                <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] overflow-hidden">
                  {/* Background image with parallax */}
                  <img
                    src={sediImages[activeSede as keyof typeof sediImages]}
                    alt={`Palestra Krav Maga ${currentSede.comune}`}
                    className="sede-image absolute inset-0 w-full h-[120%] object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />

                  {/* Fullscreen icon */}
                  <div className="absolute top-6 right-6 w-10 h-10 bg-[#0A0A0A]/50 backdrop-blur-sm flex items-center justify-center">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>

                  {/* City name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                    <div className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
                      {currentSede.comune.toUpperCase()}
                    </div>
                    <div className="text-[#FF3D00] font-body text-xs tracking-[0.3em] uppercase mt-3">
                      {currentSede.nomePalestra}
                    </div>
                  </div>

                  {/* Red accent line */}
                  <div className="absolute bottom-0 left-0 w-32 h-[2px] bg-[#FF3D00]" />
                </div>
              </Link>
            </div>

            {/* Info - 40% */}
            <div
              ref={infoRef}
              className="lg:col-span-2 bg-[#0A0A0A] border-l border-[#FF3D00]/20"
            >
              <div className="sede-info-content p-8 lg:p-12 h-full flex flex-col">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="font-display text-3xl text-white mb-2">
                    {currentSede.comune}
                  </h3>
                  <p className="text-white/50 text-sm">
                    {currentSede.nomePalestra}
                  </p>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 mb-8 p-4 bg-[#1A1A1A] border-l-2 border-[#FF3D00]">
                  <MapPin className="w-5 h-5 text-[#FF3D00] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm">{currentSede.indirizzo}</p>
                    <p className="text-white/50 text-xs mt-1">Puglia, Italia</p>
                  </div>
                </div>

                {/* Schedules */}
                <div className="space-y-6 flex-grow">
                  {/* Adulti */}
                  <div className="bg-[#1A1A1A] p-6 border border-[#FF3D00]/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 bg-[#FF3D00] rounded-full" />
                      <span className="text-white font-display text-sm tracking-wider">CORSO ADULTI</span>
                    </div>
                    <div className="space-y-2">
                      {currentSede.orariAdulti.map((orario, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-[#FF3D00]/60" />
                          <span className="text-white/70 text-sm">{orario.giorno}: {orario.ora}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bambini */}
                  <div className="bg-[#1A1A1A] p-6 border border-[#FF3D00]/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 bg-[#FF3D00] rounded-full" />
                      <span className="text-white font-display text-sm tracking-wider">CORSO BAMBINI</span>
                    </div>
                    <div className="space-y-2">
                      {currentSede.orariBambini.map((orario, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-[#FF3D00]/60" />
                          <span className="text-white/70 text-sm">{orario.giorno}: {orario.ora}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/sedi/${activeSede}`}
                  className="mt-8 flex items-center justify-between bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white p-4 transition-colors group"
                >
                  <span className="font-display text-sm tracking-wider">SCOPRI DI PIÙ</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
