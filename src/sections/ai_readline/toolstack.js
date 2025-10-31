import React from "react";
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

export default function ToolStack({ data, isProUser }) {
  const toolData = data?.data?.json_schema_data?.tool_stack_overview || [];

  // Optional: background color palette
  const colors = ["#e8f0fe", "#fff7e6", "#f0fff4", "#f9ebff", "#e6fff9"];
  const icons = [
    "twemoji:triangular-flag",
    "twemoji:gear",
    "twemoji:rocket",
    "twemoji:bar-chart",
    "twemoji:books",
  ];

  return (
    <Box sx={{ position: "relative" }}>
      <Container
        sx={{
          py: 6,
          maxWidth: { xs: "100%", md: "400px", lg: "1200px" },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600} color="primary" gutterBottom>
            Recommended Tool Stack
          </Typography>
          <Button
            size="small"
            variant="contained"
            startIcon={<TwitterIcon />}
            sx={{
              bgcolor: "#1DA1F2",
              textTransform: "none",
              "&:hover": { bgcolor: "#0d8ddb" },
            }}
          >
            Tweet
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Tool Cards */}
        <Stack spacing={3}>
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
      </Container>

      {/* 🔒 Blue Lock Overlay */}
      {!isProUser && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255,255,255,0.7)",
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
            toolstack is Locked
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 2, color: "text.secondary" }}
          >
            Upgrade to access full toolstack Section
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
            onClick={() => window.open("/pricing", "_blank")}
          >
            Upgrade Now
          </Button>
        </Box>
      )}
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
  isProUser: PropTypes.bool, // 🔹 Added to control overlay visibility
};
