import { jsx, jsxs } from "react/jsx-runtime";
function AccordPage({ data }) {
  return /* @__PURE__ */ jsx("article", { className: "mx-auto max-w-7xl px-0 lg:px-8 py-0 lg:py-16", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 lg:gap-16 lg:items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "relative h-[55vh] sm:h-[65vh] lg:h-auto lg:sticky lg:top-28 lg:self-start", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full lg:aspect-[4/5] overflow-hidden lg:rounded-sm", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: data.image,
          alt: data.imageAlt,
          width: 1280,
          height: 1600,
          loading: "lazy",
          className: "absolute inset-0 w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "absolute inset-0",
          style: {
            background: "linear-gradient(180deg, color-mix(in oklab, var(--navy) 55%, transparent) 0%, color-mix(in oklab, var(--navy) 70%, transparent) 100%)"
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "absolute inset-0 lg:hidden",
          style: {
            background: "linear-gradient(180deg, transparent 55%, var(--navy) 100%)"
          }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 sm:px-10 lg:px-0 -mt-20 lg:mt-0 relative", children: [
      /* @__PURE__ */ jsxs("header", { className: "fade-in", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs uppercase tracking-[0.5em] text-gold/60", children: data.eyebrow }),
        /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl sm:text-6xl mt-5 text-gold", children: data.title }),
        /* @__PURE__ */ jsx("p", { className: "font-display italic text-base sm:text-lg mt-3 text-gold/70", children: data.subtitle }),
        /* @__PURE__ */ jsx("div", { className: "gold-divider w-20 mt-8" })
      ] }),
      /* @__PURE__ */ jsx(Section, { title: "Descrição", delay: 1, children: /* @__PURE__ */ jsx("p", { className: "font-display italic text-lg sm:text-xl leading-relaxed text-gold/90", children: data.poetic }) }),
      /* @__PURE__ */ jsx(Section, { title: "Proposta", delay: 1, children: /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base leading-relaxed text-gold/85", children: data.proposal }) }),
      /* @__PURE__ */ jsx(Section, { title: "Pirâmide Olfativa", delay: 2, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6 mt-2", children: [
        /* @__PURE__ */ jsx(Pyramid, { label: "Topo", notes: data.pyramid.top }),
        /* @__PURE__ */ jsx(Pyramid, { label: "Coração", notes: data.pyramid.heart }),
        /* @__PURE__ */ jsx(Pyramid, { label: "Fundo", notes: data.pyramid.base })
      ] }) }),
      data.technicalNote && /* @__PURE__ */ jsx(Section, { title: "Nota Técnica", delay: 3, children: /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gold/75 italic", children: data.technicalNote }) }),
      data.use && /* @__PURE__ */ jsx(Section, { title: "Modo de Uso", delay: 3, children: /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gold/85", children: data.use }) })
    ] })
  ] }) });
}
function Section({
  title,
  children,
  delay
}) {
  return /* @__PURE__ */ jsxs("section", { className: `mt-12 fade-in fade-in-delay-${delay}`, children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-5", children: [
      "— ",
      title
    ] }),
    children
  ] });
}
function Pyramid({ label, notes }) {
  return /* @__PURE__ */ jsxs("div", { className: "hairline rounded-sm p-6 sm:p-8 bg-deep-black/60", children: [
    /* @__PURE__ */ jsx("p", { className: "font-display text-xl sm:text-2xl text-gold mb-4", children: label }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-2.5", children: notes.map((n) => /* @__PURE__ */ jsxs("li", { className: "text-sm sm:text-[15px] text-gold/85 leading-relaxed", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-gold", children: [
        "• ",
        n.name
      ] }),
      n.detail && /* @__PURE__ */ jsxs("span", { className: "text-gold/60 italic", children: [
        " — ",
        n.detail
      ] })
    ] }, n.name)) })
  ] });
}
export {
  AccordPage as A
};
