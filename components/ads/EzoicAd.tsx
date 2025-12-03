'use client'

import { useEffect } from 'react'

// Ezoic Ad Components for brianbiendou.com

/**
 * Composant placeholder pour Ezoic
 * Les IDs correspondent à ceux configurés dans le dashboard Ezoic
 */
interface EzoicPlaceholderProps {
  id: number
  className?: string
}

export function EzoicPlaceholder({ id, className = '' }: EzoicPlaceholderProps) {
  return (
    <div 
      id={`ezoic-pub-ad-placeholder-${id}`}
      className={className}
    />
  )
}

/**
 * Sidebar Ad - Pour les côtés de l'article (Desktop uniquement)
 * IDs Ezoic: 107 (sidebar_floating_1), 108 (sidebar_floating_2)
 */
export function SidebarAd({ position }: { position: 'left' | 'right' }) {
  const id = position === 'left' ? 107 : 108
  
  return (
    <div className={`sticky top-24 ${position === 'left' ? 'pr-4' : 'pl-4'}`}>
      <EzoicPlaceholder id={id} />
    </div>
  )
}

/**
 * Sidebar Bottom Ad - En bas de la sidebar
 * ID Ezoic: 106 (sidebar_bottom)
 */
export function SidebarBottomAd() {
  return <EzoicPlaceholder id={106} className="mt-4" />
}

/**
 * In-Content Ads - Dans le contenu de l'article
 * IDs Ezoic: 109-115 (under_first_paragraph, under_second_paragraph, mid_content, etc.)
 */
export function InContentAd({ position }: { position: 'first' | 'second' | 'mid' | 'long' | 'longer' | 'longest' }) {
  const positionToId: Record<string, number> = {
    first: 109,   // under_first_paragraph
    second: 110,  // under_second_paragraph
    mid: 111,     // mid_content
    long: 112,    // long_content
    longer: 113,  // longer_content
    longest: 114, // longest_content
  }
  
  return (
    <div className="my-8 flex justify-center">
      <EzoicPlaceholder id={positionToId[position]} />
    </div>
  )
}

/**
 * After Article Ad
 * ID Ezoic: 115 (incontent_5)
 */
export function AfterArticleAd() {
  return (
    <div className="my-8">
      <EzoicPlaceholder id={115} />
    </div>
  )
}

/**
 * Hook pour initialiser Ezoic sur la page
 * À appeler dans le layout du blog
 */
export function useEzoicAds() {
  useEffect(() => {
    // Attendre que ezstandalone soit disponible
    if (typeof window !== 'undefined' && (window as any).ezstandalone) {
      const ez = (window as any).ezstandalone
      ez.cmd = ez.cmd || []
      ez.cmd.push(function() {
        ez.showAds()
      })
    }
  }, [])
}

/**
 * Hook pour recharger les pubs après navigation (Next.js App Router)
 */
export function useEzoicRefresh() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ezstandalone) {
      const ez = (window as any).ezstandalone
      ez.cmd = ez.cmd || []
      ez.cmd.push(function() {
        ez.showAds()
      })
    }
  }, [])
}
