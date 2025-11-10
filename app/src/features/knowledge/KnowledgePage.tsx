import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Book, Dumbbell, Target, Heart } from 'lucide-react';

const KnowledgePage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Knowledge Base
        </h1>
        <p className="text-gray-600">
          Philosophy, principles, and traditional training
        </p>
      </div>

      {/* Core Ethos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="text-pink-600" />
            Core Ethos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Movement → Mechanics → Metabolism → Mind</h3>
            <p className="text-gray-700 text-sm">
              This is the foundational flow of our training system. Every session begins with conscious movement,
              progresses through proper mechanics, drives metabolic adaptation, and culminates in mental clarity.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Four Pillars</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• <strong>Movement before muscle</strong> - Quality of motion precedes muscle building</li>
              <li>• <strong>Breath before intensity</strong> - Breathing drives every movement</li>
              <li>• <strong>Consistency before complexity</strong> - Simple, regular practice beats sporadic intensity</li>
              <li>• <strong>Flow before formality</strong> - Natural movement patterns over rigid routines</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Traditional Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="text-orange-600" />
            Traditional Indian Training Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">Gada (Mace)</h4>
            <p className="text-sm text-gray-700 mb-2">
              Ancient warrior training tool. Long lever arm builds rotational strength, posterior chain power,
              and grip endurance. Start with 4-6 kg, progress to 8-12 kg.
            </p>
            <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
              Builds: Lats, Glutes, Core, Grip
            </span>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">Mudgar (Indian Clubs)</h4>
            <p className="text-sm text-gray-700 mb-2">
              Traditional shoulder health and rotational training. Builds rotator cuff strength,
              oblique control, and rhythm. Use 3-6 kg.
            </p>
            <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
              Builds: Shoulders, Obliques, Forearms
            </span>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">Baithak (Hindu Squat)</h4>
            <p className="text-sm text-gray-700 mb-2">
              Traditional leg endurance exercise. Rhythmic squatting with breath coordination.
              Enhances knee mobility and cardiovascular fitness.
            </p>
            <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
              Builds: Leg Endurance, Cardio, Mobility
            </span>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Dand (Indian Push-up)</h4>
            <p className="text-sm text-gray-700 mb-2">
              Flowing push-up with spinal wave. Integrates chest, triceps, and back in one fluid movement.
            </p>
            <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
              Builds: Chest, Triceps, Spinal Mobility
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Training Principles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-green-600" />
            Training Principles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Progressive Overload</h4>
            <p className="text-sm text-gray-700">
              Gradually increase load, volume, density, or complexity. The AI tracks your progress
              and suggests progressions.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-1">Recovery Windows</h4>
            <p className="text-sm text-gray-700">
              Allow 48 hours between heavy sessions targeting the same movement pattern.
              The system ensures balanced programming.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-1">Fat Burn & EPOC</h4>
            <p className="text-sm text-gray-700">
              Prioritize large muscle groups and compound movements. High-intensity work with rotational
              patterns maximizes post-workout calorie burn (EPOC).
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-1">Breath Integration</h4>
            <p className="text-sm text-gray-700">
              Every session includes pranayama. Breathwork regulates hormones, reduces cortisol,
              and improves recovery.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgePage;
