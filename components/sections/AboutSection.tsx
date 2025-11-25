import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="apropos" className="py-16 px-6 bg-meelo-purple">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left side - Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Purple circle background */}
              <div className="w-[380px] h-[380px] bg-[#B8A8D8] rounded-full overflow-hidden relative">
                <Image 
                  src="/images/image_secondaire.png" 
                  alt="Jonathan Meelo"
                  width={380}
                  height={380}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Badge "10+ years of work experience" */}
              <div className="absolute top-12 -right-6 w-28 h-28 bg-white rounded-full border-2 border-black flex items-center justify-center">
                <div className="text-center p-3">
                  <div className="text-[7px] font-bold leading-tight">
                    ✦ 10+ YEARS OF WORK EXPERIENCE ✦
                  </div>
                  <div className="text-xl mt-0.5">↗</div>
                </div>
              </div>

              {/* Decorative wave lines */}
              <div className="absolute -bottom-8 -left-8">
                <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
                  <path d="M10 10C10 10 30 20 30 40C30 60 10 70 10 70" stroke="black" strokeWidth="2"/>
                  <path d="M30 10C30 10 50 20 50 40C50 60 30 70 30 70" stroke="black" strokeWidth="2"/>
                  <path d="M50 10C50 10 70 20 70 40C70 60 50 70 50 70" stroke="black" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2">
            <div className="inline-block mb-4">
              <span className="px-3 py-1.5 border-2 border-black rounded-full text-xs font-medium bg-white">
                ✦ À PROPOS
              </span>
            </div>

            <h2 className="text-4xl font-bold mb-4">
              En savoir plus sur moi
            </h2>

            <p className="text-base mb-4 text-gray-800">
              Je suis Jonathan Meelo, designer de produits basé à Londres. Je suis passionné par mon travail au quotidien.
            </p>

            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Mon parcours dans ce domaine dynamique et en constante évolution témoigne de ma passion pour la création d&apos;expériences utilisateur pertinentes, l&apos;exploitation des technologies et le dépassement audacieux des limites de la créativité numérique. J&apos;excelle en transformant les idées en designs intuitifs et percutants.
            </p>

            <button className="px-6 py-3 border-2 border-black rounded-full text-sm font-medium bg-white hover:bg-black hover:text-white transition-all duration-300">
              En savoir plus sur moi
            </button>
          </div>
        </div>

        {/* Decorative hearts */}
        <div className="absolute right-20 top-10 text-4xl">♡</div>
        <div className="absolute right-32 top-24 text-3xl">♡</div>
      </div>
    </section>
  );
}
