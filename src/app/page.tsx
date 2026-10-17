import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NonSport } from "@/components/NonSport";
import { GalleriaHome } from "@/components/GalleriaHome";
import { VideoShowcase } from "@/components/VideoShowcase";
import { Percorsi } from "@/components/Percorsi";
import { Sedi } from "@/components/Sedi";
import { Maestro } from "@/components/Maestro";
import { FAQ } from "@/components/FAQ";
import { Chiusura } from "@/components/Chiusura";
import { Footer } from "@/components/Footer";

// Mirrors the 6 Q&A in src/components/FAQ.tsx. The FAQ component is a
// client component; the JSON-LD must be authored in this server module
// so it appears in the static export. Kept in sync by hand; both arrays
// must hold the same Q&A.
const faqs = [
  {
    question: "Devo essere già allenato per iniziare?",
    answer:
      "Assolutamente no. Il Krav Maga è accessibile a tutti, indipendentemente dal livello di forma fisica. Gli allenamenti partono dalle basi e si adattano al tuo livello. Molti dei nostri allievi principianti non avevano mai praticato arti marziali prima.",
  },
  {
    question: "Da che età possono iscriversi i bambini?",
    answer:
      "Accogliamo bambini a partire dai 6 anni. Per i più piccoli abbiamo un programma specifico che privilegia la consapevolezza, il rispetto e le tecniche di evitamento, senza mai ricorrere al contatto diretto tra allievi.",
  },
  {
    question: "Cosa devo portare alla prima lezione?",
    answer:
      "Solo abbigliamento sportivo comodo: tuta, maglietta, pantaloncini. Puoi venire con le normali scarpe da ginnastica per la prima lezione. Ti forniremo noi tutto il resto. Non serve acquistare divise o attrezzature in anticipo.",
  },
  {
    question: "Il Krav Maga può essere pericoloso per un bambino?",
    answer:
      "Il Krav Maga per bambini è completamente diverso da quello per adulti. Non c'è contatto agonistico, nessuna tecnica traumatica. L'obiettivo è costruire fiducia, disciplina e consapevolezza. Ogni esercitazione è supervisionata direttamente dall'istruttore.",
  },
  {
    question: "Quanto costa l'iscrizione?",
    answer:
      "La quota mensile è di 60€ per un corso singolo (adulti o bambini) e 90€ per chi frequenta entrambi. La quota è agevolata per nuclei familiari con più iscritti. Contattaci per ricevere il tariffario completo senza impegno.",
  },
  {
    question: "Posso provare prima di iscrivermi?",
    answer:
      "Certo. La prima lezione è sempre gratuita e senza impegno. Vieni a provare, conosci l'istruttore, senti l'ambiente e poi decidi. Non ci sono pressioni commerciali: il nostro obiettivo è che tu ti trovi bene, non che tu firmi subito.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <Hero />
      <NonSport />
      <GalleriaHome />
      <VideoShowcase />
      <Percorsi />
      <Sedi />
      <Maestro />
      <FAQ />
      <Chiusura />
      <Footer />
    </main>
  );
}
