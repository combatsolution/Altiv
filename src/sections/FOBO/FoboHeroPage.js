import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Button,
  Typography,
  Grid,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { blue } from '@mui/material/colors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import heroImg from 'src/Fogoimages/beatfobo.png';
import { paths } from 'src/routes/paths';

export default function FoboHeroPage() {
  const [open, setOpen] = useState(false);
  const [uploadType, setUploadType] = useState('resume');
  const [existingResumes, setExistingResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // fetch existing resumes
    setExistingResumes([
      { id: 1, name: 'Resume_May2025.pdf', uploadedAt: '2025-05-10' },
      { id: 2, name: 'Resume_Apr2025.docx', uploadedAt: '2025-04-02' }
    ]);
  }, []);

  const handleChangeType = (_, newType) => {
    if (newType) {
      setUploadType(newType);
      setSelectedResumeId(null);
      setSelectedFile(null);
      setLinkedInUrl('');
    }
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file.name);
  };

  const handleSelectResume = id => {
    setSelectedResumeId(id);
    setSelectedFile(null);
    setLinkedInUrl('');
  };

  const handleContinue = () => {
    if (selectedResumeId || selectedFile || linkedInUrl) {
      if (linkedInUrl) {
        window.open(linkedInUrl, '_blank'); // Open LinkedIn URL in a new tab
      } else {
        // submit data or navigate
        // navigate(paths.jobDetails);
      }
    } else if (uploadType === 'resume') {
      fileInputRef.current?.click(); // Ensure file input reference exists
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg:9 }, py: { xs: 4, sm: 6, md: 8 } }}>
      <Grid container spacing={4} alignItems="center">
        <Grid xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Stack spacing={3}>
            <Typography sx={{ fontWeight: 700, fontSize: '24px', color: '#212529' }}>
              From AI Anxiety to AI Advantage
            </Typography>
            <Typography component="h1" sx={{ fontWeight: 700, fontSize: '64px', color: '#212529', lineHeight: 1 }}>
              Beat FOBO (Fear of Being Obsolete)
            </Typography>
            <Typography sx={{ fontSize: '17px', lineHeight: 2, color: '#212529' }}>
              At Altiv, we help you beat decision paralysis with smarter tools and human-first design.
            </Typography>
            <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#4F9CF9',
                  '&:hover': { bgcolor: blue[700] },
                  width: isMobile ? '100%' : '252px',
                  borderRadius: '8px',
                  height: '63px'
                }}
                onClick={() => setOpen(true)}
              >
                Check Your Score <ArrowForwardIcon />
              </Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <Box
            component="img"
            src={heroImg}
            alt="AI Coach"
            sx={{ width: '100%', maxWidth: '685px', height: 'auto', mt: { xs: 2, md: 0 } }}
          />
        </Grid>
      </Grid>

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
              width: isMobile ? '90%' : 550,
              height: isMobile ? '90%' : 500,
              bgcolor: 'white',
              pt: 1,
              px: 3,
              boxShadow: 5,
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" fontWeight={400} mb={1}>
              Magic happens many ways
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={4}>
              You can choose an existing resume, upload new one, or paste your LinkedIn URL
            </Typography>

            <ToggleButtonGroup
              value={uploadType}
              exclusive
              onChange={handleChangeType}
              sx={{ mb: 3, border: '1px solid #0040D8' }}
            >
              <ToggleButton
                value="resume"
                sx={{
                  textTransform: 'none',
                  borderradius:'25px',
                  px: 6,
                  '&.Mui-selected': {
                    backgroundColor: '#0040D8', 
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#0036b3', // optional: slightly darker on hover
                    },

                  },
                }}
              >
                Resume
              </ToggleButton>
              <ToggleButton
                value="linkedin"
                sx={{
                  textTransform: 'none',
                  px: 4,
                  '&.Mui-selected': {
                    backgroundColor: '#0040D8',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#0036b3',
                    },
                  },
                }}
              >
                LinkedIn URL
              </ToggleButton>
            </ToggleButtonGroup>

            {uploadType === 'resume' ? (
              <>
                <List sx={{ maxHeight: 160, overflow: 'auto', textAlign: 'left', mb: 2 }}>
                  {existingResumes.map(r => (
                    <React.Fragment key={r.id}>
                      <ListItem
                        button
                        selected={selectedResumeId === r.id}
                        onClick={() => handleSelectResume(r.id)}
                      >
                        <ListItemText primary={r.name} secondary={r.uploadedAt} />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                  <ListItem button onClick={() => fileInputRef.current.click()} >
                    <CloudUploadIcon sx={{ mr: 1 }} />
                    <ListItemText primary="Add New Resume" />
                  </ListItem>
                </List>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <Typography variant="body2" textAlign="left" my={1}>
                    Selected file: <strong>{selectedFile}</strong>
                  </Typography>
                )}
              </>
            ) : (
              <Box mb={4}>
                <TextField
                  label="LinkedIn Profile URL"
                  placeholder="https://www.linkedin.com/in/yourprofile"
                  fullWidth
                  value={linkedInUrl}
                  onChange={e => setLinkedInUrl(e.target.value)}
                />
              </Box>
            )}

            <Button
              variant="contained"
              halfWidth
              onClick={handleContinue}
              sx={{
                backgroundColor: '#3f51b5',
                borderRadius: 50,
                py: 1,
                px: 2,
                m: 'auto',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { backgroundColor: '#2f3da3' }
              }}
            >
              {selectedResumeId || selectedFile || linkedInUrl ? 'Continue' : 'Upload Resume'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

