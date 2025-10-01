import { Box, Container, Grid, Typography, Paper, Button, Avatar } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BoltIcon from "@mui/icons-material/Bolt";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { m } from "framer-motion";

// Motion wrapper for Paper
const MotionPaper = m(Paper);

// Data for metric cards
const metrics = [
  {
    title: "AI-Readiness Score",
    value: "75%",
    subtitle: "Above Average",
    color: "#3b82f6",
    icon: <TrackChangesIcon sx={{ fontSize: 28, color: "#3b82f6" }} />,
  },
  {
    title: "Transformation Timeline ",   
    value: "36",
    subtitle: "Months",
    color: "#f59e0b",
    icon: <BoltIcon sx={{ fontSize: 28, color: "#f59e0b" }} />,
  },
  {
    title: "Automation Potential",
    value: "65%",
    subtitle: "High Impact",
    color: "#ec4899",
    icon: <RocketLaunchIcon sx={{ fontSize: 28, color: "#ec4899" }} />,
  },
  {
    title: "Strategic Objectives",
    value: "6",
    subtitle: "Key Goals",
    color: "#facc15",
    icon: <EmojiObjectsIcon sx={{ fontSize: 28, color: "#facc15" }} />,
  },
];

export default function AIReadinessDashboard() {
  return (
    <Box sx={{ bgcolor: "#f4f7fb", minHeight: "80vh", py: 4 }}>
      {/* Header */}
      <Box
        sx={{
        //   bgcolor: "linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)",
          bgcolor:"#2563eb",
          color: "white",
          px: { xs: 3, md: 8 },
          py: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 0,
          mb: 4,
          borderRadius: "0 0 12px 12px",
        }}
      >
        {/* Left Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              bgcolor: "white",
              width: 90,
              height: 40,
              borderRadius: "8px",
              color: "primary.main",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            ALTIV.AI
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Personalized AI-Readiness Analysis
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#00FD8D" }}>
              Dr. Rishabh Gandhi
            </Typography>
            <Typography variant="caption" sx={{ color: "#d1e9ff" }}>
              Report ID: AIR-2025-RG-001 &nbsp; | &nbsp; Generated: August 28, 2025
            </Typography>
          </Box>
        </Box>

        {/* Right Section */}
        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          sx={{
            bgcolor: "rgba(255,255,255,0.1)",
            color: "white",
            borderColor: "white",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
              borderColor: "white",
            },
          }}
        >
          Export PDF
        </Button>
      </Box>

      {/* Metrics Grid */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MotionPaper
                elevation={3}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
                }}
                sx={{

                  borderRadius: 3,
                  cursor: "pointer",    
                  background: "white",
                  borderTop: `4px solid ${metric.color}`, // Top border highlight
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "row",
                  alignItems:"center",
                  justifyContent: "center",
                  
                }}
              >
                {/* Icon with circular background */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 60,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: `${metric.color}1A`, // light background
                    // mx: "auto",
                    mr:1
                  }}
                >
                  {metric.icon}
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection:"column",
                    
                }}>
             
               {/* Title */}
                <Typography variant="subtitle1" fontWeight="600" sx={{
                    display: "flex",
                    textalign:'left',
                    wordBreak:'break-word',
                    color:'text.secondary', 
                    }}>
                  {metric.title}
                </Typography>
                   {/* Metric Value */}
                  <Typography variant="h3" fontWeight="bold"    sx={{ textAlign: "left" }} color="primary.main">
                  {metric.value}
                </Typography>

                {/* Subtitle */}
                <Typography variant="body2" color="text.secondary"    sx={{ textAlign: "left" }}>
                  {metric.subtitle}
                </Typography>
                </Box>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
