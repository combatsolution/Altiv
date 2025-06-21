import React, { useState } from 'react';
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
  fontSize: 10,
  fontWeight: 600,
  borderRadius: 1,
  px: 0.5,
  py: 0.25,
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

const CareerCard = ({ title, match, rate, salary, experience }) => {
  let variant = matchStyles.success;
  if (match < 50) variant = matchStyles.error;
  else if (match < 80) variant = matchStyles.warning;

  return (
    <Paper variant="outlined" sx={{ p: 2, position: 'relative', width: '100%' }}>
      <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Box component="span" sx={badgeStyles}>
        {rate} Transition rate
      </Box>
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
};

export default function CareerCompassTitle() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [jobTitle, setJobTitle] = useState('Lead Data Scientist');
  const [expYears, setExpYears] = useState(5);

  const paths = {
    current: {
      title: 'Lead Data Scientist',
      match: 95,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '8-12 years',
    },
    next: Array(4).fill({
      title: 'Senior Data Scientist',
      match: 80,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '8-12 years',
    }),
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
    <Box sx={{ bgcolor: 'white', p: { xs: 2, sm: 3, md: 5 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Title & Filters */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, float: 'right' }}>
          <Button variant="outlined">Upload resume to unlock your potential</Button>
        </Box>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item>
            <Typography fontSize={14}>Lead Data Scientist</Typography>
          </Grid>
          <Grid item>
            <Select size="small" value={expYears} onChange={(e) => setExpYears(e.target.value)}>
              <MenuItem value={5}>5 Years</MenuItem>
              <MenuItem value={10}>10 Years</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Button variant="outlined">Modify</Button>
          </Grid>
        </Grid>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Popular: <b>Senior Data Scientist, Director Data Science</b>
        </Typography>

        {/* Graph Area */}
        <Grid container alignItems="flex-start" spacing={2} sx={{ position: 'relative', mb: 4 }}>
          {/* Vertical labels */}
          <Grid item xs="auto">
            <Stack spacing={isMdUp ? 15 : 4} alignItems="center">
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

          {/* Cards */}
          <Grid item xs>
            <Stack spacing={6}>
              <CareerCard {...paths.current} />
              <Grid container spacing={2}>
                {paths.next.map((p, i) => (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <CareerCard {...p} />
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={2}>
                {paths.executive.map((p, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <CareerCard {...p} />
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={2}>
                {paths.alternate.map((p, i) => (
                  <Grid item xs={12} sm={6} md={6} key={i}>
                    <CareerCard {...p} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Buttons */}
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="outlined" sx={{ mx: 1 }}>
            Modify designation
          </Button>
          <Button variant="outlined" sx={{ mx: 1 }}>
            Upload your resume
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
