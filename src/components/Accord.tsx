import type { ReactNode } from "react";

interface Note {
  name: string;
  detail?: string;
}

export interface AccordData {
  eyebrow: string;
  title: string;
  subtitle: string;
  proposal: string;
  pyramid: {
    top: Note[];
    heart: Note[];
    base: Note[];
  };
  technicalNote?: string;
  use?: string;
}

export function AccordPage({ data }: { data: AccordData }) {
  return (
    <article className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
      <header className="text-center fade-in">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-gold/60">
          {data.eyebrow}
        </p>
        <h2 className="font-display text-4xl sm:text-6xl mt-5 text-gold">
          {data.title}
        </h2>
        <p className="font-display italic text-base sm:text-lg mt-3 text-gold/70">
          {data.subtitle}
        </p>
        <div className="gold-divider w-20 mx-auto mt-8" />
      </header>

      <Section title="Proposta" delay={1}>
        <p className="text-sm sm:text-base leading-relaxed text-gold/85">
          {data.proposal}
        </p>
      </Section>

      <Section title="Pirâmide Olfativa" delay={2}>
        <div className="space-y-8 mt-2">
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
    <section className={`mt-14 fade-in fade-in-delay-${delay}`}>
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
