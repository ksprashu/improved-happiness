import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useWorkoutStore } from '@/stores/workoutStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TrendingUp, Calendar, Zap, Target } from 'lucide-react';
import { format, subDays } from 'date-fns';

const ProgressPage = () => {
  const { profile } = useUserStore();
  const { workoutHistory, loadWorkoutHistory } = useWorkoutStore();

  useEffect(() => {
    if (profile) {
      loadWorkoutHistory(profile.id);
    }
  }, [profile]);

  const last30Days = workoutHistory.filter(
    log => new Date(log.date) > subDays(new Date(), 30)
  );

  const totalWorkouts = last30Days.length;
  const totalMinutes = last30Days.reduce((sum, log) => sum + log.duration, 0);
  const avgRPE = last30Days.length > 0
    ? (last30Days.reduce((sum, log) => sum + log.postworkoutState.rpe, 0) / last30Days.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Progress
        </h1>
        <p className="text-gray-600">
          Last 30 days
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="mx-auto mb-2 text-blue-600" size={32} />
            <div className="text-3xl font-bold text-gray-900">{totalWorkouts}</div>
            <div className="text-sm text-gray-600">Workouts</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="mx-auto mb-2 text-orange-600" size={32} />
            <div className="text-3xl font-bold text-gray-900">{totalMinutes}</div>
            <div className="text-sm text-gray-600">Minutes</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto mb-2 text-green-600" size={32} />
            <div className="text-3xl font-bold text-gray-900">{avgRPE}</div>
            <div className="text-sm text-gray-600">Avg RPE</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="mx-auto mb-2 text-purple-600" size={32} />
            <div className="text-3xl font-bold text-gray-900">
              {Math.round(totalWorkouts / 4.3)}
            </div>
            <div className="text-sm text-gray-600">Per Week</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Workouts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          {last30Days.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              No workouts logged yet
            </p>
          ) : (
            <div className="space-y-3">
              {last30Days.slice(0, 10).map((log) => (
                <div key={log.id} className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <div>
                    <p className="font-medium text-gray-900">
                      {format(new Date(log.date), 'MMM d, yyyy')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {log.duration} min • {log.exercises.length} exercises
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {log.postworkoutState.rpe}/10
                    </div>
                    <div className="text-xs text-gray-600">RPE</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;
