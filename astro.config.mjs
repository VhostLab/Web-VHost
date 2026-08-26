// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Envuelve cada <table> del markdown en un contenedor con scroll horizontal.
 * Las tablas comparativas del blog tienen 4-5 columnas y en móvil se salen del
 * ancho; el <body> recorta el desbordamiento, así que sin este contenedor las
 * columnas de la derecha quedarían inaccesibles.
 */
function rehypeTablasConScroll() {
  /** @param {any} tree */
  return (tree) => {
    /** @param {any} nodo */
    const recorrer = (nodo) => {
      if (!Array.isArray(nodo.children)) return;
      nodo.children = nodo.children.map(/** @param {any} hijo */ (hijo) => {
        recorrer(hijo);
        if (hijo.type === 'element' && hijo.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['tabla-scroll'] },
            children: [hijo],
          };
        }
        return hijo;
      });
    };
    recorrer(tree);
  };
}

/**
 * Abre en otra pestaña los enlaces del markdown que salen del sitio, para no
 * sacar al lector de la guía a medias. Los enlaces internos se quedan como
 * están. El rel evita que la página destino pueda tocar la nuestra.
 */
function rehypeEnlacesExternos() {
  return (/** @type {any} */ tree) => {
    const recorrer = (/** @type {any} */ nodo) => {
      if (!Array.isArray(nodo.children)) return;
      for (const hijo of nodo.children) {
        if (hijo.type === 'element' && hijo.tagName === 'a') {
          const destino = String(hijo.properties?.href ?? '');
          const esExterno = /^https?:\/\//i.test(destino) && !/^https?:\/\/([a-z0-9-]+\.)*vhost\.tech(\/|$)/i.test(destino);
          if (esExterno) {
            hijo.properties.target = '_blank';
            hijo.properties.rel = ['noopener', 'noreferrer'];
          }
        }
        recorrer(hijo);
      }
    };
    recorrer(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://vhost.tech',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404/'),
    }),
  ],

  markdown: {
    rehypePlugins: [rehypeTablasConScroll, rehypeEnlacesExternos],
  },

  // Optimizaciones de build
  build: {
    inlineStylesheets: 'auto',
  },

  // Configuración de servidor de desarrollo
  server: {
    port: 4321,
    host: true,
  },

  // Configuración de imágenes
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // Optimización de output
  output: 'static',

  // Compresión y optimización
  compressHTML: true,

  // Configuración de Vite (underlying bundler)
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
  },
});
