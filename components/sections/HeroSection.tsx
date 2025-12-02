import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="maison" className="bg-meelo-purple pt-[114px] pb-[114px]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between py-8">
        {/* Left side - Text content */}
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <div className="inline-block mb-4" style={{animation: 'fadeInUp 0.8s ease-out'}}>
            <span className="px-3 py-1.5 border-2 border-black rounded-full text-xs font-bold">
              ✪ BONJOUR!
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{animation: 'fadeInLeft 1s ease-out 0.2s both'}}>
            Je suis Biendou<br />
            Brian, Software<br />
            <span className="relative inline-block">
              Engineer.
              <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 300 8" fill="none">
                <path d="M2 6C100 2 200 2 298 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          
          <p className="text-2xl text-gray-700 mb-8 max-w-xl leading-relaxed" style={{animation: 'fadeInLeft 1s ease-out 0.4s both'}}>
            Je développe des Sites Internets, Chatbots IA, App Mobiles qui résolvent des vrais Problèmes Business
          </p>
          
          <div className="flex flex-wrap gap-4" style={{animation: 'fadeInUp 1s ease-out 0.6s both'}}>
            <a href="#portefeuille" className="inline-block px-7 py-3.5 border-2 border-black rounded-2xl text-base font-semibold hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Voir mes œuvres
            </a>
            <a href="/blog" className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white border-2 border-black rounded-2xl text-base font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span>🧠</span>
              <span>Mes pensées tech</span>
            </a>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="lg:w-1/2 flex justify-center relative">
          <div className="relative" style={{animation: 'fadeInRight 1.2s ease-out 0.3s both'}}>
            {/* Purple background with rounded corners */}
            <div className="w-[459px] h-[568px] bg-[#B8A8D8] rounded-[95px] overflow-hidden relative border-2 border-black">
              <Image 
                src="/images/image_principale.png" 
                alt="Biendou Brian"
                width={459}
                height={568}
                className="object-cover w-full h-full object-top"
                priority
              />
              
              {/* Decorative waves at bottom */}
              <div className="absolute bottom-4 right-4">
                <svg width="57" height="38" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 10C10 5 20 15 30 10C40 5 50 15 60 10" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M0 20C10 15 20 25 30 20C40 15 50 25 60 20" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M0 30C10 25 20 35 30 30C40 25 50 35 60 30" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            
            {/* Badge "For Freelance" */}
            <div className="absolute top-8 -left-4 w-[106px] h-[106px] bg-white rounded-full border-2 border-black flex items-center justify-center" style={{animation: 'scaleIn 0.8s ease-out 1s both'}}>
              <div className="relative w-full h-full">
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{animation: 'rotate 10s linear infinite'}}>
                  <defs>
                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
                  </defs>
                  <text fontSize="7.1" fontWeight="bold" fill="black" letterSpacing="2.4">
                    <textPath href="#circle" startOffset="0%">
                      ✦ I AM AVAILABLE ✦ FOR FREELANCE
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl">↗</div>
              </div>
            </div>

            {/* Decorative stars */}
            <div className="absolute -top-8 right-12 text-[2.85rem]" style={{animation: 'scaleIn 0.6s ease-out 1.2s both'}}>✦</div>
            <div className="absolute top-20 -right-12 text-[2.28rem]" style={{animation: 'scaleIn 0.6s ease-out 1.4s both'}}>✧</div>
          </div>
        </div>
      </div>
    </section>
  );
}
