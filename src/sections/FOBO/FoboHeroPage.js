
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from 'src/auth/hooks';
// import { HOST_API } from 'src/config-global';
// import {
//   Box,
//   Stack,
//   Button,
//   Typography,
//   Grid,
//   Modal,
//   useMediaQuery,
//   useTheme,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Alert,
//   IconButton,
// } from '@mui/material';
// import { blue, indigo, green } from '@mui/material/colors';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import DeleteIcon from '@mui/icons-material/Delete';
// import heroImg from 'src/Fogoimages/beatfobo.png';
// import { paths } from 'src/routes/paths';
// import axiosInstance from 'src/utils/axios';

// export default function FoboHeroPage() {
//   const { user: currentUser } = useAuthContext();
//   const [open, setOpen] = useState(false);
//   const [existingResumes, setExistingResumes] = useState([]);
//   const [selectedResumeId, setSelectedResumeId] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [linkedInUrl, setLinkedInUrl] = useState('');
//   const [error, setError] = useState('');
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     if (currentUser) {
//       setExistingResumes(currentUser.resumes || []);
//     }
//   }, [currentUser]);

//   const handleOpenModal = () => {
//     if (!currentUser) {
//       navigate(paths.auth.jwt.login, { state: { returnTo: paths.FoboHeroPage } });
//     } else {
//       setOpen(true);
//     }
//   };

//   const handleFileChange = (e) => {
//     const f = e.target.files?.[0];
//     if (f) {
//       setSelectedFile(f);
//       setSelectedResumeId(null);
//       setError('');
//     }
//   };

//   const handleSelectResume = (id) => {
//     setSelectedResumeId(id);
//     setSelectedFile(null);
//     setError('');
//   };

//   const handleDeleteResume = async (id) => {
//     try {
//       if (!window.confirm('Are you sure you want to delete this resume?')) return;

//       await axiosInstance.delete(`/resumes/${id}`);
//       setExistingResumes((prev) => prev.filter((resume) => resume.id !== id));

//       if (selectedResumeId === id) {
//         setSelectedResumeId(null);
//       }
//     } catch (err) {
//       console.error('Error deleting resume:', err);
//       setError('Failed to delete resume. Please try again.');
//     }
//   };

//   const handleContinue = async () => {
//     if (!currentUser) {
//       navigate(paths.auth.jwt.login, { state: { returnTo: paths.FoboHeroPage } });
//       return;
//     }

//     try {
//       setError('');
//       const token = localStorage.getItem('accessToken');

//       if (linkedInUrl && !linkedInUrl.startsWith('https://www.linkedin.com/in/')) {
//         setError('Please enter a valid LinkedIn profile URL.');
//         return;
//       }

//       if (selectedResumeId && !selectedFile && !linkedInUrl) {
//         navigate(paths.dashboardPage);
//         return;
//       }

//       if (selectedFile || linkedInUrl) {
//         const formData = new FormData();
//         if (selectedFile) formData.append('file', selectedFile);

//         const res = await axiosInstance.post('/files', formData);

//         if (!res.data) {
//           const errorText = await res.text();
//           throw new Error(`Upload failed: ${errorText}`);
//         }

//         const data = {};

//         if (linkedInUrl) {
//           data.linkedinUrl = linkedInUrl;
//         }

//         if (selectedFile && res.data) {
//           data.fileDetails = res.data.files[0];
//         }

//         await axiosInstance.post('resumes', data);
//       }

//       navigate(paths.dashboardPage);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || 'An unexpected error occurred.');
//     } 
//   };

//   return (
//     <Box sx={{ px: { xs: 0, sm: 4, md: 6  }, py: { xs:8, sm: 6, md: 8, lg:16 } }}>
//       <Grid container spacing={4} alignItems="center"  >
//         <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}> 
//           <Stack
//             spacing={0}
//             paddingLeft={{xs: 4, sm: 5, md: 6, lg:3}}
//             sx={{
//               width: { xs: '285px', lg: '692px' },
//               height: { xs: '343px', lg: '435px' },
//             }}
//           >
//             <Typography
//               display="flex"
//               fontWeight={700}
//               sx={{
//                 variant: 'h4',
//                 fontFamily: 'Inter',
//                 fontSize: { xs: '16px', sm: '1.1rem', lg: '24px' },
//               }}
//             >
//               From AI Anxiety to AI Advantage
//             </Typography>
//             <Box>
//               <Typography
//               display="flex"  
//               alignItems="center"
//                 justifyContent="center"
//                 component="h1"
//                 fontWeight={700}
//                 lineHeight={1.3}
//                 sx={{ fontSize: { xs: '31px', sm: '1.1rem', lg: '60px' } }}
//               >
//                 Beat FOBO (Fear of Being Obsolete)
//               </Typography>
//               <Typography fontSize="18px" lineHeight={2} weight={400}>
//                 At Altiv, we help you beat decision paralysis with smarter tools and human-first design.
//               </Typography>
//             </Box>
//             <Button
//               variant="contained"
//               size="large"
//               onClick={handleOpenModal}
//               sx={{
//                 bgcolor: '#2A4DD0',
//                 '&:hover': { bgcolor: blue[800] },
//                 width: isMobile ? 'auto' : '233px',
//                 borderRadius: '29px',
//                 height: 63,
//                 mt: { xs: 2, lg: 5 },
//                 ml: { xs: -2, sm: 0, md: 0, lg: 0 },
//               }}
//             >
//               Check Your Score <ArrowForwardIcon />
//             </Button>
//           </Stack>
//         </Grid>
//         <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
//           <Box
//           display="flex"
//             justifyContent="center"
//             component="img"
//             src={heroImg}
//             alt="AI Coach"
//             sx={{
//               width: isMobile ? '299px' : '685px',
//               height: isMobile ? '189px' : '453px',
//               pr: { xs: 0, sm: 0 },
//               pl: { xs: 3, sm: 2 },
//               mt: { xs: 0, lg: -5 },
//             }}
//           />
//         </Grid>
//       </Grid>

//       {/* Modal */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" px={2}>
//           <Box
//             sx={{
//               position: 'relative',
//               width: isMobile ? '90%' : 550,
//               bgcolor: 'background.paper',
//               p: 3,
//               boxShadow: 5,
//               borderRadius: 2,
//             }}
//           >
//             <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
//               <CloseIcon />
//             </IconButton>
//             <Typography variant="h5" mb={1}>
//               Magic happens many ways
//             </Typography>
//             <Typography variant="body2" mb={3}>
//               You can upload a new resume, select an existing one, or add your LinkedIn URL
//             </Typography>
//             {error && (
//               <Alert severity="error" sx={{ mb: 2 }}>
//                 {error}
//               </Alert>
//             )}
//             <Typography variant="subtitle1" fontWeight={600} mb={1}>
//               Select or Upload Resume
//             </Typography>
//             <List sx={{ maxHeight: 160, overflow: 'auto', mb: 2 }}>
//               {existingResumes.length > 0 &&
//                 existingResumes.map((r) => (
//                   <React.Fragment key={r.id}>
//                     <ListItem
//                       selected={selectedResumeId === r.id}
//                       secondaryAction={
//                         <Box display="flex" alignItems="center">
//                           {selectedResumeId === r.id && <CheckCircleIcon sx={{ color: green[600], mr: 1 }} />}
//                           <IconButton edge="end" onClick={() => handleDeleteResume(r.id)} aria-label="delete">
//                             <DeleteIcon sx={{ color: 'red' }} />
//                           </IconButton>
//                         </Box>
//                       }
//                       button
//                       onClick={() => handleSelectResume(r.id)}
//                     >
//                       <ListItemText
//                         primary={
//                           <a
//                             href={r.fileDetails.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             style={{ textDecoration: 'none', color: 'inherit' }}
//                           >
//                             {r.fileDetails.fileName}
//                           </a>
//                         }
//                         secondary={r.uploadedAt}
//                       />
//                     </ListItem>
//                     <Divider />
//                   </React.Fragment>
//                 ))}
//               <ListItem button onClick={() => fileInputRef.current.click()}>
//                 <CloudUploadIcon sx={{ mr: 1 }} />
//                 <ListItemText primary="Add New Resume" />
//               </ListItem>
//             </List>
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx"
//               ref={fileInputRef}
//               style={{ display: 'none' }}
//               onChange={handleFileChange}
//             />
//             {selectedFile && (
//               <Typography variant="body2" mb={2}>
//                 Selected file: <strong>{selectedFile.name}</strong>
//               </Typography>
//             )}
//             <TextField
//               label="LinkedIn Profile URL"
//               fullWidth
//               placeholder="https://www.linkedin.com/in/yourprofile"
//               value={linkedInUrl}
//               onChange={(e) => setLinkedInUrl(e.target.value)}
//               sx={{ mb: 3 }}
//             />
//             <Button
//               variant="contained"
//               fullWidth
//               onClick={handleContinue}
//               sx={{
//                 bgcolor: indigo[500],
//                 '&:hover': { bgcolor: indigo[700] },
//                 borderRadius: 50,
//                 py: 1.5,
//                 textTransform: 'none',
//                 fontWeight: 500,
//               }}
//             >
//               {selectedFile || selectedResumeId || linkedInUrl ? 'Continue' : 'Upload Resume'}
//             </Button> 
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }



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
import DeleteIcon from '@mui/icons-material/Delete';
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

  const handleDeleteResume = async (id) => {
    try {
      if (!window.confirm('Are you sure you want to delete this resume?')) return;

      await axiosInstance.delete(`/resumes/${id}`);
      setExistingResumes((prev) => prev.filter((resume) => resume.id !== id));

      if (selectedResumeId === id) {
        setSelectedResumeId(null);
      }
    } catch (err) {
      console.error('Error deleting resume:', err);
      setError('Failed to delete resume. Please try again.');
    }
  };

  // const handleContinue = async () => {
  //   if (!currentUser) {
  //     navigate(paths.auth.jwt.login, { state: { returnTo: paths.FoboHeroPage } });
  //     return;
  //   }

  //   try {
  //     setError('');
  //     const token = localStorage.getItem('accessToken');

  //     if (linkedInUrl && !linkedInUrl.startsWith('https://www.linkedin.com/in/')) {
  //       setError('Please enter a valid LinkedIn profile URL.');
  //       return;
  //     }

  //     if (selectedResumeId && !selectedFile && !linkedInUrl) {
  //       navigate(paths.dashboardPage);
  //       return;
  //     }

  //     if (selectedFile || linkedInUrl) {
  //       const formData = new FormData();
  //       if (selectedFile) formData.append('file', selectedFile);

  //       const res = await axiosInstance.post('/files', formData);

  //       if (!res.data) {
  //         const errorText = await res.text();
  //         throw new Error(`Upload failed: ${errorText}`);
  //       }

  //       const data = {};

  //       if (linkedInUrl) {
  //         data.linkedinUrl = linkedInUrl;
  //       }

  //       if (selectedFile && res.data) {
  //         data.fileDetails = res.data.files[0];
  //       }

  //       await axiosInstance.post('resumes', data);
  //     }

  //     navigate(paths.dashboardPage);
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.message || 'An unexpected error occurred.');
  //   } 
  // };
   const handleContinue = async () => {
  if (!currentUser) {
    navigate(paths.auth.jwt.login, { state: { returnTo: paths.FoboHeroPage } });
    return;
  }

  // Clear previous error
  setError('');

  // Validate LinkedIn URL if entered
  if (linkedInUrl && !linkedInUrl.startsWith('https://www.linkedin.com/in/')) {
    setError('Please enter a valid LinkedIn profile URL.');
    return;
  }

  // Validation: Must have at least one of these:
  // - selectedResumeId (selecting existing resume)
  // - selectedFile (uploaded new resume)
  // - linkedInUrl (valid URL)
  if (!selectedResumeId && !selectedFile && !linkedInUrl) {
    setError('Please select or upload a resume, or enter a valid LinkedIn URL to continue.');
    return;
  }

  try {
    // If a file or LinkedIn URL is provided, upload/process
    if (selectedFile || linkedInUrl) {
      const formData = new FormData();
      if (selectedFile) formData.append('file', selectedFile);

      // Upload file if selected
      let uploadedFileData = null;
      if (selectedFile) {
        const res = await axiosInstance.post('/files', formData);
        if (!res.data) {
          const errorText = await res.text();
          throw new Error(`Upload failed: ${errorText}`);
        }
        uploadedFileData = res.data.files[0];
      }

      // Prepare resume data
      const data = {};
      if (linkedInUrl) {
        data.linkedinUrl = linkedInUrl;
      }
      if (uploadedFileData) {
        data.fileDetails = uploadedFileData;
      }

      await axiosInstance.post('resumes', data);
    }

    // If an existing resume was selected, no upload needed, just continue
    navigate(paths.dashboardPage);

  } catch (err) {
    console.error(err);
    setError(err.message || 'An unexpected error occurred.');
  }
};

  return (
    <Box sx={{ px: { xs: 0, sm: 4, md: 6  }, py: { xs:8, sm: 6, md: 8, lg:16 } }}>
      <Grid container spacing={4} alignItems="center"  >
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}> 
          <Stack
            spacing={0}
            paddingLeft={{xs: 4, sm: 5, md: 6, lg:3}}
            sx={{
              width: { xs: '285px', lg: '692px' },
              height: { xs: '343px', lg: '435px' },
            }}
          >
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
              display="flex"  
              alignItems="center"
                justifyContent="center"
                component="h1"
                fontWeight={700}
                lineHeight={1.3}
                sx={{ fontSize: { xs: '31px', sm: '1.1rem', lg: '60px' } }}
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
          display="flex"
            justifyContent="center"
            component="img"
            src={heroImg}
            alt="AI Coach"
            sx={{
              width: isMobile ? '299px' : '685px',
              height: isMobile ? '189px' : '453px',
              pr: { xs: 0, sm: 0 },
              pl: { xs: 3, sm: 2 },
              mt: { xs: 0, lg: -5 },
            }}
          />
        </Grid>
      </Grid>

      {/* Modal */}
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
            <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
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
                      selected={selectedResumeId === r.id}
                      secondaryAction={
                        <Box display="flex" alignItems="center">
                          {selectedResumeId === r.id && <CheckCircleIcon sx={{ color: green[600], mr: 1 }} />}
                          <IconButton edge="end" onClick={() => handleDeleteResume(r.id)} aria-label="delete">
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


