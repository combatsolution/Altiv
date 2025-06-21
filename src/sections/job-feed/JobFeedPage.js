
import React from 'react';
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
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types'; // 👈 Add this at the top
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
    logo: 'https://via.placeholder.com/48', // Replace with actual logo URL
  },
  // Duplicate object or use actual API list
];


const JobCard = ({ job }) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      mb: 2,
      borderRadius: 2,
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 2,
    }}
  >
    <Avatar
      src={job.logo}
      alt={job.company}
      sx={{ width: 48, height: 48, alignSelf: 'flex-start' }}
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
            color: '#2E7D32',
            fontWeight: 600,
            px: 1.5,
            py: 0.5,
          }}
        />
        <Button variant="contained" sx={{ bgcolor: '#2A4DD0' }}>
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

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#F9FAFB', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        {/* Sidebar Filters */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" mb={2}>
              Filters
            </Typography>
            <Divider />
            {/* You can add actual filter controls here */}
            <Stack spacing={2} mt={2}>
              <Typography fontWeight={600}>Date of posting</Typography>
              <Stack spacing={1}>
                {['All time', 'Past 7 days', 'Past 15 days', 'Past 30 days'].map((d) => (
                  <Button key={d} sx={{ justifyContent: 'flex-start' }}>
                    {d}
                  </Button>
                ))}
              </Stack>
              <Divider />
              <Typography fontWeight={600}>Location</Typography>
              <TextField size="small" placeholder="Search here" />
              <Button variant="outlined" size="small">
                Remote job
              </Button>
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
              <Paper sx={{ p: 2, borderRadius: 2 }}>
                <Typography fontWeight={600}>📧 Email similar jobs</Typography>
                <Typography variant="body2" mt={1} mb={2}>
                  Get notified when similar jobs are posted.
                </Typography>
                <TextField placeholder="name@mail.com" size="small" fullWidth sx={{ mb: 1 }} />
                <Button variant="contained" fullWidth>
                  Subscribe
                </Button>
              </Paper>
              <Paper sx={{ p: 2, borderRadius: 2 }}>
                <Typography fontWeight={600}>🚀 Get noticed faster</Typography>
                <Typography variant="body2" mt={1} mb={2}>
                  Upload your resume to get accurate matches.
                </Typography>
                <Button variant="outlined" fullWidth>
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
