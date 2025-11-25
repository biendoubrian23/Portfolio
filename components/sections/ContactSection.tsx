'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Site Internet',
    'Application Mobile',
    'Chatbot IA',
    'Solution CRM',
    'Dashboard / Data',
    'Autre'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'ffbead4b-e641-4d5d-a053-b118b5c83643',
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          subject: `Nouveau message de ${formData.name} - ${formData.service}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', service: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left side - Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Main image with rounded corners */}
              <div className="w-full max-w-[450px] mx-auto">
                <div className="relative rounded-3xl overflow-hidden border-4 border-gray-200 shadow-xl">
                  <Image 
                    src="/images/contact.png" 
                    alt="Contact"
                    width={450}
                    height={550}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>

                {/* Online status badge */}
                <div className="absolute bottom-6 right-6 bg-white rounded-full px-4 py-2 shadow-lg z-10 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-gray-800 font-semibold text-sm">En ligne</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-black mb-4 uppercase tracking-tight">
              TRAVAILLONS ENSEMBLE
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Construisons ensemble quelque chose d&apos;impactant, que ce soit votre marque, votre site web ou votre prochaine grande idée.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-purple-600 text-sm font-medium mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-purple-600 text-sm font-medium mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
                    placeholder="johnsmith@gmail.com"
                  />
                </div>
              </div>

              {/* Service dropdown */}
              <div>
                <label htmlFor="service" className="block text-purple-600 text-sm font-medium mb-2">
                  Service nécessaire ?
                </label>
                <div className="relative">
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 appearance-none cursor-pointer"
                  >
                    <option value="">Sélectionner...</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message textarea */}
              <div>
                <label htmlFor="message" className="block text-purple-600 text-sm font-medium mb-2">
                  Que puis-je faire pour vous...
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 resize-none"
                  placeholder="Bonjour, je voudrais me renseigner sur..."
                ></textarea>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 border-2 border-purple-400 text-purple-600 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-purple-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'ENVOI EN COURS...' : 'SOUMETTRE'}
              </button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-xl flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Message envoyé avec succès ! Je vous répondrai rapidement.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Une erreur est survenue. Veuillez réessayer.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
