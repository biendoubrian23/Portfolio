import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="maison" className="min-h-screen bg-meelo-purple pt-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between py-8">
        {/* Left side - Text content */}
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <div className="inline-block mb-4">
            <span className="px-3 py-1.5 border-2 border-black rounded-full text-xs font-medium">
              ✦ BONJOUR!
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Je suis Jonathan<br />
            Meelo, concepteur<br />
            <span className="relative inline-block">
              de produits.
              <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 300 8" fill="none">
                <path d="M2 6C100 2 200 2 298 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          
          <p className="text-base text-gray-700 mb-6 max-w-xl">
            Je suis designer produit freelance et je vis à Londres. Mon travail me passionne.
          </p>
          
          <button className="px-6 py-3 border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
            Voir mes œuvres
          </button>
        </div>

        {/* Right side - Image */}
        <div className="lg:w-1/2 flex justify-center relative">
          <div className="relative">
            {/* Purple background circle */}
            <div className="w-[420px] h-[420px] bg-[#B8A8D8] rounded-full overflow-hidden relative">
              <Image 
                src="/images/image_principale.png" 
                alt="Jonathan Meelo"
                width={420}
                height={420}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            
            {/* Badge "For Freelance" */}
            <div className="absolute top-16 right-0 w-24 h-24 bg-white rounded-full border-2 border-black flex items-center justify-center">
              <div className="text-center relative">
                <div className="text-[8px] font-bold tracking-wide" style={{transform: 'rotate(-15deg)'}}>
                  ✦ I AM AVAILABLE
                </div>
                <div className="text-[8px] font-bold tracking-wide" style={{transform: 'rotate(-15deg)'}}>
                  ✦ FOR FREELANCE ✦
                </div>
                <div className="text-xl mt-0.5">↗</div>
              </div>
            </div>

            {/* Decorative stars */}
            <div className="absolute -top-4 -right-4 text-4xl">✦</div>
            <div className="absolute top-12 -right-12 text-3xl">✧</div>
          </div>
        </div>
      </div>
    </section>
  );
}
