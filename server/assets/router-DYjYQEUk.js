import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouterState, Link, Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
const appCss = "/liech-attar/assets/styles-DdUmkm1I.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const navItems = [
  { to: "/", label: "Home" },
  { to: "/floral", label: "Acorde Floral" },
  { to: "/natureza", label: "Acorde Natureza" },
  { to: "/gourmand", label: "Acorde Gourmand" },
  { to: "/fougere", label: "Acorde Fougère" }
];
function Layout() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-background text-foreground", children: [
    /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-5 sm:px-8 pt-5 pb-3 text-center", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-block", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl sm:text-3xl tracking-[0.35em] text-gold", children: "LIECH PARFUMS" }),
        /* @__PURE__ */ jsx("p", { className: "font-display italic text-[11px] sm:text-xs mt-1 text-gold/70 tracking-[0.25em]", children: "Memórias em essência." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-5 sm:px-8 pb-3", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex justify-center gap-10 text-[11px] uppercase tracking-[0.3em]", children: navItems.map((n) => {
          const active = pathname === n.to;
          return /* @__PURE__ */ jsx(
            Link,
            {
              to: n.to,
              className: `pb-1 border-b transition-colors ${active ? "border-gold text-gold" : "border-transparent text-gold/60 hover:text-gold"}`,
              children: n.label
            },
            n.to
          );
        }) }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setOpen(!open),
            "aria-label": "Menu",
            className: "text-gold p-2",
            children: open ? /* @__PURE__ */ jsx(X, { size: 20 }) : /* @__PURE__ */ jsx(Menu, { size: 20 })
          }
        ) })
      ] }),
      open && /* @__PURE__ */ jsx("nav", { className: "md:hidden border-t border-border bg-background", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col", children: navItems.map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Link,
        {
          to: n.to,
          onClick: () => setOpen(false),
          className: "block px-6 py-4 text-xs uppercase tracking-[0.3em] text-gold/80 border-b border-border",
          children: n.label
        }
      ) }, n.to)) }) })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx("footer", { className: "mt-24 border-t border-border bg-deep-black", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 py-12 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "gold-divider mb-8 w-24 mx-auto" }),
      /* @__PURE__ */ jsx("p", { className: "text-[11px] sm:text-xs leading-relaxed text-gold/70 max-w-2xl mx-auto", children: "Composição à base de Caprylic/Capric Triglyceride (TCM). Uso estritamente externo. Evitar contato com os olhos e mucosas. Manter ao abrigo da luz direta, do calor e fora do alcance de crianças." }),
      /* @__PURE__ */ jsx("p", { className: "font-display italic text-sm mt-8 tracking-[0.2em] text-gold", children: "Liech Parfums — Laboratório de P&D" })
    ] }) })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-7xl text-gold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-gold/70", children: "Página não encontrada." }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-block border border-gold/40 px-6 py-2 text-xs uppercase tracking-[0.3em] text-gold hover:bg-gold hover:text-navy transition-colors",
        children: "Voltar"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl text-gold", children: "Algo não carregou" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          router.invalidate();
          reset();
        },
        className: "mt-6 border border-gold/40 px-6 py-2 text-xs uppercase tracking-[0.3em] text-gold hover:bg-gold hover:text-navy transition-colors",
        children: "Tentar novamente"
      }
    )
  ] }) });
}
const Route$5 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Liech Parfums — Memórias em essência" },
      { name: "description", content: "Perfumaria de nicho focada em aromacologia e memória afetiva." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Poppins:wght@300;400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$5.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Layout, {}) });
}
const $$splitComponentImporter$4 = () => import("./natureza-Cr24PyIh.js");
const Route$4 = createFileRoute("/natureza")({
  head: () => ({
    meta: [{
      title: "Acorde Natureza — Liech Parfums"
    }, {
      name: "description",
      content: "Aterramento e redução de agitação mental."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./gourmand-CpxyX961.js");
const Route$3 = createFileRoute("/gourmand")({
  head: () => ({
    meta: [{
      title: "Acorde Gourmand — Liech Parfums"
    }, {
      name: "description",
      content: "Memória afetiva e nostalgia positiva."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./fougere-DTh6En5b.js");
const Route$2 = createFileRoute("/fougere")({
  head: () => ({
    meta: [{
      title: "Acorde Fougère — Liech Parfums"
    }, {
      name: "description",
      content: "Clareza mental, foco e frescor verde."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./floral-Cg3tEA7_.js");
const Route$1 = createFileRoute("/floral")({
  head: () => ({
    meta: [{
      title: "Acorde Floral — Liech Parfums"
    }, {
      name: "description",
      content: "Conforto emocional e acolhimento seguro."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BsF5YABW.js");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Liech Parfums — Memórias em essência"
    }, {
      name: "description",
      content: "A Liech une o rigor técnico farmacêutico à sensibilidade da perfumaria artesanal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const NaturezaRoute = Route$4.update({
  id: "/natureza",
  path: "/natureza",
  getParentRoute: () => Route$5
});
const GourmandRoute = Route$3.update({
  id: "/gourmand",
  path: "/gourmand",
  getParentRoute: () => Route$5
});
const FougereRoute = Route$2.update({
  id: "/fougere",
  path: "/fougere",
  getParentRoute: () => Route$5
});
const FloralRoute = Route$1.update({
  id: "/floral",
  path: "/floral",
  getParentRoute: () => Route$5
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  FloralRoute,
  FougereRoute,
  GourmandRoute,
  NaturezaRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
