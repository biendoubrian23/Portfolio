/**
 * Dernière position connue du curseur.
 *
 * Les panneaux de prévisualisation s'ouvrent après un court délai : si la
 * souris ne bouge plus à ce moment-là, aucun `mousemove` ne leur parvient et
 * ils s'afficheraient dans le coin de l'écran. Ce suivi global leur donne une
 * position de départ correcte dès l'ouverture.
 */

let last = { x: 0, y: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener(
    'mousemove',
    (event) => {
      last = { x: event.clientX, y: event.clientY };
    },
    { passive: true }
  );
}

export function getPointer() {
  return last;
}
