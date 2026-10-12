"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Magnetic button effect
export const magneticButton = (
  element: HTMLElement,
  strength: number = 0.3
) => {
  if (prefersReducedMotion()) return;

  const bounds = element.getBoundingClientRect();

  const moveElement = (x: number, y: number) => {
    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const resetElement = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  element.addEventListener("mousemove", (e) => {
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;
    moveElement(x, y);
  });

  element.addEventListener("mouseleave", resetElement);
};

// Text mask reveal animation
export const textReveal = (
  element: HTMLElement,
  options: { delay?: number; duration?: number; y?: number } = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1 });
    return;
  }

  const { delay = 0, duration = 1, y = 100 } = options;

  gsap.fromTo(
    element,
    {
      clipPath: "inset(0 100% 0 0)",
      y: y,
    },
    {
      clipPath: "inset(0 0% 0 0)",
      y: 0,
      duration,
      delay,
      ease: "power3.out",
    }
  );
};

// Stagger children animation
export const staggerReveal = (
  elements: HTMLElement[] | NodeListOf<Element>,
  options: { delay?: number; stagger?: number; y?: number } = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  const { delay = 0, stagger = 0.1, y = 30 } = options;

  gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      delay,
      ease: "power3.out",
    }
  );
};

// Parallax on scroll
export const parallaxScroll = (
  element: HTMLElement,
  options: { speed?: number; direction?: "up" | "down" } = {}
) => {
  if (prefersReducedMotion()) return;

  const { speed = 0.5, direction = "up" } = options;
  const yPercent = direction === "up" ? -speed * 100 : speed * 100;

  gsap.to(element, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

// Image reveal with clip-path
export const imageReveal = (
  element: HTMLElement,
  options: { delay?: number; direction?: "left" | "right" | "top" | "bottom" } = {}
) => {
  if (prefersReducedMotion()) return;

  const { delay = 0, direction = "left" } = options;

  let clipPath: string;
  switch (direction) {
    case "right":
      clipPath = "inset(0 100% 0 0)";
      break;
    case "left":
      clipPath = "inset(0 0 0 100%)";
      break;
    case "top":
      clipPath = "inset(100% 0 0 0)";
      break;
    case "bottom":
      clipPath = "inset(0 0 100% 0)";
      break;
  }

  gsap.fromTo(
    element,
    { clipPath, opacity: 0 },
    {
      clipPath: "inset(0 0 0 0)",
      opacity: 1,
      duration: 1.2,
      delay,
      ease: "power4.out",
    }
  );
};

// Floating animation for decorative elements
export const floatingAnimation = (
  element: HTMLElement,
  options: { y?: number; duration?: number; delay?: number } = {}
) => {
  if (prefersReducedMotion()) return;

  const { y = 10, duration = 2, delay = 0 } = options;

  gsap.to(element, {
    y: -y,
    duration,
    delay,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
};

// Scale on hover
export const scaleOnHover = (element: HTMLElement, scale: number = 1.05) => {
  element.addEventListener("mouseenter", () => {
    gsap.to(element, {
      scale,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  });
};

// Horizontal scroll section
export const horizontalScroll = (
  container: HTMLElement,
  sections: HTMLElement[]
) => {
  if (prefersReducedMotion()) return;

  const totalWidth = sections.reduce(
    (acc, section) => acc + section.offsetWidth,
    0
  );

  gsap.to(sections, {
    x: () => -(totalWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${totalWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });
};

// Clean up all ScrollTriggers
export const cleanupScrollTrigger = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
