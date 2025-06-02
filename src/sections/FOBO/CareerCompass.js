// import React from "react";
// import { Box, Grid, Typography, Button, Paper, Stack } from "@mui/material";
// import TimerImage from 'src/Fogoimages/timerlogo.png';
// import demoImage from "src/images/human.png";
// import { useNavigate } from "react-router-dom"; 
// import { paths } from "src/routes/paths";
// import ComingSoon from "../home/ComingSoon";


// function CareerCompass() {
//   const navigate = useNavigate();
//   return (
    
//     <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: "#fff", marginTop: "60px", marginBottom: "60px" }}>
//       <Grid container spacing={4} alignItems="center">
//         <Grid item xs={12} md={6}>
//           <Box
//             component="img"
//             src={demoImage}
//             alt="Career Compass Illustration"
//             sx={{
//               Width:'551.97px',
//               Height:'397px',
//               borderRadius: 0,
//               display: "block",
//             }}
//           />
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{
//             width: '641px',
//             height: '359px',
//           }}
//         >
//           <Stack
//             spacing={2}
//             sx={{ height: '100%', justifyContent: 'center', textAlign: { xs: 'center', md: 'left' } }}
//           >
//             {/* Title with TimerImage */}
//             <Box
//               display="flex"
//               alignItems="center"
//               gap={1}
//               sx={{
//                 justifyContent: { xs: 'center', md: 'flex-start' },
//               }}
//             >
//               <Box
//                 component="img"
//                 src={TimerImage}
//                 alt="Timer Logo"
//                 sx={{ width: 40, height: 40 }} // adjust size if needed
//               />
//               <Typography
//                 sx={{
//                   fontFamily: 'Inter',
//                   fontWeight: 600,
//                   fontSize: '54px',
//                   lineHeight: '1.2',
//                   letterSpacing: '2%',
//                   color: '#2A4DD0',
//                 }}
//               >
//                 Career Compass
//               </Typography>
//             </Box>

//             {/* Subtitle */}
//             <Typography
//               sx={{
//                 fontFamily: 'Inter',
//                 fontWeight: 400,
//                 fontSize: '32px',
//                 lineHeight: '1.2',
//                 letterSpacing: '2%',
//                 color: '#090808',
//               }}
//             >
//               Your Career GPS: Map your Future Path
//             </Typography>

//             {/* Body Text */}
//             <Typography
//               sx={{
//                 fontFamily: 'Roboto',
//                 fontWeight: 400,
//                 fontSize: '20px',
//                 lineHeight: '160%',
//                 color: '#090808',
//               }}
//             >
//               Your career insights are generated using anonymized data<br />
//               patterns, keeping your personal information private. We will <br />
//               never share your analysis with anyone.
//             </Typography>

//             {/* Button */}
//             <Box
//               sx={{
//                 pt: 1,
//                 display: 'flex',
//                 justifyContent: { xs: 'center', md: 'flex-start' },
//               }}
//             >
//               <Button
//                 variant="contained"
//                 sx={{
//                   width: '203px',
//                   height: '48px',
//                   borderRadius: '29px',
//                   bgcolor: '#0040D8',
//                   color: '#ffffff',
//                   textTransform: 'none',
//                   '&:hover': { bgcolor: '#0033b3' },
//                 }}
//                  onClick={() => navigate(paths.comingsoon)}
//               >
//                 Beat FOBO Now
//               </Button>
//             </Box>
//           </Stack>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// }

// export default CareerCompass;


import React from "react";
import { Box, Grid, Typography, Button, Paper, Stack } from "@mui/material";
import TimerImage from 'src/Fogoimages/timerlogo.png';
import demoImage from "src/images/human.png";
import { useNavigate } from "react-router-dom"; 
import { paths } from "src/routes/paths";
import ComingSoon from "../home/ComingSoon";

function CareerCompass() {
  const navigate = useNavigate();
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, md: 4 }, 
        borderRadius: 2, 
        bgcolor: "#fff", 
        marginTop: { xs: "30px", md: "60px" }, 
        marginBottom: { xs: "30px", md: "60px" },
      }}
    >
      <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={demoImage}
            alt="Career Compass Illustration"
            sx={{
              maxWidth: '100%',
              height: 'auto',
              width: { xs: '100%', md: '551.97px' },
              borderRadius: 0,
              display: "block",
              mx: 'auto', // Center image on mobile
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Stack
            spacing={{ xs: 1, md: 2 }}
            sx={{ 
              width: '100%', 
              justifyContent: 'center', 
              textAlign: { xs: 'center', md: 'left' },
              px: { xs: 1, md: 0 },
            }}
          >
            {/* Title with TimerImage */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Box
                component="img"
                src={TimerImage}
                alt="Timer Logo"
                sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
              />
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: { xs: '32px', md: '54px' },
                  lineHeight: '1.2',
                  letterSpacing: '2%',
                  color: '#2A4DD0',
                }}
              >
                Career Compass
              </Typography>
            </Box>

            {/* Subtitle */}
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: { xs: '20px', md: '32px' },
                lineHeight: '1.2',
                letterSpacing: '2%',
                color: '#090808',
              }}
            >
              Your Career GPS: Map your Future Path
            </Typography>

            {/* Body Text */}
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: { xs: '16px', md: '20px' },
                lineHeight: '160%',
                color: '#090808',
              }}
            >
              Your career insights are generated using anonymized data<br />
              patterns, keeping your personal information private. We will<br />
              never share your analysis with anyone.
            </Typography>

            {/* Button */}
            <Box
              sx={{
                pt: { xs: 1, md: 1 },
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: { xs: '160px', md: '203px' },
                  height: { xs: '40px', md: '48px' },
                  borderRadius: '29px',
                  bgcolor: '#0040D8',
                  color: '#ffffff',
                  textTransform: 'none',
                  fontSize: { xs: '14px', md: '16px' },
                  '&:hover': { bgcolor: '#0033b3' },
                }}
                onClick={() => navigate(paths.comingsoon)}
              >
                Beat FOBO Now
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CareerCompass;