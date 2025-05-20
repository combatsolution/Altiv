

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
  Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hook';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function JwtRegisterView() {
  const { register } = useAuthContext();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.email, data.password, data.firstName, data.lastName);
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
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
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" color="primary" fontWeight="bold" mb={1}>
          ALTIV.<Box component="span" sx={{ color: '#0070f3' }}>AI</Box>
        </Typography>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Register
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your details to register
        </Typography>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2.5}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <RHFTextField name="firstName" label="Name" />
            <RHFTextField name="email" label="Email" />
            <RHFTextField name="phone" label="Mobile number" />

            <RHFTextField
              name="password"
              label="Password"
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
              label="Confirm Password"
              type="password"
            />
 
            <FormControlLabel
              control={< Checkbox defaultChecked  style={{color:"#0040d8", mb:"2"}} />}
              label={
                <Typography variant="body2">
                  I agree with the{' '}
                  <Link underline="always" style={{color:"#0040d8"}}> 
                  
                    terms and conditions
                  </Link>
                </Typography>
              }
              sx={{ alignItems: 'flex-start', textAlign: 'left' }}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ textTransform: 'none', fontWeight: 'bold', color: '#fff', backgroundColor:"#0040D8" }}
            >
              Next
            </LoadingButton>
          </Stack>
        </FormProvider>

        <Typography variant="body2" color="text.secondary" mt={3}>
          Need help? Visit our{' '}
          <Link underline="hover"  style={{color:"#0040d8"}}>
                  
            help center
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
