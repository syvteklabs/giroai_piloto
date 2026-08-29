import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oportunidades de Estoque | Giro AÍ - Conecte com Fornecedores",
  description: "Encontre oportunidades de compra de estoque de moda. Acesse a vitrine de produtos disponíveis e conecte com fornecedores qualificados.",
  keywords: ["oportunidades de compra", "estoque disponível", "fornecedores moda", "vitrine de produtos"],

  openGraph: {
    type: "website",
    url: "https://giroai.vercel.app/oportunidades",
    title: "Oportunidades de Estoque | Giro AÍ",
    description: "Encontre oportunidades de compra de estoque de moda e conecte com fornecedores",
    images: [
      {
        url: "https://images.giroaihub.com/giroai-b2b.png",
        width: 1200,
        height: 630,
        alt: "Oportunidades de estoque no Giro AÍ",
      },
    ],
  },

  alternates: {
    canonical: "https://giroai.vercel.app/oportunidades",
  },
};

export default function OportunidadesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
