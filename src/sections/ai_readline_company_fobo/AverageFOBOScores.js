// File: AverageFOBOScores.jsx

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { department: "Product Management", score: 60 },
  { department: "Software Engineering", score: 58 },
  { department: "Marketing", score: 65 },
  { department: "Data Science", score: 57 },
];

// Custom colors for each department
const colors = ["#3346FF", "#00A8FF", "#00FFB3", "#5567FF"];
// eslint-disable-next-line arrow-body-style
const AverageFOBOScores = () => {
  return (
    <Card
      sx={{
        my: 3,
        mx: "auto",
        maxWidth: "1150px",
        p: 3,
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
      }}
    >
      {/* Title with underline */}
      <Box sx={{ borderBottom: "3px solid #00A8FF", mb: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#1A4DFF",
            fontSize: "1.2rem",
            mb: "6px",
          }}
        >
          Average FOBO Score by Department
        </Typography>
      </Box>

      <CardContent sx={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 2, bottom: 10 }}
          >
            <CartesianGrid horizontal={false} stroke="#f0f0f0" />
            <XAxis
              type="number"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888", fontSize: 13 }}
            />
            <YAxis
              dataKey="department"
              type="category"
              tick={{ fill: "#555", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
              width={240}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: 0,
              }}
            />
            <Bar dataKey="score" radius={[6, 6, 6, 6]} barSize={28}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AverageFOBOScores;
