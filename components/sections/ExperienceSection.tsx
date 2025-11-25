'use client';

import { useEffect, useRef, useState } from 'react';

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      period: 'NOVEMBRE 2025 - AUJOURD\'HUI',
      title: 'Développeur IA & Chatbot chez Messages',
      company: 'Messages - Toulouse',
      description: 'Conception et déploiement d\'un chatbot intelligent en RAG connecté à 8 sites web (Coollibri, Jedecore, Jimprimeenfrance...) et à la base de données clients pour le suivi des commandes en temps réel.',
      highlights: [
        '8 sites web intégrés',
        'Connexion BDD temps réel',
        '3 langues supportées'
      ],
      color: 'bg-pink-500',
      companyBadge: 'bg-pink-100 text-pink-700'
    },
    {
      period: 'SEPTEMBRE 2024 - SEPTEMBRE 2025',
      title: 'Data Engineer & Ingénieur Systèmes Embarqués',
      company: 'Sopra Steria pour Airbus - Toulouse',
      description: 'Double casquette Data/Embarqué : développement de pipelines ETL pour centraliser les données avioniques massives, automatisation logicielle en environnement DO-178C, et création de dashboards temps réel pour le monitoring des KPIs critiques.',
      highlights: [
        '-25% temps de diagnostic',
        'Pipelines ETL Python/Airflow',
        'Dashboards Power BI & Tableau'
      ],
      color: 'bg-blue-500',
      companyBadge: 'bg-blue-100 text-blue-700'
    },
    {
      period: 'JUILLET 2024 - SEPTEMBRE 2024',
      title: 'Data Engineer IoT',
      company: 'Weenav - Roncq',
      description: 'Ingestion et traitement de données IoT en temps réel : parsing de trames CAN/J1939, pipelines de pré-traitement vers AWS S3/RDS, et création de dashboards Grafana pour la détection d\'anomalies capteurs.',
      highlights: [
        '-30% temps de réponse',
        'Flux temps réel AWS',
        'Monitoring Grafana'
      ],
      color: 'bg-amber-700',
      companyBadge: 'bg-amber-100 text-amber-800'
    },
  ];

  return (
    <section ref={sectionRef} id="experiences" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left side - Header */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start">
            <div 
              className={`${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={isVisible ? {animation: 'slideInLeft 0.8s ease-out'} : {}}
            >
              <span className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm font-medium mb-6">
                ✦ PARCOURS
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Mes expériences</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                De l&apos;aéronautique à l&apos;IA, j&apos;ai développé une expertise unique alliant <strong>Data Engineering</strong>, <strong>développement d&apos;applications</strong> et <strong>intelligence artificielle</strong>.
              </p>
              
              {/* Stats mini */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-blue-600">3+</div>
                  <div className="text-sm text-gray-500">Années d&apos;expérience</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-purple-600">10+</div>
                  <div className="text-sm text-gray-500">Projets livrés</div>
                </div>
              </div>

              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300"
              >
                Me contacter
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right side - Timeline */}
          <div className="lg:w-2/3">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 via-blue-500 to-amber-700"></div>

              {/* Experience items */}
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div 
                    key={index} 
                    className={`relative pl-12 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={isVisible ? {animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.2}s both`} : {}}
                  >
                    {/* Circle on timeline */}
                    <div className={`absolute left-0 top-1 w-4 h-4 ${exp.color} rounded-full border-4 border-white shadow-md`}></div>

                    {/* Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {exp.period}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${exp.companyBadge}`}>
                          {exp.company}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-900">{exp.title}</h3>

                      <p className="text-gray-600 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((highlight, hIndex) => (
                          <span 
                            key={hIndex}
                            className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                              hIndex === 0 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
