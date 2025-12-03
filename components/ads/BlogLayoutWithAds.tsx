'use client'

import { ReactNode } from 'react'
import { SidebarAd } from './AdBanner'

interface BlogLayoutWithAdsProps {
  children: ReactNode
}

/**
 * Layout pour les articles de blog avec publicités sur les côtés
 * Les pubs apparaissent uniquement sur écrans XL (1280px+)
 * Sur mobile/tablette, pas de sidebar ads
 */
export default function BlogLayoutWithAds({ children }: BlogLayoutWithAdsProps) {
  return (
    <div className="relative">
      {/* Container principal avec sidebars */}
      <div className="flex justify-center">
        {/* Sidebar gauche - Publicité */}
        <aside className="hidden xl:flex flex-col items-end w-[200px] shrink-0">
          <div className="sticky top-24 w-[160px]">
            <SidebarAd position="left" />
            
            {/* Deuxième pub en dessous après scroll */}
            <div className="mt-8">
              <SidebarAd position="left" />
            </div>
          </div>
        </aside>

        {/* Contenu principal de l'article */}
        <div className="flex-1 max-w-4xl">
          {children}
        </div>

        {/* Sidebar droite - Publicité */}
        <aside className="hidden xl:flex flex-col items-start w-[200px] shrink-0">
          <div className="sticky top-24 w-[160px]">
            <SidebarAd position="right" />
            
            {/* Deuxième pub en dessous après scroll */}
            <div className="mt-8">
              <SidebarAd position="right" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
