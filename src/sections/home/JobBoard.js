import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Stack,
  Chip,
} from "@mui/material";

const jobData = [
  {
    title: "Senior Product Manager, Growth",
    tags: ["Full-time", "Hybrid"],
    description:
      "Leading fintech unicorn seeks experienced PM to drive user acquisition and retention. Own core metrics, lead cross-functional teams, and shape product strategy in a high-stakes environment.",
  },
  {
    title: "Data Scientist, Consumer Analytics",
    tags: ["Full-time", "Remote"],
    description:
      "Fast-growing D2C brand needs a data scientist to unlock customer insights. Build predictive models, optimize user segments, and drive personalization initiatives.",
  },
  {
    title: "Associate Product Manager",
    tags: ["Full-time", "Hybrid", "Remote"],
    description:
      "Global edutech company seeking APM to own student experience features. Perfect for analytical minds ready to launch their product career with mentorship.",
  },
  {
    title: "Lead Data Science Engineer",
    tags: ["Full-time", "Hybrid", "Remote"],
    description:
      "Scale-up seeking senior data scientist to build ML infrastructure. Lead a team of engineers, architect solutions, and implement production-grade ML systems.",
  },
  {
    title: "Principal Product Manager",
    tags: ["Full-time", "Hybrid", "Remote"],
    description:
      "Series C startup needs veteran product leader to own core product strategy. Define vision, mentor team members, and drive executive alignment.",
  },
];

const JobBoard = () => (
  <Box bgcolor="#f9fafb" py={8} px={{ xs: 3, md: 8 }}>
    {/* Header */}
    <Box textAlign="center" mb={10}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Your Next Career-Defining Move
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        maxWidth="600px"
        mx="auto"
        pb={5}
      >
        Discover precisely matched roles at premier companies, filtered for your growth trajectory
      </Typography>
    </Box>

    <Grid container spacing={4}>
      {/* Sidebar */}
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Box width={4} height={50} bgcolor="primary.main" borderRadius={1} mr={1} />
            <Typography variant="subtitle1" fontWeight="bold">
              All positions (255)
            </Typography>
          </Box>
          <Stack spacing={1} pl={2}>
            <Typography color="primary" sx={{ cursor: "pointer",color:"#0040D8" }}>
              Data Science (150)
            </Typography>
            <Typography color="text.secondary">Product (105)</Typography>
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            mt={4}
            ml={2}
            display="block"
          >
            Upload your resume to get better job recommendations, accurate job matches, and access to AI-powered features.
          </Typography>
          <Box mt={2} textAlign="center">
            <Button variant="outlined"  sx={{ borderRadius: 999, px: 4,border:"1px solid #0040D8", color:"#0040D8" }}>
              Upload your resume
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Job Listings */}
      <Grid item xs={12} md={9}>
        <Stack spacing={3}>
          {jobData.map((job, index) => (
            <Paper key={index} variant="outlined" sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {job.title}
              </Typography>
              <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                {job.tags.map((tag, i) => (
                  <Chip key={i} label={tag} size="small" color="primary" variant="outlined" />
                ))}
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                {job.description}
              </Typography> 
              <Box textAlign="right">
                <Button variant="contained"  sx={{ borderRadius: 999, px: 4, bgcolor:"#0040D8" }}>
                  Apply →
                </Button>
              </Box>
            </Paper>
          ))}

          <Box textAlign="center" pt={3}>
            <Button variant="outlined"  sx={{ borderRadius: 999, px: 4 ,color:"#0040D8"}}>
              Show More..
            </Button>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  </Box>
);

export default JobBoard;
