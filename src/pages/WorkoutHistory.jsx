import { useEffect, useState } from "react";
import api from "../api/axios";

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch history
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

  // Delete workout
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/workouts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh list after deletion
      fetchHistory();
    } catch (err) {
      console.error("Failed to delete workout:", err);
      alert("Failed to delete workout");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <h2>Workout History</h2>

      {workouts.length === 0 && <p>No workouts logged yet.</p>}

      {workouts.map((w) => (
        <div key={w.id} className="workout-item">
          <h3>{w.exercise}</h3>

          <p><strong>Sets:</strong> {w.sets}</p>
          <p><strong>Reps:</strong> {w.reps}</p>
          <p><strong>Weight:</strong> {w.weight ?? "N/A"}</p>
          <p><strong>Date:</strong> {new Date(w.date).toLocaleDateString()}</p>

          <button
            className="delete-btn"
            style={{ marginTop: 10 }}
            onClick={() => handleDelete(w.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
