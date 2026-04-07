'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-black text-white hover:text-indigo-400 transition-colors">
        GEMESSENCE<span className="text-indigo-500">.</span>
      </Link>
      <div className="hidden md:flex space-x-10 text-sm font-medium uppercase tracking-widest text-gray-400">
        <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
        <Link href="/zodiac-hub" className="hover:text-white transition-colors">Zodiac Hub</Link>
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <Link href="/company" className="hover:text-white transition-colors">Mission</Link>
      </div>
      <div className="flex space-x-6 text-sm font-medium uppercase tracking-widest">
        <Link href="/account" className="text-gray-400 hover:text-white">Account</Link>
        <Link href="/checkout" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200">Cart</Link>
      </div>
    </nav>
  );
}
