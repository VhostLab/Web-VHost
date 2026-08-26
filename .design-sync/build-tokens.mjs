// Genera un paquete de design system "solo tokens" para claude.ai/design.
//
// Este repositorio es una web Astro, no una libreria de componentes React, asi
// que no hay nada que empaquetar en _ds_bundle.js. El formato admite ese caso
// de forma explicita (componentCount 0 => "tokens-only sync"), asi que aqui
// emitimos el layout minimo valido: tokens reales + bundle vacio + ancla.
//
// Los colores y tipografias se leen de tailwind.config.js para que no haya
// valores transcritos a mano que se desincronicen del codigo.

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'ds-bundle');
const NAMESPACE = 'VhostDS';

const tw = (await import(new URL('../tailwind.config.js', import.meta.url).href)).default;
const colors = tw.theme?.extend?.colors ?? {};
const fonts = tw.theme?.extend?.fontFamily ?? {};

// Superficies del tema oscuro: valores reales, medidos por frecuencia de uso
// en src/ (ver README). No estan en tailwind.config.js porque en el codigo se
// usan como clases arbitrarias tipo bg-[#0b0b0b].
const surfaces = {
  'surface-base': '#0b0b0b',
  'surface-1': '#0f0f0f',
  'surface-2': '#111111',
  'surface-3': '#161616',
  'surface-4': '#1a1a1a',
};

const lines = [
  '/* Tokens de Vhost - generados desde tailwind.config.js por',
  '   .design-sync/build-tokens.mjs. No editar a mano. */',
  ':root {',
  '  /* Marca */',
];
for (const [name, value] of Object.entries(colors)) {
  lines.push(`  --vh-color-${name}: ${value};`);
}
lines.push('', '  /* Superficies (tema oscuro) */');
for (const [name, value] of Object.entries(surfaces)) {
  lines.push(`  --vh-color-${name}: ${value};`);
}
lines.push('', '  /* Tipografias */');
for (const [name, stack] of Object.entries(fonts)) {
  lines.push(`  --vh-font-${name}: ${stack.join(', ')};`);
}
lines.push('}', '');
const tokensCss = lines.join('\n');

mkdirSync(join(OUT, 'tokens'), { recursive: true });
writeFileSync(join(OUT, 'tokens', 'tokens.css'), tokensCss);

// Misma carga de fuentes que usa la web (src/layouts): solo Poppins remota.
const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
const stylesCss =
  `/* Punto de entrada de estilos del design system de Vhost. */\n` +
  `@import url("${GOOGLE_FONTS}");\n` +
  `@import "./tokens/tokens.css";\n`;
writeFileSync(join(OUT, 'styles.css'), stylesCss);

writeFileSync(
  join(OUT, 'README.md'),
  [
    '# Design system de Vhost',
    '',
    'Identidad visual de [vhost.tech](https://vhost.tech), empresa de hosting de',
    'servidores de videojuegos. Tema oscuro con un unico color de acento.',
    '',
    '## Que incluye',
    '',
    'Solo tokens: colores y tipografias. No hay componentes, porque la web esta',
    'hecha en Astro y no existe una libreria de componentes React que empaquetar.',
    'Los tokens se generan desde `tailwind.config.js` del repositorio.',
    '',
    '## Como usarlos',
    '',
    'Los tokens llegan como variables CSS a traves de `styles.css`:',
    '',
    '```css',
    'background: var(--vh-color-surface-base);',
    'color: var(--vh-color-secondary);',
    'font-family: var(--vh-font-poppins);',
    '```',
    '',
    '## Reglas de la marca',
    '',
    '- El fondo de pagina es `--vh-color-surface-base` (#0b0b0b). Las tarjetas y',
    '  paneles usan las superficies 1 a 4, mas claras cuanto mas elevadas.',
    '- `--vh-color-secondary` (#fc7c04) es el unico acento: se reserva para la',
    '  accion principal de cada pantalla, no se reparte por la interfaz.',
    '- Los titulos van en Poppins; el texto corrido en Inter o Karla.',
    '',
  ].join('\n'),
);

// Hashes de las fuentes de verdad: permiten que una futura sincronizacion
// detecte si los tokens han cambiado en el repo.
const sha = (p) => createHash('sha256').update(readFileSync(join(ROOT, p))).digest('hex').slice(0, 12);
const sourceHashes = {
  'tailwind.config.js': sha('tailwind.config.js'),
  'src/styles/global.css': sha('src/styles/global.css'),
};

const header = {
  namespace: NAMESPACE,
  components: [],
  sourceHashes,
  inlinedExternals: [],
};
const bundleJs =
  `/* @ds-bundle: ${JSON.stringify(header).replace(/\*\//g, '*\\/')} */\n` +
  `(function () {\n` +
  `  // Sistema solo de tokens: la identidad visual vive en styles.css.\n` +
  `  // Sin componentes que exponer (la web es Astro, no React).\n` +
  `  window.${NAMESPACE} = window.${NAMESPACE} || {};\n` +
  `})();\n`;
writeFileSync(join(OUT, '_ds_bundle.js'), bundleJs);

writeFileSync(
  join(OUT, '.ds-build-meta.json'),
  JSON.stringify({ componentCount: 0, shape: 'package', dtsStubbed: false }, null, 2) + '\n',
);

writeFileSync(
  join(OUT, '_ds_sync.json'),
  JSON.stringify(
    {
      shape: 'package',
      styleSha: createHash('sha256').update(tokensCss).digest('hex').slice(0, 12),
      renderHashes: {},
      sourceKeys: {},
      keyRecipe: 'tokens-only',
      sourceHashes,
      bundleSha12: createHash('sha256').update(bundleJs).digest('hex').slice(0, 12),
    },
    null,
    2,
  ) + '\n',
);

const tokenCount =
  Object.keys(colors).length + Object.keys(surfaces).length + Object.keys(fonts).length;
console.log(`ds-bundle listo: ${tokenCount} tokens, 0 componentes`);
