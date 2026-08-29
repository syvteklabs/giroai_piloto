import type { Metadata } from "next";
import "./globals.css";
import { JsonLdSchema } from "@/components/json-ld-schema";
import { organizationSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Giro AÍ - Inteligência que faz o estoque girar",
  description: "Transforme estoque parado em oportunidades comerciais. O Giro AÍ conecta estoques de moda a novas oportunidades e revela dados territoriais da região.",
  metadataBase: new URL("https://giroai.vercel.app"),
  keywords: ["estoque parado", "oportunidades comerciais", "moda", "setor têxtil", "gestão de estoque", "mapa territorial"],
  authors: [{ name: "Giro AÍ" }],

  openGraph: {
    type: "website",
    url: "https://giroai.vercel.app",
    title: "Giro AÍ - Inteligência que faz o estoque girar",
    description: "Transforme estoque parado em oportunidades comerciais",
    images: [
      {
        url: "https://images.giroaihub.com/giroai-b2b.png",
        width: 1200,
        height: 630,
        alt: "Giro AÍ - Plataforma de oportunidades comerciais",
      },
    ],
    siteName: "Giro AÍ",
    locale: "pt_BR",
  },

  twitter: {
    card: "summary_large_image",
    title: "Giro AÍ - Inteligência que faz o estoque girar",
    description: "Transforme estoque parado em oportunidades comerciais",
    images: ["https://images.giroaihub.com/giroai-b2b.png"],
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },

  alternates: {
    canonical: "https://giroai.vercel.app",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <JsonLdSchema data={organizationSchema} />
      </head>
      <body className="bg-giro-claro text-giro-texto antialiased">
        {children}
      </body>
    </html>
  );
}
