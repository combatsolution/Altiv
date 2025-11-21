import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
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
import TwitterIcon from "@mui/icons-material/Twitter";
import LockIcon from "@mui/icons-material/Lock";
import { useAuthContext } from "src/auth/hooks";

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
import PlansModal from "./PlansModal";

export default function SkillErosionProjection({ data, serviceResp = false ,isExportMode = false }) {
  const { user } = useAuthContext();
  const [openPlans, setOpenPlans] = useState(false);
  const handleOpenPlans = () => setOpenPlans(true);
  const handleClosePlans = () => setOpenPlans(false);

  // ✅ Unlock logic
  const isContentVisible = user?.isPro || serviceResp;

  // ✅ Dummy fallback data (shown when locked)
const dummyErosionData = useMemo(
  () => ({
    overall: {
      baseline_retention: [
        { year: 1, retention_percentage: 90 },
        { year: 2, retention_percentage: 75 },
        { year: 3, retention_percentage: 60 },
        { year: 4, retention_percentage: 50 },
      ],
      ai_augmented_retention: [
        { year: 1, retention_percentage: 95 },
        { year: 2, retention_percentage: 88 },
        { year: 3, retention_percentage: 80 },
        { year: 4, retention_percentage: 73 },
      ],
    },
    critical_skills_analyzed: [
      "Data Interpretation",
      "Predictive Modeling",
      "Process Automation",
      "Decision Analytics",
    ],
  }),
  []
);


  // ✅ Extract correct data paths
const erosionData = useMemo(
  () =>
    serviceResp
      ? data?.data?.json_schema_data?.skill_erosion_analysis || {}
      : dummyErosionData,
  [data, serviceResp, dummyErosionData]
);


  const coreSkills = erosionData.critical_skills_analyzed || [];

  // ✅ Prepare chart data from overall retention
  const chartData = useMemo(() => {
    const overall = erosionData.overall || {};
    if (!overall?.baseline_retention || !overall?.ai_augmented_retention)
      return [];

    return overall.baseline_retention.map((b, index) => ({
      month: `${b.year * 12}M`,
      baseline: b.retention_percentage,
      upskill: overall.ai_augmented_retention[index]?.retention_percentage,
    }));
  }, [erosionData]);

  return (
    <Box sx={{ position: "relative" }}>
      {/* 🔒 Locked Overlay */}
      {!isContentVisible && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 2,
          }}
        >
            <Box
                      sx={{
                        mx: "auto",
                        bgcolor: "white",
                        p: { xs: 2, sm: 3, md: 4 },          // Responsive padding
                        borderRadius: 3,
                        textAlign: "center",                 // Center content on all screens
                        width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },  // Adaptive width
                        boxShadow: 3,
                      }}
                    >
          <LockIcon sx={{ fontSize: 60, color: "#1565c0", mb: 2 }} />
          <Typography variant="h6" fontWeight={600}>
            Skill Erosion Projection Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Upgrade to unlock your personalized AI skill retention analysis
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
            onClick={handleOpenPlans}
          >
            Unlock to View
          </Button>
          </Box>  
        </Box>
      )}

      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          filter: !isContentVisible ? "blur(3px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        {/* Header */}
          {!isExportMode && (
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Skill Erosion Projection
          </Typography>
            <Button
              variant="contained"
              color="primary"
              // startIcon={<TwitterIcon />}
              sx={{
                textTransform: "none",
                bgcolor: "#1DA1F2",
                "&:hover": { bgcolor: "#0d8ddb" },
              }}
            >
              Share
            </Button>
            <Divider sx={{ mb: 3 }} />

        </Box>
          )}


        <Grid container spacing={3}>
          {/* Chart Section */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                border: "1px solid rgba(0,0,0,0.1)",
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                textAlign="center"
                fontWeight={500}
                mb={2}
              >
                Overall Skill Relevance Projection (48 Months)
              </Typography>

              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[30, 100]} />
                    <Tooltip
                      formatter={(value, name) =>
                        `${value.toFixed(1)}% ${
                          name === "baseline"
                            ? "(Baseline Scenario)"
                            : "(AI-Augmented Scenario)"
                        }`
                      }
                    />
                    <Legend
                      verticalAlign="top"
                      align="center"
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: 10 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="baseline"
                      stroke="#b23c17"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      name="Baseline Scenario"
                    />
                    <Line
                      type="monotone"
                      dataKey="upskill"
                      stroke="#00bcd4"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      name="AI-Augmented Scenario"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <Typography
                  variant="body2"
                  textAlign="center"
                  color="text.secondary"
                >
                  No skill retention data available.
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Skills List Section */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid rgba(0,0,0,0.1)",
                bgcolor: "#fff",
              }}
            >
              <Typography
                variant="h6"
                fontWeight={500}
                color="primary"
                gutterBottom
              >
                Critical Skills Analyzed:
              </Typography>
              <List>
                {coreSkills.length > 0 ? (
                  coreSkills.map((skill, i) => (
                    <ListItem key={i} disablePadding divider sx={{ my: 1, py: 0.5 }}>
                      <ListItemIcon>
                        <Icon icon="mdi:circle" width="10" color="green" />
                      </ListItemIcon>
                      <ListItemText primary={skill} />
                    </ListItem>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    No critical skills available.
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Upgrade Modal */}
        <PlansModal open={openPlans} onClose={handleClosePlans} />
      </Container>
    </Box>
  );
}

SkillErosionProjection.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        skill_erosion_analysis: PropTypes.shape({
          overall: PropTypes.object,
          critical_skills_analyzed: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
    }),
  }),
  serviceResp: PropTypes.bool,
  isExportMode: PropTypes.bool,
};

