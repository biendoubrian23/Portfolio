export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4">Brian BIENDOU</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Passionné par la Data, le Machine Learning, le développement web et la création de solutions digitales innovantes.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/brian-biendou-429106201/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#maison" className="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#apropos" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="#aboutme" className="text-gray-400 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#portefeuille" className="text-gray-400 hover:text-white transition-colors">Mes Projets</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Toulouse, France</li>
              <li>clarkybrian@outlook.fr</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Brian BIENDOU. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Me contacter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
