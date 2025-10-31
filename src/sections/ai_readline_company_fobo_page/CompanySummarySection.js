// import React from 'react';
// import { Container, Grid, Paper, Box, Typography, Chip, Divider } from '@mui/material';
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   donut: { automation: 11, augmentation: 42, human: 36 },
//   heatmap: [
//     { domain: 'PM Titles', fobo: 62, industry: 50 },
//     { domain: 'SE Titles', fobo: 58, industry: 50 },
//     { domain: 'Marketing Titles', fobo: 63, industry: 50 },
//     { domain: 'DS Titles', fobo: 57, industry: 50 },
//   ],
//   title: 'AI Readiness & Workforce Risk',
//   company: 'accenture',
//   lastUpdated: '07 Oct 2025',
//   qoq: '+12% QoQ'
// };

// export default function CompanySummary() {
//   const donutData = {
//     labels: ['Automation 11%', 'Augmentation 42%', 'Human-Only 36%'],
//     datasets: [
//       {
//         data: [data.donut.automation, data.donut.augmentation, data.donut.human],
//         backgroundColor: ['#f97316', '#3b82f6', '#22c55e'], // orange, blue, green
//         borderWidth: 0,
//         hoverOffset: 8,
//       },
//     ],
//   };

//   const donutOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         callbacks: {
//           label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
//         },
//       },
//     },
//     cutout: '68%',
//   };

//   return (
//     <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
//       {/* Header */}
//       <Box
//         mb={3}
//         display="flex"
//         alignItems="center"
//         gap={2}
//         flexWrap="wrap"
//         justifyContent="space-between"
//       >
//         <Typography
//           variant="h5"
//           fontWeight={800}
//           sx={{ color: '#1e293b' }}
//         >
//           {data.title} —{' '}
//           <Box component="span" sx={{ color: '#6366f1' }}>
//             {data.company}
//           </Box>
//         </Typography>

//         <Chip
//           label={`Last Updated: ${data.lastUpdated} • ↑ ${data.qoq}`}
//           sx={{
//             backgroundColor: '#6366f1',
//             color: '#fff',
//             fontWeight: 700,
//             fontSize: '0.8rem',
//             borderRadius: '10px',
//             px: 1,
//           }}
//         />
//       </Box>

//       <Grid container spacing={3}>
//         {/* Donut Chart */}
//         <Grid item xs={12} md={7}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               borderRadius: 3,
//               boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
//             }}
//           >
//             <Typography variant="subtitle1" align="center" fontWeight={700}>
//               Company Task Portfolio
//             </Typography>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               align="center"
//               sx={{ mb: 2 }}
//             >
//               (share of hours)
//             </Typography>

//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: 300,
//               }}
//             >
//               <Box sx={{ width: '100%', maxWidth: 320, height: 280 }}>
//                 <Doughnut data={donutData} options={donutOptions} />
//               </Box>
//             </Box>

//             <Box display="flex" justifyContent="center" gap={3} mt={1}>
//               <Box display="flex" alignItems="center" gap={1}>
//                 <Box sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: '#f97316' }} />
//                 <Typography variant="caption" fontWeight={500}>Automation 11%</Typography>
//               </Box>
//               <Box display="flex" alignItems="center" gap={1}>
//                 <Box sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: '#3b82f6' }} />
//                 <Typography variant="caption" fontWeight={500}>Augmentation 42%</Typography>
//               </Box>
//               <Box display="flex" alignItems="center" gap={1}>
//                 <Box sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: '#22c55e' }} />
//                 <Typography variant="caption" fontWeight={500}>Human-Only 36%</Typography>
//               </Box>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* Heatmap */}
//         <Grid item xs={12} md={5}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               borderRadius: 3,
//               boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
//             }}
//           >
//             <Typography variant="subtitle1" align="center" fontWeight={700}>
//               FOBO Heat-Map vs. Industry
//             </Typography>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               align="center"  
//               sx={{ mb: 2 }}
//             >
//               (Δ &lt; 0 = safer)
//             </Typography>

//             <Box sx={{ overflowX: 'auto' }}>
//               <Box
//                 component="table"
//                 width="100%"
//                 sx={{
//                   borderCollapse: 'collapse',
//                   minWidth: 320,
//                   '& th, & td': {
//                     borderBottom: '1px solid #f1f5f9',
//                     textAlign: 'center',
//                     p: 1.2,
//                   },
//                 }}
//               >
//                 <Box component="thead" sx={{ bgcolor: '#f1f5f9' }}>
//                   <Box component="tr">
//                     <Box component="th" sx={{ textAlign: 'left', fontWeight: 700 }}>
//                       Domain
//                     </Box>
//                     <Box component="th" sx={{ fontWeight: 700 }}>FOBO</Box>
//                     <Box component="th" sx={{ fontWeight: 700 }}>Industry Avg</Box>
//                   </Box>
//                 </Box>

//                 <Box component="tbody">
//                   {data.heatmap.map((row, i) => (
//                     <Box
//                       key={i}
//                       component="tr"
//                       sx={{
//                         backgroundColor: '#fff1f2',
//                         '&:nth-of-type(even)': { backgroundColor: '#ffeef0' },
//                       }}
//                     >
//                       <Box component="td" sx={{ textAlign: 'left' }}>
//                         {row.domain}
//                       </Box>
//                       <Box component="td" sx={{ fontWeight: 700, color: '#1e293b' }}>
//                         {row.fobo}
//                       </Box>
//                       <Box component="td" sx={{ color: '#1e293b' }}>
//                         {row.industry}
//                       </Box>
//                     </Box>
//                   ))}
//                 </Box>
//               </Box>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Company_Fobo_Response } from "src/constants/company_fobo_response";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CompanySummary() {
  const [companyData, setCompanyData] = useState(null);

  // Load from local JSON
  useEffect(() => {
    setCompanyData(Company_Fobo_Response.data);
  }, []);

  if (!companyData) return null;

  const { company_name, company_scores, metadata, domains } = companyData;

  // Prepare Donut chart data
  const donutData = {
    labels: [
      `Automation ${company_scores.average_automated_score.toFixed(1)}%`,
      `Augmentation ${company_scores.average_augmented_score.toFixed(1)}%`,
      `Human-Only ${company_scores.average_human_score.toFixed(1)}%`,
    ],
    datasets: [
      {
        data: [
          company_scores.average_automated_score,
          company_scores.average_augmented_score,
          company_scores.average_human_score,
        ],
        backgroundColor: ["#f97316", "#3b82f6", "#22c55e"],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed.toFixed(1)}%`,
        },
      },
    },
    cutout: "68%",
  };

  // Prepare table data from domains
  const heatmapData =
    domains?.map((d) => ({
      domain: d.domain_name,
      fobo: d.domain_scores.average_fobo_score.toFixed(1),
      industry: 50, // Static placeholder
    })) || [];

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
      {/* Header */}
      <Box
        mb={3}
        display="flex"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Typography variant="h3" fontWeight={800} sx={{ color: "#1e293b" }}>
          AI Readiness & Workforce Risk —{" "}
          <Box component="span" sx={{ color: "#6366f1" }}>
            {company_name}
          </Box>
        </Typography>

        <Chip
          label={`Last Updated: ${new Date(metadata.analysis_timestamp).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })} • ↑ +12% QoQ`}
          sx={{
            backgroundColor: "#4F46E5",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.9rem",
            borderRadius: "10px",
            px: 1,
            '&:hover': {
              backgroundColor: '#6366F1', // new color on hover
            },
          }}
        />


      </Box>

      <Grid container spacing={3}>
        {/* Donut Chart */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="subtitle1" align="center" fontWeight={700}>
              Company Task Portfolio
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 2 }}
            >
              (share of hours)
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 300,
              }}
            >
              <Box sx={{ width: "100%", maxWidth: 320, height: 280 }}>
                <Doughnut data={donutData} options={donutOptions} />
              </Box>
            </Box>

            <Box display="flex" justifyContent="center" gap={3} mt={1}>
              {donutData.labels.map((label, i) => (
                <Box key={i} display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "2px",
                      bgcolor: donutData.datasets[0].backgroundColor[i],
                    }}
                  />
                  <Typography variant="caption" fontWeight={500}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Heatmap */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="subtitle1" align="center" fontWeight={700}>
              FOBO Heat-Map vs. Industry
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 2 }}
            >
              (Δ &lt; 0 = safer)
            </Typography>

            <Box sx={{ overflowX: "auto" }}>
              <Box
                component="table"
                width="100%"
                sx={{
                  borderCollapse: "collapse",
                  minWidth: 320,
                  "& th, & td": {
                    borderBottom: "1px solid #f1f5f9",
                    textAlign: "center",
                    p: 1.2,
                  },
                }}
              >
                <Box component="thead" sx={{ bgcolor: "#f1f5f9" }}>
                  <Box component="tr">
                    <Box
                      component="th"
                      sx={{ textAlign: "left", fontWeight: 700 }}
                    >
                      Domain
                    </Box>
                    <Box component="th" sx={{ fontWeight: 700 }}>
                      FOBO
                    </Box>
                    <Box component="th" sx={{ fontWeight: 700 }}>
                      Industry Avg
                    </Box>
                  </Box>
                </Box>

                <Box component="tbody">
                  {heatmapData.map((row, i) => (
                    <Box
                      key={i}
                      component="tr"
                      sx={{
                        backgroundColor: "#fff1f2",
                        "&:nth-of-type(even)": {
                          backgroundColor: "#ffeef0",
                        },
                      }}
                    >
                      <Box component="td" sx={{ textAlign: "left" }}>
                        {row.domain}
                      </Box>
                      <Box
                        component="td"
                        sx={{ fontWeight: 700, color: "#1e293b" }}
                      >
                        {row.fobo}
                      </Box>
                      <Box component="td" sx={{ color: "#1e293b" }}>
                        {row.industry}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
