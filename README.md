# ShaktiFlow

ShaktiFlow is a mobile-first progressive web app for Indian club, kettlebell, yoga, and breathwork practice. It quickly builds sessions around the time, tools, and focus you have on hand, keeps your logs tight to each plan, and surfaces the recovery insights you need to stay consistent.

## 🚀 Features

- **Quick Session Builder** – Set the minutes available, tap the equipment and focus themes (gada, mudgar, kettlebells, yoga, bodyweight), and ShaktiFlow auto-generates a balanced session with descriptions and breathwork.
- **Integrated Log** – Prefill your session into a structured log so you can capture sets, reps, loads, RPE, and notes without retyping the plan.
- **Topbar Compass & Insights** – A persistent status bar surfaces your streak, last log, and active focus while the Insights view tracks pattern balance, recovery cues, and the next session preview.
- **Knowledge Base Refresh** – Each movement and breath module now ships with how-to blurbs, focus themes, and quick filters to reinforce technique.
- **Offline-first PWA** – Install on mobile with manifest metadata, service worker caching, and responsive styling tuned for touch.

## 🧭 Project Structure

```
├── docs/                    # Ethos, knowledge base, and functional requirements
├── icons/                   # PWA icons (SVG)
├── src/
│   ├── components/          # Navigation
│   ├── data/                # Structured training data
│   ├── utils/               # Planner logic, storage, formatting helpers
│   └── views/               # UI views rendered with vanilla JS modules
├── index.html               # App shell
├── styles.css               # Tailored mobile-first styling
├── manifest.webmanifest     # PWA manifest
└── service-worker.js        # Offline caching strategy
```

## 🛠️ Local Development

No build step is required. Any static file server will work:

```bash
python -m http.server 5173
```

Then open [http://localhost:5173](http://localhost:5173) in your browser. The service worker only activates on served (non-file://) origins.

## 🧠 Data & Persistence

- All user data (planner inputs, generated sessions, logs) lives in `localStorage` under the key `shaktiflow-state-v1`.
- Planner logic consults the structured knowledge base in `src/data/knowledgeBase.js` and honours the functional requirements defined in `docs/function_requirements.md`.

## 📲 Installing the PWA

1. Serve the project (see above) and visit it on a mobile browser that supports PWAs (Chrome, Edge, Safari 16+).
2. Use “Add to Home Screen” / “Install App”.
3. Launch from the home screen for a full-screen experience with offline support.

## 🧪 Testing

There are no automated tests yet. Planner and logging flows can be validated manually by generating sessions, saving them, and verifying analytics updates.

## 📚 Documentation

Additional context lives in the `docs/` folder:

- `function_requirements.md` – Functional spec followed in this implementation.
- `ai_trainer_app_ethos.md` – Philosophical pillars and principles.
- `ai_trainer_app_knowledge_base.md` – Detailed movement taxonomy and logic.
- `sample_plan.md`, `dynamic_chart.md`, `muscles_worked.md` – Sample flows and anatomical rationale.
