  import React, { useState, useEffect } from 'react';
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
    IconButton,
    CircularProgress
  } from '@mui/material';
  import SearchIcon from '@mui/icons-material/Search';
  import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
  import BookmarkIcon from '@mui/icons-material/Bookmark';
  import { useNavigate, useParams, } from 'react-router-dom';
  import axiosInstance from 'src/utils/axios';
  import { enqueueSnackbar } from 'notistack';
  import { isFriday } from 'date-fns';
  import { trackEvent } from 'src/utils/google-analytics';
  // import axios from 'axios';

  export default function JobDetailPage() {
    const theme = useTheme();
    const { job_id } = useParams();
    console.log("kjhjkahsa->", job_id);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    console.log("dkajskajs-<>", jobs);
    const [bookmarked, setbookmarked] = useState(false);
    const [similarJobs, setSimilarJobs] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlebookmark = async (e) => {
      e.stopPropagation();
      trackEvent({
        category: 'Job Interaction',
        action: bookmarked ? 'Unbookmark Job' : 'Bookmark Job',
        label: 'Detail page Bookmarked',
        value: 71,
      });

      try {
        const res = await axiosInstance.post(`jobs/save-job/${job_id}`);
        if (res.status === 200) {
          setbookmarked((prev) => !prev); // toggle on/off
        }
      } catch (error) {
        console.error('Failed to save Jobs', error)
      }
    };

    // const similarJobs = jobs.filter(j => j.id !== job.id);
    const formatPostedDate = (date) => {
      if (!date) return "Recently Posted";
      const diff = Math.floor((Date.now() - new Date(date)) / (1000 * 60 * 60 * 24));
      if (diff === 0) return "Today";
      if (diff === 1) return "1 day ago";
      return `${diff} days ago`;
    };

    useEffect(() => {

      const fetchJob = async () => {
        try {
           setLoading(true);
          trackEvent({
            category: 'Job Detail',
            action: 'Viewed Job',
            label: 'Viewed Jobs',
            value: 69,
          });
          const res = await axiosInstance.get(`/jobs/${job_id}`);
          console.log("zxzzxResponse:", res);
          const job = res.data.data; // adjust based on your backend response
          const mappedJob = {
            id: job.id,
            company: job.company,
            title: job.jobTitle,
            location: job.location,
            description: job.description,
            applicants: Math.floor(Math.random() * 200),
            posted: formatPostedDate(job.createdAt),
            matchScore: `${Math.floor(Math.random() * 30) + 70}%`,
            logo: "/assets/images/liner.png",
            level: "Entry Level",
            stage: "Early Stage",
            classification: "Growth Stage Startups",
            category: "Data Science",
            redirectUrl: job.redirectUrl,
          };

          console.log("Mapped Job:", mappedJob);
          setJobs([mappedJob]);
          fetchSimilarJobs(job.id);

        } catch (error) {
          console.error("Error fetching job:", error);
          enqueueSnackbar("Failed to load job", { variant: "error" });
        }finally{
            setLoading(false); 

        }
      };

      const fetchSimilarJobs = async (jobId) => {
        try {
          const res = await axiosInstance.post(`/jobs/similar-jobs`, {
            jobId,
            limit: 10,   // set how many similar jobs to fetch
          });



          console.log("Similar Jobs Response:", res.data);

          // Map backend fields into UI-friendly fields
          const mapped = res.data.data.map((job) => ({
            id: job.id,
            title: job.jobTitle,
            company: job.company,
            salary: job.salaryRange || "Not Disclosed",
            experience: job.experience || "N/A",
            logo: job.companyLogo || "/assets/images/liner.png",
          }));

          setSimilarJobs(mapped);
        } catch (error) {
          console.error("Error fetching similar jobs:", error);
        }
      };

      if (job_id) fetchJob();
    }, [job_id]); // include job_id so it refetches when param changes

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          bgcolor: 'white',
        }}
      >
        <CircularProgress size={70} thickness={5} color="primary" />
      </Box>
    );
  }

    return (
      <Box sx={{ px: { xs: 2, md: 1 }, py: { xs: 4, md: 2 }, maxWidth: 1300, mx: 'auto' }}>
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
                {console.log("kjhdksjahds", jobs.logo)}
                {jobs.length > 0 && jobs.map((job) => (
                  <Card key={job.id}>
                    <CardContent sx={{ p: { xs: 2, md: 3 }, display: { xs: 'none', md: 'block' } }}>
                      {/* Header */}
                      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                        <Grid item xs={12} md={12}>
                          <Box display="flex" flexDirection='row' gap={2} flexWrap="wrap" alignItems="center">
                            <Avatar src={job.logo} sx={{ width: 56, height: 46 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Grid sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                <Typography fontWeight={600} sx={{
                                  textAlign: "center", mt: 1,
                                  '&:hover': {
                                    color: 'primary.main',
                                    textDecoration: 'underline',
                                  },
                                }}>{job.company}</Typography>
                                <IconButton onClick={handlebookmark}>
                                  {bookmarked ? (<BookmarkIcon fontSize="medium" sx={{ color: 'primary.main', }} />)
                                    :
                                    (<BookmarkBorderIcon fontSize="medium" sx={{ color: 'text.secondary' }} />)} </IconButton>
                              </Grid>

                              <Grid container sx={{ display: "flex", flexDirection: "row", gap: 1 }} >
                                <Typography fontWeight={600} fontSize='18px' sx={{
                                  '&:hover': {
                                    color: 'primary.main',
                                    textDecoration: 'underline',
                                  },
                                }}>
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
                          </Box>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 2 }} />
                      {/* Description */}
                      <Typography paragraph>{job.description}</Typography>
                    </CardContent>
                  </Card>
                ))}


                {/* mobile view */}
                <Card>
                  <CardContent sx={{ p: { xs: 1, md: 0 }, display: { xs: 'block', md: 'none' } }}>
                    {/* Header */}

                    {/* Left: Company + Job Info */}
                    <Grid item xs={12} md={12}>
                      {jobs.map((job, index) => (
                        <Box key={index} mb={4}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            gap={1}
                            justifyContent="center"
                          >
                            <Avatar src={job.logo} sx={{ width: 56, height: 56 }} />

                            <Box>
                              {/* Company + Save Icon */}
                              <Box display="flex" alignItems="center" gap={1}>
                                <Typography fontWeight={400} fontSize="16px" sx={{
                                  '&:hover': {
                                    color: 'primary.main',
                                    textDecoration: 'underline',
                                  },
                                }}>
                                  {job.title}
                                </Typography>
                                <IconButton onClick={handlebookmark}>
                                  {bookmarked ? (
                                    <BookmarkIcon fontSize="medium" sx={{ color: 'primary.main', }} />
                                  )
                                    : (
                                      <BookmarkBorderIcon fontSize="medium" sx={{ color: 'text.secondary', }} />
                                    )
                                  } </IconButton>
                              </Box>

                              {/* Job Title + Posted Time */}
                              <Box display="flex" alignItems="center" gap={2} mt={0.5}>
                                <Typography fontSize="12px" fontWeight={400} sx={{
                                  '&:hover': {
                                    color: 'primary.main',
                                    textDecoration: 'underline',
                                  },
                                }}>
                                  {job.company}
                                </Typography>
                              </Box>

                              {/* Location + Applicants + Score */}
                              <Box display="flex" gap={1} flexWrap="wrap">
                                <Typography fontSize="12px" fontWeight={400} color="text.secondary">
                                  {job.location}
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Typography fontSize="12px" fontWeight={400} color="text.secondary">
                                    {job.applicants} applicants
                                  </Typography>

                                  <Divider orientation="vertical" flexItem sx={{ bgcolor: "grey.400" }} />

                                  <Typography fontSize="12px" fontWeight={400} color="text.secondary">
                                    {job.posted}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            {/* Right: Match Score */}
                            <Grid
                              item
                              xs={6}
                              md="auto"
                              textAlign={{ xs: "left", md: "center" }}
                            >
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
                          </Box>

                          {/* Bottom Section */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",

                            }}
                          >
                            <Typography
                              variant="caption"
                              color="primary"
                              sx={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                fontSize: "20px",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              How is this match score?
                            </Typography>

                            <Typography paragraph sx={{ mt: 2 }}>
                              {job.description}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                    <CardActions
                      sx={{
                        display: { xs: 'block', md: 'none' },
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => {
                          trackEvent({
                            category: 'Job Interaction',
                            action: 'Apply Now Clicked',
                            label: 'Applied for jobs',
                            value:70,
                          });

                          window.open(jobs[0].redirectUrl, '_blank')
                        }}
                        sx={{
                          marginBottom: { xs: 1, sm: 0 },
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
                          color: '#0040D8',
                          backgroundColor: '#fff',
                          borderRadius: '10px',
                          width: { xs: '100%', sm: '200px' },
                        }}
                        onClick={() => navigate(`/job-booster/${job_id}`)}
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
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    Similar Jobs
                  </Typography>

                  <List disablePadding>
                    {(showAll ? similarJobs : similarJobs.slice(0, 5)).map((job) => (
                      <ListItem key={job.id} alignItems="flex-start" sx={{ mb: 1 }}>
                        <ListItemAvatar>
                          <Avatar src={job.logo} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={job.title}
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {job.company} • {job.salary} • {job.experience}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}

                    {similarJobs.length === 0 && (
                      <Typography variant="body2" color="text.secondary">
                        No similar jobs found.
                      </Typography>
                    )}
                  </List>

                  {/* Show "View more" only if >5 jobs */}
                  {similarJobs.length > 5 && !showAll && (
                    <Box textAlign="right" mt={1}>
                      <Link
                        component="button"
                        underline="hover"
                        variant="body2"
                        onClick={() => {
                          setShowAll(true);
                          trackEvent({
                            category: 'Job Detail',
                            action: 'View More Similar Jobs',
                            label: 'View Similar Jobs',
                            value: 74,
                          });
                        }}
                      >
                        View more similar jobs
                      </Link>
                    </Box>
                  )}
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
                onClick={() => window.open(jobs[0].redirectUrl, '_blank')}

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
                onClick={() => {
                  trackEvent({
                    category: 'Job Interaction',
                    action: 'Boost Application Clicked',
                    label: 'To Checked Boost data on jobooster page',
                    value: 73,
                  });

                  navigate(`/job-booster/${job_id}`)
                }}
              >
                Boost my application

              </Button>
            </CardActions>
          </Container>
        </Box>
      </Box>
    );
  }
