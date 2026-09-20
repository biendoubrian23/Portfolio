'use client';

import { ArrowUpRight, Check, MousePointerClick } from 'lucide-react';
import type { Project } from '@/lib/projects';
import StoreBadges from './StoreBadges';

const FRAME_HEIGHT = 420;

export default function AppShowcase({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  const host = project.url?.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <article
      className={`flex flex-col gap-10 lg:items-center ${
        reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      {/* Fenêtre navigateur : la capture défile au survol */}
      <div className="lg:w-[56%]">
        <div
          className="scroll-frame group relative overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
        >
          {/* Barre du navigateur */}
          <div className="flex h-9 items-center gap-2 border-b-2 border-black bg-[#f4f4f5] px-3">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full border border-black/20 bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full border border-black/20 bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full border border-black/20 bg-[#28c840]" />
            </span>
            <span className="flex-1 truncate rounded border border-gray-200 bg-white px-2 py-0.5 font-mono text-[11px] text-gray-500">
              {host ?? project.name.toLowerCase()}
            </span>
          </div>

          <div className="relative overflow-hidden bg-white" style={{ height: FRAME_HEIGHT }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.preview}
              alt={`Le site ${project.name}, parcouru de haut en bas`}
              loading="lazy"
              className="scroll-inner block h-auto w-full"
              style={
                {
                  '--peek-height': `${FRAME_HEIGHT}px`,
                  '--peek-duration': '26s',
                } as React.CSSProperties
              }
            />

            {/* Indice de survol */}
            <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border-2 border-black bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
              <MousePointerClick className="h-3.5 w-3.5 text-blue-600 hint-pulse" strokeWidth={2.5} />
              Survolez pour parcourir
            </span>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="lg:w-[44%]">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span
            className="inline-block h-3 w-12 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${project.colors.from}, ${project.colors.to})`,
            }}
          />
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            {project.sector} · {project.status}
          </span>
        </div>

        <h2 className="mb-2 text-3xl font-bold lg:text-4xl">{project.name}</h2>
        <p className="mb-4 text-lg font-medium text-gray-800">{project.tagline}</p>
        <p className="mb-6 leading-relaxed text-gray-600">{project.description}</p>

        <ul className="mb-6 space-y-2.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} />
              <span className="text-[15px] leading-relaxed text-gray-700">{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Téléchargement */}
        {project.stores && (
          <div className="mb-6">
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Télécharger l&apos;application
            </p>
            <StoreBadges stores={project.stores} />
          </div>
        )}

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-white px-6 py-3 font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]"
          >
            Visiter {host}
            <ArrowUpRight
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.5}
            />
          </a>
        )}
      </div>
    </article>
  );
}
