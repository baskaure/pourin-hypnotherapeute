# pourin-hypnotherapeute.com — refonte 2026

Site statique (HTML/CSS/JS vanilla) pour Claire Pourin, hypnothérapeute & praticienne EMDR-DSA à La Rochelle.
Conçu pour Cloudflare Pages / Netlify (`_headers` + `_redirects` inclus).

## UI v2 « sanctuaire immersif »

Même DA (papier crème `#FBF6EE`, encre olive, corail `#E2636C`, sauge, doré, Manrope + DM Sans),
design modernisé : nav pilule flottante (blur), héro immersif plein écran (`sunset.webp` + cartes
stats en glassmorphism), marquee, chiffres clés XXL, process en lignes numérotées sur bande sauge,
cartes tarif « featured » sombres, FAQ en cartes arrondies, footer sombre arrondi, mots fantômes
géants sur les héros internes (`data-ghost` sur `.page-hero`), reveals en cascade + parallaxe légère.

## Structure

| Fichier | Page | Cible SEO |
|---|---|---|
| `index.html` | Accueil (ex-`lp-2.html`) — CSS/JS dédiés `home.css` + `home.js` | hypnothérapeute La Rochelle, EMDR La Rochelle |
| `accueil-v1.html` | Première proposition d'accueil, archivée (`noindex`), servie sur `/accueil-v1` et `/v1` | — |
| `hypnose-la-rochelle.html` | Hypnose adultes | hypnose La Rochelle |
| `emdr-la-rochelle.html` | Thérapie EMDR-DSA | EMDR La Rochelle |
| `hypnose-enfant-adolescent.html` | Enfants & ados | hypnose enfant La Rochelle |
| `tarifs.html` | Formules & tarifs (adultes) | tarif hypnose / EMDR |
| `a-propos.html` | Parcours, certifications, partenariats | — |
| `contact.html` | Contact & prise de RDV | — |
| `mentions-legales.html` | Mentions légales (noindex) | — |

Les liens internes utilisent des URLs propres (`/tarifs`, sans `.html`) : Cloudflare Pages
les sert nativement ; sur Netlify, activer « Pretty URLs » (Asset optimization).

## Bascule de la page d'accueil (sept. 2026)

La deuxième proposition est devenue la page d'accueil du site.

- `lp-2.html` → **`index.html`**, `lp-2.css` → **`home.css`**, `lp-2.js` → **`home.js`**.
- L'ancienne page d'accueil est archivée en **`accueil-v1.html`** : `noindex, follow`, canonique
  sur elle-même, données structurées retirées (elles décrivent `/`, elles vivent maintenant sur
  la nouvelle accueil) et bandeau `.archive-banner` en haut de page avec un lien de retour.
  Elle reste atteignable sur `/accueil-v1`, `/v1`, et depuis le pied de page de l'accueil
  (« Version précédente du site » — **une ligne à retirer avant la mise en ligne publique**).
- `_redirects` : `/lp-2` et `/lp-2.html` → `/` en 301, pour que le lien de prévisualisation
  envoyé à Claire continue de fonctionner.
- La nouvelle accueil a repris tout le SEO de l'ancienne : title, meta description, Open Graph,
  favicons, `canonical` sur `/`, JSON-LD (`LocalBusiness`, `Person`, `WebSite`, `WebPage`,
  `FAQPage`). Le `FAQPage` a été réécrit pour coller aux **quatre** questions réellement
  affichées — une `FAQPage` qui ne correspond pas au contenu visible est une pénalité.
- **Navigation du site** ajoutée sur l'accueil (EMDR, Hypnose, Enfants & ados, Tarifs, À propos,
  Contact + bouton rendez-vous), dans la pilule flottante du reste du site, avec un menu burger
  plein écran sous 1020 px (logique dans `home.js`, même comportement que `main.js` :
  `aria-expanded`, fermeture à Échap, body figé pour iOS). Pied de page en trois colonnes avec
  les vrais liens du site.
- Liens internes contextuels ajoutés depuis l'accueil vers `/emdr-la-rochelle`,
  `/hypnose-la-rochelle`, `/hypnose-enfant-adolescent`, `/tarifs`, `/a-propos` et `/contact` :
  la page d'accueil n'est plus une landing isolée, c'est le point d'entrée du site.
- `llms.txt` corrigé au passage : il annonçait encore « séance d'une heure : 100 €, base de
  4 séances », ce qui ne correspondait plus aux trois formules affichées partout ailleurs.

## Typographie unifiée (sept. 2026)

Tout le site utilise désormais la typo de la deuxième proposition : **Manrope** pour les titres,
**DM Sans** pour le texte, en une seule requête variable
(`family=DM+Sans:wght@400..700&family=Manrope:wght@400..800`) — deux fichiers woff2 par famille
au lieu des douze instances statiques demandées avant.

Ajustements rendus nécessaires par le changement de police (`styles.css`) :

- **Interlettrage proportionnel à la taille.** Manrope est une grotesque : là où Fraunces tenait
  avec `-.02em` partout, les gros titres demandent `-.042em` (h1), `-.035em` (h2) et presque rien
  en petit (`-.015em` pour h3, sinon les mots se collent dans les cartes).
- **Plus d'italique sur les titres.** Manrope n'a pas de vraie italique : le navigateur en
  fabriquait une penchée. Les huit règles concernées ont été nettoyées. L'italique n'est conservée
  que sur les petites notes en DM Sans, comme sur l'accueil.
- **L'accent des titres change de nature.** `h1 em / h2 em` n'est plus un mot en italique corail
  mais le **surlignage corail de l'accueil**, en `linear-gradient` avec `box-decoration-break:
  clone` pour qu'il suive les retours à la ligne. Sur fond sombre (héro de l'archive, cartes
  « featured »), le surlignage est désactivé et l'accent reste en `--coral-light`.
- **Mot fantôme allégé** (`data-ghost`) : en Manrope il remplit bien plus de surface qu'en
  Fraunces italique et passait devant le texte. Poids 400 et opacité ramenée de .05 à .032.
- Poids recalés : 480 → 500, 520 → 550, 560 → 600.

### En-tête et boutons : la page d'accueil s'aligne sur le reste du site

L'accueil avait la barre plate de la LP2, les autres pages la **pilule flottante** en
glassmorphism. C'est la pilule qui a été retenue, donc portée sur l'accueil : mêmes valeurs
(`position: fixed`, `top: clamp(.6rem, 1.4vw, 1rem)`, verre `rgba(255,253,248,.78)` + blur 18,
rayon 999 px, ombre portée), même géométrie (`max-width: 1200px`, marges internes
`1.2rem / .65rem`) et même hauteur mesurée — 66 px sur toutes les pages, à toutes les largeurs.
L'état `is-scrolled` a été ajouté à `home.js`, comme dans `main.js`.

Le verre est porté par `::before` et non par l'élément lui-même : un `backdrop-filter` sur
l'en-tête en ferait le bloc conteneur du menu mobile en `position: fixed`, qui se retrouverait
enfermé dans la pilule au lieu de couvrir l'écran.

L'en-tête flottant impose deux compensations dans `home.css` : `padding-top` sur le `body`, et
`scroll-padding-top: calc(var(--header-h) + 26px)` pour que les ancres (`#accompagnements`,
`#avis`…) ne se rangent pas sous la pilule.

Les **boutons primaires de l'accueil** (`.primary` : CTA du héro, CTA de clôture) passent du
sombre `--ink` au **corail `--coral-btn`** du reste du site, avec son ombre
`0 12px 28px -10px rgba(201,72,83,.6)` et son survol `--coral-deep`. Les boutons secondaires
(`.ghost`) restent en contour sombre, comme `.btn-ghost` ailleurs sur le site.

**Correctif attrapé au passage** : entre 1021 px (seuil du burger) et 1200 px, les six liens de
la nav plus le bouton ne tenaient pas sur une ligne — la pilule passait sur deux lignes et
débordait à droite de l'écran. Un palier intermédiaire resserre la nav et masque la baseline de
la marque sur cette plage.

## Lisibilité mobile (sept. 2026)

Retour de l'utilisateur : « trop de textes, sur mobile c'est presque illisible ». Deux leviers,
sans rien retirer comme information.

**Densité mobile (CSS, sous 620 px).** Le vrai coupable n'était pas le nombre de mots mais le
rythme vertical : `/a-propos` faisait 11,3 écrans de scroll pour 548 mots, `/hypnose-enfant-adolescent`
14,2 écrans pour 1 014 mots. Un bloc `@media (max-width: 620px)` en fin de `styles.css` et de
`home.css` resserre l'espacement des sections (`padding-block` de 3,8 rem à 2,5 rem), la taille des
titres, le remplissage des cartes, et les gabarits d'images (vignettes de partenaires passées de
16/10 à 16/7, photos en portrait de l'accueil raccourcies). Rien ne change au-dessus de 620 px.

**Textes resserrés.** Les paragraphes les plus longs ont été réécrits en gardant chaque fait,
chaque chiffre, chaque certification et chaque condition : `/tarifs` −15 % (708 → 603 mots),
`/hypnose-enfant-adolescent` −15 % (1 014 → 857), l'accueil −13 % (1 682 → 1 470). Sur les pages
déjà concises (`/contact`, `/emdr-la-rochelle`, `/hypnose-la-rochelle`, `/a-propos`), seuls
quelques paragraphes de plus de 35 mots ont été raccourcis.

Résultat en écrans de scroll sur un iPhone de 390 px :

| Page | Avant | Après |
|---|---|---|
| Accueil | 10,0 | 9,3 |
| Enfants & ados | 14,2 | 11,1 |
| Tarifs | 9,4 | 7,5 |
| À propos | 11,3 | 9,5 |
| EMDR | 8,1 | 7,1 |
| Hypnose | 7,3 | 6,5 |
| Contact | 7,5 | 6,6 |

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
  y compris la page d'accueil) intercepte les liens `calendly.com` et ouvre l'agenda par-dessus la
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

## Historique de la deuxième proposition (aujourd'hui la page d'accueil)

Anciennement `lp-2.html` / `lp-2.css` / `lp-2.js`, désormais `index.html` / `home.css` / `home.js`.
Les trois agendas Calendly ont été vérifiés sur le site actuel le 11 septembre 2026.

Mise à jour sept. 2026 :

- **Couleurs reprises de la première proposition** (papier crème `#FBF6EE`, encre olive `#3A3A2E`,
  corail, sauge, doré) — la typo propre à la LP2 (DM Sans + Manrope) est conservée.
- Section **« Votre thérapeute »** : grand portrait de Claire + paragraphe de parcours et
  certifications. Sur mobile ce portrait est masqué (le portrait du héro est déjà pleine largeur,
  sinon les deux photos font doublon).
- **Avis Google défilants** : marquee CSS, piste dupliquée par `home.js`, pause au survol et
  au focus clavier, désactivée si `prefers-reduced-motion`.
- **Formules en onglets** : *Adultes* / *Enfants, ados & parents* (`home.js`, pattern ARIA tablist,
  navigation aux flèches). Un lien `#panel-enfants` ouvre directement le bon onglet ;
  sans JavaScript, le `<noscript>` affiche les deux panneaux à la suite.
- Tous les liens de la page sont cliquables et résolvables (barre de preuve du héro, adresse du
  cabinet vers Google Maps, liens de pied de page, barre CTA mobile).

Simplification sept. 2026 (retour de Claire — « trop d'informations entre la séance découverte,
la séance d'urgence et le pack, alors que tout revient au même quand on sélectionne la séance ») :

- **La section « Prise de rendez-vous » a été supprimée.** Elle dupliquait les formules avec
  d'autres noms (séance découverte / parcours EMDR / appel gratuit) alors que les six CTA
  pointaient déjà vers les mêmes agendas. Il ne reste qu'**un seul bloc de décision** : la section
  `#accompagnements`, qui sert à la fois de grille tarifaire et de prise de rendez-vous.
  Tous les anciens liens `#rendez-vous` pointent désormais vers `#accompagnements`.
- **Une ligne explique ce que Claire trouvait déroutant** plutôt que de le masquer : « Tous les
  rendez-vous passent par le même agenda en ligne : vous choisissez votre créneau, le règlement
  se fait par carte bancaire sécurisée » (`.offers-help`), suivie du lien vers l'appel gratuit
  de 15 min — le seul parcours qui n'était plus représenté après la suppression du bloc.
- **Cartes formules raccourcies** : tag, titre, prix, une accroche, trois puces maximum, une note,
  le CTA. Les paragraphes de 6 à 8 lignes et les listes de 8 puces ont sauté.
- **FAQ : 6 → 4 questions.** « Séances à distance » est déjà couvert par la section cabinet, et
  « vais-je perdre le contrôle » a été replié dans la réponse sur le premier rendez-vous.
- **Nav resserrée** : « Les accompagnements » et « Prendre rendez-vous » menaient au même endroit ;
  il ne reste que le bouton « Voir les formules ».
- Résultat : **2 367 → ~1 470 mots** dans le `<main>`, page deux fois moins haute que la LP1
  (≈ 4 980 px contre 9 390 px en 1440 px de large).
- Les couleurs de la LP2 sont **déjà celles de la LP1** (même palette, vérifiée variable par
  variable). La typo a depuis été unifiée dans l'autre sens : tout le site est passé
  sur Manrope + DM Sans (voir « Typographie unifiée »).
- **Correctif** : `.offer h3 br{display:none}` (≤ 1050 px) collait les deux moitiés des titres
  (« Parcours5 séances ») ; une espace a été ajoutée avant chaque `<br>`.

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
  destiné aux lecteurs d'écran s'affichait dans chaque bouton de la LP2. Règle ajoutée à `home.css`.

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


Pour comparer les deux versions avec le serveur local (`python3 serve.py 8092`) :
- Page d'accueil actuelle (ex-deuxième proposition) : `http://localhost:8092/`
- Première proposition, archivée : `http://localhost:8092/accueil-v1`
