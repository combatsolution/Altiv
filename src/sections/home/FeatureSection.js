import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import videoThumb from 'src/images/video-thumb.jpg';
import { fontFamily } from '@mui/system';

const FeatureSection = () => (
  <Box
    sx={{
      backgroundColor: '#F7F9FC', // Light grey transparent background
      backdropFilter: 'blur(6px)', // Optional: adds a subtle blur
      width: '100%',
    }}
  >
    <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 4, md: 8 }, maxWidth: '1197px', mx: 'auto' }}>
      <Grid
        container
        spacing={4}
        alignItems="center" 
        sx={{
          height: {
            xs: '937px', // Auto height for mobile
            md: '446px', // Fixed height for tablets and larger
          },
        }}
      >
        {/* Video Thumbnail Section */}

        <Grid item xs={12} md={6}>
          <Box
            sx={{
             display:'flex',
             alignItems:'center',
             justifyContent:'center',
              position: 'relative',
              backgroundColor: '#fff',
              width: { xs: '100%', sm: '331.93px', md: '100%' },
              maxWidth: { xs: '320px', sm: '331.93px', md: '100%' }, // limit max width on small screens
              height: { xs: '460px', sm: '470.89px', md: 400 },
              mx: { xs: 'auto', md: 0 }, // center horizontally on xs
            }}
          >
            <Box
              sx={{
                
                position: 'absolute',
                overflow: 'hidden',
                width: { xs: '290px', sm: '331.93px', md: '100%' }, // mobile-friendly width
                height: { xs: '427px', sm: '470.89px', md: 400 },
                maxWidth: '100%',
                mx: 'auto', // centers it horizontally on small screens
                backgroundColor: '#fff',
              }}
            >
              <Box
                component="img"
                src={videoThumb}
                alt="Video thumbnail"
                sx={{
                  //  p:2,
                  width: '100%',
                  height: { xs: '427px', sm: '100%' },
                  // maxHeight: { xs: '427px', sm: '100%' },
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Play button overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 50,
                  cursor: 'pointer',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                ▶
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Text Content Section */}

        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            height="446px"
            sx={{ ml: { xs: 0, md: 3 } }}
          >
            {[
              {
                title: 'Future-Proof Your Career',
                body: `See around corners with AI-powered career predictions.
                       Understand upcoming trends, identify growth opportunities,
                       and plan your next moves with precision.`,
              },
              {
                title: 'Apply Smarter, Not Harder',
                body: `Focus on opportunities that matter. Get matched to roles that
                       fit your profile with insights on your match strength and
                        tips to improve your chances.`,
              },
              {
                title: 'Master Your Career Journey',
                body: `Transform uncertainty into opportunity with your AI career
                       partner. Get personalized guidance for everything from skill
                       development to salary negotiations.`,
              },
            ].map((item, index) => (
              <Box key={index} marginTop={1}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 300,
                    fontSize: {
                      xs: '24px',
                      lg: '32px',
                    },
                    lineHeight: '28px',
                    letterSpacing: '0%',
                    color: '#090808',
                    mt: { xs: '0px', md: 1.5 },
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontFamily: 'roboto',
                    fontWeight: 300,
                    fontSize: {
                      xs: '16px',
                      lg: '19px',
                    },
                    lineHeight: '160%',
                    width: {
                      xs: '100%', // Responsive on mobile
                      sm: '100%',
                      md: '500px', // Fixed from tablet upward
                    },
                    height: {
                      xs: 'auto', // Auto height on mobile
                      sm: 'auto',
                      md: '69px', // Fixed from tablet upward
                    },
                    mt: '3px',
                    mb: '10px',
                  }}
                >
                  {item.body}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default FeatureSection;
