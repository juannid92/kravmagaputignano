import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NonSport } from "@/components/NonSport";
import { GalleriaHome } from "@/components/GalleriaHome";
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-6 py-12 bg-background">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-[3/4] bg-surface rounded-lg border border-foreground/10 flex items-center justify-center"
          >
            <span className="text-foreground/20 text-sm font-body">Immagine {i}</span>
          </div>
        ))}
      </div>
      <Percorsi />
      <Sedi />
      <Maestro />
      <FAQ />
      <Chiusura />
      <Footer />
    </main>
  );
}
