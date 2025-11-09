import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserStore } from './stores/userStore';
import Layout from './components/layout/Layout';

// Pages
import HomePage from './features/home/HomePage';
import ProfileSetupPage from './features/profile/ProfileSetupPage';
import WorkoutGeneratorPage from './features/workout-generator/WorkoutGeneratorPage';
import WorkoutGuidancePage from './features/guidance/WorkoutGuidancePage';
import WorkoutLogPage from './features/workout-logger/WorkoutLogPage';
import ProgressPage from './features/analytics/ProgressPage';
import YogaPage from './features/yoga/YogaPage';
import KnowledgePage from './features/knowledge/KnowledgePage';
import SettingsPage from './features/profile/SettingsPage';

function App() {
  const { profile, loadProfile } = useUserStore();

  useEffect(() => {
    // Try to load user profile from local storage on app start
    const storedProfile = useUserStore.getState().profile;
    if (storedProfile) {
      loadProfile(storedProfile.id);
    }
  }, []);

  // If no profile exists, redirect to setup
  if (!profile) {
    return (
      <Router>
        <Routes>
          <Route path="/setup" element={<ProfileSetupPage />} />
          <Route path="*" element={<Navigate to="/setup" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<WorkoutGeneratorPage />} />
          <Route path="/workout/:planId" element={<WorkoutGuidancePage />} />
          <Route path="/log/:planId?" element={<WorkoutLogPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/yoga" element={<YogaPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
