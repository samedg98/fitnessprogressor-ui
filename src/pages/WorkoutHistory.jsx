import { useEffect, useState } from "react";
import api from "../api/axios";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editExercise, setEditExercise] = useState("");
  const [editSets, setEditSets] = useState("");
  const [editReps, setEditReps] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editDate, setEditDate] = useState("");

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

  const startEditing = (workout) => {
    setEditingId(workout.id);
    setEditExercise(workout.exercise);
    setEditSets(workout.sets);
    setEditReps(workout.reps);
    setEditWeight(workout.weight ?? "");
    setEditDate(workout.date);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditExercise("");
    setEditSets("");
    setEditReps("");
    setEditWeight("");
    setEditDate("");
  };

  const saveEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/workouts/${id}`,
        {
          exercise: editExercise,
          sets: editSets,
          reps: editReps,
          weight: editWeight,
          date: editDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      cancelEditing();
      fetchHistory();
    } catch (err) {
      console.error("Failed to update workout:", err);
      setError("Failed to update workout.");
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
            {editingId === w.id ? (
              <>
                <h3>Edit Workout</h3>

                <div className="form-group">
                  <label>Exercise</label>
                  <input
                    type="text"
                    value={editExercise}
                    onChange={(e) => setEditExercise(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Sets</label>
                  <input
                    type="number"
                    value={editSets}
                    onChange={(e) => setEditSets(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Reps</label>
                  <input
                    type="number"
                    value={editReps}
                    onChange={(e) => setEditReps(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Weight (lbs)</label>
                  <input
                    type="number"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="btn-block btn-lg"
                  onClick={() => saveEdit(w.id)}
                >
                  Save Changes
                </button>

                <button
                  className="btn-ghost btn-sm"
                  style={{ marginTop: 10 }}
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
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

                <div style={{ display: "flex", gap: "10px", marginTop: 10 }}>
                  <button
                    className="btn-outline btn-sm"
                    onClick={() => startEditing(w)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-danger btn-sm"
                    onClick={() => handleDelete(w.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
