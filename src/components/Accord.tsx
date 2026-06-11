import type { ReactNode } from "react";

interface Note {
  name: string;
  detail?: string;
}

export interface AccordData {
  eyebrow: string;
  title: string;
  subtitle: string;
  poetic: string;
  proposal: string;
  pyramid: {
    top: Note[];
    heart: Note[];
    base: Note[];
  };
  technicalNote?: string;
  use?: string;
  image: string;
  imageAlt: string;
}

export function AccordPage({ data }: { data: AccordData }) {
  return (
    <article className="mx-auto max-w-7xl px-0 lg:px-8 py-0 lg:py-16">
      <div className="grid lg:grid-cols-2 lg:gap-16 lg:items-start">
        {/* Image — top on mobile, sticky left on desktop */}
        <div className="relative h-[55vh] sm:h-[65vh] lg:h-auto lg:sticky lg:top-28 lg:self-start">
          <div className="relative w-full h-full lg:aspect-[4/5] overflow-hidden lg:rounded-sm">
            <img
              src={data.image}
              alt={data.imageAlt}
              width={1280}
              height={1600}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--navy) 55%, transparent) 0%, color-mix(in oklab, var(--navy) 70%, transparent) 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 lg:hidden"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, var(--navy) 100%)",
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-10 lg:px-0 -mt-20 lg:mt-0 relative">
          <header className="fade-in">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-gold/60">
              {data.eyebrow}
            </p>
            <h2 className="font-display text-4xl sm:text-6xl mt-5 text-gold">
              {data.title}
            </h2>
            <p className="font-display italic text-base sm:text-lg mt-3 text-gold/70">
              {data.subtitle}
            </p>
            <div className="gold-divider w-20 mt-8" />
          </header>

          <Section title="Descrição" delay={1}>
            <p className="font-display italic text-lg sm:text-xl leading-relaxed text-gold/90">
              {data.poetic}
            </p>
          </Section>

          <Section title="Proposta" delay={1}>
            <p className="text-sm sm:text-base leading-relaxed text-gold/85">
              {data.proposal}
            </p>
          </Section>

          <Section title="Pirâmide Olfativa" delay={2}>
            <div className="space-y-6 mt-2">
              <Pyramid label="Topo" notes={data.pyramid.top} />
              <Pyramid label="Coração" notes={data.pyramid.heart} />
              <Pyramid label="Fundo" notes={data.pyramid.base} />
            </div>
          </Section>

          {data.technicalNote && (
            <Section title="Nota Técnica" delay={3}>
              <p className="text-sm leading-relaxed text-gold/75 italic">
                {data.technicalNote}
              </p>
            </Section>
          )}

          {data.use && (
            <Section title="Modo de Uso" delay={3}>
              <p className="text-sm leading-relaxed text-gold/85">{data.use}</p>
            </Section>
          )}
        </div>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
  delay,
}: {
  title: string;
  children: ReactNode;
  delay: 1 | 2 | 3;
}) {
  return (
    <section className={`mt-12 fade-in fade-in-delay-${delay}`}>
      <h3 className="text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-5">
        — {title}
      </h3>
      {children}
    </section>
  );
}

function Pyramid({ label, notes }: { label: string; notes: Note[] }) {
  return (
    <div className="hairline rounded-sm p-6 sm:p-8 bg-deep-black/60">
      <p className="font-display text-xl sm:text-2xl text-gold mb-4">{label}</p>
      <ul className="space-y-2.5">
        {notes.map((n) => (
          <li key={n.name} className="text-sm sm:text-[15px] text-gold/85 leading-relaxed">
            <span className="text-gold">• {n.name}</span>
            {n.detail && (
              <span className="text-gold/60 italic"> — {n.detail}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
