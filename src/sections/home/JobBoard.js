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
import { useNavigate } from "react-router";
import { paths } from "src/routes/paths";





const jobData = [
  {
    title: "Senior Product Manager, Growth",
    tags: ["Full-time", "Hybrid"],
    description: [
      "Leading fintech unicorn seeks experienced PM to drive user acquisition and retention.own core metrics, lead",
      "cross-functional teams, and shape product strategy in a high-stakes environment.",
    ],
  },
  {
    title: "Data Scientist, Consumer Analytics",
    tags: ["Full-time", "Remote"],
    description: [
      "Fast-growing D2C brand needs a data scientist to unlock customer insights. Build predictive models, optimize",
      "user segments, and drive personalization initiatives.",
    ],
  },
  {
    title: "Associate Product Manager",
    tags: ["Full-time", "Hybrid", "Remote"],
    description: [
      "Global edutech company seeking APM to own student experience features. Perfect for analytical minds ready to ",
      " launch their product career with mentorship.",
    ],
  },
  {
    title: "Lead Data Science Engineer",
    tags: ["Full-time", "Hybrid", "Remote"],
    description: [
      "Scale-up seeking senior data scientist to build ML infrastructure.Lead a team of engineers, architect solutions",
      "and implement production-grade ML systems.",
    ],
  },
  {
    title: "Principal Product Manager",
    tags: ["Full-time", "Hybrid", "Remote"],
    description: [
      "Series C startup needs veteran product leader to own core product strategy. Define vision, mentor team members",
      "and drive executive alignment.",
    ],
  },
];


const JobBoard = () => {
  const navigate = useNavigate();



  // const handleClick = () => {
  //   navigate(`/job-details/${job.id}`);
  // };

  return (
    <Box bgcolor="#f9fafb" py={8} px={{ xs: 3, md: 8 }}

    >
      {/* Header */}
      <Box textAlign="center" mb={{ xs: 6, md: 10 }} px={2}>
        <Typography
          variant="h4"
          fontWeight={200}
          gutterBottom
          sx={{
            fontSize: {
              xs: '2.5rem',  // mobile
              sm: '3rem',  // tablets
              md: '3rem',    // desktop
              lg: '2.70rem',    // large screens
            },
            lineHeight: 1.1,
            display: {
              xs: 'none',    // hide on mobile
              sm: 'block',   // show on tablets and above
            },
          }}

        >
          Your Next Career-Defining Move
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 600,
            mx: "auto",
            pb: { xs: 3, md: 5 },
            fontSize: {
              xs: "0.95rem",
              sm: "1.05rem",
              md: "1.15rem",
              lg: '0.95rem'
            },
            display: {
              xs: 'none',    // hide on mobile
              sm: 'block',   // show on tablets and above
            },
          }}
        >
          Discover precisely matched roles at premier companies, filtered for your growth trajectory
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Sidebar */}

        <Grid item xs={12} md={3}>
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <Box

              p={1.5}
              borderRadius={1}
              boxShadow={1}
              mb={2}
            >
              <Box display="flex" alignItems="center">
                <Box
                  width={4}
                  height={50}
                  bgcolor="primary.main"
                  borderRadius={1}
                  mr={1}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  fontSize={{ xs: 16, md: 18 }}
                >
                  All positions (255)
                </Typography>
              </Box>
            </Box>

            <Stack spacing={1} pl={1}>
              <Typography
                sx={{
                  cursor: "pointer",
                  fontSize: { xs: 14, md: 16 },
                }}
              >
                Data Science (150)
              </Typography>
              <Typography color="text.secondary" fontSize={{ xs: 14, md: 16 }}>
                Product (105)
              </Typography>
            </Stack>

            <Typography
              variant="caption"
              color="text.secondary"
              mt={4}
              ml={1}
              display="block"
              fontSize={{ xs: 12, md: 13 }}
            >
              Upload your resume to get better job recommendations, accurate job matches, and access to AI-powered features.
            </Typography>

            <Box mt={2} textAlign="center">
              <Button
                onClick={() => navigate(`${paths.fobo}?retry=true`)}

                variant="outlined"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  border: "1px solid #0040D8",
                  color: "#0040D8",
                  fontSize: { xs: 14, md: 15 },
                  textTransform: "none",
                }}
              >
                Upload your resume
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Job Listings */}
        <Grid item xs={12} md={9} px={{ xs: 2, sm: 4, md: 6 }}>
          <Stack spacing={3}>
            {jobData.map((job, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{ p: { xs: 2, sm: 3 } }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  fontSize={{ xs: 16, sm: 18 }}
                >
                  {job.title}
                </Typography>

                <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                  {job.tags.map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag}
                      size="small"
                      sx={{
                        color: "#0040D8",
                        borderColor: "#0040D8",
                        mb: 0.5,
                      }}
                      variant="outlined"
                    />
                  ))}
                </Stack>

                {job.description.map((line, i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    fontSize={{ xs: 13, sm: 14 }}
                  >
                    {line}
                  </Typography>
                ))}

                <Box textAlign={{ xs: 'left', sm: 'right' }} mt={2}>
                  <Button
                  // onClick={()=> navigate(paths.jobDetails/${job_id})}
                  //   onClick={handleClick}
                    variant="contained"
                    sx={{
                      borderRadius: 999,
                      px: 4,
                      bgcolor: "primary.main",
                      fontSize: { xs: 14, sm: 16 },
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: "primary.dark",
                      }
                    }}
                  >
                    Apply →
                  </Button>

                </Box>
              </Paper>
            ))}

            <Box textAlign="center" pt={3}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  color: "#0040D8",
                  fontSize: { xs: 14, sm: 16 },
                  textTransform: 'none',
                }}
              >
                Show More..
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};


export default JobBoard;

