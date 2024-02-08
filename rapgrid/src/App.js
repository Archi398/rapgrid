import './App.css';
import { Routes, Route } from "react-router-dom";

import Navigation from './pages/Navigation';
import Home from './pages/Home';
import QuizFR from "./pages/QuizFR";
import QuizFRSecret from "./pages/QuizFRSecret";
import Grid from './pages/Grid';

function App() {
  return (
    <div className="pt-24 w-full h-full max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="gridrap" element={<Grid />} />
          <Route path="/quiz/fr" element={<QuizFR />} />
          <Route path="/quiz/fr/secret" element={<QuizFRSecret />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;