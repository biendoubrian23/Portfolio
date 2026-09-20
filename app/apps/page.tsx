import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AppShowcase from '@/components/AppShowcase';
import { productProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Mes applications : produits mobiles et web',
  description:
    "Les applications que Brian Biendou conçoit, développe et exploite : CosmeCheck (analyse de cosmétiques), RevealChat (analyse de conversations), Pixia One (marques et créateurs), Memory Pilot (mémoire externe) et Test Civique France. iOS, Android et web.",
  alternates: { canonical: '/apps' },
  openGraph: {
    title: 'Mes applications | Brian Biendou',
    description:
      'Cinq produits que je développe et exploite moi-même, sur iOS, Android et le web.',
    url: '/apps',
    type: 'website',
  },
};

export default function AppsPage() {
  const storeCount = productProjects.filter(
    (p) => p.stores?.ios?.url || p.stores?.android?.url
  ).length;

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
            ✦ MES PRODUITS
          </span>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Les applications que je conçois,
            <br className="hidden sm:block" /> développe et exploite.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            Pas des démos : {productProjects.length} produits complets (application mobile, site,
            back-office, paiements et suivi), dont {storeCount} déjà disponibles sur les
            boutiques.
          </p>
        </div>
      </section>

      {/* Produits */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="space-y-24 py-20">
          {productProjects.map((project, index) => (
            <AppShowcase key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Appel à l'action */}
        <div className="rounded-3xl border-2 border-black bg-meelo-purple p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:p-12">
          <h2 className="mb-3 text-2xl font-bold lg:text-3xl">
            Vous voulez la même chose pour votre idée ?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-700">
            Je conduis un produit de bout en bout : conception, développement iOS et Android,
            back-office, paiements, publication sur les stores et suivi après lancement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-black px-7 py-3.5 font-semibold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]"
            >
              Me contacter
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </Link>
            <Link
              href="/projets#clients"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-white px-7 py-3.5 font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:bg-black hover:text-white"
            >
              Voir mes réalisations clients
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
