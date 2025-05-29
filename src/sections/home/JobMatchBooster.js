import React from "react";
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import boosterImage from "src/images/jobmatch.png";
import Jobmatchlogo from "src/images/jobmatchlogo.png";
import {useNavigate} from 'react-router-dom';
import { paths } from "src/routes/paths";

function JobMatchBooster() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        bgcolor: "#fff",  
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 3, sm: 4, md: 8 },
      }}
    >
      <Grid
        container
        spacing={{ xs: 3, md: 4 }}
        alignItems="center"
        justifyContent="space-between"
        direction={{ xs: "column", md: "row" }}
      >
        {/* Left Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={boosterImage}
            alt="Job Match Booster Illustration"
            sx={{
             
              display: "block", // <- ensures visibility on all devices
              width: "100%",
              
              Width: {
                    xs: '312px',
                    lg: '484.02px',
                  },
              height: {
                    xs: '175px',
                    lg: '446px',
                  },
              mx: { xs: "auto", md: "initial" },
            }}
          />
        </Grid>

        {/* Right Text Section */}
        <Grid item xs={12} md={6} >
          <Stack
            spacing={{ xs: 1.5, sm: 2.5, md: 2 }}
            textAlign={{ xs: "center", md: "left" }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: {
                  xs: '34px',
                  lg: '54px'
                },
                lineHeight: 'normal', // or '64px' if specific line-height is needed
                letterSpacing: '2%',
                display: 'flex', // alignItems: 'center',
                justifyContent: { xs: 'left', md: 'flex-start' },
                gap: 1,
                color: '#0040D8',
               
                
              }}
            >
              
               <Box
                component="img"
                src={Jobmatchlogo}
                alt="RocketLogo"
                sx={{
                  display: { xs: "none", sm: "block" },
                  width: { sm: 35, md: 45 },
                  height: { sm: 35, md: 40 },
                  mt:2,
                  textAlign: "left",
                  mb:{xs: -1},
                   fontSize: {
                    xs: '34px',
                    lg: '54px'
                  },
                }}
              />
              Job Match Booster
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                
                lineHeight: 'normal', // or '64px' if specific line-height is needed
                letterSpacing: '0.64px',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: 1,
                color: '#090808',
                mb: '2px', // mimics paragraph spacing
                textAlign: "left",
                fontSize: {
                    xs: '24px',
                    lg: '32px'
                  },
                   
              }}
            >
              Boost Your Application Success
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: { xs: "100%", sm: "90%", md: "538px" },
                fontFamily: "Roboto",
                fontWeight: 400,
                lineHeight: 1.6,
                letterSpacing: "0%",
                // color: "rgba(9, 8, 8, 0.5)",  
                mx: { xs: "auto", md: 0 },
                textAlign: "left",
                fontSize: {
                    xs: '16px',
                    lg: '20px',
                  },
              }}
            >
              Stand out in every application. Get actionable tips and
              strategic insights to enhance your chances. Know exactly what to
              improve and how to present yourself.
            </Typography>

            <Box pt={1} textAlign={{ xs: "center", md: "left" }}>
              <Button
                variant="contained"
                sx={{
                  width:{
                  xs:'360px'},
                  bgcolor: "#0040D8",
                  color: "#fff",
                  borderRadius: "999px",
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                  textTransform: "none",
                }}
                onClick={()=>navigate(paths.comingsoon)}
              >
                Boost My Application
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default JobMatchBooster;
