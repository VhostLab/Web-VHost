import type { ServerStatus } from '../types';
import { getAllServers } from '../data/servers';

/**
 * Simula la latencia del servidor basándose en una prueba ping básica
 * En producción, esto debería hacer una llamada real al API
 */
export async function getServerLatency(host: string): Promise<number> {
  try {
    const start = performance.now();

    // Intenta hacer fetch a un endpoint que responda rápido
    await fetch(`https://${host}`, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache',
    });

    const end = performance.now();
    return Math.round(end - start);
  } catch (error) {
    console.error(`Error checking latency for ${host}:`, error);
    return -1;
  }
}

/**
 * Obtiene el estado de todos los servidores
 */
export async function getAllServersStatus(): Promise<ServerStatus[]> {
  const servers = getAllServers();

  const statusPromises = servers.map(async (server) => {
    const latency = await getServerLatency(server.host);

    return {
      name: server.name,
      status: latency > 0 ? 'online' as const : 'offline' as const,
      latency: latency > 0 ? latency : undefined,
    };
  });

  return Promise.all(statusPromises);
}

/**
 * Versión para el cliente que simula latencia
 */
export function simulateLatency(baseLatency: number = 50): number {
  return baseLatency + Math.floor(Math.random() * 30);
}
