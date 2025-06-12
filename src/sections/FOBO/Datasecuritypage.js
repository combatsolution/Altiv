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
// import { he, mt, te } from 'date-fns/locale';
// import { width } from '@mui/system';

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
//     <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, sm: 6 }, overflowX: 'hidden' }}>
//       <Grid container spacing={4} alignItems="center" >
//        <Grid xs={12} md={6} order={{ xs: 2, md: 1 }}>

//           <Stack spacing={3}>
//             {/* Header */}
//             <Box sx={{ position: 'relative', width: '100%' }}>
//               <Typography
//                 component="h1"
//                 sx={{
//                   width: { xs: '290px', sm: '80%', lg: '690px' },
//                   height: { xs: 'auto', sm: '100px', md: '180px' },
//                   fontFamily: 'Inter, sans-serif',
//                   fontWeight: 700,  
//                   fontSize: { xs: '36px', sm: '48px', md: '64px' },
//                   lineHeight: '100%',
//                   letterSpacing: '-0.02em',
//                   color: '#212529', 
//                   textAlign: { xs: 'center', lg: 'left' },
//                   bottom: { xs: 0, md: '0' },
//                 }}
//               >
//                 Your data is 100% SAFE
//               </Typography> 

//               <Box
//                 component="img"
//                 src="/assets/images/impact.svg"
//                 alt="impact"
//                 sx={{
//                   position: 'absolute',
//                   bottom: { xs: '-5px', lg: '39px' },
//                   left: { xs: '130px', lg: '0' },
//                   width: { xs: '150px', sm: '250px', md: '380px' },
//                   zIndex: -1,
//                 }}
//               />
//             </Box>

//             {/* Subheading */}
//             <Typography
//               component="p"
//               sx={{
//                 fontFamily: 'Inter, sans-serif',
//                 fontWeight: 400,
//                 fontSize: '18px',
//                 lineHeight: '30px',
//                 letterSpacing: '-0.02em',
//                 color: '#212529',
//                 alignItems: { xs: 'center', lg: 'left' },
//                 textAlign: { xs: 'center', lg: 'left' },
//                 mt: { xs: 2, md: '-30px' },
//               }}
//             >
//               We ensure your data stays secure and private. Using advanced encryption, your information is protected at every step.
//                Rest assured, your data is in your hands and handled with the atmost care.
//             </Typography>

//             {/* Button */}
//             <Button
//               sx={{
//                 height: '48px',
//                 width:{ xs: 'auto', md: '290px' },
//                 fontFamily: 'Inter, sans-serif',
//                 fontWeight: 400,
//                 fontSize: '18px',
//                 px: 3,
//                 borderRadius: '40px',
//                 textTransform: 'none',
//                 backgroundColor: '#2A4DD0',
//                 color: '#fff',
//                 gap: '10px',
//                 '&:hover': {
//                   bgcolor: '#002fb3',
//                   color: '#fff', 
//                   boxShadow: 'none', 
//                 },
                
//               }}
//               onClick={() => navigate(paths.comingSoon)}
//             >
//               Read more <ArrowForwardIcon />
//             </Button>
//           </Stack>
//         </Grid>

//         {/* Image Section */}
//         <Grid xs={12} md={6} order={{ xs: 1, md: 2 }}>

//           <Box
//             component="img"
//             src={security}
//             alt="AI Coach"
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
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme, useMediaQuery } from '@mui/material';
import { useState, useRef } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { paths } from 'src/routes/paths';

import security from 'src/Fogoimages/flowstructure.png';
import { m } from 'framer-motion';

const MotionBox = m(Box);
const MotionImg = m(Box);

function Datasecuritypage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, sm: 6 }, overflowX: 'hidden' }}>
      <Grid container spacing={4} alignItems="center">
        <Grid xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <MotionBox
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Stack spacing={3}>
              {/* Header */}
              <Box sx={{ position: 'relative', width: '100%' }}>
                <Typography
                  component="h1"
                  sx={{
                    width: { xs: '290px', sm: '80%', lg: '690px' },
                    height: { xs: 'auto', sm: '100px', md: '180px' },
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: '36px', sm: '48px', md: '64px' },
                    lineHeight: '100%',
                    letterSpacing: '-0.02em',
                    color: '#212529',
                    textAlign: { xs: 'center', lg: 'left' },
                    bottom: { xs: 0, md: '0' },
                  }}
                >
                  Your data is 100% SAFE
                </Typography>

                <Box
                  component="img"
                  src="/assets/images/impact.svg"
                  alt="impact"
                  sx={{
                    position: 'absolute',
                    bottom: { xs: '-5px', lg: '39px' },
                    left: { xs: '130px', lg: '0' },
                    width: { xs: '150px', sm: '250px', md: '380px' },
                    zIndex: -1,
                  }}
                />
              </Box>

              {/* Subheading */}
              <Typography
                component="p"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '30px',
                  letterSpacing: '-0.02em',
                  color: '#212529',
                  alignItems: { xs: 'center', lg: 'left' },
                  textAlign: { xs: 'center', lg: 'left' },
                  mt: { xs: 2, md: '-30px' },
                }}
              >
                We ensure your data stays secure and private. Using advanced encryption, your
                information is protected at every step. Rest assured, your data is in your hands
                and handled with the atmost care.
              </Typography>

              {/* Button */}
              <Button
                sx={{
                  height: '48px',
                  width: { xs: 'auto', md: '290px' },
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '18px',
                  px: 3,
                  borderRadius: '40px',
                  textTransform: 'none',
                  backgroundColor: '#2A4DD0',
                  color: '#fff',
                  gap: '10px',
                  '&:hover': {
                    bgcolor: '#002fb3',
                    color: '#fff',
                    boxShadow: 'none',
                  },
                }}
                onClick={() => navigate(paths.comingSoon)}
              >
                Read more <ArrowForwardIcon />
              </Button>
            </Stack>
          </MotionBox>
        </Grid>

        {/* Image Section */}
        <Grid xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <MotionImg
            component="img"
            src={security}
            alt="AI Coach"
            initial={{ opacity: 1, x: 0 }}
            whileHover={{ x: 20 }}
            transition={{ duration: 0.5 }}
            sx={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              mt: { xs: 4, md: 0 },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Datasecuritypage;
