import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Program() {
  return (
    <Box
      sx={{
        bgcolor: "white",
        py: 8,
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#0d2c9b" }}
        >
          Why this program?
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="subtitle1"
          sx={{ mb: 3, color: "black", fontSize: "1.1rem" }}
        >
          Generative AI is rewriting every marketing playbook—from copywriting to
          analytics. This program arms you with{" "}
          <strong>practical, no-code skills</strong> to stay ahead.
        </Typography>

        {/* Quote */}
        <Typography
          variant="subtitle2"
          sx={{
            fontStyle: "italic",
            color: "grey.600",
            fontSize: "1rem",
          }}
        >
          “IDC forecasts the AI market to surpass{" "}
          <Box component="span" sx={{ fontWeight: "bold", fontStyle: "italic" }}>
            $500 B
          </Box>{" "}
          by 2024—marketers who harness these tools will own the next decade.”
        </Typography>
      </Container>
    </Box>
  );
}
