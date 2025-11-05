// import React, { useMemo } from "react";
// import PropTypes from "prop-types";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Button,
//   Divider,
// } from "@mui/material";
// import { Icon } from "@iconify/react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// export default function SkillErosionProjection({ data }) {
//   // ✅ Extract correct data paths
// // ✅ Memoize erosionData so ESLint is happy
// const erosionData = useMemo(
//   () => data?.data?.json_schema_data?.skill_erosion_analysis || {},
//   [data]
// );

// const coreSkills = erosionData.critical_skills_analyzed || [];

// // ✅ Prepare chart data from overall retention
// const chartData = useMemo(() => { 
//   const overall = erosionData.overall || {};
//   if (!overall?.baseline_retention || !overall?.ai_augmented_retention)
//     return [];

//   return overall.baseline_retention.map((b, index) => ({
//     month: `${b.year * 12}M`,
//     baseline: b.retention_percentage,
//     upskill: overall.ai_augmented_retention[index]?.retention_percentage,
//   }));
// }, [erosionData]);

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" mb={3}>
//         <Typography variant="h5" fontWeight="bold" color="primary">
//           Skill Erosion Projection
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Icon icon="ic:sharp-share" width="20" height="20" color="#fff" />}
//         >
//           Share
//         </Button>
//       </Box>

//       <Divider sx={{ mb: 2 }} />

//       <Grid container spacing={3}>
//         {/* Chart Section */}
//         <Grid item xs={12} md={8}>
//           <Paper
//             sx={{
//               p: 3,
//               height: "100%",
//               borderRadius: 2,
//               border: "1px solid rgba(0,0,0,0.1)",
//               bgcolor: "background.paper",
//             }}
//           >
//             <Typography
//               variant="h6"
//               color="primary"
//               textAlign="center"
//               fontWeight={500}
//               mb={2}
//             >
//               Overall Skill Relevance Projection (48 Months)
//             </Typography>

//             {chartData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={350}>
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis domain={[30, 100]} />
//                   <Tooltip
//                     formatter={(value, name) =>
//                       `${value.toFixed(1)}% ${
//                         name === "baseline"
//                           ? "(Baseline Scenario)"
//                           : "(AI-Augmented Scenario)"
//                       }`
//                     }
//                   />
//                   <Legend
//                     verticalAlign="top"
//                     align="center"
//                     iconType="circle"
//                     wrapperStyle={{ paddingBottom: 10 }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="baseline"
//                     stroke="#b23c17"
//                     strokeWidth={3}
//                     dot={{ r: 4 }}
//                     name="Baseline Scenario"
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="upskill"
//                     stroke="#00bcd4"
//                     strokeWidth={3}
//                     dot={{ r: 4 }}
//                     name="AI-Augmented Scenario"
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <Typography
//                 variant="body2"
//                 textAlign="center"
//                 color="text.secondary"
//               >
//                 No skill retention data available.
//               </Typography>
//             )}
//           </Paper>
//         </Grid>

//         {/* Skills List Section */}
//         <Grid item xs={12} md={4}>
//           <Paper
//             sx={{
//               p: 3,
//               height: "auto",
//               width: "100%",
//               bgcolor: "#fff",
//               border: "1px solid rgba(0,0,0,0.1)",
//               borderRadius: 2,
//             }}
//           >
//             <Typography
//               variant="h6"
//               fontWeight={500}
//               color="primary"
//               gutterBottom
//             >
//               Critical Skills Analyzed:
//             </Typography>
//             <List>
//               {coreSkills.length > 0 ? (
//                 coreSkills.map((skill, i) => (
//                   <ListItem key={i} disablePadding divider sx={{ my: 1, py: 0.5 }}>
//                     <ListItemIcon>
//                       <Icon icon="mdi:circle" width="10" color="green" />
//                     </ListItemIcon>
//                     <ListItemText primary={skill} />
//                   </ListItem>
//                 ))
//               ) : (
//                 <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                   No critical skills available.
//                 </Typography>
//               )}
//             </List>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// SkillErosionProjection.propTypes = {
//   data: PropTypes.shape({
//     data: PropTypes.shape({
//       json_schema_data: PropTypes.shape({
//         skill_erosion_analysis: PropTypes.shape({
//           overall: PropTypes.object,
//           critical_skills_analyzed: PropTypes.array,
//         }),
//       }),
//     }),
//   }),
// };

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import LockIcon from "@mui/icons-material/Lock";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function SkillErosionProjection({ data, isProUser = false }) {
  // ✅ Memoize erosionData to avoid ESLint warnings
  const erosionData = useMemo(
    () => data?.data?.json_schema_data?.skill_erosion_analysis || {},
    [data]
  );

  const coreSkills = erosionData.critical_skills_analyzed || [];

  // ✅ Prepare chart data
  const chartData = useMemo(() => {
    const overall = erosionData.overall || {};
    if (!overall?.baseline_retention || !overall?.ai_augmented_retention)
      return [];

    return overall.baseline_retention.map((b, index) => ({
      month: `${b.year * 12}M`,
      baseline: b.retention_percentage,
      upskill: overall.ai_augmented_retention[index]?.retention_percentage,
    }));
  }, [erosionData]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: "relative" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Skill Erosion Projection
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={
            <Icon icon="ic:sharp-share" width="20" height="20" color="#fff" />
          }
        >
          Share
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={3}>
        {/* Chart Section */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              borderRadius: 2,
              border: "1px solid rgba(0,0,0,0.1)",
              bgcolor: "background.paper",
              position: "relative",
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              textAlign="center"
              fontWeight={500}
              mb={2}
            >
              Overall Skill Relevance Projection (48 Months)
            </Typography>

            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[30, 100]} />
                  <Tooltip
                    formatter={(value, name) =>
                      `${value.toFixed(1)}% ${
                        name === "baseline"
                          ? "(Baseline Scenario)"
                          : "(AI-Augmented Scenario)"
                      }`
                    }
                  />
                  <Legend
                    verticalAlign="top"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: 10 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="baseline"
                    stroke="#b23c17"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Baseline Scenario"
                  />
                  <Line
                    type="monotone"
                    dataKey="upskill"
                    stroke="#00bcd4"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="AI-Augmented Scenario"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Typography
                variant="body2"
                textAlign="center"
                color="text.secondary"
              >
                No skill retention data available.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Skills List Section */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: "auto",
              width: "100%",
              bgcolor: "#fff",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={500}
              color="primary"
              gutterBottom
            >
              Critical Skills Analyzed:
            </Typography>
            <List>
              {coreSkills.length > 0 ? (
                coreSkills.map((skill, i) => (
                  <ListItem
                    key={i}
                    disablePadding
                    divider
                    sx={{ my: 1, py: 0.5 }}
                  >
                    <ListItemIcon>
                      <Icon icon="mdi:circle" width="10" color="green" />
                    </ListItemIcon>
                    <ListItemText primary={skill} />
                  </ListItem>
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  No critical skills available.
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* 🔒 Blue Blur Overlay Lock Effect */}
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
            Skill Erosion Projection is Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Upgrade to access Skill Erosion Projection Section
          </Typography>
          
        </Box>
      )}
    </Container>
  );
}

SkillErosionProjection.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        skill_erosion_analysis: PropTypes.shape({
          overall: PropTypes.object,
          critical_skills_analyzed: PropTypes.array,
        }),
      }),
    }),
  }),
  isProUser: PropTypes.bool,
};
