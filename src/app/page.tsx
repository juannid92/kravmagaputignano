import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NonSport } from "@/components/NonSport";
import { Pilastri } from "@/components/Pilastri";
import { GalleriaHome } from "@/components/GalleriaHome";
import { VideoShowcase } from "@/components/VideoShowcase";
import { Percorsi } from "@/components/Percorsi";
import { Sedi } from "@/components/Sedi";
import { Maestro } from "@/components/Maestro";
import { FAQ } from "@/components/FAQ";
import { Chiusura } from "@/components/Chiusura";
import { Footer } from "@/components/Footer";

import { faqs } from "@/lib/faqs";
import { instructorJsonLd } from "@/lib/legal";

export default function Home() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(instructorJsonLd()) }}
      />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <NonSport />
        <Pilastri />
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
