'use client'

/**
 * Adsterra SmartLink Button
 * Bouton flottant vert sur le côté pour inciter au clic
 * Lien: https://www.effectivegatecpm.com/ya9y55z88?key=8e035e0cb8405bd367daf8c84190375f
 */
export function SmartLinkButton() {
  return (
    <a
      href="https://www.effectivegatecpm.com/ya9y55z88?key=8e035e0cb8405bd367daf8c84190375f"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 group hidden md:block"
    >
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-l-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl writing-mode-vertical">
        <div className="flex flex-col items-center gap-2">
          {/* Icône */}
          <svg 
            className="w-6 h-6 animate-pulse" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
          
          {/* Texte vertical */}
          <span className="text-sm font-semibold tracking-wide" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            Tester Gratuitement
          </span>
          
          {/* Badge "Gratuit" */}
          <span className="bg-yellow-400 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
            GRATUIT
          </span>
        </div>
      </div>
      
      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-l-xl overflow-hidden" />
    </a>
  )
}
