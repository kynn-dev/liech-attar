import { createFileRoute } from "@tanstack/react-router";
import { AccordPage, type AccordData } from "../components/Accord";

const data: AccordData = {
  eyebrow: "Protótipo 04 · Roll-on 7,5 mL · 10%",
  title: "Acorde Fougère",
  subtitle: "Limpeza clássica, clareza mental e foco.",
  proposal:
    "Evoca a limpeza clássica, revitalização, clareza mental e foco, equilibrando frescor verde com madeiras densas.",
  pyramid: {
    top: [
      { name: "Bergamota Base Givco" },
      { name: "Lemonile" },
      { name: "Dihidromircenol" },
      { name: "Cis-3-Hexenol", detail: "grama cortada" },
      { name: "Mentol Cristalizado" },
    ],
    heart: [{ name: "OE Lavanda 40/42" }, { name: "Linalool" }],
    base: [
      { name: "ISO E Super" },
      { name: "Vertofix", detail: "cedro / vetiver" },
      { name: "Veramoss" },
      { name: "Cumarina" },
      { name: "Exaltolide" },
      { name: "Ambrettolide" },
      { name: "Etileno Brassilato" },
    ],
  },
};

export const Route = createFileRoute("/fougere")({
  head: () => ({
    meta: [
      { title: "Acorde Fougère — Liech Parfums" },
      { name: "description", content: "Clareza mental, foco e frescor verde." },
    ],
  }),
  component: () => <AccordPage data={data} />,
});
