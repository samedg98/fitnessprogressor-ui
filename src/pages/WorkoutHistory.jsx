import { useEffect, useState } from "react";
import api from "../api/axios";

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/workouts/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWorkouts(response.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Workout History</h2>

      {workouts.length === 0 && <p>No workouts logged yet.</p>}

      {workouts.map((w) => (
        <div
          key={w.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <p><strong>Exercise:</strong> {w.exercise}</p>
          <p><strong>Sets:</strong> {w.sets}</p>
          <p><strong>Reps:</strong> {w.reps}</p>
          <p><strong>Weight:</strong> {w.weight ?? "N/A"}</p>
          <p><strong>Date:</strong> {new Date(w.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
