'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('Maison');

  const navItems = [
    { name: 'Maison', href: '#maison' },
    { name: 'Services', href: '#services' },
    { name: 'A propos', href: '#apropos' },
    { name: 'Portefeuille', href: '#portefeuille' },
    { name: 'Processus', href: '#processus' },
    { name: 'Tarification', href: '#tarification' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b-2 border-black">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-4xl font-bold text-gray-900">
            Brian
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveSection(item.name)}
                className={`text-lg font-semibold transition-colors ${
                  activeSection === item.name
                    ? 'text-blue-600'
                    : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center space-x-4">
            <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-xl">𝕏</span>
            </button>
            <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-xl">⚙️</span>
            </button>
            <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-xl">📷</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
