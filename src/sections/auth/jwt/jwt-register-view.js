// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { useState } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// // @mui
// import LoadingButton from '@mui/lab/LoadingButton';
// import Link from '@mui/material/Link';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputAdornment from '@mui/material/InputAdornment';
// // hooks
// import { useBoolean } from 'src/hooks/use-boolean';
// // routes
// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';
// import { useSearchParams, useRouter } from 'src/routes/hook';
// // config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
// // auth
// import { useAuthContext } from 'src/auth/hooks';
// // components
// import Iconify from 'src/components/iconify';
// import FormProvider, { RHFTextField } from 'src/components/hook-form';

// // ----------------------------------------------------------------------

// export default function JwtRegisterView() {
//   const { register } = useAuthContext();

//   const router = useRouter();

//   const [errorMsg, setErrorMsg] = useState('');

//   const searchParams = useSearchParams();

//   const returnTo = searchParams.get('returnTo');

//   const password = useBoolean();

//   const RegisterSchema = Yup.object().shape({
//     firstName: Yup.string().required('First name required'),
//     lastName: Yup.string().required('Last name required'),
//     email: Yup.string().required('Email is required').email('Email must be a valid email address'),
//     password: Yup.string().required('Password is required'),
//   });

//   const defaultValues = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//   };

//   const methods = useForm({
//     resolver: yupResolver(RegisterSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await register?.(data.email, data.password, data.firstName, data.lastName);

//       router.push(returnTo || PATH_AFTER_LOGIN);
//     } catch (error) {
//       console.error(error);
//       reset();
//       setErrorMsg(typeof error === 'string' ? error : error.message);
//     }
//   });

//   const renderHead = (
//     <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
//       <Typography variant="h4">Get started absolutely free</Typography>

//       <Stack direction="row" spacing={0.5}>
//         <Typography variant="body2"> Already have an account? </Typography>

//         <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
//           Sign in
//         </Link>
//       </Stack>
//     </Stack>
//   );

//   const renderTerms = (
//     <Typography
//       component="div"
//       sx={{ color: 'text.secondary', mt: 2.5, typography: 'caption', textAlign: 'center' }}
//     >
//       {'By signing up, I agree to '}
//       <Link underline="always" color="text.primary">
//         Terms of Service
//       </Link>
//       {' and '}
//       <Link underline="always" color="text.primary">
//         Privacy Policy
//       </Link>
//       .
//     </Typography>
//   );

//   const renderForm = (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Stack spacing={2.5}>
//         {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

//         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//           <RHFTextField name="firstName" label="First name" />
//           <RHFTextField name="lastName" label="Last name" />
//         </Stack>

//         <RHFTextField name="email" label="Email address" />

//         <RHFTextField
//           name="password"
//           label="Password"
//           type={password.value ? 'text' : 'password'}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={password.onToggle} edge="end">
//                   <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         <LoadingButton
//           fullWidth
//           color="inherit"
//           size="large"
//           type="submit"
//           variant="contained"
//           loading={isSubmitting}
//         >
//           Create account
//         </LoadingButton>
//       </Stack>
//     </FormProvider>
//   );

//   return (
//     <>
//       {renderHead}

//       {renderForm}

//       {renderTerms}
//     </>
//   );
// }

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
              control={<Checkbox defaultChecked color="primary" />}
              label={
                <Typography variant="body2">
                  I agree with the{' '}
                  <Link underline="always" color="primary">
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
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Next
            </LoadingButton>
          </Stack>
        </FormProvider>

        <Typography variant="body2" color="text.secondary" mt={3}>
          Need help? Visit our{' '}
          <Link underline="hover" color="primary">
            help center
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
