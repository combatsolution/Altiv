import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Stack,
  Typography,
  Select,
  MenuItem,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { NavigateBeforeTwoTone } from '@mui/icons-material';

const labelStyles = {
  primary: {
    bgcolor: 'primary.main',
    color: 'common.white',
    fontSize: 12,
    fontWeight: 600,
    borderRadius: '30%',
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    zIndex: 2,
  },
  secondary: {
    bgcolor: 'common.white',
    border: 1,
    borderColor: 'grey.300',
    color: 'grey.700',
    fontSize: 11,
    fontWeight: 400,
    borderRadius: '30%',
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    zIndex: 2,
  },
};

const badgeStyles = {
  display: 'inline-block',
  bgcolor: '#E8F0FF',
  color: '#1976d2',
  fontSize: 12,
  fontWeight: 600,
  borderRadius: 1,
  px: 1,
  py: 0.75,
  mb: 1,
};

const matchStyles = {
  base: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 10,
    fontWeight: 600,
    px: 1,
    py: 0.5,
    borderRadius: 1,
    textAlign: 'center',
  },
  success: { bgcolor: '#E6F4EA', color: '#2E7D32' },
  warning: { bgcolor: '#FFF8E1', color: '#F9A825' },
  error: { bgcolor: '#FDECEA', color: '#D32F2F' },
};

const CareerCard = ({ title, match, rate, salary, experience, onClick }) => {
  let variant = matchStyles.success;
  if (match < 50) variant = matchStyles.error;
  else if (match < 80) variant = matchStyles.warning;

  return (
    <Paper
      variant="outlined"
      onClick={onClick}
      sx={{
        p: 2,
        position: 'relative',
        width: { xs: '100%', sm: 360 },
        height: 140,
        borderRadius: 2,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          boxShadow: onClick ? 4 : 'none',
        },
      }}
    >
      <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
        {title}
      </Typography>

      <Box component="span" sx={badgeStyles}>
        {rate} Transition rate
      </Box>
      <br />
      <Typography variant="caption" color="grey.600" sx={{ lineHeight: 1.4 }}>
        Salary: {salary}
        <br />
        Experience: {experience}
      </Typography>

      <Box component="span" sx={{ ...matchStyles.base, ...variant }}>
        {match}%<br />
        Match
      </Box>
    </Paper>
  );
};

CareerCard.propTypes = {
  title: PropTypes.string.isRequired,
  match: PropTypes.number.isRequired,
  rate: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default function CareerPathProjection() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [jobTitle, setJobTitle] = useState('Lead Data Scientist');
  const [expYears, setExpYears] = useState(5);
  const [userStartedWith, setUserStartedWith] = useState(null);
  const navigate = useNavigate();
  const [arraymap, setArrayMap] = useState(false);

  useEffect(() => {
    const startedWith = sessionStorage.getItem('userStartedWith');
    setUserStartedWith(startedWith);
  }, []);

  const paths = {
    current: {
      title: 'Lead Data Scientist',
      match: 95,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '8-12 years',
    },
    next: [
      {
        title: 'Senior Data Scientist',
        match: 80,
        rate: '12%',
        salary: '$50L - $55L',
        experience: '8-12 years', 
      },
      {
        title: 'Senior Data Scientist 1',
        match: 90,
        rate: '12%',
        salary: '$50L - $55L',
        experience: '8-12 years',
      },
      {
        title: 'Senior Data Scientist 2',
        match: 80,
        rate: '12%',
        salary: '$50L - $55L',
        experience: '8-12 years',
      },
      {
        title: 'Senior Data Scientist 3',
        match: 75,
        rate: '14%',
        salary: '$50L - $55L',
        experience: '8-12 years',
      },
    ],
    executive: [
      {
        title: 'Director Data Science',
        match: 74,
        rate: '18%',
        salary: '$50L - $55L',
        experience: '8-12 years',
      },
      {
        title: 'Sr Director Data Science',
        match: 74,
        rate: '18%',
        salary: '$50L - $55L',
        experience: '8-12 years',
      },
      {
        title: 'VP Data Science',
        match: 74,
        rate: '18%',
        salary: '$50L - $55L',
        experience: '8-12 years',
      },
    ],
    alternate: [
      {
        title: 'Venture Partner',
        match: 45,
        rate: '18%',
        salary: '$50L - $55L',
        experience: '8-12 years',
      },
      {
        title: 'Independent Board Advisor',
        match: 45,
        rate: '18%',
        salary: '$50L - $55L',
        experience: '8-12 years',
      },
    ],
  };

  return (
    <Box sx={{ bgcolor: 'white', p: { xs: 2, sm: 3 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Title & Filters */}
        {userStartedWith === 'job' && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button variant="outlined">Upload resume to unlock your potential</Button>
          </Box>
        )}
        <Box sx={{ bgcolor: 'white', p: { xs: 2, sm: 3, md: 4 } }}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 1 }}
          >
            {/* Left: Job Title */}
            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FaClipboardList size={16} />

              <Box
                sx={{
                  minWidth: 450,
                  borderBottom: '1px solid #ccc', // light grey line
                  pb: 0.5, // some padding below text
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    px: 1,
                    py: 0.5,
                    display: 'inline-block',
                  }}
                >
                  Lead Data Scientist
                </Typography>
              </Box>
            </Grid>

            {/* Center: Years Dropdown */}
            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FaClipboardList size={16} />
              <Select
                size="small"
                value={expYears}
                onChange={(e) => setExpYears(e.target.value)}
                variant="standard"
                sx={{ minWidth: 450 }}
              >
                <MenuItem value={2}>2 Years</MenuItem>
                {/* <MenuItem value={10}>10 Years</MenuItem> */}
              </Select>
            </Grid>

            {/* Right: Modify Button */}
            <Grid item>
              <Button 
                variant="outlined"
                sx={{
                  borderRadius: '100px',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 6,
                  py: 1,
                  color: 'primary.main',
                  borderColor: 'primary.main',
                }}
              >
                Modify
              </Button>
            </Grid>
          </Grid>

          {/* Popular text */}
          <Grid display="flex" flexDirection="column">
            <Typography variant="caption" color="text.secondary" sx={{ ml: 4 }}>
              Popular: <b>Senior Data Scientist, Director Data Science</b>
            </Typography>

            <Typography
              variant="caption"
              color="black"
              fontSize="18px"
              lineHeight="30px"
              sx={{ ml: 4, mt: 2 }}
            >
              Personalized career path projection for <b>First Name</b> and <b>Job designation</b>
            </Typography>
          </Grid>
        </Box>

        <Grid container alignItems="flex-start" spacing={2} sx={{ mb: 4, position: 'relative' }}>
          {/* Vertical line */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: { xs: 42, md: 50 },
              top: 0,
              bottom: 0,
              width: 10,
              bgcolor: '#F0F0F0',
              zIndex: 0,
              marginLeft: '-1px', // center it behind circles
            }}
          />

          {/* Left column with labels */}
          <Grid item xs="auto" sx={{ position: 'relative', zIndex: 1, mt: 3 }}>
            <Stack spacing={isMdUp ? 15 : 2} alignItems="center">
              <Box sx={labelStyles.primary}>Current Role</Box>
              <Box sx={labelStyles.secondary}>
                Next Level
                <br />
                2-4 yrs
              </Box>
              <Box sx={labelStyles.secondary}>
                Executive
                <br />
                Level
              </Box>
              <Box sx={labelStyles.secondary}>
                Alternate
                <br />
                Path
              </Box>
            </Stack>
          </Grid>

          {/* Right column with cards */}
          <Grid item xs>
            <Stack spacing={6}>
              <CareerCard {...paths.current} />

              {[paths.next, paths.executive, paths.alternate].map((group, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                >
                  {group.map((p, i) => {
                    const isSeniorDataScientist = p.title === 'Senior Data Scientist';
                    return (
                      <Grid item key={i} sx={{ flex: '0 0 auto' }}>
                        <CareerCard
                          {...p}
                          onClick={
                            isSeniorDataScientist ? () => navigate('/job-details') : undefined
                          }
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            sx={{
              borderRadius: 5,
              px: 4,
              bgcolor: 'primary.main',
              color: '#fff',
              '&:hover': {
                boxshadow: 'none',
                bgcolor: 'primary.dark',
                color: '#fff',  
              },
            }}
           
          >
            Show job match
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
