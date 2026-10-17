"use client";

import { useEffect, useState, type RefObject } from "react";

interface VideoHeroProps {
  videoMp4: string;
  videoWebm: string;
  poster: string;
  videoRef?: RefObject<HTMLVideoElement>;
  className?: string;
}

type NavWithConn = Navigator & {
  connection?: { saveData?: boolean };
};

export function VideoHero({
  videoMp4,
  videoWebm,
  poster,
  videoRef,
  className,
}: VideoHeroProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const nav = navigator as NavWithConn;
    if (nav.connection?.saveData) {
      setSaveData(true);
    }
    if (window.matchMedia("(prefers-reduced-data: reduce)").matches) {
      setSaveData(true);
    }

    // Touch-only devices: skip the video entirely to save bandwidth.
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShouldLoadVideo(false);
      return;
    }

    // Desktop with motion allowed: defer to idle so the page paints first.
    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void) => number;
    }).requestIdleCallback;
    const idle = ric ?? ((cb: () => void) => setTimeout(cb, 200));
    idle(() => setShouldLoadVideo(true));
  }, []);

  // SSR/initial paint: poster only. After mount, decision is based on UA hints.
  if (!mounted || !shouldLoadVideo || saveData) {
    return (
      <img
        src={poster}
        alt=""
        className={className}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      // DECORATIVE: video has no audio track; no dialog/narration to caption.
      // If narration is added later, supply a WebVTT <track> here.
    >
      {videoWebm ? <source src={videoWebm} type="video/webm" /> : null}
      {videoMp4 ? <source src={videoMp4} type="video/mp4" /> : null}
    </video>
  );
}
