


import React, { useState, useRef, useEffect } from 'react';
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
} from '@mui/material';
import { blue, indigo, green } from '@mui/material/colors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import heroImg from 'src/Fogoimages/beatfobo.png';
import { paths } from 'src/routes/paths';
import axiosInstance from 'src/utils/axios';

export default function FoboHeroPage() {
  const { user: currentUser } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [existingResumes, setExistingResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (currentUser) {
      setExistingResumes(currentUser.resumes || []);
    }
  }, [currentUser]);

  const handleOpenModal = () => {
    if (!currentUser) {
      navigate(paths.auth.jwt.login, { state: { returnTo: paths.FoboHeroPage } });
    } else {
      setOpen(true);
    }
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

  const handleContinue = async () => {
    if (!currentUser) {
      navigate(paths.auth.jwt.login, { state: { returnTo: paths.FoboHeroPage } });
      return;
    }

    try {
      setError('');

      // Validate LinkedIn URL
      if (linkedInUrl && !linkedInUrl.startsWith('https://www.linkedin.com/in/')) {
        setError('Please enter a valid LinkedIn profile URL.');
        return;
      }

      // Case 1: Only selecting existing resume
      if (selectedResumeId && !selectedFile && !linkedInUrl) {
        // Assuming existing resume analysis is already stored or handled elsewhere
        navigate(paths.dashboardPage);
        return;
      }

      // Case 2: Uploading file or LinkedIn URL (or both)
      if (selectedFile || linkedInUrl) {
        const formData = new FormData();
        if (selectedFile) formData.append('file', selectedFile);
        formData.append('user_id', currentUser.id);
        if (linkedInUrl) formData.append('linkedin_url', linkedInUrl);
        formData.append('X-apiKey', '2472118222258182');
        formData.append('short_task_description', 'true');

        // Call the FOBO API
        const response = await axiosInstance.post('http://164.52.199.74:8080/fobo/', formData, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.status !== 'success') {
          throw new Error(response.data.message || 'API request failed');
        }

        // Store API response in local storage for dashboard
        localStorage.setItem('foboAnalysis', JSON.stringify(response.data.data));

        // Optionally, upload file to your server if needed
        if (selectedFile) {
          const fileFormData = new FormData();
          fileFormData.append('file', selectedFile);
          const fileRes = await axiosInstance.post('/files', fileFormData);
          if (!fileRes.data) {
            throw new Error('File upload failed');
          }
        }

        // Navigate to dashboard
        navigate(paths.dashboardPage);
      } else {
        setError('Please upload a resume or provide a LinkedIn URL.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Box sx={{ px: { xs: 0, sm: 4, md: 6 }, py: { xs: 4, sm: 6, md: 8 } }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Stack spacing={0} paddingLeft={3} sx={{ width: { xs: 'auto', lg: '692px' }, height: { xs: '343px', lg: '435px' } }}>
            <Typography
              display="flex"
              fontWeight={700}
              sx={{
                variant: 'h4',
                fontFamily: 'Inter',
                fontSize: { xs: '16px', sm: '1.1rem', lg: '24px' },
              }}
            >
              From AI Anxiety to AI Advantage
            </Typography>
            <Box>
              <Typography
                component="h1"
                fontWeight={700}
                lineHeight={1.3}
                sx={{ fontSize: { xs: '32px', sm: '1.1rem', lg: '60px' } }}
              >
                Beat FOBO (Fear of Being Obsolete)
              </Typography>
              <Typography fontSize="18px" lineHeight={2} weight={400}>
                At Altiv, we help you beat decision paralysis with smarter tools and human-first design.
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpenModal}
              sx={{
                bgcolor: '#2A4DD0',
                '&:hover': { bgcolor: blue[800] },
                width: isMobile ? 'auto' : '233px',
                borderRadius: '29px',
                height: 63,
                mt: { xs: 2, lg: 5 },
                ml: { xs: -2, sm: 0, md: 0, lg: 0 },
              }}
            >
              Check Your Score <ArrowForwardIcon />
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <Box
            component="img"
            src={heroImg}
            alt="AI Coach"
            sx={{
              width: isMobile ? 'auto' : '685px',
              height: isMobile ? '189px' : '453px',
              pr: { xs: 0, sm: 5 },
              pl: { xs: 2, sm: 2 },
              mt: { xs: 0, lg: -5 },
            }}
          />
        </Grid>
      </Grid>

      <Modal open={open} onClose={() => setOpen(false)}>
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
            <List sx={{ maxHeight: 160, overflow: 'auto', mb: 2 }}>
              {existingResumes.length > 0 &&
                existingResumes.map((r) => (
                  <React.Fragment key={r.id}>
                    <ListItem
                      button
                      selected={selectedResumeId === r.id}
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
                      {selectedResumeId === r.id && <CheckCircleIcon sx={{ color: green[600] }} />}
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              <ListItem button onClick={() => fileInputRef.current.click()}>
                <CloudUploadIcon sx={{ mr: 1 }} />
                <ListItemText primary="Add New Resume" />
              </ListItem>
            </List>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {selectedFile && (
              <Typography variant="body2" mb={2}>
                Selected file: <strong>{selectedFile.name}</strong>
              </Typography>
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
              onClick={handleContinue}
              sx={{
                bgcolor: indigo[500],
                '&:hover': { bgcolor: indigo[700] },
                borderRadius: 50,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              {selectedFile || selectedResumeId || linkedInUrl ? 'Continue' : 'Upload Resume'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

