import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Container,
  Typography,
  IconButton,
  Paper,
  Link,
  Grid,
  Stack,
  Modal,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthContext } from 'src/auth/hooks';
import bgImage from 'src/images/image.png';
import Writelogo from 'src/images/write.svg';

// Sample job matches data
const jobMatches = [
  {
    company: 'Netflix',
    logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'Awesome work, can you...',
  },
  {
    company: 'Google',
    logo: 'https://storage.googleapis.com/a1aa/image/b34fb2e9-b9cb-4fc2-144f-63f7040062d2.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'About files I can...',
  },
  {
    company: 'Netflix',
    logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'Have a great afternoon...',
  },
  {
    company: 'Netflix',
    logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'HE I need more information...',
  },
];

export default function MyProfile() {
  const { user, loading } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) {
    return <Box>Loading profile...</Box>;
  }

  if (!user) {
    return <Box>Please log in to view your profile.</Box>;
  }

  const profileImage = user.avatar?.fileUrl || '';
  const fullName = user.displayName || `${user.firstName} ${user.lastName}`;
  const email = user.email || 'Not provided';
  const phoneNumber = user.phoneNumber || 'Not provided';
  const address = user.fullAddress || user.city || user.state
    ? `${user.fullAddress || ''} ${user.city || ''} ${user.state || ''}`.trim()
    : 'Not provided';
  const resume = user.resumeUrl ? (
    <>
      {user.resumeUrl.split('/').pop()}{' '}
      <Link href={user.resumeUrl} underline="hover">
        View
      </Link>
    </>
  ) : (
    'Not uploaded'
  );

  const handleChangePassword = () => {
    console.log({ currentPassword, newPassword, confirmPassword });
    // Implement actual password change logic here
  };

  return (
    <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Banner & Avatar */}
        <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid transparent' }}>
          <Box
            component="img"
            src={bgImage}
            alt="Banner"
            sx={{ width: '100%', height: 300, objectFit: 'cover' }}
          />
          <Paper
            elevation={3}
            sx={{
              position: 'relative',
              p: 2,
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              bgcolor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(6px)',
              borderRadius: 2,
              mt: -6,
              mx: 2,
            }}
          >
            <Avatar src={profileImage} sx={{ width: 48, height: 48 }} />
            <Box>
              <Typography fontWeight="600">{fullName}</Typography>
              <Typography fontSize="0.75rem" color="text.secondary">
                {user.jobTitle || 'Not specified'}
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Grid container spacing={3} mt={3}>
          {/* Profile Information */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ maxWidth: '641.44px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography fontWeight="600" fontSize="16px">
                    Profile Information
                  </Typography>
                  <Box component="img" src={Writelogo} alt="Write Logo" sx={{ height: 20 }} />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '-0.39px',
                    color: '#67748E',
                    mb: 2,
                  }}
                >
                  Directors are responsible for overseeing the development of an organization&apos;s business goals
                  and objectives. They typically work to increase business revenue, identify and develop business
                  opportunities, and expand the company&apos;s presence and its brands.
                </Typography>
              </Box>
              <Stack spacing={1}>
                {[
                  ['Full Name:', fullName],
                  ['Mobile:', phoneNumber],
                  ['Email:', email],
                  ['Resume:', resume],
                  [
                    'Password:',
                    <>
                      ***********{' '}
                      <Link href="#" underline="hover" onClick={() => setOpen(true)}>
                        Change password
                      </Link>
                    </>,
                  ],
                  ['Address:', address],
                ].map(([label, value]) => (
                  <Box key={label} display="flex" gap={1.5}>
                    <Typography sx={{ width: 90 }} fontSize="0.75rem" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography fontSize="0.75rem" fontWeight="600">
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Top Job Matches */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3 }}>
              <Typography fontWeight="600" fontSize="0.9rem" mb={2}>
                Top Job Matches
              </Typography>
              <Stack spacing={2}>
                {jobMatches.map((job, idx) => (
                  <Box key={idx} display="flex" gap={1.5}>
                    <Avatar src={job.logo} sx={{ width: 24, height: 24 }} />
                    <Box flexGrow={1}>
                      <Typography fontSize="0.75rem" fontWeight="600" noWrap>
                        {job.title}
                      </Typography>
                      <Typography fontSize="0.75rem" color="text.secondary" noWrap>
                        {job.snippet}
                      </Typography>
                    </Box>
                    <Link href="#" fontSize="0.75rem" underline="hover" sx={{ color: '#2563EB' }}>
                      Status
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Password Change Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          px={2}
        >
          <Box
            sx={{
              width: isMobile ? '90%' : 400,
              position: 'relative',
              bgcolor: 'background.paper',
              p: 3,
              boxShadow: 5,
              borderRadius: 2,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography variant="h6" mb={2}>
              Change Password
            </Typography>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              margin="normal"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Box display="flex" gap={2}>
              <Button variant="contained" fullWidth onClick={handleChangePassword}>
                Change Password
              </Button>
              <Button variant="outlined" fullWidth onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}