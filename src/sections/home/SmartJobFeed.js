import React from "react";
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import jobFeedImage from "src/images/smartjob.png"; 
import SmartJoblogo from 'src/images/smartjoblogo.png';
import {useNavigate} from 'react-router-dom';
import { paths } from "src/routes/paths";

function SmartJobFeed() {
    const navigate =useNavigate();
  return (
    
    <Box sx={{ bgcolor: "#fff", px: { xs: 3, md: 6 }, py: { xs: 4, md: 8 } }}>
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
        direction={{ xs: "column-reverse", md: "row" }}
      >
        {/* Text Section */}
        <Grid item xs={12} md={6} >
          <Stack spacing={2}  textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="h1" // We'll override default h1 styles to match your specs
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: {
                  xs: '34px',
                  lg: '54px'
                },
                lineHeight: 'normal', // or '64px' if specific line-height is needed
                letterSpacing: '2%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'left', md: 'flex-start' },
                gap: 1,
                color: '#0040D8',
                mb:{xs: -1},
                textAlign: "left", // force left align
                px: { xs: 0, sm: 1 },
                
              }}
            >
               <Box
                component="img"
                src={SmartJoblogo}
                alt="PageLogo"
                sx={{
                  display: { xs: "none", sm: "block" },
                  width: { sm: 35, md: 45 },
                  height: { sm: 35, md: 40 },
                  fontSize: {
                    xs: '34px',
                    lg: '54px'
                  },
                }}
              />
              Smart Job Feed
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                lineHeight: 'normal', // or '64px' if specific line-height is needed
                letterSpacing: '',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: 1,
                color: '#090808',
                mb: '2px', // mimics paragraph spacing
                textAlign: "left",
                fontSize: {
                    xs: '24px',
                    lg: '32px',
                  },
              }}  

            >
              Jobs that just click Job <br/>Feed
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 400,
                
                lineHeight: '160%', // or '32px' if you prefer pixel value
                letterSpacing: '0.64px',
                color: 'text.secondary',
                textAlign: "left",
                 fontSize: {
                    xs: '16px',
                    lg: '20px',
                  },
              }}
            >
              Say goodbye to endless scrolling. Meet your job match with
              AI-powered precision. Each opportunity comes with a match 
              score, showing exactly how you fit before you apply.
            </Typography>

            <Box pt={1}>
              <Button
                variant="contained"
               onClick={()=>navigate(paths.comingsoon)}
                
                sx={{
                  width:{ xs:'360px'},
                  bgcolor: "#0040D8",
                  color: "#fff",
                  borderRadius: "999px",
                  px: { xs: 0, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                  textTransform: "none",
                  ml:{xs: -2, sm: 2 },
                }}
              >
                Access Personal Matches
              </Button>
            </Box>
          </Stack>
        </Grid>

        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={jobFeedImage}
            alt="Smart Job Feed illustration"
            sx={{
              display: "block", // <- ensures visibility on all devices
               Width: {
                    xs: '342px',
                    lg: '550.02px',
                  },
              height: {
                    xs: '175px',
                    lg: '484.02px',
                  },
              maxWidth: { xs: "100%", md: "90%" },
              mx: { xs: "auto", md: "initial" },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SmartJobFeed;
