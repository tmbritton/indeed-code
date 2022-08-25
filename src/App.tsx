import { Fragment } from 'react';
import { ReactComponent as Logo } from './IndeedLogo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './screens/Start';
import Quiz from './screens/Quiz';
import Results from './screens/Results';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}
