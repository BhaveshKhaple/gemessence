document.addEventListener('DOMContentLoaded', () => {
  // Inject Premium Chatbot HTML
  const chatContainer = document.createElement('div');
  chatContainer.id = 'gem-chatbot';
  chatContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans';
  chatContainer.innerHTML = `
    <div id="chat-window" class="hidden w-80 sm:w-96 bg-brand-cream/80 backdrop-blur-2xl border border-white/60 shadow-2xl mb-4 flex flex-col h-[28rem] transition-all duration-500 rounded-3xl overflow-hidden">
      <div class="bg-brand-dark/95 backdrop-blur-md text-brand-cream p-5 flex justify-between items-center rounded-t-3xl shadow-sm border-b border-white/10">
        <div class="flex items-center gap-3">
           <span class="font-serif font-bold text-xl tracking-wide flex items-center gap-2">✨ Gem Guide</span>
           <button id="set-api-key" class="text-[9px] bg-brand-accent/80 hover:bg-brand-accent px-2 py-0.5 rounded-full uppercase tracking-widest transition-colors font-bold" title="Set Gemini API Key">Use Gemini</button>
        </div>
        <button id="close-chat" class="hover:text-brand-accent focus:outline-none text-2xl leading-none transition-colors">&times;</button>
      </div>
      <div id="chat-messages" class="flex-1 p-5 overflow-y-auto flex flex-col gap-4 text-sm bg-transparent scroll-smooth">
        <div class="bg-white/90 backdrop-blur-md p-4 rounded-b-2xl rounded-tr-2xl self-start max-w-[85%] text-brand-dark border border-white/60 shadow-sm leading-relaxed">
          Hi! I'm your AI Gemstone Guide. Tell me what kind of energy you are looking for (e.g., "I need a clearer mind" or "I want love and protection").
        </div>
      </div>
      <div class="p-4 border-t border-brand-dark/5 bg-white/40 backdrop-blur-lg flex gap-2">
        <input type="text" id="chat-input" class="flex-1 px-5 py-3 border border-brand-accent/20 bg-white/70 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm rounded-full shadow-sm transition-all" placeholder="Ask the universe...">
        <button id="chat-send" class="bg-brand-dark text-brand-cream px-5 py-3 text-sm font-bold hover:bg-brand-accent transition-colors rounded-full uppercase tracking-wider shadow-md">Send</button>
      </div>
    </div>
    <button id="chat-toggle" class="bg-brand-accent text-brand-cream p-4 rounded-full shadow-[0_10px_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-all duration-300 flex items-center justify-center focus:outline-none group">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="group-hover:animate-pulse"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    </button>
  `;
  document.body.appendChild(chatContainer);

  const chatWindow = document.getElementById('chat-window');
  const chatToggle = document.getElementById('chat-toggle');
  const closeChat = document.getElementById('close-chat');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');

  let productsData = [];
  fetch('src/data/products.json').then(r=>r.json()).then(d=>productsData=d);

  chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
    if(!chatWindow.classList.contains('hidden')) chatInput.focus();
  });
  closeChat.addEventListener('click', () => chatWindow.classList.add('hidden'));

  document.getElementById('set-api-key').addEventListener('click', () => {
     const current = localStorage.getItem('GEMINI_API_KEY') || '';
     const key = prompt('Integrate ultra-smart Gemstone knowledge! Enter your Gemini 1.5 API Key:', current);
     if(key !== null) {
         localStorage.setItem('GEMINI_API_KEY', key.trim());
         document.getElementById('set-api-key').innerText = 'Connected';
         document.getElementById('set-api-key').classList.add('bg-green-600', 'text-white');
     }
  });

  // Init button status
  if(localStorage.getItem('GEMINI_API_KEY')) {
      document.getElementById('set-api-key').innerText = 'Connected';
      document.getElementById('set-api-key').classList.add('bg-green-600', 'text-white');
  }

  function appendMessage(text, isUser=false, isHtml=false) {
    const div = document.createElement('div');
    div.className = `p-4 ${isUser ? 'bg-brand-accent text-white rounded-b-2xl rounded-tl-2xl shadow-md self-end' : 'bg-white/90 backdrop-blur-md text-brand-dark border border-white/60 rounded-b-2xl rounded-tr-2xl shadow-sm self-start'} max-w-[85%] text-sm leading-relaxed`;
    if(isHtml) div.innerHTML = text;
    else div.innerText = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleQuery() {
    const val = chatInput.value.trim().toLowerCase();
    if(!val) return;
    appendMessage(val, true);
    chatInput.value = '';

    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = typingId;
    typingDiv.className = 'text-xs text-brand-dark/50 p-2 italic self-start animate-pulse';
    typingDiv.innerText = 'Consulting the aura elements...';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const apiKey = localStorage.getItem('GEMINI_API_KEY');

    function renderResult(product, reason) {
        document.getElementById(typingId)?.remove();
        if(product) {
          const desc = reason ? reason : product.description;
          const reply = `The universe aligns with the <b class="font-serif text-brand-accent text-base">${product.name}</b>!<br/><br/><span class="text-xs opacity-90">${desc}</span><br/><br/><button class="w-full mt-3 bg-brand-dark text-white px-4 py-2 uppercase tracking-wide text-xs font-bold hover:bg-brand-accent transition-colors rounded shadow-md" onclick="window.chatbotAddToCart('${product.id}')">Add to Cart - $${product.price.toFixed(2)}</button>`;
          appendMessage(reply, false, true);
        } else {
          appendMessage("I'm sensing a unique energy, but I'm not sure which crystal fits best. Maybe try searching for attributes like <b>'courage'</b>, <b>'wealth'</b>, or <b>'healing'</b>.", false, true);
        }
    }

    function fallbackLogic() {
      const matched = productsData.filter(p => {
        return p.tags.some(tag => val.includes(tag.toLowerCase().replace('-',' '))) || val.includes(p.name.toLowerCase().split(' ')[0]);
      });
      setTimeout(() => renderResult(matched.length > 0 ? matched[0] : null, null), 600);
    }

    if (apiKey && apiKey.length > 10) {
       const geminiPrompt = `You are a mystical Crystal Guide AI for an online store called 'Gemessence'. A user says: "${val}". Our inventory is exclusively: ${JSON.stringify(productsData.map(p=>({id:p.id, name:p.name, tags:p.tags})))}$. Analyze their energetic needs and pick the best single product ID. Return your answer securely as raw JSON: {"id":"product format", "reason":"One highly poetic, deeply persuasive sentence explaining why this stone solves their problem"}. Do NOT output markdown. Just the stringified JSON.`;
       
       fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({ contents: [{ parts: [{ text: geminiPrompt }] }] })
       })
       .then(r => r.json())
       .then(data => {
           try {
              const text = data.candidates[0].content.parts[0].text;
              const jsonStr = text.replace(/```json/g,'').replace(/```/g,'').trim();
              const parsed = JSON.parse(jsonStr);
              const p = productsData.find(x => x.id === parsed.id);
              if (p) renderResult(p, parsed.reason);
              else fallbackLogic();
           } catch(e) {
              fallbackLogic();
           }
       }).catch(() => fallbackLogic());
    } else {
      fallbackLogic();
    }
  }

  window.chatbotAddToCart = function(id) {
    const btn = document.querySelector(`.add-to-cart[data-id="${id}"]`);
    if(btn) {
      btn.click();
      chatWindow.classList.add('hidden');
    }
  };

  chatSend.addEventListener('click', handleQuery);
  chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleQuery() });
});
