  /* eslint-disable no-shadow */
  import React, { useState, useEffect } from 'react';
  import CryptoJS from 'crypto-js';
  import { useNavigate } from 'react-router-dom';
  import { useAuthContext } from 'src/auth/hooks';
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
  import { indigo, green } from '@mui/material/colors';
  import CloudUploadIcon from '@mui/icons-material/CloudUpload';
  import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
  import CloseIcon from '@mui/icons-material/Close';
  import CheckCircleIcon from '@mui/icons-material/CheckCircle';
  import DeleteIcon from '@mui/icons-material/Delete';
  import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
  import heroImg from 'src/Fogoimages/beatfobo2.webp';
  import axiosInstance from 'src/utils/axios';
  import { Upload } from 'src/components/upload';
  import { useSnackbar } from 'notistack';
  import { paths } from 'src/routes/paths';
  import { m } from 'framer-motion';
  import { useSearchParams } from 'src/routes/hook';
  import { trackEvent } from 'src/utils/google-analytics';

  const MotionBox = m(Box);
  const MotionImage = m(Box);

  export default function FoboHeroPage() {
    const searchParams = useSearchParams();
    const { user: currentUser } = useAuthContext();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = useState(false);
    const [existingResumes, setExistingResumes] = useState([]);
    const [docIsLoading, setDocIsLoading] = useState(false);
    const [selectedResumeId, setSelectedResumeId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [linkedInUrl, setLinkedInUrl] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      if (currentUser) {
        setExistingResumes(currentUser.resumes || []);
      }
    }, [currentUser]);

    useEffect(() => {
      const retry = searchParams.get('retry');
      if (retry) handleOpenModal();
    }, [searchParams]);

    const handleOpenModal = () => {
      setOpen(true);
      trackEvent({
        category: 'CTA Clicked',
        action: 'button clicked',
        label: 'Check your score',
        value: 'resume upload popup'
      });
    }

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
        if (selectedResumeId === id) {
          setSelectedResumeId(null);
          setSelectedFile(null);
        };
        trackEvent({
          category: 'Resume Deleted',
          action: 'resume deleted',
          label: 'Delete Resume',
          value: 'resume deleted'
        });
      } catch (err) {
        console.error('Delete error:', err);
        setError('Failed to delete resume.');
      }
    };

    const handleContinue = () => {
      if (
        !selectedFile &&
        !selectedResumeId &&
        (!linkedInUrl || linkedInUrl.trim() === '')
      ) {
        enqueueSnackbar('Please upload details.', { variant: 'error' });
        return;
      }

      try {
        const key = process.env.REACT_APP_ENCRYPTION_KEY;
        if (!key) throw new Error('Encryption key not set');

        let encryptedId = '';
        let encryptedLinkedInUrl = '';

        // Encrypt if selectedResumeId exists (regardless of file presence)
        if (selectedResumeId) {
          encryptedId = encodeURIComponent(
            CryptoJS.AES.encrypt(String(selectedResumeId), key).toString()
          );
          sessionStorage.setItem('xbszya', encryptedId);
        }

        // Encrypt if LinkedIn URL is present and not empty
        if (linkedInUrl && linkedInUrl.trim() !== '') {
          encryptedLinkedInUrl = encodeURIComponent(
            CryptoJS.AES.encrypt(linkedInUrl.trim(), key).toString()
          );
          sessionStorage.setItem('xbszyaef', encryptedLinkedInUrl);
        }

        navigate(paths.dashboardPage);
        trackEvent({
          category: 'Navigation',
          action: 'Fobo score',
          label: 'Continue to fobo score',
          value: 'Fobo analysis page'
        });
      } catch (err) {
        console.error('Error during encryption or navigation:', err);
      }
    };


    const handleUploadResume = async (file) => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post(
          currentUser ? '/resumes' : '/resumes/guest-upload',
          { fileDetails: file }
        );
        if (response.data) {
          enqueueSnackbar('Upload successful', { variant: 'success' });
          setSelectedResumeId(response?.data?.id);
          trackEvent({
            category: 'Resume Uploaded',
            action: 'Resume uploaded',
            label: 'resume uploaded success',
            value: 'resume uploaded'
          });
        }
      } catch (uploadError) {
        console.error('Error while uploading resume', uploadError);
        enqueueSnackbar(uploadError?.error?.message || 'Upload failed', { variant: 'error' });
        setSelectedFile(null);
      } finally {
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
        await handleUploadResume(response.data.files[0]);
        setSelectedFile(response.data.files[0]);
      }
    };


    const handleCloseModel = () => {
      setSelectedResumeId(false);
      setSelectedFile(null);
      setError('');
      setDocIsLoading(false);
      setOpen(false);
    }

    return (
      <Box
        sx={{
          px: { xs: 2, sm: 4, md: 8, lg: 12, xl: 14 },
          py: { xs: 4, sm: 6, md: 4 },
          maxWidth: '1440px',
          mx: 'auto',
          width: '100%',
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, sm: 6, md: 4 }}
          alignItems="center"
          justifyContent="center"
        >
          {/* Text Column */}
          <Grid
            item
            xs={12}
            md={6}
          
            order={{ xs: 2, md: 1 }}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <MotionBox
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Stack spacing={{ xs: 2, sm: 2 }} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography
                  fontWeight="bold"
                  color="text.primary"
                  sx={{
                    mt:0,
                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                  }}
                >
                  From AI Anxiety to AI Advantage
                </Typography>

                <Typography
                  component="h1"
                  fontWeight={700}
                  color="text.primary"
                  sx={{
                    fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem', lg: '60px' },
                    width: { xs: '100%', lg: '100%' },
                    lineHeight: 1,
                    display: { xs: 'none', lg: 'block' },
                  }}
                >
                  Beat FOBO (Fear of Being Obsolete)
                </Typography>

                <Typography
                  component="h1"
                  fontWeight={700}
                  color="text.primary"
                  sx={{
                    fontSize: '2rem',
                    lineHeight: 1.3,
                    display: { xs: 'block', lg: 'none' },
                  }}
                >
                  Beat FOBO{' '}
                  <Box component="span" fontWeight={300}>
                    (Fear of Being Obsolete)
                  </Box>
                </Typography>

                <Typography
                  color="#000000"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    lineHeight: 1.6,
                    maxWidth: { xs: '90%', md: '100%' },
                    textAlign: { xs: 'center', md: 'left' },
                    mx: 'auto',
                  }}
                >
                  At Altiv, we help you beat decision paralysis with smarter tools and human-first
                  design.
                </Typography>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleOpenModal}
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.dark' },
                      borderRadius: '29px',
                      px: 4,
                      py: { xs: 1.5, sm: 2 },
                      textTransform: 'none',
                      minWidth: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      Check Your Score <ArrowForwardIcon fontSize="small" />
                    </Box>
                  </Button>
                </Box>
              </Stack>
            </MotionBox>
          </Grid>

          {/* Image Column */}
          <Grid
            item
            xs={12}
            md={6}
            order={{ xs: 1, md: 2 }}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <MotionImage
              component="img"
              src={heroImg}
              alt="AI Coach"
              initial={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              sx={{
                marginTop: "60px",
                width: '100%',
                maxWidth: { xs: '100%', sm: '80%', md: '100%', xl: '90%' },
                maxHeight: { xs: 250, sm: 300, md: 400, lg: 500, xl: 550 },
                objectFit: 'contain',
              }}
            />
          </Grid>
        </Grid>

        {/* Modal */}
        <Modal open={open} onClose={handleCloseModel}  >
          <Box
            sx={{
              width: { xs: '90%', sm: '80%', md: '450px' },
              maxWidth: '100%',
              bgcolor: 'background.paper',
              p: { xs: 2, sm: 3 },
              boxShadow: 5,
              borderRadius: 2,
              my: 3,
              mx: 'auto',
              // maxHeight: { xs: '90vh', sm: '85vh' },
              // overflowY: 'auto',
              Height:'unset',
             overflow: 'visible',
              position: 'relative',
            }}
          >
            <IconButton onClick={handleCloseModel} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>

            <Typography variant="h5" mb={1}>
              Magic happens many ways
            </Typography>
            <Typography variant="body2" mb={3}>
              Upload a resume, select an existing one, or add LinkedIn URL
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Select or Upload Resume
            </Typography>

            {existingResumes.length > 0 && (
              <List sx={{ maxHeight: 180, overflowY: 'auto', mb: 200, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                {existingResumes.map((r) => (
                  <React.Fragment key={r.id}>
                    <ListItem 
                      selected={selectedResumeId === r.id}
                      button
                      onClick={() => {
                        handleSelectResume(r.id);
                        setSelectedFile(r?.fileDetails);
                      }}
                      secondaryAction={
                        <Box display="flex" alignItems="center">
                          {selectedResumeId === r.id && <CheckCircleIcon sx={{ color: green[600], mr: 1 }} />}
                          <IconButton edge="end" onClick={() => handleDeleteResume(r.id)} size="small">
                            <DeleteIcon sx={{ color: 'error.main', fontSize: '1rem' }} />
                          </IconButton>
                        </Box>
                      }
                      sx={{ py: 1 }}
                    >
                         <ListItemText
                      primary={<a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{r.fileDetails.fileName}</a>}
                      secondary={r.uploadedAt}
                      primaryTypographyProps={{ noWrap: true }}
                      secondaryTypographyProps={{ noWrap: true }}
                    />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}

            {selectedFile?.fileUrl ? (
              <Box sx={{ px: 0, py: 0, border: '1px dashed', borderColor: 'divider', borderRadius: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <InsertDriveFileIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" noWrap>
                    {selectedFile.fileName} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </Typography> 
                </Box>
                <Typography variant="body2">
                  <a href={selectedFile.fileUrl} target="_blank" rel="noopener noreferrer">
                    View / Download File
                  </a>
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setSelectedResumeId(null);
                    setSelectedFile(null);
                    setDocIsLoading(false);
                  }}
                >
                  Remove File
                </Button>
              </Box>
            ) : (
              <Upload
                sx={{ mb: 2,  }}
                loading={!!docIsLoading}
                placeholder="Drop or Select Resume"
                accept={{
                  'application/pdf': [],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
                }}
                file={null}
                error={false}
                onDrop={handleDrop}
                helperText={error && <FormHelperText error>{error}</FormHelperText>}
              />
            )}

            <TextField
              label="LinkedIn Profile URL"
              fullWidth
              placeholder="https://www.linkedin.com/in/yourprofile"
              value={linkedInUrl}
              onChange={(e) => setLinkedInUrl(e.target.value)}
              sx={{ mb: 1}}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleContinue}
              disabled={
                !selectedFile &&
                !selectedResumeId &&
                (!linkedInUrl || linkedInUrl.trim() === '')
              }
              sx={{
                bgcolor: indigo[500],
                '&:hover': { bgcolor: indigo[700]   },
                borderRadius: 50,
                py: 1,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Continue
            </Button>
          </Box>
        </Modal>
      </Box>
    );
  } 
