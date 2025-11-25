export default function ContactSection() {
  return (
    <section id="tarification" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side - Content */}
          <div className="lg:w-1/2">
            <div className="inline-block mb-4">
              <span className="px-3 py-1.5 border-2 border-black rounded-full text-xs font-medium">
                ✦ CONTACTEZ-MOI
              </span>
            </div>

            <h2 className="text-4xl font-bold mb-4">
              Prêt à donner vie à votre projet ?
            </h2>

            <p className="text-base text-gray-700 mb-6">
              Discutons de votre prochain projet et voyons comment nous pouvons créer quelque chose d&apos;exceptionnel ensemble.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-meelo-purple rounded-full flex items-center justify-center text-lg">
                  📧
                </div>
                <div>
                  <div className="font-medium text-sm">Email</div>
                  <div className="text-gray-600 text-sm">hello@meelo.com</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-meelo-green rounded-full flex items-center justify-center text-lg">
                  📱
                </div>
                <div>
                  <div className="font-medium text-sm">Téléphone</div>
                  <div className="text-gray-600 text-sm">+44 123 456 7890</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-meelo-pink rounded-full flex items-center justify-center text-lg">
                  📍
                </div>
                <div>
                  <div className="font-medium text-sm">Localisation</div>
                  <div className="text-gray-600 text-sm">Londres, Royaume-Uni</div>
                </div>
              </div>
            </div>

            <button className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300">
              Démarrer un projet
            </button>
          </div>

          {/* Right side - Form */}
          <div className="lg:w-1/2">
            <form className="bg-meelo-purple rounded-3xl p-6 border-2 border-black">
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium text-sm mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-black focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  placeholder="Votre nom"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block font-medium text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-black focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  placeholder="votre@email.com"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block font-medium text-sm mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-black focus:outline-none focus:ring-2 focus:ring-black resize-none text-sm"
                  placeholder="Parlez-moi de votre projet..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
