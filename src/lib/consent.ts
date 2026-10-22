// Gestione del consenso cookie / contenuti di terze parti.
// Conforme alle Linee guida cookie del Garante Privacy (10 giugno 2021):
// - nessun contenuto di terze parti prima del consenso;
// - la scelta e' conservata per 6 mesi, poi il banner viene riproposto;
// - la scelta puo' essere cambiata in qualsiasi momento (link "Gestisci cookie" nel footer).
//
// La scelta e' salvata in localStorage (strumento tecnico di prima parte).

export type ConsentState = {
  necessary: true; // sempre attivo, non modificabile
  thirdParty: boolean; // contenuti di terze parti (es. mappe Google)
  ts: number; // timestamp della scelta
  v: 2; // versione schema
};

const STORAGE_KEY = "km-cookie-consent";

/** Evento globale emesso a ogni cambio di consenso. */
export const CONSENT_EVENT = "km:consent-changed";

/** Durata della scelta: 6 mesi (~182 giorni). */
export const CONSENT_MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000;

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.v !== 2) return null;
    const ts = typeof parsed.ts === "number" ? parsed.ts : 0;
    if (!ts || Date.now() - ts > CONSENT_MAX_AGE_MS) {
      // Scelta scaduta: si richiede di nuovo.
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return {
      necessary: true,
      thirdParty: !!parsed.thirdParty,
      ts,
      v: 2,
    };
  } catch {
    return null;
  }
}

export function writeConsent(c: { thirdParty: boolean }): ConsentState {
  const full: ConsentState = {
    necessary: true,
    thirdParty: c.thirdParty,
    ts: Date.now(),
    v: 2,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  } catch {
    // Modalita' privata / storage bloccato: nessun crash, il banner ricomparira' al prossimo caricamento.
  }
  try {
    window.dispatchEvent(new Event(CONSENT_EVENT));
  } catch {
    // ignore
  }
  return full;
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  } catch {
    // ignore
  }
}
