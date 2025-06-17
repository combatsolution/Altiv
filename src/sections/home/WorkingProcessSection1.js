import React from 'react';
import { Box, Typography, Grid, Paper, useTheme, useMediaQuery, Button } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import VerifiedIcon from '@mui/icons-material/Verified';

const steps = [
  { title: 'Clarity Compass', description: 'Prioritize what matters most in your career.', icon: PersonIcon },
  { title: 'Decision Confidence Score', description: 'Know when a role truly fits your goals.', icon: CloudCircleIcon, highlight: true },
  { title: 'Better Option Tracker', description: 'Save only a handful of roles that really match.', icon: SavedSearchIcon },
  { title: 'Momentum Boosters', description: 'Encouraging nudges to keep you moving.', icon: VerifiedIcon },
];

const WorkingProcessSection1 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCheckAI = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ bgcolor: '#000', color: '#fff', py: 8, px: 3, textAlign: 'center' }}>
      <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: isMobile ? '20px' : '24px', mb: 1 }}>How Altiv Helps You</Typography>
      <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: isMobile ? '24px' : '40px', mb: 2 }}>Beat FOBO</Typography>
      <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: isMobile ? '28px' : '40px', mb: isMobile ? 4 : 6 }}>Altiv = Your FOBO-Fighting Partner</Typography>

      <Grid container spacing={isMobile ? 2 : { xs: 4, md: 6 }} justifyContent="center">
        {steps.map((step, index) => {
          const IconComponent = step.icon;

          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  width: isMobile ? 200 : 312,
                  height: isMobile ? 200 : 224,
                  p: isMobile ? 2 : 3,
                  borderRadius: 3,
                  bgcolor: 'transparent',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: isMobile ? 1.5 : 2,
                  mx: 'auto',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#fff',
                    color: '#000',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    '& .iconBubble': {
                      bgcolor: '#0A65CC',
                      '& svg': {
                        color: '#fff'
                      }
                    },
                    '& .descText': {
                      color: '#767F8C'
                    }
                  }
                }}
              >
                {/* Icon Bubble */}
                <Box
                  className="iconBubble"
                  sx={{
                    width: isMobile ? 56 : 72,
                    height: isMobile ? 56 : 72,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: isMobile ? 1.5 : 2,
                    bgcolor: '#fff',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <IconComponent
                   
                       sx={{
                      fontSize: isMobile ? 24 : 32,
                      color: '#0A65CC',
                      transition: 'color 0.3s ease',
                    }}
                    
                  />
                </Box>

                {/* Title */}
                <Typography sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: isMobile ? 16 : 18, transition: 'color 0.3s ease' }}>
                  {step.title}
                </Typography>

                {/* Description */}
                <Typography
                  className="descText"
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: isMobile ? 12 : 14,
                    lineHeight: isMobile ? '18px' : '20px',
                    color: '#C3DCFF',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* CTA Button */}
      <Box sx={{ mt: isMobile ? 4 : 6 }}>
        <Button
          fullWidth={isMobile}
          onClick={handleCheckAI}
          sx={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: isMobile ? '16px' : '16px',
            textTransform: 'none',
            bgcolor: '#0A65CC',
            borderRadius: isMobile ? '4px' : '24px',
            px: isMobile ? 0 : 4,
            py: isMobile ? 1.5 : 1.5,
            transition: 'background-color 0.2s ease',
            '&:hover': {
              bgcolor: '#0954A6',
            },
          }}
        >
          Check AI readiness
        </Button>

    
        
      </Box>
    </Box>
  );
};

export default WorkingProcessSection1;
