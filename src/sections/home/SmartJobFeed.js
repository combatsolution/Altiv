import React from "react";
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import jobFeedImage from "src/images/smartjob.png"; // Ensure image path is correct

function SmartJobFeed() {
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
        <Grid item xs={12} md={6}>
          <Stack spacing={2} marginLeft="30px" textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="h1" // We'll override default h1 styles to match your specs
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '54px',
                lineHeight: 'normal', // or '64px' if specific line-height is needed
                letterSpacing: '2%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: 1,
                color: '#0040D8',
                mb: '2px', // mimics paragraph spacing
              }}
            >
              <Box component="span" sx={{ fontSize: '2rem', color: 'orange' }}>
                📰
              </Box>
              Smart Job Feed
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
              Jobs that just click Job Feed
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '160%', // or '32px' if you prefer pixel value
                letterSpacing: '0px',
                color: 'text.secondary',
              }}
            >
              Say goodbye to endless scrolling. Meet your job match with<br />
              AI-powered precision. Each opportunity comes with a match <br />
              score, showing exactly how you fit before you apply.
            </Typography>

            <Box pt={2}>
              <Button
                variant="contained"

                sx={{ borderRadius: "999px", px: 4, py: 1.5 }}
                style={{
                  backgroundColor: '#0040D8',
                  color: '#fff', // white text  

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
              width: "100%",
              height: "auto",
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
