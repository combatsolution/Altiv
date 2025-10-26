// import React from "react";
// import { Grid, Box, Typography, Button } from "@mui/material";
// import Divider from "@mui/material/Divider";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import PropTypes from "prop-types";

// // Example sub-card for analysis
// const AnalysisCard = ({ title, badge, evidence, gap }) => (
//   <Box
//     sx={{
//       border: "1px solid #ddd",
//       borderRadius: 2,
//       p: 2,
//       height: "100%",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-between",
//       boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
//     }}
//   >
//     <Typography
//       variant="h6"
//       sx={{ fontWeight: 600, color: "#333", mb: 1 }}
//     >
//       {title}
//     </Typography>

//     <Typography variant="body2" sx={{ color: "#555", mb: 1 }}>
//       <strong>Evidence:</strong> {evidence}
//     </Typography>

//     <Typography variant="body2" sx={{ color: "#444", mb: 1 }}>
//       <strong>Strength:</strong> {badge}
//     </Typography>

//     <Typography variant="body2" sx={{ color: "#d32f2f" }}>
//       <strong>AI-Readiness Gap:</strong> {gap}
//     </Typography>
//   </Box>
// );

// AnalysisCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   badge: PropTypes.string.isRequired,
//   evidence: PropTypes.string.isRequired,
//   gap: PropTypes.string.isRequired,
// };

// // ================================================

// export default function CurrentStateAnalysis({ data }) {
//   const currentStateData =
//     data?.data?.json_schema_data?.current_state_diagnostic || [];

//   return (
//     <Box
//       sx={{
//         p: 3,
//         mx: "auto",
//         maxWidth: { xs: "100%", md: "400px", lg: "1200px" },
//         width: "100%",
//       }}
//     >
//       {/* Header */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//         sx={{
//           my: 3,
//           borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: "bold",
//             color: "#1976d2",
//           }}
//         >
//           Current State Analysis
//         </Typography>

//         <Button
//           size="small"
//           variant="contained"
//           startIcon={<TwitterIcon />}
//           sx={{
//             bgcolor: "#1DA1F2",
//             textTransform: "none",
//             "&:hover": { bgcolor: "#0d8ddb" },
//           }}
//         >
//           Tweet
//         </Button>
//       </Box>

//       {/* Grid of Cards */}
//       <Grid container spacing={2}>
//         {currentStateData.map((item, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <AnalysisCard
//               title={item.Capability || "N/A"}
//               badge={item.Strength || "N/A"}
//               evidence={item.Evidence || "N/A"}
//               gap={item["AI-Readiness Gap"] || "N/A"}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

// CurrentStateAnalysis.propTypes = {
//   data: PropTypes.shape({
//     data: PropTypes.shape({
//       json_schema_data: PropTypes.shape({
//         current_state_diagnostic: PropTypes.arrayOf(
//           PropTypes.shape({
//             Capability: PropTypes.string,
//             Evidence: PropTypes.string,
//             Strength: PropTypes.string,
//             "AI-Readiness Gap": PropTypes.string,
//           })
//         ),
//       }),
//     }),
//   }),
// };

import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import TwitterIcon from "@mui/icons-material/Twitter";
import LockIcon from "@mui/icons-material/Lock";
import PropTypes from "prop-types";
import { useAuthContext } from "src/auth/hooks";

// Sub-card
const AnalysisCard = ({ title, badge, evidence, gap }) => (
  <Box
    sx={{
      border: "1px solid #ddd",
      borderRadius: 2,
      p: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", mb: 1 }}>
      {title}
    </Typography>

    <Typography variant="body2" sx={{ color: "#555", mb: 1 }}>
      <strong>Evidence:</strong> {evidence}
    </Typography>

    <Typography variant="body2" sx={{ color: "#444", mb: 1 }}>
      <strong>Strength:</strong> {badge}
    </Typography>

    <Typography variant="body2" sx={{ color: "#d32f2f" }}>
      <strong>AI-Readiness Gap:</strong> {gap}
    </Typography>
  </Box>
);

AnalysisCard.propTypes = {
  title: PropTypes.string.isRequired,
  badge: PropTypes.string.isRequired,
  evidence: PropTypes.string.isRequired,
  gap: PropTypes.string.isRequired,
};

// ================================================

export default function CurrentStateAnalysis({ data }) {
  const { user } = useAuthContext();
  const isProUser = user?.isPro || false; // replace with actual subscription check

  const currentStateData =
    data?.data?.json_schema_data?.current_state_diagnostic || [];

  return (
    <Box
      sx={{
        p: 1,
        mx: "auto",
        maxWidth: { xs: "100%", md: "400px", lg: "1200px" },
        width: "100%",
        position: "relative",
      }}
    >
      {/* 🔐 BLUR OVERLAY if not pro */}
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
            Current State Analysis Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Upgrade to unlock AI-Readiness diagnostics
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
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        sx={{
          my: 3,
          borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
          filter: !isProUser ? "blur(3px)" : "none",
          pointerEvents: !isProUser ? "none" : "auto",
          userSelect: !isProUser ? "none" : "auto",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Current State Analysis
        </Typography>

        <Button
          size="small"
          variant="contained"
          startIcon={<TwitterIcon />}
          sx={{
            bgcolor: "#1DA1F2",
            textTransform: "none",
            "&:hover": { bgcolor: "#0d8ddb" },
          }}
        >
          Tweet
        </Button>
      </Box>

      {/* Grid of Cards */}
      <Grid
        container
        spacing={2}
        sx={{ filter: !isProUser ? "blur(4px)" : "none" }}
      >
        {currentStateData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AnalysisCard
              title={item.Capability || "N/A"}
              badge={item.Strength || "N/A"}
              evidence={item.Evidence || "N/A"}
              gap={item["AI-Readiness Gap"] || "N/A"}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

CurrentStateAnalysis.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        current_state_diagnostic: PropTypes.arrayOf(
          PropTypes.shape({
            Capability: PropTypes.string,
            Evidence: PropTypes.string,
            Strength: PropTypes.string,
            "AI-Readiness Gap": PropTypes.string,
          })
        ),
      }),
    }),
  }),
};

