import React from "react";
import PropTypes from 'prop-types'
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

const data = [
  {
    year: "Year 1: Foundation",
    id: "Y1",
    quarters: [
      {
        title: "Q1",
        description:
          "Evaluate and select AI tools for operations (e.g., Microsoft Copilot, Zapier AI); initiate foundational training on AI-readiness",
        kpi: "Completion of tool evaluation; pilot implementations in one operational area; 80% team training completion",
      },
      {
        title: "Q2",
        description:
          "Integrate AI tools in compliance tracking; digitize audit and SOP processes at RedHealth",
        kpi: "100% digitization of current SOPs; reduction in audit preparation time by 15%",
      },
      {
        title: "Q3",
        description:
          "Roll out AI-enhanced CRM modules for stakeholder engagement; launch initial virtual health talks with AI analytics",
        kpi: "10% increase in stakeholder satisfaction; successful series of 2 virtual events",
      },
      {
        title: "Q4",
        description:
          "Complete an AI-readiness pilot in process optimization; measure operational efficiency improvements",
        kpi: "Achieve a 10% process efficiency gain compared to Q1 metrics",
      },
    ],
  },
  {
    year: "Year 2: Expansion",
    id: "Y2",
    quarters: [
      {
        title: "Q1/Q2",
        description:
          "Expand AI-powered process automation across multiple departments; establish predictive analytics dashboards",
        kpi: "15% increase in cycle speed; 100% adoption of dashboards across departments",
      },
      {
        title: "Q3/Q4",
        description:
          "Mentor junior managers; integrate machine learning models for proactive quality control",
        kpi: "At least 2 junior managers fostered; 20% reduction in audit anomalies",
      },
    ],
  },

  {
    year: "Year 3: Optimization",
    id: "Y3",
    quarters: [
      {
        title: "Q1/Q2",
        description:
          "Scale stakeholder engagement strategies with advanced AI insights; conduct comprehensive performance analytics",
        kpi: "KPI: 15% growth in strategic partnerships; 25% faster decision-making cycles",
      },
      {
        title: "Q3/Q4",
        description:
          "Consolidate all AI integrations for full operational synergy at Red.Health; complete transformation review",
        kpi: "KPI: 30% overall improvement in operational efficiency; documented best practices and ROI from AI-adoption",
      },
    ],
  },
];

export default function TransformationRoadmap() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box sx={{ p: 3, mx: 'auto', maxWidth: { xs: '100%', md: '1000px', lg: '1200px' } }}>

        <Box display="flex" justifyContent="space-between" alignItems="center"
          sx={{
            pb: 2,
            mb:2,
            borderBottom: (t) => `2px solid ${t.palette.grey[300]}`,
          }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1e40af" }}>
            Transformation Roadmap
          </Typography>
          <Button
            size="small"
            variant="contained"
            startIcon={<ShareIcon />}
            sx={{
              textTransform: "none",
              bgcolor: "#00e0ac",
              "&:hover": { bgcolor: "#00c195" },
            }}
          >
            Share
          </Button>

        </Box>
        <Box
          sx={{
            px: { xs: 2, md: 0 },
            py: 4,
            // backgroundColor: "#f9f9ff",
            bgcolor:'#fff'
          
          }}
        >
          <Stack
            direction="column"
            spacing={6}
            sx={{ maxWidth: 1200, mx: "auto", position: "relative" }}
          >
            {/* Vertical Timeline Line */}
            <Box
              sx={{
                position: "absolute",
                left: { xs: 28, sm: 28 },
                top: 0,
                bottom: 0,
                width: "4px",
                backgroundColor: "#c5c6ff",
                zIndex: 0,
              }}
            />

            {data.map((section) => (
              <Box key={section.id}>
                {/* Year Label */}
                <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                  <Box
                    sx={{
                      backgroundColor: "#4f46e5",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "50%",
                      width: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    {section.id}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#1e1e2f" }}
                  >
                    {section.year}
                  </Typography>
                </Stack>

                {/* Quarter Cards */}
                <Grid container spacing={2} ml={{ xs: 2, sm: 8 }}>
                  {section.quarters.map((q, i) => (
                    <Grid
                      item
                      xs={12}
                      sm={section.id === "Y2" ? 6 : 12}
                      md={section.id === "Y1" ? 3 : 6}
                      key={i}
                    >
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: "1px solid #e0e0e0",
                          backgroundColor: "white",
                          position: "relative",
                          minHeight:
                            section.id === "Y1" ? 270 : 200,

                          "&:hover": { boxShadow: 4 },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, color: "#4338ca", mb: 1 }}
                        >
                          {q.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#333",
                            mb: 2,
                            lineHeight: 1.5,
                          }}
                        >
                          {q.description}
                        </Typography>
                        <Box
                          sx={{
                            bottom: 0,
                            backgroundColor: "#f1f0ff",
                            borderLeft: "4px solid #22c55e",
                            p: 1.2,
                            borderRadius: 1,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: "#16a34a", fontWeight: 600 }}
                          >
                            KPI:
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ display: "block", color: "#333", mt: 0.5 }}
                          >
                            {q.kpi}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}
