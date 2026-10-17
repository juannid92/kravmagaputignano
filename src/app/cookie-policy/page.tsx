import Link from "next/link";
import type { Metadata } from "next";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy | Krav Maga Putignano",
  description:
    "Informativa sull'uso dei cookie, redatta in conformità con le Linee guida del Garante per la protezione dei dati personali (10 giugno 2021). Tipologie di cookie, finalità e gestione del consenso.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://kravmagaputignano.it/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
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
        <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-display mb-12">
          Ultimo aggiornamento: {LEGAL_LAST_UPDATED}
        </p>

        <Section title="Cosa sono i cookie">
          <p>
            I cookie sono piccoli file di testo che i siti visitati inviano al
            terminale dell&apos;utente, dove vengono memorizzati per essere ritrasmessi
            agli stessi siti alla successiva visita. I cookie possono essere installati
            dal sito che si sta visitando (cookie di prima parte) o da siti diversi
            (cookie di terze parti).
          </p>
        </Section>

        <Section title="Tipologie di cookie utilizzati">
          <p>Questo sito utilizza esclusivamente le seguenti tipologie di cookie:</p>

          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-[#CC0000] mt-4 mb-2">
            Cookie tecnici (necessari)
          </h3>
          <p>
            Indispensabili per il corretto funzionamento del sito. Non richiedono il
            consenso dell&apos;utente ai sensi dell&apos;art. 122 del D.lgs. 196/2003.
          </p>

          <div className="overflow-x-auto mt-3">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipologia</th>
                  <th>Finalità</th>
                  <th>Durata</th>
                  <th>Fornitore</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>km-cookie-consent</td>
                  <td>Tecnico / prima parte</td>
                  <td>Memorizzare la scelta di consenso cookie</td>
                  <td>12 mesi</td>
                  <td>kravmagaputignano.it</td>
                </tr>
                <tr>
                  <td>__next*</td>
                  <td>Tecnico / prima parte</td>
                  <td>Funzionamento framework Next.js (sessione, routing)</td>
                  <td>Sessione / breve</td>
                  <td>kravmagaputignano.it</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-[#CC0000] mt-8 mb-2">
            Cookie analitici
          </h3>
          <p>
            Al momento <strong>non sono attivi</strong> cookie analitici. Qualora in
            futuro venissero attivati (es. Google Analytics 4 in modalità anonimizzata
            o Plausible), sarà richiesto il consenso esplicito e questa pagina verrà
            aggiornata prima dell&apos;attivazione.
          </p>

          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-[#CC0000] mt-8 mb-2">
            Cookie di marketing / profilazione
          </h3>
          <p>
            Al momento <strong>non sono attivi</strong> cookie di marketing. Qualora in
            futuro venissero attivati (es. Meta Pixel, Google Ads, LinkedIn Insight),
            sarà richiesto il consenso esplicito e questa pagina verrà aggiornata prima
            dell&apos;attivazione.
          </p>
        </Section>

        <Section title="Come gestire i cookie">
          <p>
            In aggiunta ai comandi del banner cookie, l&apos;utente può gestire le
            preferenze tramite le impostazioni del proprio browser. Qui i link alle
            guide ufficiali:
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CC0000] hover:underline"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CC0000] hover:underline"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CC0000] hover:underline"
              >
                Apple Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/it-it/microsoft-edge/delete-cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CC0000] hover:underline"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>
        </Section>

        <Section title="Titolare del trattamento">
          <p>
            Per qualsiasi informazione relativa al trattamento dei dati personali si
            rinvia alla{" "}
            <Link href="/privacy-policy" className="text-[#CC0000] hover:underline">
              Privacy Policy
            </Link>{" "}
            e ai contatti del Titolare ivi indicati.
          </p>
        </Section>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs">
          <Link
            href="/privacy-policy"
            className="font-display uppercase tracking-[0.2em] text-[#CC0000] hover:text-white transition-colors"
          >
            Privacy Policy →
          </Link>
          <Link
            href="/"
            className="font-display uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
          >
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
