# 🎨 Guide de personnalisation du Portfolio Meelo

## 📝 Comment personnaliser votre portfolio

### 1. Modifier les textes

#### Navigation (components/Navigation.tsx)
```typescript
const navItems = [
  { name: 'Maison', href: '#maison' },
  { name: 'Services', href: '#services' },
  // Modifiez les noms et ancres selon vos besoins
];
```

#### Hero Section (components/sections/HeroSection.tsx)
Lignes à modifier :
- Ligne 11 : Le badge "BONJOUR!"
- Lignes 14-19 : Le titre principal
- Lignes 21-23 : La description
- Ligne 26 : Le texte du bouton

#### Services (components/sections/ServicesSection.tsx)
Lignes 3-30 : Modifiez le tableau `services` avec vos propres services

#### À propos (components/sections/AboutSection.tsx)
- Ligne 50 : Titre de section
- Ligne 53 : Description courte
- Ligne 57 : Description longue

### 2. Ajouter vos images

#### Étape 1 : Préparer vos images
Placez vos images dans `public/images/` avec cette structure :

```
public/images/
├── hero-photo.jpg           (votre photo principale)
├── about-photo.jpg          (votre photo secondaire)
├── project-1.jpg            (aperçu projet 1)
├── project-2.jpg            (aperçu projet 2)
├── project-3.jpg            (aperçu projet 3)
└── project-4.jpg            (aperçu projet 4)
```

#### Étape 2 : Modifier HeroSection.tsx
Remplacez les lignes 36-40 par :

```typescript
<div className="w-[500px] h-[500px] bg-[#B8A8D8] rounded-full overflow-hidden relative">
  <Image 
    src="/images/hero-photo.jpg" 
    alt="Jonathan Meelo"
    width={500}
    height={500}
    className="object-cover"
  />
</div>
```

N'oubliez pas d'ajouter l'import en haut du fichier :
```typescript
import Image from 'next/image';
```

#### Étape 3 : Modifier AboutSection.tsx
Remplacez les lignes 12-18 par :

```typescript
<div className="w-[450px] h-[450px] bg-[#B8A8D8] rounded-full overflow-hidden relative">
  <Image 
    src="/images/about-photo.jpg" 
    alt="Jonathan Meelo"
    width={450}
    height={450}
    className="object-cover"
  />
</div>
```

#### Étape 4 : Modifier PortfolioSection.tsx
Dans le mapping des projets (lignes 51-58), remplacez le placeholder par :

```typescript
<div className="h-80 relative">
  <Image 
    src={`/images/project-${index + 1}.jpg`}
    alt={project.title}
    fill
    className="object-cover"
  />
</div>
```

### 3. Modifier les couleurs

Dans `tailwind.config.js`, modifiez les couleurs :

```javascript
colors: {
  'meelo-purple': '#E5DFF5',  // Changez ces valeurs
  'meelo-green': '#F0F5E6',
  'meelo-pink': '#F5E5F0',
  'meelo-blue': '#E5F0F5',
  'meelo-orange': '#FF6B35',
  'meelo-beige': '#FFF8F0',
}
```

### 4. Changer les informations de contact

#### Footer (components/Footer.tsx)
Lignes 10-12 : Description
Lignes 37-39 : Coordonnées

#### ContactSection (components/sections/ContactSection.tsx)
Lignes 25-27 : Email
Lignes 35-37 : Téléphone
Lignes 45-47 : Localisation

### 5. Personnaliser les projets du portfolio

Dans `components/sections/PortfolioSection.tsx`, lignes 3-27 :

```typescript
const projects = [
  {
    title: 'Votre Projet 1',
    description: 'Description de votre projet...',
    link: 'Voir le projet',
    bgColor: 'bg-pink-50',
  },
  // Ajoutez autant de projets que nécessaire
];
```

### 6. Modifier les expériences

Dans `components/sections/ExperienceSection.tsx`, lignes 3-21 :

```typescript
const experiences = [
  {
    period: 'MOIS ANNÉE - MOIS ANNÉE',
    title: 'Votre Poste',
    description: 'Description de vos responsabilités...',
  },
  // Ajoutez vos expériences
];
```

### 7. Personnaliser les témoignages

Dans `components/sections/TestimonialSection.tsx`, lignes 5-25 :

```typescript
const testimonials = [
  {
    quote: 'Votre témoignage...',
    author: 'Nom du Client',
    role: 'Fonction',
    rating: 5,
  },
  // Ajoutez plus de témoignages
];
```

### 8. Ajuster les statistiques

Dans `components/sections/StatsSection.tsx`, lignes 3-18 :

```typescript
const stats = [
  {
    value: '97%',
    label: 'Votre métrique',
  },
  // Modifiez selon vos chiffres
];
```

### 9. Configurer le SEO

Dans `app/layout.tsx`, lignes 16-19 :

```typescript
export const metadata: Metadata = {
  title: "Votre Nom - Votre Métier",
  description: "Votre description professionnelle",
};
```

### 10. Ajouter Google Analytics (optionnel)

1. Créez un fichier `app/analytics.tsx` :

```typescript
import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
    </>
  );
}
```

2. Importez-le dans `app/layout.tsx` :

```typescript
import Analytics from './analytics';

// Dans le return :
<body>
  <Analytics />
  <Navigation />
  {children}
  <Footer />
</body>
```

### 11. Modifier les liens des réseaux sociaux

Dans `components/Navigation.tsx` et `components/Footer.tsx`, remplacez les href="#" par vos vrais liens :

```typescript
<a href="https://twitter.com/votre-compte" ...>
<a href="https://linkedin.com/in/votre-profil" ...>
<a href="https://instagram.com/votre-compte" ...>
```

### 🎯 Checklist avant le déploiement

- [ ] Toutes les images sont ajoutées
- [ ] Tous les textes sont personnalisés
- [ ] Les informations de contact sont correctes
- [ ] Les liens des réseaux sociaux fonctionnent
- [ ] Les projets du portfolio sont à jour
- [ ] Les métadonnées SEO sont configurées
- [ ] Le formulaire de contact est fonctionnel
- [ ] Le site est testé sur mobile
- [ ] Aucune erreur dans la console

### 🚀 Tester localement

Après chaque modification :

```bash
npm run dev
```

Puis vérifiez sur http://localhost:3000

### 📦 Build de production

Avant de déployer, testez le build :

```bash
npm run build
npm start
```

---

**Besoin d'aide ?**
- Documentation Next.js : https://nextjs.org/docs
- Documentation Tailwind : https://tailwindcss.com/docs
