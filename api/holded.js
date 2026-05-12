export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const HOLDED_API_KEY = '607fb6450063dd2e03c879f70912bb46';
  const { tipo = 'estimate' } = req.query;

  try {
    const response = await fetch(
      `https://api.holded.com/api/invoicing/v1/documents/${tipo}`,
      {
        headers: {
          'key': HOLDED_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
