"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Keep touch scrolling native; ScrollTrigger works on both paths.
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    // Integrate Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle pathname changes - reset Lenis and refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      // Reset Lenis to top
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Small delay to ensure DOM is painted
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, [pathname]);

  return <>{children}</>;
}
