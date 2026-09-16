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
| `tarifs.html` | Formules & tarifs (adultes) | tarif hypnose / EMDR |
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
- **Offres** (refonte sept. 2026, d'après la stratégie envoyée par Claire) : trois formules par public.
  - *Adultes* (`/tarifs`) : parcours 5 séances **500 €** (barré 525 €, valable 3 mois),
    séance ponctuelle/d'urgence **120 €**, séance de suivi **100 €**.
  - *Enfants, ados & parents* (`/hypnose-enfant-adolescent#formules`) : parcours 5 séances **500 €**,
    séance ponctuelle **120 €**, entretien parental **100 €**.
  - Le parcours = 1 séance d'anamnèse + 4 séances de travail thérapeutique.
  - Moyenne de thérapie brève affichée partout : **5 séances** (et non 4).
- Positionnement : **praticienne EMDR-DSA en priorité**, puis hypnose, puis psychopratique
  (titres, nav, marquee, JSON-LD). Mentions ajoutées : *psychopraticienne certifiée* et
  *exercice en libéral depuis 2023*.
- FAQ objections (peur de l'hypnose, psychologue, remboursement).
- Parcours EMDR « personnes déjà rencontrées » : Calendly `seance-emdr-avec-claire-pourin`
  (présent sur /tarifs et /contact).
- **Popup Calendly sur tout le site** : `calendly-popup.js` (chargé par toutes les pages,
  y compris `lp-2.html`) intercepte les liens `calendly.com` et ouvre l'agenda par-dessus la
  page via le widget officiel, sans quitter le site. Le script est injecté seulement si la page
  contient un lien Calendly, et les liens gardent leur `href` + `target="_blank"` : si le widget
  est bloqué (réseau, bloqueur de scripts) le clic retombe sur l'ouverture en nouvel onglet.
  Ctrl/Cmd/clic milieu ouvrent toujours un onglet.

## Local

```bash
python3 serve.py            # http://localhost:8080 — URLs propres (/tarifs, /contact…) comme en prod
# ou, sans URLs propres : python3 -m http.server 8080 (naviguer avec les .html)
```

Images sources dans `input/` (les `.jpg` sont les originaux, les `.webp` les versions servies).

### Photos du cabinet (mise à jour sept. 2026)

| Fichier servi | Contenu | Utilisé par |
|---|---|---|
| `claire.webp` (900×1100) | Portrait de Claire | accueil, à propos, LP2 (section « Votre thérapeute ») |
| `cabinet.webp` (800×1066) | Le salon — les deux fauteuils | vignette de l'accueil |
| `cabinet-wide.webp` (1200×800) | Le salon, cadrage paysage | galerie /contact, section cabinet de la LP2 |
| `cabinet-2.webp` (800×1066) | Le coin lecture, fauteuil bouclette | galerie /contact, **héro de la LP2** |
| `cabinet-3.webp` (800×1066) | L'espace enfants & ados | page enfants & ados, galerie /contact, LP2 |

Sur la LP2, chaque photo n'apparaît **qu'une seule fois** : le héro montre le coin lecture
(le portrait y faisait doublon avec la section « Votre thérapeute » juste dessous), et la section
cabinet montre le salon + l'espace enfants côte à côte. Le portrait de la section thérapeute est
désormais visible sur mobile, avec son cartouche sous la photo plutôt que superposé.

Tous les gabarits d'images ont un `aspect-ratio` + `object-fit: cover` en CSS : remplacer une photo
par une autre de proportions différentes ne casse pas la mise en page.

## Deuxième proposition — landing page simple

`lp-2.html`, `lp-2.css` et `lp-2.js` : proposition indépendante, claire et moderne, avec les trois
agendas Calendly vérifiés sur le site actuel le 11 septembre 2026.

Mise à jour sept. 2026 :

- **Couleurs reprises de la première proposition** (papier crème `#FBF6EE`, encre olive `#3A3A2E`,
  corail, sauge, doré) — la typo propre à la LP2 (DM Sans + Manrope) est conservée.
- Section **« Votre thérapeute »** : grand portrait de Claire + paragraphe de parcours et
  certifications. Sur mobile ce portrait est masqué (le portrait du héro est déjà pleine largeur,
  sinon les deux photos font doublon).
- **Avis Google défilants** : marquee CSS, piste dupliquée par `lp-2.js`, pause au survol et
  au focus clavier, désactivée si `prefers-reduced-motion`.
- **Formules en onglets** : *Adultes* / *Enfants, ados & parents* (`lp-2.js`, pattern ARIA tablist,
  navigation aux flèches). Un lien `#panel-enfants` ouvre directement le bon onglet ;
  sans JavaScript, le `<noscript>` affiche les deux panneaux à la suite.
- Tous les liens de la page sont cliquables et résolvables (barre de preuve du héro, adresse du
  cabinet vers Google Maps, liens de pied de page, barre CTA mobile).

Harmonisation sept. 2026 (LP1 ↔ LP2) :

- **Les trois formules sont mises en avant dès l'accueil** (`index.html`) sous forme de trois cartes —
  parcours 5 séances 500 €, séance ponctuelle 120 €, séance de suivi 100 € — au lieu d'une seule
  carte « parcours » accompagnée d'un paragraphe. Même présentation que les onglets de la LP2.
- **Structure de carte identique des deux côtés** : tag (`⭐ LE PLUS COMPLET`, `🌿 BESOIN PONCTUEL`,
  `🤍 DÉJÀ ACCOMPAGNÉ·E` / `🤍 POUR LES PARENTS`) puis titre, prix, accroche, détail.
  Appliqué à `index.html`, `tarifs.html` et `hypnose-enfant-adolescent.html`.
- **Prix vérifiés identiques sur les deux propositions** : seules les valeurs 500, 525, 120 et 100 €
  apparaissent sur l'ensemble du site.
- **Informations reprises de la LP1 vers la LP2** : second CTA « appel gratuit de 15 min » et bandeau
  de réassurance dans le héro, cadre tarifaire sous les formules (paiement, mutuelles, report 48 h),
  communes desservies dans la section cabinet, et la FAQ (six questions, ancre `#questions`).
- **Correctif** : la classe `.sr-only` n'était définie nulle part — le texte « (agenda Calendly) »
  destiné aux lecteurs d'écran s'affichait dans chaque bouton de la LP2. Règle ajoutée à `lp-2.css`.

## Icônes (plus aucun emoji)

Les emojis ont été remplacés par des **icônes SVG inline** (classe `.icon`, `stroke: currentColor`,
taille en `em`) : elles prennent la couleur et la taille du texte qui les entoure et s'affichent
à l'identique sur toutes les plateformes, contrairement aux emojis rendus par la police système.

| Avant | Après | Où |
|---|---|---|
| ⭐ | icône étoile | tag « LE PLUS COMPLET » des cartes formule |
| 🌿 | icône feuille | tag « BESOIN PONCTUEL » |
| 🤍 | icône cœur | tags « DÉJÀ ACCOMPAGNÉ·E » / « POUR LES PARENTS » |
| ☏ ✎ ✉ | icônes téléphone, agenda, enveloppe | pastilles des cartes de `/contact` |
| ⚑ | icône repère de carte | adresse du cabinet sur `/contact` |
| 😊 | — | supprimé : il était dans la citation d'un avis Google, remplacé par un point |

Les glyphes typographiques du système de design (`✦` des listes, `★` des notes, `↗` et `→` des liens)
sont conservés : ce sont des caractères texte, pas des emojis. L'astérisque `✳` des sur-titres porte
désormais le sélecteur de variante texte (`\FE0E`) pour qu'aucune plateforme ne le rende en couleur.

**À faire avant mise en ligne** : les six CTA de formules pointent tous vers les agendas Calendly
existants (`votrerendezvous` pour les nouvelles demandes, `seance-emdr-avec-claire-pourin` pour le
suivi). Si Claire crée un agenda dédié par formule (parcours 5 séances, séance ponctuelle,
entretien parental…), remplacer les liens en conséquence.


Pour présenter les deux versions avec le serveur local :
- Première proposition : `http://localhost:8092/`
- Deuxième proposition : `http://localhost:8092/lp-2`

Lancer `python3 serve.py 8092` depuis ce dossier. La seconde page est en `noindex`
pendant la comparaison des propositions.
