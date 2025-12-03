'use client'

import { useEffect } from 'react'

// Ezoic Ad Components for brianbiendou.com
// Placeholders IDs from Ezoic Dashboard

/**
 * Composant placeholder générique pour Ezoic
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
 * Top of Page Ad - En haut de la page blog
 * ID: 101
 */
export function TopOfPageAd() {
  return (
    <div className="w-full flex justify-center my-4">
      <EzoicPlaceholder id={101} />
    </div>
  )
}

/**
 * Bottom of Page Ad - En bas de la page
 * ID: 103
 */
export function BottomOfPageAd() {
  return (
    <div className="w-full flex justify-center my-8">
      <EzoicPlaceholder id={103} />
    </div>
  )
}

/**
 * Sidebar Ad - Pour les côtés de l'article (Desktop uniquement)
 * IDs: 107 (sidebar_floating_1), 108 (sidebar_floating_2)
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
 * ID: 106
 */
export function SidebarBottomAd() {
  return <EzoicPlaceholder id={106} className="mt-4" />
}

/**
 * Sidebar Standard Ad
 * ID: 104
 */
export function SidebarStandardAd() {
  return <EzoicPlaceholder id={104} className="my-4" />
}

/**
 * Under First Paragraph Ad
 * ID: 109
 */
export function UnderFirstParagraphAd() {
  return (
    <div className="my-8 flex justify-center not-prose">
      <EzoicPlaceholder id={109} />
    </div>
  )
}

/**
 * Under Second Paragraph Ad
 * ID: 110
 */
export function UnderSecondParagraphAd() {
  return (
    <div className="my-8 flex justify-center not-prose">
      <EzoicPlaceholder id={110} />
    </div>
  )
}

/**
 * Mid Content Ad - Au milieu du contenu
 * ID: 111
 */
export function MidContentAd() {
  return (
    <div className="my-8 flex justify-center not-prose">
      <EzoicPlaceholder id={111} />
    </div>
  )
}

/**
 * Long Content Ad - Pour les longs articles
 * ID: 112
 */
export function LongContentAd() {
  return (
    <div className="my-8 flex justify-center not-prose">
      <EzoicPlaceholder id={112} />
    </div>
  )
}

/**
 * Longer Content Ad
 * ID: 113
 */
export function LongerContentAd() {
  return (
    <div className="my-8 flex justify-center not-prose">
      <EzoicPlaceholder id={113} />
    </div>
  )
}

/**
 * Longest Content Ad
 * ID: 114
 */
export function LongestContentAd() {
  return (
    <div className="my-8 flex justify-center not-prose">
      <EzoicPlaceholder id={114} />
    </div>
  )
}

/**
 * In-Content 5 Ad
 * ID: 115
 */
export function InContent5Ad() {
  return (
    <div className="my-8 flex justify-center not-prose">
      <EzoicPlaceholder id={115} />
    </div>
  )
}

/**
 * After Article Ad - Après l'article
 */
export function AfterArticleAd() {
  return (
    <div className="my-8">
      <EzoicPlaceholder id={115} />
    </div>
  )
}

/**
 * In-Content Ads - Wrapper générique
 */
export function InContentAd({ position }: { position: 'first' | 'second' | 'mid' | 'long' | 'longer' | 'longest' }) {
  const positionToId: Record<string, number> = {
    first: 109,
    second: 110,
    mid: 111,
    long: 112,
    longer: 113,
    longest: 114,
  }
  
  return (
    <div className="my-8 flex justify-center not-prose">
      <EzoicPlaceholder id={positionToId[position]} />
    </div>
  )
}

/**
 * Hook pour initialiser Ezoic
 */
export function useEzoicAds() {
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

/**
 * Hook pour recharger les pubs après navigation
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
