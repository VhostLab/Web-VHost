// src/pages/api/status.ts
import { getServersStatus } from '../../lib/serverStatus';

export async function GET() {
  const servers = await getServersStatus();
  return new Response(JSON.stringify(servers), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
