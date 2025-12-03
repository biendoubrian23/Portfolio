import Script from 'next/script'
import { AD_CONFIG } from '@/components/ads'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Google AdSense Script - Uniquement sur les pages blog */}
      {AD_CONFIG.adsense.enabled && (
        <Script
          id="adsense-script"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CONFIG.adsense.clientId}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      )}
      
      {/* Contenu du blog */}
      {children}
    </>
  )
}
