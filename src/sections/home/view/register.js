import React from 'react';
import {
  Box, Typography, TextField, Button, Checkbox, FormControlLabel, Stack, Link
} from '@mui/material';
import Logo from './Logo'; // Optional: Replace with your own component or remove

function RegisterForm() {
  return (
    <Box width="100%">
      <Box textAlign="center" mb={4}>
        {/* Logo */}
        <Typography variant="h4" fontWeight="bold" color="primary">
          ALTIV.<span style={{ color: '#0070f3' }}>AI</span>
        </Typography>
        <Typography variant="h6" mt={1}>Register</Typography>
      </Box>

      <Typography variant="body2" mb={2} textAlign="center">
        Enter your details to register
      </Typography>

      <Stack spacing={2}>
        <TextField label="Name" fullWidth size="small" />
        <TextField label="Email" fullWidth size="small" />
        <TextField label="Mobile number" fullWidth size="small" />
        <TextField label="Password" type="password" fullWidth size="small" />
        <TextField label="Confirm Password" type="password" fullWidth size="small" />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label={
            <Typography variant="body2">
              I agree with the terms and conditions
            </Typography>
          }
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ textTransform: 'none', py: 1 }}
        >
          Next
        </Button>
      </Stack>

      <Box mt={4} textAlign="center">
        <Typography variant="body2">
          Need help? Visit our{' '}
          <Link href="#" underline="hover">help center</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default RegisterForm;
