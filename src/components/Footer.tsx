import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black py-20 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-500">
        <div className="md:col-span-1">
          <p className="text-white font-bold mb-4">Gemessence Enterprise</p>
          <p className="text-sm leading-relaxed">
            The world's first AI-driven marketing engine for personalized gemstone energy.
          </p>
        </div>
        <div>
          <h4 className="text-white text-sm font-bold uppercase mb-4">Discovery</h4>
          <ul className="space-y-2 text-sm">
            <li>Shop</li>
            <li>Zodiac Matchmaker</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-bold uppercase mb-4">Legacy</h4>
          <ul className="space-y-2 text-sm">
            <li>Our Story</li>
            <li>Press</li>
            <li>Values</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-bold uppercase mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Aura Experts</li>
            <li>Returns</li>
            <li>Account</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
