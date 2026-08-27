import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giro AÍ — Estoque parado pode virar negócio",
  description: "O Giro AÍ conecta estoques de moda a novas oportunidades e revela onde esse desafio aparece em outros setores.",
  metadataBase: new URL("https://giroai.vercel.app"),
  openGraph: {
    title: "Giro AÍ — Estoque parado pode virar negócio",
    description: "O Giro AÍ conecta estoques de moda a novas oportunidades e revela onde esse desafio aparece em outros setores.",
    url: "https://giroai.vercel.app",
    siteName: "Giro AÍ",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giro AÍ — Estoque parado pode virar negócio",
    description: "O Giro AÍ conecta estoques de moda a novas oportunidades e revela onde esse desafio aparece em outros setores.",
  },
  icons: {
    icon: "🌀",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-giro-claro text-giro-texto antialiased">
        {children}
      </body>
    </html>
  );
}
