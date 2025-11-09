import { knowledgeBase } from "../data/knowledgeBase.js";
import { getRecentLogs } from "../state.js";

const patternAliases = {
  mobility: "mobility",
  compound_flow: "rotate",
  squat_or_hinge: "hinge",
  push: "push",
  pull: "pull",
  rotate: "rotate",
  core: "anti_extension",
  yoga_warm: "mobility",
  skill_blocks: "rotate",
  metabolic_circuit: "hinge",
  pranayama: "recovery"
};

const readinessBias = {
  primed: ["hinge", "push", "pull", "rotate"],
  steady: ["squat", "hinge", "push", "mobility"],
  easy: ["mobility", "recovery", "anti_rotation"]
};

function pickBlueprint(duration) {
  if (duration <= 18) return knowledgeBase.sessionBlueprints.micro;
  if (duration <= 35) return knowledgeBase.sessionBlueprints.strengthBurn;
  return knowledgeBase.sessionBlueprints.fullFlow;
}

function getEquipmentSet(equipment) {
  const set = new Set(equipment);
  set.add("breath");
  if (!set.has("bodyweight")) set.add("bodyweight");
  return set;
}

function patternCompatible(exercise, pattern, equipmentSet) {
  if (!equipmentSet.has(exercise.tool)) return false;
  if (pattern === "squat_or_hinge") {
    return exercise.pattern === "squat" || exercise.pattern === "hinge";
  }
  if (pattern === "core") {
    return exercise.pattern === "anti_extension" || exercise.pattern === "anti_rotation" || exercise.pattern === "core";
  }
  if (pattern === "compound_flow") {
    return ["hinge", "rotate"].includes(exercise.pattern);
  }
  if (pattern === "skill_blocks") {
    return ["rotate", "anti_rotation"].includes(exercise.pattern);
  }
  if (pattern === "metabolic_circuit") {
    return ["hinge", "squat", "push"].includes(exercise.pattern);
  }
  if (pattern === "pranayama") {
    return exercise.tool === "breath";
  }
  return exercise.pattern === patternAliases[pattern] || exercise.pattern === pattern;
}

function scoreExercise(exercise, { readiness, goals, avoidPatterns, soreness }) {
  let score = 0;
  if (goals.includes("strength") && ["hinge", "push", "pull", "squat"].includes(exercise.pattern)) score += 2;
  if (goals.includes("fat_burn") && ["hinge", "squat", "rotate"].includes(exercise.pattern)) score += 2;
  if (goals.includes("flow") && ["rotate", "mobility", "anti_rotation"].includes(exercise.pattern)) score += 2;
  if (goals.includes("recovery") && ["mobility", "recovery", "anti_rotation"].includes(exercise.pattern)) score += 2;

  const readinessPref = readinessBias[readiness] || [];
  if (readinessPref.includes(exercise.pattern)) score += 1.5;

  if (avoidPatterns.has(exercise.pattern)) score -= 4;
  if (soreness.has(exercise.pattern)) score -= 3;

  return score + Math.random() * 0.4;
}

function buildAvoidPatterns(recentLogs) {
  const avoid = new Map();
  for (const log of recentLogs) {
    for (const pattern of log.patterns || []) {
      avoid.set(pattern, (avoid.get(pattern) || 0) + 1);
    }
  }
  const avoidSet = new Set();
  avoid.forEach((count, pattern) => {
    if (count >= 2) avoidSet.add(pattern);
  });
  return { avoidSet, counts: avoid };
}

export function generateSession(planner) {
  const blueprint = pickBlueprint(planner.duration);
  const equipmentSet = getEquipmentSet(planner.equipment);
  const recentLogs = getRecentLogs(48);
  const { avoidSet, counts } = buildAvoidPatterns(recentLogs);
  const soreness = new Set(planner.soreness || []);

  const exercises = [];
  const warnings = [];

  const planPatterns = new Set();

  for (const block of blueprint.structure) {
    if (block === "pranayama") {
      continue;
    }
    const candidates = knowledgeBase.exercises.filter((exercise) => patternCompatible(exercise, block, equipmentSet));
    if (!candidates.length) continue;
    candidates.sort(
      (a, b) =>
        scoreExercise(b, {
          readiness: planner.readiness,
          goals: planner.goals,
          avoidPatterns: avoidSet,
          soreness
        }) -
        scoreExercise(a, {
          readiness: planner.readiness,
          goals: planner.goals,
          avoidPatterns: avoidSet,
          soreness
        })
    );
    const chosen = candidates[0];
    exercises.push({
      block,
      exercise: chosen,
      cues: chosen.cues,
      reps: suggestPrescription(chosen, planner)
    });
    planPatterns.add(chosen.pattern);
    if (avoidSet.has(chosen.pattern)) {
      const message = `Recent heavy ${chosen.pattern} work detected. Keep volume light or extend warm-up.`;
      if (!warnings.includes(message)) warnings.push(message);
    }
    if (soreness.has(chosen.pattern)) {
      const message = `Noted soreness in ${chosen.pattern}. Keep tempo smooth and monitor technique.`;
      if (!warnings.includes(message)) warnings.push(message);
    }
  }

  const uniquePatterns = Array.from(planPatterns);
  if (uniquePatterns.length < 3) {
    const extra = knowledgeBase.exercises
      .filter((exercise) => !planPatterns.has(exercise.pattern) && equipmentSet.has(exercise.tool))
      .slice(0, 2);
    for (const exercise of extra) {
      exercises.push({
        block: "supplemental",
        exercise,
        cues: exercise.cues,
        reps: suggestPrescription(exercise, planner)
      });
      planPatterns.add(exercise.pattern);
    }
  }

  const breathSuggestions = knowledgeBase.breathwork.filter((b) => planner.goals.includes("recovery") || planner.duration <= 20 ? true : b.id !== "BOX-BREATHING");
  const breath = breathSuggestions.slice(0, 2);

  const breathMinutes = blueprint.breathMinutes + (planner.goals.includes("recovery") ? 2 : 0);

  const summary = {
    title: `${blueprint.label} — ${planner.duration} min`,
    blueprint: blueprint.label,
    exercises,
    breath,
    breathMinutes,
    planPatterns: Array.from(planPatterns),
    warnings,
    avoidCounts: Object.fromEntries(counts)
  };

  return summary;
}

function suggestPrescription(exercise, planner) {
  const base = planner.duration <= 20 ? "2 sets" : planner.duration <= 35 ? "3 sets" : "4 sets";
  if (exercise.tool === "breath") {
    return `Focus for ${planner.duration <= 20 ? 3 : 5} minutes`;
  }
  if (exercise.pattern === "mobility") {
    return "60-90 seconds flow";
  }
  if (exercise.pattern === "anti_extension" || exercise.pattern === "anti_rotation") {
    return planner.goals.includes("flow") ? "45s holds / side" : "3×12 reps";
  }
  if (exercise.pattern === "rotate") {
    return `${base} × 8-10 per side`;
  }
  if (exercise.pattern === "hinge" || exercise.pattern === "squat") {
    return `${base} × 10-12 reps`;
  }
  if (exercise.pattern === "push" || exercise.pattern === "pull") {
    return `${base} × 8-10 reps`;
  }
  return `${base} × mindful effort`;
}
