import { cn } from "@/lib/utils";

const pilastri = [
  {
    number: "01",
    title: "SICUREZZA",
    text: "Acquisire sicurezza in se stessi non significa diventare invincibili. Lavorare continuamente sui propri limiti è un ottimo modo per mettersi in discussione e scoprire la propria capacità di far fronte alle difficoltà che la vita ci presenta: che siano un'aggressione o i problemi di tutti i giorni, la chiave è la tenacia.",
  },
  {
    number: "02",
    title: "DURO LAVORO",
    text: "Non sono richiesti particolari requisiti fisici per iniziare, ma il potenziamento è parte fondamentale del percorso. È un vantaggio nel combattimento e un buon corso di difesa personale non può prescindere da una preparazione atletica completa.",
  },
  {
    number: "03",
    title: "CONFRONTO",
    text: "Il lavoro con compagni differenti stimola e fa scoprire diversi aspetti della stessa pratica. Ciascuno di noi ha punti di forza e debolezza: il confronto è fondamentale per crescere insieme.",
  },
  {
    number: "04",
    title: "SIDE SKILLS",
    text: "Avere conoscenza di difesa personale è essenziale per la sicurezza quotidiana e professionale. Il Krav Maga offre preparazione sia fisica sia psichica, con tecniche semplici, intuitive ed efficaci per qualsiasi corporatura.",
  },
  {
    number: "05",
    title: "SU MISURA",
    text: "Le arti marziali e la difesa personale non sono un pacchetto preconfezionato, ma abilità da esplorare e fare proprie in base a necessità, interesse e sensibilità. Un modo concreto ed efficace di avvicinarsi a se stessi.",
  },
];

export function Pilastri() {
  return (
    <section
      id="pilastri"
      data-testid="pilastri"
      aria-labelledby="pilastri-title"
      className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background gradients and tactical subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0A0A0A] via-[#0E0E12] to-[#0A0A0A]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(204,0,0,.12), transparent 70%)",
        }}
      />
      <div className="absolute left-[8%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[#CC0000]/15 to-transparent pointer-events-none" />
      <div className="absolute right-[8%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[#CC0000]/15 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[#D4AF37] font-display text-[11px] sm:text-xs tracking-[0.4em] uppercase block mb-2">
            I 5 PILASTRI
          </span>
          <h2
            id="pilastri-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-[0.95]"
          >
            A COSA SERVE IL KRAV MAGA
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#CC0000] to-transparent mx-auto mt-4" />
        </header>

        {/* 5 Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
          {pilastri.map((item, idx) => (
            <article
              key={item.number}
              data-testid={`pilastro-${item.number}`}
              className={cn(
                "relative bg-gradient-to-b from-[#131318] to-[#0A0A0A] border border-[#CC0000]/25 p-7 sm:p-9 group transition-all duration-300 hover:border-[#CC0000]/60 hover:shadow-[0_0_40px_rgba(204,0,0,0.12)] flex flex-col justify-between overflow-hidden",
                idx < 3
                  ? "md:col-span-1 lg:col-span-2"
                  : "md:col-span-1 lg:col-span-3",
                idx === 4 && "md:col-span-2 lg:col-span-3"
              )}
            >
              {/* Tactical corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#CC0000]/60 group-hover:border-[#CC0000] transition-colors" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#CC0000]/60 group-hover:border-[#CC0000] transition-colors" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#CC0000]/60 group-hover:border-[#CC0000] transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#CC0000]/60 group-hover:border-[#CC0000] transition-colors" />

              {/* Large watermark number in transparency */}
              <span
                className="absolute -top-3 -right-2 font-display text-7xl sm:text-8xl font-bold text-white/[0.04] group-hover:text-[#CC0000]/[0.08] select-none pointer-events-none transition-colors duration-300"
                aria-hidden="true"
              >
                {item.number}
              </span>

              <div className="relative z-10">
                {/* Number & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-sm tracking-[0.3em] text-[#D4AF37]">
                    {item.number}
                  </span>
                  <span className="text-white/20 text-xs">—</span>
                  <h3 className="font-display text-xl sm:text-2xl text-white tracking-wider uppercase">
                    {item.title}
                  </h3>
                </div>

                {/* Accent line */}
                <div className="w-12 h-[2px] bg-gradient-to-r from-[#CC0000] to-transparent mb-5 group-hover:w-20 transition-all duration-300" />

                {/* Official school quote text */}
                <p className="text-white/80 text-sm sm:text-base leading-relaxed font-body">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
