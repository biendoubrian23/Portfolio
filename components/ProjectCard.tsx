'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowUpRight, Globe, ScanSearch, Smartphone } from 'lucide-react';
import type { Project } from '@/lib/projects';
import SitePeek from './SitePeek';
import StoreBadges from './StoreBadges';

const MAX_TILT = 5;

export default function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const peekTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [peeking, setPeeking] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--tilt-y', `${(px - 0.5) * MAX_TILT * 2}deg`);
    el.style.setProperty('--tilt-x', `${(0.5 - py) * MAX_TILT * 2}deg`);
    el.style.setProperty('--pointer-x', `${px * 100}%`);
    el.style.setProperty('--pointer-y', `${py * 100}%`);
  };

  const handleEnter = () => {
    cardRef.current?.style.setProperty('--tilt-lift', '-6px');
    peekTimer.current = setTimeout(() => setPeeking(true), 180);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
      el.style.setProperty('--tilt-lift', '0px');
    }
    if (peekTimer.current) clearTimeout(peekTimer.current);
    setPeeking(false);
  };

  const open = () => {
    if (project.url) window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  const hasMobile = project.platforms.includes('ios') || project.platforms.includes('android');

  return (
    <>
      <article
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={open}
        style={{ '--glow-color': `${project.colors.from}2e` } as React.CSSProperties}
        className={`tilt-card group relative flex h-full flex-col rounded-3xl border-2 border-black bg-white overflow-hidden
          shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)]
          ${project.url ? 'cursor-pointer' : ''}`}
      >
        {/* Halo qui suit le curseur, aux couleurs de la marque du projet */}
        <div className="tilt-glow absolute inset-0 z-20 pointer-events-none" />

        {/* Filet dégradé aux couleurs du projet */}
        <div
          className="h-1.5 w-full shrink-0"
          style={{ background: `linear-gradient(90deg, ${project.colors.from}, ${project.colors.to})` }}
        />

        {/* Aperçu du site */}
        <div className="sheen relative aspect-[16/10] overflow-hidden border-b-2 border-black bg-gray-100">
          <Image
            src={project.cover}
            alt={`Aperçu du site ${project.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
            className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />

          {/* Catégorie */}
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full border-2 border-black bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider">
            {project.kind === 'client' ? 'Projet client' : 'Mon produit'}
          </span>

          {/* Invitation à survoler — masquée dès que la loupe s'ouvre */}
          <span className="absolute bottom-3 right-3 z-10 hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 border-black bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider transition-opacity duration-200 group-hover:opacity-0">
            <ScanSearch className="w-3.5 h-3.5 text-blue-600 hint-pulse" strokeWidth={2.5} />
            Parcourir
          </span>
        </div>

        {/* Contenu */}
        <div className={`flex flex-col flex-grow ${compact ? 'p-5' : 'p-6'}`}>
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className={`font-bold leading-tight ${compact ? 'text-xl' : 'text-2xl'}`}>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-blue-600 transition-colors"
                >
                  {project.name}
                </a>
              ) : (
                project.name
              )}
            </h3>
            <span className="shrink-0 flex items-center gap-1.5 text-gray-400">
              {project.platforms.includes('web') && <Globe className="w-4 h-4 text-blue-600" strokeWidth={2} />}
              {hasMobile && <Smartphone className="w-4 h-4 text-purple-600" strokeWidth={2} />}
            </span>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
            {project.sector} · {project.year}
          </p>

          <p className={`text-gray-600 leading-relaxed mb-4 ${compact ? 'text-sm' : 'text-base'}`}>
            {compact ? project.tagline : project.description}
          </p>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.slice(0, compact ? 3 : 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full border border-gray-300 bg-gray-50 text-[11px] font-medium text-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Boutiques d'applications */}
          {project.stores && <StoreBadges stores={project.stores} compact className="mb-4" />}

          {/* Lien vers le site */}
          <div className="mt-auto pt-1">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-sm font-semibold border-b-2 border-black pb-0.5 hover:gap-3 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
              >
                Voir le site en ligne
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </a>
            ) : (
              <span className="text-sm font-medium text-gray-400">Projet privé</span>
            )}
          </div>
        </div>
      </article>

      <SitePeek
        src={project.preview}
        url={project.url}
        active={peeking}
        accent={project.colors.from}
      />
    </>
  );
}
