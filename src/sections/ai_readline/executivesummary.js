// import React from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Button,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PropTypes from "prop-types";

// export default function ExecutiveSummary({ data }) {
//   // ✅ Safely access executive summary from API response
//   const summaryData = data?.data?.json_schema_data?.executive_summary;
//   console.log("dddd", summaryData)  

//   if (!summaryData) return null;

//   const { profile, key_achievements, summary } = summaryData;

//   return (
//     <Box sx={{ pageBreakAfter: "always", p: { xs: 2, md: 4 }, backgroundColor: "#fafafa" }}>
//       {/* Header */}
//       <Box  
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           flexDirection: "row",
//           alignItems: "center",
//           borderBottom: (t) => `2px solid ${t.palette.grey[300]}`,
//           mb: 2,
//           py: 1,
//         }}
//       >
//         <Typography variant="h6" sx={{ fontWeight: 600, color: "#3f51b5" }}>
//           Executive Summary
//         </Typography>

//         <Button
//           variant="contained"
//           color="info"
//           sx={{ textTransform: "none", borderRadius: 2 }}
//         >
//           Share
//         </Button>
//       </Box>

//       <Grid container spacing={2}>
//         {/* Left Section – Profile Info */}
//         <Grid item xs={12} md={6}>
//           <Paper
//             sx={{
//               p: 2,
//               backgroundColor: "#1a2238",
//               color: "white",
//               borderRadius: 2,
//             }}
//           >
//             <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
//               Professional Profile
//             </Typography>
//             <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />
//             <Typography sx={{ fontSize: 14, mt: 1 }}>
//               <strong>Name:</strong> {profile?.name || "N/A"}
//             </Typography>
//             <Typography sx={{ fontSize: 14, mt: 1 }}>
//               <strong>Title:</strong> {profile?.title || "N/A"}
//             </Typography>
//             <Typography sx={{ fontSize: 14, mt: 1 }}>
//               <strong>Company:</strong> {profile?.company || "N/A"}
//             </Typography>
//             <Typography sx={{ fontSize: 14, mt: 1 }}>
//               <strong>Qualifications:</strong>{" "}
//               {profile?.qualifications || "N/A"}
//             </Typography>
//           </Paper>
//         </Grid>

//         {/* Right Section – Achievements */}
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2, borderRadius: 2 }}>
//             <Typography variant="subtitle1" fontWeight={600}>
//               Key Achievements
//             </Typography>
//             <List dense>
//               {Array.isArray(key_achievements) &&
//                 key_achievements.map((item, index) => (
//                   <ListItem key={index}>
//                     <ListItemIcon>
//                       <CheckCircleIcon color="success" />
//                     </ListItemIcon>
//                     <ListItemText primary={item} />
//                   </ListItem>
//                 ))}
//             </List>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Summary Section */}
//       <Paper
//         sx={{
//           mt: 2,
//           p: 2,
//           borderRadius: 2,
//           backgroundColor: "#e8f5e9",
//         }}
//       >
//         <Typography variant="body2">{summary}</Typography>
//       </Paper>
//     </Box>
//   );
// }
// // ✅ Add PropTypes validation
// ExecutiveSummary.propTypes = {
//   data: PropTypes.shape({
//     data: PropTypes.shape({
//       json_schema_data: PropTypes.shape({
//         executive_summary: PropTypes.shape({
//           profile: PropTypes.shape({
//             name: PropTypes.string,
//             title: PropTypes.string,
//             company: PropTypes.string,
//             qualifications: PropTypes.string,
//           }),
//           key_achievements: PropTypes.arrayOf(PropTypes.string),
//           summary: PropTypes.string,
//         }),
//       }),
//     }),
//   }),
// };

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Button,
//   Modal,
//   Card,
//   CardContent,
//   CircularProgress,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import LockIcon from "@mui/icons-material/Lock";
// import PropTypes from "prop-types";
// import { useAuthContext } from "src/auth/hooks";
// import axiosInstance from "src/utils/axios"; // ✅ use your configured axios instance

// export default function ExecutiveSummary({ data }) {
//   const { user } = useAuthContext();
//   const isProUser = user?.isPro || false;

//   // modal + plans state
//   const [open, setOpen] = useState(false);
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleOpen = async () => {
//     setOpen(true);
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/plans");
//       setPlans(response.data?.data || []);
//     } catch (error) {
//       console.error("Error fetching plans:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => setOpen(false);

//   const summaryData = data?.data?.json_schema_data?.executive_summary;
//   if (!summaryData) return null;

//   const { profile, key_achievements, summary } = summaryData;

//   return (
//     <Box
//       sx={{
//         p: { xs: 2, md: 4 },
//         backgroundColor: "#fafafa",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Locked overlay for non-Pro users */}
//       {!isProUser && (
//         <Box
//           sx={{
//             position: "absolute",
//             inset: 0,
//             backdropFilter: "blur(8px)",
//             backgroundColor: "rgba(255,255,255,0.7)",
//             zIndex: 10,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center",
//             px: 2,
//           }}
//         >
          

//           <LockIcon sx={{ fontSize: 60, color: "#1565c0", mb: 2 }} />
//           <Typography variant="h6" fontWeight={600}>
//             Executive Summary Locked
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
//             This section contains premium insights. Upgrade to view.
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ borderRadius: 2, px: 3, textTransform: "none", fontWeight: 600 }}
//             onClick={handleOpen}
//           >
//          Unlock to View
//           </Button>
//         </Box>
//       )}

//       {/* Actual content (blurred if locked) */}
//       <Box
//         sx={{
//           filter: !isProUser ? "blur(4px)" : "none",
//           pointerEvents: !isProUser ? "none" : "auto",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             borderBottom: (t) => `2px solid ${t.palette.grey[300]}`,
//             mb: 2,
//             py: 1,
//           }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: 600, color: "#3f51b5" }}>
//             Executive Summary
//           </Typography>
//           <Button variant="contained" color="info" sx={{ textTransform: "none", borderRadius: 2 }}>
//             Share
//           </Button>
//         </Box>

//         <Grid container spacing={2}>
//           {/* Profile Info */}
//           <Grid item xs={12} md={6}>
//             <Paper sx={{ p: 2, backgroundColor: "#1a2238", color: "white", borderRadius: 2 }}>
//               <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
//                 Professional Profile
//               </Typography>
//               <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />
//               <Typography sx={{ fontSize: 14, mt: 1 }}>
//                 <strong>Name:</strong> {profile?.name || "N/A"}
//               </Typography>
//               <Typography sx={{ fontSize: 14, mt: 1 }}>
//                 <strong>Title:</strong> {profile?.title || "N/A"}
//               </Typography>
//               <Typography sx={{ fontSize: 14, mt: 1 }}>
//                 <strong>Company:</strong> {profile?.company || "N/A"}
//               </Typography>
//               <Typography sx={{ fontSize: 14, mt: 1 }}>
//                 <strong>Qualifications:</strong> {profile?.qualifications || "N/A"}
//               </Typography>
//             </Paper>
//           </Grid>

//           {/* Key Achievements */}
//           <Grid item xs={12} md={6}>
//             <Paper sx={{ p: 2, borderRadius: 2 }}>
//               <Typography variant="subtitle1" fontWeight={600}>
//                 Key Achievements
//               </Typography>
//               <List dense>
//                 {Array.isArray(key_achievements) &&
//                   key_achievements.map((item, index) => (
//                     <ListItem key={index}>
//                       <ListItemIcon>
//                         <CheckCircleIcon color="success" />
//                       </ListItemIcon>
//                       <ListItemText primary={item} />
//                     </ListItem>
//                   ))}
//               </List>
//             </Paper>
//           </Grid>
//         </Grid>

//         {/* Summary */}
//         <Paper sx={{ mt: 2, p: 2, borderRadius: 2, backgroundColor: "#e8f5e9" }}>
//           <Typography variant="body2">{summary}</Typography>
//         </Paper>
//       </Box>

//       {/* ✅ Modal to show plans */}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", md: "70%" },
//             maxHeight: "80vh",  
//             overflowY: "auto",
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             borderRadius: 2,
//             p: 3,
//           }}
//         >
//           <Typography variant="h6" fontWeight={600} textAlign="center" mb={2}>
//             Available Plans
//           </Typography>

//           {loading ? (
//             <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <Grid container spacing={2}>
//               {plans.map((plan) => (
//                 <Grid item xs={12} md={4} key={plan.id}>
//                   <Card sx={{ borderRadius: 2, boxShadow: 3, p: 1 }}>
//                     <CardContent>
//                       <Typography variant="h6" fontWeight={600} color="primary">
//                         {plan.plan_name}
//                       </Typography>
//                       <Typography variant="h5" fontWeight={700} mt={1}>
//                         ₹{plan.price}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" mt={1}>
//                         {plan.description || "No description available"}
//                       </Typography>
//                       <Divider sx={{ my: 2 }} />
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         sx={{ borderRadius: 2, textTransform: "none" }}
//                         onClick={() => alert(`Proceeding to purchase: ${plan.plan_name}`)}
//                       >
//                         Choose Plan
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// ExecutiveSummary.propTypes = {
//   data: PropTypes.shape({
//     data: PropTypes.shape({
//       json_schema_data: PropTypes.shape({
//         executive_summary: PropTypes.shape({
//           profile: PropTypes.shape({
//             name: PropTypes.string,
//             title: PropTypes.string,
//             company: PropTypes.string,
//             qualifications: PropTypes.string,
//           }),
//           key_achievements: PropTypes.arrayOf(PropTypes.string),
//           summary: PropTypes.string,
//         }),
//       }),
//     }),
//   }),
// };

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import PropTypes from "prop-types";
import { useAuthContext } from "src/auth/hooks";
import PlansModal from "./PlansModal";

export default function ExecutiveSummary({ data }) {

  const { user } = useAuthContext();
  const [openPlans, setOpenPlans] = useState(false);
  const [serviceUnlocked, setServiceUnlocked] = useState(false);

  const handleOpenPlans = () => setOpenPlans(true);
  const handleClosePlans = () => setOpenPlans(false);

  // ✅ Unlock content if fobo-pro was purchased
  useEffect(() => {
    const paidServices = JSON.parse(sessionStorage.getItem("paidServices") || "[]");
    if (paidServices.includes("fobo-pro")) {
      setServiceUnlocked(true);
      sessionStorage.removeItem("paidServices"); // optional
    }
  }, []);

  const summaryData = data?.data?.json_schema_data?.executive_summary;
  if (!summaryData) return null;

  const { profile, key_achievements, summary } = summaryData;

  // 🔑 Visible if user is Pro OR purchased service
  const isContentVisible = user?.isPro || serviceUnlocked;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#fafafa", position: "relative", overflow: "hidden" }}>
      {!isContentVisible && (
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
          <Typography variant="h6" fontWeight={600}>Executive Summary Locked</Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            This section contains premium insights. Upgrade to view.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2, px: 3, textTransform: "none", fontWeight: 600 }}
            onClick={handleOpenPlans}
          >
            Unlock to View
          </Button>
        </Box>
      )}

      <Box sx={{ filter: !isContentVisible ? "blur(4px)" : "none", pointerEvents: !isContentVisible ? "none" : "auto" }}>
        {/* Content */}
        <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: (t) => `2px solid ${t.palette.grey[300]}`, mb: 2, py: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#3f51b5" }}>Executive Summary</Typography>
          <Button variant="contained" color="info" sx={{ textTransform: "none", borderRadius: 2 }}>Share</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, backgroundColor: "#1a2238", color: "white", borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Professional Profile</Typography>
              <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />
              <Typography sx={{ fontSize: 14, mt: 1 }}><strong>Name:</strong> {profile?.name || "N/A"}</Typography>
              <Typography sx={{ fontSize: 14, mt: 1 }}><strong>Title:</strong> {profile?.title || "N/A"}</Typography>
              <Typography sx={{ fontSize: 14, mt: 1 }}><strong>Company:</strong> {profile?.company || "N/A"}</Typography>
              <Typography sx={{ fontSize: 14, mt: 1 }}><strong>Qualifications:</strong> {profile?.qualifications || "N/A"}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>Key Achievements</Typography>
              <List dense>
                {Array.isArray(key_achievements) && key_achievements.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ mt: 2, p: 2, borderRadius: 2, backgroundColor: "#e8f5e9" }}>
          <Typography variant="body2">{summary}</Typography>
        </Paper>
      </Box>

      <PlansModal open={openPlans} onClose={handleClosePlans} />
    </Box>
  );
}

ExecutiveSummary.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        executive_summary: PropTypes.shape({
          profile: PropTypes.shape({
            name: PropTypes.string,
            title: PropTypes.string,
            company: PropTypes.string,
            qualifications: PropTypes.string,
          }),
          key_achievements: PropTypes.arrayOf(PropTypes.string),
          summary: PropTypes.string,
        }),
      }),
    }),
  }),
};
