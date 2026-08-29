import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Giro AÍ",
  description: "Conheça como o Giro AÍ protege seus dados pessoais. Política de privacidade e segurança de informações.",
  keywords: ["privacidade", "proteção de dados", "política de privacidade"],

  openGraph: {
    type: "website",
    url: "https://giroai.vercel.app/privacidade",
    title: "Política de Privacidade | Giro AÍ",
    description: "Conheça como protegemos seus dados",
    images: [
      {
        url: "https://images.giroaihub.com/giroai-b2b.png",
        width: 1200,
        height: 630,
        alt: "Política de privacidade do Giro AÍ",
      },
    ],
  },

  robots: {
    index: false,
    follow: true,
  },

  alternates: {
    canonical: "https://giroai.vercel.app/privacidade",
  },
};

export default function PrivacidadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
