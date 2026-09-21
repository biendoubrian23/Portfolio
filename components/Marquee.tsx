'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Nombre d'exemplaires de la liste : assez pour ne jamais laisser de vide à l'écran. */
  repeats: number;
  /** Vitesse du défilement automatique, en pixels par seconde. */
  speed: number;
  direction?: 'left' | 'right';
  className?: string;
};

/** Seuil de mouvement avant de décider si le geste est un glissement ou un défilement de page. */
const DRAG_THRESHOLD = 6;
/** Amortissement de l'élan après un lâcher, par tranche de 16 ms. */
const FRICTION = 0.95;
/** Durée de la reprise progressive du défilement automatique après un geste. */
const RESUME_MS = 900;

/**
 * Rangée qui défile sans fin, et qu'on peut aussi faire glisser à la main.
 *
 * - au doigt : on glisse à gauche ou à droite, avec de l'élan au lâcher ;
 *   un geste vertical laisse la page défiler normalement ;
 * - à la souris : on attrape la rangée et on la tire ; le glissement à deux
 *   doigts d'un pavé tactile marche aussi ;
 * - un simple clic reste un clic, un glissement ne déclenche jamais de lien ;
 * - la file est infinie dans les deux sens : la position est ramenée dans
 *   l'intervalle d'un exemplaire, où tous se ressemblent au pixel près.
 */
export default function Marquee({
  children,
  repeats,
  speed,
  direction = 'left',
  className = '',
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const sens = direction === 'left' ? -1 : 1;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const firstCopy = track.firstElementChild as HTMLElement | null;

    let copyWidth = firstCopy?.offsetWidth ?? 0;
    let offset = 0;
    let velocity = 0; // px par ms, l'élan laissé par un lâcher
    let autoFactor = 1; // 0 juste après un geste, remonte vers 1
    let hovering = false;
    let dragging = false;
    let rafId = 0;
    let last = 0;

    // Suivi du geste en cours
    let pointerId: number | null = null;
    let decided = false;
    let startX = 0;
    let startY = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastT = 0;
    let movedByDrag = false;

    /** Ramène la position dans l'intervalle ]-exemplaire ; 0]. */
    const wrap = (x: number) => {
      if (!copyWidth) return x;
      let r = x % copyWidth;
      if (r > 0) r -= copyWidth;
      return r;
    };

    const paint = () => {
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;

      // Les captures d'écran figent la file pour que les tranches se raccordent
      if (!document.documentElement.hasAttribute('data-freeze-marquee') && !dragging) {
        if (Math.abs(velocity) > 0.005) {
          offset += velocity * dt;
          velocity *= Math.pow(FRICTION, dt / 16);
        } else {
          velocity = 0;
          autoFactor = Math.min(1, autoFactor + dt / RESUME_MS);
          if (!hovering && !reducedMotion) {
            offset += (sens * speed * autoFactor * dt) / 1000;
          }
        }
        offset = wrap(offset);
        paint();
      }
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafId) return;
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    // ── Glissement au doigt ou à la souris ───────────────────────────────
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pointerId = e.pointerId;
      decided = false;
      movedByDrag = false;
      startX = lastX = e.clientX;
      startY = e.clientY;
      startOffset = offset;
      lastT = performance.now();
      velocity = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!decided) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        decided = true;
        if (Math.abs(dx) <= Math.abs(dy)) {
          // Geste vertical : c'est la page qui défile, on s'efface
          pointerId = null;
          return;
        }
        dragging = true;
        movedByDrag = true;
        viewport.setPointerCapture(e.pointerId);
        viewport.classList.add('is-dragging');
      }
      if (!dragging) return;

      const now = performance.now();
      const elapsed = Math.max(1, now - lastT);
      velocity = 0.8 * ((e.clientX - lastX) / elapsed) + 0.2 * velocity;
      lastX = e.clientX;
      lastT = now;

      offset = wrap(startOffset + dx);
      paint();
    };

    const endGesture = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      if (!dragging) return;
      dragging = false;
      autoFactor = 0;
      viewport.classList.remove('is-dragging');
      // Un doigt resté immobile avant le lâcher ne laisse pas d'élan
      if (performance.now() - lastT > 90) velocity = 0;
    };

    // Un glissement ne doit jamais se terminer en clic sur une carte
    const onClickCapture = (e: MouseEvent) => {
      if (!movedByDrag) return;
      e.preventDefault();
      e.stopPropagation();
      movedByDrag = false;
    };

    // Glissement horizontal d'un pavé tactile ; la molette verticale reste à la page
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      velocity = 0;
      autoFactor = 0;
      offset = wrap(offset - e.deltaX);
      paint();
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hovering = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hovering = false;
    };
    const noNativeDrag = (e: DragEvent) => e.preventDefault();

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', endGesture);
    viewport.addEventListener('pointercancel', endGesture);
    viewport.addEventListener('pointerenter', onEnter);
    viewport.addEventListener('pointerleave', onLeave);
    viewport.addEventListener('click', onClickCapture, true);
    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('dragstart', noNativeDrag);

    // La largeur d'un exemplaire change avec la police ou la taille de l'écran
    const resizeObserver = new ResizeObserver(() => {
      copyWidth = firstCopy?.offsetWidth ?? copyWidth;
      offset = wrap(offset);
      paint();
    });
    if (firstCopy) resizeObserver.observe(firstCopy);

    // Hors écran, la rangée ne consomme rien
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibility.observe(viewport);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', endGesture);
      viewport.removeEventListener('pointercancel', endGesture);
      viewport.removeEventListener('pointerenter', onEnter);
      viewport.removeEventListener('pointerleave', onLeave);
      viewport.removeEventListener('click', onClickCapture, true);
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('dragstart', noNativeDrag);
    };
  }, [direction, speed, repeats]);

  return (
    <div ref={viewportRef} className={`marquee-viewport overflow-hidden ${className}`}>
      <div ref={trackRef} className="marquee-track">
        {Array.from({ length: repeats }, (_, i) => (
          <div key={i} className="flex shrink-0 items-stretch">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
