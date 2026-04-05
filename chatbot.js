document.addEventListener('DOMContentLoaded', () => {
  // Inject Chatbot HTML
  const chatContainer = document.createElement('div');
  chatContainer.id = 'gem-chatbot';
  chatContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col items-end';
  chatContainer.innerHTML = `
    <div id="chat-window" class="hidden w-80 bg-[#f9f8f4] border border-brand-dark/20 shadow-2xl mb-4 flex flex-col h-96 transition-all duration-300 rounded-lg overflow-hidden">
      <div class="bg-brand-dark text-brand-cream p-4 flex justify-between items-center rounded-t-lg">
        <span class="font-serif font-bold text-lg flex items-center gap-2">✨ Gem Guide AI</span>
        <button id="close-chat" class="hover:text-gray-300 focus:outline-none text-2xl leading-none">&times;</button>
      </div>
      <div id="chat-messages" class="flex-1 p-4 overflow-y-auto flex flex-col gap-4 text-sm bg-white scroll-smooth">
        <div class="bg-brand-cream p-3 rounded-tr-lg rounded-b-lg self-start max-w-[85%] text-brand-dark border border-brand-dark/10 shadow-sm leading-relaxed">
          Hi! I'm your AI Gemstone Guide. Tell me what kind of energy you are looking for (e.g. "I want peace", "anxiety", or "love").
        </div>
      </div>
      <div class="p-3 border-t border-brand-dark/10 bg-[#f9f8f4] flex gap-2">
        <input type="text" id="chat-input" class="flex-1 px-3 py-2 border border-brand-dark/20 focus:outline-none focus:border-brand-accent text-sm rounded-sm bg-white" placeholder="Ask me anything...">
        <button id="chat-send" class="bg-brand-dark text-white px-4 py-2 text-sm font-bold hover:bg-brand-accent transition-colors rounded-sm uppercase tracking-wider">Send</button>
      </div>
    </div>
    <button id="chat-toggle" class="bg-brand-accent text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center focus:outline-none group">
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

  function appendMessage(text, isUser=false, isHtml=false) {
    const div = document.createElement('div');
    div.className = `p-3 ${isUser ? 'bg-brand-accent text-white rounded-tl-lg rounded-b-lg self-end' : 'bg-brand-cream text-brand-dark border border-brand-dark/10 rounded-tr-lg rounded-b-lg self-start shadow-sm'} max-w-[85%] text-sm leading-relaxed`;
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

    // Typing indication
    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = typingId;
    typingDiv.className = 'text-xs text-brand-dark/50 p-2 italic self-start';
    typingDiv.innerText = 'Analyzing your aura...';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Cross-reference keywords with JSON tags
    const matched = productsData.filter(p => {
      // Find matches in tags or name
      return p.tags.some(tag => val.includes(tag.toLowerCase().replace('-',' '))) || val.includes(p.name.toLowerCase().split(' ')[0]);
    });

    setTimeout(() => {
      document.getElementById(typingId)?.remove();
      if(matched.length > 0) {
        // Pick the best match
        const p = matched[0];
        const reply = `I recommend the <b>${p.name}</b>!<br/><br/><span class="text-xs opacity-90">${p.description}</span><br/><br/><button class="w-full mt-2 bg-brand-dark text-white px-3 py-2 uppercase tracking-wide text-xs font-bold hover:bg-brand-accent transition-colors rounded-sm" onclick="window.chatbotAddToCart('${p.id}')">Add to Cart - $${p.price.toFixed(2)}</button>`;
        appendMessage(reply, false, true);
      } else {
        appendMessage("I'm sensing a unique energy, but I'm not sure which crystal fits best. Maybe try searching for attributes like <b>'courage'</b>, <b>'wealth'</b>, or <b>'healing'</b>.");
      }
    }, 800);
  }

  window.chatbotAddToCart = function(id) {
    // Programmatically click the add-to-cart button for this product
    const btn = document.querySelector(`.add-to-cart[data-id="${id}"]`);
    if(btn) {
      btn.click();
      chatWindow.classList.add('hidden');
    }
  };

  chatSend.addEventListener('click', handleQuery);
  chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleQuery() });
});
