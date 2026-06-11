import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
const accords = [{
  to: "/floral",
  label: "Floral",
  desc: "Conforto e acolhimento"
}, {
  to: "/natureza",
  label: "Natureza",
  desc: "Aterramento e calma"
}, {
  to: "/gourmand",
  label: "Gourmand",
  desc: "Memória e nostalgia"
}, {
  to: "/fougere",
  label: "Fougère",
  desc: "Clareza e foco"
}];
function Home() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("section", { className: "min-h-[80vh] flex items-center justify-center px-6 py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "fade-in text-[10px] sm:text-xs uppercase tracking-[0.5em] text-gold/60", children: "Aromacologia · Memória Afetiva" }),
      /* @__PURE__ */ jsxs("h2", { className: "fade-in fade-in-delay-1 font-display italic text-3xl sm:text-5xl md:text-6xl leading-[1.15] mt-8 text-gold", children: [
        '"Sentir um cheiro não é apenas uma sensação.',
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "not-italic", children: "É reviver." }),
        '"'
      ] }),
      /* @__PURE__ */ jsx("div", { className: "fade-in fade-in-delay-2 gold-divider w-24 mx-auto mt-12" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 pb-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-6", children: "— Manifesto" }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg leading-relaxed text-gold/85 font-light", children: "A Liech une o rigor técnico farmacêutico à sensibilidade da perfumaria artesanal. Nossas fragrâncias são pontes para quem já foi, formuladas para proporcionar conforto, aterramento e memória afetiva." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 pb-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-10", children: "— Os Acordes" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: accords.map((a) => /* @__PURE__ */ jsxs(Link, { to: a.to, className: "group hairline rounded-sm p-8 bg-deep-black/50 hover:bg-deep-black transition-colors block", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-gold/50 group-hover:text-gold/70", children: "Acorde" }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl sm:text-4xl mt-2 text-gold", children: a.label }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gold/70 mt-3 font-light", children: a.desc }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-gold/50 mt-6 group-hover:text-gold transition-colors", children: "Descobrir →" })
      ] }, a.to)) })
    ] }) })
  ] });
}
export {
  Home as component
};
