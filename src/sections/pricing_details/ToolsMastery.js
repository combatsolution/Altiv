// src/components/ToolsMastery.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const toolsData = [
  {
    category: "Language & Content Generation",
    tools: [
      { name: "ChatGPT", desc: "Conversational AI for copy & ideas" },
      { name: "Gemini", desc: "Google’s multimodal AI assistant" },
    ],
  },
  {
    category: "Visual Design & Imagery",
    tools: [
      { name: "MidJourney", desc: "High quality image generation" },
      { name: "Canva", desc: "Design layouts & brand kits" },
    ],
  },
  {
    category: "Analytics & Reporting",
    tools: [{ name: "Looker Studio", desc: "Interactive dashboards" }],
  },
];

export default function ToolsMastery() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 6 } }}>
      <Typography
        variant="h3"  
        align="center"
        fontWeight="bold"
        sx={{ mb: 4, color:theme.palette.primary.dark }}
        
      >
        Tools you’ll master
      </Typography>

      {toolsData.map((section, i) => (
        <Box
          key={i}
          sx={{
            bgcolor: "#f4f6ff",
            borderRadius: 2,
            p: { xs: 2, sm: 4 },
            mb: 4,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ mb: 2, color:'#000' }}
          >
            {section.category}
          </Typography>

          <Grid container spacing={2}>
            {section.tools.map((tool, idx) => (
              <Grid item xs={12}  sm={section.tools.length === 1 ? 12 : 6} key={idx}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      transform: "translateY(-3px)",
                      transition: "0.3s",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      gutterBottom
                      align={isMobile ? "center" : "center"}
                    >
                      {tool.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align={isMobile ? "center" : "center"}
                    >
                      {tool.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
