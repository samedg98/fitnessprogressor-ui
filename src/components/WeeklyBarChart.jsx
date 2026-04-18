import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyBarChart({ weeklyTotals }) {
  // Convert your single weekly total into a simple chart dataset
  const data = [
    {
      name: "This Week",
      workouts: weeklyTotals,
    },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="workouts" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
