// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Stack,
//   Button,
//   Typography,
//   Grid,
//   Modal,
//   ToggleButton,
//   ToggleButtonGroup,
//   useMediaQuery,
//   useTheme,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   Divider
// } from '@mui/material';
// import { blue, indigo } from '@mui/material/colors';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import heroImg from 'src/Fogoimages/beatfobo.png';
// import { paths } from 'src/routes/paths';

// export default function FoboHeroPage() {
//   const [open, setOpen] = useState(false);
//   const [uploadType, setUploadType] = useState('resume');
//   const [existingResumes, setExistingResumes] = useState([]);
//   const [selectedResumeId, setSelectedResumeId] = useState(null);
//   const [selectedFileName, setSelectedFileName] = useState('');
//   const [linkedInUrl, setLinkedInUrl] = useState('');
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     // Fetch or load existing resumes
//     setExistingResumes([
//       { id: 1, name: 'Resume_May2025.pdf', uploadedAt: '2025-05-10' },
//       { id: 2, name: 'Resume_Apr2025.docx', uploadedAt: '2025-04-02' }
//     ]);
//   }, []);

//   const handleChangeType = (_, newType) => {
//     if (newType) {
//       setUploadType(newType);
//       setSelectedResumeId(null);
//       setSelectedFileName('');
//       setLinkedInUrl('');
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFileName(file.name);
//     }
//   };

//   const handleSelectResume = (id) => {
//     setSelectedResumeId(id);
//     setSelectedFileName('');
//     setLinkedInUrl('');
//   };

//   const handleContinue = () => {
//     // If LinkedIn URL provided, open in new tab
//     if (uploadType === 'linkedin' && linkedInUrl) {
//       window.open(linkedInUrl, '_blank');
//     } else if ((uploadType === 'resume' && (selectedResumeId || selectedFileName))) {
//       // Process resume submission (upload or select)
//       // ... your API call or processing logic here ...
//     } else {
//       // If nothing selected, trigger file dialog for upload
//       fileInputRef.current?.click();
//       return;
//     }

//     // Navigate to dashboard after processing
//     navigate(paths.Dashboardpage);
//   };

//   return (
//     <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 9 }, py: { xs: 4, sm: 6, md: 8 } }}>
//       <Grid container spacing={4} alignItems="center">
//         <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
//           <Stack spacing={3}>
//             <Typography fontWeight={700} fontSize="24px" color="#212529">
//               From AI Anxiety to AI Advantage
//             </Typography>
//             <Typography component="h1" fontWeight={700} fontSize="64px" color="#212529" lineHeight={1}>
//               Beat FOBO (Fear of Being Obsolete)
//             </Typography>
//             <Typography fontSize="17px" lineHeight={2} color="#212529">
//               At Altiv, we help you beat decision paralysis with smarter tools and human-first design.
//             </Typography>
//             <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 sx={{
//                   // bgcolor: blue[500],
//                   bgcolor:' #2A4DD0',
                  
//                   '&:hover': { bgcolor: blue[700] },
//                   width: isMobile ? '100%' : '252px',
//                   borderRadius: '100px',
//                   height: '63px'
//                 }}
//                 onClick={() => setOpen(true)}
//               >
//                 Check Your Score <ArrowForwardIcon sx={{ ml: 1 }} />
//               </Button>
//             </Stack>
//           </Stack>
//         </Grid>

//         <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
//           <Box
//             component="img"
//             src={heroImg}
//             alt="AI Coach"
//             sx={{ width: '100%', maxWidth: '685px', height: 'auto', mt: { xs: 2, md: 0 } }}
//           />
//         </Grid>
//       </Grid>

//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="center"
//           minHeight="100vh"
//           px={2}
//         >
//           <Box
//             sx={{
//               width: isMobile ? '90%' : 550,
//               height: isMobile ? '90%' : 500,
//               bgcolor: 'background.paper',
//               p: 3,
//               boxShadow: 5,
//               textAlign: 'center'
//             }}
//           >
//             <Typography variant="h5" fontWeight={400} mb={1}>
//               Magic happens many ways
//             </Typography>
//             <Typography variant="body2" color="textSecondary" mb={4}>
//               You can choose an existing resume, upload new one, or paste your LinkedIn URL
//             </Typography>

//             <ToggleButtonGroup
//               value={uploadType}
//               exclusive
//               onChange={handleChangeType}
//               sx={{ mb: 3, border: '1px solid', borderColor: indigo[500], borderRadius: 2 }}
//             >
//               <ToggleButton value="resume"   sx={{
//                   textTransform: 'none',
//                    borderradius:'25px',
//                    px: 6,
//                   '&.Mui-selected': {                     
//                     backgroundColor: '#0040D8', 
//                      color: '#fff',
//                      '&:hover': {
//                       backgroundColor: '#0036b3', // optional: slightly darker on hover
//                     },

//                   },
//                }}>
//                 Resume
//               </ToggleButton>
//               <ToggleButton value="linkedin"   sx={{
//                   textTransform: 'none',
//                    borderradius:'25px',
//                    px: 6,
//                   '&.Mui-selected': {                     
//                     backgroundColor: '#0040D8', 
//                      color: '#fff',
//                      '&:hover': {
//                       backgroundColor: '#0036b3', // optional: slightly darker on hover
//                     },

//                   },
//                }}>
//                 LinkedIn URL
//               </ToggleButton>
//             </ToggleButtonGroup>

//             {uploadType === 'resume' ? (
//               <>
//                 <List sx={{ maxHeight: 160, overflow: 'auto', textAlign: 'left', mb: 2 }}>
//                   {existingResumes.map((r) => (
//                     <React.Fragment key={r.id}>
//                       <ListItem
//                         button
//                         selected={selectedResumeId === r.id}
//                         onClick={() => handleSelectResume(r.id)}
//                       >
//                         <ListItemText primary={r.name} secondary={r.uploadedAt} />
//                       </ListItem>
//                       <Divider />
//                     </React.Fragment>
//                   ))}
//                   <ListItem button onClick={() => fileInputRef.current.click()}>
//                     <CloudUploadIcon sx={{ mr: 1 }} />
//                     <ListItemText primary="Add New Resume" />
//                   </ListItem>
//                 </List>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   style={{ display: 'none' }}
//                   onChange={handleFileChange}
//                 />
//                 {selectedFileName && (
//                   <Typography variant="body2" textAlign="left" my={1}>
//                     Selected file: <strong>{selectedFileName}</strong>
//                   </Typography>
//                 )}
//               </>
//             ) : (
//               <Box mb={4}>
//                 <TextField
//                   label="LinkedIn Profile URL"
//                   placeholder="https://www.linkedin.com/in/yourprofile"
//                   fullWidth
//                   value={linkedInUrl}
//                   onChange={(e) => setLinkedInUrl(e.target.value)}
//                 />
//               </Box>
//             )}

//             <Button
//               variant="contained"
//               fullWidth
//               onClick={handleContinue}
//               sx={{
//                 bgcolor: indigo[500],
//                 '&:hover': { bgcolor: indigo[700] },
//                 borderRadius: 50,
//                 py: 1,
//                 textTransform: 'none',
//                 fontWeight: 500
//               }}
//             >
//               {(selectedResumeId || selectedFileName || linkedInUrl) ? 'Continue' : 'Upload Resume'}
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
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';
import { blue, indigo, green } from '@mui/material/colors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import heroImg from 'src/Fogoimages/beatfobo.png';
import { paths } from 'src/routes/paths';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function FoboHeroPage() {
  const [open, setOpen] = useState(false);
  const [uploadType, setUploadType] = useState('resume');
  const [existingResumes, setExistingResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
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
        console.log('Using token for GET:', token);
        const response = await fetch(`${HOST_API}/files`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch resumes: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched resumes:', data);
        const resumes = Array.isArray(data) ? data : data.data || [];
        if (resumes.length === 0) {
          setError('No resumes found. Upload a new resume to get started.');
        }
        setExistingResumes(resumes.map((fileName) => {
          // Parse fileName (e.g., "20250523T092053086Z_Screenshot 2025-05-09 143756.png")
          const [timestamp, ...fileParts] = fileName.split('_');
          const originalFileName = fileParts.join('_');
          // Parse timestamp (e.g., "20250523T092053086Z" → "2025-05-23")
          const year = timestamp.substring(0, 4);
          const month = timestamp.substring(4, 6);
          const day = timestamp.substring(6, 8);
          const uploadedAt = `${year}-${month}-${day}`; // Format as YYYY-MM-DD
          return {
            id: timestamp || 'unknown', // Use timestamp as ID
            name: originalFileName || 'Unnamed Resume', // Use the file name
            uploadedAt: uploadedAt || new Date().toISOString().split('T')[0],
          };
        }));
      } catch (err) {
        console.error('Error fetching resumes:', err);
        setError('Failed to load resumes. Please try again.');
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

  const handleChangeType = (_, newType) => {
    if (newType) {
      setUploadType(newType);
      setSelectedResumeId(null);
      setSelectedFileName('');
      setLinkedInUrl('');
      setError('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setError('');
    }
  };

  const handleSelectResume = (id) => {
    setSelectedResumeId(id);
    setSelectedFileName('');
    setLinkedInUrl('');
    setError('');
  };

  const handleContinue = async () => {
    if (!authenticated) {
      navigate(paths.auth.jwt.login, { state: { returnTo: paths.FoboHeroPage } });
      return;
    }

    try {
      setError('');
      if (uploadType === 'linkedin' && linkedInUrl) {
        if (!linkedInUrl.startsWith('https://www.linkedin.com/in/')) {
          setError('Please enter a valid LinkedIn profile URL.');
          return;
        }

        const token = localStorage.getItem('accessToken');
        console.log('Using token for POST (LinkedIn):', token);
        const payload = {
          linkedinUrl: linkedInUrl,
          fileDetails: {},
        };
        console.log('LinkedIn payload:', payload);
        const response = await fetch(`${HOST_API}/files`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to submit LinkedIn URL: ${response.status}`);
        }

        const result = await response.json();
        console.log('LinkedIn URL submitted:', result);
        // Refresh the resume list after successful upload
        const fetchResponse = await fetch(`${HOST_API}/files`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          const resumes = Array.isArray(data) ? data : data.data || [];
          setExistingResumes(resumes.map((fileName) => {
            const [timestamp, ...fileParts] = fileName.split('_');
            const originalFileName = fileParts.join('_');
            const year = timestamp.substring(0, 4);
            const month = timestamp.substring(4, 6);
            const day = timestamp.substring(6, 8);
            const uploadedAt = `${year}-${month}-${day}`;
            return {
              id: timestamp || 'unknown',
              name: originalFileName || 'Unnamed Resume',
              uploadedAt: uploadedAt || new Date().toISOString().split('T')[0],
            };
          }));
        }
        navigate(paths.Dashboardpage);
      } else if (uploadType === 'resume' && (selectedResumeId || selectedFileName)) {
        if (selectedFileName && fileInputRef.current?.files?.[0]) {
          const file = fileInputRef.current.files[0];
          const token = localStorage.getItem('accessToken');
          console.log('Using token for POST (Resume):', token);

          const reader = new FileReader();
          reader.readAsDataURL(file);
          await new Promise((resolve, reject) => {
            reader.onload = () => resolve();
            reader.onerror = () => reject(new Error('Failed to read file.'));
          });

          const base64File = reader.result.split(',')[1];
          const payload = {
            linkedinUrl: linkedInUrl || '',
            fileDetails: {
              name: file.name,
              content: base64File,
              type: file.type,
              size: file.size,
            },
          };
          console.log('Resume payload:', payload);

          const response = await fetch(`${HOST_API}/files`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(`Failed to upload resume: ${response.status}`);
          }

          const result = await response.json();
          console.log('Resume uploaded successfully:', result);
          // Refresh the resume list after successful upload
          const fetchResponse = await fetch(`${HOST_API}/files`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          if (fetchResponse.ok) {
            const data = await fetchResponse.json();
            const resumes = Array.isArray(data) ? data : data.data || [];
            setExistingResumes(resumes.map((fileName) => {
              const [timestamp, ...fileParts] = fileName.split('_');
              const originalFileName = fileParts.join('_');
              const year = timestamp.substring(0, 4);
              const month = timestamp.substring(4, 6);
              const day = timestamp.substring(6, 8);
              const uploadedAt = `${year}-${month}-${day}`;
              return {
                id: timestamp || 'unknown',
                name: originalFileName || 'Unnamed Resume',
                uploadedAt: uploadedAt || new Date().toISOString().split('T')[0],
              };
            }));
          }
          navigate(paths.Dashboardpage);
        } else if (selectedResumeId) {
          console.log('Selected existing resume ID:', selectedResumeId);
          navigate(paths.Dashboardpage);
        }
      } else {
        fileInputRef.current?.click();
      }
    } catch (err) {
      console.error('Error during API call:', err);
      setError(`Failed to process your request: ${err.message}`);
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 9 }, py: { xs: 4, sm: 6, md: 8 } }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Stack spacing={3}>
            <Typography fontWeight={700} fontSize="24px" color="#212529">
              From AI Anxiety to AI Advantage
            </Typography>
            <Typography component="h1" fontWeight={700} fontSize="64px" color="#212529" lineHeight={1}>
              Beat FOBO (Fear of Being Obsolete)
            </Typography>
            <Typography fontSize="17px" lineHeight={2} color="#212529">
              At Altiv, we help you beat decision paralysis with smarter tools and human-first design.
            </Typography>
            <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#2A4DD0',
                  '&:hover': { bgcolor: blue[700] },
                  width: isMobile ? '100%' : '252px',
                  borderRadius: '100px',
                  height: '63px',
                }}
                onClick={handleOpenModal}
              >
                Check Your Score <ArrowForwardIcon sx={{ ml: 1 }} />
              </Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
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
              position: 'relative',
              width: isMobile ? '90%' : 550,
              bgcolor: 'background.paper',
              p: 3,
              boxShadow: 5,
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography variant="h5" fontWeight={400} mb={1}>
              Magic happens many ways
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={3}>
              You can upload a new resume, select an existing one, or add your LinkedIn URL
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Typography variant="subtitle1" fontWeight={600} mb={1} textAlign="left">
              Select or Upload Resume
            </Typography>
            <List sx={{ maxHeight: 160, overflow: 'auto', textAlign: 'left', mb: 2 }}>
              {existingResumes.map((r) => (
                <React.Fragment key={r.id}>
                  <ListItem
                    button
                    selected={selectedResumeId === r.id}
                    onClick={() => handleSelectResume(r.id)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
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
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {selectedFileName && (
              <Typography variant="body2" textAlign="left" my={1}>
                Selected file: <strong>{selectedFileName}</strong>
              </Typography>
            )}

            <Typography variant="subtitle1" fontWeight={600} mt={3} mb={1} textAlign="left">
              Enter LinkedIn URL
            </Typography>
            <TextField
              label="LinkedIn Profile URL"
              placeholder="https://www.linkedin.com/in/yourprofile"
              fullWidth
              value={linkedInUrl}
              onChange={(e) => setLinkedInUrl(e.target.value)}
              sx={{ mb: 4 }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleContinue}
              sx={{
                bgcolor: indigo[500],
                '&:hover': { bgcolor: indigo[700] },
                borderRadius: 50,
                py: 1,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              {(selectedResumeId || selectedFileName || linkedInUrl) ? 'Continue' : 'Upload Resume'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}