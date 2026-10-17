"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Sede() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sede-content > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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
    <section ref={sectionRef} id="sede" className="py-24 bg-[#0C0C0C]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="sede-content">
            <div className="grid grid-cols-2 gap-4">
              {/* Main image */}
              <div className="col-span-2 aspect-video bg-[#181818] relative overflow-hidden border border-[#2A2A2A]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#FF3D00]/20 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-[#FF3D00]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <span className="text-[#666] text-sm">Foto della Sala</span>
                  </div>
                </div>
                {/* Accent */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#FF3D00]" />
              </div>

              {/* Small images */}
              <div className="aspect-square bg-[#181818] border border-[#2A2A2A] flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-[#444]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="aspect-square bg-[#181818] border border-[#2A2A2A] flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-[#444]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="sede-content">
            <span className="text-xs uppercase tracking-[0.3em] text-[#FF3D00] mb-4 block">
              La Nostra Sede
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-[1] mb-6">
              PUTIGNANO
              <br />
              <span className="text-[#FF3D00]">BA, PUGLIA</span>
            </h2>

            <p className="text-[#888] mb-8 leading-relaxed">
              Il nostro centro di allenamento si trova nel cuore di Putignano,
              facilmente raggiungibile da tutta la provincia di Bari. Lo spazio è
              attrezzato specificamente per l'allenamento del Krav Maga.
            </p>

            {/* Info cards */}
            <div className="space-y-4 mb-8">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 bg-[#181818] border border-[#2A2A2A]">
                <div className="w-10 h-10 bg-[#FF3D00]/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[#FF3D00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium mb-1">Indirizzo</div>
                  <div className="text-[#888] text-sm">
                    Via G. Leopardi, 56 — Palestra Joy Fit
                    <br />
                    70017 Putignano (BA)
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 bg-[#181818] border border-[#2A2A2A]">
                <div className="w-10 h-10 bg-[#FF3D00]/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[#FF3D00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium mb-1">Orari Allenamenti</div>
                  <div className="text-[#888] text-sm space-y-1">
                    <div>Lunedì: 19:30 - 21:00 (Donne)</div>
                    <div>Martedì: 20:00 - 21:30 (Adulti)</div>
                    <div>Mercoledì: 17:00 - 18:30 (Ragazzi)</div>
                    <div>Giovedì: 20:00 - 21:30 (Adulti)</div>
                    <div>Venerdì: 20:00 - 21:30 (Adulti)</div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4 p-4 bg-[#181818] border border-[#2A2A2A]">
                <div className="w-10 h-10 bg-[#FF3D00]/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[#FF3D00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium mb-1">Contatti</div>
                  <div className="text-[#888] text-sm">
                    <a href="tel:+393407106618" className="hover:text-[#FF3D00]">
                      +39 340 710 6618
                    </a>
                    <br />
                    <a
                      href="mailto:segreteria@global-defender.com"
                      className="hover:text-[#FF3D00]"
                    >
                      segreteria@global-defender.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Apri su Maps
              </a>
              <a href="#prova" className="btn-primary">
                Vieni a Trovarci
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
