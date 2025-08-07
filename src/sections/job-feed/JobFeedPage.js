import React, { useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  Paper,
  Button,
  Chip,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Checkbox,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  Drawer,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLocationFilter,
  setLevelFilter,
  setCompanyStage,
  setClassification,
  toggleCategory,
  setDateFilter,
} from 'src/store/jobSlice';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Controller, useForm } from 'react-hook-form';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import axiosInstance from 'src/utils/axios';
import { jobs } from './jobFeedData';


const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/job-details');
  };

  return (
    <Paper
      elevation={2}
      onClick={handleClick}
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        cursor: 'pointer',
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Avatar src={job.logo} alt={job.company} sx={{ width: 48, height: 48 }} />
      </Box>

      {/* Desktop view */}
      <Box flex={1} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 13 }}>
              <Typography fontWeight={600}>{job.company}</Typography>
              <BookmarkBorderIcon fontSize="medium" sx={{ color: 'text.secondary' }} />
            </Grid>

            <Stack direction="row" justifyContent="center" spacing={1}>
              <Typography fontSize="1rem">{job.title}</Typography>
              <Grid
                sx={{
                  display: 'flex',
                  alignItems: 'center', // vertical alignment
                  justifyContent: 'center', // horizontal alignment
                  width: '80px',
                  height: '20px',
                  bgcolor: 'rgba(125, 90, 226, 0.1)',
                  color: 'rgba(125, 90, 226, 1)',
                  mt: 0.5,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '12px' }}>
                  {job.posted}
                </Typography>
              </Grid>
            </Stack>

            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">{job.location}</Typography>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">{job.applicants} applicants</Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              bgcolor: '#E9FFE9',
              borderRadius: '50%',
              width: 80,
              height: 80,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="caption" fontSize={10} color="success.dark">
              Match Score
            </Typography>
            <Typography variant="h6" color="success.dark">
              {job.matchScore}
            </Typography>
          </Box>
        </Stack>

        <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Typography
            variant="body2"
            mt={1}
            mb={2}
            color="text.secondary"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            {job.description}
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={0}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#2A4DD0',
                borderRadius: 1,
                px: 2,
                py: 2,
                fontWeight: 200,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#2A4DD0',
                },
                width: { xs: '100%', md: '140px' },
                height: { xs: '100%', md: '40px' },
              }}
            >
              Apply Now
            </Button>
          </Stack>
        </Grid>
      </Box>

      {/* Mobile View */}
      <Box flex={1} sx={{ display: { xs: 'block', md: 'none' } }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <Avatar src={job.logo} alt={job.company} sx={{ width: 48, height: 48 }} />
            <Box>
              <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <Typography variant="h6">{job.title}</Typography>
               <BookmarkBorderIcon fontSize="medium" sx={{ color: 'text.secondary' }} />
               </Grid>
              <Typography fontWeight={600}>{job.company}</Typography>
              <Typography variant="body2">{job.location}</Typography>
              <Typography fontSize="12px">
                {job.applicants} applicants • {job.posted}
              </Typography>
            </Box>
          </Stack>  
          <Box
            sx={{
              bgcolor: '#E9FFE9',
              borderRadius: '50%',
              width: 60,
              height: 60,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="caption" fontSize={10} color="success.dark">
              Match
            </Typography>
            <Typography variant="body2" color="success.dark">
              {job.matchScore}
            </Typography>
          </Box>
        </Stack>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: '#2A4DD0',
            textTransform: 'none',
            '&:hover': { bgcolor: '#2A4DD0' },
          }}
        >
          Apply now
        </Button>
      </Box>
    </Paper>
  );
};

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

export default function JobFeedPage() {
  const dispatch = useDispatch();
  console.log('JobFeedPage rendered', dispatch);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { control, handleSubmit, reset, setError } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const onSubmit = async (data) => {
    setSubmitting(true);
    const email = data.email?.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      setError('email', { type: 'manual', message: 'Invalid email format' });
      enqueueSnackbar('Please enter a valid email address', { variant: 'error' });
      setSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/wait-lists', {
        email,
        type: 'notification',
        isDeleted: false,
      });

      if (response.data?.success) {
        enqueueSnackbar('Successfully subscribed!', { variant: 'success' });
        reset();
      } else {
        enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
      }
    } catch (error) {
      if (error.response?.status === 409) {
        enqueueSnackbar('Email already subscribed.', { variant: 'warning' });
      } else {
        enqueueSnackbar('Failed to subscribe. Try again later.', { variant: 'error' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const {
    dateFilter = '',
    jobCategories = [],
    levelFilter = '',
    locationFilter = '',
    companyStage = '',
    classification = '',
  } = useSelector((state) => state.jobs || {});

  console.log('khdkjsdk->', dateFilter);
  const filteredJobs = jobs.filter((job) => {
    let matches = true;

    if (dateFilter && dateFilter !== 'All time') {
      // Only allow jobs that are posted within the selected filter
      const days = parseInt(dateFilter.match(/\d+/)?.[0] || '0', 10); // extract number from 'Past 7 days'
      if (days > 0) {
        const now = new Date();
        const jobPostedDaysAgo = (() => {
          // Simulate job post date using string (you should use real dates ideally)
          if (job.posted === 'Past 7 days') return 7;
          if (job.posted === 'Past 15 days') return 15;
          if (job.posted === 'Past 30 days') return 30;
          if (job.location === 'Remote job') return 30;
          if (job.location === 'Mumbai') return 30;

          return 999; // default for unknown
        })();
        matches = matches && jobPostedDaysAgo <= days;
      }
    }

    if (jobCategories.length > 0) matches = matches && jobCategories.includes(job.category);
    if (dateFilter && dateFilter !== 'All time') {
      // Only allow jobs that are posted within the selected filter
      const days = parseInt(dateFilter.match(/\d+/)?.[0] || '0', 10); // extract number from 'Past 7 days'
      if (days > 0) {
        const now = new Date();
        const jobPostedDaysAgo = (() => {
          // Simulate job post date using string (you should use real dates ideally)
          if (job.posted === 'Past 7 days') return 7;
          if (job.posted === 'Past 15 days') return 15;
          if (job.posted === 'Past 30 days') return 30;
          if (job.location === 'Remote job') return 30;
          if (job.location === 'Mumbai') return 30;

          return 999; // default for unknown
        })();
        matches = matches && jobPostedDaysAgo <= days;
      }
    }
    if (jobCategories.length > 0) matches = matches && jobCategories.includes(job.category);
    if (levelFilter && levelFilter !== '') matches = matches && job.level === levelFilter;

    if (locationFilter) matches = matches && job.location === locationFilter;
    if (companyStage) matches = matches && job.stage === companyStage;
    if (classification) matches = matches && job.classification === classification;

    return matches;
  });

  console.log('hidhaskjhkajkasl->', filteredJobs);
  const renderFilters = (
    <Box sx={{ width: 280, p: 2 }}>
      <Typography variant="h6">Filters</Typography>
      <Divider sx={{ my: 2 }} />

      <Typography fontWeight={600}>Date of posting</Typography>
      <FormControl component="fieldset">
        <RadioGroup
          name="dateFilter"
          value={dateFilter}
          onChange={(e) => dispatch(setDateFilter(e.target.value))}
        >
          {['All time', 'Past 7 days', 'Past 15 days', 'Past 30 days'].map((d) => (
            <FormControlLabel key={d} value={d} control={<Radio />} label={d} />
          ))}
        </RadioGroup>
      </FormControl>

      <Typography fontWeight={600} mt={2}>
        Job Category
      </Typography>
      <FormGroup>
        {['Product Management', 'Data Science'].map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                size="small"
                checked={jobCategories.includes(cat)}
                onChange={() => dispatch(toggleCategory(cat))}
              />
            }
            label={cat}
          />
        ))}
      </FormGroup>

      <Typography fontWeight={600} mt={2}>
        Location
      </Typography>
      <RadioGroup
        name="locationFilter"
        value={locationFilter}
        onChange={(e) => dispatch(setLocationFilter(e.target.value))}
      >
        {['Remote job', 'Mumbai'].map((loc) => (
          <FormControlLabel key={loc} value={loc} control={<Radio />} label={loc} />
        ))}
      </RadioGroup>

      <Typography fontWeight={600} mt={2}>
        Level
      </Typography>
      <RadioGroup
        name="levelFilter"
        value={levelFilter}
        onChange={(e) => dispatch(setLevelFilter(e.target.value))}
      >
        {[
          '',
          'Entry Level',
          'Senior Level',
          'Junior Management',
          'Middle Management',
          'Director',
          'VP',
          'SVP and CXO',
        ].map((lvl) => (
          <FormControlLabel
            key={lvl || 'Any'}
            value={lvl}
            control={<Radio />}
            label={lvl || 'Any'}
          />
        ))}
      </RadioGroup>

      <Typography fontWeight={600} mt={2}>
        Company Stage
      </Typography>
      <RadioGroup
        name="companyStage"
        value={companyStage}
        onChange={(e) => dispatch(setCompanyStage(e.target.value))}
      >
        {['', 'Early Stage', 'Series A, B', 'Series C+', 'Listed', 'Private'].map((stage) => (
          <FormControlLabel
            key={stage || 'All'}
            value={stage}
            control={<Radio />}
            label={stage || 'All'}
          />
        ))}
      </RadioGroup>

      <Typography fontWeight={600} mt={2}>
        Classification
      </Typography>
      <RadioGroup
        name="classification"
        value={classification}
        onChange={(e) => dispatch(setClassification(e.target.value))}
      >
        {[
          '',
          'Big Tech and Global Tech Giants',
          'Growth Stage Startups',
          'Indian Unicorns and Major Startups',
        ].map((cls) => (
          <FormControlLabel
            key={cls || 'All'}
            value={cls}
            control={<Radio />}
            label={cls || 'All'}
          />
        ))}
      </RadioGroup>
    </Box>
  );

  return (
    <Box sx={{ px: { lg: 10 }, p: { xs: 2, md: 4 }, bgcolor: '#F9FAFB', minHeight: '100vh' }}>
      {isMobile && (
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton onClick={() => setMobileFilterOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" ml={1}>
            Filters
          </Typography>
        </Box>
      )}

      <Drawer anchor="left" open={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)}>
        {renderFilters}
      </Drawer>

      <Grid container spacing={4}>
        {!isMobile && (
          <Grid item md={3}>
            <Paper>{renderFilters}</Paper>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          {filteredJobs.length === 0 ? (
            <Typography textAlign="center">No jobs match the selected filters.</Typography>
          ) : (
            filteredJobs.slice(0, visibleJobs).map((job) => <JobCard key={job.id} job={job} />)
          )}
          {visibleJobs < filteredJobs.length && (
            <Box textAlign="center" mt={2}>
              <Button onClick={() => setVisibleJobs((prev) => prev + 3)} variant="outlined">
                Show More
              </Button>
            </Box>
          )}
        </Grid>

        <Grid item md={3}>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, bgcolor: '#E7F6EA' }}>
              <Typography fontWeight={600}>📧 Email similar jobs</Typography>
              <Typography variant="body2" mt={1} mb={2}>
                Get notified when similar jobs are posted.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      fullWidth
                      placeholder="name@mail.com"
                      sx={{ mb: 1 }}
                      disabled={submitting}
                    />
                  )}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={submitting}
                  sx={{
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </Paper>
            <Paper sx={{ p: 2, bgcolor: '#E7F6EA' }}>
              <Typography fontWeight={600}>🚀 Get noticed faster</Typography>
              <Typography variant="body2" mt={1} mb={2}>
                Upload your resume to get accurate matches.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
              >
                Upload your resume
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
