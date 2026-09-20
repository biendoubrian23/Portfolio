# Guide de déploiement

## Déploiement sur Vercel (Recommandé)

Vercel est la plateforme idéale pour déployer des applications Next.js.

### Étapes :

1. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec GitHub

2. **Importer le projet**
   - Cliquez sur "New Project"
   - Importez votre repository GitHub
   - Vercel détectera automatiquement Next.js

3. **Configuration**
   - Aucune configuration supplémentaire nécessaire
   - Cliquez sur "Deploy"

4. **Domaine personnalisé** (optionnel)
   - Dans les paramètres du projet
   - Ajoutez votre domaine personnalisé
   - Suivez les instructions pour configurer les DNS

## Déploiement sur Netlify

### Étapes :

1. Installer Netlify CLI
```bash
npm install -g netlify-cli
```

2. Build du projet
```bash
npm run build
```

3. Déployer
```bash
netlify deploy --prod
```

## Déploiement manuel

### Build de production

```bash
npm run build
npm start
```

Le site sera accessible sur le port 3000.

## Variables d'environnement

Créez un fichier `.env.local` si nécessaire :

```env
# Exemple de variables
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@meelo.com
```

## Optimisations avant déploiement

1. **Images** : Ajoutez vos vraies images dans `public/images/`
2. **SEO** : Vérifiez les métadonnées dans `app/layout.tsx`
3. **Analytics** : Ajoutez Google Analytics si nécessaire
4. **Performance** : Testez avec Lighthouse

## Support

Pour toute question, consultez :
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Vercel](https://vercel.com/docs)
