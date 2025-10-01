import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShareIcon from "@mui/icons-material/Share";

export default function ExecutiveSummary() {
  return (
    <Box sx={{
      mx: 'auto',
      maxWidth: { xs: '100%', md: '1330px', lg: '1300px' },
      p: 3, bgcolor: "#f9fafb"
    }}>
      {/* Header */}
      <Box
        display="flex"  
        justifyContent="space-between"
        alignItems="center"
        mb={2}

      >
        <Typography variant="h6" sx={{ color: "#0040ff", fontWeight: "bold" }}>
          Executive Summary
        </Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<ShareIcon />}
          sx={{
            textTransform: "none",
            bgcolor: "#00e0ac",
            "&:hover": { bgcolor: "#00c195" },
          }}
        >
          Share
        </Button>
      </Box>

      {/* Profile + Key Achievements */}
      <Grid container spacing={2}>
        {/* Left Profile Section */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              bgcolor: "#0f172a",
              color: "white",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ opacity: 0.7, mb: 1 }}>
              Professional Profile
            </Typography>
            <Typography>
              <b>Name:</b> Dr. Rishabh Gandhi
            </Typography>
            <Typography>
              <b>Title:</b> Strategic Account Manager
            </Typography>
            <Typography>
              <b>Company:</b> Red.Health
            </Typography>
            <Typography>
              <b>Qualifications:</b> BDS, MBA in Hospital & Healthcare
              Administration
            </Typography>
          </Paper>
        </Grid>

        {/* Right Key Achievements */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              Key Achievements
            </Typography>
            <List dense>
              {[
                "Leading NABH accreditation at ESIC Hospital",
                "Operational optimization at Fortis Hospital",
                "Revenue generation of ₹10+ lakh/month at Red.Health",
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon sx={{ color: "#00c853" }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Description Section */}
      <Paper
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: "#e9f7ef",
        }}
      >
        <Typography variant="body1" sx={{ color: "#333" }}>
          A results-driven healthcare operations and administration leader with
          a strong clinical foundation (BDS) and strategic management expertise
          (MBA in Hospital & Healthcare Administration) who has recently driven
          revenues of over ₹10+ lakh/month at Red.Health.
        </Typography>
      </Paper>
    </Box>
  );
}
