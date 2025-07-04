import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import Image from 'src/Fogoimages/girlimage.png';

const Design = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State to toggle between Play and Pause
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    setIsPlaying((prev) => !prev);
    // TODO: Add video play/pause logic here if needed
  };

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
      <Grid
        container
        spacing={4}
        direction={isMobile ? 'column' : 'row'}
        alignItems="center"
        justifyContent="center"
      >
        {/* Left: image with play overlay */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 250, sm: 300, md: 400 },
              overflow: 'hidden',
              bgcolor: 'grey.100',
              mx: 'auto',
              
            }}
          >
            <Box
              component="img"
              src={Image}
              alt="Testimonial"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <IconButton
              aria-label={isPlaying ? 'pause video' : 'play video'}
              onClick={handleToggle}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.4)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
              }}
            >
              {isPlaying ? (
                <PauseCircleOutlineIcon sx={{ fontSize: { xs: 48, md: 64 } }} />
              ) : (
                <PlayCircleOutlineIcon sx={{ fontSize: { xs: 48, md: 64 } }} />
              )}
            </IconButton>
          </Box>
        </Grid>

        {/* Right: text content */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, px: { xs: 1, md: 3 } }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 300,
                fontSize: { xs: '20px', md: '24px' },
                lineHeight: { xs: '32px', md: '56px' },
                letterSpacing: 0,
                mb: 1,
                color: 'text.secondary',
              }}
            >
              Where Are They Now?
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 300,
                fontSize: { xs: '32px', md: '40px' },
                lineHeight: { xs: '40px', md: '56px' },
                letterSpacing: 0,
                mb: 2,
              }}
            >
              “Real People, Real Progress”
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: { xs: '16px', md: '20px' },
                lineHeight: { xs: '24px', md: '28px' },
                color: 'text.primary',
              }}
            >
              Zara felt stuck reviewing 50+ UX jobs. She used Altiv’s Clarity Compass,
              picked her top 5, and applied. 3 interviews later, she accepted her dream
              Product Designer role!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Design;
