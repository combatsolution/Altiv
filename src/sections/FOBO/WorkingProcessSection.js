import React from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';

const steps = [
  {
    title: 'Task Analysis',
    description: 'Learn which tasks in your role can be AI-augmented vs automated',
    icon: '👤➕', // Replace with MUI icon or SVG if needed
  },
  {
    title: 'AI-vantage Score',
    description: 'Track your AI readiness against industry benchmarks',
    icon: '📊',
    highlight: true,
  },
  {
    title: 'Skill Validation',
    description: 'Verify which of your current skills remain valuable',
    icon: '✅',
  },
  {
    title: 'Growth Navigator',
    description: 'Get personalized recommendations to future-proof your career',
    icon: '🚀',
  },
];

const WorkingProcessSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: '#003366', color: '#fff', py: 8, px: 3, textAlign: 'center' }}>
      <Typography variant="subtitle1" mb={1}>
        How Altiv Helps You Beat FOBO
      </Typography>
      <Typography variant="h4" fontWeight="bold" mb={6}>
        Real solutions, not theory: Your practical AI game plan
      </Typography>

      <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                sx={{
                  bgcolor: '#fff',
                  color: '#003366',
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  mb: 2,
                }}
              >
                {step.icon}
              </Box>

              <Paper
                elevation={step.highlight ? 6 : 0}
                sx={{
                  p: 2,
                  bgcolor: step.highlight ? '#fff' : 'transparent',
                  color: step.highlight ? '#000' : '#fff',
                  borderRadius: 2,
                  minHeight: 180,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  {step.title}
                </Typography>
                <Typography variant="body2">{step.description}</Typography>
              </Paper>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkingProcessSection;
