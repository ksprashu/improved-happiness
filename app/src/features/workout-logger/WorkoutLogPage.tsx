import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkoutStore } from '@/stores/workoutStore';
import { useUserStore } from '@/stores/userStore';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { WorkoutLog } from '@/types';

const WorkoutLogPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { currentPlan, logWorkout } = useWorkoutStore();
  const { profile } = useUserStore();

  const [rpe, setRpe] = useState(5);
  const [focusRating, setFocusRating] = useState(3);
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    if (!profile || !currentPlan) return;

    const log: WorkoutLog = {
      id: `log-${Date.now()}`,
      userId: profile.id,
      workoutPlanId: currentPlan.id,
      date: new Date(),
      duration: currentPlan.duration,
      exercises: currentPlan.blocks.flatMap(block =>
        block.exercises.map(ex => ({
          exerciseId: ex.exerciseId,
          sets: Array.from({ length: ex.sets }, (_, i) => ({
            setNumber: i + 1,
            reps: ex.reps,
            load: ex.load,
            rpe: rpe,
            completed: true
          })),
          notes: ''
        }))
      ),
      preworkoutState: {
        energyLevel: 3,
        soreness: {}
      },
      postworkoutState: {
        rpe,
        focusRating,
        notes
      },
      completedAt: new Date()
    };

    await logWorkout(log);
    navigate('/');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Log Your Workout
        </h1>
        <p className="text-gray-600">
          How did it go?
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post-Workout Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Effort (RPE: 1-10)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setRpe(level)}
                  className={`flex-1 py-2 rounded-lg border-2 text-sm font-medium ${
                    rpe === level
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mental Focus (1-5)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFocusRating(level)}
                  className={`flex-1 py-2 rounded-lg border-2 font-medium ${
                    focusRating === level
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did you feel? Any observations?"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSubmit} size="lg" className="w-full">
        Save Workout Log
      </Button>
    </div>
  );
};

export default WorkoutLogPage;
