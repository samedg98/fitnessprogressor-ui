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
  // Count how many times each exercise appears
  const counts = {};

  lastFiveWorkouts.forEach((w) => {
    counts[w.exercise] = (counts[w.exercise] || 0) + 1;
  });

  // Convert to Recharts format
  const data = Object.keys(counts).map((exercise) => ({
    name: exercise,
    value: counts[exercise],
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#8dd1e1"];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
