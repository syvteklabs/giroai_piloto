import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapa Territorial | Giro AÍ - Visualize Oportunidades por Região",
  description: "Mapa interativo em tempo real mostrando a distribuição de estoque parado e oportunidades comerciais por região. Dados agregados e análise territorial.",
  keywords: ["mapa territorial", "dados regionais", "distribuição de estoque", "análise geográfica"],

  openGraph: {
    type: "website",
    url: "https://giroai.vercel.app/mapa",
    title: "Mapa Territorial | Giro AÍ",
    description: "Visualize a distribuição de oportunidades comerciais por região em tempo real",
    images: [
      {
        url: "https://images.giroaihub.com/giroai-b2b.png",
        width: 1200,
        height: 630,
        alt: "Mapa territorial do Giro AÍ",
      },
    ],
  },

  alternates: {
    canonical: "https://giroai.vercel.app/mapa",
  },
};

export default function MapaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
