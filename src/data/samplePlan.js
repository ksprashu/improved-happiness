export const dayPicker = [
  {
    id: "micro-warrior",
    name: "Micro-Warrior",
    duration: "10-15 min",
    focus: ["Rotational Core", "Metabolic Flow"],
    sequence: "20 Baithaks → 10 Dands → 8 Mudgar Mills/side → 6 Gada Swings → 10 Band Pull-Aparts → 5 Deep Breaths",
    tools: ["Bodyweight", "Mudgar", "Gada", "Bands"]
  },
  {
    id: "compact-strength",
    name: "Compact Strength",
    duration: "20-25 min",
    focus: ["Strength Burn", "Core Stability"],
    sequence: "Warm-up 2 min → Goblet Squat 3×10 → Bent-over Row 3×10 → Floor Press 3×10 → Plank 3×30 s",
    tools: ["Kettlebell", "Dumbbells", "Bodyweight"]
  },
  {
    id: "power-flow",
    name: "Power Flow",
    duration: "25-30 min",
    focus: ["Rotational Core", "Metabolic Flow"],
    sequence: "25 Baithaks → 10 Indian Push-ups → 10 KB Swings → 8 Gada Swings → 8 Mudgar Mills/side → 1 min Plank × 3 rounds",
    tools: ["Bodyweight", "Kettlebell", "Gada", "Mudgar"]
  },
  {
    id: "weekend-warrior",
    name: "Weekend Warrior Strength",
    duration: "40-45 min",
    focus: ["Strength Burn", "Core Torque"],
    sequence: "Yoga warm-up 5 min → Gada 10-to-2 3×8 → Mudgar Mills 3×10 → KB Clean & Press 3×8 → Push-ups 3×15",
    tools: ["Yoga", "Gada", "Mudgar", "Kettlebell", "Bodyweight"]
  },
  {
    id: "full-warrior",
    name: "Full Warrior Flow",
    duration: "50-60 min",
    focus: ["Metabolic Flow", "Recovery Integration"],
    sequence: "Surya Namaskar ×5 → 50 Baithaks + 25 Dands → 10 Gada Swings ×3 → 10 KB Swings ×3 → 10 Band Rows ×3 → Setu Bandhasana + Navasana → Kapalabhati 1 min → Nadi Shodhana 3 min",
    tools: ["Yoga", "Bodyweight", "Gada", "Kettlebell", "Bands"]
  },
  {
    id: "reset-calm",
    name: "Reset & Calm",
    duration: "5-10 min",
    focus: ["Recovery Flow"],
    sequence: "Cat-Cow ×10 → Seated Twist 20 s/side → Anulom Vilom 2 min → Box Breathing ×3 cycles",
    tools: ["Yoga", "Breathwork"]
  }
];

export const weeklyFlow = [
  { day: "Mon", suggestion: "Compact Strength" },
  { day: "Tue", suggestion: "Micro-Warrior" },
  { day: "Wed", suggestion: "Power Flow" },
  { day: "Thu", suggestion: "Compact Strength" },
  { day: "Fri", suggestion: "Micro-Warrior / Reset" },
  { day: "Sat", suggestion: "Weekend Warrior" },
  { day: "Sun", suggestion: "Full Warrior / Recovery" }
];
