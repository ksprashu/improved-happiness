// ==================== CORE TYPES ====================

export type MovementPattern =
  | 'hinge'
  | 'squat'
  | 'push'
  | 'pull'
  | 'rotate'
  | 'anti_rotation'
  | 'anti_extension'
  | 'carry'
  | 'mobility';

export type EquipmentType =
  | 'gada'
  | 'mudgar'
  | 'kettlebell'
  | 'dumbbell'
  | 'band'
  | 'bodyweight'
  | 'yoga_mat'
  | 'bench'
  | 'ankle_weights';

export type MuscleGroup =
  | 'quads'
  | 'glutes'
  | 'hamstrings'
  | 'calves'
  | 'chest'
  | 'lats'
  | 'mid_back'
  | 'rear_delts'
  | 'shoulders'
  | 'triceps'
  | 'biceps'
  | 'forearms'
  | 'core'
  | 'obliques'
  | 'lower_back'
  | 'rotator_cuff';

export type FitnessGoal = 'fat_burn' | 'strength' | 'mobility' | 'recovery' | 'mix';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type TimeOfDay = 'morning' | 'evening' | 'both';

export type SessionBlueprint = 'micro' | 'strength_burn' | 'full_flow';

// ==================== EXERCISE TYPES ====================

export interface Exercise {
  id: string;
  name: string;
  tool: EquipmentType;
  pattern: MovementPattern;
  primary: MuscleGroup[];
  secondary?: MuscleGroup[];
  cues: string[];
  breathingPattern: string;
  regressions?: string[]; // IDs of easier variants
  progressions?: string[]; // IDs of harder variants
  contraindications?: string[];
  loadGuidance?: {
    beginner: { min: number; max: number; unit: 'kg' | 'reps' };
    intermediate: { min: number; max: number; unit: 'kg' | 'reps' };
    advanced: { min: number; max: number; unit: 'kg' | 'reps' };
  };
  videoUrl?: string; // YouTube or Instagram URL
  thumbnailUrl?: string;
  description: string;
  impact: 'low' | 'moderate' | 'high';
}

// ==================== YOGA & PRANAYAMA ====================

export interface Asana {
  id: string;
  name: string;
  sanskritName: string;
  category: 'activation' | 'stability' | 'mobility' | 'recovery';
  benefits: string[];
  cues: string[];
  duration?: number; // seconds
  videoUrl?: string;
  thumbnailUrl?: string;
}

export interface Pranayama {
  id: string;
  name: string;
  sanskritName: string;
  duration: number; // minutes
  benefit: string;
  instructions: string[];
  videoUrl?: string;
}

// ==================== USER PROFILE ====================

export interface UserProfile {
  id: string;
  name: string;
  age?: number;
  weight?: number;
  gender?: 'male' | 'female' | 'other';
  equipment: EquipmentType[];
  timeOfDayPreference: TimeOfDay;
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  injuries?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ==================== WORKOUT SESSION ====================

export interface WorkoutBlock {
  type: 'warmup' | 'main' | 'skill' | 'circuit' | 'breathwork' | 'cooldown';
  exercises: WorkoutExercise[];
  restBetweenSets?: number; // seconds
  notes?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  load?: number; // kg
  tempo?: string; // e.g., "2-0-2-0"
  restAfter?: number; // seconds
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  date: Date;
  duration: number; // minutes
  focus: FitnessGoal;
  blueprint: SessionBlueprint;
  equipment: EquipmentType[];
  blocks: WorkoutBlock[];
  summary: {
    patterns: MovementPattern[];
    estimatedCalories: number;
    targetMuscles: MuscleGroup[];
  };
  createdAt: Date;
}

// ==================== WORKOUT LOG ====================

export interface SetLog {
  setNumber: number;
  reps: number;
  load?: number; // kg
  tempo?: string;
  rpe?: number; // 1-10 scale
  completed: boolean;
}

export interface ExerciseLog {
  exerciseId: string;
  sets: SetLog[];
  notes?: string;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  workoutPlanId?: string; // If following a generated plan
  date: Date;
  duration: number; // actual duration in minutes
  exercises: ExerciseLog[];
  preworkoutState: {
    energyLevel: number; // 1-5
    soreness: { [key in MuscleGroup]?: number }; // 0-10
    mood?: number; // 1-5
    stress?: number; // 1-5
  };
  postworkoutState: {
    rpe: number; // 1-10
    focusRating: number; // 1-5
    notes?: string;
  };
  completedAt: Date;
}

// ==================== ANALYTICS ====================

export interface PatternVolume {
  pattern: MovementPattern;
  totalReps: number;
  totalLoad: number; // kg * reps
  frequency: number; // times trained
  lastTrained: Date;
}

export interface MuscleRecovery {
  muscle: MuscleGroup;
  recoveryScore: number; // 0-100, 100 = fully recovered
  lastTrained: Date;
  soreness: number; // 0-10
}

export interface ProgressMetrics {
  userId: string;
  weekStart: Date;
  totalWorkouts: number;
  totalDuration: number; // minutes
  patternVolumes: PatternVolume[];
  muscleRecovery: MuscleRecovery[];
  averageRPE: number;
  averageEnergyLevel: number;
  estimatedWeeklyCalories: number;
}

// ==================== GENERATOR INPUTS ====================

export interface WorkoutGeneratorInput {
  userId: string;
  timeOfDay: TimeOfDay;
  durationMinutes: number;
  availableEquipment: EquipmentType[];
  energyLevel: number; // 1-5
  soreness: { [key in MuscleGroup]?: number }; // 0-10
  mood?: number; // 1-5
  stress?: number; // 1-5
  goal?: FitnessGoal; // Override user's default goal
}

export interface FatigueMap {
  [pattern: string]: {
    lastTrained: Date;
    hoursAgo: number;
    intensity: number; // 0-10
    needsRest: boolean;
  };
}

// ==================== AI/GEMINI ====================

export interface AICoachingInsight {
  id: string;
  userId: string;
  type: 'workout_suggestion' | 'recovery_recommendation' | 'form_tip' | 'progression_advice';
  message: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dismissed: boolean;
}

export interface GeminiConfig {
  apiKey: string;
  enabled: boolean;
}

// ==================== SETTINGS ====================

export interface AppSettings {
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  voiceGuidance: boolean;
  notificationsEnabled: boolean;
  workoutReminders: boolean;
  geminiConfig?: GeminiConfig;
  updatedAt: Date;
}
