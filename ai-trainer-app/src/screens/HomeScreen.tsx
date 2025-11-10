import { useNavigate } from 'react-router-dom';
import { Dumbbell, Wind } from 'lucide-react';

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-earth-100 tracking-tight">
          Mudgar Mate
        </h1>
        <p className="text-earth-400">
          Movement • Mechanics • Metabolism • Mind
        </p>
      </div>

      <div className="p-8 border-2 border-earth-700 rounded-full bg-earth-800/50">
        <Dumbbell className="w-16 h-16 text-earth-300" />
      </div>

      <button
        onClick={() => navigate('/setup')}
        className="w-full max-w-xs py-4 text-xl font-semibold rounded-xl bg-clay-500 text-white shadow-lg hover:bg-clay-600 transition-all active:scale-95 flex items-center justify-center space-x-2"
      >
        <span>Start Training</span>
      </button>

      <div className="flex items-center space-x-2 text-earth-500">
        <Wind className="w-5 h-5" />
        <span className="text-sm">Remember to breathe.</span>
      </div>
    </div>
  );
}
