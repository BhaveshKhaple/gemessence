import React from 'react';

export default function ShopPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 animate-fade-in">
          Curated Gemstone Collection
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl">
          Discover hand-crafted bracelets designed to align with your energy and style.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[4/5] bg-gray-900/50 rounded-2xl border border-gray-800 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
