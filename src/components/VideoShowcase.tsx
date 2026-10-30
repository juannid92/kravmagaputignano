"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { FilmPass } from "three/addons/postprocessing/FilmPass.js";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, X, RefreshCw } from "lucide-react";

// --- Cinematic backdrop shader: scanlines, vignette, grain drift --------------------
const CinematicShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    intensity: { value: 0.18 },
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

      // Slow horizontal scanline drift
      float scanline = sin((uv.y * 320.0) + time * 1.5) * 0.04;

      // Occasional glitch line
      float glitch = step(0.985, random(vec2(floor(time * 8.0), floor(uv.y * 30.0))));
      uv.x += glitch * intensity * (random(vec2(time)) - 0.5) * 0.08;

      vec4 color = texture2D(tDiffuse, uv);
      color.rgb += scanline;

      // Red channel shift on glitch
      color.r += glitch * intensity * 0.4;

      // Soft vignette
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      float vignette = smoothstep(0.95, 0.4, dist);
      color.rgb *= mix(0.35, 1.0, vignette);

      gl_FragColor = color;
    }
  `,
};

const ChromaticShader = {
  uniforms: { tDiffuse: { value: null }, amount: { value: 0.0035 } },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
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

// --- Three.js cinematic backdrop: red orbiting particles + scanline shader ----------
function ThreeVideoBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Background plane (dark) so scanlines have something to ride on
    const bgGeometry = new THREE.PlaneGeometry(2, 2);
    const bgMaterial = new THREE.MeshBasicMaterial({ color: 0x07090c });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    bgMesh.position.z = -2;
    scene.add(bgMesh);

    // Faint central glow disk (radial gradient via vertex colors)
    const diskGeometry = new THREE.CircleGeometry(1.2, 64);
    const diskMaterial = new THREE.MeshBasicMaterial({
      color: 0xcc0000,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });
    const disk = new THREE.Mesh(diskGeometry, diskMaterial);
    disk.position.z = -0.5;
    scene.add(disk);

    // Red particles orbiting on an ellipse — "K" of Krav Maga
    const PARTICLE_COUNT = 220;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = i / PARTICLE_COUNT;
      const angle = t * Math.PI * 2;
      // Ellipse with slight Z wobble to fake depth
      positions[i * 3] = Math.cos(angle) * (1.4 + Math.sin(t * 13.0) * 0.08);
      positions[i * 3 + 1] = Math.sin(angle) * (0.9 + Math.cos(t * 11.0) * 0.06);
      positions[i * 3 + 2] = Math.sin(t * 17.0) * 0.15;
      seeds[i] = t;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff3d00,
      size: 0.045,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Inner counter-rotating ring of softer particles
    const RING2_COUNT = 90;
    const ring2Pos = new Float32Array(RING2_COUNT * 3);
    for (let i = 0; i < RING2_COUNT; i++) {
      const t = i / RING2_COUNT;
      const angle = t * Math.PI * 2;
      ring2Pos[i * 3] = Math.cos(angle) * 0.55;
      ring2Pos[i * 3 + 1] = Math.sin(angle) * 0.55;
      ring2Pos[i * 3 + 2] = 0;
    }
    const ring2Geo = new THREE.BufferGeometry();
    ring2Geo.setAttribute("position", new THREE.BufferAttribute(ring2Pos, 3));
    const ring2Mat = new THREE.PointsMaterial({
      color: 0xff6a3d,
      size: 0.025,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring2 = new THREE.Points(ring2Geo, ring2Mat);
    scene.add(ring2);

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.7, 0.6, 0.4);
    composer.addPass(bloomPass);
    const chromaticPass = new ShaderPass(ChromaticShader);
    composer.addPass(chromaticPass);
    const cinematicPass = new ShaderPass(CinematicShader);
    composer.addPass(cinematicPass);
    const filmPass = new FilmPass(0.2, false);
    composer.addPass(filmPass);
    const gammaPass = new ShaderPass(GammaCorrectionShader);
    composer.addPass(gammaPass);

    // Intersection observer: pause render when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation loop
    const clock = new THREE.Clock();
    let raf = 0;
    let lastRender = 0;
    const FRAME_BUDGET = 1000 / 30; // throttle to 30fps when not strictly needed
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = performance.now();
      if (!inViewRef.current) {
        if (now - lastRender > 1000) {
          // render once a second when offscreen to keep state alive
          composer.render();
          lastRender = now;
        }
        return;
      }
      if (now - lastRender < FRAME_BUDGET) return;
      lastRender = now;

      const elapsed = clock.getElapsedTime();
      particles.rotation.z = elapsed * 0.25;
      ring2.rotation.z = -elapsed * 0.55;
      ring2.rotation.x = Math.sin(elapsed * 0.4) * 0.3;

      cinematicPass.uniforms["time"].value = elapsed;
      chromaticPass.uniforms["amount"].value = 0.0035 + Math.sin(elapsed * 0.7) * 0.0015;

      composer.render();
    };
    animate();

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
      observer.disconnect();
      particleGeometry.dispose();
      particleMaterial.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
      diskGeometry.dispose();
      diskMaterial.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

// --- Typographic clock that ticks softly (motion: ambient) ---------------------------
function useTickingClock() {
  const [time, setTime] = useState("00:00");
  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      const sec = Math.floor((Date.now() - start) / 1000) % 100;
      const mm = String(Math.floor(sec / 60)).padStart(2, "0");
      const ss = String(sec % 60).padStart(2, "0");
      setTime(`${mm}:${ss}`);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

const SHOWCASE_PLAYLIST = [
  { id: 1, src: "/videos/showcase/showcase-1.mp4", label: "Clip 01" },
  { id: 2, src: "/videos/showcase/showcase-2.mp4", label: "Clip 02" },
  { id: 3, src: "/videos/showcase/showcase-3.mp4", label: "Clip 03" },
  { id: 4, src: "/videos/showcase/showcase-4.mp4", label: "Clip 04" },
  { id: 5, src: "/videos/showcase/showcase-5.mp4", label: "Clip 05" },
  { id: 6, src: "/videos/showcase/showcase-6.mp4", label: "Clip 06" },
];

export function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const tickingClock = useTickingClock();

  const activeClip = SHOWCASE_PLAYLIST[currentClipIndex];

  // Auto-play when clip changes or player is started
  useEffect(() => {
    if (!isPlaying) return;
    const v = videoPlayerRef.current;
    if (!v) return;
    v.currentTime = 0;
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: browser audio policy requires muted autoplay
        v.muted = true;
        setIsMuted(true);
        v.play().catch(() => {});
      });
    }
  }, [isPlaying, currentClipIndex]);

  const handleNextClip = () => {
    setCurrentClipIndex((prev) => (prev + 1) % SHOWCASE_PLAYLIST.length);
  };

  const handlePrevClip = () => {
    setCurrentClipIndex((prev) => (prev - 1 + SHOWCASE_PLAYLIST.length) % SHOWCASE_PLAYLIST.length);
  };

  const togglePlayPause = () => {
    const v = videoPlayerRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPaused(false);
    } else {
      v.pause();
      setIsPaused(true);
    }
  };

  const toggleMute = () => {
    const v = videoPlayerRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const clipErrors = useRef(0);

  const handleClipError = () => {
    clipErrors.current += 1;
    if (clipErrors.current >= SHOWCASE_PLAYLIST.length) return;
    setCurrentClipIndex((prev) => (prev + 1) % SHOWCASE_PLAYLIST.length);
  };

  const handleClose = () => {
    setIsPlaying(false);
    setIsPaused(false);
    clipErrors.current = 0;
    const v = videoPlayerRef.current;
    if (v) v.pause();
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // Header reveal
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }

      // Frame cinematic scale-in
      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          { opacity: 0, scale: 0.96, filter: "blur(8px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-section="4"
      className="relative py-24 sm:py-32 bg-[#07090c] overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(255,61,0,0.10), transparent 60%), radial-gradient(ellipse at 50% 90%, rgba(204,0,0,0.06), transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Faint grid lines for cinematic feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={contentRef} className="text-center mb-12">
          <span className="text-[#D4AF37] font-display text-xs tracking-[0.4em] uppercase block mb-3">
            Dal Vivo
          </span>
          <h2 className="font-stencil text-3xl sm:text-4xl md:text-5xl text-white tracking-wider mb-4">
            ALLENAMENTI IN AZIONE
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Guarda come si allenano i nostri allievi. Tecnica, intensità e determinazione in ogni sessione.
          </p>
        </div>

        {/* Cinematic frame */}
        <div className="relative max-w-4xl mx-auto">
          <div
            ref={frameRef}
            className="relative aspect-video bg-[#07090c] overflow-hidden border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {/* 3D Backdrop */}
            <ThreeVideoBackdrop />

            {/* Cinematic overlay UI */}
            <div
              className={`absolute inset-0 z-20 pointer-events-none ${isPlaying ? "hidden" : ""}`}
            >
              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF3D00] opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF3D00]" />
                  </span>
                  <span className="font-stencil text-xs sm:text-sm tracking-[0.3em] text-white/90">
                    REC
                  </span>
                </div>
                <span className="font-stencil text-[10px] sm:text-xs tracking-[0.4em] text-white/60">
                  PUTIGNANO · KM
                </span>
              </div>

              {/* Center: clock + play */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className="font-stencil text-white/90 leading-none tabular-nums"
                  style={{
                    fontSize: "clamp(3rem, 10vw, 7rem)",
                    textShadow: "0 0 30px rgba(255,61,0,0.35)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {isPlaying ? tickingClock : "00:00"}
                </div>
                <div className="mt-2 font-stencil text-[10px] sm:text-xs tracking-[0.4em] text-white/50">
                  KRAV MAGA · LIVE TAKE
                </div>
              </div>

              {/* Bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 sm:p-5">
                <span className="font-stencil text-[10px] sm:text-xs tracking-[0.3em] text-white/50">
                  240 FPS · 4K
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-stencil text-[10px] sm:text-xs tracking-[0.3em] text-white/70">
                    TAKE 07
                  </span>
                  <span className="w-12 sm:w-16 h-px bg-white/30 relative overflow-hidden">
                    <span className="absolute inset-y-0 left-0 w-1/2 bg-[#FF3D00]" />
                  </span>
                </div>
                <span className="font-stencil text-[10px] sm:text-xs tracking-[0.3em] text-white/50">
                  HD 1080p
                </span>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white/30" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/30" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-white/30" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-white/30" />
            </div>

            {/* Play button (interactive) */}
            {!isPlaying && (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label="Avvia anteprima video allenamenti"
                className="absolute inset-0 z-30 flex items-center justify-center group"
              >
                <span className="relative flex items-center justify-center">
                  <span className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-white/20 transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-0" />
                  <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/30 transition-all duration-500 ease-out group-hover:scale-110" />
                  <span className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FF3D00] flex items-center justify-center shadow-[0_0_40px_rgba(255,61,0,0.5)] transition-transform duration-300 group-hover:scale-105">
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
                <span className="sr-only">Avvia anteprima video</span>
              </button>
            )}

            {/* Interactive Video Playlist Player */}
            {isPlaying && (
              <div className="absolute inset-0 z-40 bg-black flex flex-col justify-between overflow-hidden select-none">
                {/* Un solo decoder: su iPhone due video insieme (sfondo + clip) fanno sparire i file più pesanti. */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(255,61,0,0.18), #07090c 68%)",
                  }}
                />

                {/* Main sharp video */}
                <video
                  ref={videoPlayerRef}
                  key={`main-${activeClip.src}`}
                  src={activeClip.src}
                  autoPlay
                  playsInline
                  preload="auto"
                  muted={isMuted}
                  onEnded={handleNextClip}
                  onError={handleClipError}
                  onPlay={() => setIsPaused(false)}
                  onPause={() => setIsPaused(true)}
                  onClick={togglePlayPause}
                  className="relative z-10 w-full h-full object-contain cursor-pointer bg-black"
                />

                {/* Pause overlay icon if paused */}
                {isPaused && (
                  <button
                    type="button"
                    onClick={togglePlayPause}
                    aria-label="Riprendi riproduzione"
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity cursor-pointer"
                  >
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FF3D00]/90 flex items-center justify-center shadow-[0_0_30px_rgba(255,61,0,0.6)]">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1 fill-white" />
                    </span>
                  </button>
                )}

                {/* HUD Top Bar */}
                <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF3D00] opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF3D00]" />
                    </span>
                    <span className="font-stencil text-xs sm:text-sm tracking-[0.25em] text-white/90">
                      LIVE CLIP {currentClipIndex + 1}/{SHOWCASE_PLAYLIST.length}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-stencil tracking-[0.2em] text-[#FF3D00] bg-[#FF3D00]/15 px-2 py-0.5 border border-[#FF3D00]/30 rounded-sm">
                      <RefreshCw className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: "6s" }} /> LOOP ATTIVO
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex items-center gap-1.5 font-stencil text-xs tracking-[0.25em] text-white/90 bg-black/60 border border-white/20 hover:border-[#FF3D00] hover:text-[#FF3D00] px-3 py-1.5 rounded-sm transition-colors"
                    aria-label="Chiudi video"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>CHIUDI</span>
                  </button>
                </div>

                {/* HUD Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2">
                  {/* Clip selector bar */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {SHOWCASE_PLAYLIST.map((clip, idx) => (
                        <button
                          key={clip.id}
                          type="button"
                          onClick={() => {
                            clipErrors.current = 0;
                            setCurrentClipIndex(idx);
                          }}
                          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                            idx === currentClipIndex
                              ? "w-8 sm:w-12 bg-[#FF3D00] shadow-[0_0_8px_#FF3D00]"
                              : "w-4 sm:w-6 bg-white/30 hover:bg-white/60"
                          }`}
                          aria-label={`Vai al clip ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Prev */}
                      <button
                        type="button"
                        onClick={handlePrevClip}
                        className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                        aria-label="Clip precedente"
                      >
                        <SkipBack className="w-4 h-4" />
                      </button>

                      {/* Play/Pause */}
                      <button
                        type="button"
                        onClick={togglePlayPause}
                        className="p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                        aria-label={isPaused ? "Play" : "Pausa"}
                      >
                        {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4 fill-white" />}
                      </button>

                      {/* Next */}
                      <button
                        type="button"
                        onClick={handleNextClip}
                        className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                        aria-label="Clip successivo"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>

                      {/* Audio mute/unmute */}
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="p-1.5 text-white/80 hover:text-[#FF3D00] hover:bg-white/10 rounded-sm transition-colors ml-1"
                        aria-label={isMuted ? "Attiva audio" : "Disattiva audio"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 border border-white/10 bg-[#0D0D0D]/50">
              <span className="font-stencil text-2xl text-[#FF3D00]">150+</span>
              <p className="text-white/50 text-sm mt-1">Ore di Training Annuali</p>
            </div>
            <div className="p-4 border border-white/10 bg-[#0D0D0D]/50">
              <span className="font-stencil text-2xl text-[#FF3D00]">12</span>
              <p className="text-white/50 text-sm mt-1">Tecniche Base</p>
            </div>
            <div className="p-4 border border-white/10 bg-[#0D0D0D]/50">
              <span className="font-stencil text-2xl text-[#FF3D00]">365</span>
              <p className="text-white/50 text-sm mt-1">Giorni all&apos;Anno</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
