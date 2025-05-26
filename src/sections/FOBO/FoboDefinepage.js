import React from "react";
import { Grid, Box, Typography, Stack } from "@mui/material";
import brainImage from "src/Fogoimages/brainimage.jpg";

function FoboDefineSection() {
  return (
    <Box
      sx={{
        mx: "auto",
        bgcolor: "#fff",
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, sm: 8 },
        overflowX: "hidden",
      }}
    >
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
            src={brainImage}
            alt="What is FOBO Illustration"
            sx={{
              width: "100%",
              height: "auto",
              maxWidth: { xs: "100%", md: "500px" },
              display: "block",
              mx: { xs: "auto", md: 0 },
            }}
          />
        </Grid>

        {/* Right Text Section */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3} sx={{ px: { xs: 0, sm: 2 }, maxWidth: "100%" }}>
            <Typography
              component="h1"
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: { xs: "36px", sm: "48px", md: "64px" },
                lineHeight: "110%",
                letterSpacing: "-0.02em",
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
                letterSpacing: "-0.02em",
                color: "#000000",
              }}
            >
              Fear of Being Obsolete (FOBO) is the growing anxiety among professionals about AI is impact on their careers. With 36% of jobs now using AI for key tasks, staying relevant is not optional – it is essential.
              <br />
              In your job search, FOBO can look like endless browsing, bookmarking dozens of roles... but never applying.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FoboDefineSection;
