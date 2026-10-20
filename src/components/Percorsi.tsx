"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Shield, Zap, Users, Heart, Eye, Target, Star, Award } from "lucide-react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { FilmPass } from "three/addons/postprocessing/FilmPass.js";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const percorsiImages = {
  adulti: "/images/adulti-gruppo.jpg",
  bambini: "/images/kids-diplomi.jpg",
};

const percorsiVideos = {
  adulti: "/videos/corsi-adulti.mp4",
  bambini: "/videos/corsi-kids.mp4",
};

type TabKey = "adulti" | "bambini";

// Color matrix shader: shifts hue/saturation/contrast/brightness, then tints toward an accent color.
const ColorMatrixShader = {
  uniforms: {
    tDiffuse: { value: null },
    brightness: { value: 0.0 },
    contrast: { value: 0.0 },
    saturation: { value: 1.0 },
    tint: { value: new THREE.Vector3(1, 1, 1) },
    tintAmount: { value: 0.0 },
    duotoneDark: { value: new THREE.Vector3(0, 0, 0) },
    duotoneLight: { value: new THREE.Vector3(1, 1, 1) },
    duotoneAmount: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float brightness;
    uniform float contrast;
    uniform float saturation;
    uniform vec3 tint;
    uniform float tintAmount;
    uniform vec3 duotoneDark;
    uniform vec3 duotoneLight;
    uniform float duotoneAmount;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);

      // Brightness + contrast
      color.rgb = (color.rgb - 0.5) * (1.0 + contrast) + 0.5 + brightness;

      // Saturation
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb = mix(vec3(gray), color.rgb, saturation);

      // Tint (multiply blend toward target)
      color.rgb = mix(color.rgb, color.rgb * tint, tintAmount);

      // Duotone: remap luminance from dark to light
      float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      vec3 duotone = mix(duotoneDark, duotoneLight, smoothstep(0.0, 1.0, luma));
      color.rgb = mix(color.rgb, color.rgb * duotone, duotoneAmount);

      gl_FragColor = color;
    }
  `,
};

// Subtle scanline shader (lighter than the cinematic one in VideoShowcase)
const ScanlineShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    strength: { value: 0.04 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float strength;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      // Soft horizontal scanlines
      float scanline = sin((vUv.y + time * 0.05) * 320.0) * strength;
      // Subtle vertical drift band
      float band = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
      color.rgb -= scanline * band;
      gl_FragColor = color;
    }
  `,
};

type Palette = {
  // Three.js shader uniforms for the photo
  colorMatrix: {
    brightness: number;
    contrast: number;
    saturation: number;
    tint: [number, number, number];
    tintAmount: number;
    duotoneDark: [number, number, number];
    duotoneLight: [number, number, number];
    duotoneAmount: number;
  };
  bloom: { strength: number; radius: number; threshold: number };
  chromatic: number;
  film: number;
  vignette: { darkness: number; offset: number };
  scanline: number;
  // UI tokens
  accent: string;        // primary accent (e.g. red for adulti, green for kids)
  accentBright: string;  // brighter variant for glow
  accentSoft: string;    // 20% tint
  accentBorder: string;  // border at 30%
  label: string;
  // Gradient text for the big title
  titleGradient: string;
  // CTA button classes
  cta: string;
  ctaHover: string;
  ctaShadow: string;
  ctaShadowHover: string;
  // Overlay gradient
  overlayGradient: string;
  // Image side (left or right)
  imageSide: "left" | "right";
};

const PALETTES: Record<TabKey, Palette> = {
  adulti: {
    colorMatrix: {
      brightness: -0.04,
      contrast: 0.18,
      saturation: 0.85,
      tint: [1.18, 0.7, 0.55],
      tintAmount: 0.45,
      duotoneDark: [0.06, 0.02, 0.02],
      duotoneLight: [1.0, 0.55, 0.35],
      duotoneAmount: 0.5,
    },
    bloom: { strength: 0.5, radius: 0.55, threshold: 0.65 },
    chromatic: 0.0025,
    film: 0.18,
    vignette: { darkness: 0.55, offset: 1.0 },
    scanline: 0.05,
    accent: "#FF3D00",
    accentBright: "#FF6B00",
    accentSoft: "rgba(255, 61, 0, 0.18)",
    accentBorder: "rgba(255, 61, 0, 0.35)",
    label: "Istruttori certificati",
    titleGradient: "from-white via-white to-[#FF3D00]",
    cta: "bg-[#FF3D00] text-white border-2 border-[#FF3D00]",
    ctaHover: "hover:bg-[#FF5520] hover:border-[#FF5520]",
    ctaShadow: "shadow-[0_0_30px_rgba(255,61,0,0.4)]",
    ctaShadowHover: "hover:shadow-[0_0_50px_rgba(255,61,0,0.65)]",
    overlayGradient: "from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent",
    imageSide: "left",
  },
  bambini: {
    colorMatrix: {
      brightness: 0.06,
      contrast: 0.12,
      saturation: 1.1,
      tint: [0.6, 1.25, 0.7],
      tintAmount: 0.5,
      duotoneDark: [0.04, 0.12, 0.06],
      duotoneLight: [0.75, 1.15, 0.85],
      duotoneAmount: 0.55,
    },
    bloom: { strength: 0.55, radius: 0.65, threshold: 0.6 },
    chromatic: 0.0018,
    film: 0.14,
    vignette: { darkness: 0.4, offset: 1.05 },
    scanline: 0.035,
    accent: "#16B863",
    accentBright: "#22E27E",
    accentSoft: "rgba(22, 184, 99, 0.2)",
    accentBorder: "rgba(22, 184, 99, 0.45)",
    label: "Ambiente protetto e gioioso",
    titleGradient: "from-white via-white to-[#22E27E]",
    cta: "bg-[#16B863] text-[#0A0A0A] border-2 border-[#16B863]",
    ctaHover: "hover:bg-[#22E27E] hover:border-[#22E27E]",
    ctaShadow: "shadow-[0_0_30px_rgba(22,184,99,0.45)]",
    ctaShadowHover: "hover:shadow-[0_0_50px_rgba(22,184,99,0.7)]",
    overlayGradient: "from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent",
    imageSide: "right",
  },
};

function PhotoCanvas({ imageSrc, palette }: { imageSrc: string; palette: Palette }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const animationRef = useRef<number | null>(null);
  const inViewRef = useRef(true);
  const lastTickRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        palette.bloom.strength,
        palette.bloom.radius,
        palette.bloom.threshold
      );
      composer.addPass(bloomPass);

      // Color matrix pass — gives each tab its distinct look
      const colorMatrixPass = new ShaderPass(ColorMatrixShader);
      const cm = palette.colorMatrix;
      colorMatrixPass.uniforms["brightness"].value = cm.brightness;
      colorMatrixPass.uniforms["contrast"].value = cm.contrast;
      colorMatrixPass.uniforms["saturation"].value = cm.saturation;
      colorMatrixPass.uniforms["tint"].value = new THREE.Vector3(...cm.tint);
      colorMatrixPass.uniforms["tintAmount"].value = cm.tintAmount;
      colorMatrixPass.uniforms["duotoneDark"].value = new THREE.Vector3(...cm.duotoneDark);
      colorMatrixPass.uniforms["duotoneLight"].value = new THREE.Vector3(...cm.duotoneLight);
      colorMatrixPass.uniforms["duotoneAmount"].value = cm.duotoneAmount;
      composer.addPass(colorMatrixPass);

      // Scanlines
      const scanlinePass = new ShaderPass(ScanlineShader);
      scanlinePass.uniforms["strength"].value = palette.scanline;
      composer.addPass(scanlinePass);

      // Film grain
      const filmPass = new FilmPass(palette.film, false);
      composer.addPass(filmPass);

      // Vignette
      const vignetteShader = {
        uniforms: {
          tDiffuse: { value: null },
          offset: { value: palette.vignette.offset },
          darkness: { value: palette.vignette.darkness },
        },
        vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform float offset;
          uniform float darkness;
          varying vec2 vUv;
          void main(){
            vec4 c = texture2D(tDiffuse, vUv);
            float d = distance(vUv, vec2(0.5));
            // Soft cinematic vignette: only the outermost ~12% fades.
            float v = smoothstep(0.55, 0.95, d * mix(0.9, 1.15, darkness));
            c.rgb *= mix(1.0, 0.55, v);
            gl_FragColor = c;
          }
        `,
      };
      composer.addPass(new ShaderPass(vignetteShader));

      composer.addPass(new ShaderPass(GammaCorrectionShader));

      composerRef.current = composer;

      const clock = new THREE.Clock();
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        if (!inViewRef.current) return;
        const now = performance.now();
        // Cap to ~30 fps when out of view-front
        if (now - lastTickRef.current < 33) return;
        lastTickRef.current = now;
        scanlinePass.uniforms["time"].value = clock.getElapsedTime();
        composer.render();
      };
      animate();
    });

    const handleResize = () => {
      if (!container || !renderer || !composerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      composerRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Pause rendering when off-screen
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) inViewRef.current = entry.isIntersecting;
        },
        { rootMargin: "200px" }
      );
      observer.observe(container);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      observer?.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (composerRef.current) composerRef.current.dispose();
      renderer.dispose();
    };
  }, [imageSrc, palette]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

const adultiContent = {
  title: "ADULTI",
  age: "DAI 13 ANNI IN SU",
  description:
    "Un percorso costruito su situazioni reali. Impari a riconoscere il pericolo, a reagire sotto pressione, a proteggere ciò che conta. Nessuna coreografia, nessun trofeo — solo strumenti che funzionano.",
  features: [
    { text: "Difesa da prese, strangolamenti e aggressioni", Icon: Shield },
    { text: "Gestione di attacchi multipli e disarmati", Icon: Users },
    { text: "Oggetti comuni come strumenti di difesa", Icon: Zap },
    { text: "Controllo dello stress in contesti reali", Icon: Heart },
  ],
};

const bambiniContent = {
  title: "KIDS",
  age: "DAI 6 AI 12 ANNI",
  description:
    "Consapevolezza, fiducia, rispetto. Attraverso il gioco, i più piccoli imparano a riconoscere le situazioni di rischio, a fidarsi del proprio istinto, a lavorare in gruppo. Nessuna pressione, solo crescita.",
  features: [
    { text: "Riconoscimento e prevenzione del pericolo", Icon: Eye },
    { text: "Tecniche calibrate sull'età", Icon: Target },
    { text: "Costruzione della fiducia in sé", Icon: Star },
    { text: "Rispetto, disciplina e spirito di gruppo", Icon: Award },
  ],
};

export function Percorsi() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("adulti");
  const contentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const glitchLineRef = useRef<HTMLDivElement>(null);
  const content = activeTab === "adulti" ? adultiContent : bambiniContent;
  const palette = PALETTES[activeTab];
  const isReversed = palette.imageSide === "right";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".percorso-header > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        ".toggle-container",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".toggle-container", start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        ".percorso-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".percorso-card", start: "top 70%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        ".feature-item",
        { opacity: 0, x: isReversed ? 30 : -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".features-list", start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isReversed]);

  const handleTabSwitch = useCallback(
    (tab: TabKey) => {
      if (tab === activeTab) return;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Glitch sweep on switch
      if (glitchLineRef.current && !prefersReducedMotion) {
        gsap.fromTo(
          glitchLineRef.current,
          { scaleX: 0, opacity: 1 },
          {
            scaleX: 1,
            duration: 0.1,
            ease: "none",
            onComplete: () => {
              gsap.to(glitchLineRef.current, { opacity: 0, duration: 0.2 });
            },
          }
        );
      }

      // Image punch + reset
      if (imageContainerRef.current && !prefersReducedMotion) {
        gsap.to(imageContainerRef.current, {
          scale: 1.04,
          duration: 0.15,
          ease: "power2.in",
          onComplete: () => {
            setActiveTab(tab);
            gsap.to(imageContainerRef.current, { scale: 1, duration: 0.45, ease: "power3.out" });
          },
        });
      } else {
        setActiveTab(tab);
      }

      // Content fade
      const contentEl = contentRef.current?.querySelector(".percorso-content") as HTMLElement | null;
      if (!contentEl) return;
      if (prefersReducedMotion) {
        setActiveTab(tab);
        return;
      }

      gsap.to(contentEl, {
        opacity: 0,
        y: -16,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(tab);
          gsap.fromTo(
            contentEl,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
          );
        },
      });
    },
    [activeTab]
  );

  return (
    <section
      id="percorsi"
      data-section="5"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Background accent glow that follows the active palette */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[55%] opacity-25 pointer-events-none transition-[background] duration-700"
        style={{
          background: `radial-gradient(ellipse at center top, ${palette.accent}55 0%, transparent 70%)`,
        }}
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full animate-grid"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glitch line overlay */}
      <div
        ref={glitchLineRef}
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          transform: "scaleX(0)",
          transformOrigin: "left",
          background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="percorso-header text-center mb-12">
          <span
            className="font-body text-xs tracking-[0.4em] uppercase block mb-4 transition-colors duration-500"
            style={{ color: palette.accent }}
          >
            I Percorsi
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            SCEGLI IL TUO PERCORSO
          </h2>
          <p className="text-white/50 text-base font-body max-w-md mx-auto">
            Due strade, una sola disciplina
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="toggle-container relative flex justify-center mb-14">
          <div
            className="relative inline-flex bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] p-1.5 rounded-full border transition-colors duration-500"
            style={{ borderColor: palette.accentBorder, boxShadow: `0 0 30px ${palette.accentSoft}` }}
          >
            <div
              className="tab-indicator absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                left: activeTab === "adulti" ? "4px" : "calc(50% + 2px)",
                background: `linear-gradient(90deg, ${palette.accent}, ${palette.accentBright})`,
                boxShadow: `0 0 20px ${palette.accentSoft}`,
              }}
            />
            <button
              onClick={() => handleTabSwitch("adulti")}
              aria-pressed={activeTab === "adulti"}
              className={`relative z-10 px-10 py-3.5 font-display text-sm tracking-wider transition-colors duration-300 rounded-full ${
                activeTab === "adulti" ? "text-white" : "text-white/55 hover:text-white/80"
              }`}
            >
              ADULTI
            </button>
            <button
              onClick={() => handleTabSwitch("bambini")}
              aria-pressed={activeTab === "bambini"}
              className={`relative z-10 px-10 py-3.5 font-display text-sm tracking-wider transition-colors duration-300 rounded-full ${
                activeTab === "bambini" ? "text-[#0A0A0A]" : "text-white/55 hover:text-white/80"
              }`}
            >
              KIDS
            </button>
          </div>
        </div>

        {/* Split Card */}
        <div
          className={`percorso-card relative grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch transition-all duration-700`}
        >
          {/* VIDEO / PHOTO PANEL */}
          <div
            className={`relative lg:col-span-7 overflow-hidden rounded-sm aspect-[4/3] sm:aspect-video lg:aspect-auto lg:min-h-[580px] ${
              isReversed ? "lg:order-2" : "lg:order-1"
            } order-1 bg-[#0A0A0A]`}
          >
            <div ref={imageContainerRef} className="absolute inset-0 overflow-hidden bg-black flex items-center justify-center">
              {/* Sfondo d'atmosfera sfuocato per riempire armoniosamente il riquadro */}
              <video
                key={`bg-${activeTab}`}
                src={percorsiVideos[activeTab]}
                aria-hidden
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
              />
              {/* Video principale perfettamente adattato in scala al riquadro senza tagli */}
              <video
                key={activeTab}
                src={percorsiVideos[activeTab]}
                poster={percorsiImages[activeTab]}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="relative z-[1] max-w-full max-h-full w-full h-full object-contain"
              />
            </div>

            {/* Filtro d'accento colore opaco al 20% (fa l'effetto ma non disturba il video) */}
            <div
              aria-hidden
              className="absolute inset-0 z-10 pointer-events-none transition-colors duration-500"
              style={{
                backgroundColor: palette.accent,
                opacity: 0.20,
                mixBlendMode: "color",
              }}
            />

            {/* Tonal overlay attenuato al 20% */}
            <div
              className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
              style={{
                background: isReversed
                  ? "linear-gradient(to right, rgba(10,10,10,0.0) 0%, rgba(10,10,10,0.0) 35%, rgba(10,10,10,0.85) 100%)"
                  : "linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.0) 65%, rgba(10,10,10,0.0) 100%)",
                opacity: 0.20,
              }}
            />

            {/* Top-left meta tag */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-3">
              <span
                className="block w-2.5 h-2.5 rounded-full transition-colors duration-500"
                style={{ backgroundColor: palette.accent, boxShadow: `0 0 14px ${palette.accent}` }}
              />
              <span
                className="font-display text-xs tracking-[0.35em] uppercase transition-colors duration-500"
                style={{ color: palette.accent }}
              >
                {palette.label}
              </span>
            </div>

            {/* Bottom age badge */}
            <div className="absolute bottom-5 left-5 z-20">
              <div
                className="px-4 py-2 backdrop-blur-sm border transition-colors duration-500"
                style={{
                  background: "rgba(10,10,10,0.78)",
                  borderColor: palette.accentBorder,
                }}
              >
                <span
                  className="font-display text-xs tracking-[0.3em] uppercase transition-colors duration-500"
                  style={{ color: palette.accent }}
                >
                  {content.age}
                </span>
              </div>
            </div>

            {/* Bottom-right index */}
            <div className="absolute bottom-5 right-5 z-20 flex items-baseline gap-1">
              <span
                className="font-display text-3xl transition-colors duration-500"
                style={{ color: palette.accent }}
              >
                0{activeTab === "adulti" ? "1" : "2"}
              </span>
              <span className="font-display text-xs text-white/40">/ 02</span>
            </div>

            {/* Decorative corner brackets — restrained, in the active accent */}
            <span
              className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 z-20 transition-colors duration-500"
              style={{ borderColor: palette.accent }}
            />
            <span
              className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 z-20 transition-colors duration-500"
              style={{ borderColor: palette.accent }}
            />
            <span
              className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 z-20 transition-colors duration-500"
              style={{ borderColor: palette.accent }}
            />
            <span
              className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 z-20 transition-colors duration-500"
              style={{ borderColor: palette.accent }}
            />
          </div>

          {/* TEXT PANEL */}
          <div
            className={`relative lg:col-span-5 flex flex-col justify-center py-8 lg:py-12 ${
              isReversed ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6"
            } order-2`}
            ref={contentRef}
          >
            <div className="percorso-content">
              <div className="mb-8">
                <span
                  className="inline-block font-body text-[10px] tracking-[0.4em] uppercase mb-4 transition-colors duration-500"
                  style={{ color: palette.accent }}
                >
                  {activeTab === "adulti" ? "Percorso 01" : "Percorso 02"}
                </span>
                <h3
                  className={`font-stencil leading-[0.9] tracking-wider text-6xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${palette.titleGradient}`}
                >
                  {content.title}
                </h3>
                <div
                  className="mt-5 h-[2px] transition-colors duration-500"
                  style={{
                    width: "7rem",
                    background: `linear-gradient(90deg, ${palette.accent}, transparent)`,
                  }}
                />
              </div>

              <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-prose">
                {content.description}
              </p>

              <ul className="features-list space-y-4 mb-10">
                {content.features.map((item, i) => (
                  <li
                    key={i}
                    className="feature-item group flex items-center gap-4 cursor-default"
                  >
                    <div className="relative shrink-0">
                      <div
                        className="w-11 h-11 rounded-md flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${palette.accentSoft}, transparent)`,
                          borderColor: palette.accentBorder,
                          color: palette.accent,
                        }}
                      >
                        <item.Icon className="w-5 h-5" />
                      </div>
                      <div
                        className="absolute inset-0 rounded-md blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: palette.accentSoft }}
                      />
                    </div>
                    <span className="text-white/75 group-hover:text-white transition-colors duration-300 text-[15px]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={activeTab === "adulti" ? "/corsi/adulti" : "/corsi/kids"}
                className={`group relative inline-flex items-center overflow-hidden transition-all duration-300 ${palette.cta} ${palette.ctaHover} ${palette.ctaShadow} ${palette.ctaShadowHover} px-8 py-4 text-base sm:text-lg font-semibold tracking-wider rounded-none`}
                aria-label={`Scopri i corsi ${activeTab === "adulti" ? "per adulti" : "per bambini"}`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                <span className="relative z-10 flex items-center">
                  Scopri i corsi {activeTab === "adulti" ? "adulti" : "bambini"}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Section closer — single accent line, no boxed stats */}
        <div
          className="mt-24 mx-auto h-px w-24 transition-colors duration-500"
          style={{ background: palette.accent, boxShadow: `0 0 18px ${palette.accent}` }}
          aria-hidden
        />
      </div>

      <style jsx>{`
        @keyframes grid {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        .animate-grid {
          animation: grid 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
