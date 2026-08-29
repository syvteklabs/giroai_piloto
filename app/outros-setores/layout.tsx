import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expandir para Outros Setores | Giro AÍ - Registre Seu Segmento",
  description: "Registre seu setor econômico no Giro AÍ. Ajude a revelar onde o estoque parado afeta a economia e expanda a plataforma para novos segmentos.",
  keywords: ["setores econômicos", "estoque em setores", "expansão setorial", "economia regional"],

  openGraph: {
    type: "website",
    url: "https://giroai.vercel.app/outros-setores",
    title: "Expandir para Outros Setores | Giro AÍ",
    description: "Registre seu setor e ajude a moldar o futuro da plataforma",
    images: [
      {
        url: "https://images.giroaihub.com/giroai-b2b.png",
        width: 1200,
        height: 630,
        alt: "Outros setores no Giro AÍ",
      },
    ],
  },

  alternates: {
    canonical: "https://giroai.vercel.app/outros-setores",
  },
};

export default function OutrosSetoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
