// Recorta el fondo liso de una imagen y la deja con transparencia.
//
// Uso: node scripts/remove-bg.mjs <entrada> <salida> [--size 1024] [--bg 255,255,255]
//
// Usa relleno por inundacion desde los bordes en lugar de un umbral global:
// asi solo desaparece el fondo exterior conectado y se conservan las zonas
// del mismo color que esten dentro del dibujo (una tarjeta blanca, los ojos,
// un portatil gris claro...). Los pixeles del borde suavizado reciben alfa
// parcial segun su distancia al color de fondo, que es lo que evita el
// tipico halo blanco alrededor de la silueta.

import sharp from 'sharp';

const args = process.argv.slice(2);
const [input, output] = args.filter((a) => !a.startsWith('--'));
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};

if (!input || !output) {
  console.error('uso: node scripts/remove-bg.mjs <entrada> <salida> [--size N] [--bg R,G,B]');
  process.exit(1);
}

const SIZE = Number(flag('size', 1024));
const BG = flag('bg', '255,255,255').split(',').map(Number);
// Por debajo de esta distancia al color de fondo el pixel es fondo puro.
const SOLID = Number(flag('solid', 12));
// Entre SOLID y FEATHER el pixel es borde suavizado: alfa proporcional.
const FEATHER = Number(flag('feather', 70));

const src = sharp(input).ensureAlpha();
const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const dist = (i) =>
  Math.max(
    Math.abs(data[i] - BG[0]),
    Math.abs(data[i + 1] - BG[1]),
    Math.abs(data[i + 2] - BG[2]),
  );

// Relleno por inundacion desde todo el marco de la imagen.
const alpha = new Uint8Array(width * height).fill(255);
const seen = new Uint8Array(width * height);
const queue = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const p = y * width + x;
  if (seen[p]) return;
  const d = dist(p * channels);
  if (d >= FEATHER) return; // parte del dibujo: no seguimos por aqui
  seen[p] = 1;
  alpha[p] = d <= SOLID ? 0 : Math.round(((d - SOLID) / (FEATHER - SOLID)) * 255);
  queue.push(p);
};

for (let x = 0; x < width; x++) { push(x, 0); push(x, height - 1); }
for (let y = 0; y < height; y++) { push(0, y); push(width - 1, y); }

while (queue.length) {
  const p = queue.pop();
  const x = p % width;
  const y = (p / width) | 0;
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
}

// --pockets: limpia tambien las bolsas de fondo que quedan encerradas por el
// dibujo (huecos entre un brazo y el cuerpo, por ejemplo), donde el relleno
// desde el borde no llega. Solo con umbral estricto, asi que unicamente vale
// cuando el sujeto no contiene el color de fondo.
if (args.includes('--pockets')) {
  for (let p = 0; p < width * height; p++) {
    if (alpha[p] !== 255) continue;
    const d = dist(p * channels);
    // Mismo criterio que el relleno exterior: el amarillo puro desaparece y
    // el borde mezclado recibe alfa parcial. Si solo borraramos el color puro
    // quedaria un aro del color de fondo rodeando cada hueco.
    if (d < FEATHER) alpha[p] = d <= SOLID ? 0 : Math.round(((d - SOLID) / (FEATHER - SOLID)) * 255);
  }
}

// --erode N: come N pixeles del borde opaco. En dibujo con trazo grueso el
// contorno mezcla fondo y linea, y esa franja es la que produce el halo de
// color; recortarla es mas fiable que intentar adivinar su transparencia.
const ERODE = Number(flag('erode', 0));
for (let pass = 0; pass < ERODE; pass++) {
  const snapshot = alpha.slice();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      if (snapshot[p] === 0) continue;
      const n = [
        x > 0 ? snapshot[p - 1] : 0,
        x < width - 1 ? snapshot[p + 1] : 0,
        y > 0 ? snapshot[p - width] : 0,
        y < height - 1 ? snapshot[p + width] : 0,
      ];
      if (n.some((v) => v < 128)) alpha[p] = 0;
    }
  }
}

// Recorte al contenido visible.
let minX = width, minY = height, maxX = -1, maxY = -1;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (alpha[y * width + x] > 8) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
if (maxX < 0) {
  console.error('error: no queda nada visible; revisa --bg o sube --feather');
  process.exit(1);
}

const out = Buffer.alloc(width * height * 4);
for (let p = 0; p < width * height; p++) {
  out[p * 4] = data[p * channels];
  out[p * 4 + 1] = data[p * channels + 1];
  out[p * 4 + 2] = data[p * channels + 2];
  out[p * 4 + 3] = alpha[p];
}

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;
const removed = ((seen.reduce((a, b) => a + b, 0) / (width * height)) * 100).toFixed(1);

// --square deja un lienzo cuadrado con relleno transparente, util cuando la
// imagen sustituye a otra cuadrada y no queremos mover la maquetacion.
const square = args.includes('--square');
const resize = square
  ? { width: SIZE, height: SIZE, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }
  : { width: SIZE, height: SIZE, fit: 'inside', withoutEnlargement: true };

await sharp(out, { raw: { width, height, channels: 4 } })
  .extract({ left: minX, top: minY, width: cropW, height: cropH })
  .resize(resize)
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile(output);

const final = await sharp(output).metadata();
console.log(`fondo eliminado: ${removed}% de la imagen`);
console.log(`recorte: ${width}x${height} -> ${cropW}x${cropH}`);
console.log(`salida:  ${output}  ${final.width}x${final.height}  alpha=${!!final.hasAlpha}`);
