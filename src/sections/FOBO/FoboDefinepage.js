import React from "react";
import { Grid, Box, Typography, Stack } from "@mui/material";
import brainImage from "src/Fogoimages/brainimage.jpg";

function FoboDefineSection() {
  return (
    <Box
      sx={{
        width: "1349px",
        mx: "auto",
        bgcolor: "#fff",
        px: 2,
        py: 8,
      }}
    >
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="space-between"
        direction={{ xs: "column", md: "row" }}
      >
        {/* Left Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={brainImage}
            alt="What is FOBO Illustration"
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", md: "90%" },
            //   transform: "rotate(-180deg)",
              mx: { xs: "auto", md: "initial" },
            }}
          />
        </Grid>

        {/* Right Text Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ width: "572px" }}>
            <Stack spacing={3}>
              <Typography
                component="h1"
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "72px",
                  lineHeight: "100%",
                  letterSpacing: "-2%",
                  color: "#212529",
                }}
              >
                What is FOBO?
              </Typography>

              <Typography
                component="p"
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "30px",
                  letterSpacing: "-2%", 
                  color: "#000000",
                }}
              >
                Fear of Being Obsolete (FOBO) is the growing anxiety among professionals about AIs impact on their careers. With 36% of jobs now using AI for key tasks, staying relevant is not optional – it is essential.
                <br />
                In your job search, FOBO can look like endless browsing, bookmarking dozens of roles... but never applying.
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FoboDefineSection;
