'use client';

import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="apropos" className="pt-[114px] pb-2 bg-white relative border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 uppercase leading-tight">
              CE QUE JE PEUX FAIRE POUR VOUS
            </h2>

            <p className="text-lg mb-6 text-gray-600 leading-relaxed">
              En tant que développeur full-stack, je suis un créateur d&apos;expériences numériques, créant des solutions qui résolvent des vrais problèmes business et stimulent l&apos;innovation.
            </p>
          </div>

          {/* Right side - Image inclinée (position absolue pour ne pas affecter le layout) */}
          <div className="hidden lg:block absolute right-[12%] top-0 z-10">
            <div className="relative" style={{transform: 'rotate(8deg)'}}>
              <div className="w-[320px] h-[500px] rounded-[50px] overflow-hidden relative border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <Image 
                  src="/image_droite.jpg" 
                  alt="Workspace"
                  width={320}
                  height={500}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
