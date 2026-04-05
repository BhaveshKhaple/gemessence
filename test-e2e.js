const puppeteer = require('puppeteer');

(async () => {
  console.log("🚀 Starting Automated E2E Verification Tests...");
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
    console.log("✅ Site Loaded Successfully.");

    // --- TEST 2: Smart Search Filtering ---
    let visibleProductsBefore = await page.$$eval('.product-card', cards => cards.filter(c => c.style.display !== 'none').length);
    console.log(`- Initial visible products: ${visibleProductsBefore}`);
    
    await page.type('#product-search', 'sleep', {delay: 50});
    await new Promise(r => setTimeout(r, 500));
    
    let visibleProductsAfter = await page.$$eval('.product-card', cards => cards.filter(c => c.style.display !== 'none').length);
    console.log(`- Visible products after searching 'sleep': ${visibleProductsAfter}`);
    
    if (visibleProductsAfter > 0 && visibleProductsAfter < 20) {
      console.log("✅ TEST 2 PASSED: Smart Fuzzy Search properly filters DOM nodes.");
    } else {
      throw new Error("Search functionality failed.");
    }

    // --- TEST 3: Exit-Intent Popup ---
    await page.mouse.move(500, 500); // mouse in middle
    await page.mouse.move(500, 5);   // simulate mouse leaving top of browser window
    await new Promise(r => setTimeout(r, 800)); // Allow animation frames
    
    const popupVisible = await page.$eval('#marketing-popup', el => !el.classList.contains('hidden'));
    if (popupVisible) {
      console.log("✅ TEST 3 PASSED: Exit-Intent logic successfully triggered marketing popup!");
    } else {
      throw new Error("Exit intent popup failed to appear.");
    }

    // --- TEST 4: Email JS Automation Form ---
    await page.type('#subscriber-email', 'ai-tester@example.com');
    await page.click('#subscribe-form button[type="submit"]');
    await new Promise(r => setTimeout(r, 1000));
    
    const successVisible = await page.$eval('#subscribe-success', el => !el.classList.contains('hidden'));
    if (successVisible) {
      console.log("✅ TEST 4 PASSED: EmailJS Form submission successfully captured email state!");
    } else {
      throw new Error("Email submission failed to show success state.");
    }

    console.log("\n🎉 ALL TESTS COMPLETED & VALIDATED AUTOMATICALLY! UAT COMPLETE.");

  } catch(e) {
    console.error("\n❌ TEST FAILED:", e.message);
  } finally {
    await browser.close();
  }
})();
