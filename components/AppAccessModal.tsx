'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AppAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  appTitle: string;
  appImage: string;
}

export default function AppAccessModal({ isOpen, onClose, appTitle, appImage }: AppAccessModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError('Veuillez entrer une adresse email valide');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && validateEmail(email)) {
      setIsLoading(true);
      
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            appName: appTitle,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setIsSubmitted(true);
          setTimeout(() => {
            setIsSubmitted(false);
            setEmail('');
            setEmailError('');
            onClose();
          }, 3000);
        } else {
          setEmailError(data.error || 'Une erreur est survenue');
        }
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        setEmailError('Erreur de connexion. Veuillez réessayer.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setEmailError('Veuillez entrer une adresse email valide');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white border-2 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white border-2 border-black hover:bg-gray-100 transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* App Image */}
        <div className="relative h-64 lg:h-96 bg-white border-b-2 border-black overflow-hidden">
          <Image
            src={appImage}
            alt={appTitle}
            fill
            className="object-contain lg:object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {appTitle}
          </h2>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Créez des miniatures professionnelles en toute simplicité ! Inspirez-vous de designs existants et personnalisez-les avec vos propres éléments pour obtenir des résultats uniques qui captent l&apos;attention.
          </p>

          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Demander un accès
                </h3>
                <p className="text-gray-600 mb-4">
                  Entrez votre adresse email pour recevoir vos identifiants d&apos;accès
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="votre@email.com"
                    required
                    className={`w-full px-4 py-3 border-2 ${emailError ? 'border-red-500' : 'border-black'} text-base focus:outline-none focus:ring-2 ${emailError ? 'focus:ring-red-500' : 'focus:ring-purple-500'}`}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {emailError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!!emailError && email !== '' || isLoading}
                  className="w-full px-6 py-3 bg-purple-500 text-white border-2 border-black font-semibold hover:bg-purple-600 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Envoi en cours...' : 'Demander l\'accès'}
                </button>
              </form>
            </>
          ) : (
            <div className="bg-green-50 border-2 border-green-500 p-6 text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Demande envoyée !
              </h3>
              <p className="text-green-700">
                Vous obtiendrez les accès d&apos;ici 24h dans votre boîte mail.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
