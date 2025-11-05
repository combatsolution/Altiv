

// import { useEffect } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Button,
//   Avatar,
// } from "@mui/material";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
// import BoltIcon from "@mui/icons-material/Bolt";
// import TrackChangesIcon from "@mui/icons-material/TrackChanges";
// import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
// import { m, animate, useMotionValue, useTransform } from "framer-motion";
// import PropTypes from "prop-types";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// // Motion wrapper for Paper
// const MotionPaper = m(Paper);

// // Component for animated number counter
// function AnimatedNumber({ value, suffix }) {
//   const motionValue = useMotionValue(0);
//   const rounded = useTransform(motionValue, (latest) => Math.floor(latest));
//   const displayedValue = useTransform(rounded, (val) => `${val}${suffix}`);
  

//   useEffect(() => {
//     motionValue.set(0);
//     const controls = animate(motionValue, value, {
//       duration: 2,
//       ease: "easeOut",
//     });
//     return () => controls.stop();
//   }, [value, motionValue]);

//   return (
//     <m.span style={{ display: "inline-block" }}>
//       <m.span style={{ display: "inline-block" }}>{displayedValue}</m.span>
//     </m.span>
//   );
// }

// AnimatedNumber.propTypes = {
//   value: PropTypes.number.isRequired,
//   suffix: PropTypes.string,
// };

// AnimatedNumber.defaultProps = {
//   suffix: "",
// };

// export default function AIReadinessDashboard({ data, onExportPDF }) {
//   // Dynamically build metrics based on API data or fallback to defaults
//   const metrics = [
//     {
//       title: "AI-Readiness Score",  
//       value: data?.AI_Readiness_Score ?? 0, 
//       suffix: "%",
//       subtitle: data?.aiReadinessRating ?? "Above Average",
//       color: "#3b82f6",
//       icon: <TrackChangesIcon sx={{ fontSize: 28, color: "#3b82f6" }} />,
//     },
//     {
//       title: "Transformation Timeline",
//       value: data?.transformationTimeline ?? 0,
//       suffix: " ",
//       subtitle: "Months",
//       color: "#f59e0b",
//       icon: <BoltIcon sx={{ fontSize: 28, color: "#f59e0b" }} />,
//     },
//     {
//       title: "Automation Potential",
//       value: data?.Automated_Score ?? 0,
//       suffix: "%",
//       subtitle: data?.automationImpact ?? "High Impact",
//       color: "#ec4899",
//       icon: <RocketLaunchIcon sx={{ fontSize: 28, color: "#ec4899" }} />,
//     },
//     {
//       title: "Strategic Objectives",
//       value: data?.strategicObjectives ?? 0,
//       suffix: "",
//       subtitle: "Key Goals",
//       color: "#facc15",
//       icon: <EmojiObjectsIcon sx={{ fontSize: 28, color: "#facc15" }} />,
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         bgcolor: "#f4f7fb",
//         minHeight: "370px",
//         my: 2,
//         mx: "auto",
//         maxWidth: { xs: "100%", md: "1330px", lg: "1350px" },
//       }}
//     >
//       {/* Header */}
//       <Box
//         alignItems={{ xs: "left", md: "center" }}
//         sx={{
//           bgcolor: "#2563eb",
//           color: "white",
//           px: { xs: 3, md: 8 },
//           py: 3,
//           display: "flex",
//           mx: "auto",
//           justifyContent: "space-between",
//           flexDirection: { xs: "column", md: "row" },
//           mb: 4,
//           gap: 2,
//         }}
//       >
//         {/* Left Section */}
//         <Box display="flex" alignItems="center" gap={2}>
//           <Avatar
//             sx={{
//               bgcolor: "white",
//               width: 90,
//               height: 40,
//               borderRadius: "8px",
//               color: "primary.main",
//               fontWeight: "bold",
//               fontSize: 16,
//               ml: { xs: 0, md: 4.7 },
//             }}
//           >
//             ALTIV.AI
//           </Avatar>
//           <Box>
//             <Typography variant="h5" fontWeight="bold">
//               Personalized AI-Readiness Analysis
//             </Typography>
//             <Typography variant="subtitle2" sx={{ color: "#00FD8D" }}>
//               {data?.userName ?? "N/A"}
//             </Typography>
//             <Typography variant="caption" sx={{ color: "#d1e9ff" }}>
//               Report ID: {data?.reportId ?? "N/A"} &nbsp; | &nbsp; Generated:{" "}
//               {data?.generatedDate ?? "N/A"}
//             </Typography>
//           </Box>
//         </Box>

//         {/* Right Section - Export PDF */}
//         <Button
//           variant="outlined"
//           startIcon={<PictureAsPdfIcon />}
//           sx={{
//             bgcolor: "rgba(255,255,255,0.1)",
//             color: "white",
//             borderColor: "white",
//             mr: { xs: 0, md: 4.7 },
//             "&:hover": {
//               bgcolor: "rgba(255,255,255,0.2)",
//               borderColor: "white",
//             },
//           }}
//           onClick={onExportPDF}
//         >
//           Export PDF
//         </Button>
//       </Box>

//       {/* Metrics Cards */}
//       <Container maxWidth="lg">
//         <Grid container spacing={2} justifyContent="center">
//           {metrics.map((metric, index) => (
//             <Grid
//               item
//               key={index}
//               xs={12}
//               sm={6}
//               md={3}
//               sx={{ maxWidth: 270, display: "flex", justifyContent: "center" }}
//             >
//               <MotionPaper
//                 elevation={3}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 whileHover={{
//                   scale: 1.04,
//                   boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
//                 }}
//                 sx={{
//                   borderRadius: 3,
//                   cursor: "pointer",
//                   background: "white",
//                   borderTop: `4px solid ${metric.color}`,
//                   minHeight: 180,
//                   width: "100%",
//                   maxWidth: 270,
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   p: 2,
//                 }}
//               >
//                 {/* Icon */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     width: 60,
//                     height: 56,
//                     borderRadius: "50%",
//                     bgcolor: `${metric.color}1A`,
//                     mr: 1,
//                   }}
//                 >
//                   {metric.icon}
//                 </Box>

//                 {/* Text */}
//                 <Box sx={{ display: "flex", flexDirection: "column" }}>
//                   <Typography
//                     variant="subtitle1"
//                     fontWeight="600"
//                     sx={{
//                       textAlign: "left",
//                       wordBreak: "break-word",
//                       color: "text.secondary",
//                     }}
//                   >
//                     {metric.title}
//                   </Typography>

//                   <Typography
//                     variant="h3"
//                     fontWeight="bold"
//                     sx={{ textAlign: "left" }}
//                     color="primary.main"
//                   >
//                     <AnimatedNumber value={metric.value} suffix={metric.suffix} />
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ textAlign: "left" }}
//                   >
//                     {metric.subtitle}
//                   </Typography>
//                 </Box>
//               </MotionPaper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// AIReadinessDashboard.propTypes = {
//   data: PropTypes.object,
//   onExportPDF: PropTypes.func,
// };


import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Avatar,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BoltIcon from "@mui/icons-material/Bolt";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { m, animate, useMotionValue, useTransform } from "framer-motion";
import PropTypes from "prop-types";

// Motion wrapper for Paper
const MotionPaper = m(Paper);

// ✅ Animated number counter
function AnimatedNumber({ value, suffix }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.floor(latest));
  const displayedValue = useTransform(rounded, (val) => `${val}${suffix}`);

  useEffect(() => {
    motionValue.set(0);
    const controls = animate(motionValue, value, {
      duration: 2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, motionValue]);

  return <m.span style={{ display: "inline-block" }}>{displayedValue}</m.span>;
}

AnimatedNumber.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
};
AnimatedNumber.defaultProps = { suffix: "" };

// ✅ Main component
function AIReadinessDashboard({ data, onExportPDF  }) 
{

  const Aireadline= data?.data;
  console.log("AIReadiness data:", Aireadline);
  const [showAllSections, setShowAllSections] = useState(false);
  const pdfRef = useRef(null);

  // ✅ Memoized metrics
const metrics = React.useMemo(
  () => [
    {
      title: "AI-Readiness Score",
      value: Aireadline?.AI_Readiness_Score ?? 0,
      suffix: "%",
      subtitle: Aireadline?.aiReadinessRating ?? "Above Average",
      color: "#3b82f6",
      icon: <TrackChangesIcon sx={{ fontSize: 28, color: "#3b82f6" }} />,
    },
    {
      title: "Transformation Timeline",
      value: Aireadline?.Augmented_Score ?? 0,
      suffix: " ",
      subtitle: "Months",
      color: "#f59e0b",
      icon: <BoltIcon sx={{ fontSize: 28, color: "#f59e0b" }} />,
    },
    {
      title: "Automation Potential",
      value: Aireadline?.Automated_Score ?? 0,
      suffix: "%",
      subtitle: data?.automationImpact ?? "High Impact",
      color: "#ec4899",
      icon: <RocketLaunchIcon sx={{ fontSize: 28, color: "#ec4899" }} />,
    },
    {
      title: "Strategic Objectives",
      value: Aireadline?.strategicObjectives ?? 0,
      suffix: "",
      subtitle: "Key Goals",
      color: "#facc15",
      icon: <EmojiObjectsIcon sx={{ fontSize: 28, color: "#facc15" }} />,
    },
  ],
  [Aireadline, data?.automationImpact]
);

  return (
    <Box
      sx={{
        bgcolor: "#f4f7fb",
        minHeight: "370px",
        my: 2,
        mx: "auto",
        maxWidth: { xs: "100%", md: "1330px", lg: "1350px" },
      }}
    >
      {/* Header */}
      <Box
        alignItems={{ xs: "left", md: "center" }}
        sx={{
          bgcolor: "#2563eb",
          color: "white",
          px: { xs: 3, md: 8 },
          py: 3,
          display: "flex",
          mx: "auto",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          mb: 4,
          gap: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              bgcolor: "white",
              width: 90,
              height: 40,
              borderRadius: "8px",
              color: "primary.main",
              fontWeight: "bold",
              fontSize: 16,
              ml: { xs: 0, md: 4.7 },
            }}
          >
            ALTIV.AI
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Personalized AI-Readiness Analysis
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#00FD8D" }}>
              {Aireadline?.json_schema_data?.executive_summary?.profile?.name ?? "N/A"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#d1e9ff" }}>
              Report ID: {data?.reportId ?? "N/A"} &nbsp; | &nbsp; Generated:{" "}
              {data?.generatedDate ?? "N/A"}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          sx={{
            bgcolor: "rgba(255,255,255,0.1)",
            color: "white",
            borderColor: "white",
            mr: { xs: 0, md: 4.7 },
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
              borderColor: "white",
            },
          }}
          onClick={onExportPDF}
        >
          Export Full PDF
        </Button>
      </Box>

      {/* Metrics Cards */}
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          {metrics.map((metric, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={3}
              sx={{ maxWidth: 270, display: "flex", justifyContent: "center" }}
            >
              <MotionPaper
                elevation={3}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
                }}
                sx={{
                  borderRadius: 3,
                  cursor: "pointer",
                  background: "white",
                  borderTop: `4px solid ${metric.color}`,
                  minHeight: 180,
                  width: "100%",
                  maxWidth: 270,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 60,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: `${metric.color}1A`,
                    mr: 1,
                  }}
                >
                  {metric.icon}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    sx={{
                      textAlign: "left",
                      wordBreak: "break-word",
                      color: "text.secondary",
                    }}
                  >
                    {metric.title}
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ textAlign: "left" }}
                    color="primary.main"
                  >
                    <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "left" }}
                  >
                    {metric.subtitle}
                  </Typography>
                </Box>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Hidden PDF container */}
      {showAllSections && (
        <Box
          ref={pdfRef}
          sx={{
            position: "absolute",
            top: 0,
            left: "-9999px",
            width: "1200px",
            background: "white",
          }}
        >
          {/* Add your report components here */}
        </Box>
      )}
    </Box>
  );
}

// ✅ Memoized export
export default React.memo(AIReadinessDashboard, (prev, next) =>
  JSON.stringify(prev.data) === JSON.stringify(next.data)
);

AIReadinessDashboard.propTypes = {
  data: PropTypes.object,
    onExportPDF: PropTypes.func, // optional callback

};
