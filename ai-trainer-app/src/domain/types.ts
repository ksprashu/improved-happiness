export type MovementPattern = 'hinge' | 'squat' | 'push' | 'pull' | 'rotate' | 'carry' | 'mobility' | 'anti_rotation' | 'anti_extension' | 'breath';
export type MuscleGroup = 'quads' | 'glutes' | 'hamstrings' | 'chest' | 'lats' | 'shoulders' | 'triceps' | 'biceps' | 'core' | 'obliques' | 'forearms' | 'posterior_chain' | 'mid_back' | 'rear_delts' | 'rotator_cuff' | 'shoulder_capsule' | 'pecs' | 'diaphragm' | 'calves' | 'upper_back';
export type Equipment = 'gada' | 'mudgar' | 'kettlebell' | 'dumbbell' | 'bodyweight' | 'band' | 'yoga_mat' | 'none';

export interface Exercise {
  id: string;
  name: string; // Human readable name if different from ID
  tool: Equipment;
  pattern: MovementPattern;
  primary_muscles: MuscleGroup[];
  secondary_muscles: MuscleGroup[];
  cues: string;
  regress?: string[];
  progress?: string[];
  impact?: 'low' | 'moderate' | 'high';
}

export interface UserProfile {
  name: string;
  available_equipment: Equipment[];
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  goals: ('fat_burn' | 'strength' | 'mobility' | 'epoc' | 'vo2')[];
  injuries: MuscleGroup[];
}

export type SessionType = 'micro' | 'strength_burn' | 'full_flow';

export interface WorkoutBlock {
  type: 'warmup' | 'main' | 'skill' | 'circuit' | 'breathwork' | 'cooldown';
  exercises: {
    exercise: Exercise;
    sets: number;
    reps_or_duration: number | string; // e.g., 10 or "30s"
    load_guidance?: string;
    rest_sec: number;
  }[];
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  date: number;
  duration_minutes: number;
  session_type: SessionType;
  focus: string[];
  blocks: WorkoutBlock[];
  estimated_calories?: number;
}

export interface WorkoutLog {
  id: string;
  plan_id: string;
  date_started: number;
  date_completed: number;
  duration_actual_minutes: number;
  exercises_completed: {
    exercise_id: string;
    sets_completed: number;
    reps_actual: number[]; // per set
    load_actual_kg: number[]; // per set
    rpe: number; // 1-10 average for exercise
  }[];
  soreness_post: Partial<Record<MuscleGroup, number>>;
  energy_rating: number; // 1-5
  notes: string;
}
