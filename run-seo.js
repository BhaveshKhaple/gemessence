const fs = require('fs');
const htmlPath = './index.html';

try {
  let html = fs.readFileSync(htmlPath, 'utf8');
  const products = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf8'));

  // Generate dynamic keywords based on products
  const allTags = [...new Set(products.map(p => p.tags).flat())];
  const topKeywords = allTags.slice(0, 15).join(', ');
  
  const newTitle = `<title>Gemessence | Premium Authentic Gemstone Bracelets & Healing Crystals</title>`;
  const newDesc = `<meta name="description" content="Discover our exclusive collection of authentic gemstone bracelets. Enhance your aura with ${topKeywords}. Shop premium quality healing crystals today.">`;
  
  html = html.replace(/<title>.*<\/title>/, newTitle);
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description".*?>/, newDesc);
  } else {
    html = html.replace('</title>', '</title>\n  ' + newDesc);
  }
  
  fs.writeFileSync(htmlPath, html);
  console.log('Automated SEO tags successfully injected into index.html');
} catch (e) {
  console.error('SEO Generation Failed:', e);
}
