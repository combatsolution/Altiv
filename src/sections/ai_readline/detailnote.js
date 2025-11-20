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
import { useAuthContext } from "src/auth/hooks";
import PlansModal from "./PlansModal";
import PropTypes from "prop-types";

export default function DetailNotes({ data, serviceResp = false }) {
  const { user } = useAuthContext();
  const [openPlans, setOpenPlans] = useState(false);
  const handleOpenPlans = () => setOpenPlans(true);
  const handleClosePlans = () => setOpenPlans(false);

  const isContentVisible = user?.isPro || serviceResp;

  // ✅ Dummy fallback data
  const dummyData = {
    industry_benchmarks:
      "Based on a sample readiness assessment, this profile ranks in the mid-tier AI adoption range. Improvement in AI literacy and integration practices is recommended.",
    risk_factors_mitigation: [
      {
        risk_factor: "Adoption Resistance",
        mitigation: "Start with small pilot projects to build confidence.",
      },
    ],
    success_metrics_kpis: [
      { metric: "Process Efficiency", target: "25% improvement in workflows" },
      { metric: "Cost Optimization", target: "15% reduction in operational costs" },
    ],
    future_trend_predictions:
      "AI adoption in similar industries is projected to exceed 70% by 2027.",
    personalized_recommendations:
      "Focus on upskilling in AI/ML tools and implementing small-scale automation within existing workflows.",
  };

  // ✅ Extract API data
  const realData = data?.data?.json_schema_data?.detailed_notes || {};
  const detailData = isContentVisible ? realData : dummyData;

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
            backdropFilter: "blur(2px)",
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
            Detailed Analysis Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Upgrade to view full detailed insights and personalized recommendations.
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
          maxWidth: { xs: "100%", md: "1200px" },
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
            py: 2,
            mb: 2,
            borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1e40af" }}>
            Detailed Analysis Notes
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

        {/* Industry Benchmarks */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            boxShadow: 3,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "2%",
              right: "2%",
              top: "55px", // adjust for heading height
              height: "0.5mm",
              backgroundColor: "#E5E7EB", // light grayish-blue line
              borderRadius: "1px",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              mb: 1,
              zIndex: 2,
              position: "relative",
            }}
          >
            Industry Benchmarks
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#1e293b",
              fontSize: "15px",
              position: "relative",
              zIndex: 2,
              mt: 2,
            }}
          >
            {detailData.industry_benchmarks}
          </Typography>
        </Paper>

        {/* Risk Factors & Mitigation */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: "bold", mb: 2 }}
          >
            Risk Factors & Mitigation
          </Typography>
          <Grid container spacing={2}>
            {(detailData.risk_factors_mitigation || []).map((risk, idx) => (
              <Grid item xs={12} key={idx}>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: "#fee2e2",
                    borderLeft: "5px solid #a84b2f",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", color: "#b91c1c", mb: 0.5 }}
                  >
                    {risk.risk_factor}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#1e293b" }}>
                    {risk.mitigation}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Success Metrics & KPIs */}
        {/* Success Metrics & KPIs */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            boxShadow: 3,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "2%",
              right: "2%",
              top: "55px",
              height: "0.5mm",
              backgroundColor: "#E5E7EB",
              borderRadius: "1px",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: "bold", mb: 2 }}
          >
            Success Metrics & KPIs
          </Typography>

          <Grid container spacing={2}>
            {(detailData.success_metrics_kpis || []).map((metric, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper
                  sx={{
                    p: 2,
                    pl: 3,
                    bgcolor: "#ecfdf5",
                    border: "1px solid #34d399",
                    borderLeft: "6px solid #10b981", // ✅ left side accent border (green)
                    borderRadius: 2,
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderLeft: "6px solid #059669", // darker green on hover
                      boxShadow: 4,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#047857",
                      fontSize: "14px",
                      mb: 0.5,
                    }}
                  >
                    {metric.metric}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "#1e293b", fontSize: "13px" }}
                  >
                    {metric.target}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Future Trend Predictions */}

        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            boxShadow: 3,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "2%",
              right: "2%",
              top: "55px", // adjust for heading height
              height: "0.5mm",
              backgroundColor: "#E5E7EB", // light grayish-blue line
              borderRadius: "1px",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              mb: 1,
              zIndex: 2,
              position: "relative",
            }}
          >
            Future Trend Predictions
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#1e293b",
              fontSize: "15px",
              position: "relative",
              zIndex: 2,
              mt: 2,
            }}
          >
            {detailData.future_trend_predictions}
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "2%",
              right: "2%",
              top: "55px", // adjust for heading height
              height: "0.5mm",
              backgroundColor: "#E5E7EB", // subtle gray divider
              borderRadius: "1px",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              mb: 1,
              zIndex: 2,
              position: "relative",
            }}
          >
            Personalized Recommendations
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#1e293b",
              fontSize: "15px",
              position: "relative",
              zIndex: 2,
              mt: 2,
            }}
          >
            {detailData.personalized_recommendations}
          </Typography>
        </Paper>

      </Box>

      {/* 🔓 Upgrade Modal */}
      <PlansModal open={openPlans} onClose={handleClosePlans} />
    </Box>
  );
}

DetailNotes.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        detailed_notes: PropTypes.shape({
          industry_benchmarks: PropTypes.string,
          risk_factors_mitigation: PropTypes.arrayOf(
            PropTypes.shape({
              risk_factor: PropTypes.string,
              mitigation: PropTypes.string,
            })
          ),
          success_metrics_kpis: PropTypes.arrayOf(
            PropTypes.shape({
              metric: PropTypes.string,
              target: PropTypes.string,
            })
          ),
          future_trend_predictions: PropTypes.string,
          personalized_recommendations: PropTypes.string,
        }),
      }),
    }),
  }),
  serviceResp: PropTypes.bool,
};