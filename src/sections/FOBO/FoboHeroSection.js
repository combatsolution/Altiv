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
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { m } from 'framer-motion';
import { paths } from 'src/routes/paths';

const MotionBox = m(Box);
const MotionTypography = m(Typography);
const MotionButton = m(Button);

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
        px: { xs: 2, md: 0 },
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
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

      {/* Heading 1 - Slide in left */}
      <MotionTypography
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        whileHover={{ x: -8 }}
        transition={{ duration: 0.6 }}
        variant={isMobile ? 'h6' : 'h3'}
        sx={{ mb: 1, fontSize: '36px' }}
      >
        You don’t need the perfect job.
      </MotionTypography>

      {/* Heading 2 - Slide in right */}
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box
          component="img"
          src="/assets/images/impact1.svg"
          alt="impact"
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            width: '312.23px',
            height: '31.38px',
            bottom: '-15px',
            right: '170px',
            zIndex: 0,
          }}
        />

        <MotionTypography
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ x: 8 }}
          transition={{ duration: 0.6 }}
          fontWeight="bold"
          sx={{
            fontSize: { xs: '36px', sm: '48px', md: '64px', lg: '72px' },
            position: 'relative',
            display: 'inline-block',
            lineHeight: 1.2,
            zIndex: 1,
          }}
        >
          You need the right next step.
        </MotionTypography>
      </Box>

      {/* Subheading - Slide in up */}
      <MotionTypography
        component="p"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.7 }}
        sx={{
          width: { xs: '290px', lg: '70%' },
          fontSize: '18px',
          fontWeight: 400,
          mt: 3,
          maxWidth: '1064px',
          mx: 'auto',
          lineHeight: 1.6,
          textAlign: 'center',
        }}
      >
        Stand out in every application. Get actionable tips and strategic insights to enhance your
        chances. Know exactly what to improve and how to present yourself.
      </MotionTypography>

      <MotionButton
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          height: '48px',
          width: '290px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '16px',
          px: 3,
          borderRadius: '40px',
          textTransform: 'none',
          bgcolor: '#fff',
          color: '#0040D8',
          gap: '10px',
          mt: 4,
          transition: 'color 0.3s ease', // smooth text color transition
          '&:hover': {
            color: '#fff',
          },
        }}
        onClick={() => navigate(paths.comingSoon)}
      >
        Boost My Application <ArrowForwardIcon />
      </MotionButton>
    </Box>
  );
};

export default FoboHeroSection;
