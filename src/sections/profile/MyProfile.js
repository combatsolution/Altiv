// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Box,
//   Avatar,
//   Container,
//   Typography,
//   IconButton,
//   Paper,
//   Link,
//   Grid,
//   Stack,
//   Button,
//   useMediaQuery,
//   useTheme,
//   CircularProgress,
//   Alert,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { useAuthContext } from 'src/auth/hooks';
// import bgImage from 'src/images/image.png';
// import Writelogo from 'src/images/write.svg';
// import axiosInstance from 'src/utils/axios';
// import { green } from '@mui/material/colors';
// import { useSnackbar } from 'notistack';
// import ProfileChangePassword from './profile-change-password-modal';
// import ProfileUpdateModal from './profile-update-modal';

// const jobMatches = []; // You can populate this later

// export default function MyProfile() {
//   const { user, loading } = useAuthContext();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const fileInputRef = useRef(null);
//   const { enqueueSnackbar } = useSnackbar();

//   const [openPasswordModal, setOpenPasswordModal] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const [existingResumes, setExistingResumes] = useState([]);
//   const [selectedResumeId, setSelectedResumeId] = useState(null);

//   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
//   const [resumeToDelete, setResumeToDelete] = useState(null);

//   const [profileData, setProfileData] = useState({
//     fullName: '',
//     phoneNumber: '',
//     email: '',
//     address: '',
//     description: '',
//   });

//   useEffect(() => {
//     if (user) {
//       setProfileData({
//         fullName: user?.fullName,
//         phoneNumber: user?.phoneNumber || '',
//         email: user?.email || '',
//         address: user?.fullAddress,
//         description:
//           user?.bio ||
//           'Directors are responsible for overseeing the development of an organizations business goals and objectives...',
//       });

//       setExistingResumes(user?.resumes || []);
//       setSelectedResumeId(null);
//     }
//   }, [user]);

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validTypes = [
//       'application/pdf',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     ];

//     if (!validTypes.includes(file.type)) {
//       setError('Please upload a PDF or Word document');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError('File size must be less than 5MB');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       setIsUploading(true);
//       setError(null);
//       setSuccess(null);

//       const res = await axiosInstance.post('/files', formData);
//       const uploadedFileData = res.data.files?.[0];
//       if (!uploadedFileData) throw new Error('Invalid file upload response');

//       const resumeRes = await axiosInstance.post('/resumes', { fileDetails: uploadedFileData });
//       setExistingResumes((prev) => [...prev, resumeRes.data]);
//       setSelectedResumeId(null);
//       setSuccess('Resume uploaded successfully');

//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to upload resume');
//     } finally {
//       setIsUploading(false);
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleSelectResume = (id) => {
//     setSelectedResumeId(id);
//     setError(null);
//   };

//   const handleDeleteResume = async (id) => {
//     try {
//       await axiosInstance.delete(`/resumes/${id}`);
//       setExistingResumes((prev) => prev.filter((resume) => resume.id !== id));
//       if (selectedResumeId === id) setSelectedResumeId(null);
//       setSuccess('Resume deleted successfully');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to delete resume. Please try again.');
//     } finally {
//       setConfirmDeleteOpen(false);
//       setResumeToDelete(null);
//     }
//   };

//   const handleEditSubmit = async (data) => {
//     try {
//       await axiosInstance.patch(`/api/users/${user.id}`, {
//         fullName: data.fullName.trim(),
//         email: data.email,
//         phoneNumber: data.phoneNumber,
//         fullAddress: data.address,
//         profileDescription: data.description,
//         designation: data.designation,
//       });

//       setOpenEditDialog(false);
//       enqueueSnackbar('Profile Updated successfully!');
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (error || success) {
//       const timer = setTimeout(() => {
//         setError(null);
//         setSuccess(null);
//       }, 5000);

//       return () => clearTimeout(timer);
//     }
//     return undefined;
//   }, [error, success]);

//   if (loading || !user) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh' }}>
//       {error && (
//         <Alert severity="error" sx={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
//           {error}
//         </Alert>
//       )}
//       {success && (
//         <Alert severity="success" sx={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
//           {success}
//         </Alert>
//       )}

//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Profile Banner */}
//         <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid transparent' }}>
//           <Box
//             component="img"
//             src={bgImage}
//             alt="Banner"
//             sx={{ width: '100%', height: 300, objectFit: 'cover' }}
//           />
//           <Paper
//             elevation={3}
//             sx={{
//               position: 'relative',
//               p: 2,
//               display: 'flex',
//               gap: 2,
//               alignItems: 'center',
//               bgcolor: 'rgba(255,255,255,0.9)',
//               backdropFilter: 'blur(6px)',
//               borderRadius: 2,
//               mt: -6,
//               mx: 2,
//             }}
//           >
//             <Avatar src={user?.avatar?.fileUrl || ''} sx={{ width: 48, height: 48 }} />
//             <Box>
//               <Typography fontWeight="600">{profileData?.fullName || 'No Name'}</Typography>
//               <Typography fontSize="0.75rem" color="text.secondary">
//                 {user?.designation || 'Not specified'}
//               </Typography>
//             </Box>
//           </Paper>
//         </Box>

//         {/* Profile Info and Resume Section */}
//         <Grid container spacing={3} mt={3}>
//           <Grid item xs={12} lg={8}>
//             <Paper sx={{ p: 3 }}>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                 <Typography fontWeight="600">Profile Information</Typography>
//                 <IconButton onClick={() => setOpenEditDialog(true)}>
//                   <Box component="img" src={Writelogo} alt="Edit" sx={{ height: 20 }} />
//                 </IconButton>
//               </Box>

//               <Typography sx={{ mb: 2 }}>{profileData.description}</Typography>

//               <Stack spacing={1}>
//                 {[
//                   ['Full Name:', profileData.fullName],
//                   ['Mobile:', profileData.phoneNumber || 'Not specified'],
//                   ['Email:', profileData.email],
//                   [
//                     'Resume:',
//                     existingResumes.length > 0 ? (
//                       <Typography>
//                         {selectedResumeId
//                           ? existingResumes.find((r) => r.id === selectedResumeId)?.fileDetails
//                               ?.fileName || 'Selected resume'
//                           : 'Select a resume below'}
//                       </Typography>
//                     ) : (
//                       <Typography color="text.secondary">No resume uploaded</Typography>
//                     ),
//                   ],
//                   [
//                     'Password:',
//                     <>
//                       ***********{' '}
//                       <Link href="#" underline="hover" onClick={() => setOpenPasswordModal(true)}>
//                         Change password
//                       </Link>
//                     </>,
//                   ],
//                   ['Address:', profileData.address || 'Not specified'],
//                 ].map(([label, value]) => (
//                   <Box key={label} display="flex" gap={1.5}>
//                     <Typography sx={{ width: 90 }} color="text.secondary">
//                       {label}
//                     </Typography>
//                     <Typography fontWeight="600">{value}</Typography>
//                   </Box>
//                 ))}
//               </Stack>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} lg={4}>
//             {/* Resume Section */}
//             <Paper sx={{ p: 3 }}>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography fontWeight="600">Resume</Typography>
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   onClick={() => fileInputRef.current.click()}
//                   startIcon={isUploading ? <CircularProgress size={16} /> : <CloudUploadIcon />}
//                   sx={{ textTransform: 'none' }}
//                   disabled={isUploading}
//                 >
//                   Add New Resume
//                 </Button>
//               </Box>

//               <List sx={{ maxHeight: 160, overflow: 'auto', mb: 2 }}>
//                 {existingResumes.map((r) => (
//                   <React.Fragment key={r.id}>
//                     <ListItem
//                       selected={selectedResumeId === r.id}
//                       button
//                       onClick={() => handleSelectResume(r.id)}
//                       disabled={isUploading}
//                       secondaryAction={
//                         <Box display="flex" alignItems="center">
//                           {selectedResumeId === r.id && (
//                             <CheckCircleIcon sx={{ color: green[600], mr: 1 }} />
//                           )}
//                           <IconButton
//                             edge="end"
//                             onClick={() => {
//                               setResumeToDelete(r.id);
//                               setConfirmDeleteOpen(true);
//                             }}
//                             aria-label="delete"
//                             disabled={isUploading}
//                           >
//                             <DeleteIcon sx={{ color: 'red' }} />
//                           </IconButton>
//                         </Box>
//                       }
//                     >
//                       <ListItemText
//                         primary={
//                           <a
//                             href={r.fileDetails?.fileUrl || '#'}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             style={{ textDecoration: 'none', color: 'inherit' }}
//                           >
//                             {r.fileDetails?.fileName || 'Untitled Resume'}
//                           </a>
//                         }
//                         secondary={r.uploadedAt || 'No date'}
//                       />
//                     </ListItem>
//                     <Divider />
//                   </React.Fragment>
//                 ))}
//               </List>

//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 accept=".pdf,.doc,.docx"
//                 style={{ display: 'none' }}
//               />
//             </Paper>
//           </Grid>
//         </Grid>

//       </Container>

//       {/* Confirm Delete Dialog */}
//       <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
//         <DialogTitle>Delete Resume</DialogTitle>
//         <DialogContent>Are you sure you want to delete this resume?</DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => handleDeleteResume(resumeToDelete)}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Profile Modal */}
//       <ProfileUpdateModal
//         open={openEditDialog}
//         onClose={() => setOpenEditDialog(false)}
//         onSubmit={handleEditSubmit}
//         profileData={profileData}
//         setProfileData={setProfileData}
//       />

//       {/* Password Change Modal */}
//       <ProfileChangePassword open={openPasswordModal} onClose={() => setOpenPasswordModal(false)} />
//     </Box>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
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
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuthContext } from 'src/auth/hooks';
import bgImage from 'src/images/image.png';
import Writelogo from 'src/images/write.svg';
import axiosInstance from 'src/utils/axios';
import { green } from '@mui/material/colors';
import { useSnackbar } from 'notistack';
import ProfileChangePassword from './profile-change-password-modal';
import ProfileUpdateModal from './profile-update-modal';

export default function MyProfile() {
  const { user, loading } = useAuthContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fileInputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [existingResumes, setExistingResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);

  const [profileData, setProfileData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    description: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user?.fullName,
        phoneNumber: user?.phoneNumber || '',
        email: user?.email || '',
        address: user?.fullAddress,
        description:
          user?.bio ||
          'Directors are responsible for overseeing the development of an organizations business goals and objectives...',
      });

      setExistingResumes(user?.resumes || []);
      setSelectedResumeId(null);
    }
  }, [user]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      setError(null);
      setSuccess(null);

      const res = await axiosInstance.post('/files', formData);
      const uploadedFileData = res.data.files?.[0];
      if (!uploadedFileData) throw new Error('Invalid file upload response');

      const resumeRes = await axiosInstance.post('/resumes', { fileDetails: uploadedFileData });
      const uploadedResumeId = resumeRes.data?.id;

      setExistingResumes((prev) => [...prev, resumeRes.data]);
      setSelectedResumeId(null);
      setSuccess('Resume uploaded successfully');

      // ✅ Call /last-fobo-score API
      if (uploadedResumeId !== undefined) {
        await axiosInstance.post('/last-fobo-score', {
          resumeIds: [uploadedResumeId],
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload resume');
    } finally {
      setIsUploading(false);
      fileInputRef.current.value = '';
    }
  };

  const handleSelectResume = (id) => {
    setSelectedResumeId(id);
    setError(null);
  };

  const handleDeleteResume = async (id) => {
    try {
      await axiosInstance.delete(`/resumes/${id}`);
      setExistingResumes((prev) => prev.filter((resume) => resume.id !== id));
      if (selectedResumeId === id) setSelectedResumeId(null);
      setSuccess('Resume deleted successfully');
    } catch (err) {
      console.error(err);
      setError('Failed to delete resume. Please try again.');
    } finally {
      setConfirmDeleteOpen(false);
      setResumeToDelete(null);
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      await axiosInstance.patch(`/api/users/${user.id}`, {
        fullName: data.fullName.trim(),
        email: data.email,
        phoneNumber: data.phoneNumber,
        fullAddress: data.address,
        profileDescription: data.description,
        designation: data.designation,
      });

      setOpenEditDialog(false);
      enqueueSnackbar('Profile Updated successfully!');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [error, success]);

  if (loading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh' }}>
      {error && (
        <Alert severity="error" sx={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
          {success}
        </Alert>
      )}

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Banner */}
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
            <Avatar src={user?.avatar?.fileUrl || ''} sx={{ width: 48, height: 48 }} />
            <Box>
              <Typography fontWeight="600">{profileData?.fullName || 'No Name'}</Typography>
              <Typography fontSize="0.75rem" color="text.secondary">
                {user?.designation || 'Not specified'}
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography fontWeight="600">Profile Information</Typography>
                <IconButton onClick={() => setOpenEditDialog(true)}>
                  <Box component="img" src={Writelogo} alt="Edit" sx={{ height: 20 }} />
                </IconButton>
              </Box>

              <Typography sx={{ mb: 2 }}>{profileData.description}</Typography>

              <Stack spacing={1}>
                {[
                  ['Full Name:', profileData.fullName],
                  ['Mobile:', profileData.phoneNumber || 'Not specified'],
                  ['Email:', profileData.email],
                  [
                    'Resume:',
                    existingResumes.length > 0 ? (
                      <Typography>
                        {selectedResumeId
                          ? existingResumes.find((r) => r.id === selectedResumeId)?.fileDetails
                              ?.fileName || 'Selected resume'
                          : 'Select a resume below'}
                      </Typography>
                    ) : (
                      <Typography color="text.secondary">No resume uploaded</Typography>
                    ),
                  ],
                  [
                    'Password:',
                    <>
                      ***********{' '}
                      <Link href="#" underline="hover" onClick={() => setOpenPasswordModal(true)}>
                        Change password
                      </Link>
                    </>,
                  ],
                  ['Address:', profileData.address || 'Not specified'],
                ].map(([label, value]) => (
                  <Box key={label} display="flex" gap={1.5}>
                    <Typography sx={{ width: 90 }} color="text.secondary">
                      {label}
                    </Typography>
                    <Typography fontWeight="600">{value}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontWeight="600">Resume</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => fileInputRef.current.click()}
                  startIcon={isUploading ? <CircularProgress size={16} /> : <CloudUploadIcon />}
                  sx={{ textTransform: 'none' }}
                  disabled={isUploading}
                >
                  Add New Resume
                </Button>
              </Box>

              <List sx={{ maxHeight: 160, overflow: 'auto', mb: 2 }}>
                {existingResumes.map((r) => (
                  <React.Fragment key={r.id}>
                    <ListItem
                      selected={selectedResumeId === r.id}
                      button
                      onClick={() => handleSelectResume(r.id)}
                      disabled={isUploading}
                      secondaryAction={
                        <Box display="flex" alignItems="center">
                          {selectedResumeId === r.id && (
                            <CheckCircleIcon sx={{ color: green[600], mr: 1 }} />
                          )}
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setResumeToDelete(r.id);
                              setConfirmDeleteOpen(true);
                            }}
                            aria-label="delete"
                            disabled={isUploading}
                          >
                            <DeleteIcon sx={{ color: 'red' }} />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={
                          <a
                            href={r.fileDetails?.fileUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            {r.fileDetails?.fileName || 'Untitled Resume'}
                          </a>
                        }
                        secondary={r.uploadedAt || 'No date'}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Delete Resume</DialogTitle>
        <DialogContent>Are you sure you want to delete this resume?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteResume(resumeToDelete)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ProfileUpdateModal
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onSubmit={handleEditSubmit}
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <ProfileChangePassword open={openPasswordModal} onClose={() => setOpenPasswordModal(false)} />
    </Box>
  );
}
