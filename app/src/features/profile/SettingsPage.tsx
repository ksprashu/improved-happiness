import { useState, useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { User, Bell, Sparkles, LogOut } from 'lucide-react';

const SettingsPage = () => {
  const { profile, settings, updateProfile, updateSettings } = useUserStore();
  const [geminiApiKey, setGeminiApiKey] = useState('');

  useEffect(() => {
    if (settings?.geminiConfig?.apiKey) {
      setGeminiApiKey(settings.geminiConfig.apiKey);
    }
  }, [settings]);

  const handleSaveGeminiKey = async () => {
    await updateSettings({
      geminiConfig: {
        apiKey: geminiApiKey,
        enabled: geminiApiKey.length > 0
      }
    });
  };

  const handleToggleSetting = async (key: string, value: boolean) => {
    await updateSettings({ [key]: value });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Manage your profile and preferences
        </p>
      </div>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="text-blue-600" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700">Name</span>
            <span className="font-medium">{profile?.name}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700">Experience Level</span>
            <span className="font-medium capitalize">{profile?.experienceLevel}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700">Primary Goal</span>
            <span className="font-medium capitalize">{profile?.fitnessGoal.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700">Equipment</span>
            <span className="font-medium">{profile?.equipment.length} items</span>
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="text-orange-600" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">Voice Guidance</p>
              <p className="text-sm text-gray-600">Audio cues during workouts</p>
            </div>
            <input
              type="checkbox"
              checked={settings?.voiceGuidance || false}
              onChange={(e) => handleToggleSetting('voiceGuidance', e.target.checked)}
              className="w-5 h-5"
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">Notifications</p>
              <p className="text-sm text-gray-600">Push notifications</p>
            </div>
            <input
              type="checkbox"
              checked={settings?.notificationsEnabled || false}
              onChange={(e) => handleToggleSetting('notificationsEnabled', e.target.checked)}
              className="w-5 h-5"
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">Workout Reminders</p>
              <p className="text-sm text-gray-600">Daily training reminders</p>
            </div>
            <input
              type="checkbox"
              checked={settings?.workoutReminders || false}
              onChange={(e) => handleToggleSetting('workoutReminders', e.target.checked)}
              className="w-5 h-5"
            />
          </div>
        </CardContent>
      </Card>

      {/* Gemini AI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-purple-600" />
            AI Features (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-700 mb-3">
              Enable AI-powered coaching insights by providing your Google Gemini API key.
              The rule-based workout generator works without this.
            </p>
            <Input
              label="Gemini API Key"
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="Enter your API key"
            />
            <Button
              onClick={handleSaveGeminiKey}
              variant="secondary"
              size="sm"
              className="mt-2"
            >
              Save API Key
            </Button>
          </div>
          {settings?.geminiConfig?.enabled && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                ✓ AI features are enabled
              </p>
            </div>
          )}
          <div className="text-xs text-gray-600">
            <p>Get your API key from: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google AI Studio</a></p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center gap-2">
            <LogOut />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            Reset your profile and start fresh
          </p>
          <Button variant="danger" size="sm">
            Reset Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
