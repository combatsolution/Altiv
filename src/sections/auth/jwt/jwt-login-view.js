
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useCallback, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

import {
  Box,
  Link,
  Alert,
  Stack,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import altiv from 'src/images/altiv.svg';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hook';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import { useBoolean } from 'src/hooks/use-boolean';
import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'notistack';
import axiosInstance from 'src/utils/axios';

export default function JwtLoginView() {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuthContext();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const forgotPasswordModal = useBoolean(); // ⬅️ New
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();

  useEffect(() => {
    const googleError = searchParams.get('googleError');
    const errorMessage = searchParams.get('errorMessage');
    if (googleError && errorMessage) {
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  }, [searchParams, enqueueSnackbar]);

  const handleRedirect = useCallback((url) => {
    window.location.href = url;
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res =await login?.(data.email, data.password);
      const{permissions=[]} = res ||{};
      if( permissions.includes ('admin')){
        setErrorMsg("admin not allowed to login");
        return;
      }
        enqueueSnackbar('Login success', { variant: 'success' }); 
      const redirectAfterLogin = sessionStorage.getItem('redirectAfterLogin');
      if (redirectAfterLogin) {
        sessionStorage.removeItem('redirectAfterLogin');
      }
      // permissions.includes('admin')
      // ? setErrorMsg('Admin are not allowed to login'):
      router.replace(redirectAfterLogin || returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error?.error?.message);
    }
  });

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    window.location.href = `${process.env.REACT_APP_HOST_API}auth/google`;
    setIsGoogleLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '260px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <img src={altiv} alt="ALTIV Logo" style={{ marginBottom: 8 }} />

        <Typography variant="h6" mb={1}>
          Login
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your email and password to login
        </Typography>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2.5}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <RHFTextField name="email" label="Email" />

            <Box sx={{ position: 'relative' }}>
              <RHFTextField
                name="password"
                label="Password"
                type={password.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={password.onToggle} edge="end">
                        <Iconify
                          icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
             <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: 'pointer', textAlign: 'right' }}
              onClick={forgotPasswordModal.onTrue} // ⬅️ Open modal
            >
              Forgot Password?
            </Typography>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                textTransform: 'none',
                backgroundColor: '#0040D8',
                color: '#fff',
                '&:hover': { backgroundColor: '#0033b3' },
              }}
            >
              Login
            </LoadingButton>

            <Divider>Or</Divider>

            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isGoogleLoading}
              startIcon={<Iconify icon="logos:google-icon" />}
              onClick={() => handleGoogleLogin()}
              sx={{ textTransform: 'none' }}
            >
              Sign in with Google
            </LoadingButton>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
            <Typography variant="body2">Dont have an account?</Typography>
            <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
              Register
            </Link>
          </Stack>

          <Typography variant="body2" color="text.secondary" mt={1}>
            Need help? Visit our{' '}
            <Link underline="hover" sx={{ cursor: 'pointer' }}>
              help center
            </Link>
          </Typography>
        </FormProvider>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal open={forgotPasswordModal.value} onClose={forgotPasswordModal.onFalse} />
      </Box>
    </Box>
  );
}

// Separate Forgot Password Modal Component
function ForgotPasswordModal({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
  });

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit, 
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await axios.post('/sendResetPasswordLink', { email: data.email });
      await axiosInstance.post(`/sendResetPasswordLink`, {
        email: data.email,
      });
      enqueueSnackbar('Reset password link sent to your email', { variant: 'success' });
      onClose();
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message || 'Failed to send reset link', { variant: 'error' });
    }
  }); 

 

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Forgot Password</DialogTitle>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Typography variant="body2" mb={2}>
            Enter your email address to receive a password reset link.
          </Typography>
          <RHFTextField name="email" label="Email Address" />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton type="submit" variant="contained"  loading={isSubmitting} color='primary'>
            Send Link
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

ForgotPasswordModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};  