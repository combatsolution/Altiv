import React from 'react';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';
import TimerImage from 'src/Fogoimages/timerlogo.webp';
import demoImage from 'src/images/human.png';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import { trackEvent } from 'src/utils/google-analytics';

function CareerCompass() {
  const navigate = useNavigate();


  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: 'auto', // 👈 center horizontally
      }}
    >
      <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center" justifyContent="center">
        {/* Image Section */}
        <Grid item xs={12} sm={6}>
          <Box
            component="img"
            src={demoImage}
            alt="Career Compass Illustration"
            sx={{
              width: '100%',
              maxWidth: { xs: 400, sm: 400, md: 500 },
              height: 'auto',
              mx: 'auto',
              display: 'block',
            }}
          />
        </Grid>

        {/* Text & Actions Section */}
        <Grid item xs={12} sm={6}>
          <Stack
            spacing={2}
            sx={{
              textAlign: { xs: 'center', sm: 'left' },
              maxWidth: { sm: 500, md: 600 },
              mx: { xs: '0', sm: 0 },
            }}
          >
            {/* Title with Logo */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent={{ sm: 'flex-start' }}
              gap={1.5}
              flexWrap="wrap"
            >
              <Box
                component="img"
                src={TimerImage}
                alt="Timer Logo"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  width: { sm: 35, md: 45 },
                  height: { sm: 35, md: 45 },
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                   fontWeight:700,
                  fontSize: {
                    xs: '34px',
                    lg: '54px',
                  },
                  lineHeight: '30px', // or '64px' if specific line-height is needed
                  letterSpacing: '1%',
                  display: 'flex', // alignItems: 'center',
                  justifyContent: { xs: 'left', md: 'flex-start' },
                  mx: { xs: 1, md: 0 },
                  color: '#0040D8',
                }}
              >
                Career Compass
              </Typography>
            </Box>

            {/* Subtitle */}
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                lineHeight: 'normal', // or '64px' if specific line-height is needed
                letterSpacing: '0.64px',
                justifyContent: { xs: 'left', md: 'flex-start' },
                mx: { xs: 1, md: 0 },

                color: '#090808',
                mb: '0px', // mimics paragraph spacing
                textAlign: 'left',
                fontSize: {
                  xs: '24px',
                  lg: '32px',
                },
              }}
            >
              Your Career GPS: Map your Future Path
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 400,
                fontSize: { xs: '16px', md: '16px' },
                lineHeight: 1.6,
                color: 'text.secondary',
                textAlign: 'left',
                mx: { xs: 1, md: 0 },
              }}
            >
              Discover where you stand and where you could go next. Get personalized career
              predictions, explore alternative paths, and build a roadmap to your dream role —
              powered by AI, tailored to you.
            </Typography>

            {/* Action Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
              alignItems="center"
              sx={{ pt: 2 }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  trackEvent({
                    category: 'Career Compass',
                    action: 'Analyze Resume Click',
                    label: 'Analyze my Resume Button',
                    value: 12,
                  });
                  navigate(`${"/"}?retry=resume`)
                }}
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  minWidth: 180,
                  height: 45,
                  borderRadius: '29px',
                  bgcolor: '#0040D8',
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#0033b3' },

                }}
              >
                Analyze my Resume
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  trackEvent({
                    category: 'Career Compass',
                    action: 'Start Without Resume Click',
                    label: 'Start without Resume Button',
                    value:13,
                  });
                  navigate(`${"/"}?retry=job`)
                }}
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  minWidth: 180,
                  height: 45,
                  borderRadius: '29px',
                  borderColor: '#0040D8',
                  color: '#0040D8',
                  textTransform: 'none',
                }}
              >
                Start without Resume
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box >
  );  
}

export default CareerCompass;
