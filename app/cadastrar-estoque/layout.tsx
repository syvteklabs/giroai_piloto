import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastrar Estoque de Moda | Giro AÍ - Publique Seus Produtos",
  description: "Cadastre seu estoque de roupas, calçados e acessórios no Giro AÍ. Publique produtos e conecte com compradores interessados na sua região.",
  keywords: ["cadastro de estoque", "vender roupas", "estoque de moda", "publicar produtos"],

  openGraph: {
    type: "website",
    url: "https://giroai.vercel.app/cadastrar-estoque",
    title: "Cadastrar Estoque de Moda | Giro AÍ",
    description: "Cadastre seu estoque e conecte com compradores",
    images: [
      {
        url: "https://images.giroaihub.com/giroai-b2b.png",
        width: 1200,
        height: 630,
        alt: "Cadastrar estoque no Giro AÍ",
      },
    ],
  },

  alternates: {
    canonical: "https://giroai.vercel.app/cadastrar-estoque",
  },
};

export default function CadastrarEstoqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
