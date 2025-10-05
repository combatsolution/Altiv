import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

const objectives = [
  {
    id: 1,
    head: "Methodology",
    text: "This comprehensive AI-readiness analysis was conducted using a proprietary framework that evaluates current capabilities against industry benchmarks for healthcare operations leadership. The assessment incorporates multiple data points including professional experience, educational background, current role responsibilities, and strategic objectives alignment.",
  },
  {
    id: 2,
    head: "Industry Benchmarks",
    text: "Dr. Gandhi's profile scores in the 75th percentile for healthcare operations leaders in similar roles. The analysis benchmarked against 500+ healthcare executives across India's top hospital networks. Key comparative metrics include operational efficiency, compliance management, stakeholder engagement, and technology adoption readiness.",
  },
  {
    id: 3,
    head: "Future Trend Predictions",
    text: "Based on current healthcare AI adoption trends, we anticipate significant growth in automated compliance monitoring (85% adoption by 2027), predictive analytics for patient flow optimization (70% by 2026), and AI-driven financial modeling for healthcare operations (60% by 2026). Dr. Gandhi's transformation roadmap positions him ahead of these industry curves.",
  },
  {
    id: 4,
    head: "Personalized Recommendations",
    text: "Given Dr. Gandhi's clinical background and current operational role, focus should be placed on healthcare-specific AI applications. His NABH coordination experience provides a strong foundation for implementing AI-driven compliance tools. The MBA in Healthcare Administration creates synergy opportunities with financial modeling and strategic analytics AI platforms.",
  },
];

const riskFactors = [
  {
    head: "Technology Adoption Resistance",
    text: "Implement gradual rollout with comprehensive training programs and change management protocols.",
  },
  {
    head: "Skill Obsolescence",
    text: "Continuous learning pathways established to maintain relevance in rapidly evolving healthcare AI landscape.",
  },
  {
    head: "Integration Complexity",
    text: "Phased implementation approach with dedicated technical support and vendor partnerships.",
  },
];

const successMetrics = [
  { head: "Operational Efficiency", text: "30% improvement in process cycle times" },
  { head: "Cost Reduction", text: "25% decrease in administrative overhead" },
  { head: "Quality Improvement", text: "20% reduction in compliance incidents" },
  { head: "Revenue Impact", text: "15% increase in strategic partnerships" },
];

export default function DetailNotes() {
  return (
    <Box sx={{ p: 3, mx: "auto", maxWidth: { xs: "100%", md: "1200px" } }}>
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

      {/* Objectives List */}
      <Grid container spacing={2} mb={3}>
        {objectives.map((obj) => (
          <Grid item xs={12} key={obj.id}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "top",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.grey[300]}`,
                    fontSize: "15px",
                    mb: 1,
                    color: "primary.main",
                    fontWeight: "bold",
                  }}
                >
                  {obj.head}
                </Typography>

                <Typography sx={{ fontSize: "15px", color: "#1e293b" }}>
                  {obj.text}
                </Typography>
              </Box>
            </Paper>

            {/* Insert new Risk Factors & KPIs after Industry Benchmarks */}
            {obj.head === "Industry Benchmarks" && (
              <>
                {/* Risk Factors Section */}
                <Paper sx={{ p: 2, mt: 3, borderRadius: 2, boxShadow: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      mb: 2,
                    }}
                  >
                    Risk Factors & Mitigation
                  </Typography>
                  <Grid container spacing={2}>
                    {riskFactors.map((risk, idx) => (
                      <Grid item xs={12} key={idx}>
                        <Paper
                          sx={{
                            p: 2,
                            bgcolor: "#fee2e2",
                            borderLeft: "5px solid #ef4444",
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: "bold", color: "#b91c1c" }}
                          >
                            {risk.head}:
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#1e293b" }}>
                            {risk.text}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

                {/* Success Metrics Section */}
                <Paper sx={{ p: 2, mt: 3, borderRadius: 2, boxShadow: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      mb: 2,
                    }}
                  >
                    Success Metrics & KPIs
                  </Typography>
                  <Grid container spacing={2}>
                    {successMetrics.map((metric, idx) => (
                      <Grid item xs={12} md={3} key={idx}>
                        <Paper
                          sx={{
                            p: 2,
                            bgcolor: "#ecfdf5",
                            border: "1px solid #34d399",
                            borderRadius: 2,
                            textAlign: "center",
                            height: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "#047857",
                              fontSize: "14px",
                            }}
                          >
                            {metric.head}:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#1e293b", fontSize: "13px" }}
                          >
                            {metric.text}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
