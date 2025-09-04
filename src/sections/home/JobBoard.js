import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Stack,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useSnackbar } from 'notistack'; // Make sure this is imported
import axiosInstance from 'src/utils/axios';
import { paths } from "src/routes/paths";
import { useAuthContext } from "src/auth/hooks";

const JobBoard = () => {
  const navigate = useNavigate();
  const { job_id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  // State for jobs data
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [visibleJobsCount, setVisibleJobsCount] = useState(5);
  const [expandedDescriptions, setExpandedDescriptions] = useState(new Set());

  // Helper function to format posted date
  const formatPostedDate = (createdAt) => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffInMs = now - posted;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
    }
  }, [user]);



  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/jobs');
        const apiJobs = res.data;

        // Map API fields to match your UI
        const mappedJobs = apiJobs.map((job) => ({
          id: job.id,
          company: job.company,
          title: job.jobTitle, // map jobTitle → title
          location: job.location,
          description: job.description,
          redirectUrl: job.redirectUrl,
          applicants: Math.floor(Math.random() * 200), // backend missing → fake count
          posted: formatPostedDate(job.createdAt), // convert createdAt → "Past X days"
          matchScore: `${Math.floor(Math.random() * 30) + 70}%`, // fake for now
          logo: '/assets/images/liner.png', // fallback logo
          level: job.level || 'Entry Level', // use from backend if available
          stage: job.stage || 'Early Stage',
          classification: job.classification || 'Growth Stage Startups',
          category: job.category || 'Data Science',
          // Add tags based on job properties
          tags: [
            job.jobType || 'Full-time',
            job.workLocation || 'Hybrid',
            ...(job.tags || []) // if backend provides additional tags
          ],
        }));

        setJobs(mappedJobs);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again.');
        enqueueSnackbar('Failed to load jobs', { variant: 'err' });
      } finally {
        setLoading(false);
      }
    };



    fetchJobs();
  }, [user, enqueueSnackbar]);

  const handleApply = (job) => {
    if (job.redirectUrl) {
      // If job has a redirect URL, open it
      window.open(job.redirectUrl, '_blank');
    } else {
      // Navigate to job details page
      navigate(`${paths.jobDetails}/${job.id}`);
    }
  };

  // Pagination handlers

  const handleShowMore = () => {
    setVisibleJobsCount(prev => Math.min(prev + 5, jobs.length));
  }
  const handleShowLess = () => {
    setVisibleJobsCount(5);
    setExpandedDescriptions(new Set()); // Reset expanded descriptions when showing less
  };

  // Description expansion handlers
  const toggleDescription = (jobId) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const truncateDescription = (description, maxLines = 3) => {
    if (!description) return '';

    const words = description.split(' ');
    const wordsPerLine = 15; // Approximate words per line
    const maxWords = maxLines * wordsPerLine;

    if (words.length <= maxWords) return description;

    return words.slice(0, maxWords).join(' ');
  };

  // Get visible jobs
  const visibleJobs = jobs.slice(0, visibleJobsCount);

  if (!user) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
        textAlign="center"
        px={3}
      >
        <Typography variant="h6" gutterBottom>
          Please log in to view job listings
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(paths.auth.jwt.login)}
          sx={{ borderRadius: 999, px: 4, mt: 2, color: 'primary.main', border: '2px solid primary.main' }}
        >
          Login
        </Button>
      </Box>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto' }}>
          {error}
          <Button
            onClick={() => window.location.reload()}
            sx={{ ml: 2 }}
            variant="outlined"
            size="small"
          >
            Retry
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box bgcolor="#f9fafb" py={8} px={{ xs: 3, md: 6 }} maxWidth="1500px" mx='auto'>
      {/* Header */}
      <Box textAlign="center" mb={{ xs: 6, md: 10 }} px={2}>
        <Typography
          variant="h4"
          fontWeight={200}
          gutterBottom
          sx={{
            fontSize: {
              xs: '2.5rem',
              sm: '3rem',
              md: '3rem',
              lg: '2.70rem',
            },
            lineHeight: 1.1,
            display: {
              xs: 'none',
              sm: 'block',
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
              xs: 'none',
              sm: 'block',
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
            <Box p={1.5} borderRadius={1} boxShadow={1} mb={2}>
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
                  All positions ({jobs.length})
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
                Data Science ({jobs.filter(job => job.category === 'Data Science').length})
              </Typography>
              <Typography color="text.secondary" fontSize={{ xs: 14, md: 16 }}>
                Product ({jobs.filter(job => job.category === 'Product').length})
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
            {jobs.length === 0 ? (
              <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  No jobs available at the moment
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Please check back later or try refreshing the page.
                </Typography>
              </Paper>
            ) : (
              visibleJobs.map((job, index) => {
                const isExpanded = expandedDescriptions.has(job.id);
                const displayDescription = isExpanded
                  ? job.description
                  : truncateDescription(job.description);
                const shouldShowToggle = job.description && job.description.split(' ').length > 105; // ~3 lines worth

                return (
                  <Paper
                    key={job.id || index}
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

                    {/* Company and Location */}
                    {(job.company || job.location) && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        fontSize={{ xs: 13, sm: 14 }}
                      >
                        {job.company && job.location ? `${job.company} • ${job.location}` : job.company || job.location}
                      </Typography>
                    )}

                    {/* Tags */}
                    <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                      {job.tags && job.tags.map((tag, i) => (
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

                    {/* Description */}
                    <Box mb={1}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize={{ xs: 13, sm: 14 }}
                        sx={{
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          overflow: 'hidden',
                          ...((!isExpanded && shouldShowToggle) && {
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                          })
                        }}
                      >
                        {displayDescription}
                      </Typography>

                      {shouldShowToggle && (
                        <Button
                          size="small"
                          onClick={() => toggleDescription(job.id)}
                          sx={{
                            mt: 1,
                            textTransform: "none",
                            fontSize: 13,
                            color: "primary.main",
                            p: 0,
                            minWidth: "unset",
                          }}
                        >
                          {isExpanded ? "Show less" : "Show More"}
                        </Button>)}

                    </Box>

                    {/* Posted date and match score */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                      {job.posted && (
                        <Typography variant="caption" color="text.secondary">
                          Posted {job.posted}
                        </Typography>
                      )}
                      {job.matchScore && (
                        <Chip
                          label={`${job.matchScore} match`}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      )}
                    </Stack>

                    <Box textAlign={{ xs: 'left', sm: 'right' }} mt={2}>
                      <Button
                        onClick={(() => handleApply(job))}
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
                );
              })
            )}

            {/* Pagination Controls */}

            <Box textAlign="center" pt={3}>
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">

                <Button
                  onClick={() => navigate('/job-Feed')}
                  variant="outlined"
                  sx={{
                    borderRadius: 999,
                    px: 4,
                    color: "#0040D8",
                    borderColor: "2px solid #0040D8",
                    fontSize: { xs: 14, sm: 16 },
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: "#0040D8",
                      bgcolor: 'rgba(0, 64, 216, 0.04)'
                    }
                  }}
                >
                  Show More
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );

};

export default JobBoard;