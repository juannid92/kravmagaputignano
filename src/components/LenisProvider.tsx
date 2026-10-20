"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { getGsap } from "@/lib/gsap-config";
import { usePathname } from "next/navigation";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    let cancelled = false;
    let gsapTicker: { add: (fn: (time: number) => void) => void; remove: (fn: (time: number) => void) => void } | null = null;

    // `html { scroll-behavior: smooth }` (globals.css) anima ogni scrollTo nativo:
    // ScrollTrigger lo usa durante i refresh/pin e Lenis lo usa per ogni frame,
    // quindi la pagina "rimbalza" su e giu. Lo forziamo ad auto (vale anche su touch).
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    (async () => {
      const bundle = await getGsap();
      if (cancelled || !bundle) return;

      // Keep touch scrolling native; ScrollTrigger works on both paths.
      const isMobile = window.matchMedia("(pointer: coarse)").matches;
      if (
        isMobile ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const { gsap } = bundle;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      lenisRef.current = lenis;

      lenis.on("scroll", bundle.ScrollTrigger.update);

      const tick = (time: number) => lenis!.raf(time * 1000);
      tickerFn = tick;
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      gsapTicker = gsap.ticker;
    })();

    return () => {
      cancelled = true;
      root.style.scrollBehavior = previousScrollBehavior;
      if (gsapTicker && tickerFn) {
        gsapTicker.remove(tickerFn);
      }
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Handle pathname changes - reset Lenis and refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      // Reset Lenis to top
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Small delay to ensure DOM is painted
    const id = requestAnimationFrame(async () => {
      const bundle = await getGsap();
      if (bundle) bundle.ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, [pathname]);

  return <>{children}</>;
}
