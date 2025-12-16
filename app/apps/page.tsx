'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppAccessModal from '@/components/AppAccessModal';

const apps = [
  {
    id: 1,
    title: 'Faire une Miniature',
    description: 'Un site dédié à la création et personnalisation de miniatures uniques.',
    url: 'https://www.faireuneminiature.fr/',
    image: '/makeminia.jpeg',
    previewImage: '/iframe1.jpeg',
    tags: ['Web', 'Miniatures', 'Design'],
    technologies: ['Next.js', 'React Konva', 'Framer Motion', 'Zustand'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    title: 'InvoiceDesign',
    description: 'Créez des factures professionnelles en quelques clics grâce à une interface 100% modulaire. Glissez-déposez vos blocs, personnalisez chaque élément et exportez en PDF haute qualité.',
    url: 'https://invoicedesign-pgz9.vercel.app/',
    image: '/iframe3.jpeg',
    previewImage: '/iframe3.jpeg',
    tags: ['Facturation', 'PDF', 'Business'],
    technologies: ['Next.js', 'dnd-kit', 'Zod', 'jsPDF'],
    color: 'from-blue-500 to-indigo-500'
  },
];

export default function AppsPage() {
  const [selectedApp, setSelectedApp] = useState<typeof apps[0] | null>(null);
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-white py-16 mb-12 border-b-2 border-black overflow-hidden -mt-24 pt-32">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mes Applications
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez mes projets et applications web que j&apos;ai développés.
          </p>
        </div>
      </section>

      {/* Apps Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app) => (
            <article
              key={app.id}
              className="group bg-white rounded-3xl border-2 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Preview Card */}
              <div className="relative h-64 bg-gray-100 overflow-hidden border-b-2 border-black">
                <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-10`} />
                <img
                  src={app.previewImage}
                  alt={`Preview of ${app.title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                  {app.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {app.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {app.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full border border-purple-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {app.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => setSelectedApp(app)}
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-purple-500 text-white border-2 border-black rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-auto"
                >
                  <span>Voir l&apos;application</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>
      </div>

      {/* Access Request Modal */}
      {selectedApp && (
        <AppAccessModal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          appTitle={selectedApp.title}
          appImage={selectedApp.image}
          appUrl={selectedApp.url}
          appDescription={selectedApp.description}
        />
      )}
    </main>
  )
}
