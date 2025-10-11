import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Program() {
  return (
    <Box
      sx={{
        bgcolor: "white",
        pt: 4,
        textAlign: "center",
            maxWidth: '100%',
         width:'100%',
      }}
    >
      <Container maxWidth="md">
        {/* Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#0d2c9b",mb:2 }}
        >
          Why this program?
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="regular"
          sx={{  color: "black", fontSize: "20px", py:3 }}
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
            color: "grey.500",  
            textAlign: "left",
            fontSize:'18px',  
            px:10,
            my:2
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
