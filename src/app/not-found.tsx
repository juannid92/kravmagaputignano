import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <span className="text-[#D4AF37] font-display text-xs tracking-[0.4em] uppercase block mb-3">
          Errore 404
        </span>
        <h1 className="font-stencil text-6xl sm:text-7xl md:text-8xl text-white mb-6 leading-[0.95]">
          PAGINA
          <br />
          <span className="text-[#FF3D00]">NON TROVATA</span>
        </h1>
        <div
          aria-hidden
          className="mx-auto h-[2px] w-24 mb-8"
          style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }}
        />
        <p className="text-white/65 text-base sm:text-lg font-body mb-10">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#FF3D00] text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 hover:bg-[#FF5520] transition-colors"
        >
          Torna alla home
        </Link>
      </div>
    </main>
  );
}
