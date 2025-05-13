import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
} from '@mui/material';

function RegisterForm() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={4}
      px={2}
    >
      <Box mb={2}>
        <img src="/logo.png" alt="ALTIV.AI Logo" style={{ height: 30 }} />
      </Box>

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Register
      </Typography>

      <Typography variant="body2" mb={2}>
        Enter your details to register
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Name" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Email" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Mobile number" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth type="password" label="Password" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth type="password" label="Confirm Password" variant="outlined" />
        </Grid>
      </Grid>

      <FormControlLabel
        control={<Checkbox />}
        label={
          <Typography variant="body2">
            I agree with the <Link href="#">terms and conditions</Link>
          </Typography>
        }
        sx={{ mt: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: '#1A73E8',
          '&:hover': { backgroundColor: '#135EC1' },
        }}
      >
        Next
      </Button>

      <Typography variant="caption" mt={4}>
        Need help? Visit our <Link href="#">help center</Link>
      </Typography>
    </Box>
  );
}

export default RegisterForm;
