import { createFileRoute } from "@tanstack/react-router";
import { AccordPage, type AccordData } from "../components/Accord";
import image from "../assets/accord-floral.jpg";

const data: AccordData = {
  image,
  imageAlt:
    "Rosas em tons profundos sobre fundo escuro, evocando conforto e acolhimento.",
  poetic:
    "Um abraço engarrafado. A delicadeza aveludada das rosas e do gerânio se funde à pureza relaxante da lavanda, criando uma aura de proteção, conforto e estabilidade. Um convite para se sentir em casa, dentro de si mesmo.",
  eyebrow: "Protótipo 01 · Roll-on 7,5 mL · 10%",
  title: "Acorde Floral",
  subtitle: "Conforto, estabilidade e acolhimento seguro.",
  proposal:
    "Criado para promover conforto emocional profundo, estabilizar o humor e trazer uma sensação imediata de acolhimento seguro.",
  pyramid: {
    top: [{ name: "Lavanda Francesa", detail: "frescor limpo e relaxante" }],
    heart: [
      { name: "Jasmim Radiante", detail: "luminosidade e expansão suave" },
      { name: "Orvalho de Rosas", detail: "delicadeza aquática e fresca" },
      { name: "Absoluto de Rosa de Damasco", detail: "a rainha das flores, rica e aveludada" },
      { name: "Gerânio-Rosa", detail: "toque verde floral que equilibra as emoções" },
      { name: "Pétalas Solares", detail: "calor floral e conforto aveludado" },
    ],
    base: [
      { name: "Almíscar Branco", detail: "carícia macia e sensação de abraço" },
      { name: "Madeira Macia de Linho", detail: "sutil transição de conforto" },
    ],
  },
  use: "Aplicação nos pontos de pulsação. Aguarde 10 segundos e inale profundamente.",
  inci: "Caprylic/Capric Triglyceride, Parfum (Fragrance), Lavandula Angustifolia Flower Oil, Pelargonium Graveolens Flower Oil, Rosa Damascena Flower Oil, Linalool, Benzyl Salicylate, Geraniol, Citronellol, Limonene, Citral, Eugenol, Farnesol.",
  allergens: "Linalool, Benzyl Salicylate, Geraniol, Citronellol, Limonene, Citral, Eugenol, Farnesol.",
};

export const Route = createFileRoute("/floral")({
  head: () => ({
    meta: [
      { title: "Acorde Floral — Liech Parfums" },
      { name: "description", content: "Conforto emocional e acolhimento seguro." },
    ],
  }),
  component: () => <AccordPage data={data} />,
});
