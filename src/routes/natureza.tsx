import { createFileRoute } from "@tanstack/react-router";
import { AccordPage, type AccordData } from "../components/Accord";

const data: AccordData = {
  eyebrow: "Protótipo 02 · Roll-on 7,5 mL · 10%",
  title: "Acorde Natureza",
  subtitle: "Forest bathing, aterramento e silêncio mental.",
  proposal:
    "Focado no Forest Bathing, aterramento (grounding) e redução de agitação mental.",
  pyramid: {
    top: [
      { name: "Laranja Doce", detail: "fagulha cítrica que limpa a mente" },
      { name: "OE Lavanda 40/42" },
      { name: "OE Petitgrain" },
    ],
    heart: [{ name: "Linalool" }, { name: "Cashmeran" }],
    base: [
      { name: "ISO E Super" },
      { name: "OE Cedro da Virgínia" },
      { name: "Veramoss", detail: "musgo de carvalho" },
      { name: "OE Vetiver" },
    ],
  },
  technicalNote:
    "Substituição magistral de Lemongrass por Laranja Doce e Lavanda para manter o topo fresco e funcional.",
};

export const Route = createFileRoute("/natureza")({
  head: () => ({
    meta: [
      { title: "Acorde Natureza — Liech Parfums" },
      { name: "description", content: "Aterramento e redução de agitação mental." },
    ],
  }),
  component: () => <AccordPage data={data} />,
});
