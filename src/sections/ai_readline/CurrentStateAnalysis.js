import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import Divider from '@mui/material/Divider';
import TwitterIcon from "@mui/icons-material/Twitter";
import AnalysisCard from "./analysiscard";


const analysisData = [
  {
    title: "Operations Management",
    badge: "HIGH",
    evidence:
      "Strategic Account Manager role at Red.Health; achievement of monthly revenue targets and EBITDA management",
    gap: "Integration of AI-based data analytics tools for predictive operations",
  },
  {
    title: "Quality & Compliance",
    badge: "HIGH",
    evidence:
      "NABH Coordinator role at ESIC Hospital; led compliance audits and emergency protocol implementations",
    gap: "Adoption of automated quality monitoring and compliance AI tools",
  },
  {
    title: "Stakeholder Engagement",
    badge: "HIGH",
    evidence:
      "Regular interactions with hospital CEOs, GMs, doctors, and organizing community health events",
    gap: "Leveraging AI-driven CRM and sentiment analysis for enhanced insights",
  },
  {
    title: "Process Optimization",
    badge: "MEDIUM",
    evidence:
      "Optimized discharge processes and EMR adoption initiatives at Fortis Hospital",
    gap: "Utilizing AI for process automation and dynamic workflow management",
  },
  {
    title: "Data Analytics & Decision-Making",
    badge: "MEDIUM",
    evidence:
      "Conducted RCA, CAPA, and revenue analysis initiatives",
    gap: "Advanced data visualization and predictive analytics using AI tools",
  },
  {
    title: "Team Leadership & Coordination",
    badge: "HIGH",
    evidence:
      "Multi-department collaboration, team scheduling, and talent mentoring during administrative and clinical roles",
    gap: "Operationalizing AI tools for workforce scheduling and performance tracking",
  },
];

export default function CurrentStateAnalysis() {
  return (
    <Box sx={{
      p: 3, mx: "auto",
      maxWidth: { xs: '100%', md: '400px', lg: '1200px' },
      width: '100%',
    }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}
        sx={{
          my: 3,
          borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`, // ✅ line below
        }}>
        <Typography variant="h4" sx={{
          fontWeight: "bold", color: "#1976d2"
        }}>
          Current State Analysis
        </Typography>

        <Button
          size="small"
          variant="contained"
          startIcon={<TwitterIcon />}
          sx={{
            bgcolor: "#1DA1F2",
            textTransform: "none",
            "&:hover": { bgcolor: "#0d8ddb" },
          }}
        >
          Tweet
        </Button>

      </Box>

      {/* Grid of Cards */}
      <Grid container spacing={2}>
        {analysisData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AnalysisCard
              title={item.title}
              badge={item.badge}
              evidence={item.evidence}
              gap={item.gap}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
