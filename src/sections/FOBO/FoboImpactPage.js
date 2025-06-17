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
        py: { xs: 4, sm: 6, md: 8 },
       
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
                      xs: '36px',
                      sm: '42px',
                      md: '60px',
                      lg: '72px',
                    },
                    lineHeight: 1.1,
                    color: '#212529',
                    mx:{xs:2}

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
                    bottom: { xs: '-10px', md: '11px' },
                    right: { xs: '15px', md: '42px' },
                    zIndex: -1,
                    width: { xs: '170px', md: '324px' },
                    // height: { xs: '49px', md: '300px' },
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
                  width: { xs: '100%', sm: '90%', md: '100%' },
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
