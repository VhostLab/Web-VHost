import ping from 'ping';

export interface Server {
  name: string;
  address: string;
  isOnline: boolean;
  responseTime: number | null;
}

export async function getServersStatus(): Promise<Server[]> {
  const servers = [
    { name: 'va.vhost.tech', address: '212.21.251.199' },
    { name: 'vl.vhost.tech', address: '95.19.114.51' },
  ];

  const results = await Promise.all(
    servers.map(async (s) => {
      try {
        const res = await ping.promise.probe(s.address, {
          timeout: 2,         // número, como exige PingConfig.timeout?: number
          extra: ['-c', '1'], 
        });

        return {
          name: s.name,
          address: s.address,
          isOnline: res.alive,
          responseTime: res.time !== 'unknown' ? parseFloat(res.time) : null,
        };
      } catch {
        return {
          name: s.name,
          address: s.address,
          isOnline: false,
          responseTime: null,
        };
      }
    })
  );

  return results;
}
