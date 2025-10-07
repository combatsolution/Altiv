

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
// eslint-disable-next-line arrow-body-style

// Sample dynamic data
const data = [
  { month: "0M", baseline: 100, upskill: 100 },
  { month: "3M", baseline: 97, upskill: 103 },
  { month: "6M", baseline: 94, upskill: 106 },
  { month: "9M", baseline: 92, upskill: 110 },
  { month: "12M", baseline: 89, upskill: 113 },
  { month: "18M", baseline: 85, upskill: 118 },
  { month: "24M", baseline: 81, upskill: 123 },
  { month: "30M", baseline: 76, upskill: 128 },
  { month: "36M", baseline: 71, upskill: 133 },
  { month: "42M", baseline: 67, upskill: 138 },
  { month: "48M", baseline: 63, upskill: 142 },
];

const coreSkills = [
  "Operations Management",
  "Quality & Compliance",
  "Data Analytics",
  "Team Leadership",  
  "Process Optimization",
];


export default function SkillErosionProjection(){
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Skill Erosion Projection
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon icon="ic:sharp-share" width="20" height="20" color="#fff" />}
        >
          Share
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={3}>
        {/* Chart Section */}
        <Grid item xs={12} md={8}>

          <Paper sx={{
            p: 3, height: "100%",
            borderRadius: 2,
            border: "1px solid rgba(0,0,0,0.1)",
            bgcolor: "background.paper",
          }}>
            <Typography
              variant="h6"
              color='primary'
              textAlign="center"
              fontWeight="500"
              mb={2}
            >
              Skill Relevance Projection Over 48 Months
            </Typography>

            {/* Share Button */}
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[50, 150]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke="#b23c17"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Baseline Scenario (No Upskilling)"
                />
                <Line
                  type="monotone"
                  dataKey="upskill"
                  stroke="#00bcd4"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Upskilling Scenario"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Skills List Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{
            p: 3, height: "80%", width: '420px', bgcolor: '#fff', border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 2
          }}>
            <Typography
              variant="h6"
              fontWeight="500"
              color="primary"
              gutterBottom
            >
              Core Skills Analyzed:
            </Typography>
            <List>
              {coreSkills.map((skill, i) => (
                <ListItem key={i} disablePadding divider
                  sx={{ my: 2, py: 0.5 }}>
                  <ListItemIcon>
                    <Icon icon="mdi:circle" width="10" color="green" />
                  </ListItemIcon>
                  <ListItemText primary={skill}
                  />

                </ListItem>
              ))}

            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container >
  );
};

