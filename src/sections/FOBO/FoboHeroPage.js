import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'src/auth/hooks';
import { HOST_API } from 'src/config-global';
import {
  Box,
  Stack,
  Button,
  Typography,
  Grid,
  Modal,
  useMediaQuery,
  useTheme,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { blue, indigo, green } from '@mui/material/colors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import heroImg from 'src/Fogoimages/beatfobo.png';
import axiosInstance from 'src/utils/axios';
import { Upload, UploadBox } from 'src/components/upload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useSnackbar } from 'notistack';
import { paths } from 'src/routes/paths';
import { m } from 'framer-motion';

const MotionBox = m(Box);
const MotionImage = m(Box);

export default function FoboHeroPage() {
  const { user: currentUser } = useAuthContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [existingResumes, setExistingResumes] = useState([]);
  const [docIsLoading, setDocIsLoading] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (currentUser) {
      setExistingResumes(currentUser.resumes || []);
    }
  }, [currentUser]);

  // const handleOpenModal = () => {
  //   if (currentUser) {
  //     //  navigate(paths.auth.jwt.login, { state: { returnTo: paths.FoboHeroPage } });
  //   } else {
  //     setOpen(true);
  //   }
  // };

  const handleOpenModal = () => {
    if (currentUser) {
      console.warn('User not logged in');
      // For dev testing, allow modal to open anyway:
      // setOpen(true);
      navigate(paths.auth.jwt.login, { state: { returnTo: paths.FoboHeroPage } });
    } else {
      setOpen(true);
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setSelectedFile(f);
      setSelectedResumeId(null);
      setError('');
    }
  };

  const handleSelectResume = (id) => {
    setSelectedResumeId(id);
    setSelectedFile(null);
    setError('');
  };

  const handleDeleteResume = async (id) => {
    try {
      await axiosInstance.delete(`/resumes/${id}`);
      setExistingResumes((prev) => prev.filter((resume) => resume.id !== id));

      const resume = existingResumes.find((res) => res.id === selectedResumeId);
      if (!resume && !selectedFile) {
        setSelectedResumeId(null);
      }

      if (selectedResumeId === id) {
        setSelectedResumeId(null);
      }
    } catch (err) {
      console.error('Error deleting resume:', err);
      setError('Failed to delete resume. Please try again.');
    }
  };

  const handleContinue = async () => {
    if (!selectedResumeId) {
      enqueueSnackbar('Please select or upload resume', { variant: 'error' });
    }

    navigate(paths.dashboardPage(selectedResumeId));
  };

  const handleUploadResume = async (file) => {
    try {
      setIsLoading(true);
      const data = {
        fileDetails: file,
      };

      console.log('data', data);
      const response = await axiosInstance.post(
        currentUser ? '/resumes' : '/resumes/guest-upload',
        data
      );
      if (response.data) {
        enqueueSnackbar('Upload success', { variant: 'success' });
        setSelectedResumeId(response?.data?.id);
      }
      setDocIsLoading(false);
      setIsLoading(false);
      // eslint-disable-next-line no-shadow
    } catch (error) {
      console.error('Error while uploading resume', error);
      enqueueSnackbar(error.error.message, { variant: 'error' });
      setSelectedFile(null);
      setDocIsLoading(false);
      setIsLoading(false);
    }
  };

  const handleDrop = async (acceptedFiles) => {
    setDocIsLoading(true);
    const file = acceptedFiles[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axiosInstance.post('/files', formData);
      const { data } = response;
      await handleUploadResume(data.files[0]);
      setSelectedFile(data.files[0]);
      setDocIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 4, md: 4, lg: 3 },
        py: { xs: 8, sm: 6, md: 8, lg: 16 },
        mx: { lg: 7 },
      }}
    >
      <Grid container spacing={4} alignItems="center" marginTop={1}>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }} alignItems="center">
          <MotionBox
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
          <Stack spacing={1.5}>
            {/* Subtitle */}
            <Typography
              fontWeight="bold"
              color="#212529"
              fontFamily="Inter, sans-serif"
              textAlign={{ xs: 'center', sm: 'left' }}
              sx={{
                fontSize: { xs: '16px', sm: '20px', md: '24px' },
              }}
            >
              From AI Anxiety to AI Advantage
            </Typography>

            {/* Main Heading - Visible only on lg and up */}
            <Typography
              component="h1"
              fontWeight={700}
              color="#212529"
              lineHeight={1}
              width={{ lg: '692px' }}
              textAlign={{ xs: 'center', sm: 'left' }}
              sx={{
                fontSize: { xs: '36px', sm: '48px', md: '56px', lg: '64px' },
                display: { xs: 'none', lg: 'block' },
                mb: 2,
              }}
            >
              Beat FOBO (Fear of Being Obsolete)
            </Typography>

            {/* Mobile View: Split into two, second part lighter */}
           

            <Box
              sx={{
                display: { xs: 'flex', lg: 'none' },
                flexDirection: 'column',
                width: '100%',
                px: 2,
                gap: 1,
              }}
            >
              <Typography
                component="h1"
                fontSize="32px"
                fontWeight={700}
                lineHeight={1.2}
                textAlign="center"
                sx={{ width: '100%' }}
              >
                Beat FOBO{' '}
                <Box component="span" sx={{ fontWeight: 300 }}>
                  (Fear of Being Obsolete)
                </Box>
              </Typography>
            </Box>

            {/* Description Text */}
            <Typography
              fontWeight={400}
              color="#212529"
              textAlign={{ xs: 'left', lg: 'left' }}
              sx={{
                width: { xs: '288px', sm: '100%', md: '100%', lg: '683px' },
                mx: { xs: 'auto', lg: 0 },
                fontSize: { xs: '18px', sm: '20px', md: '20px', lg: '18px' },
                lineHeight: 1.3,
              }}
            >
              At Altiv, we help you beat decision paralysis with smarter tools and human-first
              design.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpenModal}
              sx={{
                bgcolor: '#2A4DD0',
                '&:hover': { bgcolor: '#002fb3' },
                width: isMobile ? '290px' : '233px',
                borderRadius: '29px',
                mt: { xs: 2, lg: 5 },
                mx: { xs: 1 },
                height: { xs: '48px', lg: '60px' },
                textTransform: 'none', // Optional: to keep text case normal
                ml: { lg: 20 },
              }}
            >
              <Box > {/* sx={{ display: 'flex', alignItems: 'center', gap: 1 }} */}
                Check Your Score <ArrowForwardIcon />
              </Box>
            </Button>
          </Stack>
          </MotionBox>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <MotionImage
            component="img"
            src={heroImg}
            alt="AI Coach"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            sx={{ width: isMobile ? '345px' : '685px', height: isMobile ? '189px' : '453px', pr: { xs: 0, sm: 0 }, pl: { xs: 2, sm: 2 }, mt: { xs: 0, lg: -5 } }}
          />
        </Grid>
      </Grid>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)} sx={{ overflowY: 'scroll' }}>
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" px={2}>
          <Box
            sx={{
              position: 'relative',
              width: isMobile ? '90%' : 550,
              bgcolor: 'background.paper',
              p: 3,
              boxShadow: 5,
              borderRadius: 2,
            }}
          >
            <IconButton
              onClick={() => setOpen(false)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" mb={1}>
              Magic happens many ways
            </Typography>
            <Typography variant="body2" mb={3}>
              You can upload a new resume, select an existing one, or add your LinkedIn URL
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Select or Upload Resume
            </Typography>
            {existingResumes.length > 0 && (
              <List sx={{ mb: 2, height: '120px', overflowY: 'scroll' }}>
                {existingResumes.map((r) => (
                  <React.Fragment key={r.id}>
                    <ListItem
                      selected={selectedResumeId === r.id}
                      secondaryAction={
                        <Box display="flex" alignItems="center">
                          {selectedResumeId === r.id && (
                            <CheckCircleIcon sx={{ color: green[600], mr: 1 }} />
                          )}
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteResume(r.id)}
                            aria-label="delete"
                          >
                            <DeleteIcon sx={{ color: 'red' }} />
                          </IconButton>
                        </Box>
                      }
                      button
                      onClick={() => handleSelectResume(r.id)}
                    >
                      <ListItemText
                        primary={
                          <a
                            href={r.fileDetails.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            {r.fileDetails.fileName}
                          </a>
                        }
                        secondary={r.uploadedAt}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
            {selectedFile?.fileUrl ? (
              // Show uploaded file info
              <Box sx={{ px: 2, py: 2, border: '1px dashed #ccc', borderRadius: 2, mb: '10px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <InsertDriveFileIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {selectedFile.fileName} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </Typography>
                </Box>

                {/* Optional Preview Link */}
                <Typography variant="body2">
                  <a href={selectedFile.fileUrl} target="_blank" rel="noopener noreferrer">
                    View / Download File
                  </a>
                </Typography>

                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() => setSelectedFile(null)} // reset state to show upload again
                >
                  Remove File
                </Button>
              </Box>
            ) : (
              // Show Upload Box
              <Upload
                sx={{ mb: '10px' }}
                loading={!!docIsLoading}
                placeholder="Drop or Select Resume"
                accept={{
                  'application/pdf': [],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
                }}
                file={null}
                error={false}
                onDrop={handleDrop}
                helperText={
                  (false || '') && (
                    <FormHelperText error={!!error} sx={{ px: 2 }}>
                      {error ? error?.message : ''}
                    </FormHelperText>
                  )
                }
              />
            )}
            <TextField
              label="LinkedIn Profile URL"
              fullWidth
              placeholder="https://www.linkedin.com/in/yourprofile"
              value={linkedInUrl}
              onChange={(e) => setLinkedInUrl(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleContinue()}
              disabled={!selectedFile && !selectedResumeId}
              sx={{
                bgcolor: indigo[500],
                '&:hover': { bgcolor: indigo[700] },
                borderRadius: 50,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              continue
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
  }
}
