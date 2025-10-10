// import React from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Grid,
//   Paper,
// } from "@mui/material";

// export default function AIMarketingBuilder() {
//   return (
//     <Box
//       sx={{
//         //  bgcolor: "linear-gradient(135deg, #2c45e1 , #0097f9 )",
//           bgcolor: "#2c45e1",
//         color: "white",
//         py: 8,
//         textAlign: "center",
//       }}
//     >
//       <Container maxWidth="md">
//         {/* Title */}
//         <Typography variant="h3" fontWeight="bold" gutterBottom>
//           AI Marketing Foundation Builder
//         </Typography>

//         {/* Subtitle */}
//         <Typography variant="subtitle1" sx={{ opacity: 0.85, mb: 3 }}>
//           4-month, hands-on cohort · No coding required
//         </Typography>

//         {/* Price Button */}
//         <Button
//           variant="contained"
//           sx={{
//             bgcolor: "#00ff84",
//             color: "black",
//             fontWeight: "bold",
//             fontSize: "1rem",
//             px: 4,
//             py: 1.5,
//             borderRadius: "50px",
//             boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
//             "&:hover": { bgcolor: "#00e676" },
//             mb: 6,
//           }}
//         >
//           $49 / month
//         </Button>

//         {/* Info Grid */}
//         <Grid container spacing={3} justifyContent="center">
//           {[
//             { label: "Duration", value: "4 months" },
//             { label: "Format", value: "Live + Self-paced" },
//             { label: "Next Batch", value: "15 Sep 2025" },
//             { label: "Effort", value: "2-3 h / week" },
//           ].map((item, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   width:'100%',
//                   bgcolor: "rgba(255,255,255,0.15)",
//                   color: "white",
//                   textAlign: "center",
//                   borderRadius: 2,
//                   p: 3,
//                   fontSize: "1rem",
//                 }}
//               >
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   {item.label}
//                 </Typography>
//                 <Typography variant="body1">{item.value}</Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }



import React, { useEffect, useState } from "react";
import axiosInstance from 'src/utils/axios';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import ListedInfo from "./listedinfo";
import FAQSection from './faqquestion'


export default function AIMarketingBuilder() {
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const categoryValue = 1; // example: plan type 1 for Marketing

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await axiosInstance.get(`/plans/plan-by-type/${categoryValue}`);
        setPlanData(response.data);
      } catch (error) {
        console.error("Error fetching plan data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanData();
  }, [categoryValue]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!planData) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h6" color="text.secondary">
          🚫 No data found for this plan
        </Typography>
      </Box>
    );
  }

  const { courses, price } = planData;

  return (
    <>
      <Box
        sx={{
          bgcolor: "#2c45e1",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          {/* Title */}
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {courses?.courseName || "AI Marketing Foundation Builder"}
          </Typography>

          {/* Subtitle */}
          <Typography variant="subtitle1" sx={{ opacity: 0.85, mb: 3 }}>
            {courses?.heading
              ? `${courses.heading} · ${courses.format?.join(" + ")}`
              : "4-month, hands-on cohort · No coding required"}
          </Typography>

          {/* Price Button */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#00ff84",
              color: "black",
              fontWeight: "bold",
              fontSize: "1rem",
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
              "&:hover": { bgcolor: "#00e676" },
              mb: 6,
            }}
          >
            ₹{price?.toLocaleString() || "N/A"} /{" "}
            {planData.paymentType === "oneTime" ? "one-time" : "month"}
          </Button>

          {/* Info Grid */}
          <Grid container spacing={3} justifyContent="center">
            {[
              { label: "Duration", value: courses?.courseDuration || "N/A" },
              {
                label: "Format",
                value: courses?.format?.join(" + ") || "Self-paced",
              },
              { label: "Effort", value: courses?.effort || "2-3 h / week" },
              {
                label: "Next Batch",
                value: new Date(planData.updatedAt).toLocaleDateString(),
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    width: "100%",
                    bgcolor: "rgba(255,255,255,0.15)",
                    color: "white",
                    textAlign: "center",
                    borderRadius: 2,
                    p: 3,
                    fontSize: "1rem",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.label}
                  </Typography>
                  <Typography variant="body1">{item.value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {console.log(zz)}
      {planData[0]?.courses && (
        <>
          <ListedInfo keyOutComes={planData.courses.keyOutComes} />
          <FAQSection programModules={planData.courses.programModules} />

        </>
      )}
         {/* {planData?.map((plan, index) => (
        <React.Fragment key={index}>
          <ListedInfo keyOutComes={plan.courses.keyOutComes} />
          <FAQSection programModules={plan.courses.programModules} />
        </React.Fragment>
      ))} */}
    </>
  );
}

