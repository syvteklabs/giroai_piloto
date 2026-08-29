import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Como Participar | Giro AÍ - Cadastre Seu Estoque ou Setor",
  description: "Escolha como participar do Giro AÍ. Cadastre seu estoque de moda, publique oportunidades e registre seu setor para conectar com compradores.",
  keywords: ["cadastro de estoque", "publicar produtos", "oportunidades comerciais", "registro de setor"],

  openGraph: {
    type: "website",
    url: "https://giroai.vercel.app/participar",
    title: "Como Participar | Giro AÍ",
    description: "Cadastre seu estoque de moda ou registre seu setor e conecte com oportunidades comerciais",
    images: [
      {
        url: "https://images.giroaihub.com/giroai-b2b.png",
        width: 1200,
        height: 630,
        alt: "Como participar do Giro AÍ",
      },
    ],
  },

  alternates: {
    canonical: "https://giroai.vercel.app/participar",
  },
};

export default function ParticiparLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
