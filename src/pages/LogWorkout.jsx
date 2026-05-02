import { useState } from "react";
import api from "../api/axios";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function LogWorkout() {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/workouts/log",
        { exercise, sets, reps, weight, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Workout logged successfully!");
      setExercise("");
      setSets("");
      setReps("");
      setWeight("");
      setDate("");
    } catch (err) {
      console.error(err);
      setError("Failed to log workout.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Log Workout</h2>

        <ErrorMessage message={error} />
        {message && (
          <p style={{ color: "var(--accent)", marginBottom: 20 }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Exercise</label>
            <input
              type="text"
              placeholder="e.g., Bench Press"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Sets</label>
            <input
              type="number"
              placeholder="e.g., 4"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Reps</label>
            <input
              type="number"
              placeholder="e.g., 10"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Weight (lbs)</label>
            <input
              type="number"
              placeholder="e.g., 135"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-block btn-lg">
            Save Workout
          </button>
        </form>
      </div>
    </div>
  );
}
