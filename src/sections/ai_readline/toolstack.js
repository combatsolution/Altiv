import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LockIcon from "@mui/icons-material/Lock";
import { Icon } from "@iconify/react";
import { useAuthContext } from "src/auth/hooks";
import PlansModal from "./PlansModal";

export default function ToolStack({ data, serviceResp = false }) {
  const { user } = useAuthContext();
  const [openPlans, setOpenPlans] = useState(false);
  const handleOpenPlans = () => setOpenPlans(true);
  const handleClosePlans = () => setOpenPlans(false);

  // ✅ Unlock logic
  const isContentVisible = user?.isPro || serviceResp;

  // ✅ Dummy fallback data (for locked users)
  const dummyToolData = [
    {
      Layer: "AI-Powered Forecasting Tools",
      "Recommended Tools": "IBM Planning Analytics, Blue Yonder Luminate, PlanVisage AI Modules",
      Rationale:
        "For advanced demand forecasting and inventory optimization using predictive analytics.",
    },
    {
      Layer: "Process Automation (RPA)",
      "Recommended Tools": "UiPath, Automation Anywhere, Microsoft Power Automate",
      Rationale:
        "Enables automation of repetitive S&OP and supply chain processes for efficiency.",
    },
    {
      Layer: "Collaboration & Workflow",
      "Recommended Tools": "Notion AI, ClickUp, Jira with AI Assist",
      Rationale:
        "Facilitates team collaboration, tracking, and real-time reporting with smart suggestions.",
    }
  ];

  // ✅ Use real data only when unlocked
  const toolData = serviceResp
    ? data?.data?.json_schema_data?.tool_stack_overview || []
    : dummyToolData;

  // Optional background colors & icons for variety
  const colors = ["#e8f0fe", "#fff7e6", "#f0fff4", "#f9ebff", "#e6fff9"];
  const icons = [
    "twemoji:gear",
    "twemoji:rocket",
    "twemoji:bar-chart",
    "twemoji:books",
    "twemoji:triangular-flag",
  ];

  return (
    <Box sx={{ position: "relative" }}>
      <Container
        sx={{
          py: 6,
          maxWidth: { xs: "100%", md: "400px", lg: "1200px" },
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
              Tool Stack Locked
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
              Upgrade to unlock your personalized AI-enabled tool recommendations
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            filter: !isContentVisible ? "blur(3px)" : "none",
            pointerEvents: !isContentVisible ? "none" : "auto",
          }}
        >
          <Typography variant="h5" fontWeight={600} color="primary" gutterBottom>
            Recommended Tool Stack
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

        <Divider
          sx={{
            mb: 4,
            filter: !isContentVisible ? "blur(3px)" : "none",
          }}
        />

        {/* Tool Cards */}
        <Stack
          spacing={3}
          sx={{
            filter: !isContentVisible ? "blur(2px)" : "none",
            pointerEvents: !isContentVisible ? "none" : "auto",
          }}
        >
          {toolData.map((item, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: colors[index % colors.length],
                border: "1px solid rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              {/* Icon (top-right) */}
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  fontSize: 28,
                }}
              >
                <Icon icon={icons[index % icons.length]} />
              </Box>

              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="primary"
                gutterBottom
              >
                {item.Layer}
              </Typography>

              <Typography
                variant="body1"
                fontWeight={500}
                sx={{ mb: 1 }}
                color="text.primary"
              >
                {item["Recommended Tools"]}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {item.Rationale}
              </Typography>
            </Paper>
          ))}
        </Stack>

        {/* Upgrade Modal */}
        <PlansModal open={openPlans} onClose={handleClosePlans} />
      </Container>
    </Box>
  );
}

ToolStack.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        tool_stack_overview: PropTypes.arrayOf(
          PropTypes.shape({
            Layer: PropTypes.string,
            "Recommended Tools": PropTypes.string,
            Rationale: PropTypes.string,
          })
        ),
      }),
    }),
  }),
  serviceResp: PropTypes.bool, // ✅ unlock control
};
