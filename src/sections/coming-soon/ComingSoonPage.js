

import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
// hooks
import { useCountdownDate } from 'src/hooks/use-countdown';
import { ComingSoonIllustration } from 'src/assets/illustrations';

export default function ComingSoonPage() {
  const { days, hours, minutes, seconds } = useCountdownDate(new Date('07/07/2024 21:30'));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box
        sx={{
          minHeight: '20vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 2,
          mt: { xs: 4, sm: 6 },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
          }}
        >
          Coming Soon!
        </Typography>

        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '1rem', sm: '1.25rem' },
            maxWidth: 600,
            mt: 2,
          }}
        >
          We are currently working hard on this page!
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: { xs: 3, sm: 4 },
          px: 2,
        }}
      >
        <ComingSoonIllustration sx={{ width: '100%', maxWidth: 500, height: 'auto' }} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 5,
          px: 2,
        }}
      >
        <TextField
          placeholder="Enter your email"
          fullWidth={isMobile}
          sx={{ maxWidth: 500, mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="h3" size="large"
                sx={{

                  backgroundColor: '#0040d8',
                '&:hover': {
                  backgroundColor: '#002fb3', // darker blue on hover
                },
                color: '#fff',
                }}>
                  Notify Me
                </Button>
              </InputAdornment>
            ),
            sx: {
              pr: 0.5,
              [`&.${outlinedInputClasses.focused}`]: {
                boxShadow: (_theme) => theme.customShadows.z20,
                transition: (_theme) =>
                  theme.transitions.create(['box-shadow'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                [`& .${outlinedInputClasses.notchedOutline}`]: {
                  border: (_theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
                },
              },
            },
          }}
        />
      </Box>
    </>
  );
}

// TimeBlock component remains the same
function TimeBlock({ label, value }) {
  return (
    <div>
      <Box> {value} </Box>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}

TimeBlock.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
