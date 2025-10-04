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
    <Box sx={{ minHeight: "80px" }}>
        <Box
        sx={{
            position: "relative",
            borderRadius: 2,
            boxShadow: 1,
            mb: 10,
            mt: 6,
            bgcolor: "#ffffff",
            mx: { xs: 2, md: "auto" }, // ✅ auto centers on large screens
            py: { xs: 2, md: 0 },            
           maxWidth: { xs: '100%', md: '1330px', lg: '1300px' },   // ✅ responsive max width
            width: "1200px",
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
            paddingX: "1px",    // ✅ tighter horizontal padding
            fontSize: "12px",   // ✅ smaller text
              // ✅ reduce gap between tabs
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