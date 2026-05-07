export const config = { runtime: 'edge' };

export default async function handler(request) {
  const url = new URL(request.url);
  const subdomain = url.searchParams.get('subdomain');
  const path = url.searchParams.get('path');
  const token = request.headers.get('x-kommo-token');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  if (!subdomain || !path || !token) {
    return new Response(JSON.stringify({ error: 'Parametros faltando' }), { status: 400, headers });
  }

  try {
    const kommoUrl = `https://${subdomain}.kommo.com/api/v4/${path}`;
    const resp = await fetch(kommoUrl, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await resp.json();
    return new Response(JSON.stringify(data), { status: resp.status, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
