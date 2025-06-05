import React, { useState, useRef } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthContext } from 'src/auth/hooks';
import bgImage from 'src/images/image.png';
import Writelogo from 'src/images/write.svg';
import axiosInstance from 'src/utils/axios';

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
];

export default function MyProfile() {
  const { user, loading } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(user?.resumeUrl || '');

  const fileInputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const profileImage = user?.avatar?.fileUrl || '';
  const fullName = user?.displayName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
  const email = user?.email || '';
  const phoneNumber = user?.phoneNumber || '';
  const address =
    user?.fullAddress || user?.city || user?.state
      ? `${user?.fullAddress || ''} ${user?.city || ''} ${user?.state || ''}`.trim()
      : '';

  const [profileData, setProfileData] = useState({
    fullName,
    phoneNumber,
    email,
    address,
    description: `Directors are responsible for overseeing the development of an organization's business goals and objectives...`,
  });

  if (loading) return <Box>Loading profile...</Box>;
  if (!user) return <Box>Please log in to view your profile.</Box>;

  const handleChangePassword = async () => {
    try {
      await axiosInstance.post('/setPassword', {
        oldPassword: currentPassword,
        newPassword,
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = () => {
    // Send `profileData` to backend if needed
    setEditOpen(false);
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleUploadResume = async () => {
    if (!resumeFile) return;
    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
      const response = await axiosInstance.post('/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResumeUrl(response.data.resumeUrl);
      setResumeFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleDeleteResume = async () => {
    try {
      await axiosInstance.delete('/delete-resume');
      setResumeUrl('');
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
              <Typography fontWeight="600">{profileData.fullName}</Typography>
              <Typography fontSize="0.75rem" color="text.secondary">
                {user.jobTitle || 'Not specified'}
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography fontWeight="600" fontSize="16px">
                  Profile Information
                </Typography>
                <IconButton onClick={() => setEditOpen(true)}>
                  <Box component="img" src={Writelogo} alt="Write Logo" sx={{ height: 20 }} />
                </IconButton>
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
                {profileData.description}
              </Typography>

              <Stack spacing={1}>
                {[
                  ['Full Name:', profileData.fullName],
                  ['Mobile:', profileData.phoneNumber],
                  ['Email:', profileData.email],
                  ['Address:', profileData.address],
                  [
                    'Resume:',
                    resumeUrl ? (
                      <Link
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        sx={{ fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        {resumeUrl.split('/').pop()}
                      </Link>
                    ) : (
                      <Typography fontSize="0.75rem" fontWeight="600" color="text.secondary">
                        No resume uploaded
                      </Typography>
                    ),
                  ],
                  [
                    'Password:',
                    <>
                      ***********{' '}
                      <Link href="#" underline="hover" onClick={() => setOpen(true)}>
                        Change password
                      </Link>
                    </>,
                  ],
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

            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography fontWeight="600" fontSize="0.9rem" mb={2}>
                Resume
              </Typography>

              {resumeUrl ? (
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography
                    fontSize="0.75rem"
                    noWrap
                    sx={{ cursor: 'pointer', color: '#2563EB' }}
                    onClick={() => window.open(resumeUrl, '_blank')}
                  >
                    {resumeUrl.split('/').pop()}
                  </Typography>

                  <Box>
                    <IconButton size="small" onClick={() => window.open(resumeUrl, '_blank')}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={handleDeleteResume}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                <Typography fontSize="0.75rem" color="text.secondary" mb={2}>
                  No resume uploaded
                </Typography>
              )}

              <Box mt={2}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => fileInputRef.current.click()}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  {resumeFile ? resumeFile.name : 'Select File'}
                </Button>
                {resumeFile && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleUploadResume}
                    fullWidth
                  >
                    Upload Resume
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Password Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" px={2}>
          <Box
            sx={{
              width: isMobile ? '90%' : 400,
              bgcolor: 'background.paper',
              p: 3,
              boxShadow: 5,
              borderRadius: 2,
              position: 'relative',
            }}
          >
            <IconButton aria-label="close" onClick={() => setOpen(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography variant="h6" mb={2}>Change Password</Typography>
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
              <Button variant="contained" fullWidth onClick={handleChangePassword}>Change</Button>
              <Button variant="outlined" fullWidth onClick={() => setOpen(false)}>Cancel</Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" px={2}>
          <Box
            sx={{
              width: isMobile ? '90%' : 500,
              bgcolor: 'background.paper',
              p: 3,
              boxShadow: 5,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" mb={2}>Edit Profile</Typography>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                fullWidth
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
              />
              <TextField
                label="Phone Number"
                fullWidth
                value={profileData.phoneNumber}
                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
              />
              <TextField
                label="Email"
                fullWidth
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
              <TextField
                label="Address"
                fullWidth
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              />
              <TextField
                label="Description"
                multiline
                minRows={4}
                fullWidth
                value={profileData.description}
                onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
              />
            </Stack>
            <Box display="flex" gap={2} mt={3}>
              <Button variant="contained" fullWidth onClick={handleEditSubmit}>Save</Button>
              <Button variant="outlined" fullWidth onClick={() => setEditOpen(false)}>Cancel</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}


