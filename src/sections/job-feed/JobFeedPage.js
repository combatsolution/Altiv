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
import PropTypes from 'prop-types';

import MenuIcon from '@mui/icons-material/Menu';
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
      }}
    >
      <Box sx={{display:{xs:'none', md:'block'}}}>
      <Avatar
       
        src={job.logo}
        alt={job.company}
        sx={{
          width: 48,
          height: 48,
          alignSelf: 'flex-start',
          bgcolor: 'primary.main',
        }}
      />
      </Box>
       {/* for Desktop  View */}
       
      <Box flex={1} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Box>
            <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
              <Typography fontWeight={600}>{job.company}</Typography>
              <BookmarkBorderIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </Grid>

            <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <Typography variant="h6" fontWeight={700}>
                {job.title}
              </Typography>
              <Typography variant="body2">{job.posted}</Typography>
            </Grid>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mt={0.5}
              flexWrap="wrap"
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">{job.location}</Typography>
              <AccessTimeIcon fontSize="extrasmall" />
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
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              mt: { xs: 1, sm: 0 },
            }}
          >
            <Typography variant="caption" fontSize="10px" color="success.dark" fontWeight={400}>
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

          <Stack  
            direction={{ xs: 'column', md: 'row' }}
          
            alignItems="center"
            spacing={0}
          > 
            <Button
              variant="contained"
              sx={{
                bgcolor: '#2A4DD0',
                borderRadius: 1,
                px: 4,
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

      {/* for Mobile View */}
      <Box flex={1} sx={{ display: { xs: 'block', md: 'none' } }}>
        <Stack
          sx={{ display: 'flex', flexDirection: 'row' }}
          justifyContent="space-between"
          spacing={1}
        >
          <Box sx={{}}>
            <Grid>
            <Avatar
              src={job.logo}
              alt={job.company}
              sx={{
                width: 48,
                height: 48,
                alignSelf: 'flex-start',
                bgcolor: 'primary.main',
              }}
            />
            </Grid> 

            <Grid sx={{ display: 'flex', flexDirection: 'column', ml:7, mt:-6 }}>
              <Typography variant="h6" fontWeight={700}> {job.title}  </Typography>
               <Typography fontWeight={600}>{job.company}</Typography>

              {/* Horizontal row for icon and location */}
              <Box display="flex" alignItems="left" gap={0.5}>
                <Typography variant="body2">{job.location}</Typography>
              </Box>
            
          
            <Grid
              container
              sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }} >
              <Typography  fontSize='12px'>{job.applicants} applicants</Typography>
              {/* Vertical Divider */}
              <Divider orientation="vertical" flexItem sx={{ borderColor: 'grey.400' }} />
              <Typography fontSize='12px'>{job.posted}</Typography>
            </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              bgcolor: '#E9FFE9',
              borderRadius: '50%',
              width: 80,
              height: 80,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              
            }}
          >
            <Typography variant="caption" fontSize="10px" color="success.dark" fontWeight={400}>
              Match Score
            </Typography>
            <Typography variant="h6" color="success.dark">
              {job.matchScore}
            </Typography>
          </Box>
        </Stack>

        <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
         <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: '#2A4DD0',
                
                mt:2, 
                px: 15,
                py: 2,
                fontWeight: 200,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#2A4DD0',
                },
                 width: { xs: '100%', md: '100%' },  
                 height: { xs: '40px', md: '50px' },
              }}  
            >
              Apply now
            </Button>
          </Stack>
        </Grid>

      </Box>
    </Paper>

    
  );
};

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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [dateFilter, setDateFilter] = useState('All time');
  const [jobCategories, setJobCategories] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setJobCategories((prev) => (checked ? [...prev, value] : prev.filter((cat) => cat !== value)));
  };

  const renderFilters = (
    <Box sx={{ width: 280 }}>
      <Typography variant="h6" mb={1}>
        Filters
      </Typography>
      <Divider />
      <Stack spacing={2} mt={2} sx={{ p: 2 }}>
        <Typography fontWeight={600}>Date of posting</Typography>
        <FormControl component="fieldset">
          <RadioGroup
            name="dateFilter"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            {['All time', 'Past 7 days', 'Past 15 days', 'Past 30 days'].map((d) => (
              <FormControlLabel key={d} value={d} control={<Radio size="small" />} label={d} />
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
              <FormControlLabel key={d} value={d} control={<Radio size="small" />} label={d} />
            ))}
          </RadioGroup>
        </FormControl>

        <Typography fontWeight={600}>Level</Typography>
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
              <FormControlLabel key={d} value={d} control={<Radio size="small" />} label={d} />
            ))}
          </RadioGroup>
        </FormControl>

        <Typography fontWeight={600}>Company Stage</Typography>
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
              <FormControlLabel key={d} value={d} control={<Radio size="small" />} label={d} />
            ))}
          </RadioGroup>
        </FormControl>

        <Typography fontWeight={600}>Company Classification</Typography>
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
              <FormControlLabel key={d} value={d} control={<Radio size="small" />} label={d} />
            ))}
          </RadioGroup>
        </FormControl>
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Mobile Hamburger for Filters */}
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <IconButton onClick={() => setMobileFilterOpen(true)} color="primary">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" ml={1}>
            Filters
          </Typography>
        </Box>
      )}

      {/* Filters Drawer for Mobile */}
      <Drawer anchor="left" open={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)}>
        {renderFilters}
      </Drawer>

      <Grid container spacing={4}>
        {/* Desktop Sidebar Filters */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>{renderFilters}</Paper>
          </Grid>
        )}

        {/* Main Job Feed */}
        <Grid item xs={12} md={6}>
          {jobs.slice(0, visibleJobs).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          {visibleJobs < jobs.length && (
            <Box textAlign="center" mt={2}>
              <Button
                variant="outlined"
                onClick={() => setVisibleJobs((prev) => prev + 3)}
                sx={{
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  bgcolor: '#fff',
                }}
              >
                Show More
              </Button>
            </Box>
          )}
        </Grid>

        {/* Right Sidebar */}

        <Grid item xs={12} md={3}>
          <Stack spacing={3}>
            <Paper sx={{ p: 1, mr: 5, borderRadius: 2, bgcolor: '#E7F6EA', mb: { xs: 2, md: 0 } }}>
              <Typography fontWeight={600}>📧 Email similar jobs</Typography>
              <Typography variant="body2" mt={1} mb={2}>
                Get notified when similar jobs are posted.
              </Typography>
              <TextField placeholder="name@mail.com" size="small" fullWidth sx={{ mb: 1 }} />
              <Button variant="contained" fullWidth color="primary">
                Subscribe
              </Button>
            </Paper>
            <Paper sx={{ p: 2, mr: 5, borderRadius: 2, bgcolor: '#E7F6EA', mb: { xs: 2, md: 0 } }}>
              <Typography fontWeight={600}>🚀 Get noticed faster</Typography>
              <Typography variant="body2" mt={1} mb={2}>
                Upload your resume to get accurate matches.
              </Typography>
              <Button variant="contained" fullWidth color="primary">
                Upload your resume
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
