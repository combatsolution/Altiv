// import { useState } from 'react';
// import { useSnackbar } from 'notistack'; //
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import { TextField, Button } from '@mui/material';
// import { FaXTwitter } from 'react-icons/fa6';
// import Altivlogo from 'src/images/Altivlogo.png';
// import linkedinlogo from 'src/images/linkedinlogo.png';
// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';
// import axiosInstance from 'src/utils/axios';
// import Instagramlogo from 'src/images/Instagramlogo.png';

// // import dayjs from 'dayjs';

// const jobseekers = [
//   { name: 'Search Jobs', href: paths.comingSoon },
//   { name: 'Register', href: paths.auth.jwt.register },
//   { name: 'Job Alerts', href: paths.comingSoon },
//   { name: 'Career Advice', href: paths.comingSoon },
// ];

// const AICareerCoach = [
//   { name: 'FOBO', href: paths.fobo },
//   { name: 'Career Compass', href: paths.careerResume },
//   { name: 'Smart Job Feed', href: paths.comingSoon },
//   { name: 'Job Match Boost', href: paths.comingSoon },
// ];

// const Programs = [
//   { name: 'Marketing Track', href: paths.comingSoon },
//   { name: 'Data Science Track', href: paths.comingSoon },
//   { name: 'Product Track', href: paths.comingSoon },
//   { name: 'Software Engineering Track', href: paths.comingSoon },
// ];

// const Recruiters = [
//   { name: 'Post Jobs', href: paths.comingSoon },
//   { name: 'Register', href: paths.auth.jwt.register },
//   { name: 'Find Candidates', href: paths.comingSoon },
// ];

// const AboutAltiv = [
//   { name: 'About Us', href: paths.about },
//   { name: 'Contact Us', href: paths.contact },
//   { name: 'Terms of Use', href: paths.comingSoon },
//   { name: 'Attributions', href: paths.attributions },
//   { name: 'Privacy Policy', href: paths.PolicyView },
//   { name: 'FAQ', href: paths.faqs },
// ];

// export default function Footer() {
//   const [email, setEmail] = useState('');
//   const { enqueueSnackbar } = useSnackbar(); //

//   const handleSubscribe = async () => {
//     try {
//       const now = new Date().toISOString();
//       const payload = {
//         email,
//         createdAt: now,
//         updatedAt: now,

//         deletedAt: now,
//         isDeleted: false,
//       };

//       await axiosInstance.post('/wait-lists', payload);

//       enqueueSnackbar('Subscription successful!', { variant: 'success' }); // ✅ Success toast
//       setEmail('');
//     } catch (error) {
//       console.error('Subscription failed:', error);
//       enqueueSnackbar('Subscription failed. Please try again.', { variant: 'error' }); // ✅ Error toast
//     }
//   };

//   return (
//     <Grid
//       container
//       columns={12}

//       sx={{
//         pl: { xs: 3, lg: 9 },
//         mt: { lg: 15 },
//         // overflow: 'hidden', // prevent horizontal scroll from propagating
//       }}
//     >
//       <Grid
//         sx={{ display: { xs: 'block', lg: 'none' }, width: { xs: '114px', lg: '120px' }, my: 1 }}
//       >
//         <img src={Altivlogo} alt="Altiv Logo" />
//       </Grid>

//       <Grid item xs={12} sm={6} md={1}  >
//         <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={1.5}  mt={2}>
//           Jobseekers
//         </Typography>
//         <Stack spacing={0.7}>
//           {jobseekers.map((item) => (
//             <Link
//               key={item.name}
//               component={RouterLink}
//               href={item.href}
//               color="inherit"
//               variant="body2"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </Stack>
//       </Grid>

//       <Grid item  xs={12} sm={6} md={1.5} sx={{ ml: { md: 4, xs: 0 }}}>
//         <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={1.5}  mt={2}>
//           AI Career Coach
//         </Typography>
//         <Stack spacing={0.75}>
//           {AICareerCoach.map((item) => (
//             <Link
//               key={item.name}
//               component={RouterLink}
//               href={item.href}
//               color="inherit"
//               variant="body2"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </Stack>
//       </Grid>

//       <Grid item xs={12} sm={6} md={2} sx={{ ml: { xs: 0 , md: 1 }}}>
//         <Typography fontWeight={700} fontSize={16} lineHeight="130%"  mb={1.5}  mt={2}>
//           Programs
//         </Typography>
//         <Stack spacing={0.75}>
//           {Programs.map((item) => (
//             <Link
//               key={item.name}
//               component={RouterLink}
//               href={item.href}
//               color="inherit"
//               variant="body2"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </Stack>
//       </Grid>

//       <Grid item xs={12} sm={6} md={1} sx={{ ml: { md: 0, xs: 0 }}}>
//         <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={1.5} mt={2}>
//           Recruiters
//         </Typography>
//         <Stack spacing={0.75}>
//           {Recruiters.map((item) => (
//             <Link
//               key={item.name}
//               component={RouterLink}
//               href={item.href}
//               color="inherit"
//               variant="body2"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </Stack>
//       </Grid>

//       <Grid item xs={12} sm={6} md={1} sx={{ ml: { md: 4, xs: 0 }}} >
//         <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={1.5} mt={2}>
//           About Altiv
//         </Typography>
//         <Stack spacing={0.75}>
//           {AboutAltiv.map((item) => (
//             <Link
//               key={item.name}
//               component={RouterLink}
//               href={item.href}
//               color="inherit"
//               variant="body2"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </Stack>
//       </Grid>

//       <Grid xs={12} sm={3} md={4} sx={{ ml: { md: 4, xs: 0 }}}>
//         <Grid
//           sx={{ display: { xs: 'none', lg: 'block' }, width: { xs: '54px', lg: '128px' }, mt:2}}
//         >
//           <img src={Altivlogo} alt="Altiv Logo" />
//         </Grid>

//         <Typography fontWeight={700} fontSize="16px" mb={1.5} mt={2}>
//           Subscribe to our newsletter
//         </Typography>

//         <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap="10px" mb={1} mt={2}>
//           <TextField
//             placeholder="Email Address"
//             size="small"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             sx={{
//               flexGrow: 1,
//               width: '90%',
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: 0,
//                 height: '36px',
//               },
//               '& fieldset': {
//                 borderColor: 'black',
//               },
//               input: {
//                 paddingLeft: '10px',
//               },
//             }}
//           />
//           <Button
//             variant="outlined"
//             onClick={handleSubscribe}
//             sx={{
//               width: { xs: '50%', lg: '130px' },
//               height: '36px',
//               borderRadius: 0,
//               borderColor: '#0040D8',
//               color: '#0040D8',
//               fontWeight: 600,
//               textTransform: 'none',
//               px: 6,
//               whiteSpace: 'nowrap',
//               '&:hover': {
//                 backgroundColor: '#f0f0f0',
//                 borderColor: '#0040D8',
//               },
//             }}
//           >
//             Subscribe
//           </Button>
//         </Box>

//         <Box display="flex" alignItems="center" gap={1.5}>
//           {/* Twitter Icon */}
//           <Box
//             component="a"
//             href="https://twitter.com/altivai"
//             target="_blank"
//             rel="noopener noreferrer"
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: '#1da1f2',
//               borderRadius: '4px',
//               width: 25,
//               height: 25,
//               cursor: 'pointer',
//             }}
//           >
//             <FaXTwitter style={{ color: '#fff', fontSize: 20 }} />
//           </Box>

//           {/* LinkedIn Icon */}
//           <Box
//             component="a"
//             href="https://linkedin.com/company/altiv-ai"
//             target="_blank"
//             rel="noopener noreferrer"
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               // backgroundColor: '#0a66c2',
//               borderRadius: '4px',
//               width: 25,
//               height: 25,
//               cursor: 'pointer',
//             }}
//           >
//             <img src={linkedinlogo} alt="LinkedIn Logo" width="25" height="25" />
//           </Box>

//           {/* Instagram Icon */}
//           <Box
//             component="a"
//             href="https://instagram.com/altiv.ai"
//             target="_blank"
//             rel="noopener noreferrer"
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               // backgroundColor: '#e4405f',
//               borderRadius: '4px',
//               width: 25,
//               height: 25,
//               cursor: 'pointer',
//             }}
//           >
//             <img src={Instagramlogo} alt="LinkedIn Logo" width="25" height="25" />
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// }


import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { TextField, Button } from '@mui/material';
import { FaXTwitter } from 'react-icons/fa6';
import Altivlogo from 'src/images/Altivlogo.png';
import linkedinlogo from 'src/images/linkedinlogo.png';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import axiosInstance from 'src/utils/axios';
import Instagramlogo from 'src/images/Instagramlogo.png';

const jobseekers = [
  { name: 'Search Jobs', href: paths.comingSoon },
  { name: 'Register', href: paths.auth.jwt.register },
  { name: 'Job Alerts', href: paths.comingSoon },
  { name: 'Career Advice', href: paths.comingSoon },
];

const AICareerCoach = [
  { name: 'FOBO', href: paths.fobo },
  { name: 'Career Compass', href: paths.careerResume },
  { name: 'Smart Job Feed', href: paths.comingSoon },
  { name: 'Job Match Boost', href: paths.comingSoon },
];

const Programs = [
  { name: 'Marketing Track', href: paths.comingSoon },
  { name: 'Data Science Track', href: paths.comingSoon },
  { name: 'Product Track', href: paths.comingSoon },
  { name: 'Software Engineering Track', href: paths.comingSoon },
];

const Recruiters = [
  { name: 'Post Jobs', href: paths.comingSoon },
  { name: 'Register', href: paths.auth.jwt.register },
  { name: 'Find Candidates', href: paths.comingSoon },
];

const AboutAltiv = [
  { name: 'About Us', href: paths.about },
  { name: 'Contact Us', href: paths.contact },
  { name: 'Terms of Use', href: paths.comingSoon },
  { name: 'Attributions', href: paths.attributions },
  { name: 'Privacy Policy', href: paths.PolicyView },
  { name: 'FAQ', href: paths.faqs },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubscribe = async () => {
    try {
      const now = new Date().toISOString();
      const payload = {
        email,
        createdAt: now,
        updatedAt: now,
        deletedAt: now,
        isDeleted: false,
      };

      await axiosInstance.post('/wait-lists', payload);
      enqueueSnackbar('Subscription successful!', { variant: 'success' });
      setEmail('');
    } catch (error) {
      console.error('Subscription failed:', error);
      enqueueSnackbar('Subscription failed. Please try again.', { variant: 'error' });
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4, lg: 8 },
      }}
    >
      <Grid container spacing={4}>
        {/* Mobile Logo */}
        <Grid xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
          <Box sx={{ width: '120px', mb: 1 }}>
            <img src={Altivlogo} alt="Altiv Logo" style={{ width: '100%', height: 'auto' }} />
          </Box>
        </Grid>

        {/* Jobseekers Column */}
        <Grid xs={12} md={2} lg={1.5}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Jobseekers
          </Typography>
          <Stack spacing={1}>
            {jobseekers.map((item) => (
              <Link
                key={item.name}
                component={RouterLink}
                href={item.href}
                color="text.secondary"
                variant="body2"
                sx={{
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item.name}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* AI Career Coach Column */}
        <Grid xs={12} md={2} lg={1.5}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            AI Career Coach
          </Typography>
          <Stack spacing={1}>
            {AICareerCoach.map((item) => (
              <Link
                key={item.name}
                component={RouterLink}
                href={item.href}
                color="text.secondary"
                variant="body2"
                sx={{
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item.name}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Programs Column */}
        <Grid xs={12} md={2} lg={2}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Programs
          </Typography>
          <Stack spacing={1}>
            {Programs.map((item) => (
              <Link
                key={item.name}
                component={RouterLink}
                href={item.href}
                color="text.secondary"
                variant="body2"
                sx={{
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item.name}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Recruiters Column */}
        <Grid xs={12} md={2} lg={1.5}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Recruiters
          </Typography>
          <Stack spacing={1}>
            {Recruiters.map((item) => (
              <Link
                key={item.name}
                component={RouterLink}
                href={item.href}
                color="text.secondary"
                variant="body2"
                sx={{
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item.name}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* About Altiv Column */}
        <Grid xs={12} md={2} lg={1.5}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            About Altiv
          </Typography>
          <Stack spacing={1}>
            {AboutAltiv.map((item) => (
              <Link
                key={item.name}
                component={RouterLink}
                href={item.href}
                color="text.secondary"
                variant="body2"
                sx={{
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item.name}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Newsletter Column */}
        <Grid xs={12} md={4} lg={4} sx={{ pl: { md: 2 } }}>
          {/* Desktop Logo */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: '140px', mb: 3 }}>
            <img src={Altivlogo} alt="Altiv Logo" style={{ width: '100%', height: 'auto' }} />
          </Box>

          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Subscribe to our newsletter
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mb: 3,
              alignItems: 'flex-start',
            }}
          >
            <TextField
              placeholder="Email Address"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                flexGrow: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  height: '40px',
                },
                '& fieldset': {
                  borderColor: 'divider',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                input: {
                  py: 1,
                  px: 2,
                },
              }}
              fullWidth
            />
            <Button
              variant="outlined" // Changed from "contained" to "outlined" for border visibility
              onClick={handleSubscribe}
              sx={{
                height: '40px',
                borderRadius: '4px',
                backgroundColor: 'common.white',
                color: 'primary.main', // Changed to primary.main for better contrast
                border: '1px solid', // Explicit border declaration
                borderColor: 'primary.main', // Border color
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                whiteSpace: 'nowrap',
                '&:hover': {
                  borderColor: 'primary.dark', // Darker border on hover
                  color: 'primary.dark', // Darker text on hover
                },
              }}
            >
              Subscribe
            </Button>
          </Box>

          <Box display="flex" alignItems="center" gap={2} mt={2}>
            {/* Twitter Icon */}
            <Link
              href="https://twitter.com/altivai"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1da1f2',
                borderRadius: '4px',
                width: 32,
                height: 32,
                color: 'common.white',
                '&:hover': {
                  backgroundColor: '#1991da',
                },
              }}
            >
              <FaXTwitter style={{ fontSize: 20 }} />
            </Link>

            {/* LinkedIn Icon */}
            <Link
              href="https://linkedin.com/company/altiv-ai"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                width: 32,
                height: 32,
                overflow: 'hidden',
              }}
            >
              <img src={linkedinlogo} alt="LinkedIn Logo" width="32" height="32" />
            </Link>

            {/* Instagram Icon */}
            <Link
              href="https://instagram.com/altiv.ai"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                width: 32,
                height: 32,
                overflow: 'hidden',
              }}
            >
              <img src={Instagramlogo} alt="Instagram Logo" width="32" height="32" />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
