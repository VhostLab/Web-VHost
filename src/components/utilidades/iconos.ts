// Trazos de los iconos de las utilidades.
//
// Van en SVG y no como emoji ni como fuente de iconos: heredan el color del
// texto, escalan sin perder nitidez y no dependen de que cargue un CDN.
// Todos comparten lienzo de 24x24 y grosor de línea, así que se ven como un
// conjunto y no como piezas sueltas de sitios distintos.

export type NombreIcono =
  | "paquete"
  | "calculadora"
  | "globo"
  | "candado"
  | "escudo"
  | "sin-cuenta"
  | "documento"
  | "cerrar"
  | "aviso"
  | "copiar"
  | "check"
  | "flecha"
  | "informacion"
  | "reiniciar";

export const TRAZOS: Record<NombreIcono, string> = {
  paquete: `<path d="M21 8.5v7l-9 5-9-5v-7l9-5 9 5Z"/><path d="M3.3 7.8 12 12.6l8.7-4.8"/><path d="M12 12.6v8.4"/>`,
  calculadora: `<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"/>`,
  globo: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z"/>`,
  candado: `<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>`,
  escudo: `<path d="M12 3.2 19.5 6v6.2c0 4.6-3.2 7.6-7.5 8.6-4.3-1-7.5-4-7.5-8.6V6L12 3.2Z"/><path d="M9 12.2l2.2 2.2L15.2 10"/>`,
  "sin-cuenta": `<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5"/>`,
  documento: `<path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3Z"/><path d="M13.5 3v5.5H19"/>`,
  cerrar: `<path d="M6.5 6.5l11 11"/><path d="M17.5 6.5l-11 11"/>`,
  aviso: `<path d="M12 4.2 21 19.2H3L12 4.2Z"/><path d="M12 10v4"/><path d="M12 16.8h.01"/>`,
  copiar: `<rect x="9" y="9" width="11" height="12" rx="2"/><path d="M5.5 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.5"/>`,
  check: `<path d="M5 12.5l4.5 4.5L19 7.5"/>`,
  flecha: `<path d="M4.5 12h15"/><path d="M13 5.5l6.5 6.5-6.5 6.5"/>`,
  informacion: `<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><path d="M12 7.8h.01"/>`,
  reiniciar: `<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5V9H15"/>`,
};
