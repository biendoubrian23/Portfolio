import Script from 'next/script'
import { SmartLinkButton } from '@/components/ads'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Contrôle du cooldown pour limiter les popunders agressifs */}
      <Script id="popunder-cooldown" strategy="afterInteractive">
        {`
          (function() {
            const COOLDOWN_MS = 30000; // 30 secondes
            const STORAGE_KEY = 'adsterra_popunder_last';
            
            // Vérifier si on peut charger le popunder
            const lastPopunder = localStorage.getItem(STORAGE_KEY);
            const now = Date.now();
            
            if (!lastPopunder || (now - parseInt(lastPopunder)) > COOLDOWN_MS) {
              // Charger le script popunder
              const script = document.createElement('script');
              script.src = '//pl28182591.effectivegatecpm.com/78/31/7a/78317a9a365c11f12a3580413080a13c.js';
              script.async = true;
              document.body.appendChild(script);
              
              // Enregistrer le timestamp
              localStorage.setItem(STORAGE_KEY, now.toString());
            }
          })();
        `}
      </Script>
      
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

