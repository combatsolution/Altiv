import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import VerifiedIcon from '@mui/icons-material/Verified';

const steps = [
  {
    title: 'Task Analysis',
    description: 'Learn which tasks in your role can be AI-augmented vs automated',
    icon: PersonIcon,
  },  
  {
    title: 'AI-vantage Score',
    description: 'Track your AI readiness against industry benchmarks',
    icon: CloudCircleIcon,
  },
  {
    title: 'Skill Validation',
    description: 'Verify which of your current skills remain valuable',
    icon: SavedSearchIcon,
  },
  {
    title: 'Growth Navigator',
    description: 'Get personalized recommendations to future-proof your career',
    icon: VerifiedIcon,
  },
];

const WorkingProcessSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollRef = useRef(null);

  // Automatic carousel scroll effect for mobile
  useEffect(() => {
    const container = scrollRef.current;
    if (!isMobile || !container) {
      return undefined; // ✅ consistent-return even when not doing anything
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % steps.length;
      const scrollAmount = container.offsetWidth * currentIndex;
      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <Box sx={{ bgcolor: '#003366', color: '#fff', py: 8, px: 3, textAlign: 'center' }}>
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '24px',
          mb: 1,
          width: { xs: '275px', sm: '100%', md: '100%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ml: { xs: '4px' },
        }}
      >
        How Altiv Helps You Beat FOBO
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '40px',
          mb: 6,
          width: { xs: '275px', sm: '100%', md: '100%' },
          ml: { xs: '4px' },
          alignItems: 'center',
        }}
      >
        Real solutions, not theory: Your practical AI game plan
      </Typography>

      <Box
        ref={scrollRef}
        sx={{
          display: isMobile ? 'flex' : 'grid',
          gridTemplateColumns: isMobile ? 'none' : 'repeat(4, 1fr)',
          gap: isMobile ? 2 : 4,
          overflowX: isMobile ? 'auto' : 'unset',
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari
          },
          scrollSnapType: isMobile ? 'x mandatory' : 'none',
          scrollBehavior: 'smooth',
          px: isMobile ? 1 : 0,
        }}
      >
        {steps.map((step, index) => {
          const IconComponent = step.icon;
 
          return (

            
            <Paper
              key={index}
              elevation={0}
              sx={{
                minWidth: isMobile ? '100%' : 312,
                maxWidth: isMobile ? '100%' : 'auto',
                height: isMobile ? 240 : 224,
                flexShrink: 0,
                p: 3,
                borderRadius: 3,
                bgcolor: 'transparent',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                scrollSnapAlign: isMobile ? 'start' : 'none',
                transition: 'all 0.3s ease',
                mx: isMobile ? 'auto' : 'initial',
                '&:hover': {
                  bgcolor: '#fff',
                  color: '#000',
                  '& .iconBox': {
                    bgcolor: '#0A65CC',
                  },
                  '& .iconBox svg': {
                    color: '#fff',
                  },
                  '& .descriptionText': {
                    color: '#767F8C',
                  },
                },
              }} >
                
              

              <Box
                className="iconBox" 
                sx={{
                  width: isMobile ? 56 : 72,
                  height: isMobile ? 56 : 72,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
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

              <Typography
                sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: isMobile ? 16 : 18, mt: 2 }}
              >
                {step.title}
              </Typography>

              <Typography
                className="descriptionText"
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: isMobile ? 12 : 14,
                  lineHeight: isMobile ? '18px' : '20px',
                  color: '#C3DCFF',
                  mt: 1,
                }}
              >
                {step.description}
              </Typography>
            </Paper>
            
          );
        })}
      </Box>
    </Box>
  );
};

export default WorkingProcessSection;
