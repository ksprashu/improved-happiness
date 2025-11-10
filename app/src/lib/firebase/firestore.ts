import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { db } from './config';
import {
  UserProfile,
  WorkoutPlan,
  WorkoutLog,
  AppSettings,
  AICoachingInsight,
  ProgressMetrics
} from '@/types';

// ==================== USER PROFILE ====================

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const createUserProfile = async (profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserProfile> => {
  try {
    const userId = `user-${Date.now()}`;
    const now = new Date();

    const newProfile: UserProfile = {
      ...profile,
      id: userId,
      createdAt: now,
      updatedAt: now
    };

    await setDoc(doc(db, 'users', userId), {
      ...newProfile,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now)
    });

    return newProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date())
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// ==================== WORKOUT PLANS ====================

export const saveWorkoutPlan = async (plan: WorkoutPlan): Promise<void> => {
  try {
    await setDoc(doc(db, 'workoutPlans', plan.id), {
      ...plan,
      date: Timestamp.fromDate(plan.date),
      createdAt: Timestamp.fromDate(plan.createdAt)
    });
  } catch (error) {
    console.error('Error saving workout plan:', error);
    throw error;
  }
};

export const getWorkoutPlan = async (planId: string): Promise<WorkoutPlan | null> => {
  try {
    const docSnap = await getDoc(doc(db, 'workoutPlans', planId));

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        date: data.date?.toDate(),
        createdAt: data.createdAt?.toDate()
      } as WorkoutPlan;
    }
    return null;
  } catch (error) {
    console.error('Error getting workout plan:', error);
    throw error;
  }
};

export const getUserWorkoutPlans = async (userId: string, limitCount = 30): Promise<WorkoutPlan[]> => {
  try {
    const q = query(
      collection(db, 'workoutPlans'),
      where('userId', '==', userId),
      orderBy('date', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        date: data.date?.toDate(),
        createdAt: data.createdAt?.toDate()
      } as WorkoutPlan;
    });
  } catch (error) {
    console.error('Error getting user workout plans:', error);
    throw error;
  }
};

// ==================== WORKOUT LOGS ====================

export const saveWorkoutLog = async (log: WorkoutLog): Promise<void> => {
  try {
    await setDoc(doc(db, 'workoutLogs', log.id), {
      ...log,
      date: Timestamp.fromDate(log.date),
      completedAt: Timestamp.fromDate(log.completedAt)
    });
  } catch (error) {
    console.error('Error saving workout log:', error);
    throw error;
  }
};

export const getWorkoutLog = async (logId: string): Promise<WorkoutLog | null> => {
  try {
    const docSnap = await getDoc(doc(db, 'workoutLogs', logId));

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        date: data.date?.toDate(),
        completedAt: data.completedAt?.toDate()
      } as WorkoutLog;
    }
    return null;
  } catch (error) {
    console.error('Error getting workout log:', error);
    throw error;
  }
};

export const getUserWorkoutLogs = async (
  userId: string,
  limitCount = 50
): Promise<WorkoutLog[]> => {
  try {
    const q = query(
      collection(db, 'workoutLogs'),
      where('userId', '==', userId),
      orderBy('completedAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        date: data.date?.toDate(),
        completedAt: data.completedAt?.toDate()
      } as WorkoutLog;
    });
  } catch (error) {
    console.error('Error getting user workout logs:', error);
    throw error;
  }
};

// ==================== APP SETTINGS ====================

export const getUserSettings = async (userId: string): Promise<AppSettings | null> => {
  try {
    const docSnap = await getDoc(doc(db, 'settings', userId));

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        updatedAt: data.updatedAt?.toDate()
      } as AppSettings;
    }
    return null;
  } catch (error) {
    console.error('Error getting user settings:', error);
    throw error;
  }
};

export const saveUserSettings = async (settings: AppSettings): Promise<void> => {
  try {
    await setDoc(doc(db, 'settings', settings.userId), {
      ...settings,
      updatedAt: Timestamp.fromDate(settings.updatedAt)
    });
  } catch (error) {
    console.error('Error saving user settings:', error);
    throw error;
  }
};

// ==================== AI COACHING INSIGHTS ====================

export const getUserInsights = async (userId: string): Promise<AICoachingInsight[]> => {
  try {
    const q = query(
      collection(db, 'insights'),
      where('userId', '==', userId),
      where('dismissed', '==', false),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate()
      } as AICoachingInsight;
    });
  } catch (error) {
    console.error('Error getting user insights:', error);
    throw error;
  }
};

export const dismissInsight = async (insightId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'insights', insightId), {
      dismissed: true
    });
  } catch (error) {
    console.error('Error dismissing insight:', error);
    throw error;
  }
};

// ==================== PROGRESS METRICS ====================

export const saveProgressMetrics = async (metrics: ProgressMetrics): Promise<void> => {
  try {
    const metricsId = `${metrics.userId}-${metrics.weekStart.getTime()}`;
    await setDoc(doc(db, 'progressMetrics', metricsId), {
      ...metrics,
      weekStart: Timestamp.fromDate(metrics.weekStart),
      muscleRecovery: metrics.muscleRecovery.map(mr => ({
        ...mr,
        lastTrained: Timestamp.fromDate(mr.lastTrained)
      })),
      patternVolumes: metrics.patternVolumes.map(pv => ({
        ...pv,
        lastTrained: Timestamp.fromDate(pv.lastTrained)
      }))
    });
  } catch (error) {
    console.error('Error saving progress metrics:', error);
    throw error;
  }
};

export const getProgressMetrics = async (
  userId: string,
  weekStart: Date
): Promise<ProgressMetrics | null> => {
  try {
    const metricsId = `${userId}-${weekStart.getTime()}`;
    const docSnap = await getDoc(doc(db, 'progressMetrics', metricsId));

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        weekStart: data.weekStart?.toDate(),
        muscleRecovery: data.muscleRecovery?.map((mr: any) => ({
          ...mr,
          lastTrained: mr.lastTrained?.toDate()
        })),
        patternVolumes: data.patternVolumes?.map((pv: any) => ({
          ...pv,
          lastTrained: pv.lastTrained?.toDate()
        }))
      } as ProgressMetrics;
    }
    return null;
  } catch (error) {
    console.error('Error getting progress metrics:', error);
    throw error;
  }
};
