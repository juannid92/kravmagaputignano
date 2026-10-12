"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/gsap-config";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  foto: string[];
  initialIndex: number;
}

export function Lightbox({ isOpen, onClose, foto, initialIndex }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Sync with initialIndex when it changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Animate open/close
  useEffect(() => {
    if (isOpen) {
      // Open animation
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < foto.length - 1 ? prev + 1 : 0));
  }, [foto.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : foto.length - 1));
  }, [foto.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goNext, goPrev]);

  // Stop body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galleria fotografica"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Chiudi galleria"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-body z-10">
        {currentIndex + 1} / {foto.length}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Immagine precedente"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        aria-label="Immagine successiva"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      {/* Image */}
      <div
        ref={imageRef}
        className="relative w-full h-full max-w-[90vw] max-h-[90vh] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={foto[currentIndex]}
          alt={`Galleria foto ${currentIndex + 1}`}
          fill
          className="object-contain"
          quality={100}
          key={currentIndex} // Force re-render for animation
        />
      </div>
    </div>
  );
}
