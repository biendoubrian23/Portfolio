'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getPointer } from '@/lib/pointer';

// Panneau volontairement large : l'apercu doit se lire, pas se deviner.
const WIDTH = 820;
const HEIGHT = 580;
const CHROME_HEIGHT = 38;
const VIEW_HEIGHT = HEIGHT - CHROME_HEIGHT;

type Props = {
  /** Capture pleine page du site, défilée automatiquement. */
  src: string;
  /** Dimensions réelles de la capture, déclarées pour éviter tout décalage. */
  size: { width: number; height: number };
  /** URL affichée dans la barre du navigateur factice. */
  url?: string | null;
  active: boolean;
  /** Accent de la marque du projet, utilisé pour la lueur du panneau. */
  accent?: string;
};

/**
 * Hublot qui suit le curseur et fait défiler la capture pleine page du site,
 * comme si on le parcourait. Rendu dans un portail : les cartes projet portent
 * une transformation 3D, qui piégerait un élément `fixed`.
 */
/** Vitesse de lecture, en pixels par seconde : la meme pour tous les sites. */
const SCROLL_SPEED = 130;

export default function SitePeek({ src, size, url, active, accent = '#3B82F6' }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(30);
  const followerRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const placed = useRef(false);

  /** La duree depend de la longueur reelle du site, pour une vitesse constante. */
  const measure = (img: HTMLImageElement) => {
    if (!img.naturalWidth) return;
    const rendered = (WIDTH * img.naturalHeight) / img.naturalWidth;
    setDuration(Math.round(rendered / SCROLL_SPEED));
    setLoaded(true);
  };

  useEffect(() => {
    if (!active) {
      placed.current = false;
      return;
    }

    const place = (clientX: number, clientY: number) => {
      const pad = 20;
      let x = clientX + 36;
      if (x + WIDTH + pad > window.innerWidth) x = clientX - WIDTH - 36;
      x = Math.max(pad, Math.min(x, window.innerWidth - WIDTH - pad));

      const y = Math.max(
        pad,
        Math.min(clientY - HEIGHT / 2, window.innerHeight - HEIGHT - pad)
      );

      target.current = { x, y };
      if (!placed.current) {
        current.current = { x, y };
        placed.current = true;
        if (followerRef.current) {
          followerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      }
    };

    // La souris peut être immobile à l'ouverture : on part de sa dernière position connue
    const start = getPointer();
    place(start.x, start.y);

    const onMove = (e: MouseEvent) => place(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.16;
      current.current.y += (target.current.y - current.current.y) * 0.16;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${Math.round(current.current.x)}px, ${Math.round(current.current.y)}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [active]);

  // `active` ne passe à vrai que sur un survol : on est forcément côté client ici.
  if (!active) return null;

  const host = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'aperçu du site';

  return createPortal(
    <div
      ref={followerRef}
      className="fixed top-0 left-0 z-[90] pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      <div
        className="peek-panel rounded-2xl border-2 border-black bg-white overflow-hidden"
        style={{
          width: WIDTH,
          height: HEIGHT,
          boxShadow: `12px 12px 0px 0px rgba(0,0,0,1), 0 30px 80px -14px ${accent}77`,
        }}
      >
        {/* Barre de navigateur factice */}
        <div
          className="flex items-center gap-2 px-3 border-b-2 border-black bg-[#f4f4f5]"
          style={{ height: CHROME_HEIGHT }}
        >
          <span className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/20" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] border border-black/20" />
          </span>
          <span className="flex-1 truncate text-xs font-mono text-gray-500 bg-white rounded px-2.5 py-1 border border-gray-200">
            {host}
          </span>
        </div>

        {/* Capture pleine page, en défilement sans fin */}
        <div className="relative overflow-hidden bg-white" style={{ height: VIEW_HEIGHT }}>
          <div
            className={loaded ? 'peek-scroller' : undefined}
            style={{ '--peek-duration': `${duration}s` } as React.CSSProperties}
          >
            {/* Deux exemplaires : quand le premier sort par le haut, le second
                prend exactement sa place et la boucle repart sans couture. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              width={size.width}
              height={size.height}
              // Une capture deja en cache est complete avant meme l'evenement de chargement
              ref={(el) => {
                if (el?.complete) measure(el);
              }}
              onLoad={(e) => measure(e.currentTarget)}
              className="block h-auto w-full"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              aria-hidden="true"
              width={size.width}
              height={size.height}
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
