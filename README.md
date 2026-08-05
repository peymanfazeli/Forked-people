# Life Decisions

A narrative decision game where you live through the lives of real historical figures — without knowing who you are until the final reveal.

> Simple mechanics. Deep stories. Strong curiosity.

---

## Table of Contents

- [What Is This Game?](#what-is-this-game)
- [How to Play](#how-to-play)
- [Scoring](#scoring)
- [Content Model](#content-model)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)

---

## What Is This Game?

**Life Decisions** is a mobile-first, narrative decision game based on the lives of historical people.

You enter the life of a famous person — **without being told who that person is**. The game presents important moments from that person's life. At each moment you make a simple decision: **YES** or **NO**. The story continues based on your choice.

The identity is hidden on purpose. The game is **not a history quiz** — you are never told "correct!" or "wrong!" during play. Instead you receive a narrative consequence and keep living the life. At the end, the identity is revealed and your path is compared with the real historical timeline.

Currently playable lives (6):

| Life | Years |
| --- | --- |
| Steve Jobs | 1955–2011 |
| Nikola Tesla | 1856–1943 |
| Bill Gates | 1955–present |
| Albert Einstein | 1879–1955 |
| Sadegh Hedayat | 1903–1951 |
| Fyodor Dostoevsky | 1821–1881 |

The game is fully localized in **English** and **Persian (فارسی)**, including right-to-left layout.

---

## How to Play

The core loop is:

```
Read → Decide → Discover → Continue
```

### Step by step

1. **Splash screen** — Choose your language (English / فارسی), then press **Begin Your Journey**.
2. **Intro** — A mysterious description sets the scene. The person's name is never shown.
3. **Historical event** — You see a **year**, a **chapter**, and a short historical situation.
4. **The question** — "What would *you* do?" You answer **YES** or **NO**. Both options are always plausible — neither is obviously correct.
5. **Consequence** — A short 1–3 sentence result of your choice.
6. **Continue** — The next event begins.
7. **Reveal** — After the final decision, the identity of the person is revealed.
8. **Results** — Your journey is scored and compared with real history.
9. **Replay** — **Play Again** with the same person, or **Another Life** with someone new.

### Progress dots

During play, a row of dots shows where you are in the journey:

- **Amber (solid)** — events you have already completed
- **Bright white (solid)** — decisions that are *definite*: every path from here will pass through them
- **Blurred** — possible decisions ahead that depend on choices you have not made yet

The total updates live based on the character's event graph, so the dots always reflect the real number of decisions remaining.

### What to expect

- The person's identity, portrait, and famous achievements are **never** spoiled early — the mystery is part of the game.
- You are encouraged to think "what would I do?", not "what answer does the game want?".
- At the end you'll see your **biggest divergence** from history and what happened on the real timeline instead.

---

## Scoring

Every decision has a hidden **historical** flag and a **weight**. Weight makes major turning points count more than minor ones.

### Historical Similarity

```
historical similarity =
( Σ weight of choices that match history ÷ Σ weight of all decisions ) × 100
```

### Risk & Independence

Every choice also carries `risk` and `independence` values (0–10). These are averaged over your decisions and shown as percentages.

```
Risk         = ( Σ risk of your choices ÷ number of decisions ) × 10
Independence = ( Σ independence of your choices ÷ number of decisions ) × 10
```

These are presented as game characteristics, not psychological measurements.

### Biggest Divergence

The most important moment where your choice differed from the real historical path — the differing decision with the **highest weight**. The results screen shows both your path and the real one side by side.

---

## Content Model

The game is fully data-driven. The frontend contains **no character-specific components** — the engine renders whatever data it is given.

### Character

```jsonc
{
  "id": "sadegh-hedayat",
  "name": "Sadegh Hedayat",
  "birthYear": 1903,
  "description": "A journey through the life of...",
  "scoring": { "historicalSimilarity": "...", "risk": "...", "independence": "...", "scoreRange": { "min": 0, "max": 100 } },
  "ending": { "title": "Your Fate as an Unknown Writer", "revealName": true },
  "events": [ ... ]
}
```

### Event

Each event is a decision point:

```jsonc
{
  "id": 1,
  "year": 1918,
  "chapter": "The Awakening",
  "title": "Encounter with New Literature",
  "playerFact": "As a teenager in Tehran, you stumble upon...",
  "historicalFact": "In your youth, you were deeply influenced by...",
  "question": "Do you immerse yourself in these translated stories?",
  "weight": 3,
  "yes": {
    "consequence": "You become fascinated by their dark, psychological atmospheres...",
    "historical": true,
    "risk": 4,
    "independence": 6,
    "nextEvent": 2
  },
  "no": {
    "consequence": "You reject these foreign influences...",
    "historical": false,
    "risk": 2,
    "independence": 4,
    "nextEvent": 20
  }
}
```

- **`nextEvent`** — where this branch leads. `null` means the journey ends.
- **`weight`** — how strongly this decision affects the final Historical Similarity score.
- **`historical`** — hidden from the player; whether this choice matches the real timeline.
- **`risk` / `independence`** — metadata used to build the player profile.
- **`historicalConsequence`** — an optional post-game text shown on the divergence screen.

### Branching & epilogues

A character contains a main story line (events `1 → 10`) plus alternative **epilogue** branches (ids `20+`). Choosing a non-historical path can lead you into a different epilogue — an alternate life that ends at a different point.

### Adding a new person

Adding a new historical life normally requires **one JSON file**, not new React code:

1. Create `src/data/<slug>.json` following the schema above.
2. Register it in `src/data/characters.ts`.
3. Optional: add a Persian overlay at `src/data/fa/<slug>.json` (same structure, only translated text fields — empty fields fall back to English).

---

## Architecture

```
App
 └── LanguageProvider (i18n + RTL)
      └── Game (useReducer state machine)
           ├── SplashScreen
           ├── GameIntro
           ├── GameView
           │    ├── ProgressDots
           │    ├── ChapterHeader
           │    ├── EventContext
           │    ├── QuestionBlock
           │    ├── ChoiceButtons
           │    └── ConsequenceBlock
           ├── IdentityReveal
           ├── ResultsView
           │    └── DivergenceHighlight
           └── SettingsMenu
```

### Game phases

Game flow is a single explicit state machine (no overlapping boolean states):

```
splash → intro → question → consequence → (question | reveal) → reveal → result
```

### Engine modules

| Module | Responsibility |
| --- | --- |
| `engine/gameState.ts` | `initialGameState` + `gameReducer` — pure state transitions between phases |
| `engine/scoring.ts` | `calculateResults` (historical similarity, risk, independence, biggest divergence), `getChoiceData` |
| `engine/progress.ts` | `computePathLengths` (max decisions remaining per event), `countGuaranteedRun` (convergent events) |
| `engine/audio.ts` | `AudioService` — plays UI/decision/reveal sounds and the looping background track, with volume fade and gesture-unlock |

### i18n

- `i18n/ui.ts` — the English and Persian UI dictionaries.
- `i18n/LanguageContext.tsx` — provider that persists the choice in `localStorage` and sets `dir`/`lang` on `<html>`.
- `i18n/useLanguage.ts` — the `useLanguage()` hook used by every UI component.
- Character text is localized at runtime in `data/characters.ts` by merging Persian overlay files.

---

## Technologies

### Core stack

| Technology | Purpose |
| --- | --- |
| **React 19** | UI framework — functional components + hooks only |
| **React DOM 19** | Rendering |
| **TypeScript (~6.0)** | Typed language; all source files are `.ts`/`.tsx` |
| **Vite 8** | Build tool and dev server (`@vitejs/plugin-react`) |

### Animation & visuals

- **Rive** (`@rive-app/react-canvas-lite`) — animated vector backgrounds rendered to canvas from `.riv` files. The gameplay background uses full-bleed `Cover` fitting and is rotated 90° (`rotate.riv`); the splash uses `Contain` (`earth.riv`).
- **Plain CSS** — no framework. A single `game.css` stylesheet with CSS custom properties (design tokens), a dark atmospheric "glassmorphism" theme, mobile-first responsive breakpoints, and `prefers-reduced-motion` support.
- **Self-hosted fonts** — Vazirmatn (`woff2`) for the Persian interface, applied via `[dir='rtl']` rules.

### Audio

- **Native Web Audio** — a small `AudioService` over `HTMLAudioElement` (no audio library). Sounds: click, decision, consequence, chapter, reveal, complete, plus a looping background track with a 2s fade-in and first-gesture unlock.

### Persistence (`localStorage`)

- `life-decisions-language` — language choice
- `life-decisions-volume` — sound volume
- `life-decisions-bg-music` — background music on/off
- `life-decisions-click` — click sounds on/off

### Tooling & scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `vite` | Start the dev server |
| `build` | `tsc -b && vite build` | Type-check then build for production |
| `lint` | `oxlint` | Lint the codebase |
| `preview` | `vite preview` | Preview the production build |

### Deliberate minimalism

The project intentionally avoids heavy dependencies. There is **no** CSS framework, no state-management library (React `useReducer` + Context suffice), no router, no animation library, and no test framework beyond deterministic engine logic. New features should reuse these primitives before adding packages.

---

## Project Structure

```
.
├── index.html
├── package.json
├── vite.config.ts
├── public/
│   ├── earth.riv                  # splash background
│   ├── rotate.riv                 # gameplay background (rotated 90°)
│   ├── rotation.riv, Universe.riv # unused background assets
│   ├── settings.png               # settings gear icon
│   ├── click.mp3, background_sound.mp3
│   └── fonts/Vazirmatn-{Regular,Bold}.woff2
└── src/
    ├── main.tsx                   # React entry point
    ├── App.tsx                    # providers, phase switch, backgrounds, settings
    ├── types.ts                   # shared data/game types
    ├── styles/game.css            # all styling (index.css is empty)
    ├── components/                # presentational + screen components
    ├── engine/                    # gameState, scoring, progress, audio
    ├── i18n/                      # ui dictionaries, LanguageContext, useLanguage
    └── data/                      # character JSON + fa/ Persian overlays
```

---

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (usually `http://localhost:5173`).

Production build and lint:

```bash
npm run lint
npm run build
npm run preview
```

### Adding a character (quick guide)

1. Create `src/data/<slug>.json` — copy an existing file as a template.
2. Keep 10–15 strong events with real turning points; give important decisions higher `weight`.
3. Give both YES and NO plausible consequences and set `historical` on the factually correct choice.
4. Register the file in `src/data/characters.ts` (roster + optional `fa` overlay).
5. Run `npm run lint && npm run build` to verify.
