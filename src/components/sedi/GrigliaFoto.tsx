"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface GrigliaFotoProps {
  foto: string[];
  onImageClick: (index: number) => void;
}

export function GrigliaFoto({ foto, onImageClick }: GrigliaFotoProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Batch animation for grid items
      ScrollTrigger.batch(".gallery-item", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            {
              clipPath: "inset(100% 0 0 0)",
              opacity: 0,
            },
            {
              clipPath: "inset(0% 0 0 0)",
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            }
          );
        },
        start: "top 85%",
        once: true,
      });
    },
    { scope: gridRef }
  );

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {foto.map((src, i) => (
        <div
          key={i}
          className={cn(
            "gallery-item relative aspect-square rounded-xl overflow-hidden cursor-pointer group",
            i === 0 && "md:col-span-2 md:row-span-2",
            i === 3 && "md:col-span-2"
          )}
          onClick={() => onImageClick(i)}
        >
          <Image
            src={src}
            alt={`Galleria foto ${i + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
        </div>
      ))}
    </div>
  );
}
