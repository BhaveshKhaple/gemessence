// run-seo.js — Automated SEO Tag Injection (Phase 5 + 13)
// Injects dynamic meta title, description, and canonical URL into index.html

const fs = require('fs');
const htmlPath = './index.html';

try {
  let html = fs.readFileSync(htmlPath, 'utf8');
  const products = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf8'));

  // Generate dynamic keywords based on products
  const allTags = [...new Set(products.map(p => p.tags).flat())];
  const topKeywords = allTags.slice(0, 15).join(', ');
  
  // Phase 5: Dynamic Title & Meta Description
  const newTitle = `<title>Gemessence | Premium Authentic Gemstone Bracelets & Healing Crystals</title>`;
  const newDesc = `<meta name="description" content="Discover our exclusive collection of authentic gemstone bracelets. Enhance your aura with ${topKeywords}. Shop premium quality healing crystals today.">`;
  
  html = html.replace(/<title>.*<\/title>/, newTitle);
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description".*?>/, newDesc);
  } else {
    html = html.replace('</title>', '</title>\n  ' + newDesc);
  }

  // Phase 13: Canonical URL Injection
  const canonicalTag = `<link rel="canonical" href="https://www.gemessence.com/">`;
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link rel="canonical".*?>/, canonicalTag);
  } else {
    html = html.replace('</title>', `</title>\n  ${canonicalTag}`);
  }
  
  fs.writeFileSync(htmlPath, html);
  console.log('✅ SEO tags + canonical URL successfully injected into index.html');
} catch (e) {
  console.error('❌ SEO Generation Failed:', e);
}
