// import React from 'react';
// import { Box, Grid, Typography, Button, Paper, Stack } from '@mui/material';
// import TimerImage from 'src/Fogoimages/timerlogo.webp';
// import demoImage from 'src/images/human.png';
// import { useNavigate } from 'react-router-dom';
// import { paths } from 'src/routes/paths';

// function CareerCompass() {
//   const navigate = useNavigate();

//   return (
   
//       <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
//         {/* Image */}
//         <Grid item xs={12} sm={6}>
//           <Box
//             component="img"
//             src={demoImage}
//             alt="Career Compass Illustration"
//             sx={{
//               width: {
//                 xs: '100%',
//                 sm: '80%',
//                 lg: '100%',
//               },
//               maxWidth: '525px',
//               height: 'auto',
//               display: 'block',
//               mx: 'auto',
//             }}
//           />
//         </Grid>

//         {/* Text & Buttons */}
//         <Grid item xs={12} sm={6}>
//           <Stack
//             spacing={2}
//             sx={{
//               textAlign: { xs: 'center', sm: 'left' },
//               px: { xs: 0, sm: 1 },
//             }}
//           >
//             {/* Title with Icon */}
//             <Box
//               display="flex"
//               alignItems="center"
//               justifyContent={{ xs: 'center', sm: 'flex-start' }}
//               gap={1}
//               flexWrap="wrap"
//             >
//               <Box
//                 component="img"
//                 src={TimerImage}
//                 alt="Timer Logo"
//                 sx={{
//                   display: { xs: 'none', sm: 'block' },
//                   width: { sm: 35, md: 45 },
//                   height: { sm: 35, md: 40 },
//                 }}
//               />
//               <Typography
//                 sx={{
//                   fontFamily: 'Inter, sans-serif',
//                   fontWeight: 700,
//                   fontSize: { xs: '34px', sm: '40px', md: '54px' },
//                   lineHeight: 'normal',
//                   letterSpacing: '1px',
//                   color: '#0040D8',
//                   textAlign: { xs: 'left', sm: 'left' },
//                   ml:{xs:-3, lg:'3px'}

//                 }}
//               >
//                 Career Compass
//               </Typography>
//             </Box>

//             {/* Subtitle */}
//             <Typography
//               sx={{
//                 fontFamily: 'Inter, sans-serif',
//                 fontWeight: 400,
//                 fontSize: { xs: '24px', sm: '24px', md: '32px' },
//                 color: '#090808',
//                 textAlign: { xs: 'left', sm: 'left' },
//                 width:{xs:'320px', lg:'641px'},
//                 height:{xs:'60px',lg :'45px'},
//                 mx: { xs: 'auto', sm: 0 },
                
//               }}
//             >
//               Your Career GPS: Map your Future Path
//             </Typography>

//             {/* Description */}
//             <Typography
//               sx={{
//                 fontFamily: 'Roboto',
//                 fontWeight: 400,
//                 fontSize: { xs: '16px', md: '20px' },
//                 lineHeight: 1.6,
//                 color: 'text.secondary',
//                width:{xs:'310px', lg:'641px'},
//                 height:{xs:'130px',lg :'65px'},
//                 mx: { xs: 'auto', sm: 0 },
//                 textAlign: { xs: 'left', sm: 'left' },

//               }}
//             >
//               Discover where you stand and where you could go next. Get personalized career
//               predictions, explore alternative paths, and build a roadmap to your dream role.
//               Powered by AI, tailored to you.
//             </Typography>

//             {/* Buttons */}
//             <Stack
//               direction={{ xs: 'column', sm: 'row' }}
//               spacing={2}
//               justifyContent={{ xs: 'center', sm: 'flex-start' }}
//               alignItems="center"
//               // paddingtop={{xs:0, lg:'20px'}}
//               pt={5}
//             >
//               <Button
//                 variant="contained"
//                 onClick={() => navigate(paths.comingSoon)}
//                 sx={{
//                   width: { xs: '360px' },
//                   height: '45px',
//                   minWidth: 160,
//                   borderRadius: '29px',
//                   bgcolor: '#0040D8',
//                   color: '#fff',
//                   textTransform: 'none',
//                   '&:hover': { bgcolor: '#0033b3' },
//                 }}
//               >
//                 Analyze my resume
//               </Button>
//               <Button
//                 variant="outlined"
//                 onClick={() => navigate(paths.comingSoon)}
//                 sx={{
//                   minWidth: 160,
//                   height: '45px',
//                   borderRadius: '29px',
//                   border: '1px solid #0040D8',
//                   color: '#0040D8',
//                   textTransform: 'none',
//                   width: { xs: '360px' },
//                 }}
//               >
//                 Start without Resume
//               </Button>
//             </Stack>
//           </Stack>
//         </Grid>
//       </Grid>
    
//   );
// }

// export default CareerCompass;

import React from 'react';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';
import TimerImage from 'src/Fogoimages/timerlogo.webp';
import demoImage from 'src/images/human.png';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';

function CareerCompass() {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={{ xs: 3, md: 6 }}
      alignItems="center"
      justifyContent="center"
      sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 8 } }}
    >
      {/* Image */}
      <Grid item xs={12} sm={6}>
        <Box
          component="img"
          src={demoImage}
          alt="Career Compass Illustration"
          sx={{
            width: '100%',
            maxWidth: { xs: 300, sm: 400, md: 500 },
            height: 'auto',
            display: 'block',
            mx: 'auto',
          }}
        />
      </Grid>

      {/* Text & Buttons */}
      <Grid item xs={12} sm={6}>
        <Stack
          spacing={3}
          sx={{
            textAlign: { xs: 'center', sm: 'left' },
            maxWidth: { sm: '500px', md: '600px' },
            mx: { xs: 'auto', sm: 0 },
          }}
        >
          {/* Title with Icon */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
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
                fontWeight: 700,
                fontSize: { xs: '28px', sm: '36px', md: '48px' },
                lineHeight: 1.2,
                letterSpacing: '0.5px',
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
              fontWeight: 500,
              fontSize: { xs: '20px', sm: '24px', md: '28px' },
              color: '#090808',
            }}
          >
            Your Career GPS: Map your Future Path
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: { xs: '14px', md: '16px' },
              lineHeight: 1.6,
              color: 'text.secondary',
            }}
          >
            Discover where you stand and where you could go next. Get personalized career
            predictions, explore alternative paths, and build a roadmap to your dream role.
            Powered by AI, tailored to you.
          </Typography>

          {/* Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
            alignItems="center"
            sx={{ pt: 2 }}
          >
            <Button
              variant="contained"
              onClick={() => navigate(paths.comingSoon)}
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
              onClick={() => navigate(paths.comingSoon)}
              sx={{
                width: { xs: '100%', sm: 'auto' },
                minWidth: 180,
                height: 45,
                borderRadius: '29px',
                border: '1px solid #0040D8',
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
  );
}

export default CareerCompass;
