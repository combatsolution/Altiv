
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
//   const skillErosionData = data?.data?.json_schema_data?.skill_erosion_analysis || [];

//   // Pick first skill as default chart data (can later add skill selector)
//   const selectedSkill = skillErosionData[0];

//   // Prepare data for chart dynamically
//   const chartData = useMemo(() => {
//     if (!selectedSkill) return [];
//     return selectedSkill.baseline_retention.map((b, index) => ({
//       month: `${(b.year * 12)}M`,
//       baseline: b.retention_percentage,
//       upskill: selectedSkill.ai_augmented_retention[index]?.retention_percentage,
//     }));
//   }, [selectedSkill]);

//   // Core Skills list (from API)
//   const coreSkills = skillErosionData.map((s) => s.skill_name);

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
//               Skill Relevance Projection Over 48 Months
//             </Typography>

//             {selectedSkill ? (
//               <ResponsiveContainer width="100%" height={350}>
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis domain={[30, 150]} />
//                   <Tooltip
//                     formatter={(value, name) =>
//                       `${value.toFixed(1)}% (${name === "baseline"
//                         ? "Baseline Scenario (No Upskilling)"
//                         : "Upskilling Scenario"
//                       })`
//                     }
//                   />
//                   <Legend
//                     verticalAlign="top"
//                     align="center"
//                     iconType="circle"
//                     wrapperStyle={{
//                       paddingBottom: 10,
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="baseline"
//                     stroke="#b23c17"
//                     strokeWidth={3}
//                     dot={{ r: 4 }}
//                     name="Baseline Scenario (No Upskilling)"
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="upskill"
//                     stroke="#00bcd4"
//                     strokeWidth={3}
//                     dot={{ r: 4 }}
//                     name="Upskilling Scenario"
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <Typography
//                 variant="body2" 
//                 textAlign="center"
//                 color="text.secondary"
//               >
//                 No skill erosion data available.
//               </Typography>
//             )}
//           </Paper>
//         </Grid>

//         {/* Skills List Section */}
//         <Grid item xs={12} md={4}>
//           <Paper
//             sx={{
//               p: 3,
//                height: "auto", // ✅ expands based on content
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
//               Core Skills Analyzed:
//             </Typography>
//             <List>
//               {coreSkills.map((skill, i) => (
//                 <ListItem key={i} disablePadding divider sx={{ my: 2, py: 0.5 }}>
//                   <ListItemIcon>
//                     <Icon icon="mdi:circle" width="10" color="green" />
//                   </ListItemIcon>
//                   <ListItemText primary={skill} />
//                 </ListItem>
//               ))}
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
//         skill_erosion_analysis: PropTypes.arrayOf(
//           PropTypes.shape({
//             skill_name: PropTypes.string,
//             current_score: PropTypes.number,
//             projected_score: PropTypes.number,
//           })
//         ),
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
  // ✅ Step 1: Extract raw data
  const rawErosionData = data?.data?.json_schema_data?.skill_erosion_analysis;

  // ✅ Step 2: Safely parse and validate it
  const skillErosionData = useMemo(() => {
    if (!rawErosionData) return [];

    // If backend sent JSON as string
    if (typeof rawErosionData === "string") {
      try {
        const parsed = JSON.parse(rawErosionData);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("❌ Error parsing skill_erosion_analysis:", error);
        return [];
      }
    }

    // If already an array
    if (Array.isArray(rawErosionData)) return rawErosionData;

    console.warn("⚠️ skill_erosion_analysis is not an array:", rawErosionData);
    return [];
  }, [rawErosionData]);

  // ✅ Step 3: Proceed safely
  const selectedSkill = skillErosionData[0];

  const chartData = useMemo(() => {
    if (!selectedSkill) return [];
    return selectedSkill.baseline_retention.map((b, index) => ({
      month: `${b.year * 12}M`,
      baseline: b.retention_percentage,
      upskill:
        selectedSkill.ai_augmented_retention[index]?.retention_percentage,
    }));
  }, [selectedSkill]);

  // ✅ Step 4: This now runs safely
  const coreSkills = skillErosionData.map((s) => s.skill_name);


  return (
    <Box sx={{ position: "relative" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                textAlign="center"
                fontWeight={500}
                mb={2}
              >
                Skill Relevance Projection Over 48 Months
              </Typography>

              {selectedSkill ? (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[30, 150]} />
                    <Tooltip
                      formatter={(value, name) =>
                        `${value.toFixed(1)}% (${
                          name === "baseline"
                            ? "Baseline Scenario (No Upskilling)"
                            : "Upskilling Scenario"
                        })`
                      }
                    />
                    <Legend
                      verticalAlign="top"
                      align="center"
                      iconType="circle"
                      wrapperStyle={{
                        paddingBottom: 10,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="baseline"
                      stroke="#b23c17"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      name="Baseline Scenario (No Upskilling)"
                    />
                    <Line
                      type="monotone"
                      dataKey="upskill"
                      stroke="#00bcd4"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      name="Upskilling Scenario"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <Typography
                  variant="body2"
                  textAlign="center"
                  color="text.secondary"
                >
                  No skill erosion data available.
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
              }}
            >
              <Typography
                variant="h6"
                fontWeight={500}
                color="primary"
                gutterBottom
              >
                Core Skills Analyzed:
              </Typography>
              <List>
                {coreSkills.map((skill, i) => (
                  <ListItem key={i} disablePadding divider sx={{ my: 2, py: 0.5 }}>
                    <ListItemIcon>
                      <Icon icon="mdi:circle" width="10" color="green" />
                    </ListItemIcon>
                    <ListItemText primary={skill} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* 🔒 Blue Blur Overlay (Lock for Non-Pro Users) */}
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
            Skill Relevance Projection Locked
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 2, color: "text.secondary", maxWidth: 400 }}
          >
            Upgrade to access full Skill Relevance Projection Roadmap
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
            onClick={() => window.open("/pricing", "_blank")}
          >
            Upgrade Now
          </Button>
        </Box>
      )}
    </Box>
  );
}

SkillErosionProjection.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        skill_erosion_analysis: PropTypes.arrayOf(
          PropTypes.shape({
            skill_name: PropTypes.string,
            current_score: PropTypes.number,
            projected_score: PropTypes.number,
          })
        ),
      }),
    }),
  }),
  isProUser: PropTypes.bool,
};

