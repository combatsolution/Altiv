import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import LockIcon from "@mui/icons-material/Lock";
import PropTypes from "prop-types";
import { useAuthContext } from "src/auth/hooks";
import PlansModal from "./PlansModal";

// Helper to bold numeric percentages like "30%"
const highlightPercentages = (text) => {
  const parts = text.split(/(\d+%)/g);
  return parts.map((part, index) =>
    /\d+%/.test(part) ? (
      <Box component="span" key={index} sx={{ fontWeight: "bold" }}>
        {part}
      </Box>
    ) : (
      part
    )
  );
};

export default function StrategicObjectives({ data, serviceResp = false }) {
  const { user } = useAuthContext();
  const [openPlans, setOpenPlans] = useState(false);
  const handleOpenPlans = () => setOpenPlans(true);
  const handleClosePlans = () => setOpenPlans(false);
  const DemoData = [
      "Accelerate AI-Powered Customer Insights: Deploy machine learning models for audience segmentation and behavioral prediction to improve campaign targeting precision by 25% by Q3 2025.",
      "Automate Campaign Optimization: Implement an AI-driven performance monitoring system to auto-adjust media spend across platforms, achieving a 30% higher ROAS by Q1 2026.",
      "Enhance Brand Sentiment Tracking: Integrate NLP-based sentiment analysis tools to monitor customer feedback in real time, increasing positive sentiment scores by 18% by mid-2026.",
      "Boost Content Personalization: Use generative AI tools to create dynamic, audience-specific content, improving engagement rates by 40% within 18 months.",
      "Advance Marketing Analytics Capability: Establish a unified AI analytics dashboard for real-time insights across campaigns, reducing reporting time by 50% by Year 2."
  ]

  const strategicObjectives =data?.data?.json_schema_data?.strategic_objectives || [];
  const planList = serviceResp ? strategicObjectives?.plan : DemoData || [];
  const timePeriod = strategicObjectives?.timeperiod || "N/A";

  // ✅ Unlock content if Pro user or service purchased
  const isContentVisible = user?.isPro || serviceResp;


  return (
    <Box
      sx={{
        pageBreakAfter: "always",
        p: 3,
        mx: "auto",
        maxWidth: { xs: "100%", md: "1200px", lg: "1200px" },
        width: "100%",
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
          <LockIcon sx={{ fontSize: 60, color: "#1565c0", mb: 2 }} />
          <Typography variant="h6" fontWeight={600}>
            Strategic Objectives Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Upgrade to unlock AI-Driven Strategic Planning insights
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
      )}

      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          pb: 2,
          my: 2,
          borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
          filter: !isContentVisible ? "blur(3px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1e40af" }}>
          Strategic Objectives
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

      {/* Time Period */}
      <Typography
        variant="subtitle1"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: "#334155",
          filter: !isContentVisible ? "blur(3px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        Time Period: {timePeriod}
      </Typography>

      {/* Objectives List */}
      <Grid
        container
        spacing={2}
        sx={{
          filter: !isContentVisible ? "blur(2px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        {planList.map((text, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              {/* Number Badge */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2c45e1, #0097f9)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  mr: 2,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </Box>

              {/* Objective Text */}
              <Typography sx={{ fontSize: "15px", color: "black" }}>
                {highlightPercentages(text)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Upgrade Modal */}
      <PlansModal open={openPlans} onClose={handleClosePlans} />
    </Box>
  );
}

StrategicObjectives.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        strategic_objectives: PropTypes.shape({
          timeperiod: PropTypes.string,
          plan: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
    }),
  }),
  serviceResp: PropTypes.bool, // ✅ added to control visibility
};
