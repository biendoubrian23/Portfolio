import Script from 'next/script'

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
      
      {/* Contenu du blog */}
      {children}
    </>
  )
}

