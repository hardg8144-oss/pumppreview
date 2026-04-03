export default async function handler(req, res) {
  let ca = req.query.address || req.url.slice(1).split('?')[0];
  if (!ca || ca.length < 30) return res.status(400).send('Bad address');

  if (req.headers['user-agent']?.includes('Twitterbot')) {
    let html = await fetch(`https://pump.fun/coin/${ca}`).then(r=>r.text());
    let title = html.match(/<title>(.*?)<\/title>/)?.[1] || 'Token';
    let img = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] || 'https://pump.fun/logo.png';
    
    res.send(`<!DOCTYPE html>
    <html><head>
      <meta property="og:title" content="${title}" />
      <meta property="og:image" content="${img}" />
      <meta name="twitter:card" content="summary_large_image" />
    </head><body></body></html>`);
  } else {
    res.redirect(`https://pumpchatstreams.live/token/${ca}`); // CHANGE THIS
  }
}