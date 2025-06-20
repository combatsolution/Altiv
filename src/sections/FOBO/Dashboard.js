import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, List, ListItem } from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import GaugeChart from 'react-gauge-chart';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';

const pieData = [
  { name: 'Augmentation', value: 30, color: '#FF8A00' },
  { name: 'Automation', value: 40, color: '#E63946' },
  { name: 'Human', value: 30, color: '#2A9D8F' },
];

const recommendations = [
  {
    title: 'Master AI-Powered Product Strategies',
    benefit: 'Lead AI integration in EdTech products, staying ahead of industry changes',
  },
  {
    title: 'Develop Advanced Learning Experience Design Skills',
    benefit: 'Create unique human-centered solutions that AI cannot easily replicate',
  },
  {
    title: 'Focus on Complex Partnership Development',
    benefit: 'Build relationships and strategies that require human judgement and leadership',
  },
  {
    title: 'Strengthen Data-Driven Decision Making',
    benefit: 'Use AI tools to enhance strategic planning and product innovation',
  },
];

export default function FoboDashboard() {
  const navigate = useNavigate();
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
              colors={['#00C853', '#FFEB3B', '#E53935']}
              percent={0.24}
              arcPadding={0.02}
              textColor="#000"
              formatTextValue={() => '24'}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold">
            Task Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={70} label>
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
            Recommended Growth Strategies For <strong>{'<First Name>'}</strong>
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
          <Button
            variant="contained"
            sx={{ backgroundColor: '#2C47D3' }}
            onClick={() => navigate(paths.comingSoon)}
          >
            Beat FOBO Now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
