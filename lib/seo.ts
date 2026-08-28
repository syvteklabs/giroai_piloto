export const SEO_CONFIG = {
  siteUrl: "https://giroai.vercel.app",
  siteName: "Giro AÍ",
  siteDescription: "Transforme estoque parado em oportunidades comerciais. Plataforma de inteligência que conecta estoques com novos mercados.",
  logoUrl: "https://giroai.vercel.app/logo.png",
  ogImageUrl: "https://giroai.vercel.app/og-image.jpg",
  twitterHandle: "@giroai",
  locale: "pt_BR",
  defaultTitle: "Giro AÍ - Inteligência que faz o estoque girar",
};

export const generateMetadata = (page: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
}) => {
  const title = page.title || SEO_CONFIG.defaultTitle;
  const description = page.description || SEO_CONFIG.siteDescription;
  const image = page.image || SEO_CONFIG.ogImageUrl;
  const url = page.url || SEO_CONFIG.siteUrl;

  return {
    title,
    description,
    image,
    url,
    keywords: page.keywords || [],
  };
};

export const generateStructuredData = (type: string, data: any) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    url: SEO_CONFIG.siteUrl,
    inLanguage: SEO_CONFIG.locale,
  };

  return {
    ...baseData,
    ...data,
  };
};
