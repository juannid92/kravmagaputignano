"use client";

import { useEffect, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { CONSENT_EVENT, readConsent, writeConsent } from "@/lib/consent";
import { openCookieSettings } from "@/components/CookieConsent";

type MapEmbedProps = {
  /** URL di incorporamento Google Maps (output=embed). */
  src: string;
  title: string;
  /** Link esterno per aprire la posizione in Google Maps (non carica nulla finche' non si clicca). */
  mapsUrl?: string;
  className?: string;
};

/**
 * Mappa Google con blocco preventivo: l'iframe (che comporta il caricamento di
 * contenuti e possibili cookie di Google) viene creato SOLO dopo il consenso
 * ai contenuti di terze parti, oppure dopo un click esplicito dell'utente.
 */
export function MapEmbed({ src, title, mapsUrl, className }: MapEmbedProps) {
  const [allowed, setAllowed] = useState(false);
  const [once, setOnce] = useState(false);

  useEffect(() => {
    function sync() {
      const ok = !!readConsent()?.thirdParty;
      setAllowed(ok);
      if (!ok) setOnce(false);
    }
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (allowed || once) {
    return (
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className={className ?? "w-full h-full border-0"}
      />
    );
  }

  return (
    <div
      role="region"
      aria-label={title}
      className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[#0D0D0D] px-5 py-6 text-center"
    >
      <MapPin className="h-7 w-7 text-[#CC0000]" aria-hidden />
      <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-white/70 font-body">
        Per mostrare la mappa vengono caricati contenuti da Google Maps (terza
        parte), che possono installare cookie e trattare il tuo indirizzo IP.
        Scegli se caricarla.
      </p>
      <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => setOnce(true)}
          className="flex-1 min-h-[44px] border border-white/60 bg-white/5 px-3 py-2 font-display text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
        >
          Carica la mappa
        </button>
        <button
          type="button"
          onClick={() => writeConsent({ thirdParty: true })}
          className="flex-1 min-h-[44px] border border-white/60 bg-white/5 px-3 py-2 font-display text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
        >
          Abilita sempre
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/60">
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 underline-offset-2 hover:text-white hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            Apri in Google Maps
          </a>
        )}
        <button
          type="button"
          onClick={openCookieSettings}
          className="underline-offset-2 hover:text-white hover:underline"
        >
          Gestisci cookie
        </button>
      </div>
    </div>
  );
}
