import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './screens/Start';
import Quiz from './screens/Quiz';
import Results from './screens/Results';
import Sandbox from './screens/Sandbox';
import Providers from './providers';

export default function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/sandbox" element={<Sandbox />} />
        </Routes>
      </Router>
    </Providers>
  );
}
