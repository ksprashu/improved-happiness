import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { useWorkoutStore } from '@/stores/workoutStore';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Dumbbell, TrendingUp, Heart, Book, Zap } from 'lucide-react';
import { format } from 'date-fns';

const HomePage = () => {
  const { profile } = useUserStore();
  const { workoutHistory, currentPlan, loadWorkoutHistory } = useWorkoutStore();

  useEffect(() => {
    if (profile) {
      loadWorkoutHistory(profile.id);
    }
  }, [profile]);

  const lastWorkout = workoutHistory[0];
  const thisWeekWorkouts = workoutHistory.filter(
    log => new Date(log.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {profile?.name}! 🔥
        </h2>
        <p className="text-blue-100 mb-4">
          Movement → Mechanics → Metabolism → Mind
        </p>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-3xl font-bold">{thisWeekWorkouts.length}</div>
            <div className="text-sm text-blue-100">Workouts This Week</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-3xl font-bold">
              {thisWeekWorkouts.reduce((sum, w) => sum + w.duration, 0)}
            </div>
            <div className="text-sm text-blue-100">Minutes Trained</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ready to Train?</CardTitle>
        </CardHeader>
        <CardContent>
          <Link to="/generate">
            <Button size="lg" className="w-full mb-3">
              <Zap className="mr-2" size={20} />
              Generate Today's Workout
            </Button>
          </Link>
          {currentPlan && (
            <Link to={`/workout/${currentPlan.id}`}>
              <Button variant="outline" size="lg" className="w-full">
                <Dumbbell className="mr-2" size={20} />
                Continue Current Plan
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>

      {/* Last Workout Summary */}
      {lastWorkout && (
        <Card>
          <CardHeader>
            <CardTitle>Last Workout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium text-gray-900">
                  {format(new Date(lastWorkout.date), 'EEEE, MMM d')}
                </p>
                <p className="text-sm text-gray-600">
                  {lastWorkout.duration} minutes
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {lastWorkout.postworkoutState.rpe}/10
                </div>
                <div className="text-xs text-gray-600">RPE</div>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                {lastWorkout.exercises.length} exercises
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                Energy: {lastWorkout.preworkoutState.energyLevel}/5
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/progress">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <TrendingUp className="mx-auto mb-2 text-blue-600" size={32} />
              <p className="font-medium">Progress</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/yoga">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Heart className="mx-auto mb-2 text-pink-600" size={32} />
              <p className="font-medium">Yoga</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/knowledge">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Book className="mx-auto mb-2 text-purple-600" size={32} />
              <p className="font-medium">Knowledge</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/log">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Dumbbell className="mx-auto mb-2 text-orange-600" size={32} />
              <p className="font-medium">Log Workout</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Daily Quote/Tip */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-orange-900 mb-1">
            Today's Principle
          </p>
          <p className="text-gray-700 italic">
            "Breath before intensity. Every movement begins with conscious breathing."
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
