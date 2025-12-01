'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Accueil', href: '#maison', id: 'maison', isPage: false },
  { name: 'Services', href: '#apropos', id: 'apropos', isPage: false },
  { name: 'A Propos', href: '#aboutme', id: 'aboutme', isPage: false },
  { name: 'Mes Expériences', href: '#experiences', id: 'experiences', isPage: false },
  { name: 'Mes Projets', href: '#portefeuille', id: 'portefeuille', isPage: false },
  { name: 'Ma Stack', href: '#techstack', id: 'techstack', isPage: false },
  { name: 'Certifications', href: '#certifications', id: 'certifications', isPage: false },
  { name: 'Blog', href: '/blog', id: 'blog', isPage: true },
  { name: 'Contact', href: '#contact', id: 'contact', isPage: false },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('Accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if we're on the blog page
  const isBlogPage = pathname?.startsWith('/blog');

  // Détection de la section visible au scroll
  useEffect(() => {
    // Skip observer on blog pages
    if (isBlogPage) {
      setActiveSection('Blog');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Zone de détection au milieu-haut de l'écran
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const navItem = navItems.find(item => item.id === sectionId);
          if (navItem) {
            setActiveSection(navItem.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observer toutes les sections
    navItems.forEach((item) => {
      if (!item.isPage) {
        const element = document.getElementById(item.id);
        if (element) {
          observer.observe(element);
        }
      }
    });

    return () => observer.disconnect();
  }, [isBlogPage]);

  const handleNavClick = (name: string) => {
    setActiveSection(name);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-4xl font-bold text-gray-900">
            Brian
          </Link>

          {/* Navigation links - Desktop only */}
          <div className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => {
              // For anchor links when on blog page, redirect to home with anchor
              const href = item.isPage ? item.href : (isBlogPage ? `/${item.href}` : item.href);
              const isActive = item.isPage 
                ? isBlogPage 
                : activeSection === item.name;
              
              return (
                <Link
                  key={item.name}
                  href={href}
                  onClick={() => !item.isPage && setActiveSection(item.name)}
                  className={`text-lg font-semibold transition-colors ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-900 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right side - LinkedIn + Burger Menu */}
          <div className="flex items-center space-x-4">
            {/* LinkedIn - visible on all screens */}
            <a href="https://www.linkedin.com/in/brian-biendou-429106201/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* Burger Menu - Mobile & Tablet */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b-2 border-black shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 py-4 space-y-1">
          {navItems.map((item) => {
            const href = item.isPage ? item.href : (isBlogPage ? `/${item.href}` : item.href);
            const isActive = item.isPage 
              ? isBlogPage 
              : activeSection === item.name;
            
            return (
              <Link
                key={item.name}
                href={href}
                onClick={() => handleNavClick(item.name)}
                className={`block py-3 px-4 text-lg font-semibold rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-900 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
