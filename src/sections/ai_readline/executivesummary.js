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


import React from "react";
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
import { useAuthContext } from "src/auth/hooks"; // ✅ to check user's subscription

export default function ExecutiveSummary({ data }) {
  const { user } = useAuthContext(); // assume user object contains subscription info
  const isProUser = user?.isPro || false; // ✅ replace with actual subscription condition

  // ✅ Safely access executive summary from API response
  const summaryData = data?.data?.json_schema_data?.executive_summary;
  if (!summaryData) return null;

  const { profile, key_achievements, summary } = summaryData;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#fafafa",
        position: "relative", // needed for overlay
        overflow: "hidden",
      }}
    >
      {/* ✅ BLUR OVERLAY if user not pro */}
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
            Executive Summary Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            This section contains premium insights. Upgrade to view.
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

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          borderBottom: (t) => `2px solid ${t.palette.grey[300]}`,
          mb: 2,
          py: 1,
          filter: !isProUser ? "blur(3px)" : "none",
          pointerEvents: !isProUser ? "none" : "auto",
          userSelect: !isProUser ? "none" : "auto",
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

      {/* Content */}
      <Grid container spacing={2} sx={{ filter: !isProUser ? "blur(4px)" : "none" }}>
        {/* Left Section – Profile Info */}
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
              <strong>Qualifications:</strong> {profile?.qualifications || "N/A"}
            </Typography>
          </Paper>
        </Grid>

        {/* Right Section – Achievements */}
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

      {/* Summary Section */}
      <Paper
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 2,
          backgroundColor: "#e8f5e9",
          filter: !isProUser ? "blur(4px)" : "none",
        }}
      >
        <Typography variant="body2">{summary}</Typography>
      </Paper>
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
