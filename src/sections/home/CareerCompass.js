import React from "react";
import { Box, Grid, Typography, Button, Paper, Stack } from "@mui/material";
import demoImage from "src/images/human.png";

function CareerCompass() {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: "#fff" }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={demoImage}
            alt="Career Compass Illustration"
            sx={{
              width: "100%",
              borderRadius: 2,
              display: "block",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2} textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h5" fontWeight="bold" color="primary" display="flex" alignItems="center" gap={1}>
              <Typography component="span" variant="h4" color="orange">
                🧭
              </Typography>
              Career Compass
            </Typography>

            <Typography variant="h6" color="text.primary" fontWeight={500}>
              Your Career GPS: Map your Future Path
            </Typography>

            <Typography color="text.secondary">
              Discover where you stand and where you could go next. Get personalized career predictions, explore
              alternative paths, and build a roadmap to your dream role. Powered by AI, tailored to you.
            </Typography>

            <Stack direction="row" justifyContent={{ xs: "center", md: "flex-start" }} spacing={2} pt={1}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#0040D8',     // background color
                  color: '#ffffff',       // text color
                  '&:hover': {
                    bgcolor: '#0033b3',   // optional darker shade on hover
                  },
                }}
              >
                Analyze my resume
              </Button>   
              <Button variant="outlined" 
              sx={{
                border: '1px solid #0040D8',
                color: '#0040D8',       // text color
                  '&:hover': {
                    bgcolor: '#fff',   // optional darker shade on hover
                  },

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
