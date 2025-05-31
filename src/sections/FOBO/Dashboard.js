// // src/sections/FOBO/Dashboard.js

// import * as React from 'react';
// import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
// import { PieChart } from '@mui/x-charts';
// import { desktopOS, valueFormatter } from './webUsageStats';

// const dashboardData = {
//   fobo: {
//     title: 'FOBO Level',
//     value: 24,
//     image: {
//       src: 'https://storage.googleapis.com/a1aa/image/32505381-947d-400e-4f6d-45f51201b2a9.jpg',
//       alt: 'Gauge meter with green, yellow, orange, red zones and needle pointing to Moderate',
//       size: 150,
//     },
//     labels: [
//       { text: 'Good', color: 'green' },
//       { text: 'Moderate', color: 'orange' },
//       { text: 'Bad', color: 'red' },
//     ],
//   },
//   taskDistribution: {
//     title: 'Task Distribution',
//     height: 200,
//     width: 200,
//   },
//   tasks: [
//     {
//       id: 1,
//       title: 'Master AI-Powered Product Strategies',
//       benefit: 'Lead AI integration in EdTech products, staying ahead of industry changes.',
//       bg: 'rgba(220, 252, 231, 0.7)',
//     },
//     {
//       id: 2,
//       title: 'Develop Advanced Learning Experience Design Skills',
//       benefit: 'Create unique human-centered solutions that AI cannot easily replicate.',
//       bg: 'rgba(219, 234, 254, 0.7)',
//     },
//     {
//       id: 3,
//       title: 'Focus on Complex Partnership Development',
//       benefit: 'Build relationships and strategies that require human judgement and networking.',
//       bg: 'rgba(253, 242, 248, 0.7)',
//     },
//     {
//       id: 4,
//       title: 'Strengthen Data-Driven Decision Making',
//       benefit: 'Use AI tools to enhance strategic planning and product innovation.',
//       bg: 'rgba(254, 249, 195, 0.7)',
//     },
//   ],
// };

// export default function Dashboard() {
//   return (
//     <Box sx={{ p: 2, bgcolor: '#fff', color: '#000', fontFamily: 'sans-serif' }}>
//       <Grid container spacing={4} justifyContent="center">
//         {/* FOBO Level */}
//         <Grid item xs={12} sm={6}>
//           <Box textAlign="center">
//             <Typography variant="subtitle2" align="left" gutterBottom>
//               {dashboardData.fobo.title}
//             </Typography>
//             <Box position="relative" display="inline-block">
//               <Box
//                 component="img"
//                 src={dashboardData.fobo.image.src}
//                 alt={dashboardData.fobo.image.alt}
//                 sx={{
//                   width: dashboardData.fobo.image.size,
//                   height: dashboardData.fobo.image.size,
//                 }}
//               />
//               <Typography
//                 variant="h3"
//                 color="success.main"
//                 sx={{
//                   position: 'absolute',
//                   top: '50%',
//                   left: '50%',
//                   transform: 'translate(-50%, -10%)',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {dashboardData.fobo.value}
//               </Typography>
//             </Box>
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               maxWidth={dashboardData.fobo.image.size}
//               mx="auto"
//               mt={1}
//             >
//               {dashboardData.fobo.labels.map((label) => (
//                 <Typography key={label.text} variant="caption" sx={{ color: label.color }}>
//                   {label.text}
//                 </Typography>
//               ))}
//             </Box>
//           </Box>
//         </Grid>

//         {/* Task Distribution */}
//         <Grid item xs={12} sm={6}>
//           <Box textAlign="center">
//             <Typography variant="subtitle2" align="left" gutterBottom>
//               {dashboardData.taskDistribution.title}
//             </Typography>
//             <PieChart
//               series={[
//                 {
//                   data: desktopOS,
//                   highlightScope: { fade: 'global', highlight: 'item' },
//                   faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
//                   valueFormatter,
//                 },
//               ]}
//               height={dashboardData.taskDistribution.height}
//               width={dashboardData.taskDistribution.width}
//             />
//           </Box>
//         </Grid>
//       </Grid>

//       {/* Task Cards */}
//       <Box mt={4}>
//         <Grid container spacing={2}>
//           {dashboardData.tasks.map((task) => (
//             <Grid item xs={12} key={task.id}>
//               <Card sx={{ bgcolor: task.bg }}>
//                 <CardContent>
//                   <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                     {`${task.id}. ${task.title}`}
//                   </Typography>
//                   <Typography variant="body2">Benefit: {task.benefit}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// }



import React from "react";
import { Box, Typography, Grid, Card, CardContent , Button, List, ListItem } from "@mui/material";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import GaugeChart from "react-gauge-chart";
 // You need to install this or replace with another gauge

const pieData = [
  { name: "Augmentation", value: 30, color: "#FF8A00" },
  { name: "Automation", value: 40, color: "#E63946" },
  { name: "Human", value: 30, color: "#2A9D8F" },
];

const recommendations = [
  {
    title: "Master AI-Powered Product Strategies",
    benefit:
      "Lead AI integration in EdTech products, staying ahead of industry changes",
  },
  {
    title: "Develop Advanced Learning Experience Design Skills",
    benefit:
      "Create unique human-centered solutions that AI cannot easily replicate",
  },
  {
    title: "Focus on Complex Partnership Development",
    benefit:
      "Build relationships and strategies that require human judgement and leadership",
  },
  {
    title: "Strengthen Data-Driven Decision Making",
    benefit:
      "Use AI tools to enhance strategic planning and product innovation",
  },
];

export default function FoboDashboard() {
  return (
    <Box p={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold">
            FOBO Level
          </Typography>
          <Box maxWidth={250}>
            <GaugeChart
              id="gauge-chart1"
              nrOfLevels={3}
              arcsLength={[0.3, 0.4, 0.3]}
              colors={["#00C853", "#FFEB3B", "#E53935"]}
              percent={0.24}
              arcPadding={0.02}
              textColor="#000"
              formatTextValue={() => "24"}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold">
            Task Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={70}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold">
            Lorem Lpsum
          </Typography>
          <List>
            <ListItem>Lorem Lpsum</ListItem>
            <ListItem>Lorem Lpsum</ListItem>
            <ListItem>Lorem Lpsum</ListItem>
          </List>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            Recommended Growth Strategies For <strong>{"<First Name>"}</strong>
          </Typography>
          <Box mt={2} bgcolor="#F5FAFF" borderRadius={2} p={2}>
            {recommendations.map((rec, index) => (
              <Box key={index} mb={2}>
                <Typography fontWeight="bold">
                  {index + 1}. {rec.title}
                </Typography>
                <Typography variant="body2">Benefit: {rec.benefit}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" sx={{ backgroundColor: "#2C47D3" }}>
            Beat FOBO Now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

