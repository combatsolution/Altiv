import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "src/utils/axios";
import AIReadinessDashboard from "./AIReadinessDashboard";
import StrategicObjectives from "./strategicobjectives";
import CapabilityBuilding from "./capabilitybuilding";
import ToolStack from "./toolstack";
import QuickStartGuide from "./quickstartguide";
import TopTasksExposureAnalysis from "./taskautomation";
import SkillErosionProjection from "./skillerosionprojection";
import DetailNotes from "./detailnote";
import CurrentStateAnalysis from "./currentStateanalysis";
import TransformationRoadmap from "./transformationroadmap";
import ExecutiveSummary from "./executivesummary";

const sections = [
  { label: "Executive Summary", component: ExecutiveSummary },
  { label: "Current State", component: CurrentStateAnalysis},
  { label: "Strategic Objectives", component: StrategicObjectives },
  { label: "Transformation Roadmap", component: TransformationRoadmap },
  { label: "Capability Building", component: CapabilityBuilding },
  { label: "Tool Stack", component: ToolStack },
  { label: "Quick Start", component: QuickStartGuide },
  { label: "Skill Erosion", component: SkillErosionProjection },
  { label: "Task Automation", component: TopTasksExposureAnalysis },
  { label: "Detailed Notes", component: DetailNotes },
];

export default function ResponsiveNavbar() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profileAnalytics, setProfileAnalytics] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const payload = {
      resumeId: 668,
      linkedInUrl:
        "https://www.linkedin.com/in/shubham-shahane-22552b186/",
      viewDetails: true,
      smartInsights: true,
      isFoboPro: true,
      isComprehensiveMode: true,
    };

    const fetchProfileAnalytics = async () => {
      try {
        const response = await axiosInstance.post("/profile-analytics", payload);
        setProfileAnalytics(response.data);
        localStorage.setItem("profileAnalytics", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching profile analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAnalytics();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "-10vh",
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  const SelectedComponent = sections[value].component;

  return (
    <Box sx={{ minHeight: "1px" }}>
      {/* ✅ Tabs Container */}
      <Box
        sx={{
          borderRadius: 2,
          boxShadow: 1,
          mb: 1,
          mt: 2,
          bgcolor: "#ffffff",
          mx: "auto",
          
          px:2,
          py: { xs: 1.5, md: 1.5 },
          maxWidth: "1200px",
          width: "100%",
          overflow: "hidden", // ✅ prevent overflow
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isMobile ? "scrollable" : "fullWidth"} // ✅ fullWidth on desktop
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
          centered={!isMobile}
          sx={{
            width: "100%",
            "& .MuiTabs-flexContainer": {
              justifyContent: isMobile ? "flex-start" : "space-between", // ✅ evenly spread
              flexWrap: "nowrap",
            },
            "& .MuiTab-root": {
              flex: 1,
              minWidth: "auto",
              px: { xs: 1.5, md: 2 },
              py: 0.8,
              fontSize: { xs: "10px", md: "12px" },
              textTransform: "none",
              color: "#333",
              borderRadius: "6px",
              transition: "all 0.2s ease-in-out",
            },
            "& .Mui-selected": {
              background: "linear-gradient(90deg, #2563eb 40%, #00A3FF 100%)",
              color: "#fff !important",
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          {sections.map((section, index) => (
            <Tab key={index} label={section.label} disableRipple />
          ))}
        </Tabs>
      </Box>

      {/* ✅ Selected Tab Content */}
      <Box
        sx={{
          px: { xs: 2, md: 0 },
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* <SelectedComponent data={profileAnalytics} /> */}
        <SelectedComponent />
      </Box>
    </Box>
  );
}
