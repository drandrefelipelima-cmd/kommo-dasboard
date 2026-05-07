export const config = { runtime: 'edge' };

export default async function handler(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  const url = new URL(request.url);
  const service = url.searchParams.get('service');

  // ── Proxy Kommo ──
  if (service === 'kommo') {
    const subdomain = url.searchParams.get('subdomain');
    const path = url.searchParams.get('path');
    const token = url.searchParams.get('token');
    if (!subdomain || !path || !token) {
      return new Response(JSON.stringify({ error: 'Parametros faltando' }), { status: 400, headers });
    }
    try {
      const kommoUrl = 'https://' + subdomain + '.kommo.com/api/v4/' + path;
      const resp = await fetch(kommoUrl, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await resp.json();
      return new Response(JSON.stringify(data), { status: resp.status, headers });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
    }
  }

  // ── Proxy Anthropic ──
  if (service === 'ai') {
    try {
      const body = await request.json();
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'x-api-key': body.apiKey
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          system: body.system,
          messages: body.messages
        })
      });
      const data = await resp.json();
      return new Response(JSON.stringify(data), { status: resp.status, headers });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
    }
  }

  return new Response(JSON.stringify({ error: 'Servico invalido' }), { status: 400, headers });
}
