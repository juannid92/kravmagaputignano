import Link from "next/link";
import type { Metadata } from "next";
import { LEGAL } from "@/lib/legal";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

const UPDATED = "22 ottobre 2026";

export const metadata: Metadata = {
  title: "Privacy Policy | Krav Maga Putignano",
  description:
    "Informativa sul trattamento dei dati personali ai sensi degli artt. 13-14 del Regolamento UE 2016/679 (GDPR) e del D.lgs. 196/2003 come modificato dal D.lgs. 101/2018. Titolare: SSD Global Defender Srl.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://kravmagaputignano.it/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const fiscalId = LEGAL.vatId || LEGAL.taxId;
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-block text-[#CC0000] font-display text-xs tracking-[0.3em] uppercase hover:text-white transition-colors mb-8"
        >
          ← Torna al sito
        </Link>

        <h1 className="font-stencil text-4xl sm:text-5xl text-white tracking-wider mb-3">
          PRIVACY POLICY
        </h1>
        <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-display mb-12">
          Informativa ai sensi degli artt. 13-14 GDPR — Ultimo aggiornamento: {UPDATED}
        </p>

        <Section title="1. Titolare del trattamento">
          <p>
            Il Titolare del trattamento è <strong>{LEGAL.legalName}</strong>, con sede legale in{" "}
            <strong>{LEGAL.registeredOffice}</strong>
            {fiscalId ? (
              <>
                , C.F. / P.IVA <strong>{fiscalId}</strong>
              </>
            ) : null}
            , e-mail <strong>{LEGAL.email}</strong>
            {LEGAL.pec ? (
              <>
                , PEC <strong>{LEGAL.pec}</strong>
              </>
            ) : null}
            , telefono <strong>{LEGAL.phone}</strong>.
          </p>
          <p>
            Responsabile della protezione dei dati (DPO/RPD): <strong>non nominato</strong>, non
            ricorrendone gli obblighi di legge.
          </p>
        </Section>

        <Section title="2. Quali dati trattiamo">
          <ul>
            <li>
              <strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser e dispositivo,
              pagine visitate, data e ora. Sono generati dai server del fornitore di hosting/CDN per
              il funzionamento e la sicurezza del sito.
            </li>
            <li>
              <strong>Dati che ci fornisci tu:</strong> se ci contatti per telefono, WhatsApp o
              e-mail (ad es. per una lezione di prova), trattiamo i dati che ci comunichi: nome,
              recapito, età dell&apos;allievo e il contenuto del messaggio. Il sito non contiene
              moduli di raccolta dati.
            </li>
            <li>
              <strong>Mappe Google:</strong> solo se acconsenti, Google può ricevere il tuo indirizzo
              IP e installare cookie (vedi{" "}
              <Link href="/cookie-policy" className="text-[#FF4D4D] underline hover:text-white">
                Cookie Policy
              </Link>
              ).
            </li>
            <li>
              <strong>Iscrizione ai corsi (fuori dal sito):</strong> con l&apos;iscrizione vengono
              raccolti dati anagrafici e di contatto, il certificato medico di idoneità sportiva (dato
              relativo alla salute, art. 9 GDPR) e, per i minori, i dati di chi esercita la
              responsabilità genitoriale. Al momento dell&apos;iscrizione è fornita un&apos;informativa
              dedicata e, se necessario, richiesto il consenso.
            </li>
          </ul>
        </Section>

        <Section title="3. Finalità e basi giuridiche">
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Finalità</th>
                  <th>Base giuridica</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rispondere alle tue richieste di informazioni e di lezione di prova</td>
                  <td>Misure precontrattuali su tua richiesta (art. 6.1.b GDPR)</td>
                </tr>
                <tr>
                  <td>Gestione dell&apos;iscrizione e del rapporto con l&apos;allievo</td>
                  <td>Esecuzione del contratto (art. 6.1.b)</td>
                </tr>
                <tr>
                  <td>Adempimenti amministrativi, contabili e fiscali</td>
                  <td>Obbligo di legge (art. 6.1.c)</td>
                </tr>
                <tr>
                  <td>Certificato medico di idoneità sportiva</td>
                  <td>Obbligo di legge / consenso esplicito dove richiesto (art. 9.2.a GDPR)</td>
                </tr>
                <tr>
                  <td>Funzionamento e sicurezza del sito, prevenzione abusi</td>
                  <td>Legittimo interesse (art. 6.1.f)</td>
                </tr>
                <tr>
                  <td>Caricamento di contenuti di terze parti (mappe Google)</td>
                  <td>Consenso (art. 6.1.a GDPR e art. 122 D.lgs. 196/2003), revocabile in ogni momento</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Non inviamo comunicazioni promozionali senza un tuo consenso specifico e non adottiamo
            processi decisionali automatizzati o di profilazione.
          </p>
        </Section>

        <Section title="4. Conservazione dei dati">
          <ul>
            <li>Dati contabili e fiscali: 10 anni, come previsto dalla legge.</li>
            <li>Richieste di informazioni non seguite da iscrizione: per il tempo necessario a rispondere.</li>
            <li>Dati degli allievi: per la durata del rapporto e, dopo, per i termini di legge.</li>
            <li>
              Dati di navigazione: secondo i tempi di conservazione del fornitore di hosting/CDN.
            </li>
            <li>Preferenze cookie: 6 mesi, poi la scelta viene richiesta nuovamente.</li>
          </ul>
        </Section>

        <Section title="5. Modalità del trattamento">
          <p>
            I dati sono trattati con strumenti elettronici e, ove necessario, cartacei, da personale
            autorizzato e con misure di sicurezza adeguate (art. 32 GDPR).
          </p>
        </Section>

        <Section title="6. Destinatari e trasferimenti extra-UE">
          <p>I dati possono essere comunicati, per quanto necessario alle finalità sopra indicate, a:</p>
          <ul>
            <li>fornitore di hosting e CDN del sito (attualmente Cloudflare), come responsabile del trattamento;</li>
            <li>Google (mappe), solo se hai dato il consenso, come titolare autonomo;</li>
            <li>Meta (WhatsApp, Facebook, Instagram), solo se scegli di contattarci o seguirci su tali servizi, secondo le loro informative;</li>
            <li>consulenti fiscali, legali e assicurativi, federazioni sportive di affiliazione e autorità competenti, quando previsto dalla legge o dal rapporto con l&apos;allievo.</li>
          </ul>
          <p>
            Alcuni di questi fornitori possono trattare dati fuori dallo Spazio Economico Europeo,
            sempre sulla base di una decisione di adeguatezza (ad es. EU-US Data Privacy Framework) o
            di clausole contrattuali standard. I dati non sono diffusi né venduti.
          </p>
        </Section>

        <Section title="7. Minori">
          <p>
            I corsi Kids sono rivolti a bambini dai 6 ai 12 anni. Il sito non è pensato per essere
            usato direttamente da minori di 14 anni: richieste e iscrizioni dei minori sono gestite
            tramite chi esercita la responsabilità genitoriale.
          </p>
        </Section>

        <Section title="8. Conferimento dei dati">
          <p>
            Navigare sul sito non richiede di fornire dati. Per gestire richieste e iscrizioni, i
            dati richiesti sono necessari: senza di essi non possiamo darvi seguito. Il consenso ai
            contenuti di terze parti è facoltativo e non limita l&apos;uso del sito.
          </p>
        </Section>

        <Section title="9. I tuoi diritti (artt. 15-22 GDPR)">
          <ul>
            <li>accesso ai tuoi dati (art. 15);</li>
            <li>rettifica o integrazione (art. 16);</li>
            <li>cancellazione (art. 17);</li>
            <li>limitazione del trattamento (art. 18);</li>
            <li>portabilità dei dati (art. 20);</li>
            <li>opposizione al trattamento basato sul legittimo interesse (art. 21);</li>
            <li>revoca del consenso in qualsiasi momento (art. 7.3), senza pregiudicare la liceità del trattamento precedente.</li>
          </ul>
          <p>
            Per esercitarli scrivi a <strong>{LEGAL.email}</strong>: rispondiamo entro 30 giorni
            dalla richiesta. Puoi revocare il consenso cookie qui:
          </p>
          <div className="mt-3">
            <CookieSettingsButton />
          </div>
        </Section>

        <Section title="10. Reclamo all'Autorità di controllo">
          <p>
            Hai il diritto di proporre reclamo al Garante per la protezione dei dati personali (art.
            77 GDPR):{" "}
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF4D4D] underline hover:text-white"
            >
              www.garanteprivacy.it
            </a>
            .
          </p>
        </Section>

        <Section title="11. Modifiche">
          <p>
            Eventuali modifiche saranno pubblicate su questa pagina con la data di aggiornamento. Ti
            invitiamo a consultarla periodicamente.
          </p>
        </Section>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs">
          <Link href="/cookie-policy" className="font-display uppercase tracking-[0.2em] text-[#FF4D4D] hover:text-white transition-colors">
            Cookie Policy →
          </Link>
          <Link href="/" className="font-display uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
            Torna al sito →
          </Link>
        </div>
      </div>

      <style>{`
        main h2 { font-family: 'Oswald', sans-serif; text-transform: uppercase; letter-spacing: 0.08em; color: #ffffff; font-size: 1.05rem; margin-bottom: 0.75rem; }
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
