import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import PropTypes from "prop-types";

const chartData = {
  PM: [
    { name: "L1", score: 70 },
    { name: "L2", score: 55 },
    { name: "L3", score: 60 },
    { name: "L4", score: 65 },
    { name: "L5", score: 50 },
    { name: "L7", score: 50 },
  ],
  SE: [
    { name: "L1", score: 55 },
    { name: "L2", score: 68 },
    { name: "L3", score: 70 },
    { name: "L4", score: 60 },
    { name: "L5", score: 45 },
  ],
  Marketing: [
    { name: "L1", score: 68 },
    { name: "L2", score: 66 },
    { name: "L3", score: 65 },
    { name: "L4", score: 50 },
    { name: "L7", score: 82 },
  ],
  DS: [
    { name: "L1", score: 60 },
    { name: "L2", score: 63 },
    { name: "L3", score: 59 },
    { name: "L5", score: 52 },
    { name: "L7", score: 72 },
  ],
};

const DEPARTMENT_LABELS = {
  PM: "PM Titles",
  SE: "SE Titles",
  Marketing: "Marketing Titles",
  DS: "DS Titles",
};

function computeAverages(data) {
  return Object.keys(data).map((key) => {
    const deptData = data[key];
    const avg =
      deptData.reduce((sum, item) => sum + item.score, 0) / deptData.length;
    return {
      name: DEPARTMENT_LABELS[key] || key,
      score: Math.round(avg),
    };
  });
}

const avgData = computeAverages(chartData);

function AvgRoleScoreChart() {
  const colors = ["#6466FA", "#3A8DFB", "#FBA11D", "#14B88A"];

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 4,
        width: "100%",
        mx: "auto",
        boxShadow: 2,
        display:'flex',
        justifyContent:'left',
        alignItems:'flex-start',

      }}
    >
        <Box  sx={{ width: "50%",}}>
      <CardContent sx={{ textAlign: "center", p: 3 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 1 }}>
          Average Role Score by Department
        </Typography>
          <Box sx={{display: "flex", justifyContent:'center', alignItems: "center" }}>
          <Box
            sx={{
              width: "30px",
              height: "10px",
              bgcolor: "#4649F9",
              mr: 1.5,
            }}
          />
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            FOBO Score
          </Typography>
        </Box>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={avgData}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            {/* ✅ Force all ticks 0–100 */}
            <YAxis
              domain={[0, 100]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              interval={0}
            />
            <Tooltip />
            <Legend />
            {/* ✅ Correct way to color each bar */}
            <Bar dataKey="score" name="Avg FOBO" barSize={60}>
              {avgData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontSize: 13, mt: 1 }}
        >
          Department averages computed from level-wise FOBO scores
        </Typography>
      </CardContent>
      </Box>
    </Card>
  );
}

function ChartCard({ title, data }) {
  return (
    <Card variant="outlined" sx={{ height: 320 }}>
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography sx={{ mb: 0.5, fontWeight: 600, fontSize: 16 }}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: "30px",
              height: "10px",
              bgcolor: "#4649F9",
              mr: 1.5,
            }}
          />
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            FOBO Score
          </Typography>
        </Box>

        <Box sx={{ flex: 1, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              {/* ✅ Fixed full tick range */}
              <YAxis
                domain={[0, 100]}
                ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                interval={0}
              />
              <Tooltip />
              <Bar dataKey="score" name="FOBO Score" barSize={50} fill="#4649F9" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default function FoboCharts() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: "auto",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartCard title="PM Titles • FOBO by Role Level" data={chartData.PM} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard title="SE Titles • FOBO by Role Level" data={chartData.SE} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Marketing Titles • FOBO by Role Level"
            data={chartData.Marketing}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard title="DS Titles • FOBO by Role Level" data={chartData.DS} />
        </Grid>

        {/* ✅ Centered Avg Chart with fixed width */}
        <Grid item xs={12}>
          <AvgRoleScoreChart />
        </Grid>
      </Grid>
    </Box>
  );
}
