import React from 'react';
import { Grid, Box, Typography, Button, Stack } from '@mui/material';
import jobFeedImage from 'src/images/smartjob.png';
import SmartJoblogo from 'src/images/smartjoblogo.png';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';

function SmartJobFeed() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 8 },
        width: '100%',
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
        direction={{ xs: 'column-reverse', md: 'row' }}
      >
        {/* Text Section */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2} textAlign={{ xs: 'center', md: 'left' }}>
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: {
                  xs: '34px',
                  lg: '54px',
                },
                lineHeight: 'normal', // or '64px' if specific line-height is needed
                letterSpacing: '2%',
                display: 'flex', // alignItems: 'center',
                justifyContent: { xs: 'left', md: 'flex-start' },
                gap: 1,
                color: '#0040D8',
              }}
            >
              <Box
                component="img"
                src={SmartJoblogo}
                alt="SmartJoblogo"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  width: { sm: 35, md: 45 },
                  height: { sm: 35, md: 40 },
                  mt: 2,
                  textAlign: 'left',
                  mb: { xs: -1 },
                  fontSize: {
                    xs: '34px',
                    lg: '54px',
                  },
                }}
              />
              Smart Job Feed
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,

                lineHeight: 'normal', // or '64px' if specific line-height is needed
                letterSpacing: '0.64px',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: 1,
                color: '#090808',
                mb: '2px', // mimics paragraph spacing
                textAlign: 'left',
                fontSize: {
                  xs: '24px',
                  lg: '32px',
                },
              }}
            >
              Jobs that just click Job Feed
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 400,
                lineHeight: 1.6,
                textAlign: 'left',
                color: 'text.secondary',
                fontSize: { xs: '14px', sm: '16px', lg: '18px' },
              }}
            >
              Say goodbye to endless scrolling. Meet your job match with AI-powered precision. Each
              opportunity comes with a match score, showing exactly how you fit before you apply.
            </Typography>

            <Box pt={2} display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Button
                variant="contained"
                onClick={() => navigate(paths.comingSoon)}
                sx={{
                  width: {
                    xs: '360px',
                  },
                  bgcolor: 'primary.main',
                   color: '#fff',
                  borderRadius: '999px',
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                  textTransform: 'none',
                  ml: { xs: -1, sm: 2 },
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
                
              >
                Access Personal Matches
              </Button>
            </Box>
          </Stack>
        </Grid>

        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={jobFeedImage}
            alt="Smart Job Feed illustration"
            sx={{
              display: 'block',
              width: { xs: '100%', sm: '80%', md: '100%' },
              maxWidth: { xs: 360, md: 500 },
              height: 'auto',
              mx: { xs: 'auto', md: 'initial' },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SmartJobFeed;
