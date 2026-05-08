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
 
  if (service === 'ai') {
    try {
      const body = await request.json();
      if (!body.apiKey) {
        return new Response(JSON.stringify({ error: 'apiKey ausente' }), { status: 400, headers });
      }
      const prompt = body.system + '\n\n' + body.messages[0].content;
      const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + body.apiKey;
      const resp = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2000 }
        })
      });
      const data = await resp.json();
      const text = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts
        ? data.candidates[0].content.parts.map(function(p) { return p.text || ''; }).join('')
        : '';
      return new Response(JSON.stringify({
        content: [{ type: 'text', text: text }]
      }), { status: 200, headers });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
    }
  }
 
  return new Response(JSON.stringify({ error: 'Servico invalido' }), { status: 400, headers });
}
