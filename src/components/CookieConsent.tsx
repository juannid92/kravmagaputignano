"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { readConsent, writeConsent, type ConsentState } from "@/lib/consent";
import { Cookie, X } from "lucide-react";

type Mode = "banner" | "settings";

export function CookieConsent() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [show, setShow] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esponi un evento globale per riaprire il pannello dal footer.
  useEffect(() => {
    function openSettings() {
      const c = readConsent();
      if (c) {
        setAnalytics(c.analytics);
        setMarketing(c.marketing);
      } else {
        setAnalytics(false);
        setMarketing(false);
      }
      setMode("settings");
      setShow(true);
    }
    window.addEventListener("km:open-cookie-settings", openSettings);
    return () => window.removeEventListener("km:open-cookie-settings", openSettings);
  }, []);

  // Mostra il banner al primo mount se non c'è consenso salvato.
  useEffect(() => {
    const c = readConsent();
    if (!c) {
      setMode("banner");
      setShow(true);
    }
  }, []);

  // Blocca lo scroll della pagina solo quando il pannello impostazioni è aperto a tutto schermo.
  useEffect(() => {
    if (!show || mode !== "settings") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [show, mode]);

  // Focus trap + Escape handling. WCAG 2.1.2 / 2.4.3 / 4.1.2.
  // Escape only closes the settings panel — the banner has explicit
  // Accept/Reject, so users must not be able to dismiss consent by Escape.
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
    writeConsent({ analytics: true, marketing: true });
    setShow(false);
  }

  function rejectAll() {
    writeConsent({ analytics: false, marketing: false });
    setShow(false);
  }

  function saveCustom() {
    writeConsent({ analytics, marketing });
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
          {isSettings && (
            <button
              type="button"
              onClick={() => setShow(false)}
              aria-label="Chiudi"
              className="text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-sm font-body text-white/75 leading-relaxed">
          <p>
            Utilizziamo cookie tecnici necessari al funzionamento del sito e, previo tuo
            consenso, cookie analitici e di marketing per migliorare l&apos;esperienza e
            misurare le prestazioni. Puoi accettare, rifiutare o personalizzare la scelta
            in qualsiasi momento. Per dettagli leggi la{" "}
            <Link href="/cookie-policy" className="text-[#CC0000] hover:underline">
              Cookie Policy
            </Link>{" "}
            e la{" "}
            <Link href="/privacy-policy" className="text-[#CC0000] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          <ConsentRow
            title="Necessari"
            description="Indispensabili per il funzionamento del sito (es. memorizzazione del consenso). Non profilano."
            checked
            disabled
            onChange={() => {}}
          />
          <ConsentRow
            title="Analitici"
            description="Aiutano a capire come viene usato il sito in forma aggregata. Attivi solo con il tuo consenso."
            checked={analytics}
            disabled={false}
            onChange={setAnalytics}
            visible={isSettings}
          />
          <ConsentRow
            title="Marketing"
            description="Per mostrare contenuti pertinenti e misurare campagne. Attivi solo con il tuo consenso."
            checked={marketing}
            disabled={false}
            onChange={setMarketing}
            visible={isSettings}
          />
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 flex flex-col gap-2">
          {isSettings ? (
            <>
              <button
                type="button"
                onClick={saveCustom}
                className="w-full bg-[#CC0000] hover:bg-[#FF0000] text-white font-display text-sm tracking-[0.2em] uppercase py-3 transition-colors"
              >
                Salva preferenze
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="flex-1 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-display text-xs tracking-[0.2em] uppercase py-3 transition-colors"
                >
                  Rifiuta tutto
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="flex-1 border border-[#CC0000] text-[#FF0000] hover:bg-[#CC0000] hover:text-white font-display text-xs tracking-[0.2em] uppercase py-3 transition-colors"
                >
                  Accetta tutto
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={acceptAll}
                className="w-full bg-[#CC0000] hover:bg-[#FF0000] text-white font-display text-sm tracking-[0.2em] uppercase py-3 transition-colors"
              >
                Accetta tutto
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="flex-1 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-display text-xs tracking-[0.2em] uppercase py-3 transition-colors"
                >
                  Rifiuta tutto
                </button>
                <button
                  type="button"
                  onClick={() => setMode("settings")}
                  className="flex-1 border border-[#CC0000] text-[#FF0000] hover:bg-[#CC0000] hover:text-white font-display text-xs tracking-[0.2em] uppercase py-3 transition-colors"
                >
                  Personalizza
                </button>
              </div>
            </>
          )}
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
  visible = true,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  onChange: (v: boolean) => void;
  visible?: boolean;
}) {
  if (!visible) {
    return (
      <div className="border-t border-white/5 pt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="font-display text-sm uppercase tracking-wider text-white/90">{title}</span>
          <span className="text-[10px] uppercase tracking-widest text-white/40">
            {checked ? "Attivo" : "Disattivato"}
          </span>
        </div>
        <p className="text-xs text-white/50">{description}</p>
      </div>
    );
  }

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
        <span className="block text-xs text-white/50 mt-0.5">{description}</span>
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
