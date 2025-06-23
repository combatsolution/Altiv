import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Link,
  Alert,
  Stack,
  Typography,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hook';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import altiv from 'src/images/altiv.svg';
import { useSnackbar } from 'notistack';
import { PATH_AFTER_LOGIN } from 'src/config-global';

export default function JwtRegisterView() {
  const { enqueueSnackbar } = useSnackbar();
  const { register } = useAuthContext();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .test('full-name', 'Full name is required (e.g., First Last)', (value) => {
        if (!value) return false;
        const parts = value.trim().split(/\s+/);
        return parts.length >= 2;
      }),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Mobile number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.email, data.password, data.name, data.phone);
      enqueueSnackbar('Register success', { variant: 'success' });
      router.replace(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.error.message);
    }
  });

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    window.location.href = `${process.env.REACT_APP_HOST_API}/auth/google`;
    setIsGoogleLoading(false);
  };

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
      <Box
        sx={{
          width: '100%',
          maxWidth: 450,
          textAlign: 'center',
          
        }}
      >
        <img src={altiv} alt="ALTIV Logo" style={{marginBottom:10}}  
         />

        <Typography variant="h5" fontWeight="bold" gutterBottom  >
          Register
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your details to register
        </Typography>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2.5}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <RHFTextField name="name" label="Full Name" required />
            <RHFTextField name="email" label="Email" required />
            <RHFTextField name="phone" label="Mobile number" />

            <RHFTextField
              name="password"
              label="Password"
              required
              type={password.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="confirmPassword"
              label="Confirm Password "
              type="password"
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  sx={{ color: '#0040d8', mt: 0.10 }} // fine-tune vertical alignment
                />
              }
              label={
                <Typography variant="body2" component="span" sx={{ lineHeight: 1.6 }}>
                  I agree with the{' '}
                  <Link
                    underline="always"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(paths.TermsAndConditions);
                    }}
                    sx={{ color: '#0040d8', cursor: 'pointer' }}
                  >
                    terms and conditions
                  </Link>
                </Typography>
              }
              sx={{
                alignItems: 'center', // aligns checkbox with text
                textAlign: 'left',
                mt: 1,
              }}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#0040d8',
                '&:hover': {
                  backgroundColor: '#002fb3', // darker blue on hover
                },
              }}
            >
              Next
            </LoadingButton>

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
        </FormProvider>

        <Typography variant="body2" color="text.secondary" mt={1}>
          Need help? Visit our{' '}
          <Link
            underline="hover"
            onClick={() => router.push(paths.contact)}
            sx={{ cursor: 'pointer' }}
          >
            help center
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
