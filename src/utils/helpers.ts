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
