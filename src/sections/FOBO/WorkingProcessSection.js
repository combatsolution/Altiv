import React from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import humanimg from 'src/Fogoimages/user-plus-duotone 1.png';
import cloudimg from 'src/Fogoimages/cloud-arrow-up-duotone 1.png';
import signimg from 'src/Fogoimages/circle-wavy-check-duotone 1.png';
import searchimg from 'src/Fogoimages/magnifying-glass-plus-duotone 1.png';

const steps = [
  {
    title: 'Task Analysis',
    description: 'Learn which tasks in your role can be AI-augmented vs automated',
    icon: humanimg,
  },
  {
    title: 'AI-vantage Score',
    description: 'Track your AI readiness against industry benchmarks',
    icon: cloudimg,
    highlight: true,
  },
  {
    title: 'Skill Validation',
    description: 'Verify which of your current skills remain valuable',
    icon: searchimg,
  },
  {
    title: 'Growth Navigator',
    description: 'Get personalized recommendations to future-proof your career',
    icon: signimg,
  },
];


const WorkingProcessSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: '#003366', color: '#fff', py: 8, px: 3, textAlign: 'center' }}>
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '24px',
          lineHeight: '48px',
          letterSpacing: '0%',
          textAlign: 'center',
          color: '#FFFFFF',
          mb: 1,
        }}
      >
        How Altiv Helps You Beat FOBO
      </Typography>

      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '40px',
          lineHeight: '48px',
          letterSpacing: '0%',
          textAlign: 'center',
          color: '#FFFFFF',
          mb: 6,
        }}
      >
        Real solutions, not theory: Your practical AI game plan
      </Typography>

      <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="center">

        {steps.map((step, index) => {
          const isSecond = index === 1;
          let cardBgColor = 'transparent';
          let cardTextColor = '#fff';

          if (isSecond || step.highlight) {
            cardBgColor = '#fff';
            cardTextColor = '#000';
          }



          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box display="flex" flexDirection="column" alignItems="center">

                <Paper
                  elevation={step.highlight ? 6 : 0}
                  sx={{
                    width: '312px',
                    height: '224px',
                    p: 3, // 24px padding
                    bgcolor: cardBgColor,
                    color: cardTextColor,
                    borderRadius: '12px',
                    mt: isSecond ? '20px' : 0, // Top spacing only for second card
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px', // Space between icon, title, and description
                  }}
                >

                  {/* Icon inside card now */}
                  <Box
                    sx={{
                      bgcolor: isSecond ? '#0A65CC' : '#fff',
                      color: isSecond ? '#fff' : '#767F8C',
                      width: "72px",
                      height: "72px",
                      borderRadius: '80px',
                      display: 'flex',
                      padding: "20px",
                      alignItems: 'center',
                      justifyContent: 'center',

                      gap: "2px"
                    }}
                  >
                    <img src={step.icon} alt={`${step.title} Icon`} style={{ width: 28, height: 28 }} />
                  </Box>

                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: isSecond ? 500 : 'bold',
                      fontSize: isSecond ? '18px' : undefined,
                      lineHeight: isSecond ? '28px' : undefined,
                      letterSpacing: '0%',
                      textAlign: 'center',
                      gap: "12px"
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '0%',
                      textAlign: 'center',
                      color: isSecond ? '#767F8C' : '#C3DCFF',
                    }}
                  >
                    {step.description}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          );

        })}
      </Grid>
    </Box>
  );
};

export default WorkingProcessSection;
