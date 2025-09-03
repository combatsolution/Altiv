import React from "react";
import { Grid, Box, Typography, TextField, Button, useTheme } from "@mui/material";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";


const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      mx='auto'
      maxWidth='1500px'
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
        <Grid item xs={6} md={2.4} ml={-7}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2} >
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
        <Grid item xs={6} md={2.4} ml={-5}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
            About Altiv
          </Typography>
          {["About Us", "Contact Us", "Work for Us", "Help", "FAQ"].map((text, idx) => (
            <Typography key={idx} fontWeight={400} fontSize={16} lineHeight="130%" mb={2}>
              {text}
            </Typography>
          ))}
        </Grid>


        <Grid item xs={6} md={2.4} ml={-12}>
          <Typography
            fontFamily="Arial, sans-serif"
            fontWeight={700}
            fontSize={20}
          >
            ALTIV.<Box component="span" fontWeight={400}>AI</Box>
          </Typography>

          <Typography fontWeight={500} fontSize={13} mb={2}>
            Subscribe to our newsletter
          </Typography>

          <Box display="flex" mb={1.5} width="400px">
            <TextField
              placeholder="Email Address"
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                },
                '& fieldset': {
                 
                  borderColor: 'black',
                },
                input: {
                  paddingLeft: '10px',
                },
              }}
            />
            <Button
              variant="outlined"
              sx={{
                ml: '10px', // margin before the button
                borderRadius: 0, // removes rounding
                borderColor: '#0040D8',
                color: '#0040D8',
                fontWeight: 600,
                textTransform: 'none',
                padding: '6px 12px',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  borderColor: '#0040D8', // keep the border color on hover
                },
              }}
            >
              Subscribe
            </Button>

          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                fontSize: 22,
                cursor: "pointer",
              }}
            >
              <FaXTwitter />
            </Box>
            <Box
              sx={{
                backgroundColor: '#1976d2',
                color: '#fff',
                borderRadius: '4px',
                px: 1,
                py: 0.5,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: "pointer",
              }}
            >
              <FaLinkedinIn />
            </Box>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Footer;
