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
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import LockIcon from "@mui/icons-material/Lock";
// import PropTypes from "prop-types";
// import { useAuthContext } from "src/auth/hooks";
// import axiosInstance from "src/utils/axios";
// import PlansModal from "./PlansModal";

// export default function ExecutiveSummary({ data }) {
//   const { user } = useAuthContext();
//   const [openPlans, setOpenPlans] = useState(false);
//   const [serviceUnlocked, setServiceUnlocked] = useState(false);

//   const handleOpenPlans = () => setOpenPlans(true);
//   const handleClosePlans = () => setOpenPlans(false);

//   // ✅ Check if user already purchased 'fobo-pro'
//   useEffect(() => {
//     const checkServiceSubscription = async () => {
//       if (!user?.id) return;

//       try {
//         // Fetch all plans (services)
//         const filter = {
//           where: { planGroup: 1 },
//           include: [{ relation: "services" }],
//         };
//         const filterString = encodeURIComponent(JSON.stringify(filter));
//         const plansRes = await axiosInstance.get(`/plans?filter=${filterString}`);
//         const plans = plansRes.data || [];

//         // Check if any plan includes 'fobo-pro'
//         const foboPlan = plans.find((p) =>
//           p.services?.page?.includes("fobo-pro")
//         );

//         if (!foboPlan) return;

//         // Check subscription for current user for that plan
//         const subRes = await axiosInstance.get(
//           `/subscriptions/service-subscriptions-by-user/fobo-pro`
//         );

//         if (subRes.data?.success && subRes.data?.subscriptionId) {
//           setServiceUnlocked(true);
//           // ✅ Optionally save in sessionStorage for page refresh persistence
//           sessionStorage.setItem("paidServices", JSON.stringify(["fobo-pro"]));
//         }
//       } catch (err) {
//         console.error("Error checking service subscription:", err);
//       }
//     };

//     checkServiceSubscription();
//   }, [user]);

//   const summaryData = data?.data?.json_schema_data?.executive_summary || {};
//   const { profile, key_achievements, summary } = summaryData;

//   const isContentVisible = user?.isPro || serviceUnlocked;

//   return (
//     <Box
//       sx={{
//         p: { xs: 2, md: 4 },
//         backgroundColor: "#fafafa",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {!isContentVisible && (
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
//             Unlock premium insights with a Pro plan.
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ borderRadius: 2, px: 3, textTransform: "none", fontWeight: 600 }}
//             onClick={handleOpenPlans}
//           >
//             Unlock Now
//           </Button>
//         </Box>
//       )}

//       <Box
//         sx={{
//           filter: !isContentVisible ? "blur(8px)" : "none",
//           pointerEvents: !isContentVisible ? "none" : "auto",
//         }}
//       >
//         {/* Main content rendering same as before */}
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

//         <Paper sx={{ mt: 2, p: 2, borderRadius: 2, backgroundColor: "#e8f5e9" }}>
//           <Typography variant="body2">{summary}</Typography>
//         </Paper>
//       </Box>

//       <PlansModal open={openPlans} onClose={handleClosePlans} />
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




// // ExecutiveSummary.jsx
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
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import LockIcon from "@mui/icons-material/Lock";
// import PropTypes from "prop-types";
// import { useAuthContext } from "src/auth/hooks";
// import axiosInstance from "src/utils/axios";
// import PlansModal from "./PlansModal";

// export default function ExecutiveSummary({ data, forceShow = false }) {
//   const { user } = useAuthContext();
//   const [openPlans, setOpenPlans] = useState(false);
//   const [serviceUnlocked, setServiceUnlocked] = useState(false);
//   const [checked, setChecked] = useState(false);

//   const handleOpenPlans = () => setOpenPlans(true);
//   const handleClosePlans = () => setOpenPlans(false);

//   useEffect(() => {
//     const checkAccess = async () => {
//       // If forced show (for export PDF), skip checks
//       if (forceShow) {
//         setServiceUnlocked(true);
//         setChecked(true);
//         return;
//       }

//       // Not logged in → can’t access
//       if (!user?.id) {
//         setChecked(true);
//         return;
//       }

//       // ✅ Check API for purchase
//       try {
//         const res = await axiosInstance.get(
//           `/subscriptions/service-subscriptions-by-user/fobo-pro`
//         );

//         // success = true → user purchased service
//         if (res.data?.success) {
//           setServiceUnlocked(true);
//           sessionStorage.setItem(
//             "paidServices",
//             JSON.stringify(["fobo-pro"])
//           );
//         } else {
//           setServiceUnlocked(false);
//         }
//       } catch (err) {
//         console.error("Error checking subscription:", err);
//         setServiceUnlocked(false);
//       } finally {
//         setChecked(true);
//       }
//     };

//     checkAccess();
//   }, [user, forceShow]);

//   if (!checked) {
//     return (
//       <Box sx={{ p: 4, textAlign: "center" }}>
//         <Typography variant="body2" color="text.secondary">
//           Checking access...
//         </Typography>
//       </Box>
//     );
//   }

//   const summaryData = data?.data?.json_schema_data?.executive_summary || {};
//   const { profile, key_achievements, summary } = summaryData;

//   // ✅ Allow access if user is Pro or purchased fobo-pro
//   const isContentVisible =
//     forceShow || user?.planType === "pro" || serviceUnlocked;

//   return (
//     <Box
//       sx={{
//     top: !isContentVisible ? "-100px" : "0px", // ✅ dynamic top based on purchase
//         p: { xs: 2, md: 4 },
       
//         backgroundColor: "rgba(255,255,255,0.8)",
//         position: "relative",
//         overflow: "hidden",
       
//       }}
//     >
//       {/* 🔒 Locked Overlay */}
//       {!isContentVisible && (
//         <Box
//           data-overlay
//           sx={{
//             position: "absolute",
//             top: 0, // start from top of ResponsiveNavbar
//             left: 0,
//             right: 0,
//             // height: "calc(100% + 64px)", // extend overlay height to include navbarhe
//             backdropFilter: "blur(10px)",
//             height: {sx:'1000px',lg:"500px"},
//             backgroundColor: "rgba(255,255,255,0.8)",
//             zIndex: 20,
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
//             Unlock this section by purchasing the FOBO Pro service.
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               borderRadius: 2,
//               px: 3,
//               textTransform: "none",
//               fontWeight: 600,
//             }}
//             onClick={handleOpenPlans}
//           >
//             Unlock Now
//           </Button>
//         </Box>
//       )}

//       {/* ---- Content Section ---- */}
//       <Box
//         sx={{
//           filter: !isContentVisible ? "blur(8px)" : "none",
//           pointerEvents: !isContentVisible ? "none" : "auto",
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
//           <Button
//             variant="contained"
//             color="info"
//             sx={{ textTransform: "none", borderRadius: 2 }}
//           >
//             Share
//           </Button>
//         </Box>

//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//             <Paper
//               sx={{
//                 p: 2,
//                 backgroundColor: "#1a2238",
//                 color: "white",
//                 borderRadius: 2,
//               }}
//             >
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
//                 <strong>Qualifications:</strong>{" "}
//                 {profile?.qualifications || "N/A"}
//               </Typography>
//             </Paper>
//           </Grid>

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

//         <Paper
//           sx={{
//             mt: 2,
//             p: 2,
//             borderRadius: 2,
//             backgroundColor: "#e8f5e9",
//           }}
//         >
//           <Typography variant="body2">{summary}</Typography>
//         </Paper>
//       </Box>

//       <PlansModal open={openPlans} onClose={handleClosePlans} />
//     </Box>
//   );
// }

// ExecutiveSummary.propTypes = {
//   data: PropTypes.object,
//   forceShow: PropTypes.bool,
// };// ExecutiveSummary.jsx



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

export default function ExecutiveSummary({ data, serviceResp }) {
  console.log("dsdsdsdsdsds",serviceResp);
  const { user } = useAuthContext();

  const [openPlans, setOpenPlans] = useState(false);
  const [checked, setChecked] = useState(false);

  // ✅ Simulate check (you can extend this later with subscription API)
  useEffect(() => {
    setChecked(true);
  }, [user]);

  if (!checked) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Checking access...
        </Typography>
      </Box>
    );
  }

  // ✅ Determine access
  const hasAccess = !!serviceResp;

  // ✅ Dummy fallback data
  const dummyData = {
    profile: {
      name: "Priya Nair",
      title: "Head of Operations and Supply Chain",
      company: "Zenith Manufacturing Pvt. Ltd.",
      qualifications:
        "10+ years of experience in end-to-end supply chain management, demand forecasting, and S&OP strategy across 7 business units with combined annual revenue of 950+ Cr. Skilled in process automation, Lean methodologies, and SAP integration.",
    },
    key_achievements: [
      "Increased forecast accuracy by 25% through AI-assisted demand analytics and data-driven planning.",
      "Reduced logistics costs by 15% by optimizing supplier collaboration and warehouse distribution networks.",
      "Implemented real-time inventory dashboards, improving service levels and visibility across regions.",
    ],
    summary:
      "Priya’s leadership in operational transformation and digital innovation has strengthened business agility and scalability. This AI-readiness blueprint highlights strategic pathways to future-proof her supply chain capabilities and enhance decision intelligence.",
  };

  const summaryData =
    serviceResp && data?.data?.json_schema_data?.executive_summary
      ? data.data.json_schema_data.executive_summary
      : dummyData;

  const { profile, key_achievements, summary } = summaryData;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "rgba(255,255,255,0.9)",
        position: "relative",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        minHeight: "500px",
      }}
    >
      {/* 🔒 Locked Overlay */}
      {!hasAccess && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            // bgcolor: "rgba(255,255,255,0.8)",
            // backdropFilter: "blur(4px)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <LockIcon sx={{ fontSize: 60, color: "#1565c0", mb: 2 }} />
          <Typography variant="h6" fontWeight={600}>
            Executive Summary Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Unlock this section by purchasing the FOBO Pro service.
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
            onClick={() => setOpenPlans(true)}
          >
            Unlock Now
          </Button>
        </Box>
      )}

      {/* ---- Executive Summary Content ---- */}
      <Box
        sx={{
          filter: hasAccess ? "none" : "blur(3px)",
          opacity: hasAccess ? 1 : 0.6,
          pointerEvents: hasAccess ? "auto" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: (t) => `2px solid ${t.palette.grey[300]}`,
            mb: 2,
            py: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#3f51b5" }}>
            Executive Summary
          </Typography>
          <Button
            variant="contained"
            color="info"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Share
          </Button>
        </Box>

        {/* Profile + Achievements */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: "#1a2238",
                color: "white",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                Professional Profile
              </Typography>
              <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />
              <Typography sx={{ fontSize: 14, mt: 1 }}>
                <strong>Name:</strong> {profile?.name || "N/A"}
              </Typography>
              <Typography sx={{ fontSize: 14, mt: 1 }}>
                <strong>Title:</strong> {profile?.title || "N/A"}
              </Typography>
              <Typography sx={{ fontSize: 14, mt: 1 }}>
                <strong>Company:</strong> {profile?.company || "N/A"}
              </Typography>
              <Typography sx={{ fontSize: 14, mt: 1 }}>
                <strong>Qualifications:</strong>{" "}
                {profile?.qualifications || "N/A"}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Key Achievements
              </Typography>
              <List dense>
                {Array.isArray(key_achievements) &&
                  key_achievements.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Summary */}
        <Paper
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: "#e8f5e9",
          }}
        >
          <Typography variant="body2">{summary}</Typography>
        </Paper>
      </Box>

      {/* Plans Modal */}
      <PlansModal open={openPlans} onClose={() => setOpenPlans(false)} />
    </Box>
  );
}

ExecutiveSummary.propTypes = {
  data: PropTypes.object,
  serviceResp: PropTypes.bool,
};
