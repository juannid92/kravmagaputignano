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

import { faqs } from "@/lib/faqs";

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <NonSport />
        <GalleriaHome />
        <VideoShowcase />
        <Percorsi />
        <Sedi />
        <Maestro />
        <FAQ />
        <Chiusura />
      </main>
      <Footer />
    </>
  );
}
