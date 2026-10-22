"use client";

import { openCookieSettings } from "@/components/CookieConsent";

/** Pulsante da usare nelle pagine legali per riaprire le preferenze cookie. */
export function CookieSettingsButton({ label = "Gestisci preferenze cookie" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="inline-flex min-h-[44px] items-center border border-[#CC0000] px-5 py-2 font-display text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#CC0000]"
    >
      {label}
    </button>
  );
}
