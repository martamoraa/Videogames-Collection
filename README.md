# VG - La teva col·lecció de videojocs

## Temàtica i descripció

Catàleg de videojocs fet amb **Vue 3**. L'aplicació mostra una col·lecció de videojocs (títol, gènere, plataforma, any, desenvolupador, valoració i descripció) llegida des de **Cloud Firestore**, amb navegació entre vistes mitjançant **Vue Router**. Cada joc té una pàgina pròpia amb el tràiler (que s'inicia automàticament), un resum més extens i ressenyes de mitjans professionals. També inclou un formulari de registre i inici de sessió amb **Firebase Authentication** i un cercador. És la primera web amb Vue de l'assignatura *Web dinàmica* (Grau en Disseny Digital i Tecnologies Creatives).

**Web publicada:** `https://videogames-collection-e6bc7.web.app` 

## Instal·lació i execució

Requisits: Node.js 18 o superior i la CLI de Firebase (`npm install -g firebase-tools`).

```bash
# 1. Instal·lar dependències
npm install

# 2. Configurar Firebase: copia .env.example a .env i omple els valors
cp .env.example .env

# 3. Executar en local
npm run dev

# 4. Generar la versió de producció (carpeta dist/)
npm run build

# 5. Desplegar a Firebase Hosting i publicar les regles de Firestore
firebase login
firebase use --add          # selecciona el teu projecte
firebase deploy --only hosting,firestore:rules
```

### Carregar les dades a Firestore

1. A Firebase Console, activa **Cloud Firestore** (edició Estàndard, ID `(default)`, mode producció).
2. Descarrega una clau de compte de servei i desa-la com `serviceAccountKey.json` a l'arrel (**està al `.gitignore`, no es puja mai**).
3. Executa `npm run seed` per crear la col·lecció `videojocs` amb les dades de `data/videojocs.json`.

### Activar el registre d'usuaris

A Firebase Console: **Authentication > Començar > Mètode d'inici de sessió > Correu electrònic i contrasenya > Activar**.
El formulari demana un *usuari*; internament es converteix en un correu fictici (`usuari@videojocs.local`) perquè Firebase Authentication necessita un correu. No s'envia mai cap correu.

## Components propis

| Component | Funció |
|---|---|
| `NavBar.vue` | Capçalera amb el logo, els enllaços (`RouterLink`), l'accés d'usuari i el cercador. |
| `GameCard.vue` | Targeta d'un videojoc, enllaçada al seu detall. Rep el joc per props. |
| `StatusMessage.vue` | Mostra l'estat de càrrega, de llista buida o d'error. |
| `ReviewQuote.vue` | Mostra una ressenya d'un mitjà professional. Rep la ressenya per props. |

A més del component arrel `App.vue`, que conté `NavBar`, `RouterView` i el peu de pàgina.

## Exemples de comunicació amb props

**Llistat:**
- **Pare:** `GamesView.vue` (llegeix la col·lecció de Firestore, filtra pel cercador i recorre els resultats amb `v-for`).
- **Fill:** `GameCard.vue`.
- **Dades que es passen:** la prop `game`, un objecte amb els camps d'un document de Firestore.

```vue
<GameCard v-for="game in filtrats" :key="game.id" :game="game" />
```

**Detall:**
- **Pare:** `GameDetailView.vue`, que rep l'`id` del joc com a prop de la ruta (`props: true`).
- **Fill:** `ReviewQuote.vue`, que rep cada ressenya a la prop `review`.

Els fills declaren les props amb `defineProps` i només les mostren, sense modificar-les.

## Rutes

| Ruta | Vista | Contingut |
|---|---|---|
| `/` | `HomeView.vue` | Pàgina d'inici amb el títol i l'enllaç al catàleg. |
| `/games` | `GamesView.vue` | Llistat de videojocs llegits de Firestore, amb cercador. |
| `/games/:id` | `GameDetailView.vue` | Tràiler, resum ampliat i ressenyes d'un joc. |
| `/registre` | `AuthView.vue` | Formulari de registre i inici de sessió. |

`firebase.json` inclou una regla de *rewrite* cap a `/index.html`, de manera que l'accés directe i la recàrrega funcionen a la web publicada (mode `createWebHistory`).

## Cloud Firestore

- **Col·lecció:** `videojocs`
- **Camps principals:** `titol` (string), `genere` (string), `plataforma` (string), `any` (number), `desenvolupador` (string), `valoracio` (number), `descripcio` (string).
- **Camps opcionals (detall):** `trailer` (ID o URL de YouTube), `resum_llarg` (string o llista de strings) i `ressenyes` (llista de mapes amb `mitja`, `autor`, `nota`, `cita`, `original` i `url`). Si un document no els té, es fa servir la informació de `src/data/detalls.js`, enllaçada pel camp `titol`.
- **Vistes que en mostren les dades:** `GamesView.vue` (`/games`) i `GameDetailView.vue` (`/games/:id`), a través de `src/services/videojocs.js`.
- **Estats gestionats:** càrrega, sense dades, sense resultats de cerca, joc no trobat i error de lectura.
- **Regles (`firestore.rules`):** lectura pública només de `videojocs`; escriptures bloquejades.

### Captures de l'estructura de dades

*Afegeix aquí les captures de pantalla de Firestore (col·lecció `videojocs` i un document d'exemple).*

## Fonts de les ressenyes i tràilers

Les ressenyes són cites curtes de mitjans reals, traduïdes al català, amb el text original i l'enllaç a l'article. Els tràilers són vídeos de YouTube de canals oficials o dels propis desenvolupadors.

## Estructura del projecte

```
├── data/videojocs.json        # Dades de mostra
├── public/img/                # Logo i il·lustracions
├── scripts/seed.mjs           # Càrrega de dades a Firestore
├── src/
│   ├── components/            # NavBar, GameCard, StatusMessage, ReviewQuote
│   ├── views/                 # HomeView, GamesView, GameDetailView, AuthView
│   ├── data/detalls.js        # Tràilers, resums i ressenyes
│   ├── router/index.js
│   ├── services/              # videojocs.js (Firestore) i auth.js (Authentication)
│   ├── assets/main.css        # Estils
│   ├── firebase.js            # Inicialització de Firebase
│   └── App.vue
├── firebase.json
├── firestore.rules
└── .env.example
```
