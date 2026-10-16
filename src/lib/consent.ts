// Helper GDPR-compliant per consenso cookie.
// Persiste la scelta in localStorage; i cookie "necessari" sono sempre attivi.

export type ConsentState = {
  necessary: true; // sempre true, non modificabile
  analytics: boolean;
  marketing: boolean;
  ts: number; // timestamp della scelta
  v: 1; // versione schema
};

const STORAGE_KEY = "km-cookie-consent";

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.v !== 1) return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      ts: typeof parsed.ts === "number" ? parsed.ts : 0,
      v: 1,
    };
  } catch {
    return null;
  }
}

export function writeConsent(c: Omit<ConsentState, "necessary" | "v" | "ts">): ConsentState {
  const full: ConsentState = {
    necessary: true,
    analytics: c.analytics,
    marketing: c.marketing,
    ts: Date.now(),
    v: 1,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  } catch {
    // Safari ITP / private mode: nessun crash, il banner ricomparirà al prossimo reload.
  }
  return full;
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
