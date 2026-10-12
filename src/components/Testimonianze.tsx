"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Giuseppe T.",
    role: "Impiegato, 38 anni",
    text: "Dopo 3 mesi mi sento una persona completamente diversa. Non solo fisicamente, ma anche mentalmente. Il Krav Maga ti cambia davvero.",
    rating: 5,
  },
  {
    name: "Laura M.",
    role: "Insegnante, 32 anni",
    text: "Avevo paura di tornare a casa tardi la sera. Ora quella paura non c'è più. Il corso donne è eccezionale, le tecniche sono pratiche e immediate.",
    rating: 5,
  },
  {
    name: "Alessandro R.",
    role: "Commerciante, 45 anni",
    text: "Ho provato tanti corsi martiali. Il Krav Maga è l'unico che ti prepara veramente per situazioni reali. Marco è un istruttore incredibile.",
    rating: 5,
  },
  {
    name: "Francesca B.",
    role: "Mamma, 36 anni",
    text: "Mio figlio di 11 anni era timido e insicuro. Dopo 6 mesi di corso è un altro bambino. La disciplina e il rispetto che ha imparato sono impressionanti.",
    rating: 5,
  },
  {
    name: "Davide C.",
    role: "Studente universitario, 24 anni",
    text: "Le lezioni sono intense ma mai noiose. Ogni volta impari qualcosa di nuovo. L'ambiente è serio ma anche molto camaraderie tra gli allievi.",
    rating: 5,
  },
];

export function Testimonianze() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(".section-header", { opacity: 1, y: 0 });
        return;
      }

      // Header animation
      gsap.fromTo(
        ".section-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Infinite scroll animation
      const track = trackRef.current;
      if (track) {
        const totalWidth = track.scrollWidth / 2;
        const viewportWidth = window.innerWidth;

        gsap.to(track, {
          x: -(totalWidth - viewportWidth / 2),
          ease: "none",
          duration: 40,
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => {
              const mod = totalWidth;
              return parseFloat(x) % mod;
            }),
          },
        });
      }

      // Pause on hover
      if (sliderRef.current) {
        sliderRef.current.addEventListener("mouseenter", () => {
          gsap.globalTimeline.pause();
        });
        sliderRef.current.addEventListener("mouseleave", () => {
          gsap.globalTimeline.play();
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#0C0C0C] overflow-hidden">
      <div className="container-wide mb-12">
        <div className="section-header text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#FF3D00] mb-4 block">
            Testimonianze
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1]">
            CHI LO PRATICA
            <br />
            <span className="text-[#FF3D00]">PARLA</span>
          </h2>
        </div>
      </div>

      {/* Slider */}
      <div ref={sliderRef} className="relative cursor-grab active:cursor-grabbing">
        <div ref={trackRef} className="testimonial-track flex gap-6" style={{ width: "max-content" }}>
          {/* Double the testimonials for infinite effect */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card flex-shrink-0 w-[350px] md:w-[400px] bg-[#181818] p-8 border border-[#2A2A2A] hover:border-[#FF3D00] transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#FF3D00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#888] mb-6 leading-relaxed">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#222] flex items-center justify-center border border-[#2A2A2A]">
                  <span className="font-display text-lg text-[#FF3D00]">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-[#666]">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0C0C0C] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0C0C0C] to-transparent pointer-events-none" />
      </div>

      {/* Google badge */}
      <div className="container-wide mt-12">
        <div className="flex items-center justify-center gap-4 text-sm text-[#888]">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Valutazione 4.9 su Google</span>
          <span className="text-[#FF3D00]">•</span>
          <span>Basata su 47 recensioni</span>
        </div>
      </div>
    </section>
  );
}
