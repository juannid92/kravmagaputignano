import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbList } from "@/components/BreadcrumbList";
import { sedi } from "@/lib/sedi";

export const metadata: Metadata = {
  title: "Sedi Krav Maga | Putignano e Conversano",
  description:
    "Le nostre sedi di Krav Maga a Putignano (Palestra Joy Fit) e Conversano (Palestra Imperial Gym). Orari, indirizzi e contatti per corsi adulti e bambini.",
  alternates: { canonical: "https://www.difesapersonalekravmaga.it/sedi" },
  openGraph: {
    title: "Sedi Krav Maga Putignano e Conversano",
    description:
      "Due sedi nel sud-est barese per i tuoi corsi di Krav Maga. Trova orari, mappe e contatti.",
    type: "website",
    locale: "it_IT",
    images: [
      {
        url: "https://www.difesapersonalekravmaga.it/images/hero-istruttori.jpg",
        width: 1200,
        height: 800,
        alt: "Sedi Krav Maga Putignano e Conversano — Team SSD Global Defender",
      },
    ],
  },
};

export default function SediHubPage() {
  return (
    <>
      <BreadcrumbList
        items={[
          { name: "Home", url: "https://www.difesapersonalekravmaga.it" },
          { name: "Sedi", url: "https://www.difesapersonalekravmaga.it/sedi" },
        ]}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-20">
        <section className="px-4 max-w-5xl mx-auto">
          <h1 className="font-[family-name:var(--font-next-marcellus)] text-4xl md:text-5xl text-center mb-6">
            LE NOSTRE SEDI
          </h1>
          <p className="text-center text-lg text-white/70 max-w-2xl mx-auto mb-16">
            Due palestre nel sud-est barese, un unico metodo certificato FederKravMaga.
            Scegli la sede più vicina a te e prenota la tua prima lezione gratuita.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {sedi.map((sede) => (
              <Link
                key={sede.slug}
                href={`/sedi/${sede.slug}`}
                className="group block bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-red-500/50 transition-colors"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={sede.foto[0]}
                    alt={`${sede.nomePalestra} — ${sede.comune}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h2 className="font-[family-name:var(--font-next-marcellus)] text-2xl text-white">
                      {sede.comune}
                    </h2>
                    <p className="text-white/80 text-sm">{sede.nomePalestra}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                    {sede.introBreve}
                  </p>

                  <div className="space-y-2">
                    <h3 className="text-xs uppercase tracking-widest text-red-500 font-semibold">
                      Orari Adulti
                    </h3>
                    <ul className="text-sm text-white/80 space-y-1">
                      {sede.orariAdulti.map((o) => (
                        <li key={`${o.giorno}-${o.ora}`}>
                          {o.giorno}: {o.ora}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs uppercase tracking-widest text-red-500 font-semibold">
                      Orari Bambini
                    </h3>
                    <ul className="text-sm text-white/80 space-y-1">
                      {sede.orariBambini.map((o) => (
                        <li key={`${o.giorno}-${o.ora}`}>
                          {o.giorno}: {o.ora}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-white/50">{sede.indirizzo}</span>
                    <span className="text-sm text-red-500 font-semibold group-hover:translate-x-1 transition-transform">
                      Scopri di più →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}