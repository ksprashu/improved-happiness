import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { EquipmentType, FitnessGoal, ExperienceLevel, TimeOfDay } from '@/types';

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const { createProfile, isLoading } = useUserStore();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    gender: 'male' as 'male' | 'female' | 'other',
    fitnessGoal: 'fat_burn' as FitnessGoal,
    experienceLevel: 'beginner' as ExperienceLevel,
    timeOfDayPreference: 'morning' as TimeOfDay,
    equipment: [] as EquipmentType[]
  });

  const equipmentOptions: { value: EquipmentType; label: string }[] = [
    { value: 'gada', label: 'Gada (Mace)' },
    { value: 'mudgar', label: 'Mudgar (Indian Clubs)' },
    { value: 'kettlebell', label: 'Kettlebell' },
    { value: 'dumbbell', label: 'Dumbbells' },
    { value: 'band', label: 'Resistance Bands' },
    { value: 'bodyweight', label: 'Bodyweight' },
    { value: 'yoga_mat', label: 'Yoga Mat' },
    { value: 'bench', label: 'Bench' },
    { value: 'ankle_weights', label: 'Ankle Weights' }
  ];

  const handleEquipmentToggle = (equipment: EquipmentType) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createProfile({
      name: formData.name,
      age: formData.age ? parseInt(formData.age) : undefined,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      gender: formData.gender,
      equipment: formData.equipment,
      timeOfDayPreference: formData.timeOfDayPreference,
      fitnessGoal: formData.fitnessGoal,
      experienceLevel: formData.experienceLevel
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to AI Trainer</h1>
          <p className="text-lg text-gray-600">Let's set up your warrior profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Enter your name"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Age (optional)"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="25"
                />

                <Input
                  label="Weight (kg, optional)"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender (optional)
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Goal
                </label>
                <select
                  value={formData.fitnessGoal}
                  onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value as FitnessGoal })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="fat_burn">Fat Burn & EPOC</option>
                  <option value="strength">Strength Building</option>
                  <option value="mobility">Mobility & Flexibility</option>
                  <option value="recovery">Recovery & Wellness</option>
                  <option value="mix">Balanced Mix</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as ExperienceLevel })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select
                  value={formData.timeOfDayPreference}
                  onChange={(e) => setFormData({ ...formData, timeOfDayPreference: e.target.value as TimeOfDay })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                  <option value="both">Flexible</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Select all equipment you have access to
              </p>
              <div className="grid grid-cols-2 gap-3">
                {equipmentOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleEquipmentToggle(option.value)}
                    className={`px-4 py-3 rounded-lg border-2 text-left transition-all ${
                      formData.equipment.includes(option.value)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Complete Setup & Start Training
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
