

import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Chip,
  useTheme,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LockIcon from "@mui/icons-material/Lock";
import PropTypes from "prop-types";
import { useAuthContext } from "src/auth/hooks";
import PlansModal from "./PlansModal";

// 🔹 Sub-card styled to match the screenshot
const AnalysisCard = ({ title, badge, evidence, gap }) => {
  const theme = useTheme();

  let badgeColor = "#F3E5F5";
  let badgeTextColor = "#7B1FA2";

  if (badge?.toLowerCase() === "high") {
    badgeColor = "#DDDFE0";
    badgeTextColor = "#21809A";
  } else if (badge?.toLowerCase() === "medium") {
    badgeColor = "#FFF3E0";
    badgeTextColor = "#EF6C00";
  }
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
        p: 2.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Title and Badge */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "#3949AB",
            fontSize: "1rem",
            bgcolor:'#FEF0EE'
          }}
        >
          {title}
        </Typography>
        <Chip
          label={badge?.toUpperCase() || "N/A"}
          size="small"
          sx={{
            fontWeight: 600,
            bgcolor: badgeColor,
            color: badgeTextColor,
            borderRadius: "8px",
            fontSize: "0.75rem",
          }}
        />
      </Box>

      {/* Evidence */}
      <Typography
        variant="body2"
        sx={{ color: "#424242", mb: 1.5, lineHeight: 1.5 }}
      >
        <strong>Evidence:</strong> {evidence}
      </Typography>

      {/* AI-Readiness Gap */}
      <Box
        sx={{
          bgcolor: "#FCEAEA",
          borderRadius: "8px",
          p: 1.5,
          mt: "auto",
          borderLeft: "4px solid #00A3FF", // ✅ fixed border syntax
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#161515",
            lineHeight: 1.6,
            fontSize: "0.9rem",
          }}
        >
          <strong>AI-Readiness Gap:</strong> {gap}
        </Typography>
      </Box>

    </Box>
  );
};

AnalysisCard.propTypes = {
  title: PropTypes.string.isRequired,
  badge: PropTypes.string.isRequired,
  evidence: PropTypes.string.isRequired,
  gap: PropTypes.string.isRequired,
};

// 🔹 Main Component
export default function CurrentStateAnalysis({ data, serviceResp = false }) {
  const { user } = useAuthContext();
  const [openPlans, setOpenPlans] = useState(false);
  const handleOpenPlans = () => setOpenPlans(true);
  const handleClosePlans = () => setOpenPlans(false);

  const readinessData = [
    {
      Capability: "Customer Segmentation & Targeting",
      Evidence:
        "Developed audience personas across 5 markets using CRM and Google Analytics data; improved conversion rates by 22%",
      Strength: "High",
      "AI-Readiness Gap":
        "Adoption of AI-based customer clustering and dynamic audience profiling tools",
    },
    {
      Capability: "Campaign Planning & Execution",
      Evidence:
        "Managed 25+ omni-channel campaigns annually with ROI growth of 18% YoY",
      Strength: "High",
      "AI-Readiness Gap":
        "Implementation of AI-driven campaign optimization and A/B testing automation",
    },
    {
      Capability: "Brand Strategy & Positioning",
      Evidence:
        "Rebranded company across 4 countries, achieving 35% uplift in brand recall",
      Strength: "High",
      "AI-Readiness Gap":
        "Use of AI tools for brand sentiment analysis and competitive positioning",
    },
    {
      Capability: "Content & Creative Management",
      Evidence:
        "Led a 12-member creative team producing data-driven digital content resulting in 2M+ organic impressions",
      Strength: "Medium",
      "AI-Readiness Gap":
        "Integration of generative AI for creative ideation and adaptive content generation",
    },
    {
      Capability: "Performance Marketing & Analytics",
      Evidence:
        "Managed digital ad spends exceeding ₹10 Cr with 4.5x ROAS across Google, Meta, and LinkedIn platforms",
      Strength: "High",
      "AI-Readiness Gap":
        "Deployment of predictive analytics for media mix modeling and automated budget reallocation",
    },
    {
      Capability: "Marketing Technology & CRM",
      Evidence:
        "Implemented HubSpot CRM and improved lead nurturing conversion by 27%",
      Strength: "Medium",
      "AI-Readiness Gap":
        "Integration of AI chatbots and recommendation engines for real-time customer engagement",
    },
  ];

  const currentStateData = serviceResp
    ? data?.data?.json_schema_data?.current_state_diagnostic
    : readinessData;

  const isContentVisible = user?.isPro || serviceResp;

  return (
    <Box
      sx={{
        p: 2,
        mx: "auto",
        maxWidth: "1200px",
        width: "100%",
        position: "relative",
      }}
    >
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
            Current State Analysis Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Upgrade to unlock AI-Readiness diagnostics
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2, px: 3, textTransform: "none", fontWeight: 600 }}
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
        mb={2}
        sx={{
          my: 3,
          borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
          filter: !isContentVisible ? "blur(3px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1976d2" }}>
          Current State Analysis
        </Typography>
        <Button
          size="small"
          variant="contained"
          // startIcon={<TwitterIcon />}
          sx={{
            bgcolor: "#1DA1F2",
            textTransform: "none",
            "&:hover": { bgcolor: "#0d8ddb" },
          }}
        >
          Share
        </Button>
      </Box>

      {/* Grid */}
      <Grid
        container
        spacing={2}
        sx={{
          filter: !isContentVisible ? "blur(3px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        {currentStateData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AnalysisCard
              title={item.Capability || "N/A"}
              badge={item.Strength || "N/A"}
              evidence={item.Evidence || "N/A"}
              gap={item["AI-Readiness Gap"] || "N/A"}
            />
          </Grid>
        ))}
      </Grid>

      <PlansModal open={openPlans} onClose={handleClosePlans} />
    </Box>
  );
}

CurrentStateAnalysis.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        current_state_diagnostic: PropTypes.arrayOf(
          PropTypes.shape({
            Capability: PropTypes.string,
            Evidence: PropTypes.string,
            Strength: PropTypes.string,
            "AI-Readiness Gap": PropTypes.string,
          })
        ),
      }),
    }),
  }),
  serviceResp: PropTypes.bool,
};
