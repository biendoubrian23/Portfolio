export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4">Meelo</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Designer produit freelance basé à Londres, passionné par la création d&apos;expériences utilisateur exceptionnelles.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                𝕏
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                ⚙️
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                📷
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#maison" className="text-gray-400 hover:text-white transition-colors">Maison</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="#apropos" className="text-gray-400 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#portefeuille" className="text-gray-400 hover:text-white transition-colors">Portefeuille</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Londres, UK</li>
              <li>hello@meelo.com</li>
              <li>+44 123 456 7890</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Meelo. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Politique de confidentialité</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Conditions d&apos;utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
