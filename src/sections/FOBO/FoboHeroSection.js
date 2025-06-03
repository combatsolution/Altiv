import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom"; 
import { paths } from "src/routes/paths";
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import zIndex from '@mui/material/styles/zIndex';


const FoboHeroSection = () => {
  const navigate= useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: '#043873',
        color: 'common.white',
        py: { xs: 6, md: 12 },
        px: { xs: 2, md: 0 },
        textAlign: 'center',
      }}
    >
      <img
        src="/assets/images/impacts2.svg"
        alt="impact"
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          zIndex: 0,
        }}
      />
      {/* Small intro text */}
      <Typography
        fontsize="36px"
        variant={isMobile ? 'h6' : 'h3'}
        sx={{ mb: 1 }}

      >
        You don’t need the perfect job.
      </Typography>



      {/* Main headline */}
      <Box sx={{ position: 'relative', width: '100%' }}>
        <img
          src="/assets/images/impact1.svg"
          alt="impact"
          style={{
            position: 'absolute',
            width: '312.23px',  
            height: '31.38px',
            bottom: '-15px',
            right: '170px',
            zIndex: 0,
          }}
        />

        <Typography
          variant={isMobile ? 'h4' : 'h1'}
          fontWeight="bold"
          sx={{
            position: 'relative',
            display: 'inline-block',
            lineHeight: 1.2,
            zIndex: 1,
          }}
        >
          You need the right next step.
        </Typography>
      </Box>


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
        chances. Know exactly what to improve<br /> and how to present yourself.
      </Typography>

      {/* Call-to-action button */}
      <Button
        variant="contained"
        size="large"
        endIcon={<ArrowForwardIcon />}
        sx={{ mt: 4, px: 4, bgcolor: '#4F9CF9' }}
        onClick={()=>navigate(paths.comingSoon)}
      >
        Boost My Application
      </Button>
    </Box>
  );
};

export default FoboHeroSection;
