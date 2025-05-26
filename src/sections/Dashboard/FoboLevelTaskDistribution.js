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

const FoboLevelTaskDistribution = () => (
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

export default FoboLevelTaskDistribution;
