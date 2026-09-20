import type { ReactNode } from 'react';
import Reveal from '@/components/Reveal';
import {
  AirflowLogo,
  AwsLogo,
  AzureLogo,
  BashLogo,
  DockerLogo,
  ExpoLogo,
  FastAPILogo,
  FramerMotionLogo,
  GitLogo,
  HtmlCssLogo,
  JavaScriptLogo,
  LangChainLogo,
  MobileMoneyLogo,
  NextJSLogo,
  NodeLogo,
  OcrLogo,
  PandasLogo,
  PlaywrightLogo,
  PostHogLogo,
  PostgresLogo,
  PowerBILogo,
  PyTorchLogo,
  PythonLogo,
  ReactLogo,
  RevenueCatLogo,
  SQLLogo,
  SanityLogo,
  ScikitLearnLogo,
  SentryLogo,
  StripeLogo,
  SupabaseLogo,
  TailwindLogo,
  TensorFlowLogo,
  TypeScriptLogo,
  VercelLogo,
  ViteLogo,
} from '@/components/TechLogos';

type Tool = {
  name: string;
  logo: ReactNode;
  /** Où cet outil sert réellement — vérifiable dans les projets listés sur ce site. */
  usage: string;
};

type Category = {
  title: string;
  /** Couleur d'accent de la catégorie : filet supérieur et pastille du titre. */
  accent: string;
  dot: string;
  intro: string;
  tools: Tool[];
};

const categories: Category[] = [
  {
    title: 'Langages',
    accent: 'from-violet-500 to-indigo-600',
    dot: 'bg-violet-500',
    intro: 'Le socle, du script de données à l’application.',
    tools: [
      { name: 'Python', logo: <PythonLogo />, usage: 'Pipelines ETL, scraping, modèles' },
      { name: 'TypeScript', logo: <TypeScriptLogo />, usage: 'Tous les projets web et mobiles' },
      { name: 'JavaScript', logo: <JavaScriptLogo />, usage: 'Scripts, fonctions serverless' },
      { name: 'SQL', logo: <SQLLogo />, usage: 'Requêtes, vues, migrations' },
      { name: 'HTML & CSS', logo: <HtmlCssLogo />, usage: 'Intégration au pixel près' },
      { name: 'Bash', logo: <BashLogo />, usage: 'Scripts de build et de livraison' },
    ],
  },
  {
    title: 'Web & mobile',
    accent: 'from-sky-500 to-blue-600',
    dot: 'bg-sky-500',
    intro: 'Ce que vos utilisateurs voient et touchent.',
    tools: [
      { name: 'Next.js', logo: <NextJSLogo />, usage: '10 sites en production' },
      { name: 'React', logo: <ReactLogo />, usage: 'Interfaces et back-offices' },
      { name: 'React Native / Expo', logo: <ExpoLogo />, usage: '4 applications iOS et Android' },
      { name: 'Tailwind CSS', logo: <TailwindLogo />, usage: 'Design systems sur mesure' },
      { name: 'Vite', logo: <ViteLogo />, usage: 'MatriCx Consulting' },
      { name: 'Framer Motion', logo: <FramerMotionLogo />, usage: 'Animations et transitions' },
    ],
  },
  {
    title: 'Back-end & données',
    accent: 'from-emerald-500 to-teal-600',
    dot: 'bg-emerald-500',
    intro: 'Ce qui tient la charge et garde les données.',
    tools: [
      { name: 'Supabase', logo: <SupabaseLogo />, usage: 'Auth, RLS, Edge Functions' },
      { name: 'PostgreSQL', logo: <PostgresLogo />, usage: 'Schémas, RPC, migrations' },
      { name: 'Node.js', logo: <NodeLogo />, usage: 'API et fonctions serverless' },
      { name: 'FastAPI', logo: <FastAPILogo />, usage: 'Services Python' },
      { name: 'Airflow', logo: <AirflowLogo />, usage: 'Orchestration ETL chez Airbus' },
      { name: 'Sanity', logo: <SanityLogo />, usage: 'CMS piloté par le client' },
    ],
  },
  {
    title: 'IA & data science',
    accent: 'from-fuchsia-500 to-pink-600',
    dot: 'bg-fuchsia-500',
    intro: 'De la donnée brute au verdict lisible.',
    tools: [
      { name: 'LangChain / RAG', logo: <LangChainLogo />, usage: 'Chatbot sur 8 sites clients' },
      { name: 'OCR & ML Kit', logo: <OcrLogo />, usage: 'Lecture de listes INCI, photos' },
      { name: 'Pandas', logo: <PandasLogo />, usage: 'Nettoyage et analyse' },
      { name: 'Scikit-learn', logo: <ScikitLearnLogo />, usage: 'Modèles de classification' },
      { name: 'TensorFlow', logo: <TensorFlowLogo />, usage: 'Réseaux de neurones' },
      { name: 'PyTorch', logo: <PyTorchLogo />, usage: 'Prototypage de modèles' },
    ],
  },
  {
    title: 'Mise en production',
    accent: 'from-amber-500 to-orange-600',
    dot: 'bg-amber-500',
    intro: 'Livrer, encaisser, surveiller.',
    tools: [
      { name: 'Vercel', logo: <VercelLogo />, usage: 'Hébergement de 8 sites' },
      { name: 'Docker', logo: <DockerLogo />, usage: 'Environnements reproductibles' },
      { name: 'AWS', logo: <AwsLogo />, usage: 'S3, RDS, flux IoT temps réel' },
      { name: 'Azure', logo: <AzureLogo />, usage: 'Cloud en environnement industriel' },
      { name: 'Git & CI/CD', logo: <GitLogo />, usage: 'Versionnage et livraison automatisée' },
      { name: 'Playwright', logo: <PlaywrightLogo />, usage: 'Tests bout-en-bout' },
    ],
  },
  {
    title: 'Paiement & pilotage',
    accent: 'from-rose-500 to-red-600',
    dot: 'bg-rose-500',
    intro: 'Ce qui fait qu’un produit gagne de l’argent.',
    tools: [
      { name: 'Stripe', logo: <StripeLogo />, usage: 'Abonnements, webhooks signés' },
      { name: 'RevenueCat', logo: <RevenueCatLogo />, usage: 'Achats in-app iOS et Android' },
      { name: 'Mobile Money', logo: <MobileMoneyLogo />, usage: 'Paiements et retraits en Afrique' },
      { name: 'Sentry', logo: <SentryLogo />, usage: 'Erreurs remontées en temps réel' },
      { name: 'PostHog', logo: <PostHogLogo />, usage: 'Parcours et conversion' },
      { name: 'Power BI & Grafana', logo: <PowerBILogo />, usage: 'Tableaux de bord et supervision' },
    ],
  },
];

const totalTools = categories.reduce((n, c) => n + c.tools.length, 0);

export default function TechStackSection() {
  return (
    <section id="techstack" className="defer-render relative overflow-hidden border-t-2 border-black bg-white py-24">
      {/* Trame de fond discrète, comme sur la section savoir-faire */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* En-tête */}
        <Reveal className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full border-2 border-black px-3 py-1.5 text-xs font-bold">
            ✦ MA STACK TECHNIQUE
          </span>

          <h2 className="mb-4 text-4xl font-bold leading-[1.1] lg:text-5xl">
            {totalTools} outils, et une raison
            <br />
            d&apos;avoir choisi chacun.
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            Je ne collectionne pas les logos : sous chaque nom, ce qu&apos;il fait réellement dans
            les projets présentés sur ce site.
          </p>
        </Reveal>

        {/* Catégories */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.title} delay={index * 90} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                {/* Filet coloré de la catégorie */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${category.accent}`} />

                <div className="flex flex-col p-6">
                  <h3 className="mb-1 flex items-center gap-2.5 text-lg font-bold">
                    <span className={`h-2.5 w-2.5 rounded-full ${category.dot}`} />
                    {category.title}
                  </h3>
                  <p className="mb-5 text-sm text-gray-500">{category.intro}</p>

                  <ul className="space-y-3.5">
                    {category.tools.map((tool) => (
                      <li key={tool.name} className="flex items-start gap-3">
                        <span className="mt-0.5 transition-transform duration-300 group-hover:scale-110">
                          {tool.logo}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[15px] font-semibold leading-tight">
                            {tool.name}
                          </span>
                          <span className="block text-[13px] leading-snug text-gray-500">
                            {tool.usage}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
