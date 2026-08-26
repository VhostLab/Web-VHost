/**
 * Formatea un precio para mostrar
 */
export function formatPrice(price: string): string {
  return price;
}

/**
 * Valida si una cadena está vacía o es undefined
 */
export function isEmpty(value?: string): boolean {
  return !value || value.trim() === '';
}

/**
 * Trunca un texto a una longitud máxima
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Genera un ID único simple
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Minutos de lectura estimados a partir del markdown de una entrada.
 * 200 palabras por minuto es la referencia habitual para texto técnico.
 */
export function readingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Fecha corta para tarjetas y metadatos: "14 ago 2026".
 */
export function shortDate(date: Date): string {
  return date
    .toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    .replace(/\./g, '');
}

/**
 * Fecha larga para la cabecera de una entrada: "14 de agosto de 2026".
 */
export function longDate(date: Date): string {
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}
