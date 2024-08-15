Bun.serve({
  development: true,
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/') return new Response('Hello, Bun Homepage!');
    return new Response('Bun');
  }
});
