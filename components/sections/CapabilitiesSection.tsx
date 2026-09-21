'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import Marquee from '@/components/Marquee';
import { getPointer } from '@/lib/pointer';
import { AndroidGlyph, AppleGlyph } from '@/components/PlatformGlyphs';
import {
  BarChart3,
  Bell,
  Bot,
  Brain,
  CreditCard,
  Database,
  Gauge,
  Globe2,
  LayoutDashboard,
  Languages,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';

type Capability = {
  icon: LucideIcon;
  /** Couleur de l'icône — l'icône est colorée, jamais posée sur un bloc de couleur. */
  tint: string;
  title: string;
  /** Preuve concrète, tirée d'un projet réellement livré. */
  proof: string;
  image: string;
  project: string;
};

const capabilities: Capability[] = [
  {
    icon: Smartphone,
    tint: 'text-violet-600',
    title: 'Applications mobiles',
    proof: 'Quatre apps iOS et Android en Expo, du build à la fiche de store.',
    image: '/projects/cosmecheck-cover.webp',
    project: 'CosmeCheck',
  },
  {
    icon: Globe2,
    tint: 'text-blue-600',
    title: 'Sites & plateformes web',
    proof: 'Dix sites Next.js en production, du corporate à la marketplace.',
    image: '/projects/alpha-ies-cover.webp',
    project: 'Alpha IES Ltd',
  },
  {
    icon: LayoutDashboard,
    tint: 'text-emerald-600',
    title: 'Back-offices sur mesure',
    proof: 'Le client édite tout son contenu seul, sans jamais me rappeler.',
    image: '/projects/lumiere-du-monde-cover.webp',
    project: 'Lumière du Monde',
  },
  {
    icon: CreditCard,
    tint: 'text-amber-500',
    title: 'Paiements & abonnements',
    proof: 'Stripe, RevenueCat et Mobile Money, webhooks signés et testés.',
    image: '/projects/pixia-one-cover.webp',
    project: 'Pixia One',
  },
  {
    icon: Brain,
    tint: 'text-fuchsia-600',
    title: 'IA appliquée au produit',
    proof: 'OCR, classification par LLM et conseiller conversationnel embarqué.',
    image: '/projects/cosmecheck-cover.webp',
    project: 'CosmeCheck',
  },
  {
    icon: Database,
    tint: 'text-cyan-600',
    title: 'Données & scraping',
    proof: 'Pipelines Python qui construisent un référentiel de milliers de fiches.',
    image: '/projects/test-civique-france-cover.webp',
    project: 'Test Civique France',
  },
  {
    icon: Gauge,
    tint: 'text-rose-500',
    title: 'SEO technique & performance',
    proof: 'JSON-LD, sitemaps générés, images pré-optimisées, Core Web Vitals au vert.',
    image: '/projects/energie-stat-cover.webp',
    project: 'Energie-Stat',
  },
  {
    icon: Languages,
    tint: 'text-indigo-600',
    title: 'Sites multilingues',
    proof: 'Trois langues, hreflang et sitemap multilingue, zéro texte codé en dur.',
    image: '/projects/alpha-ies-cover.webp',
    project: 'Alpha IES Ltd',
  },
  {
    icon: Bot,
    tint: 'text-teal-600',
    title: 'CMS & autonomie client',
    proof: 'Sanity, contenus bilingues et chatbot, pilotés par le client lui-même.',
    image: '/projects/matricx-consulting-cover.webp',
    project: 'MatriCx Consulting',
  },
  {
    icon: ShoppingBag,
    tint: 'text-orange-500',
    title: 'Catalogues & conversion',
    proof: 'Catalogue en base, fiches générées, commande convertie sur WhatsApp.',
    image: '/projects/pristyle-cover.webp',
    project: 'Pristyle Design',
  },
  {
    icon: BarChart3,
    tint: 'text-sky-600',
    title: 'Analyse & visualisation',
    proof: 'Des données brutes transformées en verdicts lisibles et partageables.',
    image: '/projects/revealchat-cover.webp',
    project: 'RevealChat',
  },
  {
    icon: Bell,
    tint: 'text-purple-600',
    title: 'Natif avancé',
    proof: 'Widgets Android, partage entrant, base locale chiffrée, rappels programmés.',
    image: '/projects/memory-pilot-cover.webp',
    project: 'Memory Pilot',
  },
];

/** Nombre d'exemplaires de la liste dans la piste : il en reste toujours
 *  assez hors écran pour qu'aucun vide n'apparaisse, même sur un très grand
 *  moniteur, et même quand on tire la rangée à la main. */
const REPEATS = 4;

const stats: Array<{ value: string; label: string; platforms?: boolean }> = [
  { value: '10', label: 'projets en production' },
  { value: '4', label: 'apps mobiles développées', platforms: true },
  { value: '5', label: 'clients accompagnés' },
];

/** Les deux plateformes, en pastilles qui se chevauchent légèrement. */
function PlatformDots() {
  return (
    <span className="flex items-center" role="img" aria-label="iOS et Android">
      <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black bg-white">
        <AppleGlyph className="h-3.5 w-3.5 text-black" />
      </span>
      <span className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-black bg-white">
        <AndroidGlyph className="h-4 w-4 text-[#3DDC84]" />
      </span>
    </span>
  );
}

/* ── Vignette d'aperçu qui suit le curseur ─────────────────────────────── */

const PEEK_W = 320;
const PEEK_H = 250;

function CapabilityPeek({ capability }: { capability: Capability | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const placed = useRef(false);

  useEffect(() => {
    if (!capability) {
      placed.current = false;
      return;
    }

    const place = (clientX: number, clientY: number) => {
      const pad = 16;
      let x = clientX + 26;
      if (x + PEEK_W + pad > window.innerWidth) x = clientX - PEEK_W - 26;
      x = Math.max(pad, x);
      const y = Math.max(
        pad,
        Math.min(clientY - PEEK_H - 24, window.innerHeight - PEEK_H - pad)
      );
      target.current = { x, y };
      if (!placed.current) {
        current.current = { x, y };
        placed.current = true;
        if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    // La souris peut être immobile à l'ouverture : on part de sa dernière position connue
    const start = getPointer();
    place(start.x, start.y);

    const onMove = (e: MouseEvent) => place(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMove, { passive: true });
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.2;
      current.current.y += (target.current.y - current.current.y) * 0.2;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${Math.round(current.current.x)}px, ${Math.round(current.current.y)}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [capability]);

  // `capability` n'est renseigné que sur un survol : on est forcément côté client ici.
  if (!capability) return null;

  return createPortal(
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[90] pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      <div
        className="peek-panel rounded-2xl border-2 border-black bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        style={{ width: PEEK_W }}
      >
        <div className="relative h-[168px] border-b-2 border-black bg-gray-100">
          <Image
            src={capability.image}
            alt=""
            fill
            sizes="320px"
            className="object-cover object-top"
          />
        </div>
        <div className="px-3.5 py-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Vu sur · {capability.project}
          </p>
          <p className="text-sm font-semibold leading-snug mt-0.5">{capability.proof}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Carte d'une capacité ──────────────────────────────────────────────── */

function CapabilityCard({
  capability,
  onHover,
}: {
  capability: Capability;
  onHover: (c: Capability | null) => void;
}) {
  const Icon = capability.icon;

  return (
    <div
      onMouseEnter={() => onHover(capability)}
      onMouseLeave={() => onHover(null)}
      className="group/cap mx-3 w-[290px] shrink-0 select-none rounded-2xl border-2 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)]"
    >
      <Icon
        className={`w-7 h-7 ${capability.tint} mb-3 transition-transform duration-300 group-hover/cap:scale-110 group-hover/cap:-rotate-6`}
        strokeWidth={1.8}
      />
      <h3 className="text-base font-bold leading-snug mb-1.5 transition-colors duration-300 group-hover/cap:text-blue-600">
        {capability.title}
      </h3>
      <p className="text-[13px] leading-relaxed text-gray-500">{capability.proof}</p>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────────────────── */

export default function CapabilitiesSection() {
  const [hovered, setHovered] = useState<Capability | null>(null);

  const rowOne = capabilities.slice(0, 6);
  const rowTwo = capabilities.slice(6);

  return (
    <section
      id="apropos"
      className="defer-render relative overflow-hidden border-t-2 border-black bg-white py-20 lg:py-24"
    >
      {/* Trame de fond discrète */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full border-2 border-black px-3 py-1.5 text-xs font-bold">
              ✦ SAVOIR-FAIRE
            </span>
            <h2 className="mb-4 text-4xl font-bold uppercase leading-[1.05] lg:text-5xl">
              Ce que je construis,
              <br />
              <span className="relative inline-block">
                vraiment.
                <svg
                  className="absolute -bottom-1 left-0 w-full text-blue-600"
                  height="8"
                  viewBox="0 0 300 8"
                  fill="none"
                >
                  <path
                    d="M2 6C100 2 200 2 298 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Pas une liste de services génériques : chaque ligne ci-dessous correspond à quelque
              chose que j&apos;ai livré, mis en production et qui tourne aujourd&apos;hui.
              Survolez une carte pour voir où.
            </p>
          </Reveal>

          <Reveal className="flex shrink-0 gap-8" delay={160}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center gap-2.5">
                  <p className="text-4xl font-bold leading-none lg:text-5xl">{stat.value}</p>
                  {stat.platforms && <PlatformDots />}
                </div>
                <p className="mt-1.5 max-w-[110px] text-[11px] font-semibold uppercase leading-tight tracking-wider text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Carousel infini — deux rangées en sens opposés */}
      <Reveal className="relative mt-14 flex flex-col gap-5" delay={260}>
        <Marquee repeats={REPEATS} speed={36}>
          {rowOne.map((capability) => (
            <CapabilityCard key={capability.title} capability={capability} onHover={setHovered} />
          ))}
        </Marquee>

        <Marquee repeats={REPEATS} speed={32} direction="right">
          {rowTwo.map((capability) => (
            <CapabilityCard key={capability.title} capability={capability} onHover={setHovered} />
          ))}
        </Marquee>
      </Reveal>

      <CapabilityPeek capability={hovered} />
    </section>
  );
}
