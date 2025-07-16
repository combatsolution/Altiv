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
} from '@mui/material';

import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const jobs = [
  {
    id: 1,
    company: 'Polygon Technology',
    title: 'Data Scientist',
    location: 'Mumbai',
    applicants: 124,
    posted: '12 hours ago',
    description:
      'Molilit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod culpa. laborum tempor Lorem incididunt.',
    matchScore: '75%',
    logo: '/assets/images/liner.png',
  },
];

const JobCard = ({ job }) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      mb: 2,
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 2,
    }}
  >
    <Avatar
      src={job.logo}
      alt={job.company}
      sx={{
        width: 48,
        height: 48,
        alignSelf: 'flex-start',
        color: '#fff',
        bgcolor: 'primary.main',
      }}
    />
    <Box flex={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
        <Box>
          <Typography fontWeight={600}>{job.company}</Typography>
          <Typography variant="h6" fontWeight={700}>
            {job.title}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">{job.location}</Typography>
            <PeopleAltIcon fontSize="small" />
            <Typography variant="body2">{job.applicants} applicants</Typography>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">{job.posted}</Typography>
          </Stack>
        </Box>
        <BookmarkBorderIcon fontSize="small" sx={{ color: 'text.secondary' }} />
      </Stack>
      <Typography variant="body2" mt={1} mb={2} color="text.secondary">
        {job.description}
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Chip
          label={`Match Score ${job.matchScore}`}
          sx={{
            bgcolor: '#E6F4EA',
            color: '#43DB43',
            fontWeight: 600,
            px: 1.5,
            py: 0.5,
            '&:hover': {
              bgcolor: '#E6F4EA',
              cursor: 'default',
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: '#2A4DD0',
            '&:hover': {
              bgcolor: '#2A4DD0',
            },
          }}
        >
          Apply now
        </Button>
      </Stack>
    </Box>
  </Paper>
);

JobCard.propTypes = {
  job: PropTypes.shape({
    logo: PropTypes.string,
    company: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    applicants: PropTypes.number,
    posted: PropTypes.string,
    description: PropTypes.string,
    matchScore: PropTypes.string,
  }).isRequired,
};

export default function JobFeedPage() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [dateFilter, setDateFilter] = useState('All time');

  const [jobCategories, setJobCategories] = useState([]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setJobCategories((prev) => (checked ? [...prev, value] : prev.filter((cat) => cat !== value)));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#F9FAFB', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        {/* Sidebar Filters */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" mb={1}>
              Filters
            </Typography>
            <Divider />
            <Stack spacing={2} mt={2}>
              <Typography fontWeight={600}>Date of posting</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="dateFilter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  {['All time', 'Past 7 days', 'Past 15 days', 'Past 30 days'].map((d) => (
                    <FormControlLabel
                      key={d}
                      value={d}
                      control={<Radio size="small" />}
                      label={d}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Typography fontWeight={600}>Job Category</Typography>
              <FormGroup>
                {['Product Management', 'Data Science'].map((d) => (
                  <FormControlLabel
                    key={d}
                    control={
                      <Checkbox
                        size="small"
                        value={d}
                        checked={jobCategories.includes(d)}
                        onChange={handleCategoryChange}
                      />
                    }
                    label={d}
                  />
                ))}
              </FormGroup>

              <Typography fontWeight={600}>Location</Typography>
              <Typography fontWeight={300}>Search here </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="dateFilter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  {['Remote job'].map((d) => (
                    <FormControlLabel
                      key={d}
                      value={d}
                      control={<Radio size="small" />}
                      label={d}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Typography fontWeight={600}>Level </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="dateFilter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  {[
                    'Any',
                    ' Entry Level',
                    'Senior Level',
                    'Junior Management',
                    'Middle Management',
                    'Director',
                    'VP',
                    'SVP and CXO',
                  ].map((d) => (
                    <FormControlLabel
                      key={d}
                      value={d}
                      control={<Radio size="small" />}
                      label={d}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Typography fontWeight={600}>Company Stage </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="dateFilter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  {[
                    'All',
                    ' Early Stage',
                    ' Series A, B',
                    'Series C+',
                    'Listed',
                    'Private',
                    '12-15years',
                    '15+ years',
                  ].map((d) => (
                    <FormControlLabel
                      key={d}
                      value={d}
                      control={<Radio size="small" />}
                      label={d}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Typography fontWeight={600}>Company Classification </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="dateFilter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  {[
                    'All',
                    '  Analytics and Consulting Specialists',
                    ' Big Tech and Global Tech Giants',
                    'Emerging Tech Companies',
                    'Enterprise and B2B',
                    'GCC',
                    'Growth Stage Startups',
                    'Indian IT Services and Consulting',
                    'Indian Unicorns and Major Startups',
                  ].map((d) => (
                    <FormControlLabel
                      key={d}
                      value={d}
                      control={<Radio size="small" />}
                      label={d}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <Divider />
              
            </Stack>    
          </Paper>
        </Grid>

        {/* Main Job Feed */}
        <Grid item xs={12} md={6}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Grid>

        {/* Right Sidebar */}
        {isMdUp && (
          <Grid item md={3}>
            <Stack spacing={3}>
              <Paper sx={{ p: 2, borderRadius: 2, bgcolor:'#E7F6EA' }}>
                <Typography fontWeight={600}>📧 Email similar jobs</Typography>
                <Typography variant="body2" mt={1} mb={2}>
                  Get notified when similar jobs are posted.
                </Typography>
                <TextField placeholder="name@mail.com" size="small" fullWidth sx={{ mb: 1 }} />
                <Button variant="contained" fullWidth color='primary'>
                  Subscribe
                </Button>
              </Paper>
              <Paper sx={{ p: 2, borderRadius: 2 ,bgcolor:'#E7F6EA'}}>
                <Typography fontWeight={600}>🚀 Get noticed faster</Typography>
                <Typography variant="body2" mt={1} mb={2}>
                  Upload your resume to get accurate matches.
                </Typography>
              
                  <Button variant="contained" fullWidth color='primary'>
                  Upload your resume
                </Button>
              </Paper>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}


