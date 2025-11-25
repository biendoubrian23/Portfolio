'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function AboutMeSection() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="aboutme"
      className="py-20 bg-purple-100 relative overflow-hidden"
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 
                        0 0 40px rgba(139, 92, 246, 0.15),
                        inset 0 0 20px rgba(255, 255, 255, 0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.5), 
                        0 0 60px rgba(139, 92, 246, 0.25),
                        inset 0 0 30px rgba(255, 255, 255, 0.15);
          }
        }
        @keyframes float-elegant {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-6px) rotate(-3deg); }
        }
        @keyframes border-dance {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        .shimmer-text {
          background: linear-gradient(
            90deg, 
            #1f1f1f 0%, 
            #6b21a8 20%,
            #a855f7 40%, 
            #fbbf24 50%,
            #a855f7 60%,
            #6b21a8 80%,
            #1f1f1f 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .badge-luxury {
          animation: float-elegant 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite;
        }
        .border-animated {
          background: linear-gradient(90deg, #fbbf24, #a855f7, #6366f1, #a855f7, #fbbf24);
          background-size: 300% 100%;
          animation: border-dance 4s ease infinite;
        }
        .dot-animate {
          animation: dot-pulse 2s ease-in-out infinite;
        }
      `}</style>
      {/* Decorative hearts */}
      <div className="absolute top-8 right-[15%] text-purple-300">
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 15C20 6.716 13.284 0 5 0C2.239 0 0 2.239 0 5C0 13.284 6.716 20 15 20C6.716 20 0 26.716 0 35C0 37.761 2.239 40 5 40C13.284 40 20 33.284 20 25" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M20 45C20 36.716 26.716 30 35 30C37.761 30 40 32.239 40 35C40 43.284 33.284 50 25 50C33.284 50 40 56.716 40 65C40 67.761 37.761 70 35 70C26.716 70 20 63.284 20 55" stroke="currentColor" strokeWidth="2" fill="none" transform="translate(0, -20)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left side - Image with blob shape */}
          <div 
            className={`relative flex-shrink-0 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={isVisible ? {animation: 'fadeInLeft 1s ease-out'} : {}}
          >
            {/* Wave decoration */}
            <div className="absolute -left-8 bottom-1/3 text-gray-800 z-10">
              <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20C10 20 10 10 20 10C30 10 30 20 40 20C50 20 50 10 60 10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M0 30C10 30 10 20 20 20C30 20 30 30 40 30C50 30 50 20 60 20" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M0 40C10 40 10 30 20 30C30 30 30 40 40 40C50 40 50 30 60 30" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>

            {/* Blob shape with clipped image */}
            <div className="relative w-[350px] h-[450px] lg:w-[400px] lg:h-[520px]">
              {/* Image clipped with blob shape */}
              <div 
                className="w-full h-full overflow-hidden"
                style={{
                  clipPath: `path('M200 10 C300 10 370 70 385 150 C400 230 395 290 380 350 C395 410 390 470 360 500 C310 545 250 530 200 530 C150 530 90 545 40 500 C10 470 5 410 20 350 C5 290 0 230 15 150 C30 70 100 10 200 10Z')`,
                }}
              >
                <Image 
                  src="/images/image_secondaire.png" 
                  alt="À propos de moi"
                  width={400}
                  height={520}
                  className="object-cover w-full h-full object-top"
                  priority
                />
              </div>

              {/* Yellow curved line at bottom */}
              <svg 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%]" 
                viewBox="0 0 300 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M10 15 Q75 5 150 10 Q225 15 290 5" 
                  stroke="#F7C948" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {/* Decorative star */}
              <div className="absolute bottom-16 right-4 text-purple-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"/>
                </svg>
              </div>

              {/* Decorative speech bubble */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full border-2 border-gray-800 shadow-md rotate-[-5deg] z-10">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                  <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                  <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                  <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                  <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                </div>
              </div>

              {/* Freelance badge - Style pill élégant */}
              <div className="absolute bottom-20 -left-6 badge-luxury z-10">
                <div className="relative bg-white rounded-full px-5 py-2.5 lg:px-6 lg:py-3 flex items-center gap-3 shadow-xl border border-gray-200">
                  {/* Point vert animé */}
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-lg shadow-emerald-500/50"></span>
                  </span>
                  
                  {/* Texte */}
                  <div className="relative flex items-center gap-2">
                    <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-gray-800">
                      Disponible
                    </span>
                    <span className="text-[10px] lg:text-xs font-semibold uppercase tracking-wide text-emerald-600">
                      Freelance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div 
              className={`inline-block mb-6 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={isVisible ? {animation: 'fadeInUp 0.8s ease-out'} : {}}
            >
              <span className="px-4 py-2 border-2 border-gray-800 rounded-full text-sm font-medium">
                ✦ À PROPOS
              </span>
            </div>

            {/* Title */}
            <h2 
              className={`text-4xl lg:text-5xl font-bold mb-6 text-gray-900 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={isVisible ? {animation: 'fadeInUp 0.8s ease-out 0.2s both'} : {}}
            >
              En savoir plus sur moi
            </h2>

            {/* Subtitle */}
            <p 
              className={`text-xl lg:text-2xl mb-6 text-gray-800 font-medium ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={isVisible ? {animation: 'fadeInUp 0.8s ease-out 0.4s both'} : {}}
            >
              Data Analyst & Développeur Full-Stack, passionné par la transformation des données en solutions concrètes.
            </p>

            {/* Description */}
            <p 
              className={`text-lg text-gray-600 leading-relaxed ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={isVisible ? {animation: 'fadeInUp 0.8s ease-out 0.6s both'} : {}}
            >
              Spécialisé dans les pipelines ETL, l&apos;analyse exploratoire et la visualisation de données (Tableau, Power BI), je conçois également des chatbots intelligents en RAG, des applications mobiles et des sites web sur mesure. Mon expertise combine Data Engineering, Machine Learning et développement d&apos;applications pour créer des solutions digitales performantes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
