"use client";

// Refresh di ScrollTrigger SOLO quando serve davvero, e UNA volta sola.
//
// Prima: ogni componente con pin (NonSport, GalleriaHome) registrava i propri
// listener su resize / visualViewport / orientationchange / load / fonts, e ognuno
// chiamava ScrollTrigger.refresh() subito. Durante lo scroll la barra del browser
// (mobile) o piccoli cambi di altezza facevano scattare il refresh, che ricalcola
// i pin e riporta la pagina su e giu -> scatti.
//
// Ora:
//  - listener registrati una sola volta, anche se l'hook e usato da piu componenti
//  - il resize fa refresh solo se cambia la LARGHEZZA (non l'altezza: barra indirizzi)
//  - nessun listener su visualViewport
//  - refresh con debounce (250ms) cosi font/load/resize ravvicinati diventano uno solo

import { useEffect } from "react";

let subscribers = 0;
let teardown: (() => void) | null = null;

function setup(): () => void {
  let active = true;
  let timer: number | undefined;
  let lastWidth = window.innerWidth;

  const run = () => {
    if (!active) return;
    import("@/lib/gsap-config").then(({ ScrollTrigger }) => {
      if (active && ScrollTrigger) ScrollTrigger.refresh();
    });
  };

  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, 250);
  };

  const onResize = () => {
    const width = window.innerWidth;
    if (width === lastWidth) return; // solo altezza (barra indirizzi): ignora
    lastWidth = width;
    schedule();
  };

  const onOrientation = () => {
    lastWidth = window.innerWidth;
    schedule();
  };

  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onOrientation, { passive: true });
  window.addEventListener("load", schedule, { passive: true });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(schedule).catch(() => {});
  }

  return () => {
    active = false;
    window.clearTimeout(timer);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onOrientation);
    window.removeEventListener("load", schedule);
  };
}

export function useScrollTriggerRefresh() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (subscribers === 0) teardown = setup();
    subscribers += 1;
    return () => {
      subscribers -= 1;
      if (subscribers === 0 && teardown) {
        teardown();
        teardown = null;
      }
    };
  }, []);
}
