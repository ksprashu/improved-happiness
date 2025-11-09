import { create } from 'zustand';
import { WorkoutPlan, WorkoutLog, WorkoutGeneratorInput } from '@/types';
import {
  saveWorkoutPlan,
  getUserWorkoutPlans,
  saveWorkoutLog,
  getUserWorkoutLogs
} from '@/lib/firebase/firestore';
import { WorkoutGenerator } from '@/lib/workout-generator/generator';

interface WorkoutState {
  currentPlan: WorkoutPlan | null;
  workoutHistory: WorkoutLog[];
  plans: WorkoutPlan[];
  isLoading: boolean;
  error: string | null;

  // Actions
  generateWorkout: (input: WorkoutGeneratorInput) => Promise<void>;
  setCurrentPlan: (plan: WorkoutPlan) => void;
  savePlan: (plan: WorkoutPlan) => Promise<void>;
  loadPlans: (userId: string) => Promise<void>;

  logWorkout: (log: WorkoutLog) => Promise<void>;
  loadWorkoutHistory: (userId: string) => Promise<void>;

  clearWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  currentPlan: null,
  workoutHistory: [],
  plans: [],
  isLoading: false,
  error: null,

  generateWorkout: async (input: WorkoutGeneratorInput) => {
    set({ isLoading: true, error: null });
    try {
      const { workoutHistory } = get();
      const plan = WorkoutGenerator.generate(input, workoutHistory);

      // Save to Firestore
      await saveWorkoutPlan(plan);

      set({
        currentPlan: plan,
        plans: [plan, ...get().plans],
        isLoading: false
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setCurrentPlan: (plan) => set({ currentPlan: plan }),

  savePlan: async (plan: WorkoutPlan) => {
    try {
      await saveWorkoutPlan(plan);
      set({ plans: [plan, ...get().plans] });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  loadPlans: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const plans = await getUserWorkoutPlans(userId);
      set({ plans, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  logWorkout: async (log: WorkoutLog) => {
    try {
      await saveWorkoutLog(log);
      set({ workoutHistory: [log, ...get().workoutHistory] });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  loadWorkoutHistory: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const history = await getUserWorkoutLogs(userId);
      set({ workoutHistory: history, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  clearWorkout: () => set({
    currentPlan: null,
    workoutHistory: [],
    plans: [],
    error: null
  })
}));
