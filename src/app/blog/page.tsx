import React from 'react';

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-12">Insights & Aura</h1>
        <div className="space-y-12">
          {[1, 2].map((i) => (
            <article key={i} className="group cursor-pointer">
              <div className="h-64 bg-gray-900 rounded-3xl mb-6 overflow-hidden border border-gray-800 group-hover:border-indigo-500/50 transition-all" />
              <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">Manifesting Balance with Rose Quartz</h2>
              <p className="text-gray-400 mt-2">The ultimate guide to gemstone healing and intention setting...</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
