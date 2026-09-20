'use client';

import { useEffect, useRef } from 'react';

/**
 * Fait apparaître son contenu quand il entre dans l'écran.
 *
 * La classe est ajoutée sur le nœud dans un effet plutôt que via un état :
 * le rendu serveur et le premier rendu client restent identiques, ce qui
 * évite tout écart d'hydratation.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — la ref est correcte pour chacune des balises autorisées
      ref={ref}
      className={`pre-reveal ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
