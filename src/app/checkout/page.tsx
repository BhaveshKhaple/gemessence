import React from 'react';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white mb-8">Secure Checkout</h1>
          <div className="space-y-6">
            <div className="h-64 bg-gray-900 border border-indigo-500/20 rounded-3xl" />
          </div>
        </div>
        <div className="w-full md:w-80 h-96 bg-gray-900/50 border border-gray-800 rounded-3xl p-8 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
        </div>
      </div>
    </div>
  );
}
