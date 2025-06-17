


// import React from 'react';
// import { Box, Typography, Button, useMediaQuery } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { paths } from 'src/routes/paths';
// import { useTheme } from '@mui/material/styles';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import zIndex from '@mui/material/styles/zIndex';
// import { color, fontSize, width } from '@mui/system';
// import { Weight } from 'lucide-react';

// const FoboHeroSection = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Box
//       component="section"
//       sx={{
//         position: 'relative',
//         bgcolor: '#043873',
//         color: 'common.white',
//         py: { xs: 6, md: 12 },
//         px: { xs: 2, md: 0 },
//         textAlign: 'center',
//       }}
//     >
//       <img
//         src="/assets/images/impacts2.svg"
//         alt="impact"
//         style={{
//           fontSize: { xs: '20px', sm: '48px', md: '64px', lg: '36px' },

//           position: 'absolute',
//           top: '50%',
//           left: 0,
//           transform: 'translateY(-50%)',
//           zIndex: 0,
//         }}
//       />
//       {/* Small intro text */}
//       <Typography fontsize="36px" variant={isMobile ? 'h6' : 'h3'} sx={{ mb: 1 }}>
//         You don’t need the perfect job.
//       </Typography>

//       {/* Main headline */}
//       <Box sx={{ position: 'relative', width: '100%' }}>
//         <Box
//           component="img"
//           src="/assets/images/impact1.svg"
//           alt="impact"
//           sx={{
//             display: { xs: 'none', md: 'block' }, // Hide on mobile
//             position: 'absolute',
//             width: '312.23px',
//             height: '31.38px',
//             bottom: '-15px',
//             right: '170px',
//             zIndex: 0,
//           }}
//         />

//         <Typography
//           fontWeight="bold"
//           sx={{
//             fontSize: { xs: '36px', sm: '48px', md: '64px', lg: '72px' },

//             position: 'relative',
//             display: 'inline-block',
//             lineHeight: 1.2,
//             zIndex: 1,
//           }}
//         >
//           You need the right next step.
//         </Typography>
//       </Box>

//       {/* Subheading */}
//       <Typography
//         variant="body1"
//         sx={{
//           width: { xs: '290px', lg: '70%' },
//           height: { xs: 'auto', sm: '100px', lg: '60px' },
//           fontsize: { xs: '18px', lg: '18px' },
//           Weight: 400,
//           mt: 3,
//           maxWidth: '1064px',
//           mx: 'auto',
//           lineHeight: 1.6,
//           horizontalAlign: 'center',
//         }}
//       >
//         Stand out in every application. Get actionable tips and strategic insights to enhance your
//         chances. Know exactly what to improve and how to present yourself.
//       </Typography>

//       {/* Call-to-action button */}

//       <Button
//         sx={{
//           height: '48px',
//           width: '290px',
//           fontFamily: 'Inter, sans-serif',
//           fontWeight: 500,
//           fontSize: '16px',
//           px: 3,
//           borderRadius: '40px',
//           textTransform: 'none',
//           bgcolor: '#fff',
//           color: '#0040D8',
//           gap: '10px',
//           mt: 4,
//           '&:hover': {
//             bgcolor: '#fff', // No background change on hover
//             color: '#0040D8', // No color change on hover
//             boxShadow: 'none', // Remove any default shadow
//           },
//         }}
//         onClick={() => navigate(paths.comingSoon)}
//       >
//         Boost My Application <ArrowForwardIcon />
//       </Button>
//     </Box>
//   );
// };

// export default FoboHeroSection;



import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FoboHeroSection = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        onClick={() => navigate(paths.comingSoon)}
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
