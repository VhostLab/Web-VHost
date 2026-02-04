export interface ServerNode {
  name: string;
  host: string;
}

export interface ServerLocation {
  name: string;
  flag: string;
  nodes: ServerNode[];
}

export interface ServerStatus {
  name: string;
  status: 'online' | 'offline' | 'checking';
  latency?: number;
}
