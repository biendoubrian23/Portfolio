export default function PortfolioSection() {
  const projects = [
    {
      title: 'Site web des médias sociaux de Snowlake',
      description: 'Snowlake est un site élégant et axé sur le produit pour une plateforme de médias sociaux, construit avec une interface utilisateur épurée et le CMS évolutif Framer.',
      link: 'Consulter l\'étude de cas',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Site web de réseautage de l\'entreprise Meeko',
      description: 'Meeko est un site moderne, développé avec Framer, qui met en relation des professionnels et est conçu pour une mise en réseau fluide.',
      link: 'Consulter l\'étude de cas',
      bgColor: 'bg-meelo-purple',
    },
    {
      title: 'Site Web d\'application bancaire en environnement de test',
      description: 'Sandbox est un site fintech nouvelle génération construit avec Framer, mettant en avant la confiance et l\'innovation grâce à un puissant CMS.',
      link: 'Consulter l\'étude de cas',
      bgColor: 'bg-gradient-to-br from-pink-100 to-blue-100',
    },
    {
      title: 'Modèle de portfolio de site Web Creatina',
      description: 'Creatinak est un site d\'agence audacieux et moderne, construit sur le CMS Framer, conçu pour mettre en valeur des visuels percutants et une expérience utilisateur fluide.',
      link: 'Consulter l\'étude de cas',
      bgColor: 'bg-gradient-to-br from-blue-50 to-green-50',
    },
  ];

  return (
    <section id="portefeuille" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3">
            <span className="px-3 py-1.5 border-2 border-black rounded-full text-xs font-medium">
              ✦ MES ŒUVRES
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold max-w-4xl mx-auto mb-3">
            Découvrez quelques-uns de nos projets exceptionnels, remplis d&apos;idées créatives.
          </h2>

          {/* Decorative element */}
          <div className="flex justify-start ml-20 mt-8">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M10 10C20 30 30 40 40 30C50 20 60 40 70 50" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`${project.bgColor} rounded-3xl overflow-hidden border-2 border-black hover:shadow-xl transition-all duration-300 group`}
            >
              {/* Image placeholder */}
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-5xl opacity-20">🖼️</div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                  {project.description}
                </p>
                <button className="flex items-center gap-2 text-black text-sm font-medium group-hover:gap-4 transition-all">
                  {project.link}
                  <span className="text-lg">⊕</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="px-6 py-3 border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
            Voir toutes les œuvres
          </button>
        </div>
      </div>
    </section>
  );
}
