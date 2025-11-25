'use client';

import { useEffect, useRef, useState } from 'react';

export default function FormationSection() {
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

  const certifications = [
    {
      name: 'Google Data Analytics Professional',
      issuer: 'Google',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      ),
      badges: [
        { label: 'Data Viz', color: 'bg-blue-100 text-blue-700' },
        { label: 'SQL', color: 'bg-green-100 text-green-700' },
        { label: '180h', color: 'bg-gray-100 text-gray-600' }
      ]
    },
    {
      name: 'IBM Data Science Professional',
      issuer: 'IBM',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#054ADA"/>
          <text x="12" y="15" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">IBM</text>
        </svg>
      ),
      badges: [
        { label: 'Python', color: 'bg-yellow-100 text-yellow-700' },
        { label: 'ML', color: 'bg-purple-100 text-purple-700' },
        { label: '200h', color: 'bg-gray-100 text-gray-600' }
      ]
    },
    {
      name: 'Azure Data Scientist Associate',
      issuer: 'Microsoft',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L3 8v8l9 5 9-5V8l-9-5z" fill="#0078D4"/>
          <path d="M14 10L9 18h9l-4-8z" fill="#50E6FF"/>
        </svg>
      ),
      badges: [
        { label: 'Cloud', color: 'bg-cyan-100 text-cyan-700' },
        { label: 'MLOps', color: 'bg-indigo-100 text-indigo-700' },
        { label: '120h', color: 'bg-gray-100 text-gray-600' }
      ]
    },
    {
      name: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#FF6F00"/>
          <path d="M12 7v10M7 9.5L12 7l5 2.5M7 14.5L12 17l5-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      badges: [
        { label: 'Deep Learning', color: 'bg-orange-100 text-orange-700' },
        { label: 'NLP', color: 'bg-pink-100 text-pink-700' },
        { label: '100h', color: 'bg-gray-100 text-gray-600' }
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="certifications" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-indigo-100 border-2 border-indigo-300 rounded-full text-sm font-medium text-indigo-700">
              🏆 CERTIFICATIONS
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Mes certifications<br/>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              professionnelles
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Des certifications reconnues dans le domaine de la Data Science et du Machine Learning
          </p>
        </div>

        {/* Certifications - Grid */}
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {cert.logo}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl group-hover:text-indigo-600 transition-colors">
                      {cert.name}
                    </h4>
                    <p className="text-gray-500">{cert.issuer}</p>
                  </div>
                </div>

                {/* Badges thématiques */}
                <div className="flex flex-wrap gap-2">
                  {cert.badges.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className={`px-3 py-1 text-xs font-semibold ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note en bas */}
        <p className={`text-center text-gray-400 text-sm mt-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          Certifications en cours d&apos;obtention ou à valider
        </p>
      </div>
    </section>
  );
}
