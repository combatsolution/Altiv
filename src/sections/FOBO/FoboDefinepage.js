import React from 'react';
import { Grid, Box, Typography, Stack } from '@mui/material';
import brainImage from 'src/Fogoimages/brainimage.jpg';
import { letterSpacing, textAlign } from '@mui/system';

function FoboDefineSection() {
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
          <Box
            component="img"
            src={brainImage}
            alt="What is FOBO Illustration"
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: { xs: '100%', md: '500px' },
              display: 'block',
              mx: { xs: 'auto', md: 0 },
            }}
          />
        </Grid>

        {/* Text Second on Mobile, First on Desktop */}
        <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }}>
          <Stack spacing={3} sx={{ px: { xs: 0, sm: 2 }, maxWidth: '100%' }}>
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
            {/* <Box
              component="img"
              src="/assets/images/fobo.svg"
              alt="impact decorative"
              sx={{
                position: 'absolute',
                display: { xs: 'block', md: 'block' },
                bottom: { xs: '10px',  },
                right: { xs: '0px', },
                zIndex: -10,
                width: { xs: '147px', md: '324.23px' },
              }}
            /> */}

            {/* SVG only visible on mobile */}
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
                ml: { xs: '30px', md: 0 }, // 4px margin-left for mobile
              }}
            >
              Fear of Being Obsolete (FOBO) is the growing anxiety among professionals about AI’s
              impact on their careers. With 36% of jobs now using AI for key tasks, staying relevant
              is not optional – it is essential.
              <br />
              In your job search, FOBO can look like endless browsing, bookmarking dozens of
              roles... but never applying.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FoboDefineSection;
