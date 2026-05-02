import { useEffect, useState } from "react";
import api from "../api/axios";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError("Failed to load workout history.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/workouts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchHistory();
    } catch (err) {
      console.error("Failed to delete workout:", err);
      setError("Failed to delete workout.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Workout History
        </h2>

        <ErrorMessage message={error} />

        {workouts.length === 0 && (
          <p style={{ textAlign: "center" }}>No workouts logged yet.</p>
        )}

        {workouts.map((w) => (
          <div key={w.id} className="workout-item">
            <h3>{w.exercise}</h3>

            <p>
              <strong>Sets:</strong> {w.sets}
            </p>
            <p>
              <strong>Reps:</strong> {w.reps}
            </p>
            <p>
              <strong>Weight:</strong> {w.weight ?? "N/A"}
            </p>
            <p>
              <strong>Date:</strong> {w.date}
            </p>

            <button
              className="btn-danger btn-sm"
              onClick={() => handleDelete(w.id)}
              style={{ marginTop: 10 }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
