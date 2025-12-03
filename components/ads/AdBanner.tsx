'use client'

import { useEffect, useRef, useState } from 'react'

// Configuration des publicités - À remplacer par tes vraies valeurs
export const AD_CONFIG = {
  // Google AdSense (recommandé pour débuter)
  adsense: {
    clientId: 'ca-pub-XXXXXXXXXX', // À remplacer avec ton ID AdSense
    enabled: true,
  },
  // Ezoic (quand tu auras plus de trafic - 50-100 visites/jour)
  ezoic: {
    enabled: false,
  },
  // PropellerAds (si besoin de revenus supplémentaires)
  propellerAds: {
    enabled: false,
  }
}

interface AdBannerProps {
  slot: string // ID de l'emplacement publicitaire
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  className?: string
  style?: React.CSSProperties
}

/**
 * Composant pour afficher une publicité Google AdSense
 * À utiliser UNIQUEMENT sur les pages blog
 */
export default function AdBanner({ 
  slot, 
  format = 'auto', 
  className = '',
  style 
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Ne pas charger si AdSense est désactivé
    if (!AD_CONFIG.adsense.enabled) return

    try {
      // Vérifier si adsbygoogle est disponible
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        // Pousser la pub seulement si elle n'a pas déjà été chargée
        if (adRef.current && !adRef.current.dataset.adLoaded) {
          (window as any).adsbygoogle.push({})
          adRef.current.dataset.adLoaded = 'true'
          setIsLoaded(true)
        }
      }
    } catch (error) {
      console.error('Erreur chargement AdSense:', error)
      setHasError(true)
    }
  }, [])

  // Si désactivé ou erreur, ne rien afficher
  if (!AD_CONFIG.adsense.enabled || hasError) {
    return null
  }

  // Styles selon le format
  const formatStyles: Record<string, React.CSSProperties> = {
    auto: { display: 'block' },
    rectangle: { display: 'inline-block', width: 300, height: 250 },
    vertical: { display: 'inline-block', width: 160, height: 600 },
    horizontal: { display: 'inline-block', width: 728, height: 90 },
  }

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={formatStyles[format]}
        data-ad-client={AD_CONFIG.adsense.clientId}
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive={format === 'auto' ? 'true' : undefined}
      />
      {/* Placeholder pendant le chargement */}
      {!isLoaded && (
        <div 
          className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs"
          style={formatStyles[format] || { minHeight: 250, minWidth: 300 }}
        >
          <span className="animate-pulse">Publicité</span>
        </div>
      )}
    </div>
  )
}

/**
 * Publicité Sidebar (côtés de l'article)
 * Format vertical sticky
 */
export function SidebarAd({ position }: { position: 'left' | 'right' }) {
  const slotId = position === 'left' ? 'SLOT_SIDEBAR_LEFT' : 'SLOT_SIDEBAR_RIGHT'
  
  return (
    <div className={`hidden xl:block sticky top-24 ${position === 'left' ? 'pr-4' : 'pl-4'}`}>
      <AdBanner 
        slot={slotId}
        format="vertical"
        className="rounded-lg overflow-hidden shadow-sm"
      />
      <p className="text-xs text-gray-400 text-center mt-2">Publicité</p>
    </div>
  )
}

/**
 * Publicité dans le contenu de l'article
 * Format rectangle au milieu de l'article
 */
export function InArticleAd() {
  return (
    <div className="my-12 flex justify-center">
      <div className="max-w-[336px]">
        <AdBanner 
          slot="SLOT_IN_ARTICLE"
          format="rectangle"
          className="rounded-lg overflow-hidden shadow-md"
        />
        <p className="text-xs text-gray-400 text-center mt-2">Publicité</p>
      </div>
    </div>
  )
}

/**
 * Publicité après l'article
 * Format horizontal responsive
 */
export function AfterArticleAd() {
  return (
    <div className="my-8">
      <AdBanner 
        slot="SLOT_AFTER_ARTICLE"
        format="auto"
        className="rounded-lg overflow-hidden"
      />
      <p className="text-xs text-gray-400 text-center mt-2">Publicité</p>
    </div>
  )
}
