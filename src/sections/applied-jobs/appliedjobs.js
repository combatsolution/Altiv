import React, { useState, useEffect } from 'react';
import axiosInstance from 'src/utils/axios';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Stack,
  IconButton,
  Card,
  Chip,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const JobCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
  transition: 'transform 0.25s, box-shadow 0.25s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const HeaderRow = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Appliedjobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [bookmarked, setBookmarked] = useState({});

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axiosInstance.post('jobs/applied-jobs');
        if (res.data.success) setJobs(res.data.appliedJobs);
        else setError('Failed to fetch saved jobs');
      } catch {
        setError('Error fetching saved jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, []);

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleBookmark = (id) =>
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Applied Jobs
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && jobs.length === 0 && (
        <Typography color="text.secondary">No saved jobs found.</Typography>
      )}

      <Grid container spacing={3}>
        {jobs.map((job) => {
          const isExpanded = expanded[job.id];
          const isBookmarked = bookmarked[job.id];

          return (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard>
                {/* Header */}
                <HeaderRow mb={1}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'primary.light',
                        fontSize: 16,
                      }}
                    >
                      {job.company?.[0]}
                    </Avatar>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                      }}
                    >
                      {job.company}
                    </Typography>
                  </Stack>
                  <IconButton onClick={() => toggleBookmark(job.id)} size="small">
                    {isBookmarked ? (
                      <BookmarkIcon color="primary" />
                    ) : (
                      <BookmarkBorderIcon color="action" />
                    )}
                  </IconButton>
                </HeaderRow>

                {/* Title & posted */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  mt={1}
                  mb={0.5}
                  flexWrap="wrap"
                >
                  <Typography variant="h6" fontWeight={700}>
                    {job.jobTitle}
                  </Typography>
                  {/* <Chip
                    label={job.posted}
                    size="small"
                    sx={{
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      fontWeight: 500,
                    }}
                  /> */}
                </Stack>

                {/* Location & applicants */}
                <Stack
                  direction="row"
                  spacing={1}
                  mt={0.5}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2">{job.location}</Typography>
                  <AccessTimeIcon fontSize="small" sx={{ ml: 2 }} color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {job.applicants} applicants
                  </Typography>
                </Stack>

                {/* Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1.5,
                    flexGrow: 1,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: isExpanded ? 'unset' : 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {job.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: 'pointer', mt: 0.5, fontWeight: 500 }}
                  onClick={() => toggleExpand(job.id)}
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </Typography>

                {/* Footer Button */}
                <Box mt="auto" pt={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => window.open(job.redirectUrl, '_blank')}
                    sx={{
                      bgcolor: 'primary.main',
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1.2,
                      fontSize: 15,
                      '&:hover': { bgcolor: 'primary.dark' },
                    }}
                  >
                    Apply Now
                  </Button>
                </Box>
              </JobCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Appliedjobs;
