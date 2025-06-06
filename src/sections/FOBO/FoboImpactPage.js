import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Button,
  Typography,
  Grid,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState, useRef } from 'react';
import Impact from 'src/Fogoimages/impact.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { paths } from 'src/routes/paths';

function FoboImpactPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState('resume');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newType) => {
    if (newType !== null) {
      setUploadType(newType);
    }
  };

  const handleClose = () => setOpen(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file.name);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 3 }, py: { xs: 4, sm: 6, md: 6 } }}>
      <Grid container spacing={4} alignItems="center">
        {/* Image First on Mobile */}
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ mt: { xs: 2, md: 0 } }}>
          <Box
            component="img"
            src={Impact}
            alt="Impact"
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              maxWidth: '685px',
            }}
          />
        </Grid>

        {/* Text Second on Mobile */}
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }} pl={{ md: '35px' }}>
          <Stack spacing={3}>
            <Box component="div" sx={{ position: 'relative', paddingLeft:{xs:'0px', lg:'2em'}, }}>
              <Typography
                component="h1"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '38px', sm: '40px', md: '72px' },
                  lineHeight: '100%',
                  letterSpacing: '-2%',
                  color: '#212529',
                   textAlign: { xs: 'center', md: 'left' },
                  
                }}
              >
                How FOBO <br />
                Impacts You
              </Typography>

              <Box
                component="img"
                src="/assets/images/impact.svg"
                alt="impact decorative"
                sx={{
                  position: 'absolute',

                  bottom: { xs: '-10px', md: '-15px' },
                  right: { xs: '15px', md: '170px' },

                  zIndex: -10,
                  display: { xs: 'flex', md: 'block' },

                  width: { xs: '147px', md: '324.23px' },
                }}
              />
            </Box>

            <Typography
              component="ul"
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '17px',
                lineHeight: '30px', 
                letterSpacing: '-0.02em',
                color: '#212529',
                paddingLeft: '3em', // ensures bullets are aligned
                margin: 0,
                width:{ xs: '290px', md: '619px' },
              }}
            >
              <li>Decreased confidence in career decisions</li>
              <li>Uncertainty about which skills to develop</li>
              <li>Stress about keeping pace with AI advances</li>
              <li>Missed opportunities for AI augmentation</li>
              <li>Decision paralysis about upskilling</li>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FoboImpactPage;
