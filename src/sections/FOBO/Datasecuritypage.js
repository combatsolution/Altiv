// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Unstable_Grid2';
// import { useTheme, useMediaQuery } from '@mui/material';
// import { useState, useRef } from 'react';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { paths } from 'src/routes/paths';

// import security from 'src/Fogoimages/flowstructure.png';
// import { m } from 'framer-motion';

// const MotionBox = m(Box);
// const MotionImg = m(Box);

// function Datasecuritypage() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file.name);
//     }
//   };

//   return (
//     <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, sm: 6 }, overflowX: 'hidden', 
//     mt:{xs:'20px', lg:'80px'}, mb:'30px'}}>
//       <Grid container spacing={4} alignItems="center">
//         <Grid xs={12} md={6} order={{ xs: 2, md: 1 }}>
//           <MotionBox
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <Stack spacing={3}>
//               {/* Header */}
//               <Box sx={{ position: 'relative', width: '300px' }}>
//                 <Typography
//                   component="h1"
//                   sx={{
//                     width: { xs: '290px', sm: '80%', lg: '660px' },
//                     height: { xs: 'auto', sm: '100px', md: '180px' },
//                     fontFamily: 'Inter, sans-serif',
//                     fontWeight: 700,
//                     fontSize: { xs: '36px', sm: '48px', md: '64px' },
//                     lineHeight: '100%',
//                     letterSpacing: '-0.02em',
//                     color: '#212529',
//                     textAlign: { xs: 'center', lg: 'left' },
//                     bottom: { xs: 0, md: '0' },
//                   }}
//                 >
//                   Your data is 100% SAFE
//                 </Typography>

//                 <Box
//                   component="img"
//                   src="/assets/images/impact.svg"
//                   alt="impact"
//                   sx={{
//                     position: 'absolute',
//                     bottom: { xs: '-5px', lg: '39px' },
//                     left: { xs: '130px', lg: '0' },
//                     width: { xs: '150px', sm: '250px', md: '380px' },
//                     zIndex: -1,
//                   }}
//                 />
//               </Box>

//               {/* Subheading */}
//               <Typography
//                 component="p"
//                 sx={{
//                   fontFamily: 'Inter, sans-serif',
//                   fontWeight: 400,
//                   fontSize: '18px',
//                   lineHeight: '30px',
//                   letterSpacing: '-0.02em',
//                   color: '#212529',
//                   alignItems: { xs: 'center', lg: 'left' },
//                   textAlign: { xs: 'center', lg: 'left' },
//                   mt: { xs: 2, md: '-30px' },
//                 }}
//               >
//                 We ensure your data stays secure and private. Using advanced encryption, your
//                 information is protected at every step. Rest assured, your data is in your hands
//                 and handled with the atmost care.
//               </Typography>

//               {/* Button */}
//               <Button
//                 sx={{
//                   height: '48px',
//                   width: { xs: 'auto', md: '290px' },
//                   fontFamily: 'Inter, sans-serif',
//                   fontWeight: 400,
//                   fontSize: '18px',
//                   px: 3,
//                   borderRadius: '40px',
//                   textTransform: 'none',
//                   backgroundColor: '#2A4DD0',
//                   color: '#fff',
//                   gap: '10px',
//                   '&:hover': {
//                     bgcolor: '#002fb3',
//                     color: '#fff',
//                     boxShadow: 'none',
//                   },
//                 }}
//                 onClick={() => navigate(paths.comingSoon)}
//               >
//                 Read more <ArrowForwardIcon />
//               </Button>
//             </Stack>
//           </MotionBox>
//         </Grid>

//         {/* Image Section */}
//         <Grid xs={12} md={6} order={{ xs: 1, md: 2 }}>
//           <MotionImg
//             component="img"
//             src={security}
//             alt="AI Coach"
//             initial={{ opacity: 1, x: 0 }}
//             whileHover={{ x: 20 }}
//             transition={{ duration: 0.5 }}
//             sx={{
//               width: '100%',
//               maxWidth: '100%',
//               height: 'auto',
//               objectFit: 'contain',
//               mt: { xs: 4, md: 0 },
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default Datasecuritypage;
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import {
  Box,
  Stack,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { m } from 'framer-motion';

import { paths } from 'src/routes/paths';
import security from 'src/Fogoimages/flowstructure.png';

const MotionBox = m(Box);

export default function Datasecuritypage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 6, lg: 8 },
        py: { xs: 4, sm: 6, md: 8, lg: 10 },
        mx: 'auto',
        maxWidth: { lg: 1400 },
        overflowX: 'hidden',
      }}
    >
      <Grid 
        container 
        spacing={{ xs: 4, sm: 6, md: 8 }} 
        alignItems="center"
        justifyContent="center"
      >
        {/* IMAGE SECTION - Cleaned up version */}
        <Grid 
          xs={12} 
          md={6} 
          order={{ xs: 1, md: 2 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: 'transparent' // Ensures no background
          }}
        >
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'transparent' // Removes any background
            }}
          >
            <Box
              component="img"
              src={security}
              alt="Data Flow Structure"
              sx={{
                width: '100%',
                maxWidth: { xs: '400px', sm: '500px', md: '600px', lg: '650px' },
                height: 'auto',
                objectFit: 'contain',
                backgroundColor: 'transparent', // Removes image background
                boxShadow: 'none', // Explicitly removes shadow
                border: 'none', // Removes any border
                outline: 'none' // Removes focus outline
              }}
            />
          </MotionBox>
        </Grid>

        {/* TEXT SECTION (unchanged) */}
        <Grid 
          xs={12} 
          md={6} 
          order={{ xs: 2, md: 1 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <MotionBox
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            sx={{ 
              maxWidth: { xs: '100%', md: '90%', lg: '100%' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            <Stack spacing={{ xs: 3, sm: 4, md: 5 }}>
              {/* HEADING */}
              <Box sx={{ position: 'relative', width: '100%' }}>
                <Typography
                  component="h1"
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: { 
                      xs: '2rem',   // 32px
                      sm: '2.5rem', // 40px
                      md: '3rem',   // 48px
                      lg: '3.625rem' // 58px
                    },
                    lineHeight: 1.2,
                    color: 'text.primary',
                    mb: { xs: 2, md: 3 },
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  Your data is 100% SAFE
                </Typography>

                <Box
                  component="img"
                  src="/assets/images/impact.svg"
                  alt="Decorative underline"
                  sx={{
                    position: 'absolute',
                    bottom: { xs: '-4px', md: '-8px', lg: '15px' },
                    left: { xs: '50%', md: 0 },
                    transform: { xs: 'translateX(-50%)', md: 'none' },
                    width: { 
                      xs: '10rem',  // 160px
                      sm: '14rem',  // 224px
                      md: '18rem',  // 288px
                      lg: '18rem'   // 320px
                    },
                    zIndex: 0,
                    opacity: 0.9
                  }}
                />
              </Box>

              {/* SUBTEXT */}
              <Typography
                component="p"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: { 
                    xs: '1rem',    // 16px
                    sm: '1.125rem' // 18px
                  },
                  lineHeight: 1.7,
                  color: 'text.secondary',
                  px: { xs: 0, sm: 1, md: 0 },
                  maxWidth: { xs: '100%', sm: '90%', md: '100%' },
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                We ensure your data stays secure and private. Using advanced encryption, your
                information is protected at every step. Rest assured, your data is in your hands
                and handled with the utmost care.
              </Typography>

              {/* CTA BUTTON */}
              <Box 
                sx={{ 
                  mt: { xs: 1, sm: 2 },
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate(paths.comingSoon)}
                  size="large"
                  sx={{
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: '1rem',
                    borderRadius: '40px',
                    backgroundColor: 'primary.main',
                    fontWeight: 500,
                    textTransform: 'none',
                    gap: 1,
                    minWidth: { xs: '180px', sm: '200px' },
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  Read more <ArrowForwardIcon fontSize="small" />
                </Button>
              </Box>
            </Stack>
          </MotionBox>
        </Grid>
      </Grid>
    </Box>
  );
}