import {
  WorkoutGeneratorInput,
  WorkoutPlan,
  WorkoutBlock,
  WorkoutExercise,
  SessionBlueprint,
  MovementPattern,
  FatigueMap,
  EquipmentType,
  WorkoutLog,
  MuscleGroup
} from '@/types';
import { EXERCISES } from '@/data/exercises';
import { PRANAYAMA } from '@/data/yoga';
import { differenceInHours, subDays } from 'date-fns';

const MINIMUM_REST_HOURS: Record<MovementPattern, number> = {
  hinge: 48,
  squat: 48,
  push: 48,
  pull: 48,
  rotate: 48,
  anti_rotation: 24,
  anti_extension: 24,
  carry: 24,
  mobility: 0
};

export class WorkoutGenerator {
  /**
   * Main entry point: generate a complete workout plan
   */
  static generate(
    input: WorkoutGeneratorInput,
    workoutHistory: WorkoutLog[]
  ): WorkoutPlan {
    // 1. Determine session blueprint based on duration
    const blueprint = this.selectBlueprint(input.durationMinutes);

    // 2. Build fatigue map from recent workout history
    const fatigueMap = this.buildFatigueMap(workoutHistory);

    // 3. Determine which patterns need coverage
    const patternsNeeded = this.selectPatternsForSession(
      blueprint,
      fatigueMap,
      workoutHistory
    );

    // 4. Select exercises based on patterns, equipment, and user state
    const blocks = this.buildWorkoutBlocks(
      blueprint,
      patternsNeeded,
      input,
      fatigueMap
    );

    // 5. Add breathwork/pranayama block
    const breathworkBlock = this.selectBreathwork(
      blueprint,
      input.stress,
      input.mood
    );
    blocks.push(breathworkBlock);

    // 6. Calculate summary metrics
    const summary = this.calculateSummary(blocks, patternsNeeded);

    return {
      id: `workout-${Date.now()}`,
      userId: input.userId,
      date: new Date(),
      duration: input.durationMinutes,
      focus: input.goal || 'fat_burn',
      blueprint,
      equipment: input.availableEquipment,
      blocks,
      summary,
      createdAt: new Date()
    };
  }

  /**
   * Select session blueprint based on available time
   */
  private static selectBlueprint(duration: number): SessionBlueprint {
    if (duration <= 20) return 'micro';
    if (duration <= 35) return 'strength_burn';
    return 'full_flow';
  }

  /**
   * Build fatigue map from recent workout history
   */
  private static buildFatigueMap(workoutHistory: WorkoutLog[]): FatigueMap {
    const fatigueMap: FatigueMap = {};
    const now = new Date();

    // Look at workouts from past 7 days
    const recentWorkouts = workoutHistory.filter(
      log => differenceInHours(now, log.date) <= 168 // 7 days
    );

    recentWorkouts.forEach(log => {
      log.exercises.forEach(exerciseLog => {
        const exercise = EXERCISES[exerciseLog.exerciseId];
        if (!exercise) return;

        const pattern = exercise.pattern;
        const hoursAgo = differenceInHours(now, log.date);
        const avgRPE = exerciseLog.sets.reduce((sum, set) =>
          sum + (set.rpe || 5), 0) / exerciseLog.sets.length;

        // Update if this is more recent or doesn't exist
        if (!fatigueMap[pattern] || fatigueMap[pattern].hoursAgo > hoursAgo) {
          fatigueMap[pattern] = {
            lastTrained: log.date,
            hoursAgo,
            intensity: avgRPE,
            needsRest: hoursAgo < MINIMUM_REST_HOURS[pattern]
          };
        }
      });
    });

    return fatigueMap;
  }

  /**
   * Select movement patterns for the session
   * Ensures weekly coverage and respects recovery windows
   */
  private static selectPatternsForSession(
    blueprint: SessionBlueprint,
    fatigueMap: FatigueMap,
    workoutHistory: WorkoutLog[]
  ): MovementPattern[] {
    const patterns: MovementPattern[] = [];

    // Get patterns from past week to ensure coverage
    const weekAgo = subDays(new Date(), 7);
    const weekWorkouts = workoutHistory.filter(log => log.date >= weekAgo);

    const patternCounts: Record<string, number> = {};
    weekWorkouts.forEach(log => {
      log.exercises.forEach(ex => {
        const exercise = EXERCISES[ex.exerciseId];
        if (exercise) {
          patternCounts[exercise.pattern] = (patternCounts[exercise.pattern] || 0) + 1;
        }
      });
    });

    // Core patterns that should be in most sessions
    const corePatterns: MovementPattern[] = ['hinge', 'squat', 'push', 'pull', 'rotate'];

    // Patterns prioritized by low recent frequency and recovery status
    const availablePatterns = corePatterns.filter(pattern => {
      const fatigue = fatigueMap[pattern];
      return !fatigue || !fatigue.needsRest;
    });

    // Sort by least trained recently
    availablePatterns.sort((a, b) => {
      const countA = patternCounts[a] || 0;
      const countB = patternCounts[b] || 0;
      return countA - countB;
    });

    // Select patterns based on blueprint
    switch (blueprint) {
      case 'micro':
        // Quick session: 2-3 patterns + mobility
        patterns.push(availablePatterns[0]); // Least trained
        patterns.push(availablePatterns[1]);
        patterns.push('mobility');
        break;

      case 'strength_burn':
        // Core session: 4-5 patterns
        patterns.push('squat'); // or hinge
        patterns.push('push');
        patterns.push('pull');
        patterns.push(availablePatterns.find(p => p === 'rotate' || p === 'hinge') || 'rotate');
        patterns.push('anti_extension');
        break;

      case 'full_flow':
        // Full session: all patterns
        patterns.push('hinge', 'squat', 'push', 'pull', 'rotate', 'mobility');
        break;
    }

    return patterns;
  }

  /**
   * Build workout blocks with selected exercises
   */
  private static buildWorkoutBlocks(
    blueprint: SessionBlueprint,
    patterns: MovementPattern[],
    input: WorkoutGeneratorInput,
    fatigueMap: FatigueMap
  ): WorkoutBlock[] {
    const blocks: WorkoutBlock[] = [];

    // 1. Warmup block (mobility)
    const warmupBlock = this.buildWarmupBlock(blueprint);
    blocks.push(warmupBlock);

    // 2. Main work blocks
    switch (blueprint) {
      case 'micro':
        blocks.push(this.buildMicroFlowBlock(patterns, input, fatigueMap));
        break;

      case 'strength_burn':
        blocks.push(this.buildStrengthBurnBlock(patterns, input, fatigueMap));
        break;

      case 'full_flow':
        blocks.push(
          this.buildSkillBlock(patterns, input, fatigueMap),
          this.buildCircuitBlock(patterns, input, fatigueMap)
        );
        break;
    }

    return blocks;
  }

  /**
   * Build warmup/mobility block
   */
  private static buildWarmupBlock(blueprint: SessionBlueprint): WorkoutBlock {
    const exercises: WorkoutExercise[] = [];

    // Cat-Cow or joint mobility
    exercises.push({
      exerciseId: 'MARJARYASANA-BITILASANA',
      sets: 1,
      reps: 10,
      restAfter: 0
    });

    // Light activation
    if (blueprint !== 'micro') {
      exercises.push({
        exerciseId: 'BW-GLUTE-BRIDGE',
        sets: 1,
        reps: 10,
        restAfter: 30
      });
    }

    return {
      type: 'warmup',
      exercises,
      notes: 'Joint mobility and activation'
    };
  }

  /**
   * Build micro flow block (10-15 min)
   */
  private static buildMicroFlowBlock(
    patterns: MovementPattern[],
    input: WorkoutGeneratorInput,
    fatigueMap: FatigueMap
  ): WorkoutBlock {
    const exercises: WorkoutExercise[] = [];

    // Bodyweight squat
    exercises.push({
      exerciseId: 'BW-BAITHAK',
      sets: 2,
      reps: 20,
      restAfter: 30
    });

    // Push
    exercises.push({
      exerciseId: 'BW-DAND',
      sets: 2,
      reps: 10,
      restAfter: 30
    });

    // Rotation (if equipment available)
    if (input.availableEquipment.includes('mudgar')) {
      exercises.push({
        exerciseId: 'MUD-MILL-SINGLE',
        sets: 2,
        reps: 8,
        load: 4,
        restAfter: 30
      });
    }

    if (input.availableEquipment.includes('gada')) {
      exercises.push({
        exerciseId: 'GADA-FRONT-SWING',
        sets: 2,
        reps: 6,
        load: 5,
        restAfter: 30
      });
    }

    // Pull
    if (input.availableEquipment.includes('band')) {
      exercises.push({
        exerciseId: 'BAND-PULL-APARTS',
        sets: 2,
        reps: 15,
        restAfter: 30
      });
    }

    return {
      type: 'main',
      exercises,
      restBetweenSets: 30,
      notes: 'Continuous flow with minimal rest'
    };
  }

  /**
   * Build strength burn block (25-30 min)
   */
  private static buildStrengthBurnBlock(
    patterns: MovementPattern[],
    input: WorkoutGeneratorInput,
    fatigueMap: FatigueMap
  ): WorkoutBlock {
    const exercises: WorkoutExercise[] = [];

    // Squat
    if (input.availableEquipment.includes('kettlebell')) {
      exercises.push({
        exerciseId: 'KB-GOBLET-SQUAT',
        sets: 3,
        reps: 10,
        load: 12,
        restAfter: 60
      });
    } else if (input.availableEquipment.includes('dumbbell')) {
      exercises.push({
        exerciseId: 'DB-GOBLET-SQUAT',
        sets: 3,
        reps: 10,
        load: 12,
        restAfter: 60
      });
    } else {
      exercises.push({
        exerciseId: 'BW-BAITHAK',
        sets: 3,
        reps: 25,
        restAfter: 60
      });
    }

    // Pull
    if (input.availableEquipment.includes('dumbbell')) {
      exercises.push({
        exerciseId: 'DB-ROW',
        sets: 3,
        reps: 10,
        load: 15,
        restAfter: 60
      });
    } else if (input.availableEquipment.includes('band')) {
      exercises.push({
        exerciseId: 'BAND-ROW',
        sets: 3,
        reps: 15,
        restAfter: 60
      });
    }

    // Push
    if (input.availableEquipment.includes('dumbbell')) {
      exercises.push({
        exerciseId: 'DB-FLOOR-PRESS',
        sets: 3,
        reps: 10,
        load: 12,
        restAfter: 60
      });
    } else {
      exercises.push({
        exerciseId: 'BW-PUSHUP',
        sets: 3,
        reps: 12,
        restAfter: 60
      });
    }

    // Rotation
    if (input.availableEquipment.includes('mudgar')) {
      exercises.push({
        exerciseId: 'MUD-MILL-TWOHAND',
        sets: 2,
        reps: 8,
        load: 5,
        restAfter: 60
      });
    }

    // Core
    exercises.push({
      exerciseId: 'BW-PLANK',
      sets: 3,
      reps: 30, // seconds
      restAfter: 45
    });

    return {
      type: 'main',
      exercises,
      restBetweenSets: 60,
      notes: 'Strength focus with moderate rest'
    };
  }

  /**
   * Build skill block for full flow sessions
   */
  private static buildSkillBlock(
    patterns: MovementPattern[],
    input: WorkoutGeneratorInput,
    fatigueMap: FatigueMap
  ): WorkoutBlock {
    const exercises: WorkoutExercise[] = [];

    // Gada work
    if (input.availableEquipment.includes('gada')) {
      exercises.push({
        exerciseId: 'GADA-360',
        sets: 3,
        reps: 8,
        load: 6,
        restAfter: 90
      });
    }

    // Mudgar work
    if (input.availableEquipment.includes('mudgar')) {
      exercises.push({
        exerciseId: 'MUD-MILL-SINGLE',
        sets: 3,
        reps: 10,
        load: 5,
        restAfter: 90
      });
    }

    // KB complex
    if (input.availableEquipment.includes('kettlebell')) {
      exercises.push({
        exerciseId: 'KB-CLEAN-PRESS',
        sets: 3,
        reps: 8,
        load: 12,
        restAfter: 90
      });
    }

    return {
      type: 'skill',
      exercises,
      restBetweenSets: 90,
      notes: 'Technical skill development'
    };
  }

  /**
   * Build circuit block for metabolic conditioning
   */
  private static buildCircuitBlock(
    patterns: MovementPattern[],
    input: WorkoutGeneratorInput,
    fatigueMap: FatigueMap
  ): WorkoutBlock {
    const exercises: WorkoutExercise[] = [];

    exercises.push(
      {
        exerciseId: 'BW-BAITHAK',
        sets: 3,
        reps: 25,
        restAfter: 0
      },
      {
        exerciseId: 'BW-DAND',
        sets: 3,
        reps: 10,
        restAfter: 0
      }
    );

    if (input.availableEquipment.includes('kettlebell')) {
      exercises.push({
        exerciseId: 'KB-SWING',
        sets: 3,
        reps: 15,
        load: 12,
        restAfter: 0
      });
    }

    if (input.availableEquipment.includes('band')) {
      exercises.push({
        exerciseId: 'BAND-ROW',
        sets: 3,
        reps: 15,
        restAfter: 60
      });
    }

    return {
      type: 'circuit',
      exercises,
      restBetweenSets: 60,
      notes: 'Circuit: perform all exercises back-to-back, rest after full round'
    };
  }

  /**
   * Select appropriate breathwork/pranayama
   */
  private static selectBreathwork(
    blueprint: SessionBlueprint,
    stress?: number,
    mood?: number
  ): WorkoutBlock {
    let pranayamaId: string;
    let duration: number;

    // High stress -> calming breathwork
    if (stress && stress >= 4) {
      pranayamaId = 'BHRAMARI';
      duration = 2;
    }
    // Low energy -> energizing breathwork
    else if (mood && mood <= 2) {
      pranayamaId = 'BHASTRIKA';
      duration = 2;
    }
    // Default balanced breathwork
    else {
      pranayamaId = 'ANULOM-VILOM';
      duration = blueprint === 'micro' ? 2 : blueprint === 'strength_burn' ? 3 : 5;
    }

    return {
      type: 'breathwork',
      exercises: [{
        exerciseId: pranayamaId,
        sets: 1,
        reps: duration * 60, // convert to seconds
        restAfter: 0
      }],
      notes: `${duration} minutes of pranayama`
    };
  }

  /**
   * Calculate workout summary
   */
  private static calculateSummary(
    blocks: WorkoutBlock[],
    patterns: MovementPattern[]
  ) {
    const targetMuscles: Set<MuscleGroup> = new Set();
    let totalVolume = 0;

    blocks.forEach(block => {
      block.exercises.forEach(workoutEx => {
        const exercise = EXERCISES[workoutEx.exerciseId];
        if (exercise) {
          exercise.primary.forEach(m => targetMuscles.add(m));

          // Calculate volume (sets * reps * load)
          const load = workoutEx.load || 0;
          totalVolume += workoutEx.sets * workoutEx.reps * (load || 1);
        }
      });
    });

    // Rough calorie estimation: 5 calories per set for bodyweight, 7 for weighted
    const estimatedCalories = Math.round(totalVolume * 0.5);

    return {
      patterns,
      estimatedCalories: estimatedCalories + 50, // Base metabolic cost
      targetMuscles: Array.from(targetMuscles)
    };
  }
}
