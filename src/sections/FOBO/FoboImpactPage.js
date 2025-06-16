// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Stack,
//   Button,
//   Typography,
//   Grid,
//   Modal,
//   ToggleButton,
//   ToggleButtonGroup,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import { useState, useRef } from 'react';
// import Impact from 'src/Fogoimages/impact1.png';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { paths } from 'src/routes/paths';

// function FoboImpactPage() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const [uploadType, setUploadType] = useState('resume');
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleChange = (event, newType) => {
//     if (newType !== null) {
//       setUploadType(newType);
//     }
//   };

//   const handleClose = () => setOpen(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef();

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) setSelectedFile(file.name);
//   };

//   return (
//     <Box sx={{ px: { xs: 2, sm: 4, md: 3 }, py: { xs: 4, sm: 6, md: 6 } }}>
//       <Grid container spacing={4} alignItems="center">
//         {/* Image First on Mobile */}
//         <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ mt: { xs: 2, md: 0 } }}>
//           <Box
//             component="img"
//             src={Impact}
//             alt="Impact"
//             sx={{
//               width: '100%',
//               height: 'auto',
//               objectFit: 'cover',
//               maxWidth: '685px',
//             }}
//           />
//         </Grid>

//         {/* Text Second on Mobile */}
//         <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }} pl={{ md: '35px' }}>
//           <Stack spacing={3}>
//             <Box component="div" sx={{ position: 'relative', paddingLeft:{xs:'0px', lg:'2em'}, }}>
//               <Typography
//                 component="h1"
//                 sx={{
//                   fontFamily: 'Inter, sans-serif',
//                   fontWeight: 700,
//                   fontSize: { xs: '38px', sm: '40px', md: '72px' },
//                   lineHeight: '100%',
//                   letterSpacing: '-2%',
//                   color: '#212529',
//                    textAlign: { xs: 'center', md: 'left' },
                  
//                 }}
//               >
//                 How FOBO 
//                 Impacts You
//               </Typography>

//               <Box
//                 component="img"
//                 src="/assets/images/impact.svg"
//                 alt="impact decorative"
//                 sx={{
//                   position: 'absolute',

//                   bottom: { xs: '-10px', md: '-15px' },
//                   right: { xs: '15px', md: '170px' },

//                   zIndex: -10,
//                   display: { xs: 'flex', md: 'block' },

//                   width: { xs: '147px', md: '324.23px' },
//                 }}
//               />
//             </Box>

//             <Typography
//               component="ul"
//               sx={{
//                 fontFamily: 'Inter, sans-serif',
//                 fontWeight: 400,
//                 fontSize: '17px',
//                 lineHeight: '30px', 
//                 letterSpacing: '-0.02em',
//                 color: '#212529',
//                 paddingLeft: '3em', // ensures bullets are aligned
//                 margin: 0,
//                 width:{ xs: '290px', md: '619px' },
//               }}
//             >
//               <li>Decreased confidence in career decisions</li>
//               <li>Uncertainty about which skills to develop</li>
//               <li>Stress about keeping pace with AI advances</li>
//               <li>Missed opportunities for AI augmentation</li>
//               <li>Decision paralysis about upskilling</li>
//             </Typography>
//           </Stack>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default FoboImpactPage;

import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState, useRef } from 'react';
import Impact from 'src/Fogoimages/impact1.png';
import { m } from 'framer-motion';

const MotionBox = m(Box);
const MotionImage = m(Box);

function FoboImpactPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState('resume');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => setOpen(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file.name);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 4, sm: 6, md: 10 },
        maxWidth: '1400px',
        mx: 'auto',
      }}
    >
      <Grid container spacing={6} alignItems="center"  >
        {/* Text on the Left */}
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Stack spacing={4} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Box
                sx={{
                  position: 'relative',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Typography
                  component="h1"
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: {
                      xs: '32px',
                      sm: '42px',
                      md: '60px',
                      lg: '72px',
                    },
                    lineHeight: 1.1,
                    color: '#212529',
                  }}
                >
                  How FOBO Impacts You
                </Typography>

                {/* Decorative SVG */}
                <Box
                  component="img"
                  src="/assets/images/impact.svg"
                  alt="impact decorative"
                  sx={{
                    position: 'absolute',
                    bottom: { xs: '-10px', md: '-20px' },
                    right: { xs: '15px', md: '160px' },
                    zIndex: -1,
                    width: { xs: '150px', md: '300px' },
                    display: 'block',
                  }}
                />
              </Box>

              <Box
                component="ul"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: { xs: '16px', sm: '17px' },
                  lineHeight: '30px',
                  letterSpacing: '-0.02em',
                  color: '#212529',
                  paddingLeft: { xs: 3, md: 4 },
                  margin: 0,
                  textAlign: { xs: 'left', md: 'left' },
                  width: { xs: '100%', sm: '90%', md: '90%' },
                }}
              >
                <li>Decreased confidence in career decisions</li>
                <li>Uncertainty about which skills to develop</li>
                <li>Stress about keeping pace with AI advances</li>
                <li>Missed opportunities for AI augmentation</li>
                <li>Decision paralysis about upskilling</li>
              </Box>
            </Stack>
          </MotionBox>
        </Grid>

        {/* Image on the Right */}
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <MotionImage
            component="img"
            src={Impact}
            alt="Impact"
            initial={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: { xs: '100%', md: '640px' },
              mx: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default FoboImpactPage;
