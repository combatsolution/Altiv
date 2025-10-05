
import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { trackEvent } from 'src/utils/google-analytics';


const FoboHeroSection = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
   const handleCTAClick = () => {
    trackEvent({
      category: 'CTA clicked',
      action: 'button clicked',
      label: 'Boost My Application',
      value: 'Navigate to Coming Soon',
    });
    navigate(paths.comingSoon);
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: '#043873',
        color: 'common.white',
        py: { xs: 6, md: 12 },
        px: { xs: 2, md: 4 },
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Illustration */}
      <Box
        component="img"
        src="/assets/images/impacts2.svg"
        alt="impact bg"
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          width: { xs: 160, sm: 200, md: 240 },
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      {/* Top Tagline */}
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: '22px', sm: '32px', md: '36px' },
          mb: 2,
          position: 'relative',
          zIndex: 1,
          fontWeight: 600,
        }}
      >
        You don’t need the perfect job.
      </Typography>

      {/* Main Headline with SVG underline */}
      <Box sx={{ position: 'relative', display: 'inline-block', zIndex: 1 }}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '32px', sm: '48px', md: '64px', lg: '72px' },
            lineHeight: 1.2,
          }}
        >
          You need the right next step.
        </Typography>

        <Box
          component="img"
          src="/assets/images/impact1.svg"
          alt="impact underline"
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            width: 312,
            height: 'auto',
            bottom: -10,
            right: { md: -60, lg: -80 },
            zIndex: -1,
          }}
        />
      </Box>

      {/* Subheading Text */}
      <Typography
        variant="body1"
        sx={{
          mt: 4,
          maxWidth: '700px',
          mx: 'auto',
          fontSize: { xs: '16px', sm: '18px' },
          lineHeight: 1.7,
          fontWeight: 400,
        }}
      >
        Stand out in every application. Get actionable tips and strategic insights to enhance your
        chances. Know exactly what to improve and how to present yourself.
      </Typography>

      {/* Call-to-Action Button */}
      <Button
        onClick={handleCTAClick}
        sx={{
          mt: 5,
          px: 4,
          py: 1.5,
          fontSize: '16px',
          borderRadius: '40px',
          bgcolor: '#fff',
          color: '#0040D8',
          fontWeight: 600,
          textTransform: 'none',
          gap: 1.5,
          '&:hover': {
            bgcolor: '#fff',
            color: '#0040D8',
            boxShadow: 'none',
          },
        }}
      >
        Boost My Application <ArrowForwardIcon />
      </Button>
    </Box>
  );
};

export default FoboHeroSection;
