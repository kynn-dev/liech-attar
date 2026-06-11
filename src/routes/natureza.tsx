import { createFileRoute } from "@tanstack/react-router";
import { AccordPage, type AccordData } from "../components/Accord";
import image from "../assets/accord-natureza.jpg";

const data: AccordData = {
  image,
  imageAlt:
    "Floresta de pinheiros envolta em névoa, atmosfera de aterramento e silêncio.",
  poetic:
    "O silêncio da floresta na sua pele. Uma descida das folhas cítricas até as raízes úmidas de vetiver e madeiras nobres. Este acorde convida a mente a desacelerar, respirar fundo e descarregar o peso do mundo na terra.",
  eyebrow: "Protótipo 02 · Roll-on 7,5 mL · 10%",
  title: "Acorde Natureza",
  subtitle: "Forest bathing, aterramento e silêncio mental.",
  proposal:
    "Focado no Forest Bathing, aterramento (grounding) e redução de agitação mental.",
  pyramid: {
    top: [
      { name: "Laranja Doce", detail: "fagulha cítrica e radiante para clareza mental" },
      { name: "Lavanda Silvestre", detail: "calma profunda e reconfortante" },
      { name: "Petitgrain de Laranjeira", detail: "frescor verde de folhas e galhos esmagados" },
    ],
    heart: [
      { name: "Néctar de Flores Brancas", detail: "frescor herbal sutilmente adocicado" },
      { name: "Veludo de Cashmere", detail: "textura tátil, aconchegante e mineral" },
    ],
    base: [
      { name: "Madeira Aveludada", detail: "aura limpa, difusiva e envolvente" },
      { name: "Cedro da Virgínia", detail: "solidez amadeirada de floresta antiga" },
      { name: "Musgo de Carvalho", detail: "raízes úmidas e terra molhada pós-chuva" },
      { name: "Vetiver Terroso", detail: "aterramento profundo de raízes secas" },
    ],
  },
  use: "Aplicação nos pontos de pulsação. Aguarde 10 segundos e inale profundamente.",
  inci: "Caprylic/Capric Triglyceride, Parfum (Fragrance), Citrus Aurantium Dulcis Peel Oil, Lavandula Angustifolia Flower Oil, Citrus Aurantium Amara Leaf/Twig Oil, Juniperus Virginiana Wood Oil, Vetiveria Zizanoides Root Oil, Limonene, Linalool, Geraniol, Citral.",
  allergens: "Limonene, Linalool, Geraniol, Citral.",
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
