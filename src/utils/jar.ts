// Lectura de archivos .jar en el navegador, sin subirlos a ningún sitio.
//
// Un .jar es un ZIP. Para saber si un mod sirve en un servidor basta con leer
// un par de ficheros de texto de unos KB que lleva dentro, así que este lector
// NO descomprime el archivo entero: localiza el índice del ZIP al final del
// fichero, y de ahí saca solo las entradas de metadatos que nos interesan.
//
// Dos consecuencias que importan:
//   - Un .jar de 200 MB cuesta lo mismo que uno de 1 MB: se leen unos KB.
//   - Nunca se ejecuta ni se interpreta código del archivo. Solo se lee texto.

/** Entrada del ZIP: dónde está y cómo está guardada. */
interface Entrada {
  nombre: string;
  metodo: number;
  comprimido: number;
  descomprimido: number;
  offsetLocal: number;
}

export type Lado = "cliente" | "servidor" | "ambos" | "proxy" | "sin-declarar";
export type Cargador =
  | "Fabric"
  | "Forge"
  | "NeoForge"
  | "Quilt"
  | "Bukkit"
  | "Proxy"
  | "Varios"
  | "?";

export interface Analisis {
  archivo: string;
  tamano: number;
  /** Qué es: mod de Fabric, plugin de servidor, etc. */
  tipo: string;
  cargador: Cargador;
  lado: Lado;
  /** Versión de Minecraft que declara, tal cual viene. */
  minecraft: string;
  nombreMod: string;
  /** Ids obligatorios de los que depende, para detectar los que faltan. */
  dependencias: string[];
  /** Id propio, para saber si otro archivo lo aporta. */
  id: string;
  /** Trae metadatos de varias plataformas: vale para todas, no para una. */
  universal: boolean;
  error?: string;
}

// Un ZIP sano no necesita nada de esto, pero un archivo manipulado sí: son los
// topes que evitan que un fichero pequeño nos haga reservar memoria sin fin.
const MAX_ENTRADAS = 20000;
const MAX_METADATO = 2 * 1024 * 1024;
const TAM_COLA = 66_000; // 64 KB de comentario máximo + la cabecera del índice

const leer = async (trozo: Blob) => new DataView(await trozo.arrayBuffer());

/** Localiza el índice del ZIP leyendo solo la cola del fichero. */
async function indice(fichero: File): Promise<Entrada[]> {
  const colaDesde = Math.max(0, fichero.size - TAM_COLA);
  const cola = await leer(fichero.slice(colaDesde));

  let eocd = -1;
  for (let i = cola.byteLength - 22; i >= 0; i--) {
    if (cola.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("no-es-zip");

  const total = cola.getUint16(eocd + 10, true);
  const tamIndice = cola.getUint32(eocd + 12, true);
  const offIndice = cola.getUint32(eocd + 16, true);
  if (offIndice === 0xffffffff) throw new Error("zip64");
  if (total > MAX_ENTRADAS) throw new Error("demasiadas-entradas");

  const bruto = await leer(fichero.slice(offIndice, offIndice + tamIndice));
  const decodificador = new TextDecoder();
  const entradas: Entrada[] = [];
  let p = 0;

  for (let i = 0; i < total && p + 46 <= bruto.byteLength; i++) {
    if (bruto.getUint32(p, true) !== 0x02014b50) break;
    const lonNombre = bruto.getUint16(p + 28, true);
    const lonExtra = bruto.getUint16(p + 30, true);
    const lonComent = bruto.getUint16(p + 32, true);
    const nombre = decodificador.decode(
      new Uint8Array(bruto.buffer, bruto.byteOffset + p + 46, lonNombre)
    );
    entradas.push({
      nombre,
      metodo: bruto.getUint16(p + 10, true),
      comprimido: bruto.getUint32(p + 20, true),
      descomprimido: bruto.getUint32(p + 24, true),
      offsetLocal: bruto.getUint32(p + 42, true),
    });
    p += 46 + lonNombre + lonExtra + lonComent;
  }
  return entradas;
}

/** Saca una entrada concreta como texto. Solo se llama con ficheros pequeños. */
async function texto(fichero: File, e: Entrada): Promise<string> {
  if (e.descomprimido > MAX_METADATO) throw new Error("metadato-enorme");

  // La cabecera local repite el nombre y el campo extra, y sus longitudes no
  // tienen por qué coincidir con las del índice: hay que leerla para saber
  // dónde empiezan de verdad los datos.
  const cab = await leer(fichero.slice(e.offsetLocal, e.offsetLocal + 30));
  if (cab.getUint32(0, true) !== 0x04034b50) throw new Error("cabecera-invalida");
  const inicio =
    e.offsetLocal + 30 + cab.getUint16(26, true) + cab.getUint16(28, true);
  const datos = fichero.slice(inicio, inicio + e.comprimido);

  if (e.metodo === 0) return await datos.text();
  if (e.metodo !== 8) throw new Error("compresion-no-soportada");

  const flujo = datos.stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return await new Response(flujo).text();
}

// --- Lectores de metadatos -------------------------------------------------
// No son parsers completos de TOML ni de YAML: buscan los campos concretos que
// necesitamos. Es suficiente porque estos ficheros los genera siempre la misma
// herramienta de construcción y su forma es muy estable.

/**
 * JSON tal y como lo escriben los mods, no como manda la norma.
 *
 * Fabric lee sus metadatos con un parser permisivo, así que hay muchos mods
 * publicados con un fabric.mod.json que trae saltos de línea sin escapar
 * dentro de la descripción, comentarios o comas de más. En el juego funcionan
 * y JSON.parse los rechaza, así que aquí se normaliza antes de parsear en vez
 * de dar por ilegible un mod que está perfectamente bien.
 */
function jsonTolerante(texto: string): Record<string, unknown> {
  const fuente = texto.replace(/^\uFEFF/, "");
  let salida = "";
  let enCadena = false;
  let escapado = false;

  for (let i = 0; i < fuente.length; i++) {
    const c = fuente[i];

    if (enCadena) {
      if (escapado) {
        salida += c;
        escapado = false;
      } else if (c === "\\") {
        salida += c;
        escapado = true;
      } else if (c === '"') {
        salida += c;
        enCadena = false;
      } else if (fuente.charCodeAt(i) < 0x20) {
        // Un carácter de control a pelo dentro de una cadena: escaparlo.
        const codigo = fuente.charCodeAt(i);
        salida += codigo === 10 ? "\\n" : codigo === 13 ? "\\r" : codigo === 9 ? "\\t" : " ";
      } else {
        salida += c;
      }
      continue;
    }

    if (c === '"') {
      salida += c;
      enCadena = true;
    } else if (c === "/" && fuente[i + 1] === "/") {
      while (i < fuente.length && fuente[i] !== "\n") i++;
    } else if (c === "/" && fuente[i + 1] === "*") {
      i += 2;
      while (i < fuente.length && !(fuente[i] === "*" && fuente[i + 1] === "/")) i++;
      i++;
    } else if (c === ",") {
      // Coma sobrante justo antes de cerrar un objeto o una lista.
      let j = i + 1;
      while (j < fuente.length && /\s/.test(fuente[j])) j++;
      if (fuente[j] !== "}" && fuente[j] !== "]") salida += c;
    } else {
      salida += c;
    }
  }

  try {
    return JSON.parse(salida) as Record<string, unknown>;
  } catch {
    throw new Error("json-invalido");
  }
}

const campoYaml = (t: string, clave: string) =>
  t.match(new RegExp(`^${clave}\\s*:\\s*["']?([^"'\\n#]+)`, "m"))?.[1].trim() ?? "";

const campoToml = (t: string, clave: string) =>
  t.match(new RegExp(`^\\s*${clave}\\s*=\\s*["']([^"']+)`, "m"))?.[1].trim() ?? "";

/** Versión de Minecraft dentro de un rango tipo "[1.20.1,1.21)" o ">=1.20.1". */
const versionMinecraft = (rango: string) =>
  rango.match(/\d+\.\d+(\.\d+)?/)?.[0] ?? "";

function deFabric(json: string, a: Analisis) {
  const d = jsonTolerante(json) as {
    id?: string;
    name?: string;
    depends?: Record<string, unknown>;
    environment?: string;
    entrypoints?: Record<string, unknown>;
  };
  a.cargador = "Fabric";
  a.tipo = "Mod de Fabric";
  a.id = d.id ?? "";
  a.nombreMod = d.name ?? d.id ?? "";
  a.dependencias = Object.keys(d.depends ?? {});
  a.minecraft = versionMinecraft(String(d.depends?.minecraft ?? ""));

  const entorno = d.environment ?? "*";
  a.lado = entorno === "client" ? "cliente" : entorno === "server" ? "servidor" : "ambos";

  // Un mod que solo registra puntos de entrada de cliente casi nunca hace nada
  // en un servidor, aunque su "environment" diga que vale para los dos.
  const puntos = Object.keys(d.entrypoints ?? {});
  if (puntos.length && puntos.every((p) => p === "client") && a.lado === "ambos") {
    a.lado = "cliente";
  }
}

function deQuilt(json: string, a: Analisis) {
  const d = jsonTolerante(json) as {
    quilt_loader?: { id?: string; metadata?: { name?: string }; depends?: unknown[] };
    minecraft?: { environment?: string };
  };
  const q = d.quilt_loader ?? {};
  a.cargador = "Quilt";
  a.tipo = "Mod de Quilt";
  a.id = q.id ?? "";
  a.nombreMod = q.metadata?.name ?? q.id ?? "";
  a.dependencias = (q.depends ?? []).map((x: unknown) =>
    typeof x === "string" ? x : String((x as { id?: string }).id ?? "")
  );
  const entorno = d.minecraft?.environment ?? "*";
  a.lado =
    entorno === "client" ? "cliente" : entorno === "dedicated_server" ? "servidor" : "ambos";
}

/**
 * Solo las dependencias obligatorias.
 *
 * Forge y NeoForge declaran también las opcionales, y avisar de que falta una
 * opcional es un aviso falso: el mod arranca igual sin ella.
 */
function dependenciasForge(toml: string, neo: boolean, propio: string): string[] {
  const ids: string[] = [];
  // Cada bloque [[dependencies.x]] llega hasta la siguiente cabecera de sección.
  for (const bloque of toml.split(/^\s*\[/m)) {
    if (!bloque.startsWith("[dependencies.")) continue;
    const id = bloque.match(/modId\s*=\s*["']([^"']+)/)?.[1];
    if (!id || id === propio || id === "minecraft") continue;
    const opcional = neo
      ? /type\s*=\s*["']optional["']/.test(bloque)
      : /mandatory\s*=\s*false/.test(bloque);
    if (!opcional) ids.push(id);
  }
  return [...new Set(ids)];
}

function deForge(toml: string, a: Analisis, neo: boolean) {
  a.cargador = neo ? "NeoForge" : "Forge";
  a.tipo = neo ? "Mod de NeoForge" : "Mod de Forge";
  a.id = campoToml(toml, "modId");
  a.nombreMod = campoToml(toml, "displayName") || a.id;
  a.dependencias = dependenciasForge(toml, neo, a.id);

  const mc = toml.match(
    /modId\s*=\s*["']minecraft["'][\s\S]{0,240}?versionRange\s*=\s*["']([^"']+)/
  );
  if (mc) a.minecraft = versionMinecraft(mc[1]);

  // Forge no tiene un campo para decir el lado del mod, solo el de cada
  // dependencia. Si todas son de un lado, el mod lo es; si no, no se sabe.
  const lados = [...toml.matchAll(/^\s*side\s*=\s*["'](\w+)/gm)].map((m) => m[1].toUpperCase());
  a.lado =
    lados.length && lados.every((l) => l === "CLIENT")
      ? "cliente"
      : lados.length && lados.every((l) => l === "SERVER")
        ? "servidor"
        : "sin-declarar";
}

function dePlugin(yml: string, a: Analisis, paper: boolean) {
  a.cargador = "Bukkit";
  a.tipo = paper ? "Plugin de Paper" : "Plugin de servidor";
  a.lado = "servidor";
  a.id = campoYaml(yml, "name");
  a.nombreMod = a.id;
  a.minecraft = campoYaml(yml, "api-version");
  a.dependencias = (campoYaml(yml, "depend").match(/[\w-]+/g) ?? []).filter(Boolean);
}

function deProxy(a: Analisis, cual: string) {
  a.cargador = "Proxy";
  a.tipo = `Plugin de ${cual}`;
  a.lado = "proxy";
}

const MENSAJES: Record<string, string> = {
  "no-es-zip": "No parece un .jar. Puede que la descarga se cortara a medias.",
  "cabecera-invalida": "El archivo está dañado por dentro. Vuelve a descargarlo.",
  zip64: "Usa ZIP64, un formato de archivo que este lector no cubre.",
  "json-invalido": "Sus datos de mod están mal escritos y no hay forma de leerlos.",
  "compresion-no-soportada": "Está comprimido de una forma que este lector no cubre.",
  "metadato-enorme": "Tiene una estructura anómala y se ha descartado por seguridad.",
  "demasiadas-entradas": "Tiene una estructura anómala y se ha descartado por seguridad.",
};

/** Analiza un .jar y devuelve qué es y en qué lado funciona. */
export async function analizarJar(fichero: File): Promise<Analisis> {
  const a: Analisis = {
    archivo: fichero.name,
    tamano: fichero.size,
    tipo: "Desconocido",
    cargador: "?",
    lado: "sin-declarar",
    minecraft: "",
    nombreMod: "",
    dependencias: [],
    id: "",
    universal: false,
  };

  try {
    const entradas = await indice(fichero);
    const mapa = new Map(entradas.map((e) => [e.nombre, e]));
    const leerSi = async (n: string) => {
      const e = mapa.get(n);
      return e ? await texto(fichero, e) : null;
    };

    const fabric = await leerSi("fabric.mod.json");
    const quilt = await leerSi("quilt.mod.json");
    const neo = await leerSi("META-INF/neoforge.mods.toml");
    const forge = await leerSi("META-INF/mods.toml");
    const paper = await leerSi("paper-plugin.yml");
    const plugin = await leerSi("plugin.yml");
    const velocity = mapa.has("velocity-plugin.json");
    const bungee = mapa.has("bungee.yml");

    // El proxy se mira el último: hay plugins que traen los metadatos de todas
    // las plataformas a la vez, y los de servidor o mod dicen más de lo que hace.
    if (paper) dePlugin(paper, a, true);
    else if (plugin) dePlugin(plugin, a, false);
    else if (fabric) deFabric(fabric, a);
    else if (quilt) deQuilt(quilt, a);
    else if (neo) deForge(neo, a, true);
    else if (forge) deForge(forge, a, false);
    else if (velocity) deProxy(a, "Velocity");
    else if (bungee) deProxy(a, "BungeeCord");
    else if (mapa.has("mcmod.info")) {
      a.cargador = "Forge";
      a.tipo = "Mod de Forge antiguo";
    }

    // Un mismo .jar puede traer los metadatos de varias plataformas. Entonces
    // vale para todas, y decir que es "de proxy" o "de Fabric" sería falso.
    const familias = [
      Boolean(paper || plugin),
      Boolean(fabric || quilt),
      Boolean(neo || forge),
      velocity || bungee,
    ].filter(Boolean).length;
    if (familias > 1) {
      a.universal = true;
      a.cargador = "Varios";
      a.tipo = "Vale para varias plataformas";
      a.lado = "ambos";
    }

    if (!a.nombreMod) a.nombreMod = fichero.name.replace(/\.jar$/i, "");
  } catch (e) {
    const clave = e instanceof Error ? e.message : "error";
    a.error =
      MENSAJES[clave] ?? "No se ha podido leer. Vuelve a descargarlo y súbelo otra vez.";
  }

  return a;
}
