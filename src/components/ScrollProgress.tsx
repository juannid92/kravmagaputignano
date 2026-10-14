"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 8;

  useEffect(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionNum = parseInt(entry.target.getAttribute("data-section") || "1");
            setCurrentSection(sectionNum);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] bg-surface">
        <div
          ref={progressRef}
          className="h-full bg-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Section counter */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[9999] hidden lg:flex flex-col items-center gap-3">
        <span className="text-[10px] tracking-[0.3em] text-foregroundMuted font-body uppercase">
          Scroll
        </span>
        <div className="flex flex-col items-center gap-1">
          {Array.from({ length: totalSections }, (_, i) => i + 1).map((num) => (
            <div
              key={num}
              className={`relative w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                currentSection === num ? "opacity-100" : "opacity-30"
              }`}
            >
              <span
                className={`text-xs font-display transition-colors duration-300 ${
                  currentSection === num ? "text-accent" : "text-foregroundMuted"
                }`}
              >
                {String(num).padStart(2, "0")}
              </span>
              {currentSection === num && (
                <span className="absolute w-1 h-1 bg-accent rounded-full" />
              )}
            </div>
          ))}
        </div>
        <span className="text-[10px] tracking-[0.2em] text-foregroundMuted font-body">
          {String(currentSection).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
        </span>
      </div>
    </>
  );
}
