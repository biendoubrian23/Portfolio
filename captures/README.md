# Captures de vérification

Captures prises automatiquement dans Chrome (Puppeteer) sur le site lancé en
local, après chaque implémentation. Elles servent de preuve visuelle des
modifications et de garde-fou : le script relève aussi les erreurs console et
les requêtes échouées (résultat dans `_rapport.txt`).

Méthode : les pages entières sont assemblées écran par écran, en laissant à
chaque section le temps de terminer son animation d'apparition, avec les
barres fixes neutralisées pour qu'elles ne se répètent pas.

## Accueil

| Fichier | Ce qu'il montre |
| --- | --- |
| `01-accueil-hero-3-boutons.webp` | Les trois boutons du hero : Me contacter, Mes réalisations, Mes apps |
| `02-savoir-faire-carousel.webp` | Section 2 : le carousel infini des savoir-faire (icônes colorées, sans bloc de fond) |
| `03-savoir-faire-survol-preuve.webp` | Au survol d'une capacité : la vignette de preuve rattachée à un projet réel |
| `04-accueil-4-projets.webp` | Les 4 projets mis en avant et le bouton « Voir tous les projets » |
| `05-accueil-loupe-scrollante.webp` | Au survol d'un projet : la loupe qui fait défiler le site réel |
| `06-accueil-pleine-page.webp` | La page d'accueil entière |

## Page « Mes projets » (`/projets`)

| Fichier | Ce qu'il montre |
| --- | --- |
| `07-projets-entete.webp` | En-tête et filtres |
| `08-projets-filtre-clients.webp` | Filtre « Réalisations clients » : les 5 projets livrés |
| `09-projets-filtre-produits.webp` | Filtre « Mes produits » : les 5 produits et leurs badges de stores |
| `10-projets-pleine-page.webp` | La page entière |

## Page « Mes applications » (`/apps`)

| Fichier | Ce qu'il montre |
| --- | --- |
| `11-apps-entete.webp` | La page refaite : les deux anciennes apps ont été retirées |
| `12-apps-cosmecheck-badges.webp` | CosmeCheck : badges App Store et Google Play actifs |
| `13-apps-badges-bientot.webp` | Memory Pilot : Google Play actif, App Store en « Bientôt » |
| `14-apps-pleine-page.webp` | La page entière |

## Mobile (390 × 844, densité ×2)

| Fichier | Ce qu'il montre |
| --- | --- |
| `15-mobile-accueil-pleine-page.webp` | Accueil |
| `16-mobile-projets-pleine-page.webp` | Mes projets |
| `17-mobile-apps-pleine-page.webp` | Mes applications |
