// Servicio para backend (servidor Astro)
import ping from "ping";

interface ServerConfig {
  name: string;
  address: string;
}

const servers: ServerConfig[] = [
  { name: "Nodo Budget", address: "212.21.251.199" },
  { name: "Nodo Normal", address: "95.19.114.8" },
  { name: "Nodo Premium", address: "95.19.114.8" },
  { name: "Game Panel", address: "panel.vhost.tech" },
];

export interface ServerStatusResult {
  name: string;
  address: string;
  isOnline: boolean;
  responseTime: number | null;
}

/**
 * Obtiene el estado de todos los servidores usando ping real
 * Solo funciona en servidor (Node.js)
 */
export async function getServersStatus(): Promise<ServerStatusResult[]> {
  const countFlag = process.platform === "win32" ? "-n" : "-c";
  const options = { timeout: 2, extra: [countFlag, "1"] };

  const results = await Promise.all(
    servers.map(async ({ name, address }) => {
      try {
        const res = await ping.promise.probe(address, options);
        const t =
          res.time && res.time !== "unknown" && res.time !== ""
            ? Number(res.time)
            : null;
        return { name, address, isOnline: res.alive, responseTime: t };
      } catch (error) {
        console.error(`Error pinging ${name} (${address}):`, error);
        return { name, address, isOnline: false, responseTime: null };
      }
    })
  );

  return results;
}

/**
 * Obtiene el estado de un servidor específico
 */
export async function getSingleServerStatus(name: string): Promise<ServerStatusResult | null> {
  const server = servers.find(s => s.name === name);
  if (!server) return null;

  const countFlag = process.platform === "win32" ? "-n" : "-c";
  const options = { timeout: 2, extra: [countFlag, "1"] };

  try {
    const res = await ping.promise.probe(server.address, options);
    const t =
      res.time && res.time !== "unknown" && res.time !== ""
        ? Number(res.time)
        : null;
    return { name: server.name, address: server.address, isOnline: res.alive, responseTime: t };
  } catch (error) {
    console.error(`Error pinging ${name} (${server.address}):`, error);
    return { name: server.name, address: server.address, isOnline: false, responseTime: null };
  }
}
