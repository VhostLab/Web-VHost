// src/pages/api/status.ts
import { getServersStatus } from '@services/serverStatusService';

export async function GET() {
  try {
    const servers = await getServersStatus();
    return new Response(JSON.stringify(servers), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30', // Cache por 30 segundos
      },
    });
  } catch (error) {
    console.error('Error fetching server status:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch server status' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
