// generate-sitemap.js — Phase 13: Dynamic XML Sitemap Generator
// Reads products.json and generates a comprehensive sitemap.xml

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.gemessence.com';

try {
  const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/products.json'), 'utf8'));
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { loc: '/', lastmod: today },
    { loc: '/blog.html', lastmod: today },
  ];

  // Dynamic product URLs (for future individual product pages)
  const productPages = products.map(p => ({
    loc: `/#product-${p.id}`,
    lastmod: today
  }));

  const allPages = [...staticPages, ...productPages];

  const xmlEntries = allPages.map(page => `  <url>
    <loc>${DOMAIN}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);
  console.log(`✅ sitemap.xml generated with ${allPages.length} URLs (${staticPages.length} static + ${productPages.length} products)`);

} catch (e) {
  console.error('❌ Sitemap generation failed:', e.message);
}
