'use client';

import { useEffect, useRef, useState } from 'react';

// SVG Logo Components
const PythonLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M12 0C5.373 0 6.12 2.739 6.12 2.739L6.129 5.68h6.001v.85H4.786S0 5.956 0 12.058c0 6.102 4.179 5.883 4.179 5.883h2.49v-3.495s-.134-4.179 4.115-4.179h5.952s3.984.064 3.984-3.846V2.929S21.313 0 12 0zm-3.353 1.714a1.214 1.214 0 1 1 0 2.429 1.214 1.214 0 0 1 0-2.429z" fill="url(#python-blue)"/>
    <path d="M12 24c6.627 0 5.88-2.739 5.88-2.739l-.009-2.941h-6.001v-.85h7.344s4.786.574 4.786-5.528c0-6.102-4.179-5.883-4.179-5.883h-2.49v3.495s.134 4.179-4.115 4.179H6.264s-3.984-.064-3.984 3.846v5.492S1.687 24 12 24zm3.353-1.714a1.214 1.214 0 1 1 0-2.429 1.214 1.214 0 0 1 0 2.429z" fill="url(#python-yellow)"/>
    <defs>
      <linearGradient id="python-blue" x1="6" y1="0" x2="6" y2="12">
        <stop stopColor="#387EB8"/>
        <stop offset="1" stopColor="#366994"/>
      </linearGradient>
      <linearGradient id="python-yellow" x1="18" y1="12" x2="18" y2="24">
        <stop stopColor="#FFE873"/>
        <stop offset="1" stopColor="#FFC331"/>
      </linearGradient>
    </defs>
  </svg>
);

const TypeScriptLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="3" fill="#3178C6"/>
    <path d="M12.667 14.667V20h1.666v-5.333h2.334v-1.334h-6.334v1.334h2.334zM17.333 10.667c.917 0 1.667.75 1.667 1.666v4c0 .917-.75 1.667-1.667 1.667h-3.666c-.917 0-1.667-.75-1.667-1.667v-1.333h1.333v1.333c0 .184.15.334.334.334h3.666c.184 0 .334-.15.334-.334v-4c0-.184-.15-.333-.334-.333H16v-1.333h1.333z" fill="white"/>
  </svg>
);

const JavaScriptLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" fill="#F7DF1E"/>
    <path d="M6.857 20.286c.643 1.071 1.5 1.857 3 1.857 1.5 0 2.464-.75 2.464-1.786 0-1.243-.964-1.679-2.571-2.393l-.893-.393c-2.571-1.107-4.286-2.5-4.286-5.428 0-2.714 2.071-4.786 5.286-4.786 2.286 0 3.929.786 5.107 2.857l-2.786 1.786c-.607-1.071-1.286-1.5-2.321-1.5-.964 0-1.571.607-1.571 1.5 0 1.036.607 1.464 2.036 2.107l.893.393c3.036 1.286 4.75 2.607 4.75 5.571 0 3.214-2.536 5.071-5.929 5.071-3.321 0-5.464-1.607-6.5-3.714l2.321-1.357z" fill="#000"/>
    <path d="M17.571 8.286h3.215v10.643c0 2.357-1.393 3.428-3.428 3.428-.571 0-1.286-.071-1.714-.214l.5-2.143c.286.071.571.107.893.107.75 0 1.214-.357 1.214-1.178V8.286z" fill="#000"/>
  </svg>
);

const SQLLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4z" fill="#00758F"/>
    <ellipse cx="12" cy="7" rx="8" ry="3" fill="#00A4D3"/>
    <path d="M12 10c-4.41 0-8-1.34-8-3v3c0 1.66 3.59 3 8 3s8-1.34 8-3V7c0 1.66-3.58 3-8 3z" fill="#00758F" opacity="0.7"/>
    <path d="M12 14c-4.41 0-8-1.34-8-3v3c0 1.66 3.59 3 8 3s8-1.34 8-3v-3c0 1.66-3.58 3-8 3z" fill="#00758F" opacity="0.5"/>
  </svg>
);

const TensorFlowLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#FF6F00"/>
    <path d="M12 7v10M7 9.5L12 7l5 2.5M7 14.5L12 17l5-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PyTorchLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M12 2v8m0 0a4 4 0 1 0 4 4" stroke="#EE4C2C" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="12" cy="3" r="1.5" fill="#EE4C2C"/>
    <path d="M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="#EE4C2C"/>
  </svg>
);

const PandasLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="3" height="7" rx="1" fill="#150458"/>
    <rect x="4" y="13" width="3" height="7" rx="1" fill="#150458"/>
    <rect x="10.5" y="7" width="3" height="10" rx="1" fill="#E70488"/>
    <rect x="17" y="4" width="3" height="7" rx="1" fill="#150458"/>
    <rect x="17" y="13" width="3" height="7" rx="1" fill="#150458"/>
  </svg>
);

const ScikitLearnLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#F7931E"/>
    <circle cx="12" cy="12" r="6" fill="#3499CD"/>
    <circle cx="12" cy="12" r="3" fill="#F7931E"/>
    <path d="M12 3v4m0 10v4m9-9h-4m-10 0H3" stroke="#3499CD" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const AzureLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M10.5 3L4.5 17h5.25L14.25 3h-3.75z" fill="#0078D4"/>
    <path d="M14.5 10L9 21h10.5l-5-11z" fill="#50E6FF"/>
  </svg>
);

const DockerLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M13.5 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2h-2V8zm6-3h2v2h-2V5zm3 0h2v2h-2V5zm-3 3h2v2h-2V8z" fill="#2496ED"/>
    <path d="M21 11.5c-.5-.3-1.5-.4-2.3-.2-.1-.8-.7-1.5-1.6-2.1l-.3-.2-.2.3c-.4.6-.6 1.4-.5 2.2.1.5.3.9.6 1.3-.4.2-.8.3-1.3.3H1.2l-.1.5c-.2 1.5.1 2.9.9 4.2.8 1.2 2 2 3.5 2.3 3.5.7 7.5-.2 10-2.8 1.7 0 3.3-.5 4.4-1.6 0 0 .1-.1.2-.3l.1-.2-.3-.2z" fill="#2496ED"/>
  </svg>
);

const GitLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M23.5 11.957l-11.5-11.5c-.3-.3-.8-.3-1.1 0l-2.4 2.4 3 3c.3-.1.7-.1 1 0 .6.2 1 .8 1 1.4 0 .2 0 .3-.1.5l2.9 2.9c.2-.1.3-.1.5-.1.9 0 1.6.7 1.6 1.6s-.7 1.6-1.6 1.6-1.6-.7-1.6-1.6c0-.3.1-.5.2-.8l-2.7-2.7v7.1c.2.1.4.2.5.4.5.5.5 1.2 0 1.7s-1.2.5-1.7 0-.5-1.2 0-1.7c.1-.1.3-.3.5-.4v-7.2c-.2-.1-.4-.2-.5-.4-.5-.5-.5-1.2 0-1.7.1-.1.2-.2.4-.3l-3-3-7.9 7.9c-.3.3-.3.8 0 1.1l11.5 11.5c.3.3.8.3 1.1 0l11.4-11.4c.3-.3.3-.8 0-1.1z" fill="#F05032"/>
  </svg>
);

const CICDLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="none"/>
    <path d="M8 12l3 3 5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const NextJSLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="black"/>
    <path d="M9 9v6m2-6v6m2-4.5V15m2-6v6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18.5 5.5L5.5 18.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ReactLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
    <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(-60 12 12)"/>
  </svg>
);

const FastAPILogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#009688"/>
    <path d="M8 15l4-7 4 7H8z" fill="white"/>
    <circle cx="12" cy="16" r="1" fill="#009688"/>
  </svg>
);

const LangChainLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M5 8l7-5 7 5v8l-7 5-7-5V8z" stroke="#1C3C3C" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="3" r="1.5" fill="#1C3C3C"/>
    <circle cx="19" cy="8" r="1.5" fill="#1C3C3C"/>
    <circle cx="19" cy="16" r="1.5" fill="#1C3C3C"/>
    <circle cx="12" cy="21" r="1.5" fill="#1C3C3C"/>
    <circle cx="5" cy="16" r="1.5" fill="#1C3C3C"/>
    <circle cx="5" cy="8" r="1.5" fill="#1C3C3C"/>
  </svg>
);

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
        { name: 'Python', logo: <PythonLogo /> },
        { name: 'TypeScript', logo: <TypeScriptLogo /> },
        { name: 'JavaScript', logo: <JavaScriptLogo /> },
        { name: 'SQL', logo: <SQLLogo /> },
      ],
    },
    {
      title: 'Data & IA',
      color: 'from-pink-500 to-rose-600',
      tools: [
        { name: 'TensorFlow', logo: <TensorFlowLogo /> },
        { name: 'PyTorch', logo: <PyTorchLogo /> },
        { name: 'Pandas', logo: <PandasLogo /> },
        { name: 'Scikit-learn', logo: <ScikitLearnLogo /> },
      ],
    },
    {
      title: 'Cloud & DevOps',
      color: 'from-cyan-500 to-blue-600',
      tools: [
        { name: 'Azure', logo: <AzureLogo /> },
        { name: 'Docker', logo: <DockerLogo /> },
        { name: 'Git', logo: <GitLogo /> },
        { name: 'CI/CD', logo: <CICDLogo /> },
      ],
    },
    {
      title: 'Frameworks',
      color: 'from-emerald-500 to-teal-600',
      tools: [
        { name: 'Next.js', logo: <NextJSLogo /> },
        { name: 'React', logo: <ReactLogo /> },
        { name: 'FastAPI', logo: <FastAPILogo /> },
        { name: 'LangChain', logo: <LangChainLogo /> },
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      <div className="group-hover/tool:scale-125 transition-transform">{tool.logo}</div>
                      <span className="font-medium">{tool.name}</span>
                      <div className={`ml-auto w-0 h-0.5 bg-gradient-to-r ${category.color} group-hover/tool:w-8 transition-all duration-300`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
