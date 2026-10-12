"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export function PageLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if already loaded (for page transitions)
    const alreadyLoaded = sessionStorage.getItem("pageLoaded");

    if (alreadyLoaded) {
      setIsLoaded(true);
      return;
    }

    const loader = document.getElementById("page-loader");
    if (!loader) return;

    // Animate loader out
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true);
        sessionStorage.setItem("pageLoaded", "true");
      },
    });

    tl.to(loader, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.8,
      delay: 0.5,
      ease: "power4.inOut",
    });
  }, []);

  if (isLoaded) return null;

  return (
    <div
      id="page-loader"
      className="fixed inset-0 z-[9999] bg-[#0C0C0C] flex items-center justify-center"
    >
      <div className="text-center">
        <div className="font-display text-4xl text-white mb-4">
          KRAV<span className="text-[#FF3D00]">MAGA</span>
        </div>
        <div className="w-48 h-px bg-[#2A2A2A] overflow-hidden">
          <div className="h-full bg-[#FF3D00] loader-bar" />
        </div>
      </div>
    </div>
  );
}
