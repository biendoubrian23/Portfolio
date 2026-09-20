export type StoreLink = {
  /** Lien vers la fiche. `null` quand l'application n'est pas encore publiée. */
  url: string | null;
  /** Fiche déposée mais pas encore ouverte au public. */
  soon?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  /** `client` = réalisation livrée pour un client. `produit` = produit que je développe et exploite. */
  kind: 'client' | 'produit';
  tagline: string;
  description: string;
  sector: string;
  year: string;
  status: string;
  /** Site en production. `null` si le projet n'est pas accessible publiquement. */
  url: string | null;
  platforms: Array<'web' | 'ios' | 'android'>;
  stack: string[];
  highlights: string[];
  /** Couleurs de la marque du projet, utilisées pour les accents de la carte. */
  colors: { from: string; to: string; ink: string };
  /** Capture du haut de page (ratio 16/10). */
  cover: string;
  /** Capture pleine page, défilée au survol dans la loupe. */
  preview: string;
  stores?: { ios?: StoreLink; android?: StoreLink };
  /** Mis en avant sur la page d'accueil (4 projets). */
  featured?: boolean;
};

export const projects: Project[] = [
  // ─────────────────────────────  MES PRODUITS  ─────────────────────────────
  {
    slug: 'cosmecheck',
    name: 'CosmeCheck',
    kind: 'produit',
    tagline: 'Scannez un cosmétique, comprenez vraiment sa formule',
    description:
      "Scan du code-barres, photo de la liste INCI ou saisie manuelle : CosmeCheck rend un score sur 20 et explique, ingrédient par ingrédient, ce qui pose problème. L'analyse confronte les promesses du packaging à la formule réelle et tient compte des allergies et du type de peau. Un conseiller beauté IA prolonge le diagnostic au quotidien.",
    sector: 'Cosmétique · Santé',
    year: '2026',
    status: 'En production',
    url: 'https://www.cosme-check.com',
    platforms: ['web', 'ios', 'android'],
    stack: ['Expo / React Native', 'Next.js', 'Supabase', 'RevenueCat', 'Python', 'LLM'],
    highlights: [
      'Triple scan : code-barres, OCR de la liste INCI, saisie manuelle',
      'Base d’ingrédients construite depuis le règlement CE 1223/2009 et CosIng',
      'Conseiller beauté IA adossé à un système de crédits et d’abonnements',
    ],
    colors: { from: '#8B5CF6', to: '#F43F5E', ink: '#2E1065' },
    cover: '/projects/cosmecheck-cover.webp',
    preview: '/projects/cosmecheck-full.webp',
    stores: {
      ios: { url: 'https://apps.apple.com/app/id6803527040' },
      android: { url: 'https://play.google.com/store/apps/details?id=com.cosmecheck.app' },
    },
    featured: true,
  },
  {
    slug: 'revealchat',
    name: 'RevealChat',
    kind: 'produit',
    tagline: 'Lis entre les lignes de tes conversations',
    description:
      "RevealChat analyse un export de conversation WhatsApp et révèle la dynamique réelle de la relation : qui relance, qui s'éloigne, et à quel moment tout a basculé. Les résultats sont datés et chiffrés, restitués en axes et en visuels partageables. L'import se fait depuis la feuille de partage du téléphone, sans copier-coller.",
    sector: 'Social · Analyse',
    year: '2026',
    status: 'En production',
    url: 'https://revealchat.fr',
    platforms: ['web', 'ios', 'android'],
    stack: ['Expo / React Native', 'Next.js', 'Supabase Edge Functions', 'RevenueCat', 'Sentry'],
    highlights: [
      'Import direct depuis WhatsApp via une extension de partage iOS et Android',
      'Analyse par axes relationnels calculée côté serveur',
      '30+ scénarios de tests bout-en-bout, du paiement à la suppression de compte',
    ],
    colors: { from: '#3B0F2E', to: '#8C1D3F', ink: '#3B0F2E' },
    cover: '/projects/revealchat-cover.webp',
    preview: '/projects/revealchat-full.webp',
    stores: {
      ios: { url: 'https://apps.apple.com/us/app/revealchat/id6803115828' },
      android: { url: 'https://play.google.com/store/apps/details?id=com.revealchat.app' },
    },
    featured: true,
  },
  {
    slug: 'pixia-one',
    name: 'Pixia One',
    kind: 'produit',
    tagline: 'Marques et créateurs de contenu connectés en Afrique',
    description:
      "Pixia One met en relation les marques africaines et les créateurs TikTok, Instagram et Facebook. Une entreprise publie une campagne avec un budget réservé, les créateurs postulent depuis l'application, tournent la vidéo et collent le lien de leur publication. Le suivi des vues est automatique et les gains sont réglés au portefeuille, retirables en Mobile Money.",
    sector: 'Marketing d’influence',
    year: '2026',
    status: 'Web en production · apps en cours de publication',
    url: 'https://pixia-one.com',
    platforms: ['web', 'ios', 'android'],
    stack: ['Expo / React Native', 'Next.js', 'Supabase', 'Stripe', 'Mobile Money', 'PostHog'],
    highlights: [
      'Boucle marketplace complète : budget réservé, candidature, livraison, règlement',
      'Gains réglés à la vue via un grand livre immuable et un cron de suivi',
      'Dashboard entreprise de 10 écrans et back-office de modération',
    ],
    colors: { from: '#6C5CE7', to: '#A78BFA', ink: '#0C0C10' },
    cover: '/projects/pixia-one-cover.webp',
    preview: '/projects/pixia-one-full.webp',
    stores: {
      ios: { url: null, soon: true },
      android: { url: null, soon: true },
    },
  },
  {
    slug: 'memory-pilot',
    name: 'Memory Pilot',
    kind: 'produit',
    tagline: 'Ton second cerveau : confie, il te le rend',
    description:
      "Memory Pilot sert de mémoire externe : un code, une date, une allergie, une idée — à la voix, par photo ou par partage — et l'application range l'information toute seule. On la redemande en langage naturel et elle ressort au bon moment, avec des rappels programmés. Tout est chiffré localement sur le téléphone.",
    sector: 'Productivité',
    year: '2026',
    status: 'Android disponible · iOS en validation',
    url: 'https://memorypilot.fr',
    platforms: ['web', 'ios', 'android'],
    stack: ['Expo / React Native', 'SQLCipher', 'ML Kit OCR', 'Next.js', 'Supabase', 'RevenueCat'],
    highlights: [
      'Sept widgets Android natifs pour confier et retrouver sans ouvrir l’app',
      'Capture multimodale : dictée vocale, OCR hors-ligne, partage entrant',
      'Mémoire locale chiffrée et rappels programmés, en français et en anglais',
    ],
    colors: { from: '#8A48FC', to: '#CD45E8', ink: '#1A1B27' },
    cover: '/projects/memory-pilot-cover.webp',
    preview: '/projects/memory-pilot-full.webp',
    stores: {
      ios: { url: null, soon: true },
      android: { url: 'https://play.google.com/store/apps/details?id=com.memorypilot.app' },
    },
  },
  {
    slug: 'test-civique-france',
    name: 'Test Civique France',
    kind: 'produit',
    tagline: 'Préparer et réussir l’examen civique français',
    description:
      "Plateforme d'entraînement à l'examen civique français : questions type, cinq examens blancs et suivi de progression. Les candidats révisent à leur rythme, identifient leurs lacunes et s'entraînent dans les conditions de l'épreuve. Un accès premium par abonnement débloque l'ensemble des contenus.",
    sector: 'Éducation',
    year: '2026',
    status: 'En production',
    url: 'https://www.testciviquefrance.fr',
    platforms: ['web'],
    stack: ['Next.js', 'Supabase', 'Stripe', 'PWA', 'Recharts', 'PostHog'],
    highlights: [
      'Cinq examens blancs avec suivi de progression et statistiques',
      'Abonnement Stripe avec webhook signé et back-office intégré',
      'Application installable en PWA, utilisable hors connexion',
    ],
    colors: { from: '#3B82F6', to: '#10B981', ink: '#1D4ED8' },
    cover: '/projects/test-civique-france-cover.webp',
    preview: '/projects/test-civique-france-full.webp',
  },

  // ─────────────────────────  RÉALISATIONS CLIENTS  ─────────────────────────
  {
    slug: 'alpha-ies',
    name: 'Alpha IES Ltd',
    kind: 'client',
    tagline: 'Trading international de minerais stratégiques',
    description:
      "Site corporate d'une société irlandaise de négoce et de sourcing de minerais critiques : cuivre, cobalt, tantalite, lithium, or. Il présente l'offre sur toute la chaîne d'approvisionnement — trading, logistique, financement, gestion du risque — et capte les demandes de partenariat. Trilingue anglais, français et espagnol, pour des acheteurs industriels internationaux.",
    sector: 'Négoce de matières premières',
    year: '2025',
    status: 'Livré · en production',
    url: 'https://alphaiesltd.com',
    platforms: ['web'],
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'next-intl', 'Framer Motion', 'Resend'],
    highlights: [
      'Trilingue EN/FR/ES avec hreflang et sitemap multilingue générés',
      'Formulaire de contact serveur avec e-mails transactionnels aux couleurs de la marque',
      'SEO avancé : JSON-LD Organization, image Open Graph générée à la volée',
    ],
    colors: { from: '#c9a553', to: '#f6efde', ink: '#111114' },
    cover: '/projects/alpha-ies-cover.webp',
    preview: '/projects/alpha-ies-full.webp',
    featured: true,
  },
  {
    slug: 'lumiere-du-monde',
    name: 'Lumière du Monde',
    kind: 'client',
    tagline: 'Site et back-office d’un centre de yoga tantrique',
    description:
      "Site officiel d'une association congolaise de yoga tantrique : quinze pages éditoriales, formulaires de contact et de don. Un back-office sur mesure permet à l'association de modifier tous les textes, images, lettres et e-mails sans développeur. La « boîte aux lettres universelle » — écrire, recevoir, modérer — constitue le cœur relationnel du site.",
    sector: 'Association · Spiritualité',
    year: '2026',
    status: 'Livré · en production',
    url: 'https://www.lumiere-du-monde.com',
    platforms: ['web'],
    stack: ['Next.js 16', 'React 19', 'Supabase', 'Brevo', 'TypeScript'],
    highlights: [
      'Back-office propriétaire : édition champ par champ, lettres, abonnés, gabarits d’e-mails',
      'API d’envoi protégée : champ piège, limitation par IP, vérification d’origine',
      'SEO complet généré : sitemap, JSON-LD, Open Graph, llms.txt',
    ],
    colors: { from: '#4B2A7B', to: '#CDA06C', ink: '#4B2A7B' },
    cover: '/projects/lumiere-du-monde-cover.webp',
    preview: '/projects/lumiere-du-monde-full.webp',
    featured: true,
  },
  {
    slug: 'energie-stat',
    name: 'Energie-Stat',
    kind: 'client',
    tagline: 'Performance des installations géothermiques',
    description:
      "Site d'un spécialiste québécois de la performance géothermique. Il structure l'offre sur tout le cycle de vie d'une installation : test de réponse thermique avant conception, puis inspection annuelle, bilan de santé et surveillance continue. Il s'adresse aux ingénieurs et donneurs d'ordre, avec un canal dédié aux installateurs partenaires.",
    sector: 'Énergie · Géothermie',
    year: '2026',
    status: 'Livré',
    url: 'https://energie-stat.vercel.app/fr',
    platforms: ['web'],
    stack: ['Next.js 16', 'React 19', 'Tailwind CSS', 'next-intl', 'TypeScript'],
    highlights: [
      'Bilingue fr-CA / en-CA, sans aucun texte codé en dur',
      'Couche SEO locale : JSON-LD ProfessionalService avec zones desservies par ville',
      'Composants de visualisation des données de performance sur mesure',
    ],
    colors: { from: '#2b8159', to: '#f5b731', ink: '#1b2a3a' },
    cover: '/projects/energie-stat-cover.webp',
    preview: '/projects/energie-stat-full.webp',
  },
  {
    slug: 'matricx-consulting',
    name: 'MatriCx Consulting',
    kind: 'client',
    tagline: 'Site bilingue et CMS pour un cabinet de conseil',
    description:
      "Site d'un cabinet camerounais spécialisé en expérience client, stratégie et transformation digitale. Statistiques, témoignages, équipe, blog, événements et offres d'emploi sont pilotés en autonomie par le client depuis un CMS, en français et en anglais. Le site est installable en PWA et intègre newsletter, formulaire de contact et chatbot.",
    sector: 'Conseil · Expérience client',
    year: '2026',
    status: 'Livré · en production',
    url: 'https://matricxconsulting.com',
    platforms: ['web'],
    stack: ['React 19', 'Vite', 'Sanity CMS', 'Tailwind CSS', 'Framer Motion', 'PWA'],
    highlights: [
      'Contenu bilingue FR/EN entièrement piloté par le client depuis Sanity',
      'PWA complète et double cible de déploiement avec en-têtes de sécurité',
      'Fonctions serverless d’acquisition : contact, newsletter, chatbot',
    ],
    colors: { from: '#FDC300', to: '#0080AF', ink: '#575756' },
    cover: '/projects/matricx-consulting-cover.webp',
    preview: '/projects/matricx-consulting-full.webp',
  },
  {
    slug: 'pristyle',
    name: 'Pristyle Design',
    kind: 'client',
    tagline: 'Vitrine catalogue de haute couture africaine',
    description:
      "Site vitrine premium d'une marque de mode sur mesure de Douala, présentant les collections femme, homme, mariage et enfant. Le catalogue est alimenté depuis une base de données, ce qui permet d'ajouter des modèles sans toucher au code. La conversion se fait directement par WhatsApp, sans tunnel e-commerce à maintenir.",
    sector: 'Mode · Haute couture',
    year: '2026',
    status: 'Livré · en production',
    url: 'https://pristyle.vercel.app',
    platforms: ['web'],
    stack: ['Next.js 16', 'React 19', 'Supabase', 'CSS Modules', 'next/font'],
    highlights: [
      'Catalogue dynamique : catégories, sous-catégories, produits et galeries',
      'Sitemap généré depuis la base et redirections 301 des anciennes URLs',
      'Images pré-converties en WebP et cache long pour un hébergement au plus juste',
    ],
    colors: { from: '#C8A87E', to: '#1A1A1A', ink: '#1A1A1A' },
    cover: '/projects/pristyle-cover.webp',
    preview: '/projects/pristyle-full.webp',
  },
];

export const clientProjects = projects.filter((p) => p.kind === 'client');
export const productProjects = projects.filter((p) => p.kind === 'produit');
export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
