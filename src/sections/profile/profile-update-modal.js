// import React, { useEffect } from 'react';
// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import PropTypes from 'prop-types';

// // MUI
// import { Dialog, DialogTitle, Stack, IconButton, InputAdornment } from '@mui/material';
// import LoadingButton from '@mui/lab/LoadingButton';
// import CloseIcon from '@mui/icons-material/Close';

// // Hooks & Utils
// import { useBoolean } from 'src/hooks/use-boolean';
// import { useSnackbar } from 'src/components/snackbar';
// import axiosInstance from 'src/utils/axios';

// // Components
// import Iconify from 'src/components/iconify';
// import FormProvider, { RHFTextField } from 'src/components/hook-form';

// // ----------------------------------------------------------------------

// export default function ProfileUpdateModal({
//   open,
//   onClose,
//   profileData,
//   setProfileData,
//   onSubmit,
// }) {
//   const { enqueueSnackbar } = useSnackbar();

// const ProfileUpdateSchema = Yup.object().shape({
//   backgroundImage: Yup.mixed(),
//   avatar: Yup.mixed(),
//   fullName: Yup.string().required('Full Name is required'),
//   phoneNumber: Yup.string()
//     .required('Phone is required')
//     .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   address: Yup.string().required('Address is required'),
//   description: Yup.string().max(500, 'Description must be at most 500 characters'),
//   designation: Yup.string(),
// });
//   const defaultValues = {
//     backgroundImage: '',
//     avatar: '',
//     fullName: '',
//     phoneNumber: '',
//     email: '',
//     address: '',
//     description: '',
//     designation: '',
//   };

//   const methods = useForm({
//     resolver: yupResolver(ProfileUpdateSchema),
//     defaultValues,
//   });
//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const formSubmit = handleSubmit(async (data) => {
//     try {
//       onSubmit(data);
//     } catch (error) {
//       console.error(error);
//       enqueueSnackbar('Something Went Wrong', { variant: 'error' });
//     }
//   });

//   useEffect(() => {
//     if (profileData) {
//       reset({
//         backgroundImage: profileData.backgroundImage || '',
//         avatar: profileData.avatar || '',
//         fullName: profileData.fullName || '',
//         phoneNumber: profileData.phoneNumber || '',
//         email: profileData.email || '',
//         address: profileData.address || '',
//         description: profileData.description || '',
//         designation: profileData.designation || '',
//       });
//     }
//   }, [profileData, reset]);

//   return (
//     <Dialog
//       fullWidth
//       maxWidth={false}
//       open={open}
//       onClose={onClose}
//       PaperProps={{ sx: { maxWidth: 720 } }}
//     >
//       <DialogTitle>Profile Update</DialogTitle>


//       <FormProvider methods={methods} onSubmit={formSubmit}>
//         <Stack spacing={3} sx={{ p: 3 }}>
//           <RHFTextField
//             name="backgroundImage"
//             label="Background Image URL"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Iconify icon="solar:image-bold" />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <RHFTextField name="avatar" label="Avatar Image URL" />
//           <RHFTextField name="fullName" label="Full Name" />
//           <RHFTextField name="phoneNumber" label="Phone" />
//           <RHFTextField name="email" label="Email Address" type="email" />
//           <RHFTextField name="address" label="Address" />
//           <RHFTextField name="designation" label="Designation" />
//           <RHFTextField name="description" label="Description" multiline rows={3} />
//           <LoadingButton
//             type="submit"
//             variant="contained"
//             loading={isSubmitting}
//             sx={{ ml: 'auto' }}
//           >
//             Save Changes
//           </LoadingButton>
//         </Stack>
//       </FormProvider>
//     </Dialog>
//   );
// }

// ProfileUpdateModal.propTypes = {
//   open: PropTypes.bool,
//   onClose: PropTypes.func.isRequired,
//   profileData: PropTypes.object,
//   setProfileData: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };


import React, { useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// MUI
import {
  Dialog,
  DialogTitle,
  Stack,
  IconButton,
  InputAdornment,
  Typography,
  Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';

// Hooks & Utils
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';

// Components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ProfileUpdateModal({
  open,
  onClose,
  profileData,
  setProfileData,
  onSubmit,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const ProfileUpdateSchema = Yup.object().shape({
    backgroundImage: Yup.mixed(),
    avatar: Yup.mixed(),
    fullName: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
      .required('Phone is required')
      .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    address: Yup.string().required('Address is required'),
    description: Yup.string().max(500, 'Description must be at most 500 characters'),
    designation: Yup.string(),
  });

  const defaultValues = {
    backgroundImage: '',
    avatar: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    description: '',
    designation: '',
  };

  const methods = useForm({
    resolver: yupResolver(ProfileUpdateSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const avatarFile = watch('avatar');
  const backgroundImageFile = watch('backgroundImage');

  useEffect(() => {
    if (profileData) {
      reset({
        backgroundImage: '',
        avatar: '',
        fullName: profileData.fullName || '',
        phoneNumber: profileData.phoneNumber || '',
        email: profileData.email || '',
        address: profileData.address || '',
        description: profileData.description || '',
        designation: profileData.designation || '',
      });
    }
  }, [profileData, reset]);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post('/files', formData);
    return response.data.fileUrl; // Adjust according to your backend response
  };

  const formSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = { ...data };

      if (data.backgroundImage instanceof File) {
        updatedData.backgroundImage = await uploadFile(data.backgroundImage);
      } else {
        updatedData.backgroundImage = profileData?.backgroundImage || '';
      }

      if (data.avatar instanceof File) {
        updatedData.avatar = await uploadFile(data.avatar);
      } else {
        updatedData.avatar = profileData?.avatar || '';
      }

      await onSubmit(updatedData);
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
      onClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <DialogTitle>Profile Update</DialogTitle>

      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 19 }}>
        <CloseIcon />
      </IconButton>

      <FormProvider methods={methods} onSubmit={formSubmit}>
        <Stack spacing={3} sx={{ p: 3 }}>
          {/* File upload preview section */}
          <Box>
            <Typography variant="subtitle2">Background Image</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setValue('backgroundImage', e.target.files[0])}
            />
            {backgroundImageFile && typeof backgroundImageFile === 'object' && (
              <img
                src={URL.createObjectURL(backgroundImageFile)}
                alt="background preview"
                style={{ width: '100%', height: 120, objectFit: 'cover', marginTop: 8 }}
              />
            )}
          </Box>

          <Box>
            <Typography variant="subtitle2">Avatar</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setValue('avatar', e.target.files[0])}
            />
            {avatarFile && typeof avatarFile === 'object' && (
              <img
                src={URL.createObjectURL(avatarFile)}
                alt="avatar preview"
                style={{ width: 64, height: 64, borderRadius: '50%', marginTop: 8 }}
              />
            )}
          </Box>

          <RHFTextField
            name="fullName"
            label="Full Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:user-bold" />
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField name="phoneNumber" label="Phone" />
          <RHFTextField name="email" label="Email Address" type="email" />
          <RHFTextField name="address" label="Address" />
          <RHFTextField name="designation" label="Designation" />
          <RHFTextField name="description" label="Description" multiline rows={3} />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ ml: 'auto' }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Dialog>
  );
}

ProfileUpdateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  profileData: PropTypes.object,
  setProfileData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
