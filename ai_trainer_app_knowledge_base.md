# AI Trainer App – Knowledge Base (Markdown + JSON)

> Version: 1.0 • Authoring date: 2025‑11‑09 • Scope: Workout generation, guidance, logging, & progression built on compound, full‑body, Indian physical culture + yoga/pranayama • Target outcomes: fat loss (belly/chest), VO₂, EPOC, sleep & focus

---

## 1) Core Ethos & Objectives

- **Ethos:** Movement → Mechanics → Metabolism → Mind. Prioritize joint‑friendly compound patterns that recruit large muscle groups and core through rotational/anti‑rotational control. Breath leads movement.
- **Primary goals:**
  - Maximal **fat burn** and **EPOC** via large‑muscle compound work and metabolic circuits.
  - **Cardio fitness** (VO₂↑) via rhythmic flows (baithak/dand, KB swings, gada/mudgar swings).
  - **Strength & posture** via hinge, squat, push, pull, carry, rotate.
  - **Recovery & sleep** via yoga asana + pranayama (cortisol↓, HRV↑).
- **Programming tenets:** Consistency > intensity; technique > load; progress by load/volume/density/complexity; avoid repeated localized fatigue inside 48h.

---

## 2) User Equipment Inventory (inputs for plan & tracking)

**Traditional / rotational**
- Gada (mace): *current plan* 4–6 kg start, progress to 8–12 kg.
- Mudgar (Indian club): single adjustable (3 kg or 5 kg); option for pair (2 × 5 kg adjustable); include **two‑hand mudgar** variants.
- Samtola (dual‑ended club): optional future, recovery/flow emphasis.

**Free weights & accessories**
- Dumbbell plates: 1.25 kg ×4, 2.5 kg ×4, 5 kg ×4, 10 kg ×1 (with bars).
- Adjustable kettlebell: 3–16 kg.
- Resistance bands: various tensions (loop + long).
- Ankle weights: 2 kg ×2 (can be strapped to implements/body for progression).
- Bench & yoga mat.

These items must be modeled as **capabilities** (e.g., max_load, bilateral/unilateral, ballistic/strict, lever_length, impact_level) for exercise selection and progression.

---

## 3) Movement Taxonomy (selection & coverage)

**Primary patterns**
- **Hinge** (posterior chain): KB swing, DB RDL, gada 10‑to‑2.
- **Squat** (anterior + glute): baithak, goblet squat, chair pose (Utkatasana).
- **Push** (horizontal/vertical): dands/Indian push‑ups, DB floor press, overhead press.
- **Pull** (horizontal): DB row, band row, bodyweight row (table).
- **Rotate / Anti‑rotate**: gada 360°, mudgar mills, halos, Pallof press (band), plank variations.
- **Carry / Brace**: farmer hold (DB/KB), overhead holds (gada/mudgar), suitcase carries.
- **Mobility/Recovery**: yoga flows (Sun Salutation), hip openers, spinal waves; pranayama.

Coverage rule: each generated session must include **≥3 patterns** with **lower + upper + core** represented; week must include all patterns ≥2×.

---

## 4) Exercise Library (descriptions are terse for UI prompts)

### 4.1 Gada (single mace)
- **GADA‑360**: Two‑hand 360° swing around head; hinge, drive hips; exhale on downswing. *Primary:* lats, posterior chain, obliques, grip. *Load:* 4–12 kg.
- **GADA‑10TO2**: Pendulum from 10 to 2 o’clock; powerful hinge; keep ribs down. *Primary:* lats/glutes.
- **GADA‑FRONT‑SWING**: Chest‑level front arc; anti‑extension core control.
- **GADA‑HALO‑PAUSE**: Slow halo with 2‑sec pauses at lateral extension (isometric torque).

### 4.2 Mudgar (single, two‑hand, and pair)
- **MUD‑MILL‑SINGLE**: One‑arm mill (classic parikrama path); elbow tracks close; smooth tempo.
- **MUD‑FRONT‑SWING‑SINGLE**: One‑arm front swing; anti‑rotation brace.
- **MUD‑HALO‑SINGLE**: One‑arm halo; small arc for shoulder hygiene.
- **MUD‑PENDULUM‑SINGLE**: Side pendulum; hip‑oblique linkage.
- **MUD‑MILL‑TWOHAND (single club, two‑hand grip)**: Two‑hand parikrama around head; great for learning path under higher stability.
- **MUD‑FRONT‑PRESS‑TWOHAND**: Two‑hand horizontal press‑out; anti‑extension brace.
- **MUD‑HALO‑TWOHAND**: Two‑hand halo; pause at lateral extension.
- **MUD‑PARALLEL‑MILLS‑PAIR (future)**: Paired clubs, mirrored mills (3–5 kg each) for rhythm/symmetry.

### 4.3 Bodyweight (Indian & general)
- **BW‑BAITHAK** (Hindu squat): inhale down, heels light or flat, arm swing; high‑rep endurance.
- **BW‑DAND** (Indian push‑up): spinal wave, elbows 45°; inhale down, exhale up.
- **BW‑PUSHUP** variants; **BW‑PLANK**, **SIDE‑PLANK**, **BIRD‑DOG**; **GLUTE‑BRIDGE** & march; **STEP‑UPS/LUNGES**.

### 4.4 Kettlebell
- **KB‑SWING** (hip hinge, eye‑level swing), **KB‑CLEAN‑PRESS**, **KB‑GOBLET‑SQUAT**, **KB‑RACK‑CARRY**.

### 4.5 Dumbbells & Bands
- **DB‑GOBLET‑SQUAT**, **DB‑ROW**, **DB‑FLOOR‑PRESS/OVERHEAD‑PRESS**, **DB‑RDL**.
- **BAND‑ROW**, **BAND‑PULLOVER**, **PULLOVER‑TO‑PRESSOUT**, **PALLOF‑PRESS**, **PULL‑APARTS**.

Each exercise entry (see JSON) includes: id, tool, pattern, primary/secondary muscles, coaching cues, regressions, progressions, contraindications, load guidance.

---

## 5) Yoga & Pranayama Modules

**Activation/Strength Asanas:** Surya Namaskar (3–6 rounds), Utkatasana, Virabhadrasana I–III, Navasana, Setu Bandhasana.

**Mobility/Recovery:** Cat‑Cow, Bhujangasana, Adho Mukha Svanasana ↔ Plank flow, Seated/Spinal twists, Balasana, Savasana.

**Breathwork Blocks:**
- **Bhastrika** 1–2 min (energy, fat oxidation)
- **Kapalabhati** 1 min (core activation)
- **Anulom Vilom** 3–5 min (autonomic balance)
- **Bhramari** 1–2 min (downshift)
- **Box Breathing 4‑4‑4‑4** 3–5 min (focus/cortisol)

Generation rule: attach a 3–10 min breathwork block to every session; longer blocks on recovery days.

---

## 6) Session Blueprints (used by generator)

**10–15 min – Micro Activation (weekday AM or tight PM)**
- Block: 1) Mobility 90s 2) Compound Flow 10–12 min 3) Breath 60–120s.
- Example sequence: 20 baithaks → 10 dands → MUD‑MILL‑SINGLE 8/side (3–5 kg) → GADA‑FRONT‑SWING 6–8 (4–6 kg) → BAND‑PULL‑APARTS 15 → 5 deep nasal breaths.

**20–30 min – Strength Burn (weekday PM)**
- Pattern mix: squat/hinge + push + pull + rotate + core.
- Example: DB‑GOBLET‑SQUAT 3×10 → DB‑ROW 3×10 → DB‑FLOOR‑PRESS 3×10 → MUD‑MILL‑TWOHAND 2×8 → PLANK 3×30s; optional KB‑SWING finisher 5×(30s on/30s off).

**40–60 min – Full Warrior Flow (weekend)**
- Phases: 1) Yoga warm 5 min 2) Skill blocks (GADA‑360, MUD‑MILL‑SINGLE) 20 min 3) Circuit 15–20 min 4) Breathwork 5–8 min.

Density knobs: shorten rests (90→60→45 s), add rounds (+1), or load (+1 kg step) provided technique ≥ “good”.

---

## 7) Weight Selection & Progression (gada/mudgar focus)

- **Initial guidance (based on user field test & strength):**
  - Gada start 4–6 kg; progress to 8–12 kg after consistent sets (≥3×10 clean 360s; RPE ≤7, elbow/shoulder soreness ≤1/10 next day).
  - Mudgar start 4–5 kg; progress to 6–7 kg when performing 3×10 per side clean, plus 2‑sec lateral isometric holds.
- **Progression rules:**
  - If technique “clean” for all sets and RPE ≤7 → increase load next session by ~1 kg **or** add +2 reps/set **or** reduce rest by 10–15 s.
  - If soreness >3/10 24–48h post → hold load, swap to mobility/flow emphasis.

---

## 8) Workout Generator Logic (pseudo)

```
inputs: time_of_day, duration_min, available_tools[], history_log, goals

function pick_session():
  patterns_needed = ensure_lower_upper_core(history_log)
  fatigue_map = build_fatigue(history_log)
  tools = rank_tools(available_tools, goals, time_of_day)

  blocks = []
  blocks.append(mobility_block(time_of_day, 60–180s))
  blocks += select_compound_exercises(patterns_needed, tools, fatigue_map, duration_min)
  blocks.append(pranayama_block(duration_min))

  return assemble_plan(blocks, target_RPE, rest_scheme, cues)
```

Constraints:
- Avoid high‑torque rotations two days in a row if lats/forearms DOMS.
- Ensure week contains ≥2 hinge, ≥2 squat, ≥2 push, ≥2 pull, ≥2 rotation exposures.
- Attach yoga/breathwork to every plan; longer if session was short.

---

## 9) Logging & Analytics

**Log fields:** datetime, duration, chosen session blueprint, exercises [id, sets, reps, load, tempo], RPE, side‑notes (energy, sleep), soreness map (0–10), breathwork minutes.

**Analytics:**
- Volume per pattern & muscle group / 7‑day window.
- Recovery guardrails: flag if same pattern heavy ≥3× in 5 days.
- Progression recommender: pick next load/volume/density knob based on last 3 exposures.

---

## 10) Contraindications & Safety

- Shoulder pain: swap heavy 360s for halos/two‑hand mills; reduce ROM; emphasize breath.
- Low back tightness: prefer anti‑rotation planks, KB RDL vs swings; increase hip openers.
- Wrist/forearm strain: deload mudgar, add band pulls & extensors; lower torque holds.

---

## 11) Outcome Metrics (tracked fortnightly)

- Waist & chest circumference; weight; photos (front/side/back).
- Resting HR & (if available) HRV; estimated VO₂ trend (field tests or wearable).
- Sleep quality score; daytime focus score.

---

## 12) JSON Knowledge Bundle (for the app)

```json
{
  "version": "1.0",
  "ethos": {
    "pillars": ["Movement before muscle", "Breath before intensity", "Consistency before complexity", "Flow before formality"],
    "goals": ["fat_burn", "epoc", "vo2", "posture_strength", "sleep_focus"]
  },
  "equipment": {
    "gada": {"start_kg": [4,6], "progression": [8,12]},
    "mudgar": {"single_adjustable": [3,5], "pair_optional": [3,5]},
    "samtola": {"optional": true},
    "dumbbell_plates": {"kg": {"1.25": 4, "2.5": 4, "5": 4, "10": 1}},
    "kettlebell_adjustable": {"min": 3, "max": 16},
    "bands": {"types": ["long", "loop"], "tensions": "various"},
    "ankle_weights": {"kg_each": 2, "count": 2},
    "bench": true,
    "yoga_mat": true
  },
  "patterns": ["hinge", "squat", "push", "pull", "rotate", "carry", "mobility"],
  "exercises": [
    {"id": "GADA-360", "tool": "gada", "pattern": "rotate", "primary": ["lats","glutes","obliques"], "cues": "Hinge, tight ribs, exhale on downswing", "regress": ["GADA-HALO-PAUSE"], "progress": ["GADA-10TO2"], "impact": "moderate"},
    {"id": "GADA-10TO2", "tool": "gada", "pattern": "hinge", "primary": ["posterior_chain"], "cues": "Pendulum from 10 to 2, hips drive", "regress": ["GADA-360"], "progress": []},
    {"id": "GADA-FRONT-SWING", "tool": "gada", "pattern": "anti_extension", "primary": ["core","shoulders"], "cues": "Press out, brace, no rib flare"},

    {"id": "MUD-MILL-SINGLE", "tool": "mudgar", "pattern": "rotate", "primary": ["obliques","forearm","rotator_cuff"], "cues": "Close elbow, smooth arc"},
    {"id": "MUD-FRONT-SWING-SINGLE", "tool": "mudgar", "pattern": "anti_rotation", "primary": ["core","delts"], "cues": "Square hips, resist twist"},
    {"id": "MUD-HALO-SINGLE", "tool": "mudgar", "pattern": "mobility", "primary": ["shoulder_capsule"], "cues": "Small arc, breathe"},
    {"id": "MUD-PENDULUM-SINGLE", "tool": "mudgar", "pattern": "rotate", "primary": ["obliques"], "cues": "Hip‑oblique link"},
    {"id": "MUD-MILL-TWOHAND", "tool": "mudgar", "pattern": "rotate", "grip": "two_hand_single_club", "primary": ["lats","delts","core"], "cues": "Two‑hand parikrama, even pressure"},
    {"id": "MUD-FRONT-PRESS-TWOHAND", "tool": "mudgar", "pattern": "anti_extension", "primary": ["core","pecs"], "cues": "Press out, brace"},
    {"id": "MUD-HALO-TWOHAND", "tool": "mudgar", "pattern": "mobility", "primary": ["shoulders"], "cues": "Pause laterally 2s"},

    {"id": "BW-BAITHAK", "tool": "bodyweight", "pattern": "squat", "primary": ["quads","glutes"], "cues": "Inhale down, exhale up"},
    {"id": "BW-DAND", "tool": "bodyweight", "pattern": "push", "primary": ["chest","triceps","lats"], "cues": "Spinal wave, elbows 45"},
    {"id": "DB-ROW", "tool": "dumbbell", "pattern": "pull", "primary": ["lats","rear_delts"], "cues": "Neutral spine, squeeze"},
    {"id": "DB-FLOOR-PRESS", "tool": "dumbbell", "pattern": "push", "primary": ["pecs","triceps"], "cues": "Shoulders packed"},
    {"id": "DB-GOBLET-SQUAT", "tool": "dumbbell", "pattern": "squat", "primary": ["quads","glutes"], "cues": "Knees track, tall torso"},
    {"id": "KB-SWING", "tool": "kettlebell", "pattern": "hinge", "primary": ["glutes","hams"], "cues": "Hips snap, bell floats"},
    {"id": "BAND-ROW", "tool": "band", "pattern": "pull", "primary": ["mid_back"], "cues": "Elbows to ribs"},
    {"id": "PALLOF-PRESS", "tool": "band", "pattern": "anti_rotation", "primary": ["core"], "cues": "Brace, no twist"}
  ],

  "session_blueprints": {
    "micro": {
      "duration": [10,15],
      "structure": ["mobility", "compound_flow", "breath"],
      "example": ["BW-BAITHAK", "BW-DAND", "MUD-MILL-SINGLE", "GADA-FRONT-SWING", "BAND-ROW"]
    },
    "strength_burn": {
      "duration": [20,30],
      "structure": ["squat_or_hinge", "push", "pull", "rotate", "core"],
      "example": ["DB-GOBLET-SQUAT", "DB-ROW", "DB-FLOOR-PRESS", "MUD-MILL-TWOHAND", "PALLOF-PRESS"]
    },
    "full_flow": {
      "duration": [40,60],
      "structure": ["yoga_warm", "skill_blocks", "metabolic_circuit", "pranayama"],
      "example": ["GADA-360", "MUD-MILL-SINGLE", "KB-SWING", "BW-BAITHAK", "BW-DAND"]
    }
  },

  "generator_rules": {
    "weekly_coverage": {"hinge": 2, "squat": 2, "push": 2, "pull": 2, "rotate": 2},
    "rest_windows_hours": {"same_pattern_heavy": 48},
    "attach_breathwork_minutes": {"micro": 3, "strength_burn": 3, "full_flow": 5},
    "progression": {"order": ["volume", "density", "load"], "step_load_kg": 1}
  },

  "logging_schema": {
    "fields": ["datetime", "duration_min", "exercises", "sets", "reps", "load", "tempo", "rpe", "notes", "soreness_map", "breath_minutes"],
    "metrics": ["weekly_volume_by_pattern", "recovery_flags", "trend_strength", "trend_conditioning"]
  },

  "contraindications": {
    "shoulder_pain": ["GADA-HALO-PAUSE", "MUD-HALO-TWOHAND", "BAND-PULL-APARTS"],
    "low_back_tight": ["PALLOF-PRESS", "KB-RDL", "yoga_cat_cow"],
    "forearm_strain": ["load_deload_mudgar", "band_extensors"]
  }
}
```

---

## 13) Notes for the AI Coach
- Respect user‑reported soreness and sleep; auto‑select recovery flows when needed.
- Use breath pacing cues in all guidance text (e.g., “inhale down, exhale up”).
- Prefer rotational work on days after heavy linear strength; reverse on the next day.
- For mornings: lighter flows (mudgar two‑hand, halos, yoga). For evenings: heavier strength + swings.
- Always end with 3–5 min nasal breathing; extend if session ≤15 min.

---

**End of Knowledge Base v1.0**

