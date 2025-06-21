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


import React, { useCallback, useEffect } from 'react';
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
  Grid,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';

// Hooks & Utils
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';

// Components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFUpload, RHFUploadAvatar } from 'src/components/hook-form';
import { fData } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ProfileUpdateModal({
  open,
  onClose,
  profileData,
  setProfileData,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const ProfileUpdateSchema = Yup.object().shape({
    backgroundImage: Yup.object(),
    avatar: Yup.object(),
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
    backgroundImage: profileData?.backgroundImage || null,
    avatar: profileData?.avatar || null,
    fullName: profileData?.fullName || '',
    phoneNumber: profileData?.phoneNumber || '',
    email: profileData?.email || '',
    address: profileData?.fullAddress || '',
    description: profileData?.profileDescription || '',
    designation: profileData?.designation || '',
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

  useEffect(() => {
    if (profileData) {
      reset();
    }
  }, [profileData, reset]);

  const formSubmit = handleSubmit(async (data) => {
    try {
      const inputData = {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        profileDescription: data.profileDescription,
        designation: data.designation,
        avatar: data.avatar,
        backgroundImage: data.backgroundImage,
        fullAddress: data.address
      }

      const response = await axiosInstance.patch(`/api/users/${profileData?.id}`, inputData);
      if(response?.data?.success){
        setProfileData(response?.data?.data);
        onClose();
        reset();
        enqueueSnackbar('Profile update success', {variant: 'success'});
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  });

  const handleAvatarDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosInstance.post('/files', formData);
        const { data } = response;
        console.log(data);
        setValue('avatar', data?.files[0], {
          shouldValidate: true,
        });
      }
    },
    [setValue]
  );

  const handleBackgroundImageDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosInstance.post('/files', formData);
        const { data } = response;
        console.log(data);
        setValue('backgroundImage', data?.files[0], {
          shouldValidate: true,
        });
      }
    },
    [setValue]
  );


  const handleRemoveFile = useCallback(() => {
    setValue('backgroundImage', null);
  }, [setValue]);

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
          <Grid container spacing={1}>
            <Grid sx={{paddingTop: 0}} item xs={12} md={6}>
              <Stack spacing={1} direction='column'>
                <Typography sx={{ fontWeight: 'normal' }} variant='h6'>Upload Avatar</Typography>
                  <RHFUploadAvatar
                    name="avatar"
                    maxSize={3145728}
                    onDrop={handleAvatarDrop}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.disabled',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fData(3145728)}
                      </Typography>
                    }
                  />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={1} direction='column'>
                <RHFTextField name="fullName" label="Full Name" />
                <RHFTextField name="phoneNumber" label="Phone" />
                <RHFTextField name="email" label="Email Address" type="email" />
              </Stack>
            </Grid>
          </Grid>

          <Stack sx={{width: '100%'}} spacing={1} direction='column'>
            <Typography sx={{ fontWeight: 'normal' }} variant='h6'>Upload Background Image</Typography>
            <RHFUpload
              name="backgroundImage"
              maxSize={3145728}
              onDrop={handleBackgroundImageDrop}
              onDelete={handleRemoveFile}
            />
          </Stack>
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
};