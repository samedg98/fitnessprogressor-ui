import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LogWorkout from "./pages/LogWorkout";
import WorkoutHistory from "./pages/WorkoutHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/log" element={<LogWorkout />} />
        <Route path="/history" element={<WorkoutHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
