const http = require('http');
const url = require('url');

const PORT = 3000;
const SERVER_NAME = 'QuickServe';

// ── Motivational Quotes ───────────────────────────────────────────────
const quotes = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'The best error message is the one that never shows up.', author: 'Thomas Fuchs' },
  { text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
];

// ── Shared Styles ─────────────────────────────────────────────────────
const baseStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  nav {
    background: #1e293b;
    padding: 14px 32px;
    display: flex;
    align-items: center;
    gap: 24px;
    border-bottom: 3px solid #0D9488;
  }
  nav .brand {
    font-size: 1.3rem;
    font-weight: 700;
    color: #0D9488;
  }
  nav a {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.9rem;
    padding: 6px 14px;
    border-radius: 20px;
    transition: all 0.2s;
  }
  nav a:hover {
    background: rgba(13, 148, 136, 0.15);
    color: #5eead4;
  }
  .container {
    max-width: 720px;
    margin: 60px auto;
    padding: 40px;
    background: #1e293b;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    border-top: 4px solid #0D9488;
  }
  h1 { color: #0D9488; margin-bottom: 16px; font-size: 2rem; }
  h2 { color: #5eead4; margin-bottom: 12px; }
  p { line-height: 1.7; color: #cbd5e1; margin-bottom: 12px; }
  .tag {
    display: inline-block;
    background: rgba(13, 148, 136, 0.15);
    color: #5eead4;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 0.8rem;
    margin: 4px 4px 4px 0;
  }
  .highlight { color: #0D9488; font-weight: 600; }
  footer {
    text-align: center;
    padding: 20px;
    color: #475569;
    font-size: 0.8rem;
    margin-top: auto;
  }
`;

const navBar = `
  <nav>
    <span class="brand">⚡ ${SERVER_NAME}</span>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <a href="/time">Time</a>
    <a href="/greet?name=Shreya">Greet</a>
    <a href="/quote">Quote</a>
  </nav>
`;

const footerHtml = `<footer>Built with Node.js &mdash; ${SERVER_NAME} &copy; 2026</footer>`;

function buildPage(title, bodyContent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ${SERVER_NAME}</title>
  <style>${baseStyles}</style>
</head>
<body>
  ${navBar}
  ${bodyContent}
  ${footerHtml}
</body>
</html>`;
}

// ── Route Handlers ────────────────────────────────────────────────────

function homePage() {
  return buildPage('Home', `
    <div class="container">
      <h1>Welcome to ${SERVER_NAME} ⚡</h1>
      <p>A lightweight Node.js HTTP server built from scratch — no frameworks, no dependencies, just pure JavaScript.</p>
      <h2>Available Routes</h2>
      <div>
        <span class="tag">/ Home</span>
        <span class="tag">/about</span>
        <span class="tag">/contact</span>
        <span class="tag">/time</span>
        <span class="tag">/greet?name=Shreya</span>
        <span class="tag">/quote</span>
      </div>
    </div>
  `);
}

function aboutPage() {
  return buildPage('About', `
    <div class="container">
      <h1>About ${SERVER_NAME}</h1>
      <p>This server was built as part of the <span class="highlight">SuprMentr Full-Stack Web Development Internship</span>.</p>
      <p>It demonstrates how to create an HTTP server using Node.js's built-in <code>http</code> module, handle routing, parse query parameters, and serve dynamic HTML responses.</p>
      <h2>Tech Stack</h2>
      <div>
        <span class="tag">Node.js</span>
        <span class="tag">HTTP Module</span>
        <span class="tag">URL Parsing</span>
        <span class="tag">Dynamic HTML</span>
      </div>
    </div>
  `);
}

function contactPage() {
  return buildPage('Contact', `
    <div class="container">
      <h1>Contact Info</h1>
      <p>📧 <span class="highlight">shreyasana3@gmail.com</span></p>
      <p>📍 <span class="highlight">Bangalore, India</span></p>
      <p>🎓 <span class="highlight">Global Academy of Technology</span></p>
      <h2>Connect</h2>
      <div>
        <span class="tag">GitHub</span>
        <span class="tag">LinkedIn</span>
        <span class="tag">Email</span>
      </div>
    </div>
  `);
}

function timePage() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  return buildPage('Time', `
    <div class="container" style="text-align:center;">
      <h1>🕐 Server Time</h1>
      <p style="font-size:2.5rem; color:#0D9488; font-weight:700; margin:20px 0;">${timeStr}</p>
      <p style="font-size:1.1rem;">${dateStr}</p>
      <div style="margin-top:20px;">
        <span class="tag">Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
      </div>
    </div>
  `);
}

function greetPage(name) {
  const displayName = name || 'Shreya';
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';
  else greeting = 'Good evening';

  return buildPage('Greet', `
    <div class="container" style="text-align:center;">
      <h1>${greeting}, ${displayName}! 👋</h1>
      <p>Welcome to <span class="highlight">${SERVER_NAME}</span>. Hope you're having a great day!</p>
      <p style="margin-top:16px;">Try: <code>/greet?name=YourName</code></p>
    </div>
  `);
}

function quotePage() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return buildPage('Quote', `
    <div class="container" style="text-align:center;">
      <h1>💡 Random Quote</h1>
      <blockquote style="font-size:1.4rem; font-style:italic; color:#5eead4; margin:28px 0; line-height:1.6;">
        "${randomQuote.text}"
      </blockquote>
      <p style="color:#94a3b8;">— ${randomQuote.author}</p>
      <p style="margin-top:24px;"><a href="/quote" style="color:#0D9488; text-decoration:underline;">Get another quote →</a></p>
    </div>
  `);
}

function notFoundPage(path) {
  return buildPage('404', `
    <div class="container" style="text-align:center;">
      <h1>404 — Not Found</h1>
      <p>The route <code>${path}</code> doesn't exist on this server.</p>
      <p><a href="/" style="color:#0D9488; text-decoration:underline;">← Back to Home</a></p>
    </div>
  `);
}

// ── Server ────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  let html;
  let statusCode = 200;

  switch (pathname) {
    case '/':
      html = homePage();
      break;
    case '/about':
      html = aboutPage();
      break;
    case '/contact':
      html = contactPage();
      break;
    case '/time':
      html = timePage();
      break;
    case '/greet':
      html = greetPage(query.name);
      break;
    case '/quote':
      html = quotePage();
      break;
    default:
      statusCode = 404;
      html = notFoundPage(pathname);
  }

  res.writeHead(statusCode);
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`⚡ ${SERVER_NAME} is running at http://localhost:${PORT}`);
  console.log(`  Routes: /, /about, /contact, /time, /greet, /quote`);
});
