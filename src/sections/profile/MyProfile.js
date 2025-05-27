// import {
//   Box,
//   Avatar,
//   Container,
//   Typography,
//   IconButton,
//   Paper,
//   Divider,
//   Link,
//   Grid,
//   Stack, 
// } from '@mui/material';
// import { useAuthContext } from 'src/auth/hooks';

// const jobMatches = [
//   {
//     company: 'Google',
//     logo: 'https://storage.googleapis.com/a1aa/image/b34fb2e9-b9cb-4fc2-144f-63f7040062d2.jpg',
//     title: 'Sr. Director AI | Data scientist',
//     snippet: 'HE I need more information...',
//   },
//   {
//     company: 'Netflix',
//     logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
//     title: 'Sr. Director AI | Data scientist',
//     snippet: 'Awesome work, can you...',
//   },
//   {
//     company: 'Google',
//     logo: 'https://storage.googleapis.com/a1aa/image/b34fb2e9-b9cb-4fc2-144f-63f7040062d2.jpg',
//     title: 'Sr. Director AI | Data scientist',
//     snippet: 'About files I can...',
//   },
//   {
//     company: 'Netflix',
//     logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
//     title: 'Sr. Director AI | Data scientist',
//     snippet: 'Have a great afternoon...',
//   },
//   {
//     company: 'Netflix',
//     logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
//     title: 'Sr. Director AI | Data scientist',
//     snippet: 'HE I need more information...',
//   },
// ];

// export default function MyProfile() {
//   const { user, loading } = useAuthContext();

//   if (loading) {
//     return (
//       <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Typography>Loading...</Typography>
//       </Box>
//     );
//   }

//   if (!user) {
//     return (
//       <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Typography>Please log in to view your profile.</Typography>
//       </Box>
//     );
//   }

//   const bannerImage = 'https://storage.googleapis.com/a1aa/image/3cd90142-808b-468d-8f84-8f8dae057d2d.jpg'; // Keep hardcoded or fetch from API if available
//   const profileImage = user.avatar?.fileUrl || ''; // Use avatar URL from API
//   const fullName = user.displayName || `${user.firstName} ${user.lastName}`;
//   const email = user.email || 'Not provided';
//   const phoneNumber = user.phoneNumber || 'Not provided';
//   const resume = user.resumeUrl ? (
//     <>
//       {user.resumeUrl.split('/').pop()}{' '}
//       <Link href={user.resumeUrl} underline="hover">
//         View
//       </Link>
//     </>
//   ) : (
//     'Not uploaded'
//   );
//   const address = user.fullAddress || user.city || user.state ? 
//     `${user.fullAddress || ''} ${user.city || ''} ${user.state || ''}`.trim() : 
//     'Not provided';

//   return (
//     <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh' }}>
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Banner Section */}
//         <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative', border: '1px solid #3B82F6' }}>
//           <Box
//             component="img"
//             src={bannerImage}
//             alt="Banner"
//             sx={{ width: '100%', height: 300, objectFit: 'cover' }}
//           />
//           <Paper
//             elevation={3}
//             sx={{
//               position: 'absolute',
//               bottom: 16,
//               left: 16,
//               right: 16,
//               p: 2,
//               display: 'flex',
//               gap: 2,
//               alignItems: 'center',
//               bgcolor: 'rgba(255,255,255,0.9)',
//               backdropFilter: 'blur(6px)',
//               borderRadius: 2,
//             }}
//           >
//             <Avatar src={profileImage} sx={{ width: 48, height: 48 }} />
//             <Box>
//               <Typography fontWeight="600" fontSize="0.9rem">
//                 {fullName}
//               </Typography>
//               <Typography fontSize="0.75rem" color="text.secondary">
//                 {user.jobTitle || 'Not specified'} {/* Assume jobTitle might be added in API later */}
//               </Typography>
//             </Box>
//           </Paper>
//         </Box>

//         {/* Content Section */}
//         <Grid container spacing={3} mt={3}>
//           {/* Profile Info */}
//           <Grid item xs={12} lg={8}>
//             <Paper sx={{ p: 3 }}>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography fontWeight="600" fontSize="0.9rem">
//                   Profile Information
//                 </Typography>
//                 <IconButton size="small">
//                   <EditIcon fontSize="small" sx={{ color: '#6B7280' }} />
//                 </IconButton>
//               </Box>
//               <Typography fontSize="0.75rem" color="text.secondary" mb={2}>
//                 {user.description || 'Directors are responsible for overseeing the development of an organizations business goals and objectives...'}
//               </Typography>
//               <Stack spacing={1}>
//                 {[
//                   ['Full Name:', fullName],
//                   ['Mobile:', phoneNumber],
//                   ['Email:', email],
//                   ['Resume:', resume],
//                   [
//                     'Password:',
//                     <>
//                       ***********{' '}
//                       <Link href="#" underline="hover">
//                         Change password
//                       </Link>
//                     </>,
//                   ],
//                   ['Address:', address],
//                 ].map(([label, value]) => (
//                   <Box key={label} display="flex" gap={1.5}>
//                     <Typography sx={{ width: 90 }} fontSize="0.75rem" color="text.secondary">
//                       {label}
//                     </Typography>
//                     <Typography fontSize="0.75rem" fontWeight="600">
//                       {value}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Stack>
//             </Paper>
//           </Grid>

//           {/* Job Matches */}
//           <Grid item xs={12} lg={4}>
//             <Paper sx={{ p: 3 }}>
//               <Typography fontWeight="600" fontSize="0.9rem" mb={2}>
//                 Top Job Matches
//               </Typography>
//               <Stack spacing={2}>
//                 {jobMatches.map((job, idx) => (
//                   <Box key={idx} display="flex" gap={1.5}>
//                     <Avatar src={job.logo} sx={{ width: 24, height: 24 }} />
//                     <Box flexGrow={1}>
//                       <Typography fontSize="0.75rem" fontWeight="600" noWrap>
//                         {job.title}
//                       </Typography>
//                       <Typography fontSize="0.75rem" color="text.secondary" noWrap>
//                         {job.snippet}
//                       </Typography>
//                     </Box>
//                     <Link href="#" fontSize="0.75rem" underline="hover" sx={{ color: '#2563EB' }}>
//                       Status
//                     </Link>
//                   </Box>
//                 ))}
//               </Stack>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
// C:\Users\Admin\Downloads\public (3)\src\sections\profile\MyProfile.js



import {
  Box,
  Avatar,
  Container,
  Typography,
  IconButton,
  Paper,
  Divider,
  Link,
  Grid,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Add this import
import { useAuthContext } from 'src/auth/hooks';

const jobMatches = [
  {
    company: 'Google',
    logo: 'https://storage.googleapis.com/a1aa/image/b34fb2e9-b9cb-4fc2-144f-63f7040062d2.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'HE I need more information...',
  },
  {
    company: 'Netflix',
    logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'Awesome work, can you...',
  },
  {
    company: 'Google',
    logo: 'https://storage.googleapis.com/a1aa/image/b34fb2e9-b9cb-4fc2-144f-63f7040062d2.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'About files I can...',
  },
  {
    company: 'Netflix',
    logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'Have a great afternoon...',
  },
  {
    company: 'Netflix',
    logo: 'https://storage.googleapis.com/a1aa/image/4ccd54d6-b484-449a-82cb-c851fae2c976.jpg',
    title: 'Sr. Director AI | Data scientist',
    snippet: 'HE I need more information...',
  },
];

export default function MyProfile() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Please log in to view your profile.</Typography>
      </Box>
    );
  }

  const bannerImage = 'https://storage.googleapis.com/a1aa/image/3cd90142-808b-468d-8f84-8f8dae057d2d.jpg';
  const profileImage = user.avatar?.fileUrl || '';
  const fullName = user.displayName || `${user.firstName} ${user.lastName}`;
  const email = user.email || 'Not provided';
  const phoneNumber = user.phoneNumber || 'Not provided';
  const resume = user.resumeUrl ? (
    <>
      {user.resumeUrl.split('/').pop()}{' '}
      <Link href={user.resumeUrl} underline="hover">
        View
      </Link>
    </>
  ) : (
    'Not uploaded'
  );
  const address = user.fullAddress || user.city || user.state ? 
    `${user.fullAddress || ''} ${user.city || ''} ${user.state || ''}`.trim() : 
    'Not provided';

  return (
    <Box sx={{ backgroundColor: '#F5F9FF', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Banner Section */}
        <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative', border: '1px solid #3B82F6' }}>
          <Box
            component="img"
            src={bannerImage}
            alt="Banner"
            sx={{ width: '100%', height: 300, objectFit: 'cover' }}
          />
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16,
              p: 2,
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              bgcolor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(6px)',
              borderRadius: 2,
            }}
          >
            <Avatar src={profileImage} sx={{ width: 48, height: 48 }} />
            <Box>
              <Typography fontWeight="600" fontSize="0.9rem">
                {fullName}
              </Typography>
              <Typography fontSize="0.75rem" color="text.secondary">
                {user.jobTitle || 'Not specified'}
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Content Section */}
        <Grid container spacing={3} mt={3}>
          {/* Profile Info */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontWeight="600" fontSize="0.9rem">
                  Profile Information
                </Typography>
                <IconButton size="small">
                  <EditIcon fontSize="small" sx={{ color: '#6B7280' }} />
                </IconButton>
              </Box>
              <Typography fontSize="0.75rem" color="text.secondary" mb={2}>
                {user.description || 'Directors are responsible for overseeing the development of an organizations business goals and objectives...'}
              </Typography>
              <Stack spacing={1}>
                {[
                  ['Full Name:', fullName],
                  ['Mobile:', phoneNumber],
                  ['Email:', email],
                  ['Resume:', resume],
                  [
                    'Password:',
                    <>
                      ***********{' '}
                      <Link href="#" underline="hover">
                        Change password
                      </Link>
                    </>,
                  ],
                  ['Address:', address],
                ].map(([label, value]) => (
                  <Box key={label} display="flex" gap={1.5}>
                    <Typography sx={{ width: 90 }} fontSize="0.75rem" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography fontSize="0.75rem" fontWeight="600">
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Job Matches */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3 }}>
              <Typography fontWeight="600" fontSize="0.9rem" mb={2}>
                Top Job Matches
              </Typography>
              <Stack spacing={2}>
                {jobMatches.map((job, idx) => (
                  <Box key={idx} display="flex" gap={1.5}>
                    <Avatar src={job.logo} sx={{ width: 24, height: 24 }} />
                    <Box flexGrow={1}>
                      <Typography fontSize="0.75rem" fontWeight="600" noWrap>
                        {job.title}
                      </Typography>
                      <Typography fontSize="0.75rem" color="text.secondary" noWrap>
                        {job.snippet}
                      </Typography>
                    </Box>
                    <Link href="#" fontSize="0.75rem" underline="hover" sx={{ color: '#2563EB' }}>
                      Status
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}