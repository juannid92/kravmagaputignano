"use client";

// Helper per il parity mobile/desktop nelle sezioni "scroll story".
// Refresh di tutti gli ScrollTrigger su:
//  - resize finestra (orientation, browser zoom)
//  - visualViewport resize (address-bar mobile che si ritrae, soft-keyboard)
//  - fine font-load (layout shift)
//
// Da importare lato client una volta sola nel componente che monta le sezioni pin.

import { useEffect } from "react";

export function useScrollTriggerRefresh() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Lazy-import gsap per evitare problemi con SSR.
        import("@/lib/gsap-config").then(({ ScrollTrigger }) => {
          if (ScrollTrigger) ScrollTrigger.refresh();
        });
      });
    };

    window.addEventListener("resize", refresh, { passive: true });
    window.addEventListener("orientationchange", refresh, { passive: true });
    window.addEventListener("load", refresh, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", refresh);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
      window.removeEventListener("load", refresh);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", refresh);
      }
      cancelAnimationFrame(raf);
    };
  }, []);
}
