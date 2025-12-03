# 🎯 Guide d'Intégration Ezoic pour brianbiendou.com

## 📋 Vue d'ensemble des étapes

1. **Step 1**: Site Integration (Scripts Header)
2. **Step 2**: Ads.txt Setup
3. **Step 3**: Ad Placements
4. **Dynamic Content**: Configuration pour Next.js (SPA)

---

## 🔧 STEP 1: Site Integration

### 1.1 Privacy Scripts (À charger EN PREMIER dans le `<head>`)

```html
<script src="https://cmp.gatekeeperconsent.com/min.js" data-cfasync="false"></script>
<script src="https://the.gatekeeperconsent.com/cmp.min.js" data-cfasync="false"></script>
```

> ⚠️ **Important**: L'attribut `data-cfasync="false"` empêche Cloudflare d'optimiser ces scripts pour garantir l'ordre de chargement correct (conformité RGPD).

### 1.2 Header Script (Après les Privacy Scripts)

```html
<script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
<script>
    window.ezstandalone = window.ezstandalone || {};
    ezstandalone.cmd = ezstandalone.cmd || [];
</script>
```

### 1.3 Ordre de placement dans le `<head>`

1. Privacy Scripts (gatekeeperconsent) - EN PREMIER
2. Header Script Ezoic (sa.min.js)
3. Autres scripts

### 1.4 Best Practices

- ✅ Charger privacy scripts AVANT le header script
- ✅ Placer tous les scripts le plus haut possible dans `<head>`
- ❌ Éviter de charger les scripts conditionnellement ou après le page load
- ❌ S'assurer que les scripts ne sont pas bloqués par ad blockers ou CSP

---

## 📄 STEP 2: Ads.txt Setup

### Qu'est-ce que ads.txt ?

Fichier texte qui indique aux annonceurs quelles entreprises sont autorisées à vendre des espaces pub sur ton domaine. C'est une "liste de vendeurs vérifiés".

### Méthode recommandée pour Next.js/Netlify : Server Redirects

Créer une redirection dans `netlify.toml` ou `_redirects` :

```
/ads.txt    https://srv.adstxtmanager.com/19390/brianbiendou.com    301
```

### Alternative : Fichier statique avec mise à jour automatique

```bash
# Commande à exécuter quotidiennement (cron job)
curl -L https://srv.adstxtmanager.com/19390/brianbiendou.com > public/ads.txt
```

### Vérification

1. Visiter `brianbiendou.com/ads.txt` dans le navigateur
2. Vérifier qu'une liste de vendeurs autorisés s'affiche
3. Vider le cache si le fichier n'apparaît pas

---

## 🎨 STEP 3: Ad Placements

### Structure d'un placeholder

```html
<div id="ezoic-pub-ad-placeholder-101"></div>
<script>
    ezstandalone.cmd.push(function () {
        ezstandalone.showAds(101);
    });
</script>
```

> ⚠️ **Important**: NE PAS ajouter de styles au div placeholder ! Cela peut créer des espaces blancs si la pub ne charge pas.

### Optimisation : Appel unique pour plusieurs placements

```javascript
// Au lieu de plusieurs appels séparés :
ezstandalone.showAds(101, 102, 103, 104);
```

### IDs de placement à créer dans Ezoic Dashboard

| Emplacement | ID suggéré | Description |
|------------|------------|-------------|
| Sidebar gauche 1 | 101 | Premier bloc sidebar gauche |
| Sidebar gauche 2 | 102 | Deuxième bloc sidebar gauche |
| Sidebar droite 1 | 103 | Premier bloc sidebar droite |
| Sidebar droite 2 | 104 | Deuxième bloc sidebar droite |
| Après article | 105 | Pub après le contenu |
| Dans article | 106 | Pub au milieu de l'article |

---

## ⚡ DYNAMIC CONTENT (Important pour Next.js!)

Next.js est une SPA (Single Page Application), donc les pubs doivent être rechargées à chaque changement de page.

### Changement de page (navigation)

```javascript
// À appeler après chaque navigation
ezstandalone.showAds();
```

### Nouveau contenu (lazy loading, scroll infini)

```javascript
ezstandalone.cmd.push(function () {
    // Afficher les nouveaux placeholders
    ezstandalone.showAds(104, 105);
});
```

### Contenu qui change (placeholder qui disparaît)

```javascript
ezstandalone.cmd.push(function () {
    // Détruire les anciens placeholders
    ezstandalone.destroyPlaceholders(104, 105);
});
```

### Supprimer tous les placeholders

```javascript
ezstandalone.cmd.push(function () {
    ezstandalone.destroyAll();
});
```

### Afficher tous les placeholders de la page

```javascript
ezstandalone.cmd.push(function () {
    ezstandalone.showAds(); // Sans paramètre = tous
});
```

---

## 🔍 TROUBLESHOOTING (Debugger)

### Activer le debugger

Ajouter `?ez_js_debugger=1` à l'URL :
```
https://brianbiendou.com/blog/mon-article?ez_js_debugger=1
```

### Ce que le debugger vérifie

| Vérification | Description |
|-------------|-------------|
| Script In Page `<head>` | Vérifie que sa.min.js est dans le `<head>` |
| Consent | Vérifie les outils de consentement RGPD |
| Ad Request | Vérifie si la requête pub est envoyée |
| Defined Placeholders | Liste les IDs des placeholders détectés |
| Unused Placeholders | Placeholders présents mais non utilisés |
| API Methods Called | Méthodes ezstandalone appelées |

### Problèmes courants

- **Pubs ne s'affichent pas** → Vérifier placeholders et ad status
- **Requêtes échouent** → Vérifier configuration scripts
- **Scripts pas chargés** → Vérifier présence dans source code

---

## ✅ VÉRIFICATION DOMAINE (Image 12)

Tu dois choisir une méthode de vérification :

### Options disponibles

| Méthode | Difficulté | Recommandé |
|---------|-----------|------------|
| 🌐 **Create DNS Record** | Moyen | ✅ OUI |
| 📄 Upload HTML File | Facile | Oui si DNS compliqué |
| 🏷️ Add HTML Tag | Facile | Moins sécurisé |

### ➡️ Recommandation : DNS Record (le plus fiable)

1. Va dans les paramètres DNS de ton domaine (Netlify ou registrar)
2. Ajoute l'enregistrement TXT fourni par Ezoic
3. Clique sur "Start Verification"
4. Attends la propagation DNS (jusqu'à 72h)

---

## 📁 Structure des fichiers à créer

```
portfolio/
├── app/
│   └── blog/
│       └── layout.tsx          # Scripts Ezoic (blog uniquement)
├── components/
│   └── ads/
│       ├── EzoicAd.tsx         # Composant placeholder
│       └── EzoicProvider.tsx   # Provider pour navigation
├── public/
│   └── ads.txt                 # Ou redirection Netlify
└── netlify.toml                # Redirection ads.txt
```

---

## 🚀 Plan d'implémentation

1. [ ] Vérifier le domaine via DNS Record
2. [ ] Ajouter scripts Privacy + Header dans blog/layout.tsx
3. [ ] Créer redirection ads.txt dans Netlify
4. [ ] Créer composant EzoicAd.tsx avec placeholders
5. [ ] Gérer le rechargement des pubs à la navigation (useEffect)
6. [ ] Créer les placements dans le dashboard Ezoic
7. [ ] Tester avec le debugger (?ez_js_debugger=1)
