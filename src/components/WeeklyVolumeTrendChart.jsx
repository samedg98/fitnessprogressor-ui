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

export default function WeeklyVolumeTrendChart({ data }) {
  const formattedData = data.map((item) => {
    const d = new Date(item.weekStart);
    const label = d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
    return {
      ...item,
      label,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={380}>
      <LineChart
        data={formattedData}
        margin={{ top: 20, right: 30, left: 90, bottom: 70 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

        {/* X axis: numbers, then clear gap, then label */}
        <XAxis
          dataKey="label"
          tickMargin={12} // gap between axis line and numbers
          label={{
            value: "Week Starting",
            position: "bottom", // BELOW the numbers
            offset: 25,         // push further down
          }}
        />

        {/* Y axis: numbers, then clear gap, then label on the left */}
        <YAxis
          tickMargin={10} // gap between axis line and numbers
          label={{
            value: "Total Volume (lbs)",
            angle: -90,
            position: "left", // to the LEFT of numbers
            offset: 40,       // push further left
          }}
        />

        <Tooltip
          formatter={(value) => [`${value} lbs`, "Total Volume"]}
          labelFormatter={(label) => `Week of ${label}`}
        />

        <Line
          type="monotone"
          dataKey="total"
          stroke="#00897b"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
