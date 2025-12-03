# 📢 Configuration des Publicités - Blog Brian Biendou

## 🎯 Solutions implémentées

### 1. Google AdSense (Recommandé pour démarrer)
- **Revenu estimé** : 2-10€ / 1000 vues
- **Avantages** : Simple, fiable, accepte les petits sites
- **Status** : ✅ Prêt à activer

### 2. Emplacements publicitaires

Les publicités sont **uniquement** sur les pages `/blog/*`, jamais sur le portfolio.

| Emplacement | Format | Visible sur |
|-------------|--------|-------------|
| Sidebar gauche | Vertical (160x600) | Écrans 2XL+ (1536px+) |
| Sidebar droite | Vertical (160x600) | Écrans 2XL+ (1536px+) |
| Après l'article | Auto responsive | Tous écrans |

## 🔧 Comment activer AdSense

### Étape 1 : Créer un compte AdSense
1. Va sur https://www.google.com/adsense/
2. Inscris-toi avec ton compte Google
3. Soumets ton site `brian-biendou.com` pour validation

### Étape 2 : Obtenir tes identifiants
Après approbation, tu obtiendras :
- **Client ID** : `ca-pub-XXXXXXXXXX` (identifiant éditeur)
- **Slot IDs** : Identifiants uniques pour chaque emplacement

### Étape 3 : Configurer dans le code

Modifie le fichier `components/ads/AdBanner.tsx` :

```typescript
export const AD_CONFIG = {
  adsense: {
    clientId: 'ca-pub-XXXXXXXXXX', // ← Remplace par ton vrai ID
    enabled: true, // ← Mets true pour activer
  },
  // ...
}
```

### Étape 4 : Créer les emplacements dans AdSense

Dans ton tableau de bord AdSense, crée ces emplacements :

1. **SLOT_SIDEBAR_LEFT** - Format : Vertical (160x600)
2. **SLOT_SIDEBAR_RIGHT** - Format : Vertical (160x600)
3. **SLOT_IN_ARTICLE** - Format : Rectangle (300x250)
4. **SLOT_AFTER_ARTICLE** - Format : Auto responsive

Puis remplace les `slot` dans `AdBanner.tsx` par les vrais IDs.

## 📈 Évolution future

### Quand passer à Ezoic ?
- Minimum **50-100 visites/jour** de trafic organique
- Site propre avec bon SEO
- **Revenus 2-4× supérieurs** à AdSense

### Configuration Ezoic
Dans `AD_CONFIG`, passe `ezoic.enabled` à `true` quand tu seras prêt.

## ⚠️ Notes importantes

1. **Ne mets JAMAIS de pubs sur le portfolio** - Garde ça pro
2. **Test local** - Les pubs ne s'affichent pas en localhost
3. **Délai d'approbation** - AdSense peut prendre 1-14 jours
4. **Contenu de qualité** - Google vérifie ton contenu avant validation

## 📁 Fichiers concernés

```
portfolio/
├── components/
│   └── ads/
│       ├── AdBanner.tsx        # Composants pub
│       ├── BlogLayoutWithAds.tsx
│       └── index.ts
├── app/
│   └── blog/
│       ├── layout.tsx          # Script AdSense (blog uniquement)
│       └── [slug]/
│           └── page.tsx        # Sidebars + pub après article
```

## 💰 Estimation des revenus

| Vues/mois | AdSense (2-10€/1000) | Ezoic (8-25€/1000) |
|-----------|----------------------|-------------------|
| 1,000 | 2-10€ | N/A (trop peu) |
| 5,000 | 10-50€ | N/A |
| 10,000 | 20-100€ | 80-250€ |
| 50,000 | 100-500€ | 400-1250€ |
