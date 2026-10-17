import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL, LEGAL_LAST_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Termini & Condizioni | Krav Maga Putignano",
  description:
    "Termini e condizioni di iscrizione ai corsi di Krav Maga Putignano e Conversano: iscrizione, recessi, pagamenti, regole di comportamento e foro competente.",
  alternates: { canonical: "https://kravmagaputignano.it/termini" },
};

export default function TerminiPage() {
  return (
    <main className="bg-[#0A0A0A] text-white pt-32 sm:pt-40 pb-20 sm:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-[#CC0000] font-display text-xs tracking-[0.3em] uppercase hover:text-[#FF3D00] transition-colors inline-flex items-center gap-2 mb-8"
        >
          ← Torna alla home
        </Link>

        <span className="text-[#D4AF37] font-display text-xs tracking-[0.4em] uppercase block mb-3">
          Note Legali
        </span>
        <h1 className="font-stencil text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-[0.95]">
          TERMINI &amp; CONDIZIONI
        </h1>
        <div
          aria-hidden
          className="h-[2px] w-20 mb-10"
          style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }}
        />

        <div className="rounded-sm border border-[#FF3D00]/30 bg-[#FF3D00]/5 p-4 sm:p-5 mb-12">
          <p className="text-[#FF3D00] font-display text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-2">
            Avviso
          </p>
          <p className="text-white/70 text-sm font-body leading-relaxed">
            Questa pagina è un{" "}
            <strong className="text-white">template di partenza</strong>. Il
            testo definitivo deve essere{" "}
            <strong className="text-white">riveduto e validato da un legale</strong>{" "}
            prima della pubblicazione. Le clausole seguenti coprono i punti
            essenziali ma vanno personalizzate sulla base della struttura
            societaria e delle condizioni reali.
          </p>
        </div>

        <Section number="01" title="Titolare del servizio">
          <p>
            Il servizio di insegnamento è erogato da{" "}
            <strong>{LEGAL.legalName}</strong>, con sede legale in{" "}
            <strong>{LEGAL.registeredOffice}</strong>
            {LEGAL.vatId || LEGAL.taxId ? (
              <>, P.IVA / C.F. <strong>{LEGAL.vatId || LEGAL.taxId}</strong></>
            ) : null}
            {LEGAL.rea ? <> , REA <strong>{LEGAL.rea}</strong> — Bari</> : null}
            {LEGAL.shareCapital ? (
              <>, capitale sociale <strong>{LEGAL.shareCapital}</strong></>
            ) : null}
            .
          </p>
        </Section>

        <Section number="02" title="Oggetto">
          <p>
            I presenti termini disciplinano l&apos;iscrizione e la partecipazione
            ai corsi di Krav Maga organizzati dal Titolare presso le sedi di
            Putignano (Via G. Leopardi, 56 — Palestra Joy Fit) e Conversano (Via M. La Volpe, 32 — Palestra Imperial Gym).
          </p>
        </Section>

        <Section number="03" title="Iscrizione e quota">
          <p>
            L&apos;iscrizione si perfeziona con il pagamento della quota
            mensile/trimestrale e la sottoscrizione del modulo di adesione. Le
            quote sono dovute per intero indipendentemente dalla frequenza
            effettiva. Eventuali riduzioni o sospensioni vanno concordate
            preventivamente con la segreteria.
          </p>
        </Section>

        <Section number="04" title="Recesso">
          <p>
            L&apos;allievo può recedere in qualsiasi momento con comunicazione
            scritta (email) entro il giorno 25 del mese in corso, con effetto
            dal mese successivo. La quota del mese in cui viene comunicato il
            recesso è comunque dovuta per intero.
          </p>
          <p>
            Ai sensi del Codice del Consumo (D.lgs 206/2005), il diritto di
            recesso entro 14 giorni si applica solo alle iscrizioni sottoscritte
            fuori dai locali commerciali o a distanza.
          </p>
        </Section>

        <Section number="05" title="Certificato medico">
          <p>
            È richiesto un certificato medico di idoneità alla pratica sportiva
            non agonistica (o agonistica, secondo i casi) in corso di validità.
            L&apos;allievo è tenuto a consegnarne copia alla segreteria prima
            della prima lezione utile.
          </p>
        </Section>

        <Section number="06" title="Regole di comportamento">
          <p>
            L&apos;allievo si impegna a rispettare le regole della palestra, le
            indicazioni dell&apos;istruttore, gli altri allievi. Il Titolare si
            riserva il diritto di allontanare senza rimborso chi tenga
            comportamenti pericolosi, offensivi o lesivi dell&apos;altrui
            incolumità.
          </p>
        </Section>

        <Section number="07" title="Limitazioni di responsabilità">
          <p>
            La pratica del Krav Maga comporta rischi intrinseci. L&apos;allievo
            dichiara di parteciparvi consapevolmente, sollevando il Titolare da
            ogni responsabilità per lesioni derivanti da condotta volontaria,
            imprudenza o mancata osservanza delle indicazioni dell&apos;istruttore.
          </p>
        </Section>

        <Section number="08" title="Dati personali">
          <p>
            Il trattamento dei dati personali è disciplinato dalla{" "}
            <Link
              href="/privacy-policy"
              className="text-[#FF3D00] underline hover:text-[#FF5520]"
            >
              Privacy Policy
            </Link>
            , che l&apos;allievo dichiara di aver letto e accettato.
          </p>
        </Section>

        <Section number="09" title="Modifiche">
          <p>
            Il Titolare si riserva di modificare orari, programmi e regolamento
            per esigenze organizzative, con preavviso di almeno 7 giorni. Le
            modifiche sostanziali danno diritto al recesso senza penali.
          </p>
        </Section>

        <Section number="10" title="Foro competente">
          <p>
            Per ogni controversia è competente in via esclusiva il Foro di
            <strong> Bari</strong>, salvo norme inderogabili a tutela del
            consumatore.
          </p>
        </Section>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs font-body">
            Ultimo aggiornamento: {LEGAL_LAST_UPDATED}
          </p>
        </div>
      </div>

      <style>{`
        section.termini-section + section.termini-section { margin-top: 2.5rem; }
      `}</style>
    </main>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="termini-section">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-stencil text-[#FF3D00] text-3xl leading-none">
          {number}
        </span>
        <h2 className="font-stencil text-white text-xl sm:text-2xl tracking-wider">
          {title.toUpperCase()}
        </h2>
      </div>
      <div
        aria-hidden
        className="h-px w-12 mb-4"
        style={{ background: "#FF3D00", boxShadow: "0 0 12px rgba(255,61,0,0.6)" }}
      />
      <div className="text-white/70 text-[15px] font-body leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
