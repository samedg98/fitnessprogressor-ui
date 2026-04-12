import { useState } from "react";
import api from "../api/axios";

export default function LogWorkout() {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

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
      setMessage("Failed to log workout");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Log Workout</h2>

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

        <button type="submit" style={{ width: "100%" }}>
          Save Workout
        </button>
      </form>
    </div>
  );
}
