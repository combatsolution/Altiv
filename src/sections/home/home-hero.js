import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { blue } from '@mui/material/colors';
import heroImg from 'src/images/hero-image.png';
import { Modal, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { paths } from 'src/routes/paths';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import axiosInstance from 'src/utils/axios';
import { useAuthContext } from 'src/auth/hooks';
import { trackEvent } from 'src/utils/google-analytics';
import { useSearchParams } from 'src/routes/hook';
import { RamenDining } from '@mui/icons-material';

function HomeHero() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("resume");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [experience, setExperience] = useState(0);
  const [designation, setDesignation] = useState('');
  const searchParams = useSearchParams();
  const { currentUser } = useAuthContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileDetails, setUploadedFileDetails] = useState(null); // Store uploaded file details
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [docIsLoading, setDocIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  const getButtonLabel = () => {
    if (docIsLoading) return 'Uploading...';
    if (isLoading) return 'Saving...';
    return 'Continue';
  };

  const handleContinue = (Type) => {
    sessionStorage.setItem('userStartedWith', Type);
    sessionStorage.setItem("designation", designation);
    sessionStorage.setItem("experience", experience);
    if (!designation.trim()) {
      setError('Please enter your designation');
      return;
    }
    setError('');
    navigate('/career-compass/');

  };

  const handleOperation = (op) => {
    setExperience((prev) => {
      const newVal = op === 'inc' ? prev + 1 : prev - 1;
      return Math.max(0, Math.min(newVal, 30));
    });
  };

  const handleClose = () => {
    setSelectedFile(null);
    setUploadedFileDetails(null);
    setError('');
    setUploadType('resume');
    setOpen(false);
    sessionStorage.removeItem('uploadedResumeId');
  };

  // Upload file to /files API immediately when file is selected
  const handleFileUpload = async (file) => {
    try {
      setDocIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      // Step 1: upload to /files
      const response = await axiosInstance.post('/files', formData);
      const fileDetails = response.data.files[0];

      // Store the uploaded file details for later use
      setUploadedFileDetails(fileDetails);
      setSelectedFile(file.name);

      enqueueSnackbar('File uploaded successfully', { variant: 'success' });
    } catch (err) {
      console.error('Error uploading file:', err);
      enqueueSnackbar('File upload failed', { variant: 'error' });
      setSelectedFile(null);
      setUploadedFileDetails(null);
    } finally {
      setDocIsLoading(false);
    }
  };

  useEffect(() => {
    const retry = searchParams.get('retry');
    if (retry) {
      setUploadType(retry);
      handleOpenModal();
    }
  }, [searchParams]);

  const handleOpenModal = () => {
    setOpen(true);
  }
  const handleUploadResume = async (fileDetails) => {
    try {
      setIsLoading(true);

      const payload = {
        fileDetails,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,
        userId: currentUser?.id || 0,
      };

      const response = await axiosInstance.post(
        currentUser ? '/resumes' : '/resumes/guest-upload',
        payload);

      if (response.data) {
        enqueueSnackbar('Resume saved successfully', { variant: 'success' });
        setSelectedResumeId(response?.data?.id);
        sessionStorage.setItem('userStartedWith', 'resume');
        sessionStorage.setItem('resumeId', response?.data?.id);
        trackEvent({
          category: 'Resume Uploaded',
          action: 'Resume uploaded',
          label: 'resume uploaded success',
          value: 'resume uploaded'
        });

        // Navigate to career resume page
        navigate(paths.careerResume);
      }
    } catch (uploadError) {
      console.error('Error while saving resume', uploadError);
      enqueueSnackbar(uploadError?.response?.data?.message || 'Resume save failed', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('This document is too large. Please only upload files less than 5MB.');
      return;
    }

    setError('');
    await handleFileUpload(file);
  };

  const handleContinueWithResume = async () => {
    if (!uploadedFileDetails) {
      enqueueSnackbar('Please upload a file first', { variant: 'warning' });
      return;
    }

    // Call /resumes API with the already uploaded file details
    await handleUploadResume(uploadedFileDetails);
  };

  return (
    // Keep original layout and add navigation when resume is uploaded
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 2 }, maxWidth: 1200, mx: 'auto' }}>
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{ minHeight: { xs: 'auto', md: '515px' } }}
      >
        <Grid xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Stack spacing={2}>
            <Typography
              variant="body2"
              component="h1"
              fontWeight="bold"
              sx={{
                fontSize: { xs: '44px', sm: '40px', md: '32px', lg: '54px' },
                fontWeight: 400,
                lineHeight: 1.2,
                marginTop: 4,
              }}
            >
              Your career&apos;s secret weapon
            </Typography>
            <Typography
              variant="body1"
              color="#090808"
              sx={{
                fontWeight: 400,
                fontSize: { xs: '16px', sm: '1.1rem', lg: '20px' },
                lineHeight: '160%',
                width: { xs: '100%', sm: '100%', md: '489px' },
                height: { xs: 'auto', sm: 'auto', md: '130px' },
              }}
            >
              Tired of career uncertainty and endless job searches? Our AI coach guides your next
              move with data-driven insights while matching you to roles you&apos;re truly qualified for
              — all in one place.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              flexWrap="wrap"
              alignItems="flex-start"
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#0040D8',
                  '&:hover': { bgcolor: blue[700] },
                  width: { xs: '100%', sm: '100%', md: '100%', lg: '210px' },
                  height: '46px',
                  borderRadius: '29px',
                  padding: '12px 24px',
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '21px',
                  letterSpacing: '0px',
                  mb: { xs: '20px', sm: '0' },
                  mt: { xs: '50px', sm: '0' },
                }}
                onClick={() => handleOpenModal()}
              >
                Start Free
              </Button>
              <Modal open={open} onClose={handleClose}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minHeight: '100vh', overflowY: 'auto', px: 2, py: 4 }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: 450,
                      bgcolor: 'white',
                      p: 6,
                      px: 4,
                      boxShadow: 3,
                      textAlign: 'center',
                      position: 'relative',
                    }}
                  >
                    <IconButton
                      onClick={handleClose}
                      size="small"
                      sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.500' }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="h5" fontWeight="bold" mb={1}>
                      Magic happens either ways
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={3}>
                      You can choose to go with your updated resume or job title
                    </Typography>

                    <ToggleButtonGroup
                      value={uploadType}
                      exclusive
                      onChange={(event, newValue) => {
                        if (newValue !== null) setUploadType(newValue);
                      }}
                      sx={{
                        mb: 2,
                        borderRadius: '26px',
                        border: '1px solid #0040D8',
                        overflow: 'hidden', // Ensures rounded effect applies
                      }}
                    >
                      <ToggleButton
                        value="resume"
                        disableRipple
                        sx={{
                          textTransform: 'none',
                          px: 4,
                          py: 0.5,
                          borderRadius: '26px !important', // Force override
                          backgroundColor: uploadType === 'resume' ? '#2A4DD0' : '#ffffff',
                          color: uploadType === 'resume' ? '#ffffff' : '#2A4DD0',
                          '&:hover': {
                            backgroundColor: uploadType === 'resume' ? '#2f3da3' : '#f0f0f0',
                          },
                          '&.Mui-selected': {
                            backgroundColor: '#2A4DD0',
                            color: '#ffffff',
                          },
                          '&.Mui-selected:hover': {
                            backgroundColor: '#2f3da3',
                          },
                        }}
                      >
                        Resume
                      </ToggleButton>

                      <ToggleButton
                        value="job"
                        disableRipple
                        sx={{
                          textTransform: 'none',
                          px: 4,
                          py: 0.5,
                          borderRadius: '26px !important', // Force override
                          backgroundColor: uploadType === 'job' ? '#2A4DD0' : '#ffffff',
                          color: uploadType === 'job' ? '#ffffff' : '#2A4DD0',
                          '&:hover': {
                            backgroundColor: uploadType === 'job' ? '#2f3da3' : '#f0f0f0',
                          },
                          '&.Mui-selected': {
                            backgroundColor: '#2A4DD0',
                            color: '#ffffff',
                          },
                          '&.Mui-selected:hover': {
                            backgroundColor: '#2f3da3',
                          },
                        }}
                      >
                        Job title
                      </ToggleButton>
                    </ToggleButtonGroup>
                    {uploadType === 'resume' ? (
                      <>
                        <Box
                          border="2px dashed #cbd5e0"
                          borderRadius={2}
                          bgcolor="#f8faff"
                          width="100%"
                          py={4}
                          px={2}
                          textAlign="center"
                          mb={2}
                          sx={{ cursor: 'pointer' }}
                          onClick={() => fileInputRef.current.click()}
                        >
                          <CloudUploadIcon fontSize="large" style={{ color: '#0040D8' }} />
                          <Typography variant="body1" fontWeight={500} mt={1}>
                            Drag & drop files or{' '}
                            <Box component="span" color="#3f51b5" fontWeight="bold">
                              Browse
                            </Box>
                          </Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            color="textSecondary"
                            mt={1}
                          >
                            Supported formats: PDF, DOC ,DOCX
                          </Typography>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                        </Box>
                        {selectedFile && (
                          <Box
                            border="1px solid #ccc"
                            borderRadius={2}
                            px={2}
                            py={1.5}
                            textAlign="left"
                            fontSize="0.9rem"
                            mb={2}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box>
                              Selected file: <strong>{selectedFile}</strong>
                            </Box>
                            <IconButton
                              size="small"
                              onClick={() => {
                                setSelectedFile(null);
                                setUploadedFileDetails(null);
                                setError('');
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                        {error && (
                          <Typography
                            variant="caption"
                            color="error"
                            display="block"
                            textAlign="left"
                            mb={1}
                          >
                            {error}
                          </Typography>
                        )}
                        <Button
                          variant="contained"
                          fullWidth
                          disabled={!uploadedFileDetails || docIsLoading || isLoading}
                          onClick={handleContinueWithResume}
                          sx={{
                            backgroundColor: '#3f51b5',
                            borderRadius: 999,
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': { backgroundColor: '#2f3da3' },
                          }}
                        >
                          {getButtonLabel()}
                        </Button>


                      </>
                    ) : (
                      <>
                        <Box mb={3} width="100%" textAlign="left">
                          <Typography variant="caption" sx={{ color: '#0040D8' }} ml={1}>
                            Designation
                          </Typography>
                          <Box
                            component="input"
                            placeholder="Enter Designation"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            sx={{
                              width: '100%',
                              mt: 1,
                              px: 2,
                              py: 1.5,
                              border: error ? '1px solid red' : '1px solid #3f51b5',
                              borderRadius: 1,
                              fontSize: '0.9rem',
                            }}
                          />
                          {error && (
                            <Typography variant="caption" color="error" ml={1}>
                              {error}
                            </Typography>
                          )}
                        </Box>
                        <Box width="100%" textAlign="left" mb={4}>
                          <Typography variant="caption" sx={{ color: '#0040D8' }} ml={1}>
                            Experience
                          </Typography>
                          <Box display="flex" alignItems="center" mt={1} gap={1}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleOperation('dec')}
                              disabled={experience <= 0}
                            >
                              -
                            </Button>
                            <input
                              type="range"
                              min={0}
                              max={30}
                              value={experience}
                              onChange={(e) => setExperience(Number(e.target.value))}
                              style={{ flex: 1 }}
                            />
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleOperation('inc')}
                              disabled={experience >= 30}
                            >
                              +
                            </Button>
                            <Box
                              ml={2}
                              px={2}
                              py={1}
                              border="1px solid #ccc"
                              borderRadius={1}
                              fontSize="0.9rem"
                              minWidth="40px"
                              textAlign="center"
                            >
                              {experience}
                            </Box>
                          </Box>
                        </Box>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            backgroundColor: '#3f51b5',
                            borderRadius: 999,
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': { backgroundColor: '#2f3da3' },
                          }}
                          onClick={() => { handleContinue(uploadType) }}
                        >
                          Continue
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
              </Modal>
              <Button

                variant="outlined"
                component={RouterLink}
                to='/post/how-altiv-works'
                target='_blank'
                sx={{
                  textTransform: 'none',
                  color: '#0040D8',
                  height: '48px',
                  width: { xs: '100%', sm: '100%', md: '100%', lg: '218px' },
                  border: '2px solid #0040D8',
                  borderRadius: '29px',
                  padding: '10px 14px',
                  gap: '4px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    borderColor: blue[700],
                    color: blue[700],
                  },
                }}
              >
                Know How it Works
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ mt: { xs: 4, md: 0 } }}>
          <Box
            component="img"
            src={heroImg}
            alt="AI Coach"
            sx={{
              ml: { sm: 6, lg: 0 },
              width: '100%',
              maxHeight: { xs: 'auto', md: '500px' },
              objectFit: 'contain',
              marginTop: { xs: '40px', lg: '80px' },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeHero;