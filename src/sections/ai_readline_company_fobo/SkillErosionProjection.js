// File: SkillErosionProjectionDark.jsx

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "Year 0", baseline: 100, aiAugmented: 100 },
  { year: "Year 1", baseline: 87, aiAugmented: 93 },
  { year: "Year 2", baseline: 72, aiAugmented: 86 },
  { year: "Year 3", baseline: 61, aiAugmented: 79 },
  { year: "Year 4", baseline: 52, aiAugmented: 72 },
  { year: "Year 5", baseline: 43, aiAugmented: 67 },
];

const SkillErosionProjection = () => {
  return (
    <Card
      sx={{
        my:3,
        mx: 'auto',
        maxWidth: '1155px',
        px: { xs: 3, md: 4 },
        py: 4,
        Width: '1200px',
        borderRadius: 4,
        boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        p: 3,
        background: "linear-gradient(145deg, #fff, #c5c9d1ff)",
        color: "#fff",
      }}
    >
      < Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          mb: 1,
          color: "#4DA6FF",
          borderBottom: "2px solid #4DA6FF",
          display: "inline-block",
          pb: 0.5,
        }}
      >
        Skill-Erosion Projection (Company-wide)
      </Typography>

      <CardContent sx={{ height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="year"
              stroke="#ccc"
              tick={{ fill: "#aaa" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              stroke="#ccc"
              tick={{ fill: "#aaa" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#2e3440",
                border: "1px solid #444",
                color: "#fff",
              }}
              formatter={(v) => `${v}%`}
            />
            <Legend
              wrapperStyle={{ color: "#aaa" }}
              iconType="circle"
              verticalAlign="top"
            />

            <Line
              type="monotone"
              dataKey="baseline"
              name="Baseline Retention"
              stroke="#FF8C00"
              strokeWidth={3}
              dot={{ r: 5, fill: "#FF8C00" }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="aiAugmented"
              name="AI-Augmented Retention"
              stroke="#00FF99"
              strokeWidth={3}
              dot={{ r: 5, fill: "#00FF99" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SkillErosionProjection;
