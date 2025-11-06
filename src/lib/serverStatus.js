// ESM
import ping from "ping";

const servers = [
  { name: "Nodo Budget", address: "212.21.251.199" },
  { name: "Nodo Normal", address: "95.19.114.8" },
  { name: "Nodo Premium", address: "95.19.114.8" },
  { name: "Game Panel", address: "panel.vhost.tech" },
];

export async function getServersStatus() {
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
      } catch {
        return { name, address, isOnline: false, responseTime: null };
      }
    })
  );

  return results;
}
