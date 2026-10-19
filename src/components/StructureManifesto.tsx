"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import styles from "./StructureManifesto.module.css";

export function StructureManifesto() {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Transform-only motion: no pin, no spacer, no layout-height mutations.
      gsap.fromTo(root.querySelector("[data-manifesto-photo]"),
        { yPercent: 5, scale: 1.12 },
        { yPercent: -5, scale: 1.12, ease: "none", scrollTrigger: {
          trigger: root, start: "top bottom", end: "bottom top", scrub: 0.7,
        } });
      gsap.fromTo(root.querySelector("[data-manifesto-word]"),
        { xPercent: -2 }, { xPercent: 2, ease: "none", scrollTrigger: {
          trigger: root, start: "top bottom", end: "bottom top", scrub: 0.7,
        } });
      root.querySelectorAll("[data-manifesto-copy]").forEach(item => {
        gsap.fromTo(item, { opacity: 0.3, y: 24 }, { opacity: 1, y: 0,
          duration: 0.7, ease: "power2.out", scrollTrigger: {
            trigger: item, start: "top 92%", toggleActions: "play none none reverse",
          } });
      });
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.manifesto} data-testid="structure" aria-labelledby="structure-title">
      <div className={styles.photoWindow} aria-hidden="true">
        <div className={styles.photo} data-manifesto-photo>
          <Image
            src="/images/hero-istruttori.jpg"
            alt="La nostra palestra e team istruttori" fill sizes="(max-width: 767px) 100vw, 68vw"
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.slash} aria-hidden="true" />
      <header className={styles.meta}>
        <span>La nostra struttura</span>
        <span>Putignano / Conversano</span>
      </header>
      <h2 id="structure-title" className={styles.title}>
        <span>Passione</span>
        <span className={styles.secondLine} data-manifesto-word>e dedizione</span>
      </h2>
      <div className={styles.copy}>
        {[
          {title: "Palestruttura", text: "Attrezzature professionali per l'allenamento funzionale e il combattimento. Spazi dedicati per ogni tipo di esercitazione."},
          {title: "Istruttori", text: "Maestri certificati WKMF (SD Global Defender) con anni di esperienza nel Krav Maga e nelle arti marziali. Formazione continua e aggiornamento."},
          {title: "Sicurezza", text: "Protocolli di sicurezza rigorosi per ogni allenamento. Protezioni adeguate e supervisione costante durante le esercitazioni."},
        ].map(item => (
          <div key={item.title} className={styles.statement} data-testid="structure-feature" data-manifesto-copy>
            <h3>{item.title}</h3><p>{item.text}</p>
          </div>
        ))}
      </div>
      <dl className={styles.mainStat}>
        <dt>Studenti attivi</dt><dd>200<span>+</span></dd>
      </dl>
      <dl className={styles.credits}>
        <div><dt>Anni di esperienza</dt><dd>19+</dd></div>
        <div><dt>Sedi operative</dt><dd>2</dd></div>
        <div><dt>Lezioni tenute</dt><dd>500+</dd></div>
      </dl>
    </section>
  );
}
