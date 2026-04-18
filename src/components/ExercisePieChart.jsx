import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ExercisePieChart({ lastFiveWorkouts }) {
  if (!lastFiveWorkouts || lastFiveWorkouts.length === 0) {
    return <p>No data for pie chart.</p>;
  }

  // Count exercises
  const counts = {};
  lastFiveWorkouts.forEach((w) => {
    counts[w.exercise] = (counts[w.exercise] || 0) + 1;
  });

  const data = Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#FF6384", "#36A2EB", "#4BC0C0", "#FFCE56", "#9966FF"];

  return (
    <div
      style={{
        width: "100%",
        height: 260,        // ⭐ Smaller container height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}   // ⭐ Smaller radius (fixes edge overlap)
            innerRadius={40}   // ⭐ Optional donut look
            paddingAngle={3}   // ⭐ Adds spacing between slices
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
