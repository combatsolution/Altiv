// import React from 'react';
// import { Box, Typography, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';

// import humanimg from 'src/Fogoimages/user-plus-duotone 1.png';
// import cloudimg from 'src/Fogoimages/cloud-arrow-up-duotone 1.png';
// import signimg from 'src/Fogoimages/circle-wavy-check-duotone 1.png';
// import searchimg from 'src/Fogoimages/magnifying-glass-plus-duotone 1.png';

// const steps = [
//   {
//     title: 'Task Analysis',
//     description: 'Learn which tasks in your role can be AI-augmented vs automated',
//     icon: humanimg,
//   },
//   {
//     title: 'AI-vantage Score',
//     description: 'Track your AI readiness against industry benchmarks',
//     icon: cloudimg,
//     highlight: true,
//   },
//   {
//     title: 'Skill Validation',
//     description: 'Verify which of your current skills remain valuable',
//     icon: searchimg,
//   },
//   {
//     title: 'Growth Navigator',
//     description: 'Get personalized recommendations to future-proof your career',
//     icon: signimg,
//   },
// ];

// const WorkingProcessSection = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Box sx={{ bgcolor: '#003366', color: '#fff', py: 8, px: 3, textAlign: 'center' }}>
//       {/* Section Header */}
//       <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '24px', mb: 1 }}>
//         How Altiv Helps You Beat FOBO
//       </Typography>
//       <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '40px', mb: 6 }}>
//         Real solutions, not theory: Your practical AI game plan
//       </Typography>

//       {/* Cards */}
//       <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="center">
//         {steps.map((step, index) => {
//           const isHighlight = step.highlight || index === 1;

//           return (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Box display="flex" flexDirection="column" alignItems="center" position="relative">
//                 {/* Arrow lines if needed */}
//                 {!isMobile && index === 1 && (
//                   <Box component="img" src="/assets/images/arrow.svg" alt="arrow"
//                     sx={{ position: 'absolute', bottom: 180, left: -160, width: 215, height: 40 }} />
//                 )}
//                 {!isMobile && index === 2 && (
//                   <Box component="img" src="/assets/images/arrow0.svg" alt="arrow"
//                     sx={{ position: 'absolute', bottom: 90, left: -130, width: 215, height: 80 }} />
//                 )}
//                 {!isMobile && index === 3 && (
//                   <Box component="img" src="/assets/images/arrow.svg" alt="arrow"
//                     sx={{ position: 'absolute', bottom: 180, left: -160, width: 215, height: 40 }} />
//                 )}

//                 {/* Card */}
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     width: isMobile ? 200 : 312,
//                     height: isMobile ? 200 : 224,
//                     p: isMobile ? 2 : 3,
//                     borderRadius: 3,
//                     bgcolor: 'transparent',
//                     color: '#fff',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     textAlign: 'center',
//                     gap: isMobile ? 1.5 : 2,
//                     mx: 'auto',
//                     transition: 'all 0.3s ease',
//                     cursor: 'pointer',
//                     '&:hover': {
//                       bgcolor: '#fff',
//                       color: '#000',
//                       '& .iconBox': {
//                         bgcolor: '#0A65CC',
//                       },
//                       '& .descriptionText': {
//                         color: '#767F8C',
//                       },
//                       '& .iconBox img': {
//                         filter: 'brightness(0) invert(1)',
//                       },
//                     },
//                   }}
//                 >
//                   {/* Icon Circle */}
//                   <Box
//                     className="iconBox"
//                     sx={{
//                       width: isMobile ? 56 : 72,
//                       height: isMobile ? 56 : 72,
//                       borderRadius: '50%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       p: isMobile ? 1.5 : 2,
//                       bgcolor:'#fff',
//                       transition: 'all 0.3s ease',
//                     }}
//                   >
//                     <img
//                       src={step.icon}
//                       alt={`${step.title} icon`}
//                       style={{
//                         width: isMobile ? 24 : 28,
//                         height: isMobile ? 24 : 28,
//                         filter: isHighlight ? 'brightness(0) invert(1)' : 'none',
//                         transition: 'filter 0.3s ease',
//                       }}
//                     />
//                   </Box>

//                   {/* Title */}
//                   <Typography
//                     sx={{
//                       fontFamily: 'Inter',
//                       fontWeight: 600,
//                       fontSize: isMobile ? 16 : 18,
//                       transition: 'color 0.3s ease',
//                     }}
//                   >
//                     {step.title}
//                   </Typography>

//                   {/* Description */}
//                   <Typography
//                     className="descriptionText"
//                     sx={{
//                       fontFamily: 'Inter',
//                       fontWeight: 400,
//                       fontSize: isMobile ? 12 : 14,
//                       lineHeight: isMobile ? '18px' : '20px',
//                       color: '#C3DCFF',
//                       transition: 'color 0.3s ease',
//                     }}
//                   >
//                     {step.description}
//                   </Typography>
//                 </Paper>
//               </Box>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// };

// export default WorkingProcessSection;
import React from 'react';
import { Box, Typography, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import VerifiedIcon from '@mui/icons-material/Verified';

const steps = [
  {
    title: 'Task Analysis',
    description: 'Learn which tasks in your role can be AI-augmented vs automated',
    icon: PersonIcon,
  },
  {
    title: 'AI-vantage Score',
    description: 'Track your AI readiness against industry benchmarks',
    icon: CloudCircleIcon,
  },
  {
    title: 'Skill Validation',
    description: 'Verify which of your current skills remain valuable',
    icon: SavedSearchIcon,
  },
  {
    title: 'Growth Navigator',
    description: 'Get personalized recommendations to future-proof your career',
    icon: VerifiedIcon,
  },
];

const WorkingProcessSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: '#003366', color: '#fff', py: 8, px: 3, textAlign: 'center' }}>
      <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '24px', mb: 1 }}>
        How Altiv Helps You Beat FOBO
      </Typography>
      <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '40px', mb: 6 }}>
        Real solutions, not theory: Your practical AI game plan
      </Typography>

      <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="center">
        {steps.map((step, index) => {
          const IconComponent = step.icon;

          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  width: isMobile ? 200 : 312,
                  height: isMobile ? 200 : 224,
                  p: isMobile ? 2 : 3,
                  borderRadius: 3,
                  bgcolor: 'transparent',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: isMobile ? 1.5 : 2,
                  mx: 'auto',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#fff',
                    color: '#000',
                    '& .iconBox': {
                      bgcolor: '#0A65CC',
                    },
                    '& .iconBox svg': {
                      color: '#fff',
                    },
                    '& .descriptionText': {
                      color: '#767F8C',
                    },
                  },
                }}
              >
                <Box
                  className="iconBox"
                  sx={{
                    width: isMobile ? 56 : 72,
                    height: isMobile ? 56 : 72,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: isMobile ? 1.5 : 2,
                    bgcolor: '#fff',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <IconComponent
                    sx={{
                      fontSize: isMobile ? 24 : 32,
                      color: '#0A65CC',
                      transition: 'color 0.3s ease',
                    }}
                  />
                </Box>

                <Typography
                  sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: isMobile ? 16 : 18 }}
                >
                  {step.title}
                </Typography>

                <Typography
                  className="descriptionText"
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: isMobile ? 12 : 14,
                    lineHeight: isMobile ? '18px' : '20px',
                    color: '#C3DCFF',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default WorkingProcessSection;
