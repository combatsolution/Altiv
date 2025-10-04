import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, useMediaQuery, useTheme, CircularProgress } from "@mui/material";
import axiosInstance from "src/utils/axios";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

useEffect(() => {
  const payload = {
    resumeId: 668,
    linkedInUrl: "https://www.linkedin.com/in/shubham-shahane-22552b186/",
    viewDetails: true,
    smartInsights: true,
    isFoboPro: true,
    isComprehensiveMode: true,
  };

  const fetchProfileAnalytics = async () => {
    try {
      const response = await axiosInstance.post("/profile-analytics", payload);
      console.log("Profile Analytics:", response.data);
       console.log("comprehensive_analysis:", response.data.data.comprehensive_analysis);


      localStorage.setItem("profileAnalytics", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching profile analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfileAnalytics();
}, []); // ✅ no missing dependency warning
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const route = `/profile/${sections[newValue].toLowerCase().replace(/\s+/g, "-")}`;
    navigate(route);
  };

  // ✅ Show loader while data is being fetched
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  // ✅ Once data is ready, render navbar
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
          maxWidth: { xs: "100%", md: "1275px" },
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={isMobile ? "auto" : false}
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
              flexWrap: "nowrap",
            },
            "& .MuiTab-root": {
              minWidth: "auto !important",
              padding: "6px 12px",
              fontSize: "11px",
              textTransform: "none",
              marginRight: "40px",
            },
            "& .MuiTab-root:last-of-type": {
              marginRight: 0,
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .Mui-selected": {
              background: "linear-gradient(90deg, #2563eb 40%, #00A3FF 100%)",
              color: "#ffffff !important",
              borderRadius: "6px",
              px: 1,
              py: 0.5,
            },
          }}
        >
          {sections.map((section, index) => (
            <Tab key={index} label={section} disableRipple />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
