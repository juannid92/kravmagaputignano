"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const kravGalleryImages = [
  { src: "https://images.pexels.com/photos/7045757/pexels-photo-7045757.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { src: "https://images.pexels.com/photos/6455245/pexels-photo-6455245.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { src: "https://images.pexels.com/photos/7045661/pexels-photo-7045661.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { src: "https://images.pexels.com/photos/6295757/pexels-photo-6295757.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { src: "https://images.pexels.com/photos/6295767/pexels-photo-6295767.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { src: "https://images.pexels.com/photos/6296035/pexels-photo-6296035.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

export function GalleriaHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!trackRef.current || !sectionRef.current || !stickyRef.current) return;

        const track = trackRef.current;
        const getDistance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getDistance() + 200}`,
            scrub: 1.5,
            pin: stickyRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: scroll nativo
        gsap.utils.toArray(".gallery-img-wrap").forEach((item: any, i: number) => {
          gsap.fromTo(
            item,
            { opacity: 0.5, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex items-center overflow-hidden bg-background"
      >
        {/* Title */}
        <div className="absolute top-12 left-8 z-20 hidden md:block">
          <span className="text-accent font-body text-xs tracking-[0.3em] uppercase mb-2 block">
            Galleria
          </span>
          <h2 className="font-display text-4xl text-foreground">
            I NOSTRI ALLENAMENTI
          </h2>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className={cn(
            "flex items-center",
            "pl-[15vw]",
            "gap-4 md:gap-6"
          )}
          style={{ willChange: "transform" }}
        >
          {kravGalleryImages.map((img, i) => (
            <div
              key={i}
              className={cn(
                "gallery-img-wrap flex-shrink-0 rounded-lg overflow-hidden",
                "w-[50vw] md:w-[20vw]",
                "aspect-[3/4]",
                "h-auto"
              )}
            >
              <Image
                src={img.src}
                alt={`Allenamento Krav Maga ${i + 1}`}
                fill
                className="object-cover"
                quality={80}
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
          ))}
        </div>

        {/* Scroll hint mobile */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/40 text-xs font-body uppercase tracking-widest md:hidden">
          ← Scorri →
        </div>
      </div>
    </section>
  );
}
