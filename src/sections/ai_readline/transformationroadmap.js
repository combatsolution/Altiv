import React, { useState } from "react";
import PropTypes from "prop-types";
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
import LockIcon from "@mui/icons-material/Lock";
import { useAuthContext } from "src/auth/hooks";
import PlansModal from "./PlansModal";

export default function TransformationRoadmap({ data, serviceResp = false }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuthContext();
  const [openPlans, setOpenPlans] = useState(false);

  const handleOpenPlans = () => setOpenPlans(true);
  const handleClosePlans = () => setOpenPlans(false);

  // ✅ Unlock logic
  const isContentVisible = user?.isPro || serviceResp;
  const DemoData_timePeriods =  { 
    "T1": "0–12 months: Pilot & Infrastructure Setup",
    "T2": "12–36 months: Enterprise Scale & Optimization"
  };
  const DemoData_pillars = [
    {
      "Pillar": "Predictive Financial Planning",
      "Goal": "Adopt AI to enhance forecasting accuracy and scenario planning",
      "T1 Tactics": [
        "Collaborate with data scientists to build pilot ML-based financial models",
        "Integrate forecasting dashboards in Power BI with AI insights"
      ],
      "T2 Scaling": [
        "Implement enterprise-wide predictive financial planning tools",
        "Automate forecasting adjustments using real-time transaction data"
      ]
    },
    {
      "Pillar": "Process Automation in Accounting",
      "Goal": "Reduce manual intervention through RPA and cognitive automation",
      "T1 Tactics": [
        "Deploy bots for invoice processing and account reconciliation",
        "Evaluate RPA tools like Automation Anywhere or UiPath for efficiency gains"
      ],
      "T2 Scaling": [
        "Expand automation to full procure-to-pay and record-to-report cycles",
        "Integrate cognitive OCR and anomaly detection for audit assurance"
      ]
    }
  ];

  // ✅ Extract roadmap data
  const timePeriods =serviceResp ?  (data?.data?.json_schema_data?.transformation_pillars_and_tactics?.time_period_definitions) : DemoData_timePeriods || {};
  const pillars = serviceResp ? (data?.data?.json_schema_data?.transformation_pillars_and_tactics?.pillars) : 
  DemoData_pillars || [];
  console.log("timePeriods",timePeriods);
  console.log("pillars",pillars);

  return (
    <Box
      sx={{
        pageBreakAfter: "always",
        p: 3,
        mx: "auto",
        maxWidth: { xs: "100%", md: "1200px", lg: "1200px" },
        position: "relative",
      }}
    >
      {/* 🔒 Overlay for Locked Content */}
      {!isContentVisible && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            // backdropFilter: "blur(6px)",
            // backgroundColor: "rgba(255,255,255,0.7)",
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
            Transformation Roadmap Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Upgrade to unlock your personalized AI Transformation Roadmap
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

      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          pb: 2,
          mb: 2,
          borderBottom: (t) => `2px solid ${t.palette.grey[300]}`,
          filter: !isContentVisible ? "blur(3px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
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

      {/* ✅ Time Period Definitions */}
      <Box
        sx={{
          mb: 3,
          filter: !isContentVisible ? "blur(3px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#334155", mb: 1 }}>
          <strong>Time Period Definitions:</strong>
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(timePeriods).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <Paper
                sx={{
                  p: 2,
                  borderLeft: "4px solid #4f46e5",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {key}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ✅ Pillars Section */}
      <Stack
        direction="column"
        spacing={6}
        sx={{
          maxWidth: 1200,
          mx: "auto",
          position: "relative",
          filter: !isContentVisible ? "blur(3px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        {pillars.map((pillar, index) => (
          <Box key={index}>
            {/* Pillar Header */}
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <Box
                sx={{
                  backgroundColor: "#4f46e5",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  width: 45,
                  height: 45,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {index + 1}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e1e2f" }}>
                {pillar.Pillar}
              </Typography>
            </Stack>

            {/* Pillar Goal */}
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#334155",
              }}
            >
              Goal: {pillar.Goal}
            </Typography>

            {/* T1 and T2 Rows */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    borderLeft: "4px solid #2563eb",
                    boxShadow: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#1e3a8a", fontWeight: 600, mb: 1 }}
                  >
                    T1 Tactics (Foundation Phase)
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
                    {pillar["T1 Tactics"]?.map((item, i) => (
                      <li key={i}>
                        <Typography variant="body2" color="text.secondary">
                          {item}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    borderLeft: "4px solid #22c55e",
                    boxShadow: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#166534", fontWeight: 600, mb: 1 }}
                  >
                    T2 Scaling (Scaling Phase)
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
                    {pillar["T2 Scaling"]?.map((item, i) => (
                      <li key={i}>
                        <Typography variant="body2" color="text.secondary">
                          {item}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Stack>

      {/* Plans Modal */}
      <PlansModal open={openPlans} onClose={handleClosePlans} />
    </Box>
  );
}

TransformationRoadmap.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        time_period_definitions: PropTypes.object,
        pillars: PropTypes.arrayOf(
          PropTypes.shape({
            Pillar: PropTypes.string,
            Goal: PropTypes.string,
            "T1 Tactics": PropTypes.arrayOf(PropTypes.string),
            "T2 Scaling": PropTypes.arrayOf(PropTypes.string),
          })
        ),
      }),
    }),
  }),
  serviceResp: PropTypes.bool, // ✅ new prop for locked/unlocked access
};
