import { useEffect } from "react";
import { Box, Container, Grid, Typography, Paper, Button, Avatar } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BoltIcon from "@mui/icons-material/Bolt";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { m, animate, useMotionValue, useTransform } from "framer-motion";
import PropTypes from "prop-types"; // ✅ add this at the top

export default function
  AIReadinessDashboard() {
  return (  
   <Box
  sx={{ 
    mx:'auto',
    maxWidth:'1155px',
     px: { xs: 3, md: 4 },
    py: 4,  
    Width:'1000px',
    borderRadius: "10px",
    bgcolor: "#2563eb",
    color: "white", 
   
   
    gap: 2, // ✅ vertical gap between elements
  }}
>
  {/* Header Content */}
  <Avatar
    sx={{
      bgcolor: "white",
      width: "100%",
      height: 50,
      borderRadius: "8px",
      color: "primary.main",
      fontWeight: "bold",
      fontSize: 25,
      maxWidth: "1175px",
    }}
  >
    ALTIV.AI
  </Avatar>

  <Box>
    <Typography variant="h3" fontWeight="bold">
      AI Readiness & Workforce Risk – Accenture
    </Typography>
    <Typography variant="h4" sx={{ color: "#d8cacaff", }}>
      Company FOBO Dashboard
    </Typography>
  </Box>  

  <Button
    variant="outlined"
    sx={{
      bgcolor: "rgba(255,255,255,0.1)",
      color: "white",
      width: { xs: "100%", md: "20%" },
    }}
  >
    Last Updated: 06 Oct 2025
  </Button>
</Box>

   
  );
}

