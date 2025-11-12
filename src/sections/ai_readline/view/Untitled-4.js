import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import LockIcon from "@mui/icons-material/Lock";
import PropTypes from "prop-types";
import { useAuthContext } from "src/auth/hooks";
import PlansModal from "./PlansModal";

export default function CapabilityBuilding({ data, serviceResp = false }) {
  const { user } = useAuthContext();
  const [openPlans, setOpenPlans] = useState(false);
  const handleOpenPlans = () => setOpenPlans(true);
  const handleClosePlans = () => setOpenPlans(false);


    const DemoData_time_period_definition = {
        "T": "90 Days: Micro-Credential Achievement Period"
    };
    const DemoData_learning_plan = [
        {
            "Skill Cluster": "Predictive Financial Analytics",
            "T Micro-Credential": "Course on Forecasting & Predictive Analytics in Finance (LinkedIn Learning / Coursera)",
            "Learning Mode": "Self-paced with guided exercises",
            "Estimated Hrs/Week": "4 – 6 hrs"
        },
        {
            "Skill Cluster": "Automation in Finance (RPA)",
            "T Micro-Credential": "Beginner-to-Intermediate RPA certification using UiPath or Automation Anywhere",
            "Learning Mode": "Hands-on projects with virtual labs",
            "Estimated Hrs/Week": "3 – 4 hrs"
        },
        {
            "Skill Cluster": "AI-Enhanced Decision Making",
            "T Micro-Credential": "Executive program in Applied AI for Business Decisions (Harvard / INSEAD Online)",
            "Learning Mode": "Live sessions + industry simulations",
            "Estimated Hrs/Week": "3 – 5 hrs"
        },
        {
            "Skill Cluster": "Data Visualization & Storytelling",
            "T Micro-Credential": "Power BI Dashboard Design and Analytics for Financial Leaders",
            "Learning Mode": "Interactive workshops + capstone presentation",
            "Estimated Hrs/Week": "2 – 3 hrs"
        }
    ]

  // ✅ Unlock content if Pro user or service purchased
  const isContentVisible = user?.isPro || serviceResp;

  // ✅ Extract capability building plan data
  const capabilityPlan = serviceResp ? (data?.data?.json_schema_data?.capability_building_plan?.learning_plan) : DemoData_learning_plan || [];
  
  const timePeriod = serviceResp ? (data?.data?.json_schema_data?.capability_building_plan?.time_period_definition?.T) : DemoData_time_period_definition || [];
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
        position: "relative",
      }}
    >
      {/* 🔒 Locked Overlay */}
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
            Capability Building Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Upgrade to unlock your personalized learning roadmap
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
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          filter: !isContentVisible ? "blur(2px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        <Typography variant="h5" fontWeight={600} color="primary" gutterBottom>
          Capability Building
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon icon="ic:sharp-share" width="20" height="20" color="#fff" />}
        >
          Share
        </Button>
      </Box>

      {/* Time Period */}
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          color: "text.secondary",
          fontWeight: 500,
          filter: !isContentVisible ? "blur(2px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        Time Period: {timePeriod}
      </Typography>

      <Divider
        sx={{
          mb: 3,
          filter: !isContentVisible ? "blur(2px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      />

      {/* Capability Cards */}
      <Grid
        container
        spacing={3}
        sx={{
          filter: !isContentVisible ? "blur(2px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
        }}
      >
        {capabilityPlan.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid rgba(0,0,0,0.1)",
                bgcolor: "background.paper",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Skill Cluster + Hours */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} color="primary">
                  {item["Skill Cluster"]}
                </Typography>
                <Chip
                  label={`${item["Estimated Hrs/Week"]} hrs/week`}
                  color="success"
                  size="small"
                  sx={{ fontSize: "0.75rem", fontWeight: 500 }}
                />
              </Box>

              {/* Micro-Credential */}
              <Typography sx={{ mb: 1, fontSize: "13px" }}>
                <strong>Micro-Credential:</strong> {item["T Micro-Credential"]}
              </Typography>

              {/* Learning Mode */}
              <Typography sx={{ fontSize: "13px" }} color="text.secondary">
                <strong>Learning Mode:</strong> {item["Learning Mode"]}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Upgrade Modal */}
      <PlansModal open={openPlans} onClose={handleClosePlans} />
    </Container>
  );
}

// ✅ PropTypes Validation
CapabilityBuilding.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        capability_building_plan: PropTypes.shape({
          time_period_definition: PropTypes.shape({
            T: PropTypes.string,
          }),
          learning_plan: PropTypes.arrayOf(
            PropTypes.shape({
              "Skill Cluster": PropTypes.string,
              "T Micro-Credential": PropTypes.string,
              "Learning Mode": PropTypes.string,
              "Estimated Hrs/Week": PropTypes.string,
            })
          ),
        }),
      }),
    }),
  }),
  serviceResp: PropTypes.bool, // ✅ new prop for unlock control
};
