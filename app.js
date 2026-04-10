document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('product-grid');
  const cartToggle = document.getElementById('cart-toggle');
  const closeCart = document.getElementById('close-cart');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCountEl = document.getElementById('cart-count');

  let products = [];
  let cart = JSON.parse(localStorage.getItem('gemessence_cart')) || [];

  // Fetch products
  fetch('src/data/products.json')
    .then(res => res.json())
    .then(data => {
      products = data;
      renderProducts();
      updateCartUI();
      injectSchema(data); // Phase 7
    })
    .catch(err => {
      console.error('Failed to load products:', err);
      productGrid.innerHTML = '<div class="col-span-full text-red-500 text-center py-20 font-serif text-2xl">Failed to load product catalog. Please try refreshing.</div>';
    });

  function renderProducts() {
    productGrid.innerHTML = '';
    
    products.forEach((product, index) => {
      const card = document.createElement('div');
      card.className = 'product-card bg-white/70 backdrop-blur-sm border border-white/60 flex flex-col hover-trigger rounded-lg overflow-hidden shadow-sm transition-all duration-300 relative';
      card.dataset.name = product.name;
      card.dataset.tags = product.tags.join(',');
      
      const tagsHtml = product.tags.slice(0, 3).map(tag => `<span class="text-[10px] uppercase tracking-wider px-2 py-1 bg-brand-cream/80 text-brand-dark/70 rounded-sm">${tag}</span>`).join('');
      
      // STEP 3: Add urgency badge to first 3 products
      const urgencyBadge = index < 3 
        ? `<div class="urgency-badge">🔥 High Demand: Only ${Math.floor(Math.random() * 3) + 1} Left!</div>` 
        : '';
      
      card.innerHTML = `
        ${urgencyBadge}
        <div class="aspect-square overflow-hidden bg-brand-cream relative group">
          <img src="${product.imageUrl}" alt="${product.name} - Handmade Gemstone Jewelry featuring ${product.tags.slice(0,5).join(', ')}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" loading="lazy">
          <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div class="flex flex-wrap gap-1">${tagsHtml}</div>
          </div>
        </div>
        <div class="p-6 flex flex-col flex-1 border border-t-0 border-brand-dark/10">
          <h4 class="font-serif text-xl font-semibold mb-2 line-clamp-1">${product.name}</h4>
          <p class="text-sm font-light text-brand-dark/70 mb-4 line-clamp-2 leading-relaxed">${product.description}</p>
          <div class="flex justify-between items-center mt-auto pt-4 border-t border-brand-dark/10">
            <span class="font-serif text-xl font-bold">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart p-2.5 bg-brand-cream border border-brand-dark/20 text-brand-dark hover:bg-brand-dark hover:text-brand-cream transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2" data-id="${product.id}" aria-label="Add to cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
        </div>
      `;
      productGrid.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        addToCart(id);
        
        // Visual feedback
        const originalBg = e.currentTarget.style.backgroundColor;
        e.currentTarget.style.backgroundColor = '#304254';
        e.currentTarget.style.color = '#f2efe3';
        setTimeout(() => {
          e.currentTarget.style.backgroundColor = originalBg;
          e.currentTarget.style.color = '';
        }, 300);
      });
    });
  }

  function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    openCart();
  }

  function removeFromCart(id) {
    const el = document.querySelector(`.cart-item[data-id="${id}"]`);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateX(20px)';
      setTimeout(() => {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        updateCartUI();
      }, 300);
    } else {
      cart = cart.filter(item => item.id !== id);
      saveCart();
      updateCartUI();
    }
  }

  function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        removeFromCart(id);
      } else {
        saveCart();
        updateCartUI();
      }
    }
  }

  function saveCart() {
    localStorage.setItem('gemessence_cart', JSON.stringify(cart));
  }

  function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center text-brand-dark/50 space-y-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="opacity-50"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <p class="font-serif text-lg tracking-wide">Your cart is empty.</p>
          <button class="mt-4 border-b border-brand-dark text-brand-dark hover:text-brand-accent pb-1 transition-colors" onclick="document.getElementById('close-cart').click()">Continue Shopping</button>
        </div>
      `;
    } else {
      cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        
        const el = document.createElement('div');
        el.className = 'cart-item flex gap-4 items-center bg-white p-4 border border-brand-dark/10 shadow-sm transition-all duration-300 rounded-sm';
        el.dataset.id = item.id;
        el.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.name}" class="w-20 h-20 object-cover bg-brand-cream rounded-sm">
          <div class="flex-1 flex flex-col h-20 justify-between">
            <div class="flex justify-between items-start">
              <h5 class="font-serif text-sm font-semibold line-clamp-2 pr-2">${item.name}</h5>
              <button class="remove-item text-brand-dark/40 hover:text-red-500 transition-colors focus:outline-none" data-id="${item.id}" aria-label="Remove item">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <button class="w-6 h-6 flex items-center justify-center border border-brand-dark/20 decrease-qty hover:bg-brand-cream hover:text-brand-accent transition-colors rounded-sm focus:outline-none" data-id="${item.id}">-</button>
                <span class="text-sm font-light w-4 text-center">${item.quantity}</span>
                <button class="w-6 h-6 flex items-center justify-center border border-brand-dark/20 increase-qty hover:bg-brand-cream hover:text-brand-accent transition-colors rounded-sm focus:outline-none" data-id="${item.id}">+</button>
              </div>
              <div class="text-brand-accent font-semibold">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(el);
      });
    }

    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    cartCountEl.textContent = count;
    
    if (count === 0) {
      cartCountEl.classList.add('hidden');
    } else {
      cartCountEl.classList.remove('hidden');
      // small pop animation
      cartCountEl.classList.add('scale-125');
      setTimeout(() => cartCountEl.classList.remove('scale-125'), 150);
    }

    document.querySelectorAll('.increase-qty').forEach(btn => {
      btn.addEventListener('click', e => updateQuantity(e.currentTarget.dataset.id, 1));
    });
    document.querySelectorAll('.decrease-qty').forEach(btn => {
      btn.addEventListener('click', e => updateQuantity(e.currentTarget.dataset.id, -1));
    });
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', e => removeFromCart(e.currentTarget.dataset.id));
    });
  }

  // Cart Toggle Logic
  function openCart() {
    cartOverlay.classList.remove('hidden');
    // slight delay to ensure display:block applies before opacity
    requestAnimationFrame(() => {
      cartOverlay.classList.remove('opacity-0');
      cartSidebar.classList.remove('translate-x-full');
    });
    document.body.classList.add('cart-open');
  }

  function closeCartPanel() {
    cartSidebar.classList.add('translate-x-full');
    cartOverlay.classList.add('opacity-0');
    setTimeout(() => {
      cartOverlay.classList.add('hidden');
      document.body.classList.remove('cart-open');
    }, 300); // match transition duration
  }

  cartToggle.addEventListener('click', openCart);
  closeCart.addEventListener('click', closeCartPanel);
  cartOverlay.addEventListener('click', closeCartPanel);

  // Phase 7: JSON-LD Product Schema
  function injectSchema(data) {
    const schema = {
      "@context": "https://schema.org/",
      "@type": "ItemList",
      "itemListElement": data.map((p, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": p.name,
          "description": p.description,
          "image": p.imageUrlHD || p.imageUrl,
          "offers": { "@type": "Offer", "priceCurrency": "USD", "price": p.price, "availability": "https://schema.org/InStock" }
        }
      }))
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  // Phase 10: Fuzzy Smart Product Search (Levenshtein Distance)
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = Math.min(
          dp[i-1][j] + 1,
          dp[i][j-1] + 1,
          dp[i-1][j-1] + (a[i-1] !== b[j-1] ? 1 : 0)
        );
      }
    }
    return dp[m][n];
  }

  function fuzzyMatch(term, text, threshold) {
    if (!term) return true;
    if (text.includes(term)) return true;
    // Check each word in the text against the search term
    const words = text.split(/[\s,]+/);
    for (const word of words) {
      if (word.length > 2 && levenshtein(term, word) <= threshold) return true;
      // Also check if the term is a substring with tolerance
      if (word.includes(term) || term.includes(word)) return true;
    }
    return false;
  }

  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      if (!term) {
        document.querySelectorAll('.product-card').forEach(card => card.style.display = 'flex');
        return;
      }
      document.querySelectorAll('.product-card').forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const tags = card.dataset.tags.toLowerCase();
        const threshold = term.length <= 4 ? 1 : 2; // tighter threshold for short words
        if (fuzzyMatch(term, name, threshold) || fuzzyMatch(term, tags, threshold)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Phase 8: Exit-Intent Marketing Logic (Replaced Timer)
  let popupTriggered = false;
  document.addEventListener('mouseleave', (e) => {
    // Trigger if mouse leaves window at the top (exit intent)
    if (e.clientY < 20 && !popupTriggered && !localStorage.getItem('gemessence_subscribed')) {
      popupTriggered = true;
      document.getElementById('marketing-popup').classList.remove('hidden');
      setTimeout(() => document.getElementById('marketing-popup').classList.remove('opacity-0'), 50);
    }
  });

  document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('marketing-popup').classList.add('opacity-0');
    setTimeout(() => document.getElementById('marketing-popup').classList.add('hidden'), 300);
  });

  document.getElementById('subscribe-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';
    btn.disabled = true;

    const email = document.getElementById('subscriber-email').value;
    
    // Phase 9: EmailJS Integration
    const templateParams = {
        to_email: email,
        discount_code: 'GEM10'
    };

    try {
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(() => console.log('Welcome Email Dispatched via EmailJS!'))
        .catch(err => console.warn('EmailJS not configured yet, capturing lead locally...', err));
    } catch(err) {}

    let subs = JSON.parse(localStorage.getItem('gemessence_subscribers')) || [];
    subs.push(email);
    localStorage.setItem('gemessence_subscribers', JSON.stringify(subs));
    localStorage.setItem('gemessence_subscribed', 'true');
    document.getElementById('subscribe-success').classList.remove('hidden');
    e.target.reset();
    
    setTimeout(() => {
      btn.innerText = originalText;
      btn.disabled = false;
      document.getElementById('close-popup').click();
    }, 2500);
  });


  // ═══════════════════════════════════════════════════════════
  // STEP 1: Zodiac Crystal Matchmaker Quiz Logic
  // ═══════════════════════════════════════════════════════════

  const zodiacSigns = [
    { name: 'Aries', emoji: '♈', element: 'fire' },
    { name: 'Taurus', emoji: '♉', element: 'earth' },
    { name: 'Gemini', emoji: '♊', element: 'air' },
    { name: 'Cancer', emoji: '♋', element: 'water' },
    { name: 'Leo', emoji: '♌', element: 'fire' },
    { name: 'Virgo', emoji: '♍', element: 'earth' },
    { name: 'Libra', emoji: '♎', element: 'air' },
    { name: 'Scorpio', emoji: '♏', element: 'water' },
    { name: 'Sagittarius', emoji: '♐', element: 'fire' },
    { name: 'Capricorn', emoji: '♑', element: 'earth' },
    { name: 'Aquarius', emoji: '♒', element: 'air' },
    { name: 'Pisces', emoji: '♓', element: 'water' }
  ];

  const goals = [
    { name: 'Inner Peace & Calm', emoji: '🧘', tags: ['calm', 'peace', 'meditation', 'soothing', 'healing', 'balance'] },
    { name: 'Love & Relationships', emoji: '💕', tags: ['love', 'compassion', 'emotional', 'heart-chakra', 'self-care', 'harmony'] },
    { name: 'Energy & Motivation', emoji: '⚡', tags: ['energy', 'vitality', 'motivation', 'courage', 'strength', 'power'] },
    { name: 'Protection & Grounding', emoji: '🛡️', tags: ['protection', 'grounding', 'shield', 'stability', 'focus', 'purification'] },
    { name: 'Wealth & Abundance', emoji: '💰', tags: ['wealth', 'prosperity', 'success', 'abundance', 'manifestation', 'luck'] },
    { name: 'Clarity & Intuition', emoji: '🔮', tags: ['intuition', 'clarity', 'wisdom', 'spiritual', 'third-eye', 'awareness'] }
  ];

  // Zodiac-to-tag priority mapping
  const zodiacTagMap = {
    'Aries':       ['courage', 'energy', 'motivation', 'vitality', 'strength'],
    'Taurus':      ['grounding', 'stability', 'love', 'abundance', 'peace'],
    'Gemini':      ['communication', 'clarity', 'balance', 'truth', 'flow'],
    'Cancer':      ['emotional', 'healing', 'love', 'peace', 'calm'],
    'Leo':         ['courage', 'confidence', 'vitality', 'power', 'energy'],
    'Virgo':       ['focus', 'clarity', 'healing', 'purification', 'balance'],
    'Libra':       ['harmony', 'balance', 'love', 'peace', 'beauty'],
    'Scorpio':     ['transformation', 'protection', 'intuition', 'power', 'spiritual'],
    'Sagittarius': ['wisdom', 'abundance', 'optimism', 'growth', 'adventure'],
    'Capricorn':   ['grounding', 'strength', 'focus', 'protection', 'stability'],
    'Aquarius':    ['intuition', 'clarity', 'truth', 'vision', 'awareness'],
    'Pisces':      ['spiritual', 'intuition', 'healing', 'peace', 'meditation']
  };

  let selectedZodiac = null;
  let selectedGoal = null;
  let quizResultProduct = null;

  // Populate zodiac grid
  const zodiacGrid = document.getElementById('zodiac-grid');
  zodiacSigns.forEach(sign => {
    const btn = document.createElement('button');
    btn.className = 'zodiac-btn';
    btn.innerHTML = `<span class="text-2xl block mb-1">${sign.emoji}</span><span class="text-[10px] uppercase tracking-wider font-bold">${sign.name}</span>`;
    btn.addEventListener('click', () => {
      selectedZodiac = sign;
      document.querySelectorAll('.zodiac-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      // Auto-advance after small delay
      setTimeout(() => {
        document.getElementById('quiz-step-1').classList.add('hidden');
        document.getElementById('quiz-step-2').classList.remove('hidden');
      }, 400);
    });
    zodiacGrid.appendChild(btn);
  });

  // Populate goal grid
  const goalGrid = document.getElementById('goal-grid');
  goals.forEach(goal => {
    const btn = document.createElement('button');
    btn.className = 'goal-btn';
    btn.innerHTML = `<span class="text-2xl">${goal.emoji}</span><span class="text-sm font-medium">${goal.name}</span>`;
    btn.addEventListener('click', () => {
      selectedGoal = goal;
      // Start AI processing
      startAIProcessing();
    });
    goalGrid.appendChild(btn);
  });

  // Back button
  document.getElementById('quiz-back').addEventListener('click', () => {
    document.getElementById('quiz-step-2').classList.add('hidden');
    document.getElementById('quiz-step-1').classList.remove('hidden');
  });

  function startAIProcessing() {
    document.getElementById('quiz-step-2').classList.add('hidden');
    document.getElementById('quiz-loading').classList.remove('hidden');
    
    const progressBar = document.getElementById('ai-progress-bar');
    const statusText = document.getElementById('ai-status-text');
    
    const stages = [
      { pct: 15, text: 'Analyzing zodiac profile...' },
      { pct: 35, text: 'Cross-referencing crystal database...' },
      { pct: 55, text: 'Running GPT-4 compatibility engine...' },
      { pct: 75, text: 'Evaluating chakra alignment...' },
      { pct: 90, text: 'Generating personalized match...' },
      { pct: 100, text: 'Match found! ✨' }
    ];

    let stageIndex = 0;
    const interval = setInterval(() => {
      if (stageIndex < stages.length) {
        progressBar.style.width = stages[stageIndex].pct + '%';
        statusText.textContent = stages[stageIndex].text;
        stageIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => showQuizResult(), 300);
      }
    }, 333);
  }

  function showQuizResult() {
    // Score products based on zodiac + goal tag overlap
    const zodiacTags = zodiacTagMap[selectedZodiac.name] || [];
    const goalTags = selectedGoal.tags || [];
    const combinedTags = [...new Set([...zodiacTags, ...goalTags])];

    let bestMatch = null;
    let bestScore = -1;

    products.forEach(product => {
      let score = 0;
      combinedTags.forEach(tag => {
        if (product.tags.includes(tag)) score++;
      });
      // Add slight randomness to make it feel dynamic
      score += Math.random() * 0.5;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = product;
      }
    });

    quizResultProduct = bestMatch || products[0];

    // Populate result UI
    document.getElementById('result-product-name').textContent = quizResultProduct.name;
    document.getElementById('result-product-img').src = quizResultProduct.imageUrl;
    document.getElementById('result-product-img').alt = quizResultProduct.name;
    document.getElementById('result-product-desc').textContent = quizResultProduct.description;
    document.getElementById('result-product-price').textContent = `$${quizResultProduct.price.toFixed(2)}`;

    const tagsContainer = document.getElementById('result-product-tags');
    tagsContainer.innerHTML = '';
    quizResultProduct.tags.slice(0, 5).forEach(tag => {
      const span = document.createElement('span');
      span.className = 'text-[10px] uppercase tracking-wider px-3 py-1 bg-white/10 text-white/70 rounded-full border border-white/10';
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });

    document.getElementById('quiz-loading').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');
  }

  // Add to cart from quiz result
  document.getElementById('result-add-to-cart').addEventListener('click', () => {
    if (quizResultProduct) {
      addToCart(quizResultProduct.id);
      closeZodiacQuiz();
    }
  });

  // Retry quiz
  document.getElementById('quiz-retry').addEventListener('click', () => {
    resetQuiz();
  });

  function resetQuiz() {
    selectedZodiac = null;
    selectedGoal = null;
    quizResultProduct = null;
    document.querySelectorAll('.zodiac-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-loading').classList.add('hidden');
    document.getElementById('quiz-step-2').classList.add('hidden');
    document.getElementById('quiz-step-1').classList.remove('hidden');
    document.getElementById('ai-progress-bar').style.width = '0%';
  }

  // Open / Close quiz modal
  function openZodiacQuiz() {
    resetQuiz();
    const modal = document.getElementById('zodiac-quiz-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeZodiacQuiz() {
    const modal = document.getElementById('zodiac-quiz-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.getElementById('open-zodiac-quiz').addEventListener('click', openZodiacQuiz);
  document.getElementById('close-zodiac-quiz').addEventListener('click', closeZodiacQuiz);
  document.getElementById('zodiac-quiz-backdrop').addEventListener('click', closeZodiacQuiz);


  // ═══════════════════════════════════════════════════════════
  // STEP 2: Teacher Mode Analytics Dashboard (Escape Key)
  // ═══════════════════════════════════════════════════════════

  let dashboardOpen = false;
  const analyticsDashboard = document.getElementById('analytics-dashboard');

  function toggleDashboard() {
    dashboardOpen = !dashboardOpen;
    if (dashboardOpen) {
      analyticsDashboard.classList.remove('-translate-x-full');
      document.body.classList.add('dashboard-open');
    } else {
      analyticsDashboard.classList.add('-translate-x-full');
      document.body.classList.remove('dashboard-open');
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // If zodiac quiz is open, close it instead
      const quizModal = document.getElementById('zodiac-quiz-modal');
      if (!quizModal.classList.contains('hidden')) {
        closeZodiacQuiz();
        return;
      }
      toggleDashboard();
    }
  });

  document.getElementById('close-analytics').addEventListener('click', () => {
    dashboardOpen = true; // will be toggled to false
    toggleDashboard();
  });


  // ═══════════════════════════════════════════════════════════
  // STEP 3: Mobile Menu Toggle
  // ═══════════════════════════════════════════════════════════

  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }
});
