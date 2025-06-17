import React, { useState } from 'react';
import { Grid, Box, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import { m } from 'framer-motion';
import foboImage from 'src/Fogoimages/fobodefine.png';

const MotionBox = m(Box);
const MotionImage = m(Box);

function FoboDefineSection() {
  const [zoomed, setZoomed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        mx: 'auto',
        bgcolor: '#fff',
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 6, sm: 8, md: 10 },
        maxWidth: '1400px',
        overflowX: 'hidden',
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Image Section */}
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <MotionImage
            component="img"
            src={foboImage}
            alt="Zoomable Illustration"
            initial={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: { xs: '100%', md: '500px' },
              mx: 'auto',
              display: 'block',
              cursor: 'pointer',
            }}
          />
        </Grid>

        {/* Text Section */}
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}> 
          <Stack spacing={4} sx={{ maxWidth: '100%' }}>
            {/* Animated Heading */}
            <MotionBox
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              sx={{ position: 'relative', width: '100%' }}
            >
              {/* Decorative SVG Behind Heading (Visible only on mobile) */}
              <Box
                component="img"
                src="/assets/images/impact.svg"
                alt="impact decorative"
                sx={{
                  position: 'absolute',
                  top: '75%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0,
                  display: { xs: 'block', md: 'none' },
                  width: '230px',
                  height: '32px',
                  pointerEvents: 'none',
                }}
              />

              <Typography
                component="h1"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: {
                    xs: '32px',
                    sm: '40px',
                    md: '52px',
                    lg: '64px',
                  },
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: '#212529',
                  textAlign: { xs: 'center', md: 'left' },
                  zIndex: 1,
                  position: 'relative',
                }}
              >
                What is FOBO?
              </Typography>
            </MotionBox>

            {/* Animated Paragraph */}
            <MotionBox
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <Typography
                component="p"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: { xs: '16px', sm: '18px' },
                  lineHeight: { xs: '28px', sm: '30px' },
                  color: '#000',
                  textAlign: { xs: 'left', md: 'left' },
                  px: { xs: 2, sm: 0 },
                  maxWidth: { xs: '100%', md: '620px' },
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                Fear of Being Obsolete (FOBO) is the growing anxiety among professionals about
                AI’s impact on their careers. With 36% of jobs now using AI for key tasks,
                staying relevant is not optional – it is essential. In your job search, FOBO can look like endless browsing, bookmarking dozens of
                roles... but never applying.
              </Typography>
            </MotionBox>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FoboDefineSection;
