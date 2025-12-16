'use client';

import Image from 'next/image';

interface AppAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  appTitle: string;
  appImage: string;
  appUrl: string;
  appDescription: string;
}

export default function AppAccessModal({ isOpen, onClose, appTitle, appImage, appUrl, appDescription }: AppAccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white border-2 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
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
            {appDescription}
          </p>

          {/* CTA Button */}
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 w-full justify-center px-6 py-4 bg-purple-500 text-white border-2 border-black font-semibold text-lg hover:bg-purple-600 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <span>Accéder au site</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
