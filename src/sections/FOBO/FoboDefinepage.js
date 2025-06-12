import React, { useState } from 'react';
import { Grid, Box, Typography, Stack } from '@mui/material';
import { m } from 'framer-motion';
import foboImage from 'src/Fogoimages/fobodefine.png';

const MotionBox = m(Box);
const MotionImage = m(Box);

function FoboDefineSection() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <Box
      sx={{
        mx: 'auto',
        bgcolor: '#fff',
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, sm: 4 },
        overflowX: 'hidden',
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="space-between">
        {/* Image First on Mobile, Second on Desktop */}
        <Grid item xs={12} md={6} order={{ xs: 1, md: 1 }}>
          <MotionImage
            component="img"
            src={foboImage}
            alt="Zoomable Illustration"
            initial={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }} // Zoom in on hover
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: { xs: '100%', md: '500px' },
              display: 'block',
              mx: { xs: 'auto', md: 0 },
              cursor: 'pointer',
            }}
          />
        </Grid>

        {/* Text Second on Mobile, First on Desktop */}
        <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }}>
          <Stack spacing={3} sx={{ px: { xs: 0, sm: 2 }, maxWidth: '100%' }}>
            {/* Slide-in from right */}
            <MotionBox
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Typography
                component="h1"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '36px', sm: '48px', md: '64px', lg: '72px' },
                  lineHeight: '110%',
                  letterSpacing: '-0.02em',
                  color: '#212529',
                  textAlign: { xs: 'center', md: 'left' },
                  zIndex: 2,
                }}
              >
                What is FOBO?
              </Typography>
            </MotionBox>

            <Box
              component="img"
              src="/assets/images/impact.svg"
              alt="impact decorative"
              sx={{
                display: { xs: 'block', md: 'none' },
                width: '230.46px',
                height: '32.25px',
                ml: { xs: '40px' },
                mt: '-41px',
                zIndex: 1,
              }}
            />

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
                  fontSize: { xs: '18px', lg: '18px' },
                  lineHeight: '30px',
                  letterSpacing: '-0.02em',
                  color: '#000000',
                  width: { xs: '290px', lg: '618px' },
                  ml: { xs: '30px', md: 0 },
                }}
              >
                Fear of Being Obsolete (FOBO) is the growing anxiety among professionals about AI’s
                impact on their careers. With 36% of jobs now using AI for key tasks, staying
                relevant is not optional – it is essential.
                <br />
                In your job search, FOBO can look like endless browsing, bookmarking dozens of
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
