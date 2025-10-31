// import React from 'react';
// import { Container, Paper, Box, Typography } from '@mui/material';

// // sample rows (extracted from your HTML)
// const rows = [
//   { dept: 'DS Titles', task: 'Clean, preprocess, and prepare datasets for analysis', p_auto: '0.54', p_aug: '0.39', p_hum: '0.07', fobo: 65 },
//   { dept: 'DS Titles', task: 'Write and maintain reproducible code with version control', p_auto: '0.54', p_aug: '0.39', p_hum: '0.07', fobo: 65 },
//   { dept: 'DS Titles', task: 'Set up and maintain local development environments', p_auto: '0.41', p_aug: '0.53', p_hum: '0.06', fobo: 60 },
//   { dept: 'Marketing Titles', task: 'Schedule, publish, and manage social media posts and accounts.', p_auto: '0.52', p_aug: '0.46', p_hum: '0.03', fobo: 71 },
//   { dept: 'Marketing Titles', task: 'Monitor, analyze, and report on digital campaign and content performance using analytics tools.', p_auto: '0.52', p_aug: '0.45', p_hum: '0.04', fobo: 69 },
//   { dept: 'Marketing Titles', task: 'Track and manage digital advertising and marketing budgets with ROI monitoring.', p_auto: '0.50', p_aug: '0.46', p_hum: '0.04', fobo: 68 },
//   { dept: 'PM Titles', task: 'Data extraction, cleaning, analysis, and reporting of product metrics and user feedback', p_auto: '0.35', p_aug: '0.61', p_hum: '0.04', fobo: 61 },
//   { dept: 'PM Titles', task: 'Research and competitive analysis to inform product decisions', p_auto: '0.29', p_aug: '0.68', p_hum: '0.04', fobo: 58 },
//   { dept: 'PM Titles', task: 'Product documentation and communication including features, workflows, and presentations', p_auto: '0.28', p_aug: '0.62', p_hum: '0.10', fobo: 47 },
//   { dept: 'SE Titles', task: 'Infrastructure automation and configuration management', p_auto: '0.38', p_aug: '0.58', p_hum: '0.04', fobo: 62 },
//   { dept: 'SE Titles', task: 'Monitoring, logging, and alerting system implementation and management', p_auto: '0.39', p_aug: '0.56', p_hum: '0.05', fobo: 61 },
//   { dept: 'SE Titles', task: 'Version control and CI/CD pipeline management', p_auto: '0.39', p_aug: '0.56', p_hum: '0.04', fobo: 61 },
// ];

// export default function TopTasksTableView() {
//   return (
//     <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
//       <Paper sx={{ borderRadius: 2, p: 3 }}>
//         <Typography variant="h6" align="center" sx={{ mb: 2 }}>
//           Top Tasks by Automation Exposure
//         </Typography>

//         <Box sx={{ overflowX: 'auto' }}>
//           <Box component="table" width="100%" sx={{ borderCollapse: 'separate', borderSpacing: '0 8px', minWidth: 760 }}>
//             <Box component="thead">
//               <Box component="tr">
//                 <Box component="th" sx={{ textAlign: 'left', p: 1.5, fontWeight: 700, bgcolor: 'transparent' }}>Department</Box>
//                 <Box component="th" sx={{ textAlign: 'left', p: 1.5, fontWeight: 700 }}>Task</Box>
//                 <Box component="th" sx={{ textAlign: 'center', p: 1.5, fontWeight: 700 }}>P<sub>auto</sub></Box>
//                 <Box component="th" sx={{ textAlign: 'center', p: 1.5, fontWeight: 700 }}>P<sub>aug</sub></Box>
//                 <Box component="th" sx={{ textAlign: 'center', p: 1.5, fontWeight: 700 }}>P<sub>hum</sub></Box>
//                 <Box component="th" sx={{ textAlign: 'center', p: 1.5, fontWeight: 700 }}>FOBO<sub>t</sub></Box>
//               </Box>
//             </Box>

//             <Box component="tbody">
//               {rows.map((r, idx) => (
//                 <Box
//                   component="tr"
//                   key={idx}
//                   sx={{
//                     bgcolor: idx % 2 === 0 ? 'background.paper' : '#f8fafc',
//                     boxShadow: '0 0 0 1px rgba(15, 23, 42, 0.03) inset',
//                     borderRadius: 1,
//                   }}
//                 >
//                   <Box component="td" sx={{ p: 1.5, width: 160, verticalAlign: 'top' }}>{r.dept}</Box>
//                   <Box component="td" sx={{ p: 1.5, textAlign: 'left' }}>{r.task}</Box>
//                   <Box component="td" sx={{ p: 1.5, textAlign: 'center', width: 80 }}>{r.p_auto}</Box>
//                   <Box component="td" sx={{ p: 1.5, textAlign: 'center', width: 80 }}>{r.p_aug}</Box>
//                   <Box component="td" sx={{ p: 1.5, textAlign: 'center', width: 80 }}>{r.p_hum}</Box>
//                   <Box component="td" sx={{ p: 1.5, textAlign: 'center', width: 70, fontWeight:700 }}>{r.fobo}</Box>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }



import React, { useEffect, useState } from "react";
import { Container, Paper, Box, Typography } from "@mui/material";
import { Company_Fobo_Response } from "src/constants/company_fobo_response";

export default function TopTasksTableView() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // safely extract data from the constant file
    const taskData =
      Company_Fobo_Response?.data?.task_exposure_analysis?.data || [];
    setRows(taskData);
  }, []);

  if (!rows.length) return null;

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: 1200, mx: "auto", py: 4 }}
    >
      <Paper sx={{ borderRadius: 2, p: 3 }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Top Tasks by Automation Exposure
        </Typography>

        <Box sx={{ overflowX: "auto" }}>
          <Box
            component="table"
            width="100%"
            sx={{
              borderCollapse: "separate",
              borderSpacing: "0 8px",
              minWidth: 760,
            }}
          >
            {/* Table Header */}
            <Box component="thead">
              <Box component="tr">
                <Box
                  component="th"
                  sx={{
                    textAlign: "left",
                    p: 1.5,
                    fontWeight: 700,
                    bgcolor: "transparent",
                  }}
                >
                  Department
                </Box>
                <Box
                  component="th"
                  sx={{ textAlign: "left", p: 1.5, fontWeight: 700 }}
                >
                  Task
                </Box>
                <Box
                  component="th"
                  sx={{ textAlign: "center", p: 1.5, fontWeight: 700 }}
                >
                  P<sub>auto</sub>
                </Box>
                <Box
                  component="th"
                  sx={{ textAlign: "center", p: 1.5, fontWeight: 700 }}
                >
                  P<sub>aug</sub>
                </Box>
                <Box
                  component="th"
                  sx={{ textAlign: "center", p: 1.5, fontWeight: 700 }}
                >
                  P<sub>hum</sub>
                </Box>
                <Box
                  component="th"
                  sx={{ textAlign: "center", p: 1.5, fontWeight: 700 }}
                >
                  FOBO<sub>t</sub>
                </Box>
              </Box>
            </Box>

            {/* Table Body */}
            <Box component="tbody">
              {rows.map((r, idx) => (
                <Box
                  component="tr"
                  key={idx}
                  sx={{
                    bgcolor: idx % 2 === 0 ? "background.paper" : "#f8fafc",
                    boxShadow: "0 0 0 1px rgba(15, 23, 42, 0.03) inset",
                    borderRadius: 1,
                  }}
                >
                  <Box
                    component="td"
                    sx={{ p: 1.5, width: 160, verticalAlign: "top",fontSize: "14px" }}
                  >
                    {r.department}
                  </Box>
                  <Box
                    component="td"
                    sx={{ p: 1.5, textAlign: "left", maxWidth: 380, fontSize: "14px" }}
                  >
                    {r.task}
                  </Box>
                  <Box
                    component="td"
                    sx={{ p: 1.5, textAlign: "center", width: 80,fontSize: "14px" }}
                  >
                    {r.p_auto}
                  </Box>
                  <Box
                    component="td"
                    sx={{ p: 1.5, textAlign: "center", width: 80, fontSize: "14px" }}
                  >
                    {r.p_aug}
                  </Box>
                  <Box
                    component="td"
                    sx={{ p: 1.5, textAlign: "center", width: 80, fontSize: "15px" }}
                  >
                    {r.p_hum}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      p: 1.5,
                      textAlign: "center",
                      width: 70,
                      fontWeight: 700,
                    }}
                  >
                    {r.fobo_task}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
