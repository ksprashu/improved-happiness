export const knowledgeBase = {
  ethos: {
    pillars: [
      "Movement before muscle",
      "Breath before intensity",
      "Consistency before complexity",
      "Flow before formality"
    ],
    cues: [
      "Strength + Flow + Breath",
      "Functional, rotational, full-body patterns",
      "Integrate yoga, pranayama, and Indian implements",
      "Respect recovery and progressive overload"
    ]
  },
  equipment: {
    gada: { startKg: [4, 6], progression: [8, 12] },
    mudgar: { singleAdjustable: [3, 5], pairOptional: [3, 5] },
    kettlebell: { min: 3, max: 16 },
    dumbbell: { platesKg: { 1.25: 4, 2.5: 4, 5: 4, 10: 1 } },
    bands: { types: ["long", "loop"], tensions: "various" },
    ankleWeights: { kgEach: 2 },
    bench: true,
    yogaMat: true
  },
  patterns: ["hinge", "squat", "push", "pull", "rotate", "anti_rotation", "mobility", "carry"],
  exercises: [
    {
      id: "GADA-360",
      name: "Gada 360°",
      tool: "gada",
      pattern: "rotate",
      primary: ["lats", "glutes", "obliques"],
      cues: "Hinge, tight ribs, exhale on downswing",
      regressions: ["GADA-HALO-PAUSE"],
      progressions: ["GADA-10TO2"],
      intensity: "moderate"
    },
    {
      id: "GADA-10TO2",
      name: "Gada 10-to-2",
      tool: "gada",
      pattern: "hinge",
      primary: ["posterior_chain"],
      cues: "Pendulum from 10 to 2, hips drive",
      regressions: ["GADA-360"],
      progressions: []
    },
    {
      id: "GADA-FRONT-SWING",
      name: "Gada Front Swing",
      tool: "gada",
      pattern: "anti_extension",
      primary: ["core", "shoulders"],
      cues: "Press out, brace, avoid rib flare",
      regressions: ["GADA-HALO-PAUSE"],
      progressions: []
    },
    {
      id: "MUD-MILL-SINGLE",
      name: "Mudgar Mill (Single)",
      tool: "mudgar",
      pattern: "rotate",
      primary: ["obliques", "forearms", "rotator_cuff"],
      cues: "Elbow close, smooth arc",
      regressions: ["MUD-HALO-TWOHAND"],
      progressions: ["MUD-PARALLEL-MILLS-PAIR"]
    },
    {
      id: "MUD-FRONT-SWING-SINGLE",
      name: "Mudgar Front Swing",
      tool: "mudgar",
      pattern: "anti_rotation",
      primary: ["core", "delts"],
      cues: "Square hips, resist twist"
    },
    {
      id: "MUD-HALO-SINGLE",
      name: "Mudgar Halo",
      tool: "mudgar",
      pattern: "mobility",
      primary: ["shoulder_capsule"],
      cues: "Keep arc compact, breathe"
    },
    {
      id: "MUD-MILL-TWOHAND",
      name: "Mudgar Mill (Two-Hand)",
      tool: "mudgar",
      pattern: "rotate",
      primary: ["lats", "delts", "core"],
      cues: "Even pressure across hands"
    },
    {
      id: "BW-BAITHAK",
      name: "Baithak (Hindu Squat)",
      tool: "bodyweight",
      pattern: "squat",
      primary: ["quads", "glutes"],
      cues: "Inhale down, exhale up"
    },
    {
      id: "BW-DAND",
      name: "Dand (Indian Push-up)",
      tool: "bodyweight",
      pattern: "push",
      primary: ["chest", "triceps", "lats"],
      cues: "Spinal wave, elbows 45°"
    },
    {
      id: "DB-ROW",
      name: "Dumbbell Row",
      tool: "dumbbell",
      pattern: "pull",
      primary: ["lats", "rear_delts"],
      cues: "Neutral spine, squeeze shoulder blades"
    },
    {
      id: "DB-FLOOR-PRESS",
      name: "Dumbbell Floor Press",
      tool: "dumbbell",
      pattern: "push",
      primary: ["pecs", "triceps"],
      cues: "Shoulders packed, elbows 45°"
    },
    {
      id: "DB-GOBLET-SQUAT",
      name: "Goblet Squat",
      tool: "dumbbell",
      pattern: "squat",
      primary: ["quads", "glutes"],
      cues: "Knees track over toes, tall torso"
    },
    {
      id: "KB-SWING",
      name: "Kettlebell Swing",
      tool: "kettlebell",
      pattern: "hinge",
      primary: ["glutes", "hamstrings"],
      cues: "Snap hips, let bell float"
    },
    {
      id: "PALLOF-PRESS",
      name: "Pallof Press",
      tool: "band",
      pattern: "anti_rotation",
      primary: ["core"],
      cues: "Brace, no twist"
    },
    {
      id: "BAND-ROW",
      name: "Band Row",
      tool: "band",
      pattern: "pull",
      primary: ["mid_back"],
      cues: "Elbows to ribs, pause at squeeze"
    },
    {
      id: "PLANK",
      name: "Plank",
      tool: "bodyweight",
      pattern: "anti_extension",
      primary: ["core"],
      cues: "Stack joints, slow breath"
    },
    {
      id: "SURYA-NAMASKAR",
      name: "Surya Namaskar",
      tool: "yoga",
      pattern: "mobility",
      primary: ["full_body"],
      cues: "Inhale reach, exhale fold"
    },
    {
      id: "BOX-BREATHING",
      name: "Box Breathing 4-4-4-4",
      tool: "breath",
      pattern: "recovery",
      primary: ["nervous_system"],
      cues: "Inhale 4, hold 4, exhale 4, hold 4"
    }
  ],
  sessionBlueprints: {
    micro: {
      label: "Micro Activation",
      duration: [10, 15],
      structure: ["mobility", "compound_flow", "breath"],
      defaultExercises: ["BW-BAITHAK", "BW-DAND", "MUD-MILL-SINGLE", "GADA-FRONT-SWING", "BAND-ROW"],
      breathMinutes: 3
    },
    strengthBurn: {
      label: "Strength Burn",
      duration: [20, 30],
      structure: ["squat_or_hinge", "push", "pull", "rotate", "core"],
      defaultExercises: ["DB-GOBLET-SQUAT", "DB-ROW", "DB-FLOOR-PRESS", "MUD-MILL-TWOHAND", "PLANK"],
      breathMinutes: 3
    },
    fullFlow: {
      label: "Full Warrior Flow",
      duration: [40, 60],
      structure: ["yoga_warm", "skill_blocks", "metabolic_circuit", "pranayama"],
      defaultExercises: ["SURYA-NAMASKAR", "GADA-360", "MUD-MILL-SINGLE", "KB-SWING", "BW-BAITHAK", "BW-DAND"],
      breathMinutes: 5
    }
  },
  breathwork: [
    { id: "BHASTRIKA", label: "Bhastrika", duration: "1-2 min", effect: "Fat oxidation + energy" },
    { id: "KAPALABHATI", label: "Kapalabhati", duration: "1 min", effect: "Core activation" },
    { id: "ANULOM-VILOM", label: "Anulom Vilom", duration: "3-5 min", effect: "Hormonal balance" },
    { id: "BHRAMARI", label: "Bhramari", duration: "1-2 min", effect: "Stress downshift" },
    { id: "BOX-BREATHING", label: "Box Breathing 4-4-4-4", duration: "3-5 min", effect: "Cortisol modulation" }
  ],
  contraindications: {
    shoulder_pain: ["GADA-HALO-PAUSE", "MUD-HALO-TWOHAND", "BAND-ROW"],
    low_back_tight: ["PALLOF-PRESS", "KB-RDL", "CAT-COW"],
    forearm_strain: ["load_deload_mudgar", "band_extensors"]
  }
};

export const sorenessMap = [
  "hinge",
  "squat",
  "push",
  "pull",
  "rotate",
  "anti_rotation",
  "core",
  "conditioning"
];

export const readinessLevels = [
  { id: "primed", label: "Primed — high energy" },
  { id: "steady", label: "Steady — moderate energy" },
  { id: "easy", label: "Easy — need gentle flow" }
];

export const goals = [
  { id: "fat_burn", label: "Fat Burn" },
  { id: "strength", label: "Strength" },
  { id: "flow", label: "Flow" },
  { id: "recovery", label: "Recovery" }
];

export const timeOfDayOptions = [
  { id: "morning", label: "Morning" },
  { id: "midday", label: "Midday" },
  { id: "evening", label: "Evening" }
];

export const equipmentOptions = [
  { id: "bodyweight", label: "Bodyweight" },
  { id: "yoga", label: "Yoga Mat" },
  { id: "gada", label: "Gada" },
  { id: "mudgar", label: "Mudgar" },
  { id: "kettlebell", label: "Kettlebell" },
  { id: "dumbbell", label: "Dumbbells" },
  { id: "band", label: "Resistance Bands" },
  { id: "breath", label: "Breathwork" }
];

export const plannerTips = [
  "Inhale on the eccentric, exhale on the drive phase.",
  "Pair rotational work with anti-rotation to build core resilience.",
  "End every session with nasal breathing to anchor recovery.",
  "Alternate heavy hinge days with flow/yoga emphasis to respect recovery."
];
