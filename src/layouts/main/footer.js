// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Divider from '@mui/material/Divider';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Unstable_Grid2';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { TextField, Button } from '@mui/material';
// import { FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
// // routes
// import { paths } from 'src/routes/paths';
// import { usePathname } from 'src/routes/hook';
// import { RouterLink } from 'src/routes/components';
// // _mock
// import { _socials } from 'src/_mock';
// // components
// import Logo from 'src/components/logo';
// import Iconify from 'src/components/iconify';

// // ----------------------------------------------------------------------

// const LINKS = [
//   {
//     headline: 'Jobseekers',
//     children: [
//       { name: 'Search Jobs', href: paths.auth.jwt.register },
//       { name: 'Register', href: paths.Register },
//       { name: 'Job Alerts', href: paths.JobAlerts },
//       { name: 'Career Advice', href: paths.CareerAdvice },
//     ],
//   },
//   {
//     headline: 'Popular',
//     children: [
//       { name: 'Search Jobs', href: '#' },
//       { name: 'Employers', href: '#' },
//       { name: 'Agencies', href: '#' },
//     ],
//   },
//   {
//     headline: 'Recruiters',
//     children: [
//       { name: 'CV Database Access', href: '#' },
//       { name: 'Advertise Jobs', href: '#' },
//       { name: 'Search CVs', href: '#' },
//       { name: 'Test CV Search', href: '#' },
//     ],
//   },
//   {
//     headline: 'About Altiv',
//     children: [
//       { name: 'About Us', href: '#' },
//       { name: 'Contact Us', href: '#' },
//       { name: 'Search CVs', href: '#' },
//       { name: 'Work for Us', href: '#' },
//       { name: 'Help', href: '#' },
//       { name: 'FAQ', href: '#' },
//     ],
//   },
// ];

// const jobseekers = [
//   { name: 'Search Jobs', href: paths.auth.jwt.register },
//   { name: 'Register', href: paths.Register },
//   { name: 'Job Alerts', href: paths.JobAlerts },
//   { name: 'Career Advice', href: paths.CareerAdvice },
// ];

// const popular = [
//   { name: 'Search Jobs', href: '#' },
//   { name: 'Employers', href: '#' },
//   { name: 'Agencies', href: '#' },
// ];

// const Recruiters = [
//   { name: 'CV Database Access', href: '#' },
//   { name: 'Advertise Jobs', href: '#' },
//   { name: 'Search CVs', href: '#' },
//   { name: 'Test CV Search', href: '#' },
// ];

// const AboutAltiv = [
//   { name: 'About Us', href: '#' },
//   { name: 'Contact Us', href: '#' },
//   { name: 'Search CVs', href: '#' },
//   { name: 'Work for Us', href: '#' },
//   { name: 'Help', href: '#' },
//   { name: 'FAQ', href: '#' },
// ];

// // ----------------------------------------------------------------------
// // ...imports remain unchanged

// export default function Footer() {
//   const mainFooter = (
//     <Box
//       component="footer"
//       sx={{
//         backgroundColor: '#fff',
//         borderTop: '1px solid #e0e0e0',
//         py: 6,
//         px: { xs: 2, md: 8 },
//         fontFamily: 'Inter, sans-serif',
//       }}
//     >
//       <Grid container spacing={4}>
//         {/* Column 1: Jobseekers */}
//         <Grid xs={12} sm={6} md={2.4}>
//           <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
//             Jobseekers
//           </Typography>
//           <Stack spacing={1}>
//             {jobseekers.map((item) => (
//               <Link
//                 key={item.name}
//                 component={RouterLink}
//                 href={item.href}
//                 color="inherit"
//                 variant="body2"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </Stack>
//         </Grid>

//         {/* Column 2: Popular */}
//         <Grid xs={12} sm={6} md={2.4}>
//           <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
//             Popular
//           </Typography>
//           <Stack spacing={1}>
//             {popular.map((item) => (
//               <Link
//                 key={item.name}
//                 component={RouterLink}
//                 href={item.href}
//                 color="inherit"
//                 variant="body2"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </Stack>
//         </Grid>

//         {/* Column 3: Recruiters */}
//         <Grid xs={12} sm={6} md={2.4} ml={-1}>
//           <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
//             Recruiters
//           </Typography>
//           <Stack spacing={1}>
//             {Recruiters.map((item) => (
//               <Link
//                 key={item.name}
//                 component={RouterLink}
//                 href={item.href}
//                 color="inherit"
//                 variant="body2"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </Stack>
//         </Grid>

//         {/* Column 4: About Altiv */}
//         <Grid xs={12} sm={6} md={2.4} mr={-10} ml={-1}>
//           <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
//             About Altiv
//           </Typography>
//           <Stack spacing={1}>
//             {AboutAltiv.map((item) => (
//               <Link
//                 key={item.name}
//                 component={RouterLink}
//                 href={item.href}
//                 color="inherit"
//                 variant="body2"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </Stack>
//         </Grid>

//         {/* Column 5: Newsletter */}
//         <Grid xs={12} md={2} maxWidth={350}>
//           <Typography fontFamily="Arial, sans-serif" fontWeight={700} fontSize={20}>
//             ALTIV.
//             <Box component="span" fontWeight={400}>
//               AI
//             </Box>
//           </Typography>

//           <Typography fontWeight={500} fontSize={13} mb={2}>
//             Subscribe to our newsletter
//           </Typography>

//           <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1.5} mb={2}>
//             <TextField
//               placeholder="Email Address"
//               size="small"
//               sx={{
//                 width: {
//                   xs: '270px', // Full width on mobile
//                   sm: '100%', // Still full width on small screens
//                   md: '305px', // Fixed width on medium and up
//                 },
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 0,
//                   height: '36px', // Control height here for c onsistency
//                 },
//                 '& fieldset': {
//                   borderColor: 'black',
//                 },
//                 input: {
//                   paddingLeft: '10px',
//                 },
//               }}
//             />
//             <Button
//               variant="outlined"
//               sx={{
//                 width: { xs: '129px', sm: 'auto', lg: '150px' },
//                 height: { xs: '36px', sm: 'auto', lg: '36px' },
//                 borderRadius: 0,
//                 borderColor: '#0040D8',
//                 color: '#0040D8',
//                 fontWeight: 600,
//                 textTransform: 'none',
//                 px: 3,
//                 whiteSpace: 'nowrap',
//                 '&:hover': {
//                   backgroundColor: '#f0f0f0',
//                   borderColor: '#0040D8',
//                 },
//               }}
//             >
//               Subscribe
//             </Button>
//           </Box>

//           <Box display="flex" alignItems="center" gap={1}>
//             <Box
//               sx={{
//                 fontSize: 22,
//                 cursor: 'pointer',
//               }}
//             >
//               <FaXTwitter />
//             </Box>
//             <Box
//               sx={{
//                 backgroundColor: '#1976d2',
//                 color: '#fff',
//                 borderRadius: '4px',
//                 mb: 1,
//                 px: 0.5,
//                 py: 0.5,
//                 fontSize: 14,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 cursor: 'pointer',
//               }}
//             >
//               <FaLinkedinIn />
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );

//   return mainFooter;
// }

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TextField, Button } from '@mui/material';
import { FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import Altivlogo from 'src/images/Altivlogo.svg';
// routes
import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hook';
import { RouterLink } from 'src/routes/components';
// _mock
import { _socials } from 'src/_mock';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const jobseekers = [
  { name: 'Search Jobs', href: paths.auth.jwt.register },
  { name: 'Register', href: paths.Register },
  { name: 'Job Alerts', href: paths.JobAlerts },
  { name: 'Career Advice', href: paths.CareerAdvice },
];

const popular = [
  { name: 'Search Jobs', href: '#' },
  { name: 'Employers', href: '#' },
  { name: 'Agencies', href: '#' },
];

const Recruiters = [
  { name: 'CV Database Access', href: '#' },
  { name: 'Advertise Jobs', href: '#' },
  { name: 'Search CVs', href: '#' },
  { name: 'Test CV Search', href: '#' },
];

const AboutAltiv = [
  { name: 'About Us', href: '#' },
  { name: 'Contact Us', href: '#' },
  { name: 'Search CVs', href: '#' },
  { name: 'Work for Us', href: '#' },
  { name: 'Help', href: '#' },
  { name: 'FAQ', href: '#' },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const mainFooter = (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#fff',
        borderTop: '1px solid #e0e0e0',
        py: 4, // Reduced padding top and bottom
        px: { xs: 2, md: 4 }, // Reduced horizontal padding
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="space-between"> {/* Reduced spacing */}
        {/* Column 1: Jobseekers */}
        <Grid xs={12} sm={6} md={2.4}>  
          <Grid  sx={{
            display:{xs:'block', lg:'none' },
          }}>
            <img src={Altivlogo} alt="BigCo Inc. lo go" />
          </Grid>
          
          
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={1.5}> {/* Reduced margin */}
            Jobseekers
          </Typography>
          <Stack spacing={0}> {/* Reduced spacing */}
            {jobseekers.map((item) => (
              <Link
                key={item.name}
                component={RouterLink}
                href={item.href}
                color="inherit"
                variant="body2"
              >
                {item.name}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Column 2: Popular */}
        <Grid xs={12} sm={6} md={2}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={1.5}>
            Popular
          </Typography>
          <Stack spacing={0.75}>
            {popular.map((item) => (
              <Link
                key={item.name}
                component={RouterLink}
                href={item.href}
                color="inherit"
                variant="body2"
              >
                {item.name}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Column 3: Recruiters */}
        <Grid xs={12} sm={6} md={2}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={1.5}>
            Recruiters
          </Typography>
          <Stack spacing={0.75}>
            {Recruiters.map((item) => (
              <Link
                key={item.name}
                component={RouterLink}
                href={item.href}
                color="inherit"
                variant="body2"
              >
                {item.name}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Column 4: About Altiv */}
        <Grid xs={12} sm={6} md={2.4} >
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={1.5}>
            About Altiv
          </Typography>
          <Stack spacing={0.75}>
            {AboutAltiv.map((item) => (
              <Link
                key={item.name}
                component={RouterLink}
                href={item.href}
                color="inherit"
                variant="body2"
              >
                {item.name}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Column 5: Newsletter */}
        <Grid xs={12} sm={6} md={2.4} mixWidth={50}>
          
          <Grid  sx={{
            display:{xs:'none', lg:'block' },
          }}>
            <img src={Altivlogo} alt="BigCo Inc. lo go" />
          </Grid>

          <Typography fontWeight={500} fontSize={13} mb={1.5}> {/* Reduced margin */}
            Subscribe to our newsletter
          </Typography>

          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1} mb={1.5}> {/* Reduced gap and margin */}
            <TextField
              placeholder="Email Address"
              size="small"
              sx={{
                width: { xs: '80%', lg: '70%' }, // Full width on mobile, half on small screens
                maxWidth: '1441pxpx',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  height: '36px',
                },
                '& fieldset': {
                  borderColor: 'black',
                },
                input: {
                  paddingLeft: '10px',
                },
              }}
            />
            <Button
              variant="outlined"  
              sx={{
                width: { xs: '50%', lg:'192px' },
                height: '36px',
                borderRadius: 0,
                borderColor: '#0040D8',
                color: '#0040D8',
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                whiteSpace: 'nowrap',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  borderColor: '#0040D8',
                },
              }}
            >
              Subscribe
            </Button>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                fontSize: 22,
                cursor: 'pointer',
              }}
            >
              <FaXTwitter />
            </Box>
            <Box
              sx={{
                backgroundColor: '#1976d2',
                color: '#fff',
                borderRadius: '4px',
                px: 0.5,
                py: 0.5,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <FaLinkedinIn />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return mainFooter;
}