import { EXERCISE_LIBRARY } from '../data/exercises';
import type {
  Equipment,
  Exercise,
  MuscleGroup,
  SessionType,
  UserProfile,
  WorkoutBlock,
  WorkoutPlan,
} from './types';
import { v4 as uuidv4 } from 'uuid';

export function generateWorkoutPlan(
  user: UserProfile,
  duration: number,
  _time_of_day: 'morning' | 'evening',
  _energy_level: number,
  _current_soreness: Partial<Record<MuscleGroup, number>>
): WorkoutPlan {
  const sessionType = determineSessionType(duration);
  const availableExercises = filterExercises(
    EXERCISE_LIBRARY,
    user.available_equipment,
    user.injuries
  );

  let blocks: WorkoutBlock[] = [];

  switch (sessionType) {
    case 'micro':
      blocks = buildMicroSession(availableExercises, duration);
      break;
    case 'strength_burn':
      blocks = buildStrengthSession(availableExercises, duration);
      break;
    case 'full_flow':
      blocks = buildFullFlowSession(availableExercises, duration);
      break;
  }

  // Always attach breathwork if not already present
  if (blocks.length === 0 || blocks[blocks.length - 1].type !== 'breathwork') {
    blocks.push(getBreathworkBlock(duration));
  }

  return {
    id: uuidv4(),
    date: Date.now(),
    duration_minutes: duration,
    session_type: sessionType,
    focus: user.goals,
    blocks,
  };
}

function determineSessionType(duration: number): SessionType {
  if (duration < 20) return 'micro';
  if (duration < 40) return 'strength_burn';
  return 'full_flow';
}

function filterExercises(
  all: Exercise[],
  equipment: Equipment[],
  injuries: MuscleGroup[]
): Exercise[] {
  return all.filter((ex) => {
    const hasEquipment = equipment.includes(ex.tool) || ex.tool === 'none';
    const hasInjury = ex.primary_muscles.some((m) => injuries.includes(m));
    return hasEquipment && !hasInjury;
  });
}

function getBreathworkBlock(totalDuration: number): WorkoutBlock {
  const duration = totalDuration < 20 ? 3 : 5;
  const breathExercise = EXERCISE_LIBRARY.find((e) => e.id === 'BREATH-BOX')!;
  return {
    type: 'breathwork',
    exercises: [
      {
        exercise: breathExercise,
        sets: 1,
        reps_or_duration: `${duration}m`,
        rest_sec: 0,
      },
    ],
  };
}

function buildMicroSession(exercises: Exercise[], _duration: number): WorkoutBlock[] {
  const mobility = exercises.find((e) => e.pattern === 'mobility');
  const squat = exercises.find((e) => e.pattern === 'squat');
  const push = exercises.find((e) => e.pattern === 'push');
  const pull = exercises.find((e) => e.pattern === 'pull') || exercises.find((e) => e.pattern === 'hinge');

  const blocks: WorkoutBlock[] = [];

  if (mobility) {
    blocks.push({
      type: 'warmup',
      exercises: [{ exercise: mobility, sets: 1, reps_or_duration: '90s', rest_sec: 0 }],
    });
  }

  const circuitExercises = [squat, push, pull].filter((e): e is Exercise => !!e);
  if (circuitExercises.length > 0) {
    blocks.push({
      type: 'circuit',
      notes: 'Perform as a continuous circuit for 3-4 rounds.',
      exercises: circuitExercises.map((ex) => ({
        exercise: ex,
        sets: 3,
        reps_or_duration: 10,
        rest_sec: 15,
      })),
    });
  }

  return blocks;
}

function buildStrengthSession(exercises: Exercise[], _duration: number): WorkoutBlock[] {
  const squat = exercises.find((e) => e.pattern === 'squat');
  const push = exercises.find((e) => e.pattern === 'push');
  const hinge = exercises.find((e) => e.pattern === 'hinge');
  const pull = exercises.find((e) => e.pattern === 'pull');
  const core = exercises.find((e) => e.pattern === 'anti_rotation' || e.pattern === 'anti_extension');
  const mobility = exercises.find((e) => e.pattern === 'mobility');

  const blocks: WorkoutBlock[] = [];

  if (mobility) {
    blocks.push({
      type: 'warmup',
      exercises: [{ exercise: mobility, sets: 1, reps_or_duration: '3m', rest_sec: 0 }],
    });
  }

  const mainBlock: WorkoutBlock = { type: 'main', exercises: [] };
  if (squat) mainBlock.exercises.push({ exercise: squat, sets: 3, reps_or_duration: 10, rest_sec: 60 });
  if (push) mainBlock.exercises.push({ exercise: push, sets: 3, reps_or_duration: 10, rest_sec: 60 });
  if (hinge) mainBlock.exercises.push({ exercise: hinge, sets: 3, reps_or_duration: 10, rest_sec: 60 });
  if (pull) mainBlock.exercises.push({ exercise: pull, sets: 3, reps_or_duration: 10, rest_sec: 60 });

  if (mainBlock.exercises.length > 0) {
    blocks.push(mainBlock);
  }

  if (core) {
    blocks.push({
      type: 'circuit',
      exercises: [{ exercise: core, sets: 3, reps_or_duration: '30s', rest_sec: 30 }],
    });
  }

  return blocks;
}

function buildFullFlowSession(exercises: Exercise[], duration: number): WorkoutBlock[] {
  return buildStrengthSession(exercises, duration);
}