import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/floral", label: "Acorde Floral" },
  { to: "/natureza", label: "Acorde Natureza" },
  { to: "/gourmand", label: "Acorde Gourmand" },
  { to: "/fougere", label: "Acorde Fougère" },
] as const;

export function Layout() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-5 pb-3 text-center">
          <Link to="/" className="inline-block">
            <h1 className="font-display text-2xl sm:text-3xl tracking-[0.35em] text-gold">
              LIECH PARFUMS
            </h1>
            <p className="font-display italic text-[11px] sm:text-xs mt-1 text-gold/70 tracking-[0.25em]">
              Memórias em essência.
            </p>
          </Link>
        </div>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-3">
          <div className="hidden md:flex justify-center gap-10 text-[11px] uppercase tracking-[0.3em]">
            {navItems.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`pb-1 border-b transition-colors ${
                    active
                      ? "border-gold text-gold"
                      : "border-transparent text-gold/60 hover:text-gold"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
          <div className="md:hidden flex justify-end">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="text-gold p-2"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="md:hidden border-t border-border bg-background">
            <ul className="flex flex-col">
              {navItems.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-4 text-xs uppercase tracking-[0.3em] text-gold/80 border-b border-border"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-24 border-t border-border bg-deep-black">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="gold-divider mb-8 w-24 mx-auto" />
          <p className="text-[11px] sm:text-xs leading-relaxed text-gold/70 max-w-2xl mx-auto">
            Composição à base de Caprylic/Capric Triglyceride (TCM). Uso
            estritamente externo. Evitar contato com os olhos e mucosas. Manter
            ao abrigo da luz direta, do calor e fora do alcance de crianças.
          </p>
          <p className="font-display italic text-sm mt-8 tracking-[0.2em] text-gold">
            Liech Parfums — Laboratório de P&amp;D
          </p>
        </div>
      </footer>
    </div>
  );
}
