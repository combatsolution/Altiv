import React from "react";
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import boosterImage from "src/images/jobmatch.png";

function JobMatchBooster() {
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
              display: { xs: "none", sm: "block" },
              width: "100%",
              height: "auto",
              maxWidth: { xs: "0", sm: "90%", md: "100%" },
              mx: "auto",
            }}
          />
        </Grid>

        {/* Right Text Section */}
        <Grid item xs={12} md={6}>
          <Stack
            spacing={{ xs: 1.5, sm: 2.5, md: 2 }}
            textAlign={{ xs: "center", md: "left" }}
          >
            <Typography
               sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: {
                    xs:'34px',
                    lg:'54px'
                   },
                lineHeight: 'normal', // or '64px' if specific line-height is needed
                letterSpacing: '2%',
                display: 'flex',
                // alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: 1,
                color: '#0040D8',
                mb: '2px', // mimics paragraph spacing
              }}
            >
              <Box component="span" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, color: "orange" }}>
                🚀
              </Box>
              Job Match Booster
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '32px',
                lineHeight: 'normal', // or '64px' if specific line-height is needed
                letterSpacing: '2%',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: 1,
                color: '#090808',
                mb: '2px', // mimics paragraph spacing
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
                fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                lineHeight: 1.6,
                letterSpacing: "0%",
                // color: "rgba(9, 8, 8, 0.5)",  
                mx: { xs: "auto", md: 0 },
              }}
            >
              Stand out in every application. Get actionable tips and
              strategic insights to enhance your chances. Know exactly what to
              improve and how to present yourself.
            </Typography>

            <Box pt={2} textAlign={{ xs: "center", md: "left" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#0040D8",
                  color: "#fff",
                  borderRadius: "999px",
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                  textTransform: "none",
                }}
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
