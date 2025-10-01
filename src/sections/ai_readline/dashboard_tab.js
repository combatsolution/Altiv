import React, { useState } from "react";
import {
  AppBar,
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
    <Box sx={{ py: 2, minHeight: "80vh" }}>
        <Box
        sx={{
            position: "relative",
            borderRadius: 2,
            boxShadow: 1,
            mb: 20,
            mt: 6,
            bgcolor: "#ffffff",
            mx: { xs: 2, md: "auto" }, // ✅ auto centers on large screens
            py: { xs: 2, md: 1 },
            maxWidth: 1160,
            width: "100%",
            display: "flex",
            justifyContent: "center", // ✅ Center contents
            fontSize: '12px',
        }}
        >

        <Tabs
        value={value}
        onChange={handleChange}
        variant="standard"
        sx={{
            "& .MuiTabs-flexContainer": {
            justifyContent: "center",
            flexWrap: "wrap",   // ✅ allows multiple rows
            },
            "& .MuiTab-root": {
            minWidth: "auto",   // ✅ remove default big minWidth
            paddingX: "8px",    // ✅ tighter horizontal padding
            fontSize: "12px",   // ✅ smaller text
            marginX: "2px",     // ✅ reduce gap between tabs
            },
            "& .MuiTabs-indicator": { display: "none" },
            "& .Mui-selected": {
            background: "linear-gradient(90deg, #2563eb 40%, #00A3FF 100%)",
            color: "#ffffff !important",
            borderRadius: "6px",
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
