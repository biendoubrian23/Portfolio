export default function ExperienceSection() {
  const experiences = [
    {
      period: 'NOVEMBRE 2017 - AUJOURD\'HUI',
      title: 'Directeur artistique chez Malory House',
      description: 'J\'ai dirigé une équipe talentueuse dans la création d\'expériences de marque captivantes. Mon approche était axée sur l\'innovation, la direction créative et la mise en œuvre de solutions numériques percutantes.',
    },
    {
      period: 'SEPTEMBRE 2015 - AVRIL 2017',
      title: 'Développeur senior chez Longwave Studio',
      description: 'J\'ai collaboré avec des équipes pluridisciplinaires pour optimiser les performances et améliorer l\'expérience utilisateur.',
    },
    {
      period: 'MAI 2015 - SEPTEMBRE 2015',
      title: 'Développeur junior chez Webpaint Media',
      description: 'J\'ai participé au développement front-end et à l\'amélioration de l\'interface utilisateur. J\'ai contribué au codage, au débogage et à l\'optimisation des éléments interactifs du site web.',
    },
  ];

  return (
    <section id="experiences" className="py-16 bg-meelo-purple">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left side - Header */}
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-bold mb-4">Mes expériences</h2>
            <p className="text-gray-700 text-sm mb-6">
              J&apos;ai eu le plaisir de collaborer avec des entreprises de secteurs très variés. Je suis toujours à la recherche de nouvelles aventures passionnantes et stimulantes.
            </p>
            <button className="px-6 py-3 border-2 border-black rounded-full text-sm font-medium bg-white hover:bg-black hover:text-white transition-all duration-300">
              En savoir plus sur moi
            </button>

            {/* Decorative arrow */}
            <div className="mt-12">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <path d="M20 40C40 40 60 20 80 40C100 60 80 80 100 100" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                <path d="M90 90L100 100L90 110" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Right side - Timeline */}
          <div className="lg:w-2/3">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-black"></div>

              {/* Experience items */}
              <div className="space-y-10">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-12">
                    {/* Circle on timeline */}
                    <div className="absolute left-0 top-0 w-4 h-4 bg-white border-2 border-black rounded-full -translate-x-[7px]"></div>

                    <div className="text-xs font-medium text-gray-600 mb-2">
                      {exp.period}
                    </div>

                    <h3 className="text-xl font-bold mb-2">{exp.title}</h3>

                    <p className="text-gray-700 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
