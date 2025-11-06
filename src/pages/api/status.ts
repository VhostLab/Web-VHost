// src/pages/api/status.ts
import { getServersStatus } from '../../lib/serverStatus.js';

export async function GET() {
  const servers = await getServersStatus();
  return new Response(JSON.stringify(servers), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
