// src/components/ToolStack.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Icon } from "@iconify/react"; // using Iconify for icons

const toolData = [
  {
    title: "Foundation Layer",
    description:
      "Essential for day-to-day operations, document management, and basic AI integration",
    tools:
      "Microsoft Office Suite, Google Cloud Document AI, Google Sheets + GPT",
    color: "#e8f0fe", // light blue
    icon: "twemoji:triangular-flag",
  },
  {
    title: "Functional Layer",
    description:  
      "Directly addresses operational, compliance, CRM, and stakeholder engagement needs",
    tools:
      "Microsoft Copilot, Zapier AI, Taskade AI Document Management System, HubSpot Sales Hub with AI",
    color: "#fff7e6", // light yellowm
    icon: "twemoji:gear",
  },
  {
    title: "Advanced Layer",
    description:
      "Offers advanced predictive analytics, automated decision-making, and competitive operational insights",
    tools:
      "ThoughtSpot, DataRobot, Siemens AI Financial Modeling, Rapid Innovation AI QA tools",
    color: "#f0fff4", // light green
    icon: "twemoji:rocket",
  },
];

export default function ToolStack() {
  return (
    <Container  sx={{ py: 6, maxWidth: { xs: '100%', md: '400px', lg: '1200px' }, }}>
      <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:2}}>
    
      <Typography variant="h5" fontWeight={600} color="primary" gutterBottom>
        Recommended Tool Stack
      </Typography>
      <Button
        size="small"
        variant="contained"
        startIcon={<TwitterIcon />}
        sx={{
          bgcolor: "#1DA1F2",
          textTransform: "none",
          "&:hover": { bgcolor: "#0d8ddb" },
        }}
      >
        Tweet
      </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Stack spacing={3}>
        {toolData.map((item, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: item.color,
              border: "1px solid rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            {/* Icon (top-right) */}
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                fontSize: 28,
              }}
            >
              <Icon icon={item.icon} />
            </Box>

            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="primary"
              gutterBottom
            >
              {item.title}
            </Typography>

            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ mb: 1 }}
              color="text.primary"  
            >
              {item.tools}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
