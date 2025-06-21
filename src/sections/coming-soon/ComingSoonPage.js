import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
// hooks
import { useForm, FormProvider } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form'; // update path as needed
import { useCountdownDate } from 'src/hooks/use-countdown';
import { ComingSoonIllustration } from 'src/assets/illustrations';
// axios instance
import axiosInstance from 'src/utils/axios';
import { paths } from 'src/routes/paths';

export default function ComingSoonPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();
  const { days, hours, minutes, seconds } = useCountdownDate(new Date('07/07/2024 21:30'));

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const onSubmit = async (data) => {
  //   const email = data.email;

  //   if (!email) {
  //     enqueueSnackbar('Please enter a valid email', { variant: 'warning' });
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const now = new Date().toISOString();

  //     const payload = {
  //       email,
  //       createdAt: now,
  //       updatedAt: now,
  //       deletedAt: now,
  //       isDeleted: false,
  //     };

  //     await axiosInstance.post('/wait-lists', payload);
  //     enqueueSnackbar('You have been subscribed successfully!', { variant: 'success' });
  //     reset();
  //   } catch (err) {
  //     console.error('Subscription failed', err);
  //     enqueueSnackbar('Failed to subscribe. Please try again later.', { variant: 'error' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const onSubmit = async (data) => {
    const email = data.email;

    if (!email) {
      enqueueSnackbar('Please enter a valid email', { variant: 'warning' });
      return;
    }

    try {
      setLoading(true);
      const now = new Date().toISOString();

      const payload = {
        email,
        createdAt: now,
        updatedAt: now,
        deletedAt: now,
        isDeleted: false,
      };

      await axiosInstance.post('/wait-lists', payload);
      // enqueueSnackbar('You have been subscribed successfully!', { variant: 'success' });
      reset();

      // ✅ Redirect only after success
      navigate(paths.SubscriptionSuccess);
    } catch (err) {
      console.error('Subscription failed', err);
      enqueueSnackbar('Failed to subscribe. Please try again later.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
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

      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            mt: 5,
            px: 1,
            mx: isMobile ? 1 : 0,
          }}
        >
          <RHFTextField
            name="email"
            placeholder="Enter your email"
            fullWidth={isMobile}
            sx={{
              maxWidth: 500,
              height: 60, // Increase height
              '& .MuiInputBase-input': {
                fontSize: '1.1rem', // Increase text size
                py: 1.5, // Increase vertical padding inside input
              },
            }}
            InputProps={{
              sx: {
                height: 60,
                fontSize: '1.1rem',
                py: 1.5,
                pr: 0.5,
                [`&.${outlinedInputClasses.focused}`]: {
                  boxShadow: theme.customShadows.z20,
                  transition: theme.transitions.create(['box-shadow'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                  [`& .${outlinedInputClasses.notchedOutline}`]: {
                    border: `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
                  },
                },
              },
            }}
          />

          <Button
            type="submit" // ✅ Correctly triggers form submission
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              width: isMobile ? '50%' : 'auto',
              backgroundColor: '#0040d8',
              '&:hover': {
                backgroundColor: '#002fb3',
              },
              color: '#fff',
              mb: isMobile ? 2 : 0,
            }}
          >
            {loading ? 'Sending...' : 'Notify Me'}
          </Button>
        </Box>
      </FormProvider>
    </>
  );
}

function TimeBlock({ label, value }) {
  return (
    <div>
      <Box>{value}</Box>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}

TimeBlock.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
