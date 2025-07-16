import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FaClipboardList, FaSortNumericUpAlt, FaInfoCircle } from 'react-icons/fa';

// Badge and label styles
const labelStyles = {
  primary: {
    bgcolor: '#0040D8',
    color: 'common.white',
    fontSize: 12,
    fontWeight: 600,
    borderRadius: '34%',
    width: 79,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    bgcolor: 'common.white',
    border: 1,
    borderColor: 'grey.300',
    color: 'grey.700',
    fontSize: 11,
    fontWeight: 400,
    borderRadius: '50%',
    width: 69,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

// CareerCard Component
const CareerCard = ({ title, match, rate, salary, experience }) => {
  let variant = matchStyles.success;
  if (match < 50) variant = matchStyles.error;
  else if (match < 80) variant = matchStyles.warning;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        position: 'relative',
        minWidth: 260,
        flex: 1,
      }}
    >
      {/* Title */}
      <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
        {title}
      </Typography>

      {/* Transition Rate */}
      <Box sx={{ mb: 1 }}>
        <Box
          component="span"
          sx={{
            ...badgeStyles,
            display: 'inline-block',
          }}
        >
          {rate} Transition rate
        </Box>
      </Box>

      {/* Salary & Experience */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4 }}>
          Salary: <strong>{salary}</strong>
          <br />
          Experience: <strong>{experience}</strong>
        </Typography>
      </Box>

      {/* Match */}
      <Box component="span" sx={{ ...matchStyles.base, ...variant }}>
        {match}%
        <br />
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

// Main Component
export default function CareerPathProjection() {
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
        {/* Input Controls */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ md: 'center' }}
          sx={{ borderBottom: 1, borderColor: 'grey.300', pb: 2, mb: 2 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'left',
              border: 1,
              borderColor: 'grey.300',
              borderRadius: 1,
              px: 2,
              py: 1,
              width: { xs: '100%', md: 320 },
            }}
          >
            <FaClipboardList style={{ marginRight: 8, color: theme.palette.grey[600] }} />
            <TextField
              variant="standard"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              InputProps={{ disableUnderline: true, sx: { fontSize: 14 } }}
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: 1,
              borderColor: 'grey.300',
              borderRadius: 1,
              px: 2,
              py: 1,
              width: { xs: '100%', md: 160 },
            }}
          >
            <FaSortNumericUpAlt style={{ marginRight: 2, color: theme.palette.grey[600] }} />
            <Select
              value={expYears}
              onChange={({ target }) => setExpYears(target.value)}
              disableUnderline
              variant="standard"
              sx={{ fontSize: 14 }}
              fullWidth
            >
              {[...Array(8)].map((_, idx) => (
                <MenuItem key={idx + 1} value={idx + 1}>
                  {idx + 1} Years
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ ml: 'auto' }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: 'none', borderRadius: 999, px: 4, py: 1 }}
            >
              Modify
            </Button>
          </Box>
        </Stack>

        {/* Info Text */}
        <Typography variant="caption" color="grey.500" sx={{ mt: 1, mb: 2 }}>
          Popular: Senior Data Scientist, Director Data Science
        </Typography>

        <Typography variant="body2" sx={{ mb: 4 }}>
          Personalized career path projection for{' '}
          <Box component="span" fontWeight={600} display="inline">
            first name
          </Box>{' '}
          and{' '}
          <Box component="span" fontWeight={600} display="inline">
            Job designation
          </Box>
          <FaInfoCircle
            style={{ marginLeft: 4, color: theme.palette.primary.main, fontSize: 14 }}
          />
        </Typography>

        {/* Career Path Layout */}
        <Box
          sx={{
            position: 'relative',
            border: 1,
            borderColor: 'grey.300',
            borderRadius: '',
            p: 2,
            mb: 4,
          }}
        >
          <Grid container spacing={2}>
            {/* Left labels and vertical line */}
            <Grid item xs={2} md={1} sx={{ position: 'relative' }}>
              {/* Vertical Line */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  width: 2,
                  bgcolor: 'primary.main',
                  zIndex: 0,
                }}
              />
              <Stack
                spacing={6}
                sx={{
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
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

            {/* Right content */}
            <Grid item xs={10} md={11}>
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
        </Box>

        {/* Bottom Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              borderRadius: 999,
              px: 1,
              py: 1.5,
              color: '#ffff',
              bgcolor: '#0040D8',
            }}
          >
            Show job match
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
