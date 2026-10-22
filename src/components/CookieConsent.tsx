"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { readConsent, writeConsent, type ConsentState } from "@/lib/consent";
import { Cookie, X } from "lucide-react";

type Mode = "banner" | "settings";

// Tutti i pulsanti di scelta hanno lo stesso stile e la stessa evidenza
// (Linee guida Garante Privacy 10/06/2021 ed EDPB): nessun "dark pattern".
const BTN =
  "w-full min-h-[44px] border border-white/60 bg-white/5 hover:bg-white hover:text-black text-white font-display text-[11px] tracking-[0.15em] uppercase py-3 px-2 transition-colors";

export function CookieConsent() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [thirdParty, setThirdParty] = useState(false);
  const [show, setShow] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Evento globale per riaprire il pannello dal footer / dalle pagine legali.
  useEffect(() => {
    function openSettings() {
      const c = readConsent();
      setThirdParty(c ? c.thirdParty : false);
      setMode("settings");
      setShow(true);
    }
    window.addEventListener("km:open-cookie-settings", openSettings);
    return () => window.removeEventListener("km:open-cookie-settings", openSettings);
  }, []);

  // Mostra il banner se non c'e' una scelta valida (assente o scaduta dopo 6 mesi).
  useEffect(() => {
    const c = readConsent();
    if (!c) {
      setMode("banner");
      setShow(true);
    }
  }, []);

  // Blocca lo scroll solo quando il pannello impostazioni e' aperto a tutto schermo.
  useEffect(() => {
    if (!show || mode !== "settings") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [show, mode]);

  // Focus trap + Escape. Nel banner Escape non fa nulla: scelta esplicita richiesta.
  useEffect(() => {
    if (!show || !mode) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const heading = dialog.querySelector<HTMLElement>("#cookie-title");
    heading?.focus();

    function getFocusable(): HTMLElement[] {
      return Array.from(
        dialog!.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && mode === "settings") {
        e.preventDefault();
        setShow(false);
        return;
      }
      if (e.key !== "Tab") return;
      const f = getFocusable();
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      previouslyFocused?.focus?.();
    };
  }, [show, mode]);

  if (!show || !mode) return null;

  function acceptAll() {
    writeConsent({ thirdParty: true });
    setShow(false);
  }

  function rejectAll() {
    writeConsent({ thirdParty: false });
    setShow(false);
  }

  function saveCustom() {
    writeConsent({ thirdParty });
    setShow(false);
  }

  const isSettings = mode === "settings";

  return (
    <div
      role="dialog"
      aria-modal={isSettings ? "true" : undefined}
      aria-labelledby="cookie-title"
      className={
        isSettings
          ? "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          : "fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto z-[100] p-3 sm:p-4 md:p-0 pointer-events-none"
      }
    >
      <div
        ref={dialogRef}
        className="pointer-events-auto relative w-full md:max-w-md bg-[#0F0F0F] border border-[#CC0000]/40 text-white shadow-2xl rounded-lg overflow-hidden"
        style={{
          maxHeight: isSettings ? "90svh" : "80svh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Cookie className="w-5 h-5 text-[#CC0000] flex-shrink-0 mt-0.5" />
            <h2 id="cookie-title" tabIndex={-1} className="font-display text-base uppercase tracking-[0.2em] text-white">
              {isSettings ? "Gestisci Cookie" : "Cookie & Privacy"}
            </h2>
          </div>
          {/* X: nel banner equivale a "continua senza accettare" (= rifiuta); nelle impostazioni chiude senza salvare. */}
          <button
            type="button"
            onClick={isSettings ? () => setShow(false) : rejectAll}
            aria-label={isSettings ? "Chiudi" : "Chiudi e continua senza accettare"}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-sm font-body text-white/75 leading-relaxed">
          <p>
            Questo sito usa solo cookie e strumenti tecnici necessari. Per mostrare le
            mappe di Google (contenuti di terze parti, che possono installare cookie)
            serve il tuo consenso. Puoi accettare, rifiutare o personalizzare la scelta;
            chiudendo il banner con la X continui senza accettare. Puoi cambiare idea
            in qualsiasi momento da &ldquo;Gestisci cookie&rdquo; nel footer. Dettagli:{" "}
            <Link href="/cookie-policy" className="text-[#FF4D4D] underline hover:text-white">
              Cookie Policy
            </Link>{" "}
            e{" "}
            <Link href="/privacy-policy" className="text-[#FF4D4D] underline hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>

          {isSettings && (
            <>
              <ConsentRow
                title="Necessari"
                description="Indispensabili per il funzionamento del sito e per ricordare la tua scelta. Non profilano."
                checked
                disabled
                onChange={() => {}}
              />
              <ConsentRow
                title="Contenuti di terze parti (Google Maps)"
                description="Mappe incorporate di Google: Google puo' installare cookie e trattare il tuo IP. Attivi solo con il tuo consenso."
                checked={thirdParty}
                disabled={false}
                onChange={setThirdParty}
              />
              <p className="text-xs text-white/50">
                Non usiamo cookie analitici ne' di marketing/profilazione.
              </p>
            </>
          )}
        </div>

        {/* Footer: pulsanti di pari evidenza */}
        <div className="p-5 border-t border-white/10">
          <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-2">
            <button type="button" onClick={rejectAll} className={BTN}>
              Rifiuta tutto
            </button>
            <button type="button" onClick={acceptAll} className={BTN}>
              Accetta tutto
            </button>
            {isSettings ? (
              <button type="button" onClick={saveCustom} className={BTN}>
                Salva scelta
              </button>
            ) : (
              <button type="button" onClick={() => setMode("settings")} className={BTN}>
                Personalizza
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      className={`flex items-start gap-3 border-t border-white/5 pt-3 ${
        disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-4 h-4 accent-[#CC0000] flex-shrink-0"
      />
      <span>
        <span className="block font-display text-sm uppercase tracking-wider text-white/90">
          {title}
        </span>
        <span className="block text-xs text-white/60 mt-0.5">{description}</span>
      </span>
    </label>
  );
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("km:open-cookie-settings"));
}

export function currentConsentSnapshot(): ConsentState | null {
  return readConsent();
}
