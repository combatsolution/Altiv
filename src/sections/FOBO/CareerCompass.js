import React from 'react';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';
import TimerImage from 'src/Fogoimages/timerlogo.png';
import demoImage from 'src/images/human.png';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import ComingSoon from '../home/ComingSoon';

function CareerCompass() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        marginTop: { xs: '30px', md: '60px' },
        marginBottom: { xs: '30px', md: '60px' },
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
              display: 'block',
              mx: 'auto',
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
              justifyContent: 'center',
              textAlign: { xs: 'center', md: 'left' },
              px: { xs: 1, md: 0 },
            }}
          >
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
                sx={{
                  width: { xs: 25, md: 40 },
                  height: { xs: 30, md: 40 },
                  display: { xs: 'none', md: 'block' },
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: { xs: '30px', lg: '54px' },
                  lineHeight: '1.2',
                  letterSpacing: '2%',
                  color: '#2A4DD0',
                  textAlign: { xs: 'left', md: 'left' },
                  ml: { xs: -10, md: 1 },
                }}
              >
                Career Compass
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: { xs: '24px', md: '32px' },
                lineHeight: '30px',
                letterSpacing: '2%',
                color: '#090808',
                textAlign: { xs: 'left', md: 'left' },
              }}
            >
              Your Career GPS: Map your Future Path
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: { xs: '16px', md: '20px' },
                lineHeight: '160%',
                textAlign: { xs: 'left', md: 'left' },
                width: { lg: '538px' },
                height: { lg: '135px' },
              }}
            >
              Your career insights are generated using anonymized data patterns, keeping your
              personal information private. We will never share your analysis with anyone.
            </Typography>

            <Box
              sx={{
                pt: { xs: 1, md: 1 },
                display: 'flex',
                justifyContent: { xs: 'left', md: 'flex-start' },
              }}
            >
              <Button
                sx={{
                  width: { xs: '330px', lg: '290px' },
                  height: { xs: '48px', md: '48px' },
                  margintop:'-10px',
                  borderRadius: '29px',
                  bgcolor: '#2A4DD0',
                  color: '#ffffff',
                  textTransform: 'none',
                  fontSize: { xs: '18px', md: '16px' },
                  ml: { xs: -2, md: 0 },
                  fontWeight: 500,
               
                  '&:hover': {
                  
                    bgcolor: '#002fb3',
                    boxShadow: 'none',
                  },
                }}
                onClick={() => navigate(paths.comingSoon)}
              >
                Beat FOBO Now
              </Button>
              
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CareerCompass;
