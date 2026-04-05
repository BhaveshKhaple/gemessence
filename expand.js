const fs = require('fs');

try {
  let filepath = './src/data/products.json';
  let d = JSON.parse(fs.readFileSync(filepath, 'utf8'));

  const gems = [
    { name: "Tiger's Eye Courage Bracelet", desc: "A powerful stone of courage and motivation. Enhances focus, vitality, and protection.", tags: ["tigers-eye", "courage", "motivation", "focus", "vitality", "protection", "brown", "grounding", "confidence", "strength"] },
    { name: "Obsidian Shield Bracelet", desc: "A strong protective stone that forms a shield against negativity. Draws out mental stress and tension.", tags: ["obsidian", "protection", "shield", "grounding", "stress-relief", "black", "strength", "healing", "purification", "calm"] },
    { name: "Citrine Abundance Bracelet", desc: "Known as the merchant's stone, bringing wealth, prosperity, and success. Imparts joy and enthusiasm.", tags: ["citrine", "wealth", "prosperity", "success", "joy", "yellow", "abundance", "energy", "optimism", "manifestation"] },
    { name: "Moonstone Intuition Bracelet", desc: "A stone for new beginnings, promoting inner growth and strength. Soothes emotional instability.", tags: ["moonstone", "intuition", "new-beginnings", "strength", "calm", "white", "lunar", "healing", "feminine", "balance"] },
    { name: "Jade Harmony Bracelet", desc: "A symbol of serenity and purity. Signifies wisdom gathered in tranquility and increases love.", tags: ["jade", "harmony", "serenity", "purity", "wisdom", "green", "love", "luck", "peace", "nurturing"] },
    { name: "Clear Quartz Master Bracelet", desc: "Amplify your energy and thought with this master healer. Absorbs, stores, releases energy.", tags: ["clear-quartz", "healing", "energy", "amplification", "clarity", "white", "master-healer", "focus", "power", "light"] },
    { name: "Black Tourmaline Grounding", desc: "Offers strong protection against electromagnetic smog and negative energy. Promotes laid-back attitude.", tags: ["black-tourmaline", "grounding", "protection", "emf", "calm", "black", "stability", "focus", "detox", "mindful"] },
    { name: "Amazonite Truth Bracelet", desc: "A soothing stone that calms the brain and nervous system. Aligns physical body with the etheric.", tags: ["amazonite", "truth", "soothing", "calm", "balance", "blue-green", "harmony", "communication", "hope", "flow"] },
    { name: "Sodalite Logic Bracelet", desc: "Brings order and calmness to the mind. Encourages rational thought, objectivity, and truth.", tags: ["sodalite", "logic", "calm", "truth", "objectivity", "blue", "intuition", "clarity", "understanding", "focus"] },
    { name: "Malachite Transform Bracelet", desc: "An important protection stone. Absorbs negative energies and pollutants from the atmosphere.", tags: ["malachite", "transformation", "protection", "absorption", "healing", "green", "growth", "balance", "change", "power"] },
    { name: "Garnet Passion Bracelet", desc: "Revitalizes, purifies, and balances energy. Brings serenity or passion as appropriate.", tags: ["garnet", "passion", "energy", "balance", "vitality", "red", "serenity", "devotion", "grounding", "love"] },
    { name: "Labradorite Magic Bracelet", desc: "A stone of transformation and magic. Clears, balances and protects the aura.", tags: ["labradorite", "magic", "transformation", "protection", "aura", "grey", "intuition", "mystic", "spiritual", "vision"] },
    { name: "Aventurine Luck Bracelet", desc: "Known as the Stone of Opportunity, thought to be the luckiest of all crystals.", tags: ["aventurine", "luck", "opportunity", "creativity", "green", "success", "prosperity", "optimism", "wealth", "growth"] },
    { name: "Aquamarine Courage Bracelet", desc: "A stone of courage with calming energies that reduce stress and quiet the mind.", tags: ["aquamarine", "courage", "calm", "stress-relief", "blue", "peace", "communication", "soothing", "water", "flow"] },
    { name: "Hematite Focus Bracelet", desc: "Grounds and protects us. Endows us with courage, strength, endurance and vitality.", tags: ["hematite", "focus", "grounding", "protection", "strength", "grey", "balance", "vitality", "logic", "memory"] },
    { name: "Fluorite Clarity Bracelet", desc: "Cleanses and stabilizes the aura. Absorbs and neutralizes negative energy and stress.", tags: ["fluorite", "clarity", "aura", "protection", "focus", "purple", "green", "balance", "cleansing", "harmony"] }
  ];

  gems.forEach((g, i) => {
    let rawPrice = Math.random() * (55 - 25) + 25;
    d.push({
      id: 'B' + (i + 5).toString().padStart(2, '0'),
      name: g.name,
      description: g.desc,
      price: parseFloat(rawPrice.toFixed(2)),
      imageUrl: `https://picsum.photos/seed/gembracelet${i}/600/600`,
      imageUrlHD: `https://picsum.photos/seed/gembracelet${i}/1200/1200`,
      tags: g.tags
    });
  });

  fs.writeFileSync(filepath, JSON.stringify(d, null, 2));
  console.log('Expanded products to ' + d.length);
} catch (e) {
  console.error('Error:', e);
}
