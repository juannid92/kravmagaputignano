"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FloatingElementProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  rotation?: number;
}

export function FloatingElement({
  className = "",
  children,
  delay = 0,
  duration = 3,
  y = 15,
  rotation = 5,
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.to(element, {
      y: -y,
      rotation: rotation,
      duration,
      delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      gsap.killTweensOf(element);
    };
  }, [delay, duration, y, rotation]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Decorative grid pattern
export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 opacity-[0.03] pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, #FF3D00 1px, transparent 1px),
          linear-gradient(to bottom, #FF3D00 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

// Noise texture overlay
export function NoiseOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.5,
      }}
    />
  );
}

// Animated gradient orbs
export function GradientOrbs({ className = "" }: { className?: string }) {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    // Animate orbs
    if (orb1Ref.current) {
      gsap.to(orb1Ref.current, {
        x: 100,
        y: 50,
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (orb2Ref.current) {
      gsap.to(orb2Ref.current, {
        x: -80,
        y: -60,
        scale: 0.8,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        ref={orb1Ref}
        className="absolute w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #FF3D00 0%, transparent 70%)",
          filter: "blur(100px)",
          left: "-20%",
          top: "20%",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #FF3D00 0%, transparent 70%)",
          filter: "blur(80px)",
          right: "-10%",
          bottom: "10%",
        }}
      />
    </div>
  );
}
