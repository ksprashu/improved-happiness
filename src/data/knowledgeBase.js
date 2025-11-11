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
      description: "Sweep the gada around the head with a smooth circle, driving the bell from hips and lats.",
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
      description: "Pendulum the mace between 10 and 2 on the clock, snapping the hips to redirect the swing.",
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
      description: "Press the mace forward from the chest while bracing the core to resist overextension.",
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
      description: "Circle the mudgar around the head with one hand, keeping elbows close and the arc controlled.",
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
      description: "Swing the club forward and back while locking the hips square to train anti-rotation strength.",
      tool: "mudgar",
      pattern: "anti_rotation",
      primary: ["core", "delts"],
      cues: "Square hips, resist twist"
    },
    {
      id: "MUD-HALO-SINGLE",
      name: "Mudgar Halo",
      description: "Guide the club around the head slowly to open shoulders and prime rotational mobility.",
      tool: "mudgar",
      pattern: "mobility",
      primary: ["shoulder_capsule"],
      cues: "Keep arc compact, breathe"
    },
    {
      id: "MUD-MILL-TWOHAND",
      name: "Mudgar Mill (Two-Hand)",
      description: "Use both hands to orbit a heavier mudgar for powerful rotational strength and coordination.",
      tool: "mudgar",
      pattern: "rotate",
      primary: ["lats", "delts", "core"],
      cues: "Even pressure across hands"
    },
    {
      id: "BW-BAITHAK",
      name: "Baithak (Hindu Squat)",
      description: "Roll onto the toes and drop into a rhythmic squat, syncing breath with each flowing rep.",
      tool: "bodyweight",
      pattern: "squat",
      primary: ["quads", "glutes"],
      cues: "Inhale down, exhale up"
    },
    {
      id: "BW-DAND",
      name: "Dand (Indian Push-up)",
      description: "Flow from downward dog into a sweeping push-up, arching and waving through the spine.",
      tool: "bodyweight",
      pattern: "push",
      primary: ["chest", "triceps", "lats"],
      cues: "Spinal wave, elbows 45°"
    },
    {
      id: "DB-ROW",
      name: "Dumbbell Row",
      description: "Hinge at the hips, brace the core, and draw the bell toward the ribs with a strong squeeze.",
      tool: "dumbbell",
      pattern: "pull",
      primary: ["lats", "rear_delts"],
      cues: "Neutral spine, squeeze shoulder blades"
    },
    {
      id: "DB-FLOOR-PRESS",
      name: "Dumbbell Floor Press",
      description: "Lie on the floor and press bells from a packed shoulder position with controlled tempo.",
      tool: "dumbbell",
      pattern: "push",
      primary: ["pecs", "triceps"],
      cues: "Shoulders packed, elbows 45°"
    },
    {
      id: "DB-GOBLET-SQUAT",
      name: "Goblet Squat",
      description: "Hold the weight at the chest and sit between the hips, keeping the torso tall and heels grounded.",
      tool: "dumbbell",
      pattern: "squat",
      primary: ["quads", "glutes"],
      cues: "Knees track over toes, tall torso"
    },
    {
      id: "KB-SWING",
      name: "Kettlebell Swing",
      description: "Explosively hinge and snap the hips to float the bell to chest height with relaxed arms.",
      tool: "kettlebell",
      pattern: "hinge",
      primary: ["glutes", "hamstrings"],
      cues: "Snap hips, let bell float"
    },
    {
      id: "PALLOF-PRESS",
      name: "Pallof Press",
      description: "Press the band straight out from the chest while bracing to resist the sideways pull.",
      tool: "band",
      pattern: "anti_rotation",
      primary: ["core"],
      cues: "Brace, no twist"
    },
    {
      id: "BAND-ROW",
      name: "Band Row",
      description: "Anchor the band and draw elbows back to the ribs, squeezing shoulder blades together.",
      tool: "band",
      pattern: "pull",
      primary: ["mid_back"],
      cues: "Elbows to ribs, pause at squeeze"
    },
    {
      id: "PLANK",
      name: "Plank",
      description: "Hold a long line from head to heels, pressing the floor away and breathing through the nose.",
      tool: "bodyweight",
      pattern: "anti_extension",
      primary: ["core"],
      cues: "Stack joints, slow breath"
    },
    {
      id: "SURYA-NAMASKAR",
      name: "Surya Namaskar",
      description: "Link a sun salutation sequence of folds, planks, and lunges with steady inhales and exhales.",
      tool: "yoga",
      pattern: "mobility",
      primary: ["full_body"],
      cues: "Inhale reach, exhale fold"
    },
    {
      id: "BOX-BREATHING",
      name: "Box Breathing 4-4-4-4",
      description: "Match inhaling, holding, exhaling, and holding for four counts to calm the nervous system.",
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
    {
      id: "BHASTRIKA",
      label: "Bhastrika",
      duration: "1-2 min",
      effect: "Fat oxidation + energy",
      how: "Sit tall and pump the breath with forceful nasal inhales and exhales like bellows."
    },
    {
      id: "KAPALABHATI",
      label: "Kapalabhati",
      duration: "1 min",
      effect: "Core activation",
      how: "Snap the belly back on sharp nasal exhales, letting inhales happen softly between pulses."
    },
    {
      id: "ANULOM-VILOM",
      label: "Anulom Vilom",
      duration: "3-5 min",
      effect: "Hormonal balance",
      how: "Alternate nostrils with a gentle finger seal, inhaling and exhaling evenly side to side."
    },
    {
      id: "BHRAMARI",
      label: "Bhramari",
      duration: "1-2 min",
      effect: "Stress downshift",
      how: "Close the eyes, inhale softly, then hum on the exhale to create a soothing vibration."
    },
    {
      id: "BOX-BREATHING",
      label: "Box Breathing 4-4-4-4",
      duration: "3-5 min",
      effect: "Cortisol modulation",
      how: "Inhale, hold, exhale, and hold for even four-counts to settle the nervous system."
    }
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

export const focusOptions = [
  {
    id: "gada",
    label: "Gada Flow",
    description: "Rotational mace swings, 10-to-2s, and anti-extension presses for warrior flow.",
    tools: ["gada"],
    patterns: ["rotate", "hinge", "anti_extension"]
  },
  {
    id: "mudgar",
    label: "Mudgar Strength",
    description: "Single and double club mills to groove rotational power and shoulder resilience.",
    tools: ["mudgar"],
    patterns: ["rotate", "anti_rotation", "mobility"]
  },
  {
    id: "kettlebell",
    label: "Kettlebell Power",
    description: "Explosive swings, squats, and presses to build posterior-chain drive.",
    tools: ["kettlebell"],
    patterns: ["hinge", "squat", "push"]
  },
  {
    id: "bodyweight",
    label: "Bodyweight Conditioning",
    description: "Dands, baithaks, planks, and band work for high-repeatable conditioning.",
    tools: ["bodyweight", "band"],
    patterns: ["push", "pull", "squat", "anti_rotation", "anti_extension"]
  },
  {
    id: "yoga",
    label: "Yoga & Breath",
    description: "Surya namaskar flows, pranayama, and mobility resets for restoration.",
    tools: ["yoga", "breath"],
    patterns: ["mobility", "recovery"]
  }
];

export const plannerTips = [
  "Inhale on the eccentric, exhale on the drive phase.",
  "Pair rotational work with anti-rotation to build core resilience.",
  "End every session with nasal breathing to anchor recovery.",
  "Alternate heavy hinge days with flow/yoga emphasis to respect recovery."
];
