// Recomendación de plan para la calculadora de RAM.
//
// Los rangos de jugadores NO se escriben aquí: se derivan de src/data/products.ts,
// que es lo que ya publica la tienda en su tabla comparativa. Así la calculadora
// no puede contradecir al catálogo. Si alguien ajusta un rango en products.ts, la
// calculadora lo sigue sin tocar este fichero.

import { productTiers } from "@data/products";
import type { Product } from "@/types";

export type TipoServidor = "vanilla" | "plugins" | "mods" | "ambos";

export interface Plan {
  nombre: string;
  gb: number;
  precioDesde: string;
  url: string;
  /** Jugadores que la tienda considera razonables, por tipo de servidor. */
  rangos: Record<TipoServidor, [number, number] | null>;
}

/**
 * Extrae el rango de un texto de la tienda. Los valores vienen como frases
 * ("3-6 jugadores", "2-4 jugadores (modpack ligero)") o como un "No recomendado"
 * que aquí se traduce en "este plan no da para eso".
 */
const rango = (texto?: string): [number, number] | null => {
  const m = (texto ?? "").match(/(\d+)\s*-\s*(\d+)/);
  return m ? [Number(m[1]), Number(m[2])] : null;
};

const gigas = (texto: string): number => Number(texto.match(/(\d+)\s*GB/i)?.[1] ?? 0);

// La gama Budget marca el precio de entrada de cada tamaño; las otras dos
// cambian procesador y precio, no la memoria ni los jugadores que aguanta.
const base: Product[] = productTiers.budget.products;

export const PLANES: Plan[] = base
  .map((p) => ({
    nombre: p.type,
    gb: gigas(p.ram),
    precioDesde: p.price.replace("€ /mes", " €/mes"),
    url: "/tienda/minecraft/",
    rangos: {
      vanilla: rango(p.vanilla),
      plugins: rango(p.pluginsRange),
      mods: rango(p.modsRange),
      ambos: rango(p.bothRange),
    },
  }))
  .filter((p) => p.gb > 0)
  .sort((a, b) => a.gb - b.gb);

export const TIPOS: { id: TipoServidor; etiqueta: string; pista: string }[] = [
  { id: "vanilla", etiqueta: "Vanilla", pista: "Minecraft tal cual, sin añadidos" },
  { id: "plugins", etiqueta: "Con plugins", pista: "Paper, Spigot o Purpur" },
  { id: "mods", etiqueta: "Con mods", pista: "Forge, NeoForge o Fabric" },
  { id: "ambos", etiqueta: "Mods y plugins", pista: "Servidor híbrido" },
];

/** Jugadores máximos que cubre el catálogo para un tipo de servidor. */
export const topeDe = (tipo: TipoServidor): number =>
  PLANES.reduce((max, p) => Math.max(max, p.rangos[tipo]?.[1] ?? 0), 0);

/**
 * El plan más barato que aguanta ese número de jugadores. Devuelve null cuando
 * ningún plan estándar llega: preferimos decirlo antes que recomendar uno que
 * se va a quedar corto.
 */
export const recomendar = (tipo: TipoServidor, jugadores: number): Plan | null =>
  PLANES.find((p) => {
    const r = p.rangos[tipo];
    return r !== null && jugadores <= r[1];
  }) ?? null;
