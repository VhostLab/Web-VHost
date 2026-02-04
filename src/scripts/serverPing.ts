/**
 * Cliente-side script para medir la latencia de servidores
 */

interface PingConfig {
  budget: number;
  normal: number;
  premium: number;
  [key: string]: number;
}

/**
 * Obtiene la latencia real haciendo un fetch al dominio
 */
async function getLatency(domain: string): Promise<number> {
  const start = performance.now();
  try {
    await fetch(`https://${domain}/?_=${start}`, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-cache",
    });
    const end = performance.now();
    return Math.floor(end - start);
  } catch (error) {
    console.error(`Error fetching latency for ${domain}:`, error);
    return -1;
  }
}

/**
 * Simula latencia cuando el ping real falla
 * Usa valores base configurables por tipo de servidor
 */
function simulateLatency(id: string): number {
  const base: PingConfig = {
    budget: 18,
    normal: 14,
    premium: 10,
  };
  return (base[id] || 20) + Math.floor(Math.random() * 8);
}

/**
 * Clase para manejar el testing de ping en múltiples servidores
 */
class PingTester {
  private isRunning = false;
  private interval: number | null = null;

  /**
   * Ejecuta la prueba de ping en todos los elementos con clase .ping-value
   */
  async runTest(): Promise<void> {
    if (this.isRunning) return;
    this.isRunning = true;

    const elements = document.querySelectorAll<HTMLElement>(".ping-value");

    // Mostrar estado de "midiendo"
    elements.forEach((el) => {
      el.className =
        "ping-value text-gray-500 font-mono font-bold text-lg opacity-50";
    });

    // Pausa para efecto visual
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Medir latencia de cada servidor
    for (const el of elements) {
      const domain = el.getAttribute("data-domain");
      const id = el.getAttribute("data-id");

      if (!domain || !id) continue;

      let latency = await getLatency(domain);
      if (latency <= 0) {
        latency = simulateLatency(id);
      }

      // Color siempre verde (puedes cambiar esta lógica si lo necesitas)
      const colorClass = this.getColorForLatency(latency);

      el.innerText = String(latency);
      el.className = `ping-value ${colorClass} font-mono font-bold text-lg animate-pulse`;

      // Pausa entre elementos para efecto cascada
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    this.isRunning = false;
  }

  /**
   * Determina el color basado en la latencia
   * Actualmente siempre retorna verde, pero puedes personalizar
   */
  private getColorForLatency(latency: number): string {
    // Por ahora siempre verde según el código original
    return "text-green-400";

    // Descomenta si quieres lógica condicional:
    // if (latency > 100) return "text-red-400";
    // if (latency > 40) return "text-yellow-400";
    // return "text-green-400";
  }

  /**
   * Inicia el testing automático
   * @param intervalMs Intervalo en milisegundos (default: 15000 = 15 segundos)
   */
  start(intervalMs: number = 15000): void {
    // Ejecutar inmediatamente
    this.runTest();

    // Configurar intervalo
    this.interval = window.setInterval(() => {
      this.runTest();
    }, intervalMs);
  }

  /**
   * Detiene el testing automático
   */
  stop(): void {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// Exportar e inicializar automáticamente cuando el DOM esté listo
export function initPingTester(intervalMs?: number): PingTester {
  const tester = new PingTester();
  tester.start(intervalMs);
  return tester;
}

// Auto-inicialización si estamos en el cliente
if (typeof window !== 'undefined') {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initPingTester());
  } else {
    initPingTester();
  }
}
