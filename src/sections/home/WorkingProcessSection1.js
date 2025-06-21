import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery, Button } from '@mui/material';
import { m } from 'framer-motion';

import PersonIcon from '@mui/icons-material/Person';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import VerifiedIcon from '@mui/icons-material/Verified';
import { paths } from 'src/routes/paths';
import {  useNavigate } from 'react-router';

const steps = [
  {
    title: 'Clarity Compass',
    description: 'Prioritize what matters most in your career.',
    icon: PersonIcon,
  },
  {
    title: 'Decision Confidence Score',
    description: 'Know when a role truly fits your goals.',
    icon: CloudCircleIcon,
    highlight: true,
  },
  {
    title: 'Better Option Tracker',
    description: 'Save only a handful of roles that really match.',
    icon: SavedSearchIcon,
  },
  {
    title: 'Momentum Boosters',
    description: 'Encouraging nudges to keep you moving.',
    icon: VerifiedIcon,
  },
];

const WorkingProcessSection1 = () => {
  const Navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollRef = useRef(null);

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

  // const handleCheckAI = () => {
  //   const nextSection = document.getElementById('next-section');
  //   if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <Box sx={{ bgcolor: '#000', color: '#fff', py: 8, px: 3, textAlign: 'center' }}>
      <Typography
        sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: isMobile ? '20px' : '24px', mb: 1 }}
      >
        How Altiv Helps You
      </Typography>
      <Typography
        sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: isMobile ? '24px' : '40px', mb: 2 }}
      >
        Beat FOBO
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: isMobile ? '28px' : '40px',
          mb: isMobile ? 4 : 6,
        }}
      >
        Altiv = Your FOBO-Fighting Partner
      </Typography>

      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Box
          ref={scrollRef}
          sx={{
            display: { xs: 'flex', sm: 'grid' },
            gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, sm: 3 },
            overflowX: { xs: 'auto', sm: 'unset' },
            px: { xs: 1, sm: 0 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollSnapType: isMobile ? 'x mandatory' : 'none',
          }}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <React.Fragment key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    scrollSnapAlign: isMobile ? 'start' : 'none',
                    minWidth: { xs: '100%', sm: 'auto' },
                    maxWidth: { xs: '100%', sm: '320px' },
                    mx: isMobile ? 'auto' : 0,
                    height: { xs: 260, sm: 240 },
                    p: { xs: 3, sm: 3 },
                    borderRadius: 3,
                    bgcolor: 'transparent',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
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
                    position: 'relative', // Added for positioning the arrow
                  }}
                >
                  {/* Card content remains the same */}
                  <Box
                    className="iconBox"
                    sx={{
                      width: { xs: 56, sm: 64 },
                      height: { xs: 56, sm: 64 },
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: '#fff',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: { xs: 28, sm: 32 },
                        color: '#0A65CC',
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: 600,
                      fontSize: { xs: 16, sm: 18 },
                      fontFamily: 'Inter',
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    className="descriptionText"
                    sx={{
                      mt: 1,
                      fontWeight: 400,
                      fontSize: { xs: 13, sm: 14 },
                      lineHeight: 1.5,
                      color: '#C3DCFF',
                      fontFamily: 'Inter',  
                    }}
                  >
                    {step.description}
                  </Typography>

                  {/* Add arrow after the first card */}
                  {index === 0 && (
                    <Box
                      component="img"
                      src="/assets/images/arrow1.svg"
                      alt="impact decorative"
                      sx={{
                        position: 'absolute',
                        top: 9,

                        left: { xs: '15px', md: '180px' },
                        width: { xs: '170px', md: '222px' },
                        display: { xs: 'none', sm: 'block' }, // Only show on desktop
                      }}
                    />
                  )}

                  {index === 1 && (
                    <Box
                      component="img"
                      src="/assets/images/arrow2.svg"
                      alt="impact decorative"
                      sx={{
                        position: 'absolute',
                        bottom: 110,
                        left: { xs: '15px', md: '185px' },
                        width: { xs: '170px', md: '222px' },
                        display: { xs: 'none', sm: 'block' }, // Only show on desktop
                      }}
                    />
                  )}

                  {index === 2 && (
                    <Box
                      component="img"
                      src="/assets/images/arrow1.svg"
                      alt="impact decorative"
                      sx={{
                        position: 'absolute',
                        top: 9,

                        left: { xs: '15px', md: '180px' },
                        width: { xs: '170px', md: '222px' },
                        display: { xs: 'none', sm: 'block' }, // Only show on desktop
                      }}
                    />
                  )}
                </Paper>
              </React.Fragment>
            );
          })}

         
        </Box>
         <Box sx={{ mt: isMobile ? 4 : 6, display: 'flex', justifyContent: 'center' }}>
            <Button
              // onClick={handleCheckAI}
              onClick={() => Navigate(paths.comingSoon)}
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: isMobile ? '16px' : '16px',
                textTransform: 'none',
                bgcolor: '#0A65CC',
                borderRadius: isMobile ? '4px' : '24px',
                px: isMobile ? 3 : 4,
                py: 1.5,
                minWidth: isMobile ? '100%' : 'auto',
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
    </Box>
  );
};

export default WorkingProcessSection1;
