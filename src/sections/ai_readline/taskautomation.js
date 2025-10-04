import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";

import { Icon } from "@iconify/react";

const tasks = [
  {
    task: "Revenue Cycle Management & EBITDA Tracking",
    potential: "High",
    time: "15 hrs/week",
    savings: "60%",
    tools: "DataRobot, ThoughtSpot, Microsoft Copilot",
  },
  {
    task: "NABH Compliance Auditing & Documentation",
    potential: "High",
    time: "12 hrs/week",
    savings: "70%",
    tools: "Compliance.ai, ChatGPT Analytics, Document AI",
  },
  {
    task: "Stakeholder Relationship Management & Follow-ups",
    potential: "Medium",
    time: "10 hrs/week",
    savings: "45%",
    tools: "HubSpot Sales Hub, AI Gong, CRM Analytics",
  },
  {
    task: "Process Optimization Analysis & Reporting",
    potential: "High",
    time: "8 hrs/week",
    savings: "65%",
    tools: "Microsoft Power BI, AI Zapier, AI Process Mining Tools",
  },
  {
    task: "Team Scheduling & Resource Allocation",
    potential: "High",
    time: "6 hrs/week",
    savings: "80%",
    tools: "Microsoft Power Automate, AI Scheduling Tools, Workforce Analytics",
  },
  {
    task: "Quality Monitoring & Incident Tracking",
    potential: "Medium",
    time: "7 hrs/week",
    savings: "55%",
    tools: "Rapid Innovation AI QA, Anomaly Detection AI, Quality Analytics",
  },
  {
    task: "Strategic Account Management & Client Communications",
    potential: "Medium",
    time: "9 hrs/week",
    savings: "40%",
    tools: "AI Content Generation, Sentiment Analysis, Communication AI",
  },
  {
    task: "Training Coordination & Performance Tracking",
    potential: "High",
    time: "5 hrs/week",
    savings: "75%",
    tools: "Learning Management AI, Performance Analytics, Training Automation",
  },
];

const headers = [
  "Task",
  "Automation Potential",
  "Current Time",
  "Projected Savings",
  "Recommended Tools",
];

const getChipColor = (potential) => {
  switch (potential) {
    case "High":
      return { bgcolor: "#dcfce7", color: "#15803d" }; // green
    case "Medium":
      return { bgcolor: "#fef3c7", color: "#b45309" }; // amber
    default:
      return { bgcolor: "#f3f4f6", color: "#374151" }; // gray fallback
  }
};

export default function TopTasksExposureAnalysis() {
  return (
    <Box
      sx={{
        p: 3,
        mx: "auto",
        maxWidth: { xs: "100%", md: "1200px" },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          py: 2,
          mb: 2,
          borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#1e40af" }}
        >
          Top Tasks Exposure Analysis
        </Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<Icon icon="ri:twitter-x-fill" width={18} />}
          sx={{
            textTransform: "none",
            bgcolor: "#00e0ac",
            "&:hover": { bgcolor: "#00c195" },
          }}
        >
          Tweet
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
<TableHead>
  <TableRow>
    {headers.map((header, i) => (
      <TableCell
        key={i}
        sx={{
          
           background: "linear-gradient(90deg, #4B69E9 5%, #00A3FF 100%)",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {header}
      </TableCell>
    ))}
  </TableRow>
</TableHead>
          <TableBody>
            {tasks.map((row, idx) => (
              <TableRow key={idx} hover>
                <TableCell sx={{ fontWeight: 500 }}>{row.task}</TableCell>
                <TableCell>
                  <Chip
                    label={row.potential}
                    sx={{
                      ...getChipColor(row.potential),
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  />
                </TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell sx={{ color: "#16a34a", fontWeight: "bold" }}>
                  {row.savings}
                </TableCell>
                <TableCell>{row.tools}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
