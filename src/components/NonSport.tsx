"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

const concepts = [
  { number: "01", title: "NESSUNA REGOLA", description: "Il Krav Maga non ha arbitri, categorie di peso o tempi regolamentari. Si impara a rispondere a qualsiasi minaccia, in qualsiasi situazione." },
  { number: "02", title: "ISTINTO PRIMA DI TECNICA", description: "Non c'è tempo per pensare. Gli allenamenti trasformano le reazioni naturali in risposte automatiche, così il corpo reagisce prima della mente." },
  { number: "03", title: "SITUAZIONI REALI", description: "Ogni esercitazione parte da scenari realistici: aggressioni, prese, cadute, attacchi multipli. Nessun kata — solo preparazione concreta." },
];

export function NonSport() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    // One controller on every screen size. Reduced motion uses normal flow.
    mm.add("(prefers-reduced-motion: reduce)", () => { setReducedMotion(true); }, section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      setReducedMotion(false);
      const update = (self: ScrollTrigger) => {
        const index = Math.min(concepts.length - 1, Math.floor(self.progress * concepts.length));
        setActiveIndex((current) => current === index ? current : index);
      };
      ScrollTrigger.create({
        id: "nonsport-sequence",
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(section.clientHeight * 2, 900)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: update,
        onRefresh: update,
      });
    }, section);
    return () => mm.revert(); // Never kill triggers owned by other sections.
  }, []);

  // Animate panel swap: exit (out 280ms, slide -30px) + entrance (in 400ms, slide +30px)
  useEffect(() => {
    if (reducedMotion) return;
    const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
    if (panels.length === 0) return;

    if (isFirstRender.current) {
      // First mount: snap active to its target state without animating from a hidden state.
      isFirstRender.current = false;
      panels.forEach((el, i) => {
        gsap.set(el, { opacity: i === activeIndex ? 1 : 0, y: i === activeIndex ? 0 : 30 });
      });
      return;
    }

    panels.forEach((el, i) => {
      if (i === activeIndex) {
        // Incoming panel: from below, decelerate (motion-design: entrance = ease-out)
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, visibility: "visible" },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: true }
        );
      } else {
        // Outgoing panel: upward, accelerate (motion-design: exit = ease-in)
        gsap.to(el, {
          opacity: 0,
          y: -30,
          duration: 0.28,
          ease: "power2.in",
          overwrite: true,
          onComplete: () => {
            // Restore CSS-driven hidden state after the slide-out finishes
            if (i !== activeIndex) gsap.set(el, { visibility: "hidden" });
          },
        });
      }
    });
  }, [activeIndex, reducedMotion]);

  return (
    <section ref={sectionRef} data-section="2" data-testid="nonsport" className="nonsport-section relative bg-[#0A0A0A]">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(204,0,0,.18), transparent 65%)" }} />
      <div className="absolute left-[8%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[#CC0000]/15 to-transparent" />
      <div className="absolute right-[8%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[#CC0000]/15 to-transparent" />
      <div className="nonsport-stage relative mx-auto w-full max-w-4xl">
        <header className="nonsport-heading text-center">
          <span className="text-[#D4AF37] font-display text-[10px] tracking-[0.4em] uppercase block mb-1">LA FILOSOFIA</span>
          <h2 className="font-stencil text-sm text-white/60 tracking-[0.3em]">NON È UNO SPORT</h2>
        </header>
        <div className="nonsport-panels">
          {concepts.map((concept, i) => (
            <article
              key={concept.number}
              ref={(el) => { panelRefs.current[i] = el; }}
              data-testid={`concept-${concept.number}`}
              data-active={activeIndex === i}
              aria-hidden={!reducedMotion && activeIndex !== i}
              className="concept-item nonsport-panel"
            >
              <div className="nonsport-card relative w-full bg-gradient-to-b from-[#131318] to-[#0A0A0A] border border-[#CC0000]/30 shadow-[0_0_80px_rgba(204,0,0,0.15)]">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CC0000]" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#CC0000]" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#CC0000]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CC0000]" />
                <span className="nonsport-number font-stencil text-[#CC0000] block leading-none" style={{ textShadow: "0 0 60px rgba(204,0,0,.6), 0 0 120px rgba(204,0,0,.4)" }}>{concept.number}</span>
                <h3 className="nonsport-title font-stencil text-white tracking-wider">{concept.title}</h3>
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
                <p className="nonsport-description text-white/80 max-w-xl mx-auto">{concept.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="nonsport-indicators flex justify-center items-center gap-3" aria-label={`Concetto ${activeIndex + 1} di 3`}>
          {concepts.map((concept, i) => <span key={concept.number} className={`w-2.5 h-2.5 rounded-full transition-colors ${activeIndex === i ? "bg-[#CC0000] shadow-[0_0_15px_rgba(204,0,0,.8)]" : "bg-white/30"}`} />)}
        </div>
        <span className="nonsport-scroll text-center text-white/40 text-[10px] uppercase tracking-[.2em]">Scorri</span>
      </div>
    </section>
  );
}
