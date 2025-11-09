# AI Trainer App – Knowledge Base (Markdown + JSON)

> Version: 1.1 • Date: 2025‑11‑09 • Scope: Workout generation, tracking, AI guidance, and progress analytics built on compound, full‑body Indian physical culture + yoga/pranayama.

---

## 1) Core Ethos & Objectives

* **Ethos:** Movement → Mechanics → Metabolism → Mind.
* **Primary Goals:** Maximal fat burn & EPOC, cardio fitness (VO₂↑), posture & strength, restorative sleep, focused state.
* **Training Pillars:** Movement before muscle, Breath before intensity, Consistency before complexity, Flow before formality.
* **Programming Tenets:** Compound multi‑joint moves, rotational strength, yoga‑based recovery, no redundant fatigue.

---

## 2) User Equipment Inventory

* Gada (mace): 4–6 kg start, 8–12 kg goal.
* Mudgar: single adjustable (3–5 kg), two‑hand option, future dual pair.
* Dumbbells with plates (1.25 – 10 kg), adjustable kettlebell (3–16 kg), resistance bands (loop/long), ankle weights (2 kg × 2), bench, yoga mat.

---

## 3) Functional & Feature Requirements

### **A. User Profile & Inputs**

1. **User Setup**

   * Name, age, weight, gender (optional for metrics).
   * Equipment availability checkboxes.
   * Time-of-day preference (morning/evening/both).
   * Fitness goal: Fat Burn / Strength / Mobility / Recovery / Mix.
   * Experience level (Beginner, Intermediate, Advanced).
   * Current pain or injury log (shoulder, back, wrist etc.).

2. **Dynamic Inputs Per Session**

   * Time available (in minutes).
   * Energy level (1–5 scale).
   * Muscle soreness feedback (per region).
   * Mood/stress level (optional; for yoga/breathwork bias).

---

### **B. AI Workout Generation System**

1. **Inputs processed by AI Engine:**
   Time of day + available duration + equipment list + last 7‑day training log + recovery scores.
2. **Session Generator:**

   * Selects workout blueprint (micro, strength burn, or full flow).
   * Chooses movements ensuring coverage of lower, upper, and core.
   * Avoids consecutive heavy hits on same pattern (≥48 h rest window).
   * Auto‑attaches yoga/pranayama block.
   * Adjusts intensity based on fatigue level & progression logic.
3. **Output:**

   * Full session card with step‑by‑step guidance (text, animation/video).
   * Voice or text prompts for breathing and tempo.
   * End‑of‑session summary: calories, focus area, next suggestion.

---

### **C. Workout Logging & Analytics**

1. **Logging UI:**

   * Exercise name, sets, reps, load, rest, RPE.
   * Optional fields: mood, energy, soreness.
2. **Visualization:**

   * Weekly volume by pattern (hinge/squat/push/pull/rotate).
   * Recovery heatmap (color-coded body chart).
   * Strength progress graph (load vs time).
   * Conditioning trend (total work/time).
3. **Intelligent Insights:**

   * Suggest deload/recovery if fatigue elevated.
   * Highlight missed patterns (“No hinge work in 3 days”).
   * Recommend progression (add 1 kg or 2 reps).
   * Estimate EPOC/fat‑burn index per week.

---

### **D. Guidance & Coaching Layer**

1. **Workout Flow Screen:**

   * Sequential step display (exercise card + form cues + breath prompts).
   * Inline video (looping, silent optional).
   * Text-to-speech voice instruction option.
2. **Real-time Guidance:**

   * Repetition counter (manual or motion detection).
   * Set timers (AMRAP, interval, EMOM modes).
   * Audio cues for breath pacing and rest.
3. **Post-Workout Module:**

   * Suggest cool‑down asanas & breathwork.
   * Log soreness & recovery notes.
   * Reflective “how did you feel?” check‑in for focus and motivation index.

---

### **E. Knowledge & Education Module**

* “Learn” tab with brief descriptions of traditional training tools (Gada, Mudgar, Dand, Baithak) and philosophy.
* Library of Asanas & Pranayama with short guided videos.
* FAQ for training safety & progression.

---

### **F. AI Coaching Logic (Backend)**

* Maintain user state model: pattern fatigue map, progression score, recovery coefficient, sleep correlation.
* Update database with each log; train local model for adaptive recommendations.
* Generate daily insights & push reminders (gentle, mindful tone).
  Example: *“You’ve had 2 heavy hinge days — try a rotational + yoga flow today.”*

---

### **G. Settings & Integrations**

* Sync with wearables (optional): HR, HRV, sleep, VO₂ estimate.
* Export logs (CSV/JSON).
* Local storage fallback for privacy (no mandatory cloud sync).
* Night mode / low‑distraction UI.

---

### **H. Stretch Features (Future Roadmap)**

* Adaptive breath cueing based on HR (biofeedback).
* Vision-based form feedback via phone camera.
* Gamified progress streaks & community leaderboard (opt‑in).
* Integration with nutrition or fasting trackers.

---

## 4) Output Requirements (for Codex Integration)

### **Workout Plan JSON Schema Example**

```json
{
  "date": "2025-11-10",
  "duration": 25,
  "focus": "strength_burn",
  "equipment": ["dumbbells", "mudgar", "bands"],
  "blocks": [
    {"type": "warmup", "content": ["cat-cow", "shoulder circles"]},
    {"type": "main", "content": ["DB-GOBLET-SQUAT 3x10", "DB-ROW 3x10", "MUD-MILL-TWOHAND 3x8"]},
    {"type": "breathwork", "content": ["Anulom Vilom 3 min"]}
  ],
  "summary": {"patterns": ["squat","pull","rotate"], "est_calories": 230}
}
```

---

## 5) Analytics & Data Ethics

* All insights are guidance, not prescription.
* Encourage rest and body awareness.
* Privacy-first: no external cloud analytics unless user opts in.

---

## 6) Core Development Deliverables

| Module                    | Description                                             | Priority |
| ------------------------- | ------------------------------------------------------- | -------- |
| Workout Generator         | AI model that selects exercises & intensity dynamically | ⭐⭐⭐⭐     |
| Workout Logger            | Database + UI for input of sets/reps/load               | ⭐⭐⭐⭐     |
| Guidance Engine           | Real-time instruction (text/video/voice)                | ⭐⭐⭐      |
| Progress Analytics        | Trend visualization + fatigue guardrails                | ⭐⭐⭐      |
| Yoga/Pranayama Module     | Guided sequences + scheduling                           | ⭐⭐       |
| Knowledge Library         | Static info pages on philosophy & tools                 | ⭐        |
| Wearable Integration      | HR/HRV sync, optional                                   | ⭐        |
| Form Feedback (Vision AI) | Optional advanced feature                               | ⭐        |

---

## 7) Long-Term Vision

A hybrid training ecosystem where **ancient Indian movement systems meet adaptive AI**, delivering personalized, evidence-based, soulful fitness: strong body, calm mind, stable nervous system.

---
