// // @mui
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

// // ----------------------------------------------------------------------

// export default function PaymentBillingAddress() {
//   return (
//     <div>
//       <Typography variant="h6">Billing Address</Typography>

//       <Stack spacing={3} mt={5}>
//         <TextField fullWidth label="Person name" />
//         <TextField fullWidth label="Phone number" />
//         <TextField fullWidth label="Email" />
//         <TextField fullWidth label="Address" />
//       </Stack>
//     </div>
//   );
// }

import * as Yup from 'yup';
import { useForm, FormProvider as RHFormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import axios from 'axios';

import {
  Typography,
  Stack,
  Box,
  TextField,
  Alert,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

export default function PaymentBillingAddress() {
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');

  const BillingSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
  });

  const defaultValues = {
    name: '',
    phone: '',
    email: '',
    address: '',
  };

  const methods = useForm({
    resolver: yupResolver(BillingSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    setServerError('');
    setServerSuccess('');

    try {
      const response = await axios.post(
   
        data
      );

      // Handle success
      setServerSuccess('Billing information submitted successfully!');
      reset(); // Reset form
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Something went wrong. Please try again.';
      setServerError(message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 480 }}>
        <Typography variant="h6">Billing Address</Typography>

        <RHFormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3} mt={5}>
              {serverError && <Alert severity="error">{serverError}</Alert>}
              {serverSuccess && <Alert severity="success">{serverSuccess}</Alert>}

              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Person Name"
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Email"
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                name="address"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Address"
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  alignSelf: 'flex-start',
                }}
              >
                Save Billing Info
              </LoadingButton>
            </Stack>
          </form>
        </RHFormProvider>
      </Box>
    </Box>
  );
}
