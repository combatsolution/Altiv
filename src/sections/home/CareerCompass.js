import React from "react";
import { Box, Grid, Typography, Button, Paper, Stack } from "@mui/material";
import TimerImage from "src/Fogoimages/timerlogo.png";
import demoImage from "src/images/human.png";
import { useNavigate } from 'react-router-dom';
import { paths } from "src/routes/paths";

function CareerCompass() {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "#fff",
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, md: 8 },
        mt: { xs: 4, md: 8 },
        mb: { xs: 4, md: 8 },
        borderRadius: 2,
      }}
    >
      <Grid
        container
        spacing={{ xs: 3, md: 4 }}
        alignItems="center"
        direction="row"
        wrap="wrap"
      >
        {/* Image */}
        <Grid item xs={12} sm={6} md={6}>
          <Box
            component="img"
            src={demoImage}
            alt="Career Compass Illustration"
            sx={{
               Width: {
                    xs: '326px',
                    lg: '525px',
                  },
              height: {
                    xs: '187.08px',
                    lg: '397px',
                  },
              borderRadius: 0,
              display: "block",
              mx: { xs: "auto", md: 0 },
            }}
          />
        </Grid>

        {/* Text & Buttons */}
        <Grid item xs={12} sm={6} md={6} >
          <Stack
            spacing={{ xs: 1, sm: 3 }}
            sx={{
              textAlign: { xs: "center", md: "left" },
              px: { xs: 0, sm: 1 },
              
            }}
          >
            {/* Title with Icon */}
            
            <Box
              display="flex"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              gap={1} >
              <Box
                component="img"
                src={TimerImage}
                alt="Timer Logo"
                sx={{
                  display: { xs: "none", sm: "block" },
                  width: { sm: 35, md: 45 },
                  height: { sm: 35, md: 40 },
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: {
                    xs: '34px',
                    lg: '54px'
                  },
                  lineHeight: 'normal',
                  letterSpacing: '1.08px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'None', md: 'flex-start' },
                  color: '#0040D8',
                  textAlign: "left", // force left align
                  px: { xs: 0, sm: 1 },
                  ml: { xs: -6, lg: 0 },
                  mb:{xs: -1}
                }}
                
              >
                Career Compass
              </Typography>
            </Box>
            

            {/* Subtitle */}
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: {
                    xs: '24px',
                    lg: '32px'
                  },
                lineHeight: 'normal',
                letterSpacing: '0',
                color: '#090808',
                mb: '2px',
                textAlign: "left",
                
              }}
            >
              Your Career GPS: Map your Future Path
            </Typography>

            {/* Body Text */}
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontWeight: 400,
               fontSize: {
                    xs: '16px',
                    lg: '20px',
                  },
                lineHeight: 1.6,
                color: "text.secondary",
                maxWidth: { xs: "100%", sm: "90%", md: 500 },
                mx: { xs: "auto", md: 0 },
                textAlign: "left"
              }}
            >
              Discover where you stand and where you could go next. Get
              personalized career predictions, explore alternative paths, and
              build a roadmap to your dream role. Powered by AI, tailored to
              you.
            </Typography>

            {/* Buttons */}
            <Stack
             direction={{ xs: 'column', md: 'row' }} 
              spacing={2}
              justifyContent={{ xs: "center", md: "flex-start" }}
              pt={1}
              flexWrap="wrap"
            >
              <Button
                variant="contained"
                onClick={() => navigate(paths.comingsoon)}
                sx={{
                  minWidth: { xs: 140, sm: 180 },
                  height: { xs: 40, sm: 48 },
                  borderRadius: "29px",
                  bgcolor: "#0040D8",
                  color: "#fff",
                  textTransform: "none",
                  '&:hover': { bgcolor: "#0033b3" },
                }}
                
              >
                Analyze my resume
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(paths.comingsoon)}
                sx={{
                  minWidth: { xs: 140, sm: 180 },
                  height: { xs: 40, sm: 48 },
                  borderRadius: "29px",
                  border: "1px solid #0040D8",
                  color: "#0040D8",
                  textTransform: "none",
                  '&:hover': { bgcolor: "#f5f5f5" },
                }}
              >
                Start without Resume
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CareerCompass;