import Link from "next/link";
import type { Metadata } from "next";
import { LEGAL } from "@/lib/legal";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

const UPDATED = "22 ottobre 2026";

export const metadata: Metadata = {
  title: "Cookie Policy | Krav Maga Putignano",
  description:
    "Informativa sull'uso dei cookie, redatta in conformità con le Linee guida del Garante per la protezione dei dati personali (10 giugno 2021). Tipologie di cookie, finalità e gestione del consenso.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://kravmagaputignano.it/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-block text-[#CC0000] font-display text-xs tracking-[0.3em] uppercase hover:text-white transition-colors mb-8"
        >
          ← Torna al sito
        </Link>

        <h1 className="font-stencil text-4xl sm:text-5xl text-white tracking-wider mb-3">
          COOKIE POLICY
        </h1>
        <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-display mb-8">
          Ultimo aggiornamento: {UPDATED}
        </p>

        <div className="mb-12">
          <CookieSettingsButton />
        </div>

        <Section title="Titolare del trattamento">
          <p>
            Titolare: <strong>{LEGAL.legalName}</strong>, {LEGAL.registeredOffice} — e-mail{" "}
            <strong>{LEGAL.email}</strong>. Per ogni dettaglio sul trattamento dei dati si rinvia alla{" "}
            <Link href="/privacy-policy" className="text-[#FF4D4D] underline hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
        </Section>

        <Section title="Cosa sono i cookie">
          <p>
            I cookie sono piccoli file di testo che i siti visitati inviano al terminale
            dell&apos;utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti alla
            successiva visita. Possono essere installati dal sito visitato (cookie di prima
            parte) o da siti diversi (cookie di terze parti). Questa informativa riguarda anche
            strumenti analoghi, come la memoria locale del browser (localStorage).
          </p>
        </Section>

        <Section title="Cosa usa questo sito">
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-[#CC0000] mt-4 mb-2">
            1. Strumenti tecnici (necessari) — nessun consenso richiesto
          </h3>
          <p>
            Indispensabili al funzionamento del sito e per ricordare le tue scelte. Non
            profilano e non richiedono consenso (art. 122 D.lgs. 196/2003).
          </p>
          <div className="overflow-x-auto mt-3">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Finalità</th>
                  <th>Durata</th>
                  <th>Fornitore</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>km-cookie-consent</td>
                  <td>Memoria locale del browser (localStorage), prima parte</td>
                  <td>Memorizzare la tua scelta sul consenso (data e preferenze)</td>
                  <td>6 mesi, poi la scelta ti viene richiesta di nuovo</td>
                  <td>{LEGAL.legalName}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            Il fornitore di hosting e CDN del sito (attualmente Cloudflare) può impostare
            identificatori tecnici strettamente necessari alla sicurezza e al corretto
            funzionamento del servizio (ad es. protezione da traffico automatizzato). Anche questi
            non richiedono consenso e non sono usati per profilarti.
          </p>
          <p>
            I font del sito sono ospitati sul nostro stesso dominio: non vengono richiesti ai
            server di Google.
          </p>

          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-[#CC0000] mt-8 mb-2">
            2. Contenuti di terze parti — solo con il tuo consenso
          </h3>
          <p>
            Il sito può mostrare mappe incorporate di <strong>Google Maps</strong> (Google Ireland
            Limited / Google LLC). Finché non dai il consenso, la mappa <strong>non viene
            caricata</strong> e Google non riceve alcun dato. Se scegli “Accetta tutto”, abiliti il
            consenso nelle impostazioni oppure premi “Carica la mappa”, Google può installare
            cookie o identificatori e trattare il tuo indirizzo IP. Per i dettagli e i tempi di
            conservazione fa fede l&apos;informativa di Google:{" "}
            <a
              href="https://policies.google.com/technologies/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF4D4D] underline hover:text-white"
            >
              policies.google.com/technologies/cookies
            </a>
            .
          </p>

          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-[#CC0000] mt-8 mb-2">
            3. Cookie analitici e di marketing/profilazione
          </h3>
          <p>
            Al momento <strong>non sono utilizzati</strong>. Se in futuro venissero attivati, saranno
            installati solo dopo il tuo consenso esplicito e questa pagina verrà aggiornata prima
            dell&apos;attivazione.
          </p>

          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-[#CC0000] mt-8 mb-2">
            4. Link a social e servizi esterni
          </h3>
          <p>
            Il sito contiene semplici collegamenti a Facebook, Instagram e WhatsApp. Non incorpora
            plugin o pulsanti social: i cookie di questi servizi sono installati solo se scegli di
            aprirli, e sono regolati dalle rispettive informative.
          </p>
        </Section>

        <Section title="Come dare, modificare o revocare il consenso">
          <ul>
            <li>Alla prima visita compare il banner: puoi accettare, rifiutare o personalizzare con pulsanti di pari evidenza.</li>
            <li>Chiudendo il banner con la X continui a navigare senza accettare: vale come rifiuto.</li>
            <li>
              Puoi cambiare o revocare la scelta in qualsiasi momento con il pulsante qui sopra o dal
              link “Gestisci cookie” nel footer di ogni pagina.
            </li>
            <li>La tua scelta viene conservata per 6 mesi; poi il banner viene riproposto.</li>
            <li>
              Se revochi il consenso, le mappe vengono rimosse dalla pagina. I cookie già installati
              da Google possono essere eliminati dalle impostazioni del browser.
            </li>
          </ul>
        </Section>

        <Section title="Gestione dal browser">
          <p>
            Puoi inoltre bloccare o cancellare i cookie dalle impostazioni del browser. Guide
            ufficiali:
          </p>
          <ul>
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#FF4D4D] underline hover:text-white">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-[#FF4D4D] underline hover:text-white">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#FF4D4D] underline hover:text-white">
                Apple Safari
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/it-it/microsoft-edge/delete-cookies" target="_blank" rel="noopener noreferrer" className="text-[#FF4D4D] underline hover:text-white">
                Microsoft Edge
              </a>
            </li>
          </ul>
        </Section>

        <Section title="I tuoi diritti e reclami">
          <p>
            Per esercitare i diritti previsti dal GDPR scrivi a <strong>{LEGAL.email}</strong>. Puoi
            anche proporre reclamo al Garante per la protezione dei dati personali (
            <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#FF4D4D] underline hover:text-white">
              www.garanteprivacy.it
            </a>
            ).
          </p>
        </Section>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs">
          <Link href="/privacy-policy" className="font-display uppercase tracking-[0.2em] text-[#FF4D4D] hover:text-white transition-colors">
            Privacy Policy →
          </Link>
          <Link href="/" className="font-display uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
            Torna al sito →
          </Link>
        </div>
      </div>

      <style>{`
        main h2 { font-family: 'Oswald', sans-serif; text-transform: uppercase; letter-spacing: 0.08em; color: #ffffff; font-size: 1.1rem; margin-bottom: 0.75rem; }
        main h3 { font-size: 0.95rem; font-weight: 600; }
        main p, main li { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.7; margin-bottom: 0.5rem; }
        main ul { list-style: disc; padding-left: 1.25rem; margin: 0.5rem 0 0.5rem; }
        main ul li { margin-bottom: 0.35rem; }
        main strong { color: #ffffff; font-weight: 600; }
        main table { width: 100%; border-collapse: collapse; margin: 0.75rem 0; font-size: 0.85rem; }
        main th, main td { border: 1px solid rgba(255,255,255,0.15); padding: 0.5rem 0.6rem; text-align: left; vertical-align: top; }
        main th { color: #ffffff; background: rgba(204,0,0,0.15); font-weight: 600; }
        main td { color: rgba(255,255,255,0.75); }
      `}</style>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
