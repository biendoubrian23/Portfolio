# Audit PageSpeed / Lighthouse

Mesures prises sur le **build de production** (`npm run build` puis `next start`),
avec Lighthouse et les réglages de PageSpeed Insights : profil mobile bridé
(processeur ×4, 1,6 Mb/s, 150 ms de latence) et profil bureau.

## Résultats

| Page | Profil | Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | --- | --- | --- | --- | --- |
| Accueil | Bureau | 99 | 100 | 100 | 100 |
| /projets | Bureau | 100 | 100 | 100 | 100 |
| /apps | Bureau | 100 | 100 | 100 | 100 |
| Accueil | Mobile | 92 | 100 | 100 | 100 |
| /projets | Mobile | 92 | 100 | 100 | 100 |
| /apps | Mobile | 95 | 100 | 100 | 100 |

## Ce qui a été corrigé pour y arriver

**Accessibilité — de 82 à 100**

- Bouton de dépliage du menu mobile : nom accessible et état `aria-expanded`
- Liens LinkedIn (barre et pied de page) : ils n'avaient aucun texte lisible
  par un lecteur d'écran
- Contrastes insuffisants : gris trop clairs remontés d'un cran, et bouton
  « Mes apps » passé en violet plus soutenu (le blanc sur violet 500 ne
  passait pas le seuil)
- Ordre des titres : un `h4` suivait un `h2` dans la section formations
- `aria-label` posé sur un `span` sans rôle : rôle `img` ajouté

**Performance — de 88 à 99 (bureau) et 92 (mobile)**

- Sections hors écran en rendu différé (`content-visibility`) : le premier
  rendu ne paie plus la mise en page de tout le document — 1 240 ms de calcul
  de style économisés
- Badge rotatif du hero isolé sur sa propre couche : sa rotation sans fin
  faisait repeindre le document et repoussait la mesure du LCP
- Toutes les images déclarent leurs dimensions réelles (aucun décalage de
  mise en page : CLS à 0)
- Captures de sites déclinées en version 480 px pour les petits écrans
  (1,6 Mo → 647 Ko sur la page applications)
- Icône du site recompressée : 92 Ko → 27 Ko
- Police à chasse fixe sortie du chemin critique (elle ne sert qu'au blog)
- Cible de navigateurs modernisée : plus de rustines pour vieux moteurs

## Ce qui reste, et pourquoi

Le profil mobile de PageSpeed bride le processeur d'un facteur 4 et la bande
passante à 1,6 Mb/s. Ce qui reste tient à la taille du document d'accueil et
au socle JavaScript de Next.js (27 Ko non utilisés dans le chunk du
framework, que l'on ne peut pas retirer sans quitter le framework). En
conditions réelles, les trois pages se chargent nettement plus vite que ce
que montre cette mesure bridée.
