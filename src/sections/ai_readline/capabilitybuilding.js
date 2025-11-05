// import React from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Paper,
//   Chip,
//   Divider,
//   Button,
// } from "@mui/material";
// import { Icon } from "@iconify/react";
// import PropTypes from "prop-types";

// export default function CapabilityBuilding({ data }) {
//   // ✅ Safely extract the capability building data
//   const capabilityPlan =
//     data?.data?.json_schema_data?.capability_building_plan?.learning_plan || [];
//   const timePeriod =
//     data?.data?.json_schema_data?.capability_building_plan?.time_period_definition?.T ||
//     "N/A";

//   return (
//     <Container maxWidth="lg" sx={{ py: 6 }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         <Typography variant="h5" fontWeight={600} color="primary" gutterBottom>
//           Capability Building
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Icon icon="ic:sharp-share" width="20" height="20" color="#fff" />}
//         >
//           Share
//         </Button>
//       </Box>

//       {/* Time Period */}
//       <Typography
//         variant="subtitle2"
//         sx={{ mb: 2, color: "text.secondary", fontWeight: 500 }}
//       >
//         Time Period: {timePeriod}
//       </Typography>

//       <Divider sx={{ mb: 2 }} />

//       {/* Capability Cards */}
//       <Grid container spacing={3}>
//         {capabilityPlan.map((item, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: 2,
//                 border: "1px solid rgba(0,0,0,0.1)",
//                 bgcolor: "background.paper",
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               {/* Skill Cluster + Hours */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 1,
//                 }}
//               >
//                 <Typography variant="subtitle1" fontWeight={600} color="primary">
//                   {item["Skill Cluster"]}
//                 </Typography>
//                 <Chip
//                   label={`${item["Estimated Hrs/Week"]} hrs/week`}
//                   color="success"
//                   size="small"
//                   sx={{ fontSize: "0.75rem", fontWeight: 500 }}
//                 />
//               </Box>

//               {/* Micro-Credential */}
//               <Typography sx={{ mb: 1, fontSize: "12px" }}>
//                 <strong>Micro-credential: </strong>
//                 {item["T Micro-Credential"]}
//               </Typography>

//               {/* Learning Mode */}
//               <Typography sx={{ fontSize: "12px" }} color="text.secondary">
//                 <strong>Learning Mode: </strong>
//                 {item["Learning Mode"]}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

// // ✅ PropTypes Validation
// CapabilityBuilding.propTypes = {
//   data: PropTypes.shape({
//     data: PropTypes.shape({
//       json_schema_data: PropTypes.shape({
//         capability_building_plan: PropTypes.shape({
//           time_period_definition: PropTypes.shape({
//             T: PropTypes.string,
//           }),
//           learning_plan: PropTypes.arrayOf(
//             PropTypes.shape({
//               "Skill Cluster": PropTypes.string,
//               "T Micro-Credential": PropTypes.string,
//               "Learning Mode": PropTypes.string,
//               "Estimated Hrs/Week": PropTypes.string,
//             })
//           ),
//         }),
//       }),
//     }),
//   }),
// };


import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import LockIcon from "@mui/icons-material/Lock";
import PropTypes from "prop-types";

export default function CapabilityBuilding({ data, isProUser }) {
  // ✅ Extract capability building data safely
  const capabilityPlan =
    data?.data?.json_schema_data?.capability_building_plan?.learning_plan || [];
  const timePeriod =
    data?.data?.json_schema_data?.capability_building_plan?.time_period_definition?.T ||
    "N/A";

  return (
    <Box sx={{ position: "relative" }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600} color="primary" gutterBottom>
            Capability Building
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon icon="ic:sharp-share" width="20" height="20" color="#fff" />}
          >
            Share
          </Button>
        </Box>

        {/* Time Period */}
        <Typography
          variant="subtitle2"
          sx={{ mb: 2, color: "text.secondary", fontWeight: 500 }}
        >
          Time Period: {timePeriod}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Capability Cards */}
        <Grid container spacing={3}>
          {capabilityPlan.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid rgba(0,0,0,0.1)",
                  bgcolor: "background.paper",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Skill Cluster + Hours */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600} color="primary">
                    {item["Skill Cluster"]}
                  </Typography>
                  <Chip
                    label={`${item["Estimated Hrs/Week"]} hrs/week`}
                    color="success"
                    size="small"
                    sx={{ fontSize: "0.75rem", fontWeight: 500 }}
                  />
                </Box>

                {/* Micro-Credential */}
                <Typography sx={{ mb: 1, fontSize: "12px" }}>
                  <strong>Micro-credential: </strong>
                  {item["T Micro-Credential"]}
                </Typography>

                {/* Learning Mode */}
                <Typography sx={{ fontSize: "12px" }} color="text.secondary">
                  <strong>Learning Mode: </strong>
                  {item["Learning Mode"]}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 🔒 Blue Lock Overlay (for non-Pro users) */}
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
            Capability Building Locked
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 2, color: "text.secondary" }}
          >
            Upgrade to access full Capability Building Section
          </Typography>
         
        </Box>
      )}
    </Box>
  );
}

// ✅ PropTypes Validation
CapabilityBuilding.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        capability_building_plan: PropTypes.shape({
          time_period_definition: PropTypes.shape({
            T: PropTypes.string,
          }),
          learning_plan: PropTypes.arrayOf(
            PropTypes.shape({
              "Skill Cluster": PropTypes.string,
              "T Micro-Credential": PropTypes.string,
              "Learning Mode": PropTypes.string,
              "Estimated Hrs/Week": PropTypes.string,
            })
          ),
        }),
      }),
    }),
  }),
  isProUser: PropTypes.bool, // 🔹 add this prop
};
