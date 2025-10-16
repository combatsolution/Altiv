// File: AverageFOBOScores.jsx

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { department: "Product Management", score: 60 },
  { department: "Software Engineering", score: 58 },
  { department: "Marketing", score: 65 },
  { department: "Data Science", score: 57 },
];

const AverageFOBOScores = () => {
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
        boxShadow: 3,
        p: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        sx={{ mb: 1 }}
      >
        Average FOBO Score by Department
      </Typography>

      <CardContent sx={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis
              dataKey="department"
              type="category"
              tick={{ fill: "#444", fontSize: 14 }}
              width={150}
            />
            <Tooltip
              formatter={(v) => `${v}`}
              contentStyle={{
                backgroundColor: "#f5f5f5",
                border: "1px solid #ddd",
              }}
            />
            <Bar
              dataKey="score"
              radius={[10, 10, 10, 10]}
              barSize={25}
              fill="url(#colorGradient)"
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#007bff" />
                <stop offset="50%" stopColor="#00e6ff" />
                <stop offset="100%" stopColor="#00ffaa" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AverageFOBOScores;
