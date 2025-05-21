import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import zIndex from '@mui/material/styles/zIndex';

const FoboHeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#043873',
        color: 'common.white',
        py: { xs: 6, md: 12 },
        px: { xs: 2, md: 0 },
        textAlign: 'center',
      }}
    >
      {/* Small intro text */}
      <Typography
        variant={isMobile ? 'h6' : 'subtitle1'}
        sx={{ mb: 1 }}
      >
        You don’t need the perfect job.
      </Typography>

      <box>


   
      {/* Main headline */}
      <Typography

        variant={isMobile ? 'h4' : 'h2'}
        component="h1"
        fontWeight="bold"
        sx={{
          display: 'inline-block',
          lineHeight: 1.2,
          zIndex:2
        }}
      >
        You need the right next step.
        
      </Typography>
      <img style={{ position: 'absolute', width: '250px', 
          bottom: '15px', right: '150px', zIndex: 3 }} src='/assets/images/impact.svg' alt='impact' />
   </box>
      {/* Subheading */}
      <Typography
        variant="body1"
        sx={{
          mt: 3,
          maxWidth: 600,
          mx: 'auto',
          lineHeight: 1.6,
        }}
      >
        Stand out in every application. Get actionable tips and strategic insights to enhance your
        chances. Know exactly what to improve<br/> and how to present yourself.
      </Typography>

      {/* Call-to-action button */}
      <Button
        variant="contained"
        size="large"
        endIcon={<ArrowForwardIcon />}
        sx={{ mt: 4, px: 4, bgcolor:'#4F9CF9' }}
      >
        Boost My Application
      </Button>
    </Box>
  );
};

export default FoboHeroSection;
