'use client'

import Script from 'next/script'

/**
 * Adsterra Native Banner Component
 * Affiche une bannière native 4:1 intégrée au contenu
 * Container ID: 61fff0a083668ee5bc48d79290242e0e
 */
export function AdsterraNativeBanner() {
  return (
    <div className="my-6 w-full">
      <Script
        id="adsterra-native-banner"
        async
        data-cfasync="false"
        src="//pl28182676.effectivegatecpm.com/61fff0a083668ee5bc48d79290242e0e/invoke.js"
        strategy="afterInteractive"
      />
      <div id="container-61fff0a083668ee5bc48d79290242e0e" />
    </div>
  )
}

/**
 * Adsterra Sidebar Banner 160x300
 * Parfait pour les sidebars flottantes
 * Utilise le même script mais dans un container adapté
 */
export function AdsterraSidebarBanner() {
  return (
    <div className="w-[160px] min-h-[300px] flex items-center justify-center">
      <Script
        id="adsterra-sidebar-banner"
        async
        data-cfasync="false"
        src="//pl28182676.effectivegatecpm.com/61fff0a083668ee5bc48d79290242e0e/invoke.js"
        strategy="afterInteractive"
      />
      <div id="container-61fff0a083668ee5bc48d79290242e0e" />
    </div>
  )
}

/**
 * Wrapper pour afficher la bannière après l'article
 */
export function AfterArticleBanner() {
  return (
    <div className="my-8">
      <AdsterraNativeBanner />
    </div>
  )
}

/**
 * Wrapper pour afficher la bannière en haut de page
 */
export function TopOfPageBanner() {
  return (
    <div className="w-full flex justify-center my-4">
      <AdsterraNativeBanner />
    </div>
  )
}

/**
 * Wrapper pour afficher la bannière en bas de page
 */
export function BottomOfPageBanner() {
  return (
    <div className="w-full flex justify-center my-8">
      <AdsterraNativeBanner />
    </div>
  )
}
