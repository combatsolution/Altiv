import React from "react";
import { Grid, Box, Typography, TextField, Button, useTheme } from "@mui/material";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";






const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#fff",
        borderTop: "1px solid #e0e0e0",
        py: 6,
        px: { xs: 2, md: 8 },
        fontFamily: "Inter, sans-serif"
      }}
    >
      <Grid container spacing={4}>
        {/* Column 1: Jobseekers */}
        <Grid item xs={6} md={2.4}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
            Jobseekers
          </Typography>
          {["Search Jobs", "Register", "Job Alerts", "Career Advice"].map((text, idx) => (
            <Typography key={idx} fontWeight={400} fontSize={16} lineHeight="130%" mb={2}>
              {text}
            </Typography>
          ))}
        </Grid>

        {/* Column 2: Popular */}
        <Grid item xs={6} md={2.4}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
            Popular
          </Typography>
          {["Search Jobs", "Employers", "Agencies"].map((text, idx) => (
            <Typography key={idx} fontWeight={400} fontSize={16} lineHeight="130%" mb={2}>
              {text}
            </Typography>
          ))}
        </Grid>

        {/* Column 3: Recruiters */}
        <Grid item xs={6} md={2.4}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
            Recruiters
          </Typography>
          {[
            "CV Database Access",
            "Advertise Jobs",
            "Search CVs",
            "Test CV Search"
          ].map((text, idx) => (
            <Typography key={idx} fontWeight={400} fontSize={16} lineHeight="130%" mb={2}>
              {text}
            </Typography>
          ))}
        </Grid>

        {/* Column 4: About Altiv */}
        <Grid item xs={6} md={2.4}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
            About Altiv
          </Typography>
          {["About Us", "Contact Us", "Work for Us", "Help", "FAQ"].map((text, idx) => (
            <Typography key={idx} fontWeight={400} fontSize={16} lineHeight="130%" mb={2}>
              {text}
            </Typography>
          ))}
        </Grid>

        {/* Column 5: ALTIV.AI & newsletter */}
        <Grid item xs={12} md={2.4}>
          <Typography
            fontFamily="Arial, sans-serif"
            fontWeight={700}
            fontSize={32}
            lineHeight="150%"
            letterSpacing="0.15px"
            mb={1}
          >
            ALTIV.AI
          </Typography>

          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
            Subscribe to our newsletter
          </Typography>

          <Box display="flex" mb={2}>
            <TextField
              placeholder="Email Address"
              variant="outlined"
              size="small"
              width="1000px"
              sx={{
                fontSize: 14,
                borderRadius: "10px 0 0 10px",
                input: { padding: "18px 10px" },
                
              }}
            />  
            <Button
              variant="contained"
              sx={{
                marginLeft:"5px",
                bgcolor: '#ffffff', // white background
                borderRadius: '0 4px 4px 0',
                fontSize: 14,
                paddingX: 8,
                color: '#0040D8', // text color
                border: '1px solid #0040D8', // optional: add border for definition
                '&:hover': {
                  bgcolor: '#f0f0f0', // optional subtle hover effect
                },
              }}
            >
              Subscribe
            </Button>


          </Box>
          <FaXTwitter color="black" />
          <Box
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              p: 0,
              marginLeft: 1,
              borderRadius: '14%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15
            }}
          >
            <FaLinkedinIn />


          </Box>

        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
