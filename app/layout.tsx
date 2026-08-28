import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://giroai.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Giro AÍ - Inteligência que faz o estoque girar",
  description: "Transforme estoque parado em oportunidades comerciais. Conecte sua empresa com novos mercados através da plataforma Giro AÍ.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "estoque parado",
    "oportunidades comerciais",
    "moda",
    "e-commerce",
    "logística",
    "marketplace",
    "inteligência territorial",
    "economia regional",
    "MERCO Noroeste"
  ],
  authors: [{ name: "Giro AÍ" }],
  creator: "Giro AÍ",
  publisher: "Giro AÍ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    title: "Giro AÍ - Inteligência que faz o estoque girar",
    description: "Transforme estoque parado em oportunidades comerciais. Plataforma inovadora para conectar estoques com novos mercados.",
    siteName: "Giro AÍ",
    images: [
      {
        url: "https://images.giroaihub.com/giroai-b2b.png",
        width: 1200,
        height: 630,
        alt: "Giro AÍ - Plataforma B2B de oportunidades comerciais",
        type: "image/png",
      },
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Giro AÍ - Plataforma de oportunidades comerciais",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giro AÍ - Inteligência que faz o estoque girar",
    description: "Transforme estoque parado em oportunidades comerciais",
    images: ["https://images.giroaihub.com/giroai-b2b.png", `${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Giro AÍ",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Giro AÍ",
    description: "Plataforma de inteligência territorial para transformar estoque parado em oportunidades comerciais",
    url: siteUrl,
    logo: "https://images.giroaihub.com/giroai-b2b.png",
    image: "https://images.giroaihub.com/giroai-b2b.png",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: siteUrl,
    },
  };

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="theme-color" content="#D41F2C" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-giro-claro text-giro-texto antialiased">
        {children}
      </body>
    </html>
  );
}
