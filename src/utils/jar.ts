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
export type Cargador = "Fabric" | "Forge" | "NeoForge" | "Quilt" | "Bukkit" | "Proxy" | "?";

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
  /** Ids de los que depende, para detectar dependencias que faltan. */
  dependencias: string[];
  /** Id propio, para saber si otro archivo lo aporta. */
  id: string;
  /** En qué nos basamos para decir lo que decimos. */
  evidencias: string[];
  error?: string;
}

// Un ZIP sano no necesita nada de esto, pero un archivo manipulado sí: son los
// topes que evitan que un fichero pequeño nos haga reservar memoria sin fin.
const MAX_ENTRADAS = 20000;
const MAX_METADATO = 2 * 1024 * 1024;
const TAM_COLA = 66_000; // 64 KB de comentario máximo + la cabecera del índice

const FICHEROS = [
  "fabric.mod.json",
  "quilt.mod.json",
  "META-INF/mods.toml",
  "META-INF/neoforge.mods.toml",
  "mcmod.info",
  "plugin.yml",
  "paper-plugin.yml",
  "bungee.yml",
  "velocity-plugin.json",
];

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

const campoYaml = (t: string, clave: string) =>
  t.match(new RegExp(`^${clave}\\s*:\\s*["']?([^"'\\n#]+)`, "m"))?.[1].trim() ?? "";

const campoToml = (t: string, clave: string) =>
  t.match(new RegExp(`^\\s*${clave}\\s*=\\s*["']([^"']+)`, "m"))?.[1].trim() ?? "";

/** Versión de Minecraft dentro de un rango tipo "[1.20.1,1.21)" o ">=1.20.1". */
const versionMinecraft = (rango: string) =>
  rango.match(/\d+\.\d+(\.\d+)?/)?.[0] ?? "";

function deFabric(json: string, a: Analisis) {
  const d = JSON.parse(json);
  a.cargador = "Fabric";
  a.tipo = "Mod de Fabric";
  a.id = d.id ?? "";
  a.nombreMod = d.name ?? d.id ?? "";
  a.dependencias = Object.keys(d.depends ?? {});
  a.minecraft = versionMinecraft(String(d.depends?.minecraft ?? ""));

  const entorno = d.environment ?? "*";
  a.lado = entorno === "client" ? "cliente" : entorno === "server" ? "servidor" : "ambos";
  a.evidencias.push(
    d.environment
      ? `fabric.mod.json declara "environment": "${entorno}".`
      : 'fabric.mod.json no trae "environment", y su valor por defecto es "*" (ambos lados).'
  );

  // Un mod que solo registra puntos de entrada de cliente casi nunca hace nada
  // en un servidor, aunque su "environment" diga que vale para los dos.
  const puntos = Object.keys(d.entrypoints ?? {});
  if (puntos.length) {
    a.evidencias.push(`Puntos de entrada declarados: ${puntos.join(", ")}.`);
    const soloCliente = puntos.length > 0 && puntos.every((p) => p === "client");
    if (soloCliente && a.lado === "ambos") {
      a.lado = "cliente";
      a.evidencias.push(
        "Solo tiene punto de entrada de cliente, así que en un servidor no ejecutaría nada."
      );
    }
  }
}

function deQuilt(json: string, a: Analisis) {
  const d = JSON.parse(json);
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
  a.evidencias.push(`quilt.mod.json declara environment "${entorno}".`);
}

function deForge(toml: string, a: Analisis, neo: boolean) {
  a.cargador = neo ? "NeoForge" : "Forge";
  a.tipo = neo ? "Mod de NeoForge" : "Mod de Forge";
  a.id = campoToml(toml, "modId");
  a.nombreMod = campoToml(toml, "displayName") || a.id;
  a.evidencias.push(
    `${neo ? "META-INF/neoforge.mods.toml" : "META-INF/mods.toml"} presente.`
  );

  const mc = toml.match(/modId\s*=\s*["']minecraft["'][\s\S]{0,240}?versionRange\s*=\s*["']([^"']+)/);
  if (mc) {
    a.minecraft = versionMinecraft(mc[1]);
    a.evidencias.push(`Declara compatibilidad con Minecraft ${mc[1]}.`);
  }

  a.dependencias = [...toml.matchAll(/modId\s*=\s*["']([^"']+)/g)]
    .map((m) => m[1])
    .filter((id) => id !== a.id && id !== "minecraft");

  // Forge no obliga a declarar el lado del mod, solo el de sus dependencias.
  const lados = [...toml.matchAll(/^\s*side\s*=\s*["'](\w+)/gm)].map((m) => m[1].toUpperCase());
  if (lados.length && lados.every((l) => l === "CLIENT")) {
    a.lado = "cliente";
    a.evidencias.push('Todas sus dependencias declaran side = "CLIENT".');
  } else if (lados.length && lados.every((l) => l === "SERVER")) {
    a.lado = "servidor";
    a.evidencias.push('Sus dependencias declaran side = "SERVER".');
  } else {
    a.lado = "sin-declarar";
    a.evidencias.push(
      "No declara en qué lado funciona: Forge no obliga a decirlo, así que hay que mirarlo en la página del mod."
    );
  }
}

function dePlugin(yml: string, a: Analisis, paper: boolean) {
  a.cargador = "Bukkit";
  a.tipo = paper ? "Plugin de Paper" : "Plugin de servidor";
  a.lado = "servidor";
  a.id = campoYaml(yml, "name");
  a.nombreMod = a.id;
  a.minecraft = campoYaml(yml, "api-version");
  a.dependencias = (campoYaml(yml, "depend").match(/[\w-]+/g) ?? []).filter(Boolean);
  a.evidencias.push(
    `${paper ? "paper-plugin.yml" : "plugin.yml"} presente: es un plugin, y los plugins solo existen en el servidor.`
  );
  if (a.minecraft) a.evidencias.push(`Declara api-version ${a.minecraft}.`);
}

function deProxy(a: Analisis, cual: string) {
  a.cargador = "Proxy";
  a.tipo = `Plugin de ${cual}`;
  a.lado = "proxy";
  a.evidencias.push(
    `Contiene ${cual === "Velocity" ? "velocity-plugin.json" : "bungee.yml"}: va en el proxy, no en el servidor de juego.`
  );
}

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
    evidencias: [],
  };

  try {
    const entradas = await indice(fichero);
    const mapa = new Map(entradas.map((e) => [e.nombre, e]));
    const buscar = (n: string) => mapa.get(n);

    const leerSi = async (n: string) => {
      const e = buscar(n);
      return e ? await texto(fichero, e) : null;
    };

    const fabric = await leerSi("fabric.mod.json");
    const quilt = await leerSi("quilt.mod.json");
    const neo = await leerSi("META-INF/neoforge.mods.toml");
    const forge = await leerSi("META-INF/mods.toml");
    const paper = await leerSi("paper-plugin.yml");
    const plugin = await leerSi("plugin.yml");
    const velocity = buscar("velocity-plugin.json");
    const bungee = buscar("bungee.yml");

    if (velocity) deProxy(a, "Velocity");
    else if (bungee) deProxy(a, "BungeeCord");
    else if (paper) dePlugin(paper, a, true);
    else if (plugin) dePlugin(plugin, a, false);
    else if (fabric) deFabric(fabric, a);
    else if (quilt) deQuilt(quilt, a);
    else if (neo) deForge(neo, a, true);
    else if (forge) deForge(forge, a, false);
    else if (buscar("mcmod.info")) {
      a.cargador = "Forge";
      a.tipo = "Mod de Forge antiguo";
      a.evidencias.push(
        "Solo trae mcmod.info, el formato de Forge anterior a 1.13, que no dice en qué lado funciona."
      );
    } else {
      a.evidencias.push(
        "No contiene fabric.mod.json, mods.toml, quilt.mod.json ni plugin.yml, así que no se identifica como mod ni como plugin."
      );
      const clases = entradas.filter((e) => e.nombre.endsWith(".class")).length;
      a.evidencias.push(
        clases
          ? `Sí tiene ${clases} clases compiladas: puede ser una librería o un mod con los metadatos mal empaquetados.`
          : "Tampoco tiene clases compiladas: probablemente no sea un mod."
      );
    }

    if (!a.nombreMod) a.nombreMod = fichero.name.replace(/\.jar$/i, "");
  } catch (e) {
    const clave = e instanceof Error ? e.message : "error";
    a.error =
      clave === "no-es-zip" || clave === "cabecera-invalida"
        ? "No se puede abrir: no es un .jar válido o está dañado."
        : clave === "zip64"
          ? "El archivo usa ZIP64 y este lector no lo cubre."
          : clave === "metadato-enorme" || clave === "demasiadas-entradas"
            ? "El archivo tiene una estructura anómala y se ha descartado por seguridad."
            : "No se ha podido leer el archivo.";
  }

  return a;
}

/** ¿Sirve este archivo en un servidor? */
export const sirveEnServidor = (a: Analisis): "si" | "no" | "duda" => {
  if (a.error) return "duda";
  if (a.lado === "cliente") return "no";
  if (a.lado === "servidor" || a.lado === "ambos") return "si";
  return "duda";
};
