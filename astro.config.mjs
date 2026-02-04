// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://vhost.tech',

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
    optimizeDeps: {
      exclude: ['ping'],
    },
  },
});
