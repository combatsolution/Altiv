import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import LockIcon from "@mui/icons-material/Lock";
import { useAuthContext } from "src/auth/hooks";
import PlansModal from "./PlansModal";

export default function QuickStartGuide({ data, serviceResp = false }) {
  const { user } = useAuthContext();
  const [openPlans, setOpenPlans] = useState(false);
  const handleOpenPlans = () => setOpenPlans(true);
  const handleClosePlans = () => setOpenPlans(false);

  // ✅ Unlock condition
  const isContentVisible = user?.isPro || serviceResp;

  // ✅ Dummy fallback data (used when locked)
  const dummyChecklist = [
    {
      Week: "Week 1",
      Action: "Set up foundational AI-readiness framework",
      "Concrete Output": "Baseline AI maturity assessment completed and key KPIs identified",
    },
    {
      Week: "Week 2",
      Action: "Initiate skill mapping and data access audit",
      "Concrete Output": "Skill inventory matrix and data governance checklist completed",
    },
    {
      Week: "Week 3",
      Action: "Deploy a pilot AI-driven tool in one department",
      "Concrete Output": "First use case implemented with initial performance benchmark",
    },
    {
      Week: "Week 4",
      Action: "Conduct review and align roadmap with business objectives",
      "Concrete Output": "Leadership review report and next 90-day roadmap finalized",
    },
  ];

  const dummyTimePeriod = "30 Days: Quick-Start Implementation Period";

  // ✅ Use backend data if unlocked
  const quickStartData = serviceResp
    ? data?.data?.json_schema_data?.first_30_days_quick_start_checklist
    : null;

  const checklistData = quickStartData?.checklist || dummyChecklist;
  const timePeriod =
    quickStartData?.time_period_definition?.T || dummyTimePeriod;

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
            Quick Start Guide Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Upgrade to unlock your tailored 30-day AI-readiness action plan
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

      {/* ✅ Main Content */}
      <Box
        sx={{
          p: 3,
          mx: "auto",
          maxWidth: { xs: "100%", md: "1200px", lg: "1200px" },
          filter: !isContentVisible ? "blur(3px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            pb: 2,
            borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1e40af" }}
          >
            {timePeriod}
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

        {/* Checklist */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {checklistData.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "flex-start",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                {/* Week Badge */}
                <Box
                  sx={{
                    width: 70,
                    height: 30,
                    borderRadius: "10%",
                    background: "linear-gradient(135deg, #2c45e1, #0097f9)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    mx: 2,
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  {item.Week}
                </Box>

                {/* Content */}
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {/* Action */}
                  <Typography
                    sx={{
                      fontSize: "15px",
                      mb: 1,
                      color: "primary.main",
                      fontWeight: "bold",
                    }}
                  >
                    {item.Action}
                  </Typography>

                  {/* Output */}
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "#1e293b",
                      borderLeft: "2px solid #05FF8A",
                      bgcolor: "#FEF0EE",
                      p: 1,
                      borderRadius: 1,
                      mt: 1,
                    }}
                  >
                    {item["Concrete Output"]}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🔓 Unlock Modal */}
      <PlansModal open={openPlans} onClose={handleClosePlans} />
    </Box>
  );
}

QuickStartGuide.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        first_30_days_quick_start_checklist: PropTypes.shape({
          time_period_definition: PropTypes.shape({
            T: PropTypes.string,
          }),
          checklist: PropTypes.arrayOf(
            PropTypes.shape({
              Week: PropTypes.string,
              Action: PropTypes.string,
              "Concrete Output": PropTypes.string,
            })
          ),
        }),
      }),
    }),
  }),
  serviceResp: PropTypes.bool,
};
