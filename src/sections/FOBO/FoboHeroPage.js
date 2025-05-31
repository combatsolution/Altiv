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

export default function FoboHeroPage() {
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
  const { authenticated } = useAuthContext();

  useEffect(() => {
    const fetchResumes = async () => {
      if (!authenticated) return;
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`${HOST_API}/files`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data || [];
        setExistingResumes(
          list.map((fn) => {
            const [ts, ...parts] = fn.split('_');
            const name = parts.join('_');
            const date = `${ts.slice(0,4)}-${ts.slice(4,6)}-${ts.slice(6,8)}`;
            return { id: ts, name, uploadedAt: date };
          })
        );
      } catch {
        setError('Could not load existing resumes.');
      }
    };
    fetchResumes();
  }, [authenticated]);

  const handleOpenModal = () => {
    if (!authenticated) {
      navigate(paths.auth.jwt.login, { state: { returnTo: paths.FoboHeroPage } });
    } else {
      setOpen(true);
    }
  };

  const handleFileChange = e => {
    const f = e.target.files?.[0];
    if (f) {
      setSelectedFile(f);
      setSelectedResumeId(null);
      setError('');
    }
  };

  const handleSelectResume = id => {
    setSelectedResumeId(id);
    setSelectedFile(null);
    setError('');
  };

  const handleContinue = async () => {
    if (!authenticated) {
      navigate(paths.auth.jwt.login, { state: { returnTo: paths.FoboHeroPage } });
      return;
    }
    try {
      setError('');
      const token = localStorage.getItem('accessToken');

      // Validate LinkedIn if provided
      if (linkedInUrl && !linkedInUrl.startsWith('https://www.linkedin.com/in/')) {
        setError('Please enter a valid LinkedIn profile URL.');
        return;
      }

      // Build multipart form data
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      // if user selected an existing resume, send its ID instead of uploading
      if (selectedResumeId) {
        formData.append('resumeId', selectedResumeId);
      }
      if (linkedInUrl) {
        formData.append('linkedinUrl', linkedInUrl);
      }

      const res = await fetch(`${HOST_API}/files`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
          // NO Content-Type: browser sets it automatically to multipart/form-data
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed (${res.status})`);
      }

      // On success, go to Dashboard
      navigate(paths.Dashboardpage);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, sm: 6, md: 8 } }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Stack spacing={3} paddingLeft={4}>
            <Typography fontWeight={700} fontSize="24px">From AI Anxiety to AI Advantage</Typography>
            <Typography component="h1" fontWeight={700} fontSize="64px" lineHeight={1}>
              Beat FOBO (Fear of Being Obsolete)
            </Typography>
            <Typography fontSize="17px" lineHeight={2}>
              At Altiv, we help you beat decision paralysis with smarter tools and human-first design.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpenModal}
              sx={{
                bgcolor: blue[700],
                '&:hover': { bgcolor: blue[800] },
                width: isMobile ? '100%' : 252,
                borderRadius: '100px',
                height: 63
              }}
            >
              Check Your Score <ArrowForwardIcon sx={{ ml: 1 }} />
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <Box component="img" src={heroImg} alt="AI Coach" sx={{  Width :'685px', Height:'453px', pr:5, pl:0}} />
        </Grid>
      </Grid>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          px={2}
        >
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

            <Typography variant="h5" mb={1}>Magic happens many ways</Typography>
            <Typography variant="body2" mb={3}>
              You can upload a new resume, select an existing one, or add your LinkedIn URL
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Typography variant="subtitle1" fontWeight={600} mb={1}>Select or Upload Resume</Typography>
            <List sx={{ maxHeight: 160, overflow: 'auto', mb: 2 }}>
              {existingResumes.map(r => (
                <React.Fragment key={r.id}>
                  <ListItem
                    button
                    selected={selectedResumeId === r.id}
                    onClick={() => handleSelectResume(r.id)}
                  >
                    <ListItemText primary={r.name} secondary={r.uploadedAt} />
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

            <Typography variant="subtitle1" fontWeight={600} mb={1}>Enter LinkedIn URL</Typography>
            <TextField
              label="LinkedIn Profile URL"
              fullWidth
              placeholder="https://www.linkedin.com/in/yourprofile"
              value={linkedInUrl}
              onChange={e => setLinkedInUrl(e.target.value)}
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
                fontWeight: 500
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
