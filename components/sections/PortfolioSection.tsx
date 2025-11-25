'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'Site web des médias sociaux de Snowlake',
      description: 'Snowlake est un site élégant et axé sur le produit pour une plateforme de médias sociaux, construit avec une interface utilisateur épurée et le CMS évolutif Framer.',
      link: 'Consulter l\'étude de cas',
      bgColor: 'bg-pink-50',
      image: '/cadre1.jpeg',
    },
    {
      title: 'Site web de réseautage de l\'entreprise Meeko',
      description: 'Meeko est un site moderne, développé avec Framer, qui met en relation des professionnels et est conçu pour une mise en réseau fluide.',
      link: 'Consulter l\'étude de cas',
      bgColor: 'bg-meelo-purple',
      image: '/cadre2.jpeg',
    },
    {
      title: 'Site Web d\'application bancaire en environnement de test',
      description: 'Sandbox est un site fintech nouvelle génération construit avec Framer, mettant en avant la confiance et l\'innovation grâce à un puissant CMS.',
      link: 'Consulter l\'étude de cas',
      bgColor: 'bg-gradient-to-br from-pink-100 to-blue-100',
      image: '/cadre3.jpeg',
    },
    {
      title: 'Plateforme Growth - Croissance Réseaux Sociaux',
      description: 'Growth est une plateforme moderne de croissance sur les réseaux sociaux, offrant des services de qualité avec support 24/7, plus de 3,5 millions de commandes complétées et une note de 4.4/5.',
      link: 'Consulter l\'étude de cas',
      bgColor: 'bg-gradient-to-br from-blue-50 to-green-50',
      image: '/cadre44.jpeg',
    },
  ];

  return (
    <section id="portefeuille" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-6 relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-3">
            <span className="px-3 py-1.5 border-2 border-black rounded-full text-xs font-medium">
              ✦ MES ŒUVRES
            </span>
          </div>
          
          <div className="relative">
            {/* Decorative element - à gauche du texte */}
            <div className="absolute left-0 lg:left-20 top-1/2 -translate-y-1/2">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                <path d="M5 5C10 20 20 25 25 20C30 15 40 25 45 35" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold max-w-4xl mx-auto mb-3">
              Découvrez quelques-uns de nos<br/>
              projets exceptionnels, remplis<br/>
              d&apos;idées créatives.
            </h2>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Image Card */}
              <div
                className={`${project.bgColor} rounded-2xl overflow-hidden border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 mb-4 aspect-[5/4] relative`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content - Outside the card */}
              <div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-lg mb-3 leading-relaxed">
                  {project.description}
                </p>
                <button className="flex items-center gap-2 text-black text-lg font-medium group-hover:gap-3 transition-all">
                  {project.link}
                  <span className="text-xl">⊕</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '750ms' }}>
          <button className="px-6 py-3 border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
            Voir toutes les œuvres
          </button>
        </div>
      </div>
    </section>
  );
}
