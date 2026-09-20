import type { Metadata } from 'next';
import ProjectsExplorer from '@/components/ProjectsExplorer';
import { clientProjects, productProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Mes projets : réalisations clients et produits',
  description:
    "Tous les projets de Brian Biendou : sites web et plateformes livrés à des clients (négoce international, géothermie, conseil, mode, association) et applications mobiles iOS et Android que j'édite : CosmeCheck, RevealChat, Pixia One, Memory Pilot, Test Civique France.",
  alternates: { canonical: '/projets' },
  openGraph: {
    title: 'Mes projets | Brian Biendou',
    description:
      'Réalisations clients et produits mobiles en production : 10 projets, tous accessibles en ligne.',
    url: '/projets',
    type: 'website',
  },
};

export default function ProjetsPage() {
  const total = clientProjects.length + productProjects.length;

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-24">
      {/* En-tête de page */}
      <section className="relative -mt-24 overflow-hidden border-b-2 border-black bg-white pb-14 pt-32">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <span className="mb-5 inline-block rounded-full border-2 border-black bg-white px-3 py-1.5 text-xs font-bold">
            ✦ {total} PROJETS EN LIGNE
          </span>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Mes projets, du premier commit
            <br className="hidden sm:block" /> à la mise en production.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            D&apos;un côté les sites que je livre à mes clients, de l&apos;autre les applications
            que j&apos;édite moi-même. Tout ce qui est listé ici tourne réellement : survolez une
            carte pour parcourir le site sans quitter la page.
          </p>
        </div>
      </section>

      <div className="pt-10">
        <ProjectsExplorer />
      </div>
    </main>
  );
}
