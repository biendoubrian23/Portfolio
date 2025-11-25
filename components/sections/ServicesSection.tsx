'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openService, setOpenService] = useState<number | null>(null);

  const services = [
    {
      title: 'CONCEPTION SITES INTERNETS',
      number: '1.',
      image: '/site_internet.jpeg',
      details: [
        'Conception de sites web adaptatifs et modernes',
        'Optimisation SEO et performances',
        'Intégration de CMS (Sanity, Strapi)',
        'Développement avec Next.js, React'
      ]
    },
    {
      title: 'CONCEPTION APP MOBILES',
      number: '2.',
      image: '/app_mobile.jpg',
      details: [
        'Développement d\'applications iOS et Android',
        'React Native et Expo',
        'Intégration Supabase et Firebase',
        'Applications cross-platform performantes'
      ]
    },
    {
      title: 'CONCEPTION CHATBOT INTELLIGENTS',
      number: '3.',
      image: '/chatbot.jpg',
      details: [
        'Chatbots IA avec architecture RAG',
        'Intégration bases de données entreprise',
        'Support multilingue et multi-sites',
        'Analyse et traitement du langage naturel'
      ]
    },
    {
      title: 'CONCEPTION CRM',
      number: '4.',
      image: '/crm.jpeg',
      details: [
        'Intégration Brevo, HubSpot',
        'Automatisation marketing et newsletters',
        'Gestion campagnes et analytics',
        'Tableaux de bord personnalisés'
      ]
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <section id="services" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl">
          <div className="relative">
            {/* Liste des services */}
            <div className="space-y-3">
            {services.map((service, index) => (
              <div key={index} className="relative">
                <div
                  className="border-t-[1.4px] border-black py-3 cursor-pointer"
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                  onMouseMove={handleMouseMove}
                  onClick={() => setOpenService(openService === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                        hoveredService === index ? 'text-blue-600' : 'text-black'
                      }`}>
                      <span className="mr-2">{service.number}</span>
                      {service.title}
                    </h3>
                    <button className="text-2xl transition-transform duration-300">
                      {openService === index ? '∧' : '∨'}
                    </button>
                  </div>

                  {/* Image qui suit la souris au survol */}
                  {hoveredService === index && (
                    <div
                      className="fixed pointer-events-none z-50"
                      style={{
                        left: `${mousePosition.x + 20}px`,
                        top: `${mousePosition.y + 20}px`,
                        transform: 'rotate(8deg)',
                        transition: 'left 0.1s ease-out, top 0.1s ease-out'
                      }}
                    >
                      <div className="relative w-[200px] h-[140px] rounded-2xl overflow-hidden border-2 border-black shadow-xl">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Détails accordéon */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openService === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="py-4 pl-12 space-y-3">
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-base text-gray-700">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
