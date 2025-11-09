# Functional Requirements — AI Trainer PWA

## 1. Platform & Performance
- The app must function as a Progressive Web App (PWA) that can be installed on modern mobile browsers.
- Provide an application manifest, icons, and a service worker that caches core assets for offline usage.
- Optimise for single-thumb mobile interaction: large tap targets, clear visual hierarchy, and responsive layout.

## 2. Navigation & Information Architecture
- Present a primary navigation system that surfaces at least: **Home**, **Planner**, **Log**, **Insights/Analytics**, and **Knowledge Base** views.
- Each view must be self-contained and accessible without page reloads.

## 3. Home View
- Surface a "Today" snapshot summarising:
  - The next recommended session (derived from the planner rules).
  - Recent training streak and last logged session.
  - Quick actions to jump to planning or logging flows.
- Display ethos reminders or motivational cues derived from the ethos document.

## 4. Dynamic Planner
- Collect the following inputs: time of day, available duration, available equipment (multi-select), desired emphasis (fat burn / strength / flow / recovery), perceived readiness (energy level) and any sore muscle groups.
- Generate a session proposal that includes:
  - Warm-up / mobility block.
  - Main strength or flow blocks hitting at least three movement patterns.
  - Breathwork / recovery finisher suggestion.
- Reference the knowledge base movement taxonomy to avoid repeating the same heavy pattern inside a 48-hour window (based on logged history).
- Allow the generated session to be saved to the log with one tap.

## 5. Workout Logging
- Provide a form to capture workout details: date/time, duration, movement patterns performed, exercises (editable list), load/reps/sets summary, RPE, notes, and breathwork completed.
- Persist entries locally (offline-first) and display them in reverse chronological order.
- Allow editing the notes/RPE of existing entries.

## 6. Analytics & Recovery Guidance
- Aggregate logged data to show:
  - Weekly volume count per movement pattern.
  - Recovery advisories highlighting neglected or overused patterns.
  - Streak tracking and energy trends based on RPE.
- Surface an actionable recommendation for the next session, referencing planner logic and soreness flags.

## 7. Knowledge Base View
- Expose structured sections for ethos, equipment ecosystem, movement taxonomy, yoga/pranayama modules, and sample workout plans.
- Provide quick-filter chips (e.g., Movement Pattern, Tool) to let the user inspect relevant exercises and cues.

## 8. Data & Persistence
- Store all user-generated data (logs, preferences, saved sessions) in `localStorage` with graceful degradation if unavailable.
- Ensure planner suggestions use stored history when available and fallback to defaults if no history exists.

## 9. Accessibility & Guidance
- Implement semantic HTML with ARIA labels where necessary.
- Provide inline coaching cues (breathing, technique) sourced from the knowledge base for each exercise suggestion.
- Offer contextual tips when inputs might lead to overtraining (e.g., warn if requesting heavy hinge work within 48h of a logged heavy hinge session).

## 10. Documentation
- Update the project README with setup instructions, development notes, and a high-level architecture description.
