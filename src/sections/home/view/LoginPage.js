// App.js
import React from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Link,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function LoginPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation Placeholder */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption">{`> Login`}</Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A1A1A' }}>
            ALTIV
            <Box component="span" sx={{ color: '#2D9CDB' }}>
              .AI
            </Box>
          </Typography>
          <Typography variant="h6" mt={2}>
            Login
          </Typography>
          <Typography variant="body2" mt={1}>
            Enter your username and password to login
          </Typography>
        </Box>

        <Box component="form" noValidate autoComplete="off">
          <Stack spacing={2}>
            <TextField label="User Name" variant="outlined" size="small" fullWidth defaultValue="Jamesbond007" />
            <TextField label="Password" type="password" variant="outlined" size="small" fullWidth />
            <Box textAlign="right">
              <Link href="#" underline="hover" fontSize="small">
                Forgot Username?
              </Link>
            </Box>
            <Button variant="contained" fullWidth sx={{ textTransform: 'none' }}>
              Login
            </Button>

            <Divider>Or</Divider>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{ textTransform: 'none' }}
            >
              Sign in with Google
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<LinkedInIcon />}
              sx={{ textTransform: 'none' }}
            >
              Sign in with LinkedIn
            </Button>
          </Stack>
        </Box>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            Don’t have an account?{' '}
            <Link href="#" underline="hover">
              Register
            </Link>
          </Typography>
          <Typography variant="body2" mt={1}>
            Need help? Visit our{' '}
            <Link href="#" underline="hover">
              help center
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
