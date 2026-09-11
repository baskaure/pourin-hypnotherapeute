# pourin-hypnotherapeute.com — refonte 2026

Site statique (HTML/CSS/JS vanilla) pour Claire Pourin, hypnothérapeute & praticienne EMDR-DSA à La Rochelle.
Conçu pour Cloudflare Pages / Netlify (`_headers` + `_redirects` inclus).

## UI v2 « sanctuaire immersif »

Même DA (papier crème `#FBF6EE`, encre olive, corail `#E2636C`, sauge, doré, Fraunces + Karla),
design modernisé : nav pilule flottante (blur), héro immersif plein écran (`sunset.webp` + cartes
stats en glassmorphism), marquee, chiffres clés XXL, process en lignes numérotées sur bande sauge,
cartes tarif « featured » sombres, FAQ en cartes arrondies, footer sombre arrondi, mots fantômes
géants sur les héros internes (`data-ghost` sur `.page-hero`), reveals en cascade + parallaxe légère.

## Structure

| Fichier | Page | Cible SEO |
|---|---|---|
| `index.html` | Accueil | hypnothérapeute La Rochelle, EMDR La Rochelle |
| `hypnose-la-rochelle.html` | Hypnose adultes | hypnose La Rochelle |
| `emdr-la-rochelle.html` | Thérapie EMDR-DSA | EMDR La Rochelle |
| `hypnose-enfant-adolescent.html` | Enfants & ados | hypnose enfant La Rochelle |
| `tarifs.html` | Consultations & tarifs | tarif hypnose / EMDR |
| `a-propos.html` | Parcours, certifications, partenariats | — |
| `contact.html` | Contact & prise de RDV | — |
| `mentions-legales.html` | Mentions légales (noindex) | — |

Les liens internes utilisent des URLs propres (`/tarifs`, sans `.html`) : Cloudflare Pages
les sert nativement ; sur Netlify, activer « Pretty URLs » (Asset optimization).

## Avant la mise en ligne

1. **Mentions légales** : compléter le SIRET et l'hébergeur dans `mentions-legales.html` (marqués `[...]`).
2. **Lien avis Google** : remplacer les liens `google.com/maps/search/?api=1&query=...` par le lien
   court officiel de la fiche Google Business Profile (bouton « Demander des avis » → lien direct).
3. **Redirections** : `_redirects` mappe toutes les anciennes URLs WordPress en 301 —
   vérifier après bascule DNS que `/about/`, `/seance-de-therapie-emdr-dsa/`, etc. redirigent bien.
4. **Search Console** : soumettre `sitemap.xml`, demander une réindexation des pages principales.
5. Les 4 anciens articles de blog ne sont pas repris (contenu très faible / dupliqué) ; leurs
   catégories redirigent vers les pages services. Si tu veux les recréer un jour, viser des
   articles longs uniques (ex. « EMDR ou hypnose : que choisir ? »).

## Conversion — choix faits

- 2 CTA partout : **Réserver une séance découverte** (Calendly `votrerendezvous`, paiement CB)
  et **Appel gratuit de 15 min** (Calendly `al-proux/60min`, friction minimale).
- Barre CTA collante en bas d'écran sur mobile.
- Preuve sociale remontée (badge 5,0/71 avis dans le héro + 6 extraits d'avis).
- Tarif affiché sans détour (100 €/h) + FAQ objections (peur de l'hypnose, psychologue, remboursement).
- Parcours EMDR « personnes déjà rencontrées » : Calendly `seance-emdr-avec-claire-pourin`
  (présent sur /tarifs et /contact).

## Local

```bash
python3 serve.py            # http://localhost:8080 — URLs propres (/tarifs, /contact…) comme en prod
# ou, sans URLs propres : python3 -m http.server 8080 (naviguer avec les .html)
```

Images sources dans `input/` (les `.jpg` sont les originaux, les `.webp` les versions servies).

## Deuxième proposition — landing page simple

`lp-2.html` et `lp-2.css` : proposition indépendante, claire et moderne, avec les trois
agendas Calendly vérifiés sur le site actuel le 11 septembre 2026. La première
proposition et ses styles restent inchangés.

Les trois boutons ouvrent l'agenda en **popup Calendly** par-dessus la page (widget officiel
`assets.calendly.com/assets/external/widget.js`), sans quitter le site. Les liens gardent leur
`href` + `target="_blank"` : si le script Calendly est bloqué, le clic retombe sur l'ouverture
classique dans un nouvel onglet.

Pour présenter les deux versions avec le serveur local :
- Première proposition : `http://localhost:8092/`
- Deuxième proposition : `http://localhost:8092/lp-2`

Lancer `python3 serve.py 8092` depuis ce dossier. La seconde page est en `noindex`
pendant la comparaison des propositions.
