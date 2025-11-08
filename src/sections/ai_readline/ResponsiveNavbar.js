
// import { useState, useEffect } from "react";
// import {
//   Tabs,
//   Tab,
//   Box,
//   useMediaQuery,
//   useTheme,
//   CircularProgress,
//   Container,
// } from "@mui/material";
// import { useAuthContext } from "src/auth/hooks";
// import axiosInstance from "src/utils/axios";
// import AIReadinessDashboard from "./AIReadinessDashboard";
// import StrategicObjectives from "./strategicobjectives";
// import CapabilityBuilding from "./capabilitybuilding";
// import ToolStack from "./toolstack";
// import QuickStartGuide from "./quickstartguide";
// import TopTasksExposureAnalysis from "./taskautomation";
// import SkillErosionProjection from "./skillerosionprojection";
// import DetailNotes from "./detailnote";
// import CurrentStateAnalysis from "./CurrentStateAnalysis";
// import TransformationRoadmap from "./transformationroadmap";
// import ExecutiveSummary from "./executivesummary";


// const sections = [
//   { label: "Executive Summary", component: ExecutiveSummary },
//   { label: "Current State", component: CurrentStateAnalysis },
//   { label: "Strategic Objectives", component: StrategicObjectives },
//   { label: "Transformation Roadmap", component: TransformationRoadmap },
//   { label: "Capability Building", component: CapabilityBuilding },
//   { label: "Tool Stack", component: ToolStack },
//   { label: "Quick Start", component: QuickStartGuide },
//   { label: "Skill Erosion", component: SkillErosionProjection },
//   { label: "Task Automation", component: TopTasksExposureAnalysis },
//   { label: "Detailed Notes", component: DetailNotes },
// ];

// export default function ResponsiveNavbar() {
//   const [value, setValue] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [profileAnalytics, setProfileAnalytics] = useState(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const { user } = useAuthContext();
//   const resumeId = user?.resumes?.at(-1)?.id;

//   useEffect(() => {
//     const payload = {
//       resumeId,
//       viewDetails: true,
//       smartInsights: true,
//       isFoboPro: true,
//       isComprehensiveMode: true,
//     };

//     const fetchProfileAnalytics = async () => {
//       try {
//         const response = await axiosInstance.post("/profile-analytics", payload);
//         console.log("SSSEctiosns",)
//         setProfileAnalytics(response.data);
//         localStorage.setItem("profileAnalytics", JSON.stringify(response.data));
//       } catch (error) {
//         console.error("Error fetching profile analytics:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (resumeId) fetchProfileAnalytics();
//   }, [resumeId]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "200px",
//         }}
//       >
//         <CircularProgress size={40} />
//       </Box>
//     );
//   }

//   const SelectedComponent = sections[value].component;
//   const extraPrLabels = [
//     "Strategic Objectives",
//     "Transformation Roadmap",
//     "Capability Building",
//   ];

//   return (
//     <Box sx={{ bgcolor: "#f9f9f9", py: { xs: 2, md: 1 } }}>
//       {/* ✅ Top Tabs Section */}
//       <Container
//         maxWidth={false}
//         sx={{
//           maxWidth: "1150px",
//           bgcolor: "#fff",
//           borderRadius: 2,
//           boxShadow: 1,
//           py: { xs: 1, md: 1.5 },
//           px: { xs: 1, md: 2 },
//         }}
//       >
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           variant={isMobile ? "scrollable" : "fullWidth"}
//           scrollButtons={isMobile ? "auto" : false}
//           allowScrollButtonsMobile
//           centered={!isMobile}
//           sx={{
//             "& .MuiTabs-flexContainer": {
//               justifyContent: isMobile ? "flex-start" : "space-between",
//               flexWrap: "nowrap",
//             },
//             "& .MuiTab-root": {
//               flex: 1,
//               px: { xs: 1.5, md: 0 },
//               fontSize: { xs: "11px", sm: "12px", md: "10px" },
//               fontWeight: 500,
//               textTransform: "none",
//               color: "#333",
//               borderRadius: "6px",
//               transition: "all 0.2s ease-in-out",
//               minHeight: { xs: "32px", md: "36px" },
//               // ✅ Add the margin rule here
//               [theme.breakpoints.up("sm")]: {
//                 "&:not(:last-of-type)": {
//                   marginRight: "0px",
//                 },
//               },
//             },
//             "& .Mui-selected": {
//               background: "#2A4DD0",
//               color: "#fff !important",
//             },
//             "& .MuiTabs-indicator": { display: "none" },
//           }}
//         >
//           {sections.map((section, index) => (
//             <Tab
//               key={index}
//               label={section.label}
//               disableRipple
//               sx={{
//                 // apply pr: 3px only for the specific labels and only on sm+ screens
//                 ...(extraPrLabels.includes(section.label) && {
//                   [theme.breakpoints.up("sm")]: {
//                     mr: "30px",
//                   },
//                 }),
//               }}
//             />
//           ))}
//         </Tabs>
//       </Container>

//       {/* ✅ Tab Content Section */}
//       <Container
//         maxWidth={false}
//         sx={{
//           maxWidth: "1150px",
//           mt: { xs: 2, md: 0 },
//           px: { xs: 2, sm: 3, md: 0 },
//         }}
//       >
//         <SelectedComponent data={profileAnalytics} />
//       </Container>
//     </Box>
//   );
// }


import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Container,
} from "@mui/material";
import { useAuthContext } from "src/auth/hooks";
import PropTypes from "prop-types";
import axiosInstance from "src/utils/axios";
import AIReadinessDashboard from "./AIReadinessDashboard";
import StrategicObjectives from "./strategicobjectives";
import CapabilityBuilding from "./capabilitybuilding";
import ToolStack from "./toolstack";
import QuickStartGuide from "./quickstartguide";
import TopTasksExposureAnalysis from "./taskautomation";
import SkillErosionProjection from "./skillerosionprojection";
import DetailNotes from "./detailnote";
import CurrentStateAnalysis from "./CurrentStateAnalysis";
import TransformationRoadmap from "./transformationroadmap";
import ExecutiveSummary from "./executivesummary";



const sections = [
  //  { label: "AI ReadinessDashboard", component: AIReadinessDashboard },
  { label: "Executive Summary", component: ExecutiveSummary },
  { label: "Current State", component: CurrentStateAnalysis },
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
  const { user } = useAuthContext();
  const resumeId = user?.resumes?.at(-1)?.id;
  const isProUser = user?.subscription?.isPro ?? false; // ✅ Example flag

  useEffect(() => {
    const payload = {
      resumeId,
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

    if (resumeId) fetchProfileAnalytics();
  }, [resumeId]);

  const handleChange = (event, newValue) => setValue(newValue);
  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={40} />
      </Box>
    );

  const SelectedComponent = sections[value].component;
  const extraPrLabels = ["Strategic Objectives", "Transformation Roadmap", "Capability Building"];

  return (
    <Box sx={{ bgcolor: "#f9f9f9", py: { xs: 2, md: 1 }, position: "relative" }}>
      {/* ✅ Tabs */}
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1150px",
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 1,
          py: { xs: 1, md: 1.5 },
          px: { xs: 1, md: 2 },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
          centered={!isMobile}
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: isMobile ? "flex-start" : "space-between",
              flexWrap: "nowrap",
            },
            "& .MuiTab-root": {
              flex: 1,
              px: { xs: 1.5, md: 0 },
              fontSize: { xs: "11px", sm: "12px", md: "9px" },
              fontWeight: 500,
              textTransform: "none",
              color: "#333",
              borderRadius: "6px",
              transition: "all 0.2s ease-in-out",
              minHeight: { xs: "32px", md: "36px" },
              [theme.breakpoints.up("sm")]: {
                "&:not(:last-of-type)": {
                  marginRight: "0px",
                },
              },
            },
            "& .Mui-selected": {
              background: "#2A4DD0",
              color: "#fff !important",
            },
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          {sections.map((section, index) => (
            <Tab
              key={index}
              label={section.label}
              disableRipple
              sx={
                extraPrLabels.includes(section.label)
                  ? { [theme.breakpoints.up("sm")]: { mr: "30px" } }
                  : {}
              }
            />
          ))}
        </Tabs>
      </Container>

      {/* ✅ Tab Content */}
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1150px",
          mt: { xs: 2, md: 0 },
          px: { xs: 2, sm: 3, md: 0 },
          position: "relative",
        }}
      >
        <SelectedComponent data={profileAnalytics} />

        {/* ✅ Blur Overlay for non-pro users (no text shown) */}
        {!isProUser && (
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "rgba(255,255,255,0.7)",
              zIndex: 10,
              borderRadius: 2,
            }}
          />
        )}
      </Container>
    </Box>
  );
}


