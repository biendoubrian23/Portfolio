export default function ServicesSection() {
  const services = [
    {
      title: 'Stratégie et planification',
      description: 'Optimisez vos campagnes grâce à des outils qui améliorent l\'engagement, augmentent la visibilité et vous aident à établir un lien avec votre public.',
      icon: '📊',
      bgColor: 'bg-[#E5DFF5]', // Purple
    },
    {
      title: 'Recherche auprès des utilisateurs',
      description: 'Simplifiez les flux de travail de vos projets grâce à des outils et des stratégies organisées, conçus pour maintenir la cohésion de votre équipe et la réalisation de vos objectifs.',
      icon: '🔍',
      bgColor: 'bg-[#F0F5E6]', // Green
    },
    {
      title: 'Conception de sites web',
      description: 'Obtenez des informations précieuses sur le comportement des utilisateurs, les performances de votre site web et les indicateurs clés de votre activité afin d\'optimiser votre présence numérique.',
      icon: '💻',
      bgColor: 'bg-[#F5E5F0]', // Pink
    },
    {
      title: 'Conception de marque',
      description: 'Comprenez votre marché grâce à une analyse de données précise et à une connaissance approfondie de vos clients, qui guideront vos processus de prise de décision.',
      icon: '💎',
      bgColor: 'bg-[#E5F0F5]', // Blue
    },
  ];

  return (
    <section id="services" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3">
            <span className="px-3 py-1.5 border-2 border-black rounded-full text-xs font-medium">
              ⚡ MES SERVICES
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold max-w-3xl mx-auto">
            Le service que je propose est spécifiquement conçu pour répondre à vos besoins.
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.bgColor} rounded-3xl p-6 border-2 border-black hover:shadow-lg transition-all duration-300`}
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl mb-4 border-2 border-black">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="px-6 py-3 border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
            Consulter le portefeuille
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute left-20 top-1/4 text-4xl">⚡</div>
        <div className="absolute right-20 top-1/3 text-3xl">✦</div>
        <div className="absolute right-32 bottom-20 text-2xl">✧</div>
      </div>
    </section>
  );
}
