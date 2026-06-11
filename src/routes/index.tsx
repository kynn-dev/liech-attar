import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Liech Parfums — Memórias em essência" },
      { name: "description", content: "A Liech une o rigor técnico farmacêutico à sensibilidade da perfumaria artesanal." },
    ],
  }),
  component: Home,
});

const accords = [
  { to: "/floral", label: "Floral", desc: "Conforto e acolhimento" },
  { to: "/natureza", label: "Natureza", desc: "Aterramento e calma" },
  { to: "/gourmand", label: "Gourmand", desc: "Memória e nostalgia" },
  { to: "/fougere", label: "Fougère", desc: "Clareza e foco" },
] as const;

function Home() {
  return (
    <div>
      <section className="min-h-[80vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center">
          <p className="fade-in text-[10px] sm:text-xs uppercase tracking-[0.5em] text-gold/60">
            Aromacologia · Memória Afetiva
          </p>
          <h2 className="fade-in fade-in-delay-1 font-display italic text-3xl sm:text-5xl md:text-6xl leading-[1.15] mt-8 text-gold">
            "Sentir um cheiro não é apenas uma sensação.
            <br />
            <span className="not-italic">É reviver.</span>"
          </h2>
          <div className="fade-in fade-in-delay-2 gold-divider w-24 mx-auto mt-12" />
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-6">
            — Manifesto
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gold/85 font-light">
            A Liech une o rigor técnico farmacêutico à sensibilidade da
            perfumaria artesanal. Nossas fragrâncias são pontes para quem já
            foi, formuladas para proporcionar conforto, aterramento e memória
            afetiva.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-10">
            — Os Acordes
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {accords.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="group hairline rounded-sm p-8 bg-deep-black/50 hover:bg-deep-black transition-colors block"
              >
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold/50 group-hover:text-gold/70">
                  Acorde
                </p>
                <h3 className="font-display text-3xl sm:text-4xl mt-2 text-gold">
                  {a.label}
                </h3>
                <p className="text-sm text-gold/70 mt-3 font-light">{a.desc}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold/50 mt-6 group-hover:text-gold transition-colors">
                  Descobrir →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
