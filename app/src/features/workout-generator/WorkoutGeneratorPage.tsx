import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { useWorkoutStore } from '@/stores/workoutStore';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { WorkoutGeneratorInput, MuscleGroup } from '@/types';
import { Sparkles } from 'lucide-react';

const WorkoutGeneratorPage = () => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const { generateWorkout, isLoading } = useWorkoutStore();

  const [input, setInput] = useState({
    duration: 25,
    energyLevel: 3,
    stress: 3,
    mood: 3,
    soreness: {} as { [key in MuscleGroup]?: number }
  });

  const handleGenerate = async () => {
    if (!profile) return;

    const generatorInput: WorkoutGeneratorInput = {
      userId: profile.id,
      timeOfDay: profile.timeOfDayPreference,
      durationMinutes: input.duration,
      availableEquipment: profile.equipment,
      energyLevel: input.energyLevel,
      soreness: input.soreness,
      mood: input.mood,
      stress: input.stress,
      goal: profile.fitnessGoal
    };

    await generateWorkout(generatorInput);
    navigate('/workout/current');
  };

  const muscleGroups: MuscleGroup[] = [
    'shoulders', 'chest', 'lats', 'core', 'quads', 'glutes', 'hamstrings'
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Generate Workout
        </h1>
        <p className="text-gray-600">
          Answer a few questions to get your personalized workout
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How much time do you have? ({input.duration} minutes)
            </label>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={input.duration}
              onChange={(e) => setInput({ ...input, duration: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10 min</span>
              <span>30 min</span>
              <span>60 min</span>
            </div>
          </div>

          {/* Energy Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Energy Level (1 = Low, 5 = High)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setInput({ ...input, energyLevel: level })}
                  className={`flex-1 py-2 rounded-lg border-2 font-medium ${
                    input.energyLevel === level
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Stress Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stress Level (1 = Calm, 5 = Very Stressed)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setInput({ ...input, stress: level })}
                  className={`flex-1 py-2 rounded-lg border-2 font-medium ${
                    input.stress === level
                      ? 'border-orange-600 bg-orange-50 text-orange-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mood (1 = Low, 5 = Excellent)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setInput({ ...input, mood: level })}
                  className={`flex-1 py-2 rounded-lg border-2 font-medium ${
                    input.mood === level
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Muscle Soreness (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Rate soreness from 0 (none) to 10 (very sore) for each muscle group
          </p>
          <div className="space-y-3">
            {muscleGroups.map((muscle) => (
              <div key={muscle}>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {muscle}
                  </label>
                  <span className="text-sm text-gray-600">
                    {input.soreness[muscle] || 0}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={input.soreness[muscle] || 0}
                  onChange={(e) => setInput({
                    ...input,
                    soreness: {
                      ...input.soreness,
                      [muscle]: parseInt(e.target.value)
                    }
                  })}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleGenerate}
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        <Sparkles className="mr-2" size={20} />
        Generate My Workout
      </Button>

      <div className="text-center text-sm text-gray-600">
        <p>
          The AI will create a personalized workout based on your inputs,
          available equipment, and recent training history.
        </p>
      </div>
    </div>
  );
};

export default WorkoutGeneratorPage;
