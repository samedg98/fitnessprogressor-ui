import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import WeeklyBarChart from "../components/WeeklyBarChart";
import ExercisePieChart from "../components/ExercisePieChart";
import MonthlyTrendChart from "../components/MonthlyTrendChart";

export default function Dashboard() {
  const [weeklyTotals, setWeeklyTotals] = useState("--");
  const [monthlyTotals, setMonthlyTotals] = useState("--");
  const [totalWeightThisWeek, setTotalWeightThisWeek] = useState("--");
  const [averageRepsThisWeek, setAverageRepsThisWeek] = useState("--");
  const [mostCommonExercise, setMostCommonExercise] = useState("--");
  const [lastFiveWorkouts, setLastFiveWorkouts] = useState([]);
  const [monthlyHistory, setMonthlyHistory] = useState([]); // ⭐ NEW
  const [loading, setLoading] = useState(true);

  const [trendArrow, setTrendArrow] = useState("➡️");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:4000/workouts/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch stats");
          return;
        }

        const data = await res.json();

        setWeeklyTotals(data.weeklyTotals);
        setMonthlyTotals(data.monthlyTotals);
        setTotalWeightThisWeek(data.totalWeightThisWeek);
        setAverageRepsThisWeek(data.averageRepsThisWeek);
        setMostCommonExercise(data.mostCommonExercise || "None");
        setLastFiveWorkouts(data.lastFiveWorkouts || []);
        setMonthlyHistory(data.monthlyHistory || []); // ⭐ NEW

        // TREND ARROW LOGIC
        const monthlyAvg = data.monthlyTotals / 4;

        if (data.weeklyTotals > monthlyAvg) {
          setTrendArrow("⬆️");
        } else if (data.weeklyTotals < monthlyAvg) {
          setTrendArrow("⬇️");
        } else {
          setTrendArrow("➡️");
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Weekly Workouts</h3>
          <p>
            {weeklyTotals}{" "}
            <span style={{ fontSize: "22px" }}>{trendArrow}</span>
          </p>
        </div>

        <div className="stat-card">
          <h3>Monthly Workouts</h3>
          <p>{monthlyTotals}</p>
        </div>

        <div className="stat-card">
          <h3>Total Weight This Week</h3>
          <p>{totalWeightThisWeek}</p>
        </div>

        <div className="stat-card">
          <h3>Average Reps This Week</h3>
          <p>{averageRepsThisWeek}</p>
        </div>

        <div className="stat-card">
          <h3>Most Common Exercise</h3>
          <p>{mostCommonExercise}</p>
        </div>
      </div>

      <div className="last-five-container">
        <h2>Last 5 Workouts</h2>

        {lastFiveWorkouts.length === 0 ? (
          <p>No workouts logged yet.</p>
        ) : (
          <ul className="last-five-list">
            {lastFiveWorkouts.map((w, index) => (
              <li key={index}>
                <strong>{w.exercise}</strong> — {w.sets} sets × {w.reps} reps @{" "}
                {w.weight} lbs
                <br />
                <small>{new Date(w.date).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="charts-container">
        <h2>Weekly Workout Chart</h2>
        <WeeklyBarChart weeklyTotals={weeklyTotals} />

        <h2 style={{ marginTop: "40px" }}>Exercise Distribution</h2>
        <ExercisePieChart lastFiveWorkouts={lastFiveWorkouts} />

        <h2 style={{ marginTop: "40px" }}>Monthly Trend</h2>
        <MonthlyTrendChart monthlyHistory={monthlyHistory} />
      </div>
    </div>
  );
}
