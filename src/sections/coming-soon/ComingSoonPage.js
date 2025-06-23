import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Button, Typography, useTheme, useMediaQuery, Modal, IconButton } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

  const methods = useForm();
  const { handleSubmit, reset, setError } = methods;

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const onSubmit = async (data) => {
    const email = data.email;

    if (!email || !validateEmail(email)) {
      enqueueSnackbar('Please enter a valid email address.', { variant: 'error' });
      setError('email', {
        type: 'manual',
        message: 'Invalid email format',
      });
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
      reset();
      setOpenModal(true);
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
              height: 60,
              '& .MuiInputBase-input': {
                fontSize: '1.1rem',
                py: 1.5,
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
            type="submit"
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

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
            maxWidth: 400,
            width: '90%',
          }}
        >
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Congratulations!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your subscription has been added successfully.
          </Typography>
          <Button
            variant="contained"
            color='primary'
            fullWidth
            sx={{ mt: 3, borderRadius: 5, textTransform: 'none' }}
            onClick={() => setOpenModal(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
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
