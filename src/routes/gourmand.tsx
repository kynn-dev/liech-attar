import { createFileRoute } from "@tanstack/react-router";
import { AccordPage, type AccordData } from "../components/Accord";
import image from "../assets/accord-gourmand.jpg";

const data: AccordData = {
  image,
  imageAlt:
    "Cena íntima em luz de vela com tons âmbar e baunilha, aconchego luxuoso.",
  poetic:
    "Uma viagem instantânea à memória afetiva. Notas quentes de baunilha clássica, resinas douradas e um toque lúdico de doçura que aquecem a alma. Uma fragrância densa que sacia e conforta com a familiaridade de um abraço saudoso.",
  eyebrow: "Protótipo 03 · Roll-on 7,5 mL · 10%",
  title: "Acorde Gourmand",
  subtitle: "Nostalgia positiva e saciedade emocional.",
  proposal:
    "Ativação do sistema límbico ligado à memória afetiva, evocando nostalgia positiva e saciedade emocional.",
  pyramid: {
    top: [{ name: "OE Laranja Doce" }],
    heart: [
      { name: "Etil Maltol", detail: "algodão-doce" },
      { name: "Cumarina", detail: "fava tonka" },
      { name: "Aldeído C-18", detail: "cremosidade de coco" },
    ],
    base: [
      { name: "Vanilina" },
      { name: "Absoluto Benjoim-do-Sião" },
      { name: "Absoluto Tabaco-Chocolate" },
      { name: "Galaxolide", detail: "musk amaciante, substitui o Habanolide na fixação" },
    ],
  },
};

export const Route = createFileRoute("/gourmand")({
  head: () => ({
    meta: [
      { title: "Acorde Gourmand — Liech Parfums" },
      { name: "description", content: "Memória afetiva e nostalgia positiva." },
    ],
  }),
  component: () => <AccordPage data={data} />,
});
