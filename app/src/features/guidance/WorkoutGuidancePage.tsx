import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useWorkoutStore } from '@/stores/workoutStore';
import { EXERCISES } from '@/data/exercises';
import { PRANAYAMA } from '@/data/yoga';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Play, Check, ChevronRight, ExternalLink } from 'lucide-react';

const WorkoutGuidancePage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { currentPlan } = useWorkoutStore();
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const plan = planId === 'current' ? currentPlan : null;

  if (!plan) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No workout plan found</p>
        <Link to="/generate">
          <Button>Generate Workout</Button>
        </Link>
      </div>
    );
  }

  const currentBlock = plan.blocks[currentBlockIndex];
  const currentExercise = currentBlock?.exercises[currentExerciseIndex];
  const exercise = currentExercise ? (EXERCISES[currentExercise.exerciseId] || PRANAYAMA[currentExercise.exerciseId]) : null;

  const handleNext = () => {
    if (currentExerciseIndex < currentBlock.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (currentBlockIndex < plan.blocks.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1);
      setCurrentExerciseIndex(0);
    } else {
      // Workout complete
      navigate(`/log/${plan.id}`);
    }
  };

  const progress = ((currentBlockIndex * 10 + currentExerciseIndex) / (plan.blocks.length * 10)) * 100;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Block {currentBlockIndex + 1} of {plan.blocks.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Block */}
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{currentBlock.type} Block</CardTitle>
        </CardHeader>
        <CardContent>
          {currentBlock.notes && (
            <p className="text-sm text-gray-600 mb-4">{currentBlock.notes}</p>
          )}
        </CardContent>
      </Card>

      {/* Current Exercise */}
      {exercise && (
        <Card className="border-2 border-blue-600">
          <CardHeader>
            <CardTitle>{exercise.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Sets/Reps/Load */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-700">{currentExercise.sets}</div>
                <div className="text-xs text-gray-600">Sets</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-700">{currentExercise.reps}</div>
                <div className="text-xs text-gray-600">Reps</div>
              </div>
              {currentExercise.load && (
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-700">{currentExercise.load}</div>
                  <div className="text-xs text-gray-600">kg</div>
                </div>
              )}
            </div>

            {/* Description */}
            {exercise.description && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{exercise.description}</p>
              </div>
            )}

            {/* Cues */}
            {'cues' in exercise && exercise.cues && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Form Cues</h4>
                <ul className="space-y-1">
                  {exercise.cues.map((cue, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <Check className="mr-2 mt-0.5 text-green-600 flex-shrink-0" size={16} />
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Breathing Pattern */}
            {'breathingPattern' in exercise && exercise.breathingPattern && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-medium text-green-900 mb-1">Breathing</h4>
                <p className="text-sm text-green-800">{exercise.breathingPattern}</p>
              </div>
            )}

            {/* Video Link */}
            {exercise.videoUrl && (
              <a
                href={exercise.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Play size={20} />
                Watch Demonstration
                <ExternalLink size={16} />
              </a>
            )}

            {/* Rest Time */}
            {currentExercise.restAfter && currentExercise.restAfter > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                <p className="text-sm text-yellow-900">
                  Rest {currentExercise.restAfter} seconds after completing
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex gap-4">
        <Button
          onClick={() => navigate(`/log/${plan.id}`)}
          variant="outline"
          className="flex-1"
        >
          Skip to Log
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1"
        >
          Next
          <ChevronRight className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default WorkoutGuidancePage;
