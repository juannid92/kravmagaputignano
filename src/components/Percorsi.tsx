"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
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
  adulti: "https://images.pexels.com/photos/7045757/pexels-photo-7045757.jpeg?auto=compress&cs=tinysrgb&w=1200",
  bambini: "https://images.pexels.com/photos/7045661/pexels-photo-7045661.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

// Custom glitch shader
const GlitchShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    intensity: { value: 0.15 },
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
    uniform float intensity;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;

      // Subtle scanlines
      float scanline = sin(uv.y * 400.0) * 0.02;

      // Occasional glitch
      float glitch = step(0.98, random(vec2(floor(time * 10.0), floor(uv.y * 20.0))));
      uv.x += glitch * intensity * (random(vec2(time)) - 0.5) * 0.1;

      vec4 color = texture2D(tDiffuse, uv);
      color.rgb += scanline;

      // Red channel shift on glitch
      color.r += glitch * intensity * 0.3;

      gl_FragColor = color;
    }
  `,
};

// Chromatic aberration shader
const ChromaticShader = {
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: 0.003 },
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
    uniform float amount;
    varying vec2 vUv;

    void main() {
      vec2 dir = vUv - 0.5;
      float dist = length(dir);

      float r = texture2D(tDiffuse, vUv - dir * amount * dist).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv + dir * amount * dist).b;

      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `,
};

function ThreeCanvas({ imageSrc, isActive }: { imageSrc: string; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Create plane with texture
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Post-processing setup
      const composer = new EffectComposer(renderer);

      // Render pass
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // Subtle bloom for cinematic glow
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.4, // strength
        0.5, // radius
        0.7  // threshold
      );
      composer.addPass(bloomPass);

      // Chromatic aberration
      const chromaticPass = new ShaderPass(ChromaticShader);
      chromaticPass.uniforms["amount"].value = 0.002;
      composer.addPass(chromaticPass);

      // Subtle glitch effect
      const glitchPass = new ShaderPass(GlitchShader);
      glitchPass.uniforms["intensity"].value = 0.05;
      composer.addPass(glitchPass);

      // Film grain
      const filmPass = new FilmPass(0.15, false);
      composer.addPass(filmPass);

      // Vignette
      const vignetteShader = {
        uniforms: {
          tDiffuse: { value: null },
          offset: { value: 1.0 },
          darkness: { value: 1.2 },
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
          uniform float offset;
          uniform float darkness;
          varying vec2 vUv;

          void main() {
            vec4 color = texture2D(tDiffuse, vUv);
            vec2 center = vec2(0.5);
            float dist = distance(vUv, center);
            float vignette = smoothstep(0.8, offset * 0.5, dist * (darkness + offset));
            color.rgb *= vignette;
            gl_FragColor = color;
          }
        `,
      };
      const vignettePass = new ShaderPass(vignetteShader);
      composer.addPass(vignettePass);

      // Gamma correction
      const gammaPass = new ShaderPass(GammaCorrectionShader);
      composer.addPass(gammaPass);

      composerRef.current = composer;

      // Animation loop
      const clock = new THREE.Clock();
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

        // Update glitch time
        if (glitchPass.uniforms) {
          glitchPass.uniforms["time"].value = clock.getElapsedTime();
        }

        composer.render();
      };
      animate();
    });

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !composerRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      renderer.setSize(newWidth, newHeight);
      composerRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (composerRef.current) {
        composerRef.current.dispose();
      }
      renderer.dispose();
    };
  }, [imageSrc]);

  // Handle visibility
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.style.opacity = isActive ? "1" : "0";
    canvasRef.current.style.transition = "opacity 0.5s ease";
  }, [isActive]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

export function Percorsi() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"adulti" | "bambini">("adulti");
  const contentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const glitchLineRef = useRef<HTMLDivElement>(null);

  // Content data
  const adultiContent = {
    title: "ADULTI",
    age: "DAI 16 ANNI",
    description: "Un allenamento concreto per chi vuole imparare a proteggere se stesso e i propri cari. Nessuna pretesa agonistica — solo risultati che contano.",
    features: [
      { text: "Difesa da prese, strangolamenti e colpi", icon: "shield" },
      { text: "Gestione di attacchi multipli", icon: "users" },
      { text: "Utilizzo di oggetti comuni come difesa", icon: "zap" },
      { text: "Controllo dello stress in situazioni reali", icon: "heart" },
    ],
  };

  const bambiniContent = {
    title: "BAMBINI",
    age: "DAI 6 AI 15 ANNI",
    description: "Consapevolezza, disciplina e autostima. Gioco e apprendimento insieme.",
    features: [
      { text: "Riconoscimento e prevenzione dei pericoli", icon: "eye" },
      { text: "Tecniche adatte all'età", icon: "target" },
      { text: "Fiducia in se stessi", icon: "star" },
      { text: "Rispetto, disciplina e gruppo", icon: "award" },
    ],
  };

  const content = activeTab === "adulti" ? adultiContent : bambiniContent;

  // GSAP animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(
        ".percorso-header > *",
        { opacity: 0, y: 40, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Toggle switch animation
      gsap.fromTo(
        ".toggle-container",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".toggle-container",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Card entrance with 3D tilt
      gsap.fromTo(
        ".percorso-card",
        { opacity: 0, y: 60, rotateY: -10 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".percorso-card",
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Feature items stagger
      gsap.fromTo(
        ".feature-item",
        { opacity: 0, x: -30, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".features-list",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats counter animation
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-row",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Ambient floating animation on image overlay
      gsap.to(".corner-accent", {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      // Breathing glow on active tab indicator
      gsap.to(".tab-indicator", {
        boxShadow: "0 0 30px rgba(255, 61, 0, 0.6), 0 0 60px rgba(255, 61, 0, 0.3)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Tab switch animation
  const handleTabSwitch = useCallback((tab: "adulti" | "bambini") => {
    if (tab === activeTab || !contentRef.current || !imageContainerRef.current) return;

    // Glitch effect on switch
    if (glitchLineRef.current) {
      gsap.fromTo(
        glitchLineRef.current,
        { scaleX: 0, opacity: 1 },
        {
          scaleX: 1,
          duration: 0.1,
          ease: "none",
          onComplete: () => {
            gsap.to(glitchLineRef.current, {
              opacity: 0,
              duration: 0.2,
            });
          },
        }
      );
    }

    // Image transition with glitch
    if (!imageContainerRef.current) return;

    gsap.to(imageContainerRef.current, {
      scale: 1.05,
      filter: "saturate(1.5) brightness(1.2)",
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(tab);
        gsap.to(imageContainerRef.current, {
          scale: 1,
          filter: "saturate(1) brightness(1)",
          duration: 0.4,
          ease: "power3.out",
        });
      },
    });

    // Content fade out with slide
    const contentEl = contentRef.current?.querySelector(".percorso-content") as HTMLElement | null;
    if (!contentEl) return;

    gsap.to(contentEl, {
      opacity: 0,
      y: -20,
      scale: 0.98,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(tab);
        gsap.fromTo(
          contentEl,
          { opacity: 0, y: 20, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
          }
        );
      },
    });
  }, [activeTab]);

  // Feature icons mapping
  const getFeatureIcon = (icon: string) => {
    const icons: Record<string, JSX.Element> = {
      shield: <Shield className="w-5 h-5" />,
      users: <Users className="w-5 h-5" />,
      zap: <Zap className="w-5 h-5" />,
      heart: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      eye: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      target: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      star: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      award: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    };
    return icons[icon] || <Shield className="w-5 h-5" />;
  };

  return (
    <section
      id="percorsi"
      data-section="5"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#0A0A0A] relative overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[50%] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(255, 61, 0, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full animate-grid" style={{
          backgroundImage: 'linear-gradient(rgba(255,61,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,61,0,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Glitch line overlay */}
      <div
        ref={glitchLineRef}
        className="absolute inset-0 bg-[#FF3D00]/20 pointer-events-none z-30"
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="percorso-header text-center mb-12">
          <span className="text-[#FF3D00] font-body text-xs tracking-[0.4em] uppercase block mb-4">
            I Percorsi
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            SCEGLI IL TUO PERCORSO
          </h2>
          <p className="text-white/50 text-base font-body max-w-md mx-auto">
            Stessi principi, metodi diversi
          </p>
        </div>

        {/* Toggle Switch - Enhanced */}
        <div className="toggle-container relative flex justify-center mb-12">
          <div className="relative inline-flex bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] p-1.5 rounded-full border border-[#FF3D00]/40 shadow-[0_0_30px_rgba(255,61,0,0.15)]">
            {/* Moving background */}
            <div
              className="tab-indicator absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-[#FF3D00] to-[#FF6B00] rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                left: activeTab === "adulti" ? "4px" : "calc(50% + 2px)",
                boxShadow: "0 0 20px rgba(255, 61, 0, 0.4)",
              }}
            />

            {/* Adulti button */}
            <button
              onClick={() => handleTabSwitch("adulti")}
              className={`relative z-10 px-10 py-3.5 font-display text-sm tracking-wider transition-all duration-300 rounded-full overflow-hidden group ${
                activeTab === "adulti" ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              <span className="relative z-10">ADULTI</span>
              {activeTab !== "adulti" && (
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-full" />
              )}
            </button>

            {/* Bambini button */}
            <button
              onClick={() => handleTabSwitch("bambini")}
              className={`relative z-10 px-10 py-3.5 font-display text-sm tracking-wider transition-all duration-300 rounded-full overflow-hidden group ${
                activeTab === "bambini" ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              <span className="relative z-10">BAMBINI</span>
              {activeTab !== "bambini" && (
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="percorso-card grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image with Three.js effects */}
          <div className="relative aspect-[4/5] overflow-hidden group">
            {/* Image container with effects */}
            <div
              ref={imageContainerRef}
              className="absolute inset-0 overflow-hidden"
            >
              {/* Three.js Canvas */}
              <ThreeCanvas
                imageSrc={activeTab === "adulti" ? percorsiImages.adulti : percorsiImages.bambini}
                isActive={true}
              />

              {/* Fallback img for loading */}
              <img
                src={activeTab === "adulti" ? percorsiImages.adulti : percorsiImages.bambini}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-0"
              />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-[#FF3D00]/20 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A]/50 pointer-events-none z-10" />

            {/* Animated corner brackets */}
            <div className="corner-accent absolute top-4 left-4 w-16 h-16 border-l-[3px] border-t-[3px] border-[#FF3D00] z-20 opacity-80" />
            <div className="corner-accent absolute top-4 right-4 w-16 h-16 border-r-[3px] border-t-[3px] border-[#FF3D00] z-20 opacity-80" />
            <div className="corner-accent absolute bottom-4 left-4 w-16 h-16 border-l-[3px] border-b-[3px] border-[#FF3D00] z-20 opacity-80" />
            <div className="corner-accent absolute bottom-4 right-4 w-16 h-16 border-r-[3px] border-b-[3px] border-[#FF3D00] z-20 opacity-80" />

            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] pointer-events-none z-15" />

            {/* Age badge overlay */}
            <div className="absolute bottom-6 left-6 z-20">
              <div className="bg-[#0A0A0A]/90 backdrop-blur-sm border border-[#FF3D00]/50 px-4 py-2">
                <span className="text-[#FF3D00] font-display text-xs tracking-[0.3em] uppercase">
                  {content.age}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <div className="percorso-content">
              {/* Title with glitch effect */}
              <div className="mb-8">
                <h3 className="font-display text-5xl sm:text-6xl md:text-7xl text-white leading-none tracking-tight">
                  {content.title}
                </h3>
                <div className="mt-4 w-32 h-1 bg-gradient-to-r from-[#FF3D00] to-transparent" />
              </div>

              {/* Description */}
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                {content.description}
              </p>

              {/* Features with icons */}
              <ul className="features-list space-y-5 mb-10">
                {content.features.map((item, i) => (
                  <li
                    key={i}
                    className="feature-item flex items-center gap-5 group cursor-default"
                  >
                    {/* Icon container */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF3D00]/20 to-[#FF3D00]/5 border border-[#FF3D00]/30 flex items-center justify-center text-[#FF3D00] group-hover:bg-[#FF3D00]/30 group-hover:border-[#FF3D00]/60 transition-all duration-300 group-hover:scale-110">
                        {getFeatureIcon(item.icon)}
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-lg bg-[#FF3D00]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Text */}
                    <span className="text-white/70 group-hover:text-white transition-colors duration-300 text-base">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant="default"
                size="lg"
                className="group relative overflow-hidden bg-[#FF3D00] hover:bg-[#FF3D00] text-white border-2 border-[#FF3D00] shadow-[0_0_30px_rgba(255,61,0,0.4)] hover:shadow-[0_0_50px_rgba(255,61,0,0.6)] transition-all duration-300"
              >
                {/* Button glow animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                <span className="relative z-10 flex items-center">
                  Scopri i corsi {activeTab === "adulti" ? "adulti" : "bambini"}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom stats with enhanced styling */}
        <div className="stats-row mt-20 grid grid-cols-3 gap-6">
          {/* Divider line */}
          <div className="col-span-full -mx-4 border-t border-[#FF3D00]/20" />

          {/* Stat 1 */}
          <div className="stat-item text-center group">
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF3D00]/10 to-transparent border border-[#FF3D00]/30 flex items-center justify-center mx-auto mb-4 group-hover:border-[#FF3D00]/60 transition-colors duration-300">
                <Shield className="w-7 h-7 text-[#FF3D00]" />
              </div>
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-[#FF3D00]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="font-display text-4xl text-white mb-1">100%</div>
            <div className="text-white/40 text-xs uppercase tracking-widest">Pratico</div>
          </div>

          {/* Stat 2 */}
          <div className="stat-item text-center group">
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF3D00]/10 to-transparent border border-[#FF3D00]/30 flex items-center justify-center mx-auto mb-4 group-hover:border-[#FF3D00]/60 transition-colors duration-300">
                <Zap className="w-7 h-7 text-[#FF3D00]" />
              </div>
              <div className="absolute inset-0 rounded-full bg-[#FF3D00]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="font-display text-4xl text-white mb-1">2</div>
            <div className="text-white/40 text-xs uppercase tracking-widest">Sedi</div>
          </div>

          {/* Stat 3 */}
          <div className="stat-item text-center group">
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF3D00]/10 to-transparent border border-[#FF3D00]/30 flex items-center justify-center mx-auto mb-4 group-hover:border-[#FF3D00]/60 transition-colors duration-300">
                <Users className="w-7 h-7 text-[#FF3D00]" />
              </div>
              <div className="absolute inset-0 rounded-full bg-[#FF3D00]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="font-display text-4xl text-white mb-1">200+</div>
            <div className="text-white/40 text-xs uppercase tracking-widest">Studenti</div>
          </div>
        </div>
      </div>

      {/* CSS animations */}
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
