import React from 'react';
import {
  Container,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';

import {jobs} from './jobsData'; // Importing jobs data

// ✅ Job list JSON
const similarJob = [
  {
    id: 1,
    title: 'Sr. Director AI | Data Science',
    company: 'Google',
    salary: '75L - 1Cr',
    experience: '12-14 years',
    logo: 'https://logo.clearbit.com/google.com',
  },
  {
    id: 2,
    title: 'Machine Learning Engineer',
    company: 'Amazon',
    salary: '50L - 80L',
    experience: '8-10 years',
    logo: 'https://logo.clearbit.com/google.com',
    // logo: 'https://logo.clearbit.com/amazon.com'
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Microsoft',
    salary: '30L - 50L',
    experience: '5-7 years',
    logo: 'https://logo.clearbit.com/google.com',
    // logo: 'https://logo.clearbit.com/microsoft.com'
  },
  {
    id: 4,
    title: 'Lead Data Scientist',
    company: 'Meta',
    salary: '80L - 1.2Cr',
    experience: '10-12 years',
    logo: 'https://logo.clearbit.com/google.com',
    // logo: 'https://logo.clearbit.com/meta.com'
  },
];

export default function JobDetailPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

    // ✅ Pick one job (e.g., first one in JSON)
  const job = jobs[0];

  // ✅ For similar jobs, just filter out the current one
  const similarJobs = jobs.filter(j => j.id !== job.id);
  return (
    <Box>
      {/* Search Bar */}
      <Container sx={{ py: 3 }}>
        <TextField
          fullWidth
          placeholder="Show me product manager jobs in Bengaluru with a CTC of 35L and above"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Container>
{/* Main Content */}
      <Container>
        <Grid container spacing={3}>
          {/* Left Panel */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                {/* Header */}
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                  <Grid item xs={12} md={8}>
                    <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
                      <Avatar src={job.logo} sx={{ width: 56, height: 56 }} />
                      <Box>
                        <Grid sx={{ display: "flex", flexDirection: "row", gap: 8 }}>
                          <Typography fontWeight={600}>{job.company}</Typography>
                          <BookmarkBorderIcon fontSize="medium" sx={{ color: "text.secondary" }} />
                        </Grid>
                        <Grid container gap={3} alignItems="center">
                          <Typography variant="h5" fontWeight={600}>
                            {job.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="primary.main"
                            bgcolor="#7D5AE21A"
                            px={1}
                            py={0.5}
                            borderRadius={1}
                          >
                            {job.posted}
                          </Typography>
                        </Grid>
                        <Box display="flex" gap={4} flexWrap="wrap" mt={0.5}>
                          <Typography variant="body2" color="text.secondary">
                            📍 {job.location}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            • {job.applicants} applicants
                          </Typography>
                          <Typography
                            variant="caption"
                            color="primary"
                            sx={{ cursor: "pointer" }}
                          >
                            Why this score?
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Match Score */}
                  <Grid item xs={12} md="auto" textAlign={{ xs: "left", md: "center" }}>
                    <Box
                      sx={{
                        bgcolor: "#E9FFE9",
                        borderRadius: "50%",
                        width: 80,
                        height: 80,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        mx: { md: "auto" },
                        mt: { xs: 2, md: 0 },
                      }}
                    >
                      <Typography
                        variant="caption"
                        fontSize="10px"
                        color="success.dark"
                      >
                        Match Score
                      </Typography>
                      <Typography variant="h6" color="success.dark">
                        {job.matchScore}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />
               {/* Description */}
                <Typography paragraph>{job.description}</Typography>

                {/* Description */}
                {/* {[...Array(3)].map((_, i) => (
                  <Typography key={i} paragraph>
                    analyzes data to uncover insights and build predictive models, using skills in
                    statistics, programming, and machine learning.
                  </Typography>
                ))} */}


                <CardActions
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',

                    

                    mt: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      color: '#fff',
                      backgroundColor: 'primary.main',
                      borderRadius: '10px',
                      width: { xs: '100%', sm: '200px' },
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    Apply now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      mt: 2,
                      color: '#0040D8',
                      backgroundColor: '#fff',
                      borderRadius: '10px',
                      width: { xs: '100%', sm: '200px' },
                    }}
                    onClick={() => navigate('/job-booster')}
                  >
                    Boost my application
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Panel */}
          <Grid item xs={12} md={4}>
            <Box
              bgcolor="grey.100"
              p={2}
              borderRadius={2}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Similar Jobs
              </Typography>
              <List disablePadding>
                {similarJob.map((jobb) => (
                  <ListItem key={jobb.id} alignItems="flex-start" sx={{ mb: 1 }}>
                    <ListItemAvatar>
                      <Avatar src={jobb.logo} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={jobb.title}
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Salary: {jobb.salary} • {jobb.experience}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Box textAlign="right" mt={1}>
                <Link href="#" underline="hover" variant="body2">
                  View more similar jobs
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Call to Action Buttons */}
        <CardActions
          sx={{
            display: { xs: 'none', md: 'flex' }, // ⬅️ Hides on xs & sm, shows on md+
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              color: '#fff',
              backgroundColor: 'primary.main',
              borderRadius: '100px',
              width: { xs: '100%', sm: '200px' },
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Apply now
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: '#0040D8',
              backgroundColor: '#fff',
              borderRadius: '100px',
              width: { xs: '100%', sm: '200px' },
            }}
            onClick={() => navigate('/job-booster')}
          >
            Boost my application
          </Button>
        </CardActions>
      </Container>
    </Box>
  );
}
