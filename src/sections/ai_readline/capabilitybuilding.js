// src/components/CapabilityBuilding.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react"; // using Iconify for icons


const capabilityData = [
  {
    title: "AI in Healthcare Operations",
    hours: "4-5 hrs/week",
    hoursColor: "success",
    credential: "Certificate in AI for Healthcare Management (Coursera/Udemy)",
    mode: "Online Course / Virtual Lab",
  },
  {
    title: "Data Analytics & Visualization",
    hours: "3-4 hrs/week",
    hoursColor: "success",
    credential:
      "Data Analytics for Healthcare Leaders (edX/Microsoft Learn)",
    mode: "Self-paced modules & Workshops",
  },
  {
    title: "Digital Compliance & Quality Tech",
    hours: "3 hrs/week",
    hoursColor: "success",
    credential:
      "Training on Compliance.ai and ChatGPT for compliance monitoring",
    mode: "Vendor Webinars / Hands-on Labs",
  },
  {
    title: "Process Automation Tools",
    hours: "3 hrs/week",
    hoursColor: "success",
    credential:
      "Practical course on no-code automation (Zapier, Microsoft Power Automate)",
    mode: "Interactive online tutorials",
  },
  {
    title: "AI-Driven CRM & Stakeholder Engagement",
    hours: "2-3 hrs/week",
    hoursColor: "success",
    credential: "CRM analytics with AI (HubSpot Sales Hub courses)",
    mode: "Video tutorials / Case studies",
  },
];

export default function CapabilityBuilding() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Section Title */}
      <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:"center", mb:2 }}>
      <Typography variant="h5" fontWeight={600} color="primary" gutterBottom>
        Capability Building
      </Typography>
      <Button
            variant="contained"
            color="primary"
           startIcon={<Icon icon="ic:sharp-share" width="20" height="20" color="#fff"  />}
              > Share </Button>
            </Box>
            <Divider sx={{ mb: 2}} />

      <Grid container spacing={3}>
        {capabilityData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid rgba(0,0,0,0.1)",
                bgcolor: "background.paper",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Title + Hours */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="primary"
                >
                  {item.title}
                </Typography>
                <Chip
                  label={item.hours}
                  color={item.hoursColor}
                  size="small"
                  sx={{ fontSize: "0.75rem", fontWeight: 500 }}
                />
              </Box>

              {/* Credential */}
              <Typography  sx={{ mb: 1, fontSize:'12px'}}>
                <strong>Micro-credential: </strong>
                {item.credential}
              </Typography>

              {/* Learning Mode */}
              <Typography sx={{fontSize:'12px'}} color="text.secondary">
                <strong>Learning Mode: </strong>
                {item.mode}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
