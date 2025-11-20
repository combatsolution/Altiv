

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import PropTypes from "prop-types";
import { useAuthContext } from "src/auth/hooks";
import PlansModal from "./PlansModal";

export default function ExecutiveSummary({ data, serviceResp }) {
  console.log("dsdsdsdsdsds", serviceResp);
  const { user } = useAuthContext();

  const [openPlans, setOpenPlans] = useState(false);
  const [checked, setChecked] = useState(false);

  // ✅ Simulate check (you can extend this later with subscription API)
  useEffect(() => {
    setChecked(true);
  }, [user]);

  if (!checked) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Checking access...
        </Typography>
      </Box>
    );
  }

  // ✅ Determine access
  const hasAccess = !!serviceResp;

  // ✅ Dummy fallback data
  const dummyData = {
    profile: {
      name: "Priya Nair",
      title: "Head of Operations and Supply Chain",
      company: "Zenith Manufacturing Pvt. Ltd.",
      qualifications:
        "10+ years of experience in end-to-end supply chain management, demand forecasting, and S&OP strategy across 7 business units with combined annual revenue of 950+ Cr. Skilled in process automation, Lean methodologies, and SAP integration.",
    },
    key_achievements: [
      "Increased forecast accuracy by 25% through AI-assisted demand analytics and data-driven planning.",
      "Reduced logistics costs by 15% by optimizing supplier collaboration and warehouse distribution networks.",
      "Implemented real-time inventory dashboards, improving service levels and visibility across regions.",
    ],
    summary:
      "Priya’s leadership in operational transformation and digital innovation has strengthened business agility and scalability. This AI-readiness blueprint highlights strategic pathways to future-proof her supply chain capabilities and enhance decision intelligence.",
  };

  const summaryData =
    serviceResp && data?.data?.json_schema_data?.executive_summary
      ? data.data.json_schema_data.executive_summary
      : dummyData;

  const { profile, key_achievements, summary } = summaryData;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "rgba(255,255,255,0.9)",
        position: "relative",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        minHeight: "500px",
      }}
    >
      {/* 🔒 Locked Overlay */}
      {!hasAccess && (

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            //  bgcolor: "rgba(221, 45, 45, 0.8)",
            // backdropFilter: "blur(4px)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
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
            <LockIcon
              sx={{
                fontSize: { xs: 40, sm: 50, md: 60 },   // Responsive icon size
                color: "#1565c0",
                mb: { xs: 1, md: 2 }
              }}
            />

            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px" } }}
            >
              Executive Summary Locked
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: "text.secondary",
                fontSize: { xs: "13px", sm: "14px", md: "15px" }
              }}
            >
              Unlock this section by purchasing the FOBO Pro service.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                textTransform: "none",
                fontWeight: 600,
                fontSize: { xs: "13px", sm: "14px" },
              }}
              onClick={() => setOpenPlans(true)}
            >
              Unlock Now
            </Button>
          </Box>

        </Box>
      )}

      {/* ---- Executive Summary Content ---- */}
      <Box
        sx={{
          filter: hasAccess ? "none" : "blur(3px)",
          opacity: hasAccess ? 1 : 0.6,
          pointerEvents: hasAccess ? "auto" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: (t) => `2px solid ${t.palette.grey[300]}`,
            mb: 2,
            py: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#3f51b5" }}>
            Executive Summary
          </Typography>
          <Button
            variant="contained"
            color="info"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Share
          </Button>
        </Box>

        {/* Profile + Achievements */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: "#1a2238",
                color: "white",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                Professional Profile
              </Typography>
              <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />
              <Typography sx={{ fontSize: 14, mt: 1 }}>
                <strong>Name:</strong> {profile?.name || "N/A"}
              </Typography>
              <Typography sx={{ fontSize: 14, mt: 1 }}>
                <strong>Title:</strong> {profile?.title || "N/A"}
              </Typography>
              <Typography sx={{ fontSize: 14, mt: 1 }}>
                <strong>Company:</strong> {profile?.company || "N/A"}
              </Typography>
              <Typography sx={{ fontSize: 14, mt: 1 }}>
                <strong>Qualifications:</strong>{" "}
                {profile?.qualifications || "N/A"}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Key Achievements
              </Typography>
              <List dense>
                {Array.isArray(key_achievements) &&
                  key_achievements.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Summary */}
        <Paper
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: "#e8f5e9",
          }}
        >
          <Typography variant="body2">{summary}</Typography>
        </Paper>
      </Box>

      {/* Plans Modal */}
      <PlansModal open={openPlans} onClose={() => setOpenPlans(false)} />
    </Box>
  );
}

ExecutiveSummary.propTypes = {
  data: PropTypes.object,
  serviceResp: PropTypes.bool,
};
