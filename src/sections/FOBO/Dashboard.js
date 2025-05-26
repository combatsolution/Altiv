// import React from 'react';
// import { Box, Grid, Paper, Typography } from '@mui/material';
// import {
//   RadialBarChart,
//   RadialBar,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   Tooltip as RechartsTooltip,
// } from 'recharts';

// // Sample JSON data
// const jsonData = {
//   gauge: {
//     value: 35,
//     min: 0,
//     max: 100,
//     thresholds: [50, 75],
//     colors: ['#4caf50', '#ff9800', '#f44336'],
//   },
//   pie: [
//     { name: 'Team leadership', value: 20, fill: '#8bc34a' },
//     { name: 'Innovative strategy', value: 15, fill: '#ffc107' },
//     { name: 'Market research', value: 18, fill: '#f44336' },
//     { name: 'Data reporting', value: 12, fill: '#e91e63' },
//     { name: 'Simple assessments', value: 10, fill: '#ff5722' },
//     { name: 'Strategic product planning', value: 25, fill: '#4caf50' },
//   ],
//   tasks: [
//     {
//       id: 1,
//       title: 'Master AI-Powered Product Strategies',
//       benefit: 'Lead AI integration in EdTech products, staying ahead of industry changes',
//       color: '#e8f5e9',
//     },
//     {
//       id: 2,
//       title: 'Develop Advanced Learning Experience Design Skills',
//       benefit: 'Create unique human-centered solutions that AI cannot easily replicate',
//       color: '#e3f2fd',
//     },
//     {
//       id: 3,
//       title: 'Focus on Complex Partnership Development',
//       benefit: 'Build relationships and strategies that require human judgement and networking',
//       color: '#f3e5f5',
//     },
//     {
//       id: 4,
//       title: 'Strengthen Data-Driven Decision Making',
//       benefit: 'Use AI tools to enhance strategic planning and product innovation',
//       color: '#fffde7',
//     },
//   ],
// };

// const Dashboard = () => {
//   const { gauge, pie, tasks } = jsonData;

//   // Determine gauge color
//   const gaugeColor = () => {
//     if (gauge.value <= gauge.thresholds[0]) return gauge.colors[0];
//     if (gauge.value <= gauge.thresholds[1]) return gauge.colors[1];
//     return gauge.colors[2];
//   };

//   return (
//     <Box p={2}>
//       <Grid container spacing={2}>
//         {/* Gauge Chart */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
//             <Typography variant="h6" gutterBottom>
//               FOBO Level
//             </Typography>
//             <RadialBarChart
//               width={250}
//               height={200}
//               cx="50%"
//               cy="80%"
//               innerRadius="20%"
//               outerRadius="90%"
//               barSize={15}
//               data={[{ name: 'level', value: gauge.value }]}
//               startAngle={180}
//               endAngle={0}
//             >
//               <RadialBar
//                 minAngle={15}
//                 clockWise
//                 dataKey="value"
//                 cornerRadius={10}
//                 fill={gaugeColor()}
//               />
//               <text
//                 x="50%"
//                 y="50%"
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 style={{ fontSize: '24px' }}
//               >
//                 {`${gauge.value}%`}
//               </text>
//             </RadialBarChart>
//           </Paper>
//         </Grid>

//         {/* Pie Chart */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Task Distribution
//             </Typography>
//             <PieChart width={300} height={250}>
//               <Pie
//                 data={pie}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 label
//               >
//                 {pie.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.fill} />
//                 ))}
//               </Pie>
//               <Legend verticalAlign="bottom" height={36} />
//               <RechartsTooltip />
//             </PieChart>
//           </Paper>
//         </Grid>

//         {/* Task List */}
//         <Grid item xs={12}>
//           <Grid container spacing={2}>
//             {tasks.map((task) => (
//               <Grid item xs={12} key={task.id}>
//                 <Paper
//                   elevation={1}
//                   sx={{ backgroundColor: task.color, p: 2 }}
//                 >
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {`${task.id}. ${task.title}`}
//                   </Typography>
//                   <Typography variant="body2" mt={1}>
//                     <strong>Benefit:</strong> {task.benefit}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';

// Data-driven JSON
const dashboardData = {
  fobo: {
    title: 'FOBO Level',
    image: {
      src: 'https://storage.googleapis.com/a1aa/image/32505381-947d-400e-4f6d-45f51201b2a9.jpg',
      alt: 'Gauge meter with green, yellow, orange, red zones and needle pointing to Moderate',
      size: 150
    },
    labels: [
      { text: 'Good', color: 'green' },
      { text: 'Moderate', color: 'orange' },
      { text: 'Sat', color: 'red' }
    ]
  },
  taskDistribution: {
    title: 'Task Distribution',
    image: {
      src: 'https://storage.googleapis.com/a1aa/image/30ceabdf-8f23-44ce-7b87-20f843c15780.jpg',
      alt: 'Pie chart with red, green and yellow segments and legend showing Augmentation and Automation',
      size: 150
    }
  },
  tasks: [
    {
      id: 1,
      title: 'Master AI-Powered Product Strategies',
      benefit: 'Lead AI integration in EdTech products, staying ahead of industry changes.',
      bg: 'rgba(220, 252, 231, 0.7)' // green-50
    },
    {
      id: 2,
      title: 'Develop Advanced Learning Experience Design Skills',
      benefit: 'Create unique human-centered solutions that AI cannot easily replicate.',
      bg: 'rgba(219, 234, 254, 0.7)' // blue-50
    },
    {
      id: 3,
      title: 'Focus on Complex Partnership Development',
      benefit: 'Build relationships and strategies that require human judgement and networking.',
      bg: 'rgba(253, 242, 248, 0.7)' // pink-50
    },
    {
      id: 4,
      title: 'Strengthen Data-Driven Decision Making',
      benefit: 'Use AI tools to enhance strategic planning and product innovation.',
      bg: 'rgba(254, 249, 195, 0.7)' // yellow-50
    }
  ]
};

const dashboard = () => (
  <Box sx={{ p: 2, bgcolor: '#fff', color: '#000', fontFamily: 'sans-serif' }}>
    <Grid container spacing={4} justifyContent="center">
      {/* FOBO Level and Task Distribution Charts */}
      <Grid item xs={12} sm={6}>
        <Box textAlign="center">
          <Typography variant="subtitle2" align="left" gutterBottom>
            {dashboardData.fobo.title}
          </Typography>
          <Box component="img"
            src={dashboardData.fobo.image.src}
            alt={dashboardData.fobo.image.alt}
            sx={{ width: dashboardData.fobo.image.size, height: dashboardData.fobo.image.size, mx: 'auto' }}
          />
          <Box display="flex" justifyContent="space-between" maxWidth={dashboardData.fobo.image.size} mx="auto" mt={1}>
            {dashboardData.fobo.labels.map((label) => (
              <Typography key={label.text} variant="caption" sx={{ color: label.color }}>
                {label.text}
              </Typography>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box textAlign="center">
          <Typography variant="subtitle2" align="left" gutterBottom>
            {dashboardData.taskDistribution.title}
          </Typography>
          <Box component="img"
            src={dashboardData.taskDistribution.image.src}
            alt={dashboardData.taskDistribution.image.alt}
            sx={{ width: dashboardData.taskDistribution.image.size, height: dashboardData.taskDistribution.image.size, mx: 'auto' }}
          />
        </Box>
      </Grid>
    </Grid>

    {/* Task Cards List */}
    <Box mt={4}>
      <Grid container spacing={2}>
        {dashboardData.tasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <Card sx={{ bgcolor: task.bg }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {`${task.id}. ${task.title}`}
                </Typography>
                <Typography variant="body2">
                  Benefit: {task.benefit}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

export default dashboard;
