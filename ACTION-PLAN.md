# SEO Action Plan

## Priority 1: High Impact / Low Effort (Do Immediately)
1. **Add Open Graph Social Meta Tags**
   - Add `<meta property="og:title" content="...">`, `og:image`, and `twitter:card` tags directly under the primary meta description in `index.html`.
   - *Why:* Drastically increases social sharing click-through rates.

2. **Implement Semantic Landmarks**
   - Wrap the hero and shop sections inside a `<main id="content">` HTML block to structure the document properly for Googlebot.

## Priority 2: Medium Impact / Medium Effort (Within 1 Month)
1. **Sitemap and Robots.txt Addition**
   - Create a static `sitemap.xml` mapping the homepage and any future category pages.
   - Inject a `robots.txt` file granting explicit wildcard allow (`User-agent: * Allow: /`).

## Priority 3: Monitoring & Maintenance (Long-Term)
1. **Image Hosting CDN Migration**
   - Before full domain launch, migrate the stock `picsum`/Canva image placeholders to an optimized delivery network (e.g., Cloudflare Images) using `.webp` formats.
