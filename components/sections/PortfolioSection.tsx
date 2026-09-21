import Link from 'next/link';
import { ArrowRight, Briefcase, Rocket } from 'lucide-react';
import { clientProjects, productProjects, type Project } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import Marquee from '@/components/Marquee';

/** Intitulé de rangée, posé au-dessus des cartes plutôt que sur les visuels. */
function RowLabel({
  icon: Icon,
  tint,
  label,
  count,
}: {
  icon: typeof Rocket;
  tint: string;
  label: string;
  count: string;
}) {
  return (
    <div className="mx-auto mb-5 flex max-w-7xl items-center gap-3 px-6">
      <Icon className={`h-5 w-5 shrink-0 ${tint}`} strokeWidth={2} />
      <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{label}</h3>
      <span className="h-px flex-1 bg-black/15" />
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {count}
      </span>
    </div>
  );
}

/** Trois exemplaires suffisent ici : chaque carte fait 400 px, un exemplaire
 *  en couvre donc largement plus qu'un écran. */
const REPEATS = 3;

/**
 * Rangée défilant en continu, qu'on peut aussi faire glisser à la main.
 * Le défilement s'arrête au survol, le temps de lire la carte et de laisser
 * la loupe parcourir le site.
 */
function ProjectMarquee({
  projects,
  speed,
  direction,
}: {
  projects: Project[];
  speed: number;
  direction?: 'right';
}) {
  return (
    <Marquee repeats={REPEATS} speed={speed} direction={direction} className="py-4">
      {projects.map((project) => (
        <div key={project.slug} className="mx-3 w-[400px] shrink-0">
          <ProjectCard project={project} compact />
        </div>
      ))}
    </Marquee>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portefeuille" className="defer-render overflow-hidden bg-white py-20">
      {/* En-tête */}
      <Reveal className="relative mb-14 text-center">
        <div className="mb-4 inline-block">
          <span className="rounded-full border-2 border-black px-3 py-1.5 text-xs font-bold">
            ✦ MES ŒUVRES
          </span>
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
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
            Approchez la souris d&apos;une carte : le défilement s&apos;arrête et le site se
            parcourt sous vos yeux.
          </p>
        </div>
      </Reveal>

      {/* Mes produits */}
      <Reveal className="mb-10">
        <RowLabel
          icon={Rocket}
          tint="text-purple-600"
          label="Mes produits"
          count={`${productProjects.length} applications`}
        />
        <ProjectMarquee projects={productProjects} speed={18} />
      </Reveal>

      {/* Projets clients */}
      <Reveal className="mb-12" delay={120}>
        <RowLabel
          icon={Briefcase}
          tint="text-blue-600"
          label="Projets clients"
          count={`${clientProjects.length} réalisations`}
        />
        <ProjectMarquee projects={clientProjects} speed={17} direction="right" />
      </Reveal>

      {/* Vers la page complète */}
      <Reveal className="px-6 text-center" delay={150}>
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
          {clientProjects.length} réalisations clients · {productProjects.length} produits que
          j&apos;édite
        </p>
      </Reveal>
    </section>
  );
}
