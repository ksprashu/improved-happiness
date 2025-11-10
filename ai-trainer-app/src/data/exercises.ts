import type { Exercise } from '../domain/types';

export const EXERCISE_LIBRARY: Exercise[] = [
  // GADA
  {
    id: "GADA-360",
    name: "Gada 360°",
    tool: "gada",
    pattern: "rotate",
    primary_muscles: ["lats", "glutes", "obliques"],
    secondary_muscles: ["forearms", "shoulders", "core"],
    cues: "Hinge, tight ribs, exhale on downswing",
    regress: ["GADA-HALO-PAUSE"],
    progress: ["GADA-10TO2"],
    impact: "moderate"
  },
  {
    id: "GADA-10TO2",
    name: "Gada 10-to-2",
    tool: "gada",
    pattern: "hinge",
    primary_muscles: ["posterior_chain"],
    secondary_muscles: ["lats", "forearms"],
    cues: "Pendulum from 10 to 2, hips drive",
    regress: ["GADA-360"]
  },
  {
    id: "GADA-FRONT-SWING",
    name: "Gada Front Swing",
    tool: "gada",
    pattern: "anti_extension",
    primary_muscles: ["core", "shoulders"],
    secondary_muscles: ["lats"],
    cues: "Press out, brace, no rib flare"
  },
  {
    id: "GADA-HALO-PAUSE",
    name: "Gada Halo with Pause",
    tool: "gada",
    pattern: "mobility",
    primary_muscles: ["shoulders", "core"],
    secondary_muscles: ["triceps"],
    cues: "Slow halo, 2-sec pause at lateral extension"
  },

  // MUDGAR
  {
    id: "MUD-MILL-SINGLE",
    name: "Mudgar Mill (Single Arm)",
    tool: "mudgar",
    pattern: "rotate",
    primary_muscles: ["obliques", "forearms", "rotator_cuff"],
    secondary_muscles: ["shoulders"],
    cues: "Close elbow, smooth arc, parikrama path"
  },
  {
    id: "MUD-FRONT-SWING-SINGLE",
    name: "Mudgar Front Swing (Single)",
    tool: "mudgar",
    pattern: "anti_rotation",
    primary_muscles: ["core", "shoulders"],
    secondary_muscles: ["forearms"],
    cues: "Square hips, resist twist"
  },
  {
    id: "MUD-HALO-SINGLE",
    name: "Mudgar Halo (Single)",
    tool: "mudgar",
    pattern: "mobility",
    primary_muscles: ["shoulder_capsule"],
    secondary_muscles: ["triceps"],
    cues: "Small arc, breathe, keep ribs down"
  },
  {
    id: "MUD-MILL-TWOHAND",
    name: "Mudgar Mill (Two Hand)",
    tool: "mudgar",
    pattern: "rotate",
    primary_muscles: ["lats", "shoulders", "core"],
    secondary_muscles: ["forearms"],
    cues: "Two-hand parikrama, even pressure"
  },

  // BODYWEIGHT (Indian)
  {
    id: "BW-BAITHAK",
    name: "Baithak (Hindu Squat)",
    tool: "bodyweight",
    pattern: "squat",
    primary_muscles: ["quads", "glutes"],
    secondary_muscles: ["hamstrings", "calves"],
    cues: "Inhale down, exhale up, rhythmic arm swing"
  },
  {
    id: "BW-DAND",
    name: "Dand (Indian Push-up)",
    tool: "bodyweight",
    pattern: "push",
    primary_muscles: ["chest", "triceps", "lats"],
    secondary_muscles: ["shoulders", "core", "posterior_chain"],
    cues: "Spinal wave, swooping motion, elbows 45°"
  },
  {
    id: "BW-SUPERMAN",
    name: "Superman Hold",
    tool: "bodyweight",
    pattern: "pull", // loosely fits as posterior chain pull/extension
    primary_muscles: ["posterior_chain", "mid_back"],
    secondary_muscles: ["glutes", "shoulders"],
    cues: "Lift arms and legs, squeeze back, hold"
  },

  // DUMBBELL
  {
    id: "DB-ROW",
    name: "Dumbbell Row",
    tool: "dumbbell",
    pattern: "pull",
    primary_muscles: ["lats", "rear_delts"],
    secondary_muscles: ["biceps", "forearms"],
    cues: "Neutral spine, squeeze shoulder blade at top"
  },
  {
    id: "DB-FLOOR-PRESS",
    name: "Dumbbell Floor Press",
    tool: "dumbbell",
    pattern: "push",
    primary_muscles: ["chest", "triceps"],
    secondary_muscles: ["shoulders"],
    cues: "Shoulders packed down, elbows 45°"
  },
  {
    id: "DB-GOBLET-SQUAT",
    name: "Dumbbell Goblet Squat",
    tool: "dumbbell",
    pattern: "squat",
    primary_muscles: ["quads", "glutes"],
    secondary_muscles: ["core", "upper_back"],
    cues: "Knees track over toes, tall torso, brace core"
  },

  // KETTLEBELL
  {
    id: "KB-SWING",
    name: "Kettlebell Swing",
    tool: "kettlebell",
    pattern: "hinge",
    primary_muscles: ["glutes", "hamstrings"],
    secondary_muscles: ["core", "lats", "forearms"],
    cues: "Hips snap, bell floats, plank at top"
  },

  // BAND
  {
    id: "BAND-ROW",
    name: "Resistance Band Row",
    tool: "band",
    pattern: "pull",
    primary_muscles: ["mid_back", "lats"],
    secondary_muscles: ["biceps", "rear_delts"],
    cues: "Elbows drive back to ribs, squeeze"
  },
  {
    id: "PALLOF-PRESS",
    name: "Pallof Press",
    tool: "band",
    pattern: "anti_rotation",
    primary_muscles: ["core", "obliques"],
    secondary_muscles: ["shoulders"],
    cues: "Brace hard, resist twist, slow tempo"
  },
  {
    id: "BAND-PULL-APART",
    name: "Band Pull-Apart",
    tool: "band",
    pattern: "pull",
    primary_muscles: ["rear_delts", "mid_back"],
    secondary_muscles: ["rotator_cuff"],
    cues: "Straight arms, pull to chest, don't shrug"
  },
  
  // CORE / OTHER BW
  {
    id: "BW-PLANK",
    name: "Plank",
    tool: "bodyweight",
    pattern: "anti_extension",
    primary_muscles: ["core"],
    secondary_muscles: ["shoulders", "quads"],
    cues: "Straight line head to heels, tuck tailbone"
  },

  // BREATHWORK
  {
    id: "BREATH-BOX",
    name: "Box Breathing (4-4-4-4)",
    tool: "none",
    pattern: "breath",
    primary_muscles: ["diaphragm"],
    secondary_muscles: ["core"],
    cues: "Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Nasal only.",
    impact: "low"
  },
  {
    id: "BREATH-ANULOM",
    name: "Anulom Vilom (Alternate Nostril)",
    tool: "none",
    pattern: "breath",
    primary_muscles: ["diaphragm"],
    secondary_muscles: [],
    cues: "Close right nostril, inhale left. Close left, exhale right. Reverse.",
    impact: "low"
  },
  {
    id: "BREATH-KAPALABHATI",
    name: "Kapalabhati (Skull Shining)",
    tool: "none",
    pattern: "breath",
    primary_muscles: ["core", "diaphragm"],
    secondary_muscles: [],
    cues: "Passive inhale, forceful active exhale from belly.",
    impact: "low"
  }
];
