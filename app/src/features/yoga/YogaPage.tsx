import { ASANAS, PRANAYAMA, getAsanasByCategory } from '@/data/yoga';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Heart, Wind } from 'lucide-react';

const YogaPage = () => {
  const activationAsanas = getAsanasByCategory('activation');
  const recoveryAsanas = getAsanasByCategory('recovery');
  const pranayamas = Object.values(PRANAYAMA);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Yoga & Pranayama
        </h1>
        <p className="text-gray-600">
          Recovery, mobility, and breathwork
        </p>
      </div>

      {/* Pranayama */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="text-blue-600" />
            Pranayama (Breathwork)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pranayamas.map((pranayama) => (
              <div key={pranayama.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{pranayama.name}</h4>
                    <p className="text-sm text-gray-600 italic">{pranayama.sanskritName}</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">{pranayama.duration} min</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{pranayama.benefit}</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-700 mb-1">Instructions:</p>
                  <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                    {pranayama.instructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activation Asanas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="text-pink-600" />
            Activation Asanas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {activationAsanas.map((asana) => (
              <div key={asana.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-1">{asana.name}</h4>
                <p className="text-sm text-gray-600 italic mb-2">{asana.sanskritName}</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {asana.benefits.map((benefit, idx) => (
                    <li key={idx}>• {benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recovery Asanas */}
      <Card>
        <CardHeader>
          <CardTitle>Recovery & Relaxation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {recoveryAsanas.map((asana) => (
              <div key={asana.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-1">{asana.name}</h4>
                <p className="text-sm text-gray-600 italic mb-2">{asana.sanskritName}</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {asana.benefits.map((benefit, idx) => (
                    <li key={idx}>• {benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YogaPage;
