'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
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
      id="apropos" 
      className="pt-[114px] pb-2 bg-white relative border-t-2 border-black"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          <div className="lg:w-1/2">
            <h2 
              className={`text-4xl lg:text-5xl font-bold mb-4 uppercase leading-tight ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={isVisible ? {animation: 'slideInLeft 0.8s ease-out'} : {}}
            >
              CE QUE JE PEUX FAIRE POUR VOUS
            </h2>

            <p 
              className={`text-xl mb-6 text-gray-600 leading-relaxed ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={isVisible ? {animation: 'slideInLeft 0.8s ease-out 0.2s both'} : {}}
            >
              En tant que développeur full-stack, je suis un créateur d&apos;expériences numériques, créant des solutions qui résolvent des vrais problèmes business et stimulent l&apos;innovation.
            </p>
          </div>

          {/* Right side - Image inclinée avec effet slide depuis la droite */}
          <div className="hidden lg:block absolute right-[12%] top-0 z-10">
            <div 
              className={`relative ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={isVisible ? {animation: 'slideInRight 1s ease-out 0.4s both'} : {}}
            >
              <div className="w-[320px] h-[500px] rounded-[50px] overflow-hidden relative border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-[8deg]">
                <Image 
                  src="/image_droite.jpg" 
                  alt="Workspace"
                  width={320}
                  height={500}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
