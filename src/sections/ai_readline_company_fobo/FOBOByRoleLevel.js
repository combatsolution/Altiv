import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const FOBOByRoleLevel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dataTemplates = [
    {
      title: "Product Management",
      labels: ["L1", "L2", "L3", "L4", "L5", "L6", "L7"],
      data: [60, 55, 50, 48, 45, 40, 38],
    },
    {
      title: "Software Engineering",
      labels: ["L1", "L2", "L3", "L4", "L5", "L6", "L7"],
      data: [50, 45, 40, 38, 35, 30, 28],
    },
    {
      title: "Marketing",
      labels: ["L1", "L2", "L3", "L4", "L5", "L6", "L7"],
      data: [65, 60, 58, 55, 52, 50, 75],
    },
    {
      title: "Data Science",
      labels: ["L1", "L2", "L3", "L4", "L5", "L6", "L7"],
      data: [58, 54, 53, 51, 49, 47, 62],
    },
  ];

  return (
    <Box p={isMobile ? 2 : 4} 
    sx={{

        mx:'auto',
    maxWidth:'1155px',
     px: { xs: 3, md: 4 },
    py: 4,  
    Width:'1200px',
    }}>
      <Typography variant="h5" mb={3} fontWeight={600}>
        FOBO by Role Level
      </Typography>

      <Grid container spacing={3}>
        {dataTemplates.map((chart, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ maxHeight:'1000px', height: "600px" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {chart.title}
                </Typography>
                <Box sx={{
                    position:'relative',
                    height:250,
                }}>
                <Bar
                  data={{
                    labels: chart.labels,
                    datasets: [
                      {
                        label: "FOBO Score",
                        data: chart.data,
                        backgroundColor: "#1976d2",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true, max: 100 } },
                  }}
                  height={200}
                />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FOBOByRoleLevel;
