import React from "react";
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import boosterImage from "src/images/jobmatch.png"; // Ensure image path is correct

function JobMatchBooster() {
  return (
    <Box sx={{ bgcolor: "#fff", px: { xs: 3, md: 6 }, py: { xs: 4, md: 8 } }}>
      <Grid
        container
        spacing={4}
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
              width: "100%",
              height: "auto",
              maxWidth: { xs: "100%", md: "90%" },
              mx: { xs: "auto", md: "initial" },
            }}
          />
        </Grid>

        {/* Right Text Section */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2} textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              gap={1}
              justifyContent={{ xs: "center", md: "flex-start" }}
              style={{
                color: "#0040D8"
              }}
            >
              <Box component="span" sx={{ fontSize: "2rem", color: "orange" }}>
                🚀
              </Box>
              Job Match Booster
            </Typography>

            <Typography variant="h6" fontWeight={500} color="text.primary">
              Boost Your Application Success
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Stand out in every application. Get actionable tips and strategic insights to enhance your chances.
              Know exactly what to improve and how to present yourself.
            </Typography>

            <Box pt={2}>
              <Button
                variant="contained"
                style={{  
                  backgroundColor: '#0040D8',
                  color: '#fff', // white text

                }}
                sx={{ borderRadius: "999px", px: 4, py: 1.5 }}
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
