import React from 'react';

export default function AccountPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full mb-6" />
        <h1 className="text-4xl font-bold text-white">Your Sanctuary</h1>
        <p className="text-gray-400 mt-2">Manage your collection and energy profile.</p>
        <div className="mt-12 w-full max-w-md space-y-4">
          <div className="h-12 bg-gray-900 border border-gray-800 rounded-xl" />
          <div className="h-12 bg-gray-900 border border-gray-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
