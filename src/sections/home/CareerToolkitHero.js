import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import bgImage from "src/images/expert-opinion.png"; // Adjust path as needed

const CareerToolkitHero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 400, md: 500 },
        mt: 2,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        variant='h2'
        fontWeight="600"
        color="black" 
        sx={
          {
           fontsize:{xs:'40px', md:'54px'}

          }
        }
      >
        Your Career Acceleration Toolkit
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        mt={2}
        maxWidth="700px"
         sx={
          {
           fontsize:{xs:'16px', md:'20px'}
           
          }
        }
      >
      
        Transform your career journey from guesswork to strategy with AI-powered tools from Altiv.AI
      </Typography>
    </Box>
  );
};

export default CareerToolkitHero;
