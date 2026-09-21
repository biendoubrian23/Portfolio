'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase, Rocket } from 'lucide-react';
import { clientProjects, productProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';

type Filter = 'tout' | 'client' | 'produit';

const filters: Array<{ id: Filter; label: string; count: number }> = [
  { id: 'tout', label: 'Tout', count: clientProjects.length + productProjects.length },
  { id: 'client', label: 'Réalisations clients', count: clientProjects.length },
  { id: 'produit', label: 'Mes produits', count: productProjects.length },
];

export default function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>('tout');

  const showClients = filter === 'tout' || filter === 'client';
  const showProducts = filter === 'tout' || filter === 'produit';

  return (
    <>
      {/* Filtres */}
      <div className="sticky top-[72px] z-30 mb-14 border-y-2 border-black bg-white/90 px-6 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2.5">
          {filters.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={`inline-flex items-center gap-2 rounded-full border-2 border-black px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                filter === item.id
                  ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {item.label}
              <span
                className={`text-xs font-bold ${
                  filter === item.id ? 'text-blue-300' : 'text-gray-500'
                }`}
              >
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Réalisations clients */}
        {showClients && (
          <section id="clients" className="mb-20 scroll-mt-40">
            <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-black pb-4">
              <div className="flex items-start gap-3">
                <Briefcase className="mt-1 h-7 w-7 shrink-0 text-blue-600" strokeWidth={1.8} />
                <div>
                  <h2 className="text-3xl font-bold lg:text-4xl">Réalisations clients</h2>
                  <p className="mt-1 text-gray-600">
                    Des sites livrés, mis en production, et rendus autonomes pour leur propriétaire.
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                {clientProjects.length} projets
              </span>
            </header>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {clientProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 90} className="h-full">
                  <ProjectCard project={project} compact />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Mes produits */}
        {showProducts && (
          <section id="produits" className="mb-20 scroll-mt-40">
            <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-black pb-4">
              <div className="flex items-start gap-3">
                <Rocket className="mt-1 h-7 w-7 shrink-0 text-purple-600" strokeWidth={1.8} />
                <div>
                  <h2 className="text-3xl font-bold lg:text-4xl">Mes produits</h2>
                  <p className="mt-1 text-gray-600">
                    Les applications que je conçois, développe et exploite moi-même, de l&apos;idée
                    à la fiche de store.
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                {productProjects.length} produits
              </span>
            </header>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {productProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 90} className="h-full">
                  <ProjectCard project={project} compact />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Appel à l'action */}
        <div className="mb-8 rounded-3xl border-2 border-black bg-meelo-purple p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:p-12">
          <h2 className="mb-3 text-2xl font-bold lg:text-3xl">Votre projet peut rejoindre cette liste.</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-700">
            Site, application mobile, back-office ou automatisation : dites-moi ce que vous voulez
            construire, je vous réponds avec un plan concret.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-black px-7 py-3.5 font-semibold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]"
            >
              Me contacter
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-white px-7 py-3.5 font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:bg-black hover:text-white"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
