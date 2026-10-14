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

export default function Home() {
  return (
    <main>
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
