import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateWorkoutPlan } from '../domain/WorkoutGenerator';
import type { UserProfile } from '../domain/types';
import { Battery, Clock, ArrowRight } from 'lucide-react';

// Mock user for V1 - in real app this comes from DB/Context
const MOCK_USER: UserProfile = {
  name: 'Warrior',
  available_equipment: ['gada', 'mudgar', 'dumbbell', 'bodyweight', 'band', 'kettlebell'],
  experience_level: 'intermediate',
  goals: ['fat_burn', 'strength'],
  injuries: []
};

export default function SetupScreen() {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(30);
  const [energy, setEnergy] = useState(3);

  const handleGenerate = () => {
    const timeOfDay = new Date().getHours() < 12 ? 'morning' : 'evening';
    const plan = generateWorkoutPlan(MOCK_USER, duration, timeOfDay, energy, {});
    navigate('/workout', { state: { plan } });
  };

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-earth-100 mb-8">Setup Session</h2>

      <div className="flex-1 space-y-10">
        {/* Duration Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-earth-200 font-medium">
              <Clock className="w-5 h-5" />
              <span>Time Available</span>
            </label>
            <span className="text-xl font-bold text-clay-500">{duration} min</span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-clay-500"
          />
          <div className="flex justify-between text-xs text-earth-500">
            <span>Micro (10m)</span>
            <span>Strength (30m)</span>
            <span>Flow (60m)</span>
          </div>
        </div>

        {/* Energy Input */}
        <div className="space-y-4">
          <label className="flex items-center space-x-2 text-earth-200 font-medium">
            <Battery className="w-5 h-5" />
            <span>Energy Level</span>
          </label>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setEnergy(level)}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  energy === level
                    ? 'bg-clay-500 text-white scale-110 shadow-lg'
                    : 'bg-earth-800 text-earth-400 hover:bg-earth-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-earth-400">
            {energy <= 2 ? 'Low - We will focus on flow & recovery' : energy >= 4 ? 'High - Ready to push hard!' : 'Moderate - Balanced session'}
          </p>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-4 text-xl font-semibold rounded-xl bg-earth-100 text-earth-900 shadow-lg hover:bg-white transition-all active:scale-95 flex items-center justify-center space-x-2 mt-8"
      >
        <span>Generate Plan</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
