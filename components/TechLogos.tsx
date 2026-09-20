/**
 * Pictogrammes des technologies de la stack.
 *
 * Chacun est un SVG autonome, aux couleurs de la marque, sans bloc de fond :
 * ils se posent directement sur le papier de la carte.
 */

type P = { className?: string };
const base = 'w-5 h-5 shrink-0';

export const PythonLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 0C5.373 0 6.12 2.739 6.12 2.739L6.129 5.68h6.001v.85H4.786S0 5.956 0 12.058c0 6.102 4.179 5.883 4.179 5.883h2.49v-3.495s-.134-4.179 4.115-4.179h5.952s3.984.064 3.984-3.846V2.929S21.313 0 12 0zm-3.353 1.714a1.214 1.214 0 1 1 0 2.429 1.214 1.214 0 0 1 0-2.429z" fill="#387EB8" />
    <path d="M12 24c6.627 0 5.88-2.739 5.88-2.739l-.009-2.941h-6.001v-.85h7.344s4.786.574 4.786-5.528c0-6.102-4.179-5.883-4.179-5.883h-2.49v3.495s.134 4.179-4.115 4.179H6.264s-3.984-.064-3.984 3.846v5.492S1.687 24 12 24zm3.353-1.714a1.214 1.214 0 1 1 0-2.429 1.214 1.214 0 0 1 0 2.429z" fill="#FFC331" />
  </svg>
);

export const TypeScriptLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="3" fill="#3178C6" />
    <path d="M12.667 14.667V20h1.666v-5.333h2.334v-1.334h-6.334v1.334h2.334zM17.333 10.667c.917 0 1.667.75 1.667 1.666v4c0 .917-.75 1.667-1.667 1.667h-3.666c-.917 0-1.667-.75-1.667-1.667v-1.333h1.333v1.333c0 .184.15.334.334.334h3.666c.184 0 .334-.15.334-.334v-4c0-.184-.15-.333-.334-.333H16v-1.333h1.333z" fill="white" />
  </svg>
);

export const JavaScriptLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="2" fill="#F7DF1E" />
    <path d="M6.9 20.3c.6 1 1.5 1.8 3 1.8 1.5 0 2.4-.7 2.4-1.7 0-1.2-1-1.7-2.5-2.4l-.9-.4c-2.6-1.1-4.3-2.5-4.3-5.4 0-2.7 2.1-4.8 5.3-4.8 2.3 0 3.9.8 5.1 2.9l-2.8 1.8c-.6-1.1-1.3-1.5-2.3-1.5-1 0-1.6.6-1.6 1.5 0 1 .6 1.5 2 2.1l.9.4c3 1.3 4.8 2.6 4.8 5.6 0 3.2-2.5 5.1-5.9 5.1-3.3 0-5.5-1.6-6.5-3.7l2.3-1.3z" fill="#000" />
    <path d="M17.6 8.3h3.2v10.6c0 2.4-1.4 3.4-3.4 3.4-.6 0-1.3-.1-1.7-.2l.5-2.1c.3.1.6.1.9.1.8 0 1.2-.4 1.2-1.2V8.3z" fill="#000" />
  </svg>
);

export const SQLLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="6" rx="8" ry="3" fill="#00A4D3" />
    <path d="M4 6v12c0 1.66 3.59 3 8 3s8-1.34 8-3V6c0 1.66-3.58 3-8 3s-8-1.34-8-3z" fill="#00758F" />
    <path d="M4 11c0 1.66 3.59 3 8 3s8-1.34 8-3M4 16c0 1.66 3.59 3 8 3s8-1.34 8-3" stroke="#fff" strokeWidth="1" opacity=".6" />
  </svg>
);

export const NextJSLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#000" />
    <path d="M9 8.5v7M15.2 8.5v4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M9 8.5L16.4 17" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const ReactLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.6" stroke="#61DAFB" strokeWidth="1.3" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.6" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.6" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(120 12 12)" />
  </svg>
);

export const ExpoLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M11.4 7.2c.3-.4.9-.4 1.2 0l7.9 11.3c.4.6-.3 1.3-.9.9l-6.8-4.7c-.4-.3-1-.3-1.4 0l-6.8 4.7c-.6.4-1.3-.3-.9-.9L11.4 7.2z" fill="#000" />
    <circle cx="12" cy="4.5" r="1.6" fill="#000" />
  </svg>
);

export const TailwindLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4.9 1 2 2.1 4.3 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4C15.4 7.1 14.3 6 12 6zM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4.9 1 2 2.1 4.3 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4C10.4 13.1 9.3 12 7 12z" fill="#38BDF8" />
  </svg>
);

export const SupabaseLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M13.2 1.5c.5-.6 1.5-.2 1.5.6V10h5.6c.9 0 1.4 1 .8 1.7l-9.3 11c-.5.6-1.5.2-1.5-.6V14H4.7c-.9 0-1.4-1-.8-1.7l9.3-10.8z" fill="#3ECF8E" />
  </svg>
);

export const PostgresLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2c4.4 0 8 2.2 8 6.5 0 3.4-.8 7-2.2 9.8-.7 1.4-1.7 2.2-2.8 2.2-.8 0-1.3-.4-1.6-1.2-.3.1-.9.2-1.4.2s-1.1-.1-1.4-.2c-.3.8-.8 1.2-1.6 1.2-1.1 0-2.1-.8-2.8-2.2C4.8 15.5 4 11.9 4 8.5 4 4.2 7.6 2 12 2z" fill="#336791" />
    <path d="M9.5 9.2c0 .6-.3 1-.7 1s-.7-.4-.7-1 .3-1 .7-1 .7.4.7 1zm6.4 0c0 .6-.3 1-.7 1s-.7-.4-.7-1 .3-1 .7-1 .7.4.7 1z" fill="#fff" />
  </svg>
);

export const NodeLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 1.8l9 5.2v10L12 22.2 3 17V7l9-5.2z" fill="#539E43" />
    <path d="M12 8.2c-1.9 0-3.1.8-3.1 2.1 0 1.4 1.1 1.8 2.9 2 2.1.2 2.3.5 2.3 1 0 .8-.6 1.1-2.1 1.1-1.8 0-2.2-.4-2.4-1.3h-1.5c.2 1.8 1.3 2.6 3.9 2.6 2.5 0 3.7-1 3.7-2.6 0-1.6-1.1-2-3.3-2.3-2-.2-2-.5-2-.9 0-.5.2-.9 1.6-.9 1.3 0 1.8.3 2 1.2h1.5c-.2-1.6-1.1-2.3-3.5-2.3z" fill="#fff" />
  </svg>
);

export const FastAPILogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#009688" />
    <path d="M12.8 5l-5.3 8h3.8l-.9 6 5.3-8h-3.8l.9-6z" fill="#fff" />
  </svg>
);

export const LangChainLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M9 8.5h-1a3.5 3.5 0 1 0 0 7h1M15 8.5h1a3.5 3.5 0 1 1 0 7h-1M8.5 12h7" stroke="#1C3C3C" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const TensorFlowLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#FF6F00" />
    <path d="M12 7v10M7 9.5L12 7l5 2.5M7 14.5L12 17l5-2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const PyTorchLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2v8" stroke="#EE4C2C" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="14.6" cy="7" r="1.3" fill="#EE4C2C" />
    <path d="M12 9.5a5.2 5.2 0 1 0 0 10.4 5.2 5.2 0 0 0 0-10.4z" fill="#EE4C2C" />
    <circle cx="12" cy="14.7" r="2.4" fill="#fff" />
  </svg>
);

export const PandasLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="3" height="7" rx="1" fill="#150458" />
    <rect x="4" y="13" width="3" height="7" rx="1" fill="#150458" />
    <rect x="10.5" y="7" width="3" height="10" rx="1" fill="#E70488" />
    <rect x="17" y="4" width="3" height="7" rx="1" fill="#150458" />
    <rect x="17" y="13" width="3" height="7" rx="1" fill="#150458" />
  </svg>
);

export const ScikitLearnLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#F7931E" />
    <circle cx="12" cy="12" r="5.5" fill="#3499CD" />
    <circle cx="12" cy="12" r="2.4" fill="#F7931E" />
  </svg>
);

export const OcrLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" stroke="#0EA5E9" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 10h8M8 13.5h5" stroke="#0EA5E9" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const AirflowLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2.3" fill="#017CEE" />
    <path d="M12 9.7C12 6 14.8 3 18.5 3c0 3.7-3 6.7-6.5 6.7zM9.7 12C6 12 3 9.2 3 5.5 6.7 5.5 9.7 8.5 9.7 12zM12 14.3c0 3.7-3 6.7-6.7 6.7 0-3.7 3-6.7 6.7-6.7z" fill="#017CEE" opacity=".85" />
  </svg>
);

export const PowerBILogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="12" width="4.5" height="9" rx="1" fill="#F2C811" />
    <rect x="9.7" y="7" width="4.5" height="14" rx="1" fill="#E8A800" />
    <rect x="16.5" y="3" width="4.5" height="18" rx="1" fill="#C98F00" />
  </svg>
);

export const GrafanaLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2.5l8 4v5.8c0 4.6-3.3 8.3-8 9.2-4.7-.9-8-4.6-8-9.2V6.5l8-4z" fill="#F46800" />
    <path d="M7.5 14.5l2.8-3.3 2.2 2.2 3.8-4.6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AzureLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M10.5 3L4.5 17h5.25L14.25 3h-3.75z" fill="#0078D4" />
    <path d="M14.5 10L9 21h10.5l-5-11z" fill="#50E6FF" />
  </svg>
);

export const AwsLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M6.6 11.4c0 .4 0 .7.2 1 .1.2.2.4.2.5 0 .1-.1.2-.2.3l-.6.4h-.2c-.1 0-.2-.1-.3-.2l-.4-.5-.3-.5c-.7.8-1.5 1.2-2.5 1.2-.7 0-1.3-.2-1.7-.6-.4-.4-.6-1-.6-1.6 0-.7.2-1.3.8-1.7.5-.4 1.2-.6 2.1-.6.3 0 .6 0 1 .1l1 .2v-.6c0-.6-.1-1.1-.4-1.3-.3-.3-.7-.4-1.4-.4l-1 .1c-.3.1-.7.2-1 .3h-.3c-.2 0-.2-.1-.2-.3v-.5c0-.1 0-.2.1-.3l.3-.2 1.2-.3 1.3-.1c1 0 1.7.2 2.2.7.4.4.7 1.1.7 2v2.9z" fill="#252F3E" transform="translate(3 2) scale(.9)" />
    <path d="M3 18.2c2.8 1.7 6 2.5 9 2.5 2.1 0 4.4-.4 6.5-1.3.3-.2.6.1.3.4-1.7 1.4-4.3 2.2-6.6 2.2-3.2 0-6.1-1.2-8.3-3.2-.2-.2 0-.5.1-.6zM19.6 17.4c-.3-.4-2-.2-2.8-.1-.2 0-.3-.1-.1-.3.6-.9 1.9-.9 2.9-.9 1 .1 1.2.3 1.2.5 0 1-.9 2.2-1.6 2.8-.2.1-.3.1-.3-.1.3-.7.9-1.6.7-1.9z" fill="#F90" />
  </svg>
);

export const VercelLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 3l10 17H2L12 3z" fill="#000" />
  </svg>
);

export const DockerLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="10" width="2.6" height="2.6" fill="#2496ED" />
    <rect x="8.1" y="10" width="2.6" height="2.6" fill="#2496ED" />
    <rect x="11.2" y="10" width="2.6" height="2.6" fill="#2496ED" />
    <rect x="8.1" y="7" width="2.6" height="2.6" fill="#2496ED" />
    <rect x="11.2" y="7" width="2.6" height="2.6" fill="#2496ED" />
    <path d="M21 12.2c-.6-.4-1.9-.5-2.9-.3-.1-1-.7-1.9-1.8-2.5l-.4-.2-.2.4c-.4.7-.6 1.7-.3 2.6H2.2l-.1.5c-.2 1.7.2 3.3 1.1 4.4 1 1.2 2.5 1.8 4.5 1.8 4.3 0 7.5-2 9-5.5 1 .1 2.4 0 3.1-.9l.2-.3z" fill="#2496ED" />
  </svg>
);

export const GitLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M23.5 11.2L12.8.5a1 1 0 0 0-1.5 0L9 2.8l2.4 2.4a1.9 1.9 0 0 1 2.4 2.4l2.3 2.3a1.9 1.9 0 1 1-1.1 1.1l-2.2-2.2v5.7a1.9 1.9 0 1 1-1.6 0V8.8a1.9 1.9 0 0 1-1-2.5L7.8 4 .5 11.3a1 1 0 0 0 0 1.5l10.7 10.7a1 1 0 0 0 1.5 0L23.5 12.7a1 1 0 0 0 0-1.5z" fill="#F05032" />
  </svg>
);

export const StripeLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#635BFF" />
    <path d="M11.4 9.6c0-.5.4-.7 1.1-.7 1 0 2.2.3 3.2.8V7.1c-1.1-.4-2.1-.6-3.2-.6-2.6 0-4.3 1.3-4.3 3.5 0 3.4 4.7 2.9 4.7 4.4 0 .6-.5.8-1.2.8-1.1 0-2.5-.5-3.6-1.1v2.7c1.2.5 2.4.7 3.6.7 2.6 0 4.4-1.3 4.4-3.6 0-3.7-4.7-3.1-4.7-4.3z" fill="#fff" />
  </svg>
);

export const RevenueCatLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#F2545B" />
    <path d="M8 15.5l4-7 4 7H8z" fill="#fff" />
  </svg>
);

export const SentryLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 3.2c.5-.9 1.8-.9 2.3 0l6.6 11.5c.5.9-.1 2-1.2 2h-2.3c.1-.6 0-1.2-.3-1.7L12 6.4l-2.4 4.2c2.2 1.4 3.7 3.7 4 6.3H11c-.3-1.9-1.4-3.5-3-4.5l-1.5 2.6c.8.5 1.3 1.2 1.5 2.1H5.3c-1.1 0-1.7-1.1-1.2-2L12 3.2z" fill="#362D59" />
  </svg>
);

export const PostHogLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="14" width="6" height="7" rx="1" fill="#F9BD2B" />
    <rect x="9.5" y="9" width="6" height="12" rx="1" fill="#F54E00" />
    <rect x="16" y="3" width="5" height="18" rx="1" fill="#1D4AFF" />
  </svg>
);

export const PlaywrightLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" fill="#2EAD33" />
    <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="#fff" />
  </svg>
);

export const MobileMoneyLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2.5" width="11" height="19" rx="2.2" stroke="#0EA36B" strokeWidth="1.8" />
    <path d="M9 19h3" stroke="#0EA36B" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="18" cy="9" r="4.2" fill="#F2B705" stroke="#fff" strokeWidth="1.2" />
    <path d="M18 6.9v4.2M16.9 8h2.2M16.9 10h2.2" stroke="#7A5C00" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

export const CICDLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#10B981" strokeWidth="2" />
    <path d="M8 12l3 3 5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SanityLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M9.6 6.8c0 2.5 1.6 3.9 4.7 4.7 2.8.7 4.5 1.6 4.5 4 0 2.5-2 4.2-5.1 4.2-2.8 0-4.9-1.4-5.4-4h2.9c.3 1.1 1.2 1.7 2.6 1.7 1.3 0 2.2-.7 2.2-1.7 0-1.1-.9-1.5-3.3-2.1-3-.8-4.9-2-4.9-4.6C7.8 6.6 9.7 5 12.7 5c2.8 0 4.7 1.4 5.2 3.8h-2.8c-.3-.9-1.1-1.5-2.3-1.5-1.3 0-2 .6-2 1.5z" fill="#F03E2F" />
  </svg>
);

export const ViteLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M22 4.7l-9.4 16.8c-.2.4-.8.4-1 0L2 4.7c-.2-.4.1-.9.6-.8l9 1.6c.1 0 .2 0 .3 0l9.4-1.6c.5-.1.9.4.7.8z" fill="#BD34FE" />
    <path d="M16.4 2.2l-6.1 1.2c-.1 0-.2.1-.2.3l-.4 6.3c0 .2.2.3.3.3l1.7-.4c.2 0 .4.1.3.4l-.5 2.5c0 .2.1.4.4.3l1-.3c.2-.1.4.1.4.3l-.8 3.8c-.1.3.3.5.5.2l.1-.2 4.8-9.6c.1-.2-.1-.5-.3-.4l-1.8.3c-.2 0-.4-.1-.3-.4l1.2-4.2c.1-.2-.1-.4-.3-.4z" fill="#FFCA28" />
  </svg>
);

export const HtmlCssLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M3 2.5l1.6 17L12 21.8l7.4-2.3L21 2.5H3z" fill="#E44D26" />
    <path d="M12 4.3v15.8l6-1.9 1.4-13.9H12z" fill="#F16529" />
    <path d="M7 7h10l-.2 2H9.2l.2 2.2h7.2l-.6 6.2-3.8 1.1-3.8-1.1-.2-2.4h1.9l.1 1.2 2 .6 2-.6.2-2.3H6.7L6.1 7H7z" fill="#fff" />
  </svg>
);

export const BashLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="4" width="19" height="16" rx="2.5" fill="#1F2937" />
    <path d="M6.5 9.5l3 2.5-3 2.5M11.5 15h5" stroke="#4ADE80" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FramerMotionLogo = ({ className = base }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M5.5 2.5h13v7h-6.5l-6.5-7z" fill="#0055FF" />
    <path d="M5.5 9.5h13l-6.5 7-6.5-7z" fill="#0055FF" opacity=".75" />
    <path d="M5.5 16.5h6.5v5l-6.5-5z" fill="#0055FF" opacity=".5" />
  </svg>
);
