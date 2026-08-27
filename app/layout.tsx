import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giro AÍ - Inteligência que faz o estoque girar",
  description: "Transforme estoque parado em oportunidades comerciais",
  metadataBase: new URL("https://giroai.vercel.app"),
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
