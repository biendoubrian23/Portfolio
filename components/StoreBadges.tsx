import type { Project } from '@/lib/projects';
import { AppleGlyph, PlayGlyph } from './PlatformGlyphs';

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
      <span className={soon ? 'text-gray-500' : ''}>{glyph}</span>
      <span className="flex flex-col items-start leading-none text-left">
        <span className={`text-[9px] tracking-wide uppercase ${soon ? 'text-gray-600' : 'text-gray-300'}`}>
          {soon ? 'Bientôt sur' : label}
        </span>
        <span className={`font-semibold ${compact ? 'text-xs' : 'text-sm'} ${soon ? 'text-gray-700' : 'text-white'}`}>
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
        title={`${store} : publication en cours de validation`}
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
          glyph={<AppleGlyph className="w-5 h-5" />}
          compact={compact}
        />
      )}
      {stores.android && (
        <Badge
          href={stores.android.url}
          soon={stores.android.soon}
          label="Disponible sur"
          store="Google Play"
          glyph={<PlayGlyph className="w-5 h-5" />}
          compact={compact}
        />
      )}
    </div>
  );
}
