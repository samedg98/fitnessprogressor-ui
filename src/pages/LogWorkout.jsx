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
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Log Workout</h2>

      <ErrorMessage message={error} />
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Exercise"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          required
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />

        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          required
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />

        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />

        <input
          type="number"
          placeholder="Weight (lbs)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />

        <button type="submit" className="btn-block btn-lg">
          Save Workout
        </button>
      </form>
    </div>
  );
}
