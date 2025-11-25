export default function StatsSection() {
  const stats = [
    {
      value: '97%',
      label: 'Clients satisfaits et heureux',
    },
    {
      value: '15',
      label: 'Des années d\'expérience professionnelle',
    },
    {
      value: '100+',
      label: 'Projets réussis',
    },
    {
      value: '30',
      label: 'Prix de design reçus',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* CTA Button */}
        <div className="text-center mb-12">
          <button className="px-6 py-3 border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
            Voir toutes les œuvres
          </button>
        </div>

        {/* Stats Container */}
        <div className="border-2 border-black rounded-3xl p-12 bg-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold mb-3">
                  {stat.value}
                </div>
                <div className="text-gray-700 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 right-40">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M20 20C30 40 40 50 50 40" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 40C60 30 70 50 80 60" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute -bottom-5 right-20 text-4xl">✦</div>
      </div>
    </section>
  );
}
