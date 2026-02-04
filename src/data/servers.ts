import type { ServerLocation } from '../types';

export const serverLocations: ServerLocation[] = [
  {
    name: "España",
    flag: "🇪🇸",
    nodes: [
      {
        name: "Budget - Logroño",
        host: "va.vhost.tech",
      },
      {
        name: "Normal - Barcelona",
        host: "vl.vhost.tech",
      },
      {
        name: "Premium - Barcelona",
        host: "vlp.vhost.tech",
      },
    ],
  },
];

export const getAllServers = () => serverLocations.flatMap((loc) => loc.nodes);
