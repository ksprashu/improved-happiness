import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SetupScreen from './screens/SetupScreen';
import WorkoutScreen from './screens/WorkoutScreen';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-earth-900 text-earth-50 font-sans">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/setup" element={<SetupScreen />} />
          <Route path="/workout" element={<WorkoutScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;