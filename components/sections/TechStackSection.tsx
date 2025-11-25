'use client';

import { useEffect, useRef, useState } from 'react';

export default function TechStackSection() {
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

  const techCategories = [
    {
      title: 'Langages',
      color: 'from-purple-500 to-indigo-600',
      tools: [
        { name: 'Python', icon: '🐍' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'JavaScript', icon: '⚡' },
        { name: 'SQL', icon: '🗃️' },
      ],
    },
    {
      title: 'Data & IA',
      color: 'from-pink-500 to-rose-600',
      tools: [
        { name: 'TensorFlow', icon: '🧠' },
        { name: 'PyTorch', icon: '🔥' },
        { name: 'Pandas', icon: '🐼' },
        { name: 'Scikit-learn', icon: '📊' },
      ],
    },
    {
      title: 'Cloud & DevOps',
      color: 'from-cyan-500 to-blue-600',
      tools: [
        { name: 'Azure', icon: '☁️' },
        { name: 'Docker', icon: '🐳' },
        { name: 'Git', icon: '📂' },
        { name: 'CI/CD', icon: '🔄' },
      ],
    },
    {
      title: 'Frameworks',
      color: 'from-emerald-500 to-teal-600',
      tools: [
        { name: 'Next.js', icon: '▲' },
        { name: 'React', icon: '⚛️' },
        { name: 'FastAPI', icon: '🚀' },
        { name: 'LangChain', icon: '🔗' },
      ],
    },
  ];



  return (
    <section ref={sectionRef} id="techstack" className="py-24 bg-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-purple-100 border-2 border-purple-300 rounded-full text-sm font-medium text-purple-700">
              ⚙️ MA STACK TECHNIQUE
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Les technologies qui<br/>
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              alimentent mes projets
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Une combinaison puissante d&apos;outils modernes pour créer des solutions innovantes
          </p>
        </div>

        {/* Tech Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {techCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${(catIndex + 1) * 150}ms` }}
            >
              {/* Card */}
              <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-200">
                {/* Gradient line at top */}
                <div className={`absolute top-0 left-4 right-4 h-1 bg-gradient-to-r ${category.color} rounded-full transform -translate-y-1/2`} />
                
                <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                  {category.title}
                </h3>
                
                <div className="space-y-3">
                  {category.tools.map((tool, toolIndex) => (
                    <div
                      key={toolIndex}
                      className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group/tool"
                    >
                      <span className="text-xl group-hover/tool:scale-125 transition-transform">{tool.icon}</span>
                      <span className="font-medium">{tool.name}</span>
                      <div className={`ml-auto w-0 h-0.5 bg-gradient-to-r ${category.color} group-hover/tool:w-8 transition-all duration-300`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3D Animated Tech Ecosystem */}
        <div className={`flex justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: '800ms' }}>
          <div className="relative w-[450px] h-[450px]">
            
            {/* Animated connection lines SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 450 450">
              {/* Data flow particles on paths */}
              <defs>
                <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                </linearGradient>
                
                {/* Animated particle */}
                <circle id="particle" r="3" fill="#a855f7">
                  <animate attributeName="fill" values="#a855f7;#ec4899;#06b6d4;#a855f7" dur="3s" repeatCount="indefinite" />
                </circle>
              </defs>
              
              {/* Orbit circles with gradient stroke */}
              <circle cx="225" cy="225" r="180" fill="none" stroke="url(#lineGrad1)" strokeWidth="2" strokeDasharray="10 5" className="orbit-line-outer" />
              <circle cx="225" cy="225" r="130" fill="none" stroke="#ec4899" strokeWidth="2" strokeOpacity="0.3" className="orbit-line-middle" />
              <circle cx="225" cy="225" r="80" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 5" strokeOpacity="0.4" className="orbit-line-inner" />
              
              {/* Connection lines from center to each tool */}
              <g className="connection-lines">
                {/* Lines pulse outward from center */}
                <line x1="225" y1="225" x2="225" y2="45" stroke="url(#lineGrad1)" strokeWidth="1" strokeOpacity="0.2" className="pulse-line" />
                <line x1="225" y1="225" x2="405" y2="225" stroke="url(#lineGrad1)" strokeWidth="1" strokeOpacity="0.2" className="pulse-line" />
                <line x1="225" y1="225" x2="225" y2="405" stroke="url(#lineGrad1)" strokeWidth="1" strokeOpacity="0.2" className="pulse-line" />
                <line x1="225" y1="225" x2="45" y2="225" stroke="url(#lineGrad1)" strokeWidth="1" strokeOpacity="0.2" className="pulse-line" />
              </g>
              
              {/* Animated particles traveling on orbits */}
              <circle r="4" fill="#a855f7" className="traveling-particle">
                <animateMotion dur="8s" repeatCount="indefinite">
                  <mpath href="#outerPath" />
                </animateMotion>
              </circle>
              <circle r="3" fill="#ec4899" className="traveling-particle">
                <animateMotion dur="6s" repeatCount="indefinite">
                  <mpath href="#middlePath" />
                </animateMotion>
              </circle>
              <circle r="2" fill="#06b6d4" className="traveling-particle">
                <animateMotion dur="4s" repeatCount="indefinite">
                  <mpath href="#innerPath" />
                </animateMotion>
              </circle>
              
              {/* Hidden paths for particle animation */}
              <path id="outerPath" d="M 225 45 A 180 180 0 1 1 224.9 45" fill="none" />
              <path id="middlePath" d="M 225 95 A 130 130 0 1 1 224.9 95" fill="none" />
              <path id="innerPath" d="M 225 145 A 80 80 0 1 1 224.9 145" fill="none" />
            </svg>

            {/* Central Core - Le "Cerveau" Full Stack */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                {/* Pulse rings */}
                <div className="absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                  <div className="absolute inset-0 rounded-full bg-purple-400/30 animate-[ping_2s_ease-out_infinite]" />
                  <div className="absolute inset-0 rounded-full bg-pink-400/20 animate-[ping_2s_ease-out_infinite_0.5s]" />
                </div>
                {/* Core ball */}
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-[pulse_3s_ease-in-out_infinite] relative">
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                  <span className="text-white font-bold text-sm text-center z-10">Full<br/>Stack</span>
                </div>
              </div>
            </div>

            {/* ORBIT 1 - Infrastructure (Outer - Fast rotation) */}
            <div className="absolute inset-0 animate-[spin_15s_linear_infinite]">
              {/* Azure - Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite_reverse]">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/30 hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-2xl">☁️</span>
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Azure</div>
                </div>
              </div>
              {/* Docker - Right */}
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite_reverse]">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/30 hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-2xl">🐳</span>
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Docker</div>
                </div>
              </div>
              {/* Git - Bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-[spin_15s_linear_infinite_reverse]">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/30 hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-2xl">📂</span>
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Git</div>
                </div>
              </div>
              {/* React - Left */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite_reverse]">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/30 hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-2xl">⚛️</span>
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">React</div>
                </div>
              </div>
            </div>

            {/* ORBIT 2 - Data & IA (Middle - Medium rotation, reverse) */}
            <div className="absolute inset-[50px] animate-[spin_20s_linear_infinite_reverse]">
              {/* TensorFlow - Top-Right */}
              <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 animate-[spin_20s_linear_infinite]">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/30 hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-xl">🧠</span>
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">TensorFlow</div>
                </div>
              </div>
              {/* Pandas - Bottom-Right */}
              <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 animate-[spin_20s_linear_infinite]">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center shadow-xl shadow-purple-500/30 hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-xl">🐼</span>
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Pandas</div>
                </div>
              </div>
              {/* PyTorch - Bottom-Left */}
              <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 animate-[spin_20s_linear_infinite]">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-red-500/30 hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-xl">🔥</span>
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">PyTorch</div>
                </div>
              </div>
              {/* Scikit - Top-Left */}
              <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 animate-[spin_20s_linear_infinite]">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/30 hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-xl">📊</span>
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Scikit-learn</div>
                </div>
              </div>
            </div>

            {/* ORBIT 3 - Langages (Inner - Slow rotation) */}
            <div className="absolute inset-[110px] animate-[spin_30s_linear_infinite]">
              {/* Python - Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite_reverse]">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-400 to-yellow-500 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/30 hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-lg">🐍</span>
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Python</div>
                </div>
              </div>
              {/* JavaScript - Bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-[spin_30s_linear_infinite_reverse]">
                <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl shadow-yellow-500/30 hover:scale-110 transition-transform cursor-pointer group">
                  <span className="text-lg">⚡</span>
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">JavaScript</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Orbit lines animation */
        .orbit-line-outer {
          animation: rotate-dash 20s linear infinite;
          transform-origin: center;
        }
        .orbit-line-middle {
          animation: rotate-dash 15s linear infinite reverse;
          transform-origin: center;
        }
        .orbit-line-inner {
          animation: rotate-dash 10s linear infinite;
          transform-origin: center;
        }
        
        @keyframes rotate-dash {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Pulse lines from center */
        .pulse-line {
          animation: pulse-opacity 2s ease-in-out infinite;
        }
        
        @keyframes pulse-opacity {
          0%, 100% { stroke-opacity: 0.1; }
          50% { stroke-opacity: 0.4; }
        }
        
        /* Traveling particles glow */
        .traveling-particle {
          filter: drop-shadow(0 0 6px currentColor);
        }
      `}</style>
    </section>
  );
}
