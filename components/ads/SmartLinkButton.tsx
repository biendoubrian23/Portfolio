'use client'

/**
 * Adsterra SmartLink Button
 * Bouton flottant vert horizontal en bas à droite
 * Lien: https://www.effectivegatecpm.com/ya9y55z88?key=8e035e0cb8405bd367daf8c84190375f
 */
export function SmartLinkButton() {
  return (
    <a
      href="https://www.effectivegatecpm.com/ya9y55z88?key=8e035e0cb8405bd367daf8c84190375f"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 group hidden md:flex"
    >
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-5 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3">
        {/* Icône éclair */}
        <svg 
          className="w-5 h-5 animate-pulse" 
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
        
        {/* Texte */}
        <span className="text-sm font-semibold whitespace-nowrap">
          Tester Gratuitement
        </span>
        
        {/* Badge */}
        <span className="bg-yellow-400 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">
          GRATUIT
        </span>
      </div>
      
      {/* Effet de brillance au hover */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>
    </a>
  )
}
