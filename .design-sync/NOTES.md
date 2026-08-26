# Notas de sincronización con Claude Design

Proyecto: **Vhost Design System** (`1d6cc32f-731b-4b29-8f3e-31815f0132b8`)

## Por qué es una sincronización solo de tokens

`/design-sync` empaqueta componentes **React** compilados desde el `dist/` de
una librería. Este repositorio es una web Astro:

- 61 componentes `.astro`, cero React (ni siquiera está instalado).
- `package.json` no tiene `main`, `module` ni `exports`: no es una librería.
- No hay Storybook ni ficheros `*.stories.*`.

Los `.astro` se compilan a HTML durante el build de Astro, así que no existen
en tiempo de ejecución y no se pueden exponer en `window.VhostDS`. El formato
contempla este caso de forma explícita (el validador admite `componentCount 0`
como *tokens-only sync*), así que se genera el layout mínimo válido en vez de
reimplementar la web en React.

Consecuencia práctica: Claude Design construirá con **componentes genéricos
pintados con la identidad de Vhost**. Para que use componentes propios haría
falta extraer un paquete React de verdad.

## Cómo se regenera

```bash
node .design-sync/build-tokens.mjs      # genera ds-bundle/
```

Los valores se leen de `tailwind.config.js`, nunca se escriben a mano. Si
cambian los colores de marca ahí, basta con volver a ejecutarlo y resincronizar.

`ds-bundle/` es salida generada y está en `.gitignore`.

## Hallazgos del repositorio

- **Karla e Inter no se cargan.** `tailwind.config.js` declara las familias
  `poppins`, `karla` e `inter`, y en el código se usan clases `font-inter` y
  `font-karla`, pero el layout solo carga Poppins desde Google Fonts. Esos
  textos caen al `sans-serif` del sistema. Merece una revisión aparte: o se
  cargan las dos fuentes, o se retiran del config y de las clases.
- **Las superficies del tema oscuro no están en el config.** `#0b0b0b`,
  `#0f0f0f`, `#111111`, `#161616` y `#1a1a1a` se usan como clases arbitrarias
  (`bg-[#0b0b0b]`) repartidas por todo `src/`. Se han incluido en los tokens
  como `--vh-color-surface-*` porque son parte real de la identidad, pero
  convendría subirlas a `tailwind.config.js` para tener una única fuente.

## Detalles del proceso

- El validador se ejecuta con `--no-render-check`: la comprobación visual
  renderiza previsualizaciones de componentes y aquí no hay ninguna. El propio
  validador informa de `tokens-only DS — no component previews`.
- Aviso `[FONT_REMOTE]`: las fuentes llegan por `@import` a Google Fonts, igual
  que hace la web. No se empaquetan `.woff2` en el sistema.
- `.ds-build-meta.json` es metadato local del build y no se sube.
