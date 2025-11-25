export default function ProcessSection() {
  const steps = [
    {
      number: '01.',
      title: 'Recherche et idéation',
      description: 'Je commence par comprendre votre marque, votre public et vos objectifs, en recueillant des informations et en faisant émerger des idées qui façonneront les bases du design.',
      icon: '💡',
      bgColor: 'bg-[#F0F5E6]', // Green
    },
    {
      number: '02.',
      title: 'Développement de concepts',
      description: 'Je commence par comprendre votre marque, votre public et vos objectifs, en recueillant des informations et en faisant émerger des idées qui façonneront les bases du design.',
      icon: '🎨',
      bgColor: 'bg-[#F5E5F0]', // Pink
    },
    {
      number: '03.',
      title: 'Prototypage et tests',
      description: 'Je commence par comprendre votre marque, votre public et vos objectifs, en recueillant des informations et en faisant émerger des idées qui façonneront les bases du design.',
      icon: '🧪',
      bgColor: 'bg-[#FFF8F0]', // Beige
    },
  ];

  return (
    <section id="processus" className="py-16 bg-meelo-purple relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3">
            <span className="px-3 py-1.5 border-2 border-black rounded-full text-xs font-medium bg-white">
              ✦ PROCESSUS
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold max-w-3xl mx-auto">
            Mon mode de travail est axé sur une productivité maximale.
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-3 gap-5 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${step.bgColor} rounded-3xl p-6 border-2 border-black hover:shadow-lg transition-all duration-300 relative`}
            >
              {/* Number badge */}
              <div className="absolute top-6 right-6 text-xl font-bold">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl mb-4 border-2 border-black">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}

          {/* Arrow pointing to next step */}
          <div className="hidden lg:block absolute top-1/2 left-1/3 transform -translate-y-1/2 translate-x-12">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M10 30L50 30M50 30L35 15M50 30L35 45" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="hidden lg:block absolute top-1/2 right-1/3 transform -translate-y-1/2 -translate-x-12">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M10 30L50 30M50 30L35 15M50 30L35 45" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 text-4xl">✦</div>
        <div className="absolute top-40 left-32 text-3xl">✧</div>
        <div className="absolute top-20 right-20 text-4xl">✦</div>
      </div>
    </section>
  );
}
