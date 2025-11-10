import { useLocation, Navigate } from 'react-router-dom';
import type { WorkoutPlan, WorkoutBlock } from '../domain/types';
import { Play, Clock, Dumbbell } from 'lucide-react';

export default function WorkoutScreen() {
  const location = useLocation();
  const plan = location.state?.plan as WorkoutPlan;

  if (!plan) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen p-4 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-earth-100 capitalize">
          {plan.session_type.replace('_', ' ')} Session
        </h2>
        <div className="flex items-center space-x-4 text-earth-400 text-sm mt-1">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{plan.duration_minutes} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Dumbbell className="w-4 h-4" />
            <span>{plan.blocks.reduce((acc, b) => acc + b.exercises.length, 0)} movements</span>
          </div>
        </div>
      </div>

      {/* Blocks List */}
      <div className="space-y-6">
        {plan.blocks.map((block, i) => (
          <BlockCard key={i} block={block} />
        ))}
      </div>

      {/* Floating Start Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <button className="w-full py-4 text-xl font-bold rounded-full bg-clay-500 text-white shadow-lg flex items-center justify-center space-x-2 hover:bg-clay-600 active:scale-95 transition-all">
          <Play className="w-6 h-6 fill-current" />
          <span>BEGIN SESSION</span>
        </button>
      </div>
    </div>
  );
}

function BlockCard({ block }: { block: WorkoutBlock }) {
  return (
    <div className="bg-earth-800/50 rounded-xl p-4 border border-earth-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-earth-200 font-semibold uppercase tracking-wider text-sm">
          {block.type}
        </h3>
        {block.notes && <span className="text-xs text-earth-500 italic">{block.notes}</span>}
      </div>
      <div className="space-y-3">
        {block.exercises.map((ex, j) => (
          <div key={j} className="flex items-start space-x-3">
            <div className="bg-earth-900/50 rounded-md p-2 min-w-[3rem] text-center">
              <div className="font-bold text-earth-100">{ex.sets}x</div>
              <div className="text-xs text-earth-400">{ex.reps_or_duration}</div>
            </div>
            <div>
              <h4 className="font-medium text-earth-100">{ex.exercise.name}</h4>
              <p className="text-sm text-earth-400 leading-tight">{ex.exercise.cues}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
