import React from 'react';

export default function CompanyPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8 tracking-tight">Our Mission</h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          At Gemessence, we bridge the gap between ancient stone wisdom and modern digital intelligence. 
          Every bracelet is a conduit for energy, crafted with intent.
        </p>
        <div className="mt-16 grid grid-cols-2 gap-8 text-center">
          <div>
            <p className="text-4xl font-black text-indigo-500">10k+</p>
            <p className="text-gray-400 mt-2">Souls Empowered</p>
          </div>
          <div>
            <p className="text-4xl font-black text-purple-500">100%</p>
            <p className="text-gray-400 mt-2">Pure Intent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
