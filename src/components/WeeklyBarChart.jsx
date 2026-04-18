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

export default function WeeklyBarChart({ weeklyBreakdown }) {
  // weeklyBreakdown = [{ day: "Mon", total: 2 }, ...]
  const data = weeklyBreakdown || [];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="total" fill="#14b8a6" /> {/* teal */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
