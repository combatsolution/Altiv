

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

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
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import altiv from 'src/images/altiv.svg';

// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hook';

// config
import { PATH_AFTER_LOGIN } from 'src/config-global';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';

// auth
import { useAuthContext } from 'src/auth/hooks';

// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'notistack';

export default function JwtLoginView() {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuthContext();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();

  // Redirect helper for social buttons
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
      await login?.(data.email, data.password);
      enqueueSnackbar('Login success', {variant : 'success'});
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.error.message);
    }
  });


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center', mt:'-150px' }}>
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
                          icon={
                            password.value
                              ? 'solar:eye-bold'
                              : 'solar:eye-closed-bold'
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

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

            <Button
              fullWidth
              variant="outlined"  
              startIcon={<Iconify icon="logos:google-icon" />}
              onClick={() => handleRedirect('https://www.google.com')}
              sx={{ textTransform: 'none' }}
            >
              Sign in with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<Iconify icon="logos:linkedin-icon" />}
              onClick={() =>
                handleRedirect('https://www.linkedin.com')
              }
              sx={{ textTransform: 'none', mt: 2 }}
            >
              Sign in with LinkedIn
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
            <Typography variant="body2">
              Dont have an account?
            </Typography>
            <Link
              component={RouterLink}
              href={paths.auth.jwt.register}
              variant="subtitle2"
            >
              Register
            </Link>
          </Stack>

          <Typography variant="body2" color="text.secondary" mt={1}>
            Need help? Visit our{' '}
            <Link underline="hover">help center</Link>
          </Typography>
        </FormProvider>
      </Box>
    </Box>
  );
}

