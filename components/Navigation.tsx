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
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            Meelo
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveSection(item.name)}
                className={`text-sm transition-colors ${
                  activeSection === item.name
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center space-x-2">
            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-base">𝕏</span>
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-base">⚙️</span>
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-base">📷</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
