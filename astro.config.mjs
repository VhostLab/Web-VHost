// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Fecha de última revisión de cada guía, por slug (el nombre del archivo, que
 * es el post.id con el que se genera /blog/<slug>/). Alimenta el <lastmod> del
 * sitemap, que Bing usa para decidir qué volver a rastrear.
 *
 * ponytail: solo llevan lastmod las URLs con fecha real. Poner la del build en
 * las páginas estáticas le diría a Bing que todo cambia en cada deploy.
 */
const fechasBlog = Object.fromEntries(
  readdirSync('./src/content/blog')
    .filter((archivo) => archivo.endsWith('.md'))
    .map((archivo) => [
      archivo.slice(0, -3),
      readFileSync(`./src/content/blog/${archivo}`, 'utf8').match(/^updatedDate:\s*["']?([\d-]+)/m)?.[1],
    ])
    .filter(([, fecha]) => fecha),
);
const ultimaFechaBlog = Object.values(fechasBlog).sort().pop();

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
      serialize(item) {
        const ruta = new URL(item.url).pathname;
        const slug = ruta.match(/^\/blog\/([^/]+)\/$/)?.[1];
        const fecha = ruta === '/blog/' ? ultimaFechaBlog : slug && fechasBlog[slug];
        if (fecha) item.lastmod = fecha;
        return item;
      },
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
