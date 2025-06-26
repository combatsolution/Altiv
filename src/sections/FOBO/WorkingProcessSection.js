import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { m } from 'framer-motion';

import PersonIcon from '@mui/icons-material/Person';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import VerifiedIcon from '@mui/icons-material/Verified';

const MotionTypography = m(Typography);
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
    <Box sx={{ bgcolor: '#003366', color: '#fff', py: { xs: 6, sm: 8 }, px: { xs: 2, sm: 4 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Box textAlign="center" mb={{ xs: 4, md: 6 }}>
          <MotionTypography
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              fontWeight: 500,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontFamily: 'Inter',
              mb: 1,
            }}
          >
            How Altiv Helps You Beat FOBO
          </MotionTypography>

          <MotionTypography
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              fontWeight: 500,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              fontFamily: 'Inter',
              mb: { xs: 4, sm: 5, md: 6 },
            }}
          >
            Real solutions, not theory: Your practical AI game play
          </MotionTypography>
        </Box>

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
                      src="/assets/images/arrow.svg"
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
                      src="/assets/images/arrow0.svg"
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
                      src="/assets/images/arrow.svg"
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
      </Box>
    </Box>
  );
};

export default WorkingProcessSection;

