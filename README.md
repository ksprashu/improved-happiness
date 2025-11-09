# AI Club Coach

A mobile-first progressive web app that fuses Indian club training, kettlebell strength, yoga, and breathwork into a personalised training experience. The app generates daily sessions, helps you log strength and flow work, and highlights recovery signals so you can train with consistency.

## 🚀 Features

- **Dynamic Planner** – Input time, duration, equipment, energy, and soreness to get a balanced session with warm-up, main work, and breathwork. Planner respects recent workload to avoid overtraining specific patterns.
- **Training Log** – Capture movement patterns, exercise prescriptions, load notes, RPE, and reflections. Offline-first local storage keeps data on-device.
- **Insights Dashboard** – Visualise weekly pattern coverage, average RPE, streaks, and recovery advisories, with a suggested next session.
- **Knowledge Base** – Explore ethos pillars, equipment ecosystem, movement library with filters, breath modules, and the dynamic day-picker plan.
- **PWA Ready** – Installable on mobile with offline caching via a service worker and custom iconography.

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

- All user data (planner inputs, generated sessions, logs) lives in `localStorage` under the key `ai-club-coach-state-v1`.
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
