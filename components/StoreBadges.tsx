import type { Project } from '@/lib/projects';

const AppleGlyph = () => (
  <svg viewBox="0 0 384 512" className="w-5 h-5 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const PlayGlyph = () => (
  <svg viewBox="0 0 512 512" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path fill="#34A853" d="M48 48c-8 5-13 14-13 27v362c0 13 5 22 13 27l205-208z" />
    <path fill="#FBBC04" d="M336 294l-66-67 66-67 90 50c17 10 17 34 0 44z" />
    <path fill="#EA4335" d="M48 48c6-4 15-4 25 2l263 146-66 65z" />
    <path fill="#4285F4" d="M48 464c6 4 15 4 25-2l263-146-66-65z" />
  </svg>
);

type BadgeProps = {
  href: string | null;
  soon?: boolean;
  label: string;
  store: string;
  glyph: React.ReactNode;
  compact?: boolean;
};

function Badge({ href, soon, label, store, glyph, compact }: BadgeProps) {
  const inner = (
    <>
      <span className={soon ? 'text-gray-400' : ''}>{glyph}</span>
      <span className="flex flex-col items-start leading-none text-left">
        <span className={`text-[9px] tracking-wide uppercase ${soon ? 'text-gray-400' : 'text-gray-300'}`}>
          {soon ? 'Bientôt sur' : label}
        </span>
        <span className={`font-semibold ${compact ? 'text-xs' : 'text-sm'} ${soon ? 'text-gray-500' : 'text-white'}`}>
          {store}
        </span>
      </span>
    </>
  );

  const base = `inline-flex items-center gap-2 rounded-xl border-2 px-3 ${compact ? 'py-1.5' : 'py-2'}`;

  if (soon || !href) {
    return (
      <span
        className={`${base} border-dashed border-gray-300 bg-gray-50 cursor-default select-none`}
        title={`${store} — publication en cours de validation`}
      >
        {inner}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`${base} border-black bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-200`}
    >
      {inner}
    </a>
  );
}

export default function StoreBadges({
  stores,
  compact = false,
  className = '',
}: {
  stores: Project['stores'];
  compact?: boolean;
  className?: string;
}) {
  if (!stores?.ios && !stores?.android) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {stores.ios && (
        <Badge
          href={stores.ios.url}
          soon={stores.ios.soon}
          label="Télécharger sur"
          store="App Store"
          glyph={<AppleGlyph />}
          compact={compact}
        />
      )}
      {stores.android && (
        <Badge
          href={stores.android.url}
          soon={stores.android.soon}
          label="Disponible sur"
          store="Google Play"
          glyph={<PlayGlyph />}
          compact={compact}
        />
      )}
    </div>
  );
}
