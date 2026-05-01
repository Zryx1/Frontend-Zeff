let backends = [];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'POST') {
    const backend = req.body;
    backend.last_seen = new Date().toISOString();
    backends = backends.filter(b => b.url !== backend.url);
    backends.push(backend);
    backends = backends.filter(b => {
      return new Date() - new Date(b.last_seen) < 5 * 60 * 1000;
    });
    return res.json({ success: true, count: backends.length });
  }
  
  if (req.method === 'GET') {
    return res.json(backends);
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}