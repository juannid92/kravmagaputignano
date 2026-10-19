import Link from "next/link";
import type { Metadata } from "next";
import { LEGAL, LEGAL_LAST_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Krav Maga Putignano",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) e del D.lgs. 196/2003 come modificato dal D.lgs. 101/2018. Titolare: SSD Global Defender Srl.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://kravmagaputignano.it/privacy-policy" },
};

export default function PrivacyPolicyPage() {
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
          Ultimo aggiornamento: {LEGAL_LAST_UPDATED}
        </p>

        <Section title="1. Titolare del trattamento">
          <p>
            Il Titolare del trattamento dei dati personali è{" "}
            <strong>{LEGAL.legalName}</strong>, con sede legale in{" "}
            <strong>{LEGAL.registeredOffice}</strong>
            {LEGAL.vatId || LEGAL.taxId ? (
              <>, C.F. / P.IVA <strong>{LEGAL.vatId || LEGAL.taxId}</strong></>
            ) : null}
            , contatto e-mail <strong>{LEGAL.email}</strong>, telefono{" "}
            <strong>{LEGAL.phone}</strong>.
          </p>
          <p>
            Eventuale Responsabile della Protezione dei Dati (DPO / RPD):{" "}
            <strong>Non nominato</strong>.
          </p>
        </Section>

        <Section title="2. Tipologie di dati trattati">
          <ul>
            <li>
              <strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser,
              sistema operativo, pagine visitate, durata della visita. Rilevati in
              forma anonima e aggregata dai log del server.
            </li>
            <li>
              <strong>Dati forniti volontariamente:</strong> nome, cognome, email,
              numero di telefono, età ed eventuali note inseriti nei moduli di
              contatto o nella richiesta di lezione di prova.
            </li>
            <li>
              <strong>Cookie:</strong> come descritto nella{" "}
              <Link href="/cookie-policy" className="text-[#CC0000] hover:underline">
                Cookie Policy
              </Link>
              .
            </li>
          </ul>
        </Section>

        <Section title="3. Finalità e basi giuridiche del trattamento">
          <table>
            <thead>
              <tr>
                <th>Finalità</th>
                <th>Base giuridica</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Risposta a richieste tramite modulo contatti / WhatsApp</td>
                <td>Esecuzione di misure precontrattuali (art. 6.1.b GDPR)</td>
              </tr>
              <tr>
                <td>Gestione amministrativa e fiscale dell&apos;iscrizione</td>
                <td>Esecuzione del contratto / obblighi di legge (art. 6.1.b/c)</td>
              </tr>
              <tr>
                <td>Invio di comunicazioni promozionali / newsletter</td>
                <td>Consenso esplicito (art. 6.1.a GDPR)</td>
              </tr>
              <tr>
                <td>Sicurezza del sito e prevenzione frodi</td>
                <td>Legittimo interesse (art. 6.1.f GDPR)</td>
              </tr>
              <tr>
                <td>Adempimenti contabili e fiscali</td>
                <td>Obbligo di legge (art. 6.1.c GDPR)</td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section title="4. Modalità del trattamento e tempi di conservazione">
          <p>
            I dati sono trattati con strumenti elettronici e cartacei, da personale
            autorizzato, con logiche strettamente correlate alle finalità indicate e
            nel rispetto delle misure di sicurezza previste dall&apos;art. 32 GDPR.
          </p>
          <p>
            Tempi di conservazione: <strong>10 anni</strong> per i dati contabili;
            <strong> fino a 24 mesi</strong> per i dati di marketing;{" "}
            <strong>per la sola durata del contatto</strong> per le richieste non
            seguite da iscrizione.
          </p>
        </Section>

        <Section title="5. Cookie">
          <p>
            Per i dettagli sui cookie utilizzati dal sito si rinvia alla{" "}
            <Link href="/cookie-policy" className="text-[#CC0000] hover:underline">
              Cookie Policy
            </Link>
            , redatta in conformità con le Linee guida cookie e altri tracciatori del
            Garante per la protezione dei dati personali (10 giugno 2021).
          </p>
        </Section>

        <Section title="6. Conferimento dei dati">
          <p>
            Il conferimento dei dati per le finalità contrattuali e di legge è
            necessario; l&apos;eventuale rifiuto comporta l&apos;impossibilità di
            dare seguito alla richiesta. Il conferimento per finalità di marketing è
            facoltativo e non pregiudica la fruizione dei servizi.
          </p>
        </Section>

        <Section title="7. Destinatari e trasferimenti">
          <p>
            I dati possono essere comunicati a soggetti esterni che operano come
            Responsabili del trattamento (art. 28 GDPR), tra cui: provider di
            hosting, servizi email, consulenti fiscali e legali, fornitori di servizi
            di pagamento. L&apos;elenco aggiornato è disponibile su richiesta.
          </p>
          <p>
            Eventuali trasferimenti extra-SEE avvengono solo sulla base di decisioni
            di adeguatezza o di garanzie adeguate (clausole contrattuali standard).
          </p>
        </Section>

        <Section title="8. Diritti dell'interessato (artt. 15-22 GDPR)">
          <p>In qualità di interessato hai il diritto di:</p>
          <ul>
            <li>ottenere l&apos;accesso ai tuoi dati personali (art. 15);</li>
            <li>chiedere la rettifica o l&apos;integrazione (art. 16);</li>
            <li>chiedere la cancellazione (&quot;diritto all&apos;oblio&quot;, art. 17);</li>
            <li>ottenere la limitazione del trattamento (art. 18);</li>
            <li>ricevere i dati in formato strutturato e portabile (art. 20);</li>
            <li>opporti al trattamento (art. 21);</li>
            <li>
              revocare il consenso in qualsiasi momento (art. 7.3) senza pregiudicare
              la liceità del trattamento basato sul consenso prima della revoca.
            </li>
          </ul>
          <p>
            Per esercitare questi diritti puoi scrivere a{" "}
            <strong>{LEGAL.email}</strong>. La richiesta verrà
            evasa entro 30 giorni dalla ricezione.
          </p>
        </Section>

        <Section title="9. Reclamo all'Autorità di controllo">
          <p>
            Hai inoltre il diritto di proporre reclamo all&apos;Autorità di controllo
            (Garante per la protezione dei dati personali —{" "}
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CC0000] hover:underline"
            >
              www.garanteprivacy.it
            </a>
            ), come previsto dall&apos;art. 77 GDPR.
          </p>
        </Section>

        <Section title="10. Modifiche">
          <p>
            Eventuali modifiche all&apos;informativa saranno pubblicate su questa
            pagina. Si invita a consultarla periodicamente.
          </p>
        </Section>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs">
          <Link
            href="/cookie-policy"
            className="font-display uppercase tracking-[0.2em] text-[#CC0000] hover:text-white transition-colors"
          >
            Cookie Policy →
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
