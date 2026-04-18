import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyTrendChart({ monthlyHistory }) {
  if (!monthlyHistory || monthlyHistory.length === 0) {
    return <p>No monthly data available.</p>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: 350,        // ⭐ FIX: bigger chart height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyHistory} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} domain={[0, "dataMax + 1"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#4BC0C0"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
