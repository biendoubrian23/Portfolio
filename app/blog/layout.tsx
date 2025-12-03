import Script from 'next/script'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Ezoic Scripts - Uniquement sur les pages blog */}
      
      {/* Privacy Scripts (RGPD) - Doivent être chargés en premier */}
      <Script
        id="ezoic-privacy-1"
        src="https://cmp.gatekeeperconsent.com/min.js"
        data-cfasync="false"
        strategy="beforeInteractive"
      />
      <Script
        id="ezoic-privacy-2"
        src="https://the.gatekeeperconsent.com/cmp.min.js"
        data-cfasync="false"
        strategy="beforeInteractive"
      />
      
      {/* Ezoic Header Script */}
      <Script
        id="ezoic-header"
        src="//www.ezojs.com/ezoic/sa.min.js"
        strategy="afterInteractive"
      />
      
      {/* Ezoic Initialization */}
      <Script id="ezoic-init" strategy="afterInteractive">
        {`
          window.ezstandalone = window.ezstandalone || {};
          ezstandalone.cmd = ezstandalone.cmd || [];
          ezstandalone.cmd.push(function() {
            ezstandalone.showAds();
          });
        `}
      </Script>
      
      {/* Contenu du blog */}
      {children}
    </>
  )
}

