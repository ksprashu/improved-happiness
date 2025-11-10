import { GoogleGenerativeAI } from '@google/generative-ai';
import { WorkoutLog, AICoachingInsight } from '@/types';

export class GeminiAIService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    }
  }

  isEnabled(): boolean {
    return this.model !== null;
  }

  /**
   * Generate coaching insights based on workout history
   */
  async generateCoachingInsights(
    workoutHistory: WorkoutLog[],
    currentGoal: string
  ): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini API not configured');
    }

    const recentWorkouts = workoutHistory.slice(0, 7);
    const summary = recentWorkouts.map(w => `
      Date: ${w.date}
      Duration: ${w.duration}min
      RPE: ${w.postworkoutState.rpe}/10
      Exercises: ${w.exercises.length}
    `).join('\n');

    const prompt = `You are an AI fitness coach specializing in Indian physical culture and modern exercise science.

User's Goal: ${currentGoal}

Recent Workout History (last 7 sessions):
${summary}

Based on this training data, provide:
1. One key insight about their training pattern
2. One specific recommendation for their next session
3. One recovery or nutrition tip

Keep your response concise (3-4 sentences total), encouraging, and focused on sustainable progress.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  /**
   * Get form cues for a specific exercise
   */
  async generateFormCues(exerciseName: string): Promise<string[]> {
    if (!this.model) {
      throw new Error('Gemini API not configured');
    }

    const prompt = `Provide 5 concise form cues for the exercise: ${exerciseName}.
    Each cue should be one short sentence focused on proper technique, breathing, or common mistakes to avoid.
    Return only the cues, one per line, without numbering.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text.split('\n').filter((line: string) => line.trim().length > 0);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  /**
   * Generate motivational message based on user state
   */
  async generateMotivation(
    energyLevel: number,
    stress: number,
    recentPerformance: string
  ): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini API not configured');
    }

    const prompt = `Generate a brief, encouraging message (2-3 sentences) for a warrior in training with:
    - Energy Level: ${energyLevel}/5
    - Stress: ${stress}/5
    - Recent Performance: ${recentPerformance}

    Be motivating but realistic. Reference the philosophy: "Movement before muscle, Breath before intensity."`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }
}

// Singleton instance
let geminiInstance: GeminiAIService | null = null;

export const initializeGemini = (apiKey: string): void => {
  geminiInstance = new GeminiAIService(apiKey);
};

export const getGeminiService = (): GeminiAIService | null => {
  return geminiInstance;
};
