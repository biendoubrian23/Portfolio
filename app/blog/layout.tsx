import Script from 'next/script'
import { SmartLinkButton } from '@/components/ads'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Adsterra Popunder - Uniquement sur les pages blog */}
      <Script
        id="adsterra-popunder"
        src="//pl28182591.effectivegatecpm.com/78/31/7a/78317a9a365c11f12a3580413080a13c.js"
        strategy="afterInteractive"
      />
      
      {/* Adsterra Social Bar - Barre flottante sur les pages blog */}
      <Script
        id="adsterra-social-bar"
        src="//pl28182727.effectivegatecpm.com/a5/f9/b1/a5f9b136372826d71a566981ef4a9453.js"
        strategy="afterInteractive"
      />
      
      {/* Bouton SmartLink flottant - "Tester Gratuitement" */}
      <SmartLinkButton />
      
      {/* Contenu du blog */}
      {children}
    </>
  )
}

