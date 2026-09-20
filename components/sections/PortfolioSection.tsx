import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { featuredProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';

export default function PortfolioSection() {
  return (
    <section id="portefeuille" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* En-tête */}
        <Reveal className="relative mb-12 text-center">
          <div className="mb-4 inline-block">
            <span className="rounded-full border-2 border-black px-3 py-1.5 text-xs font-bold">
              ✦ MES ŒUVRES
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:left-10 lg:block">
              <svg width="56" height="56" viewBox="0 0 50 50" fill="none">
                <path
                  d="M5 5C10 20 20 25 25 20C30 15 40 25 45 35"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2 className="mx-auto mb-4 max-w-3xl text-3xl font-bold leading-tight lg:text-[2.6rem]">
              Des projets réels, en production,
              <br />
              que vous pouvez ouvrir maintenant.
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
              Applications mobiles que j&apos;édite et sites livrés à mes clients. Survolez une
              carte : le site défile sous vos yeux.
            </p>
          </div>
        </Reveal>

        {/* Quatre projets mis en avant */}
        <div className="mx-auto mb-12 grid max-w-6xl gap-8 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 110} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* Vers la page complète */}
        <Reveal className="text-center" delay={150}>
          <Link
            href="/projets"
            className="group inline-flex items-center gap-2.5 rounded-2xl border-2 border-black bg-black px-7 py-3.5 text-base font-semibold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]"
          >
            Voir tous les projets
            <ArrowRight
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            5 réalisations clients · 5 produits que j&apos;édite
          </p>
        </Reveal>
      </div>
    </section>
  );
}
