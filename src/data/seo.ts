// Datos y helpers de JSON-LD (schema.org) para todo el sitio.
// Regla: los precios de los schemas se derivan SIEMPRE de los arrays que
// renderiza cada página (nunca valores inventados).

export const SITE = {
  name: "Vhost",
  legalName: "Vhost Hosting Services",
  url: "https://vhost.tech",
  email: "vhostts3@gmail.com",
  logo: "https://vhost.tech/favicon/web-app-manifest-512x512.png",
  sameAs: ["https://discord.gg/Ykr85wevrj", "https://x.com/VhostTS3"],
} as const;

/** URL absoluta con trailing slash, coherente con canonical y sitemap */
export const absoluteUrl = (path: string): string => {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return new URL(normalized, SITE.url).href;
};

/** "0,75€ /mes" → 0.75 */
export const parsePrice = (price: string): number => {
  const match = price.replace(",", ".").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

// La description desambigua la entidad "Vhost" (también es un término
// genérico de servidores web nginx/Apache).
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: `${SITE.url}/`,
  logo: SITE.logo,
  email: SITE.email,
  description:
    "Vhost es un hosting español de servidores de juegos (Minecraft, Rust, ARK, GTA 5, Hytale y TeamSpeak 3) con protección anti-DDoS, panel Pterodactyl y soporte 24/7.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ES",
  },
  sameAs: [...SITE.sameAs],
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: `${SITE.url}/`,
  inLanguage: "es-ES",
  publisher: { "@id": `${SITE.url}/#organization` },
};

/**
 * Product + ofertas para una landing de juego. `prices` son los strings de
 * precio visibles en la página (p. ej. "0,75€ /mes").
 */
export function productSchema(opts: {
  name: string;
  description: string;
  path: string;
  image?: string;
  prices: string[];
}) {
  const amounts = opts.prices.map(parsePrice);
  const low = Math.min(...amounts);
  const high = Math.max(...amounts);
  const url = absoluteUrl(opts.path);

  const offers =
    amounts.length === 1
      ? {
          "@type": "Offer",
          price: low.toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url,
        }
      : {
          "@type": "AggregateOffer",
          lowPrice: low.toFixed(2),
          highPrice: high.toFixed(2),
          priceCurrency: "EUR",
          offerCount: amounts.length,
          availability: "https://schema.org/InStock",
          url,
        };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    brand: { "@type": "Brand", name: SITE.name },
    ...(opts.image ? { image: new URL(opts.image, SITE.url).href } : {}),
    offers,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: Date;
  dateModified: Date;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: "es-ES",
    datePublished: opts.datePublished.toISOString(),
    dateModified: opts.dateModified.toISOString(),
    author: { "@type": "Person", name: opts.author },
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}
