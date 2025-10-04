import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const sections = [
  "Executive Summary",
  "Current State",
  "Strategic Objectives",
  "Transformation Roadmap",
  "Capability Building",
  "Tool Stack",
  "Quick Start",
  "Skill Erosion",
  "Task Automation",
  "Detailed Notes",
];

export default function ResponsiveNavbar() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ minHeight: "80px" }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          boxShadow: 1,
          mb: 10,
          mt: 2,
          bgcolor: "#ffffff",
          mx: { xs: 2, md: "auto" },
          py: { xs: 2, md: 0 },
          maxWidth: { xs: "100%", md: "1000px", lg: "1275px" },
          width: "1150px",
          display: "flex",
          justifyContent: "center",
        }}
      >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="standard"        // ✅ keep standard
        sx={{
          "& .MuiTabs-flexContainer": {
            justifyContent: "center",
            flexWrap: "nowrap",   // ✅ force single row
            gap: 0,             // ✅ tighter spacing between tabs
          },
          "& .MuiTab-root": {
            minWidth: "auto !important", // ✅ remove wide minWidth
            paddingX: "0px",             // ✅ tighter button padding
            fontSize: "11px",            // ✅ smaller text
            textTransform: "none",
            mr:3

          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "& .Mui-selected": {
            background: "linear-gradient(90deg, #2563eb 40%, #00A3FF 100%)",
            color: "#ffffff !important",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        {sections.map((section, index) => (
          <Tab key={index} label={section} />
        ))}
      </Tabs>

      </Box>
    </Box>
  );
}
