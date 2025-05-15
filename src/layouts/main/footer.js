// @mui
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

const LINKS = [
  {
    headline: 'Jobseekers',
    children: [
      { name: 'Search Jobs', href: paths.auth.jwt.register },
      { name: 'Register', href: paths.Register },
      { name: 'Job Alerts', href: paths.JobAlerts },
      { name: 'Career Advice', href: paths.CareerAdvice },
    ],
  },
  {
    headline: 'Popular',
    children: [
      { name: 'Search Jobs', href: '#' },
      { name: 'Employers', href: '#' },
      { name: 'Agencies', href: '#' },
    ],
  },
  {
    headline: 'Recruiters',
    children: [
      { name: 'CV Database Access', href: '#' },
      { name: 'Advertise Jobs', href: '#' },
      { name: 'Search CVs', href: '#' },
      { name: 'Test CV Search', href: '#' },
    ],
  },
  {
    headline: 'About Altiv',
    children: [
      { name: 'About Us', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Search CVs', href: '#' },
      { name: 'Work for Us', href: '#' },
      { name: 'Help', href: '#' },
      { name: 'FAQ', href: '#' },
    ],

  },


];

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

]

const Recruiters=[
   { name: 'CV Database Access', href: '#' },
      { name: 'Advertise Jobs', href: '#' },
      { name: 'Search CVs', href: '#' },
      { name: 'Test CV Search', href: '#' },
]

const AboutAltiv =[
    { name: 'About Us', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Search CVs', href: '#' },
      { name: 'Work for Us', href: '#' },
      { name: 'Help', href: '#' },
      { name: 'FAQ', href: '#' },
]


// ----------------------------------------------------------------------

export default function Footer() {

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#fff",
        borderTop: "1px solid #e0e0e0",
        py: 6,
        px: { xs: 2, md: 8 },
        fontFamily: "Inter, sans-serif"
      }}
    >
      <Grid container spacing={4}>
        {/* Column 1: Jobseekers */}
        <Grid item xs={6} md={2.4}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
            Jobseekers
          </Typography>
          <Stack direction='column'spacing={1}>
          {jobseekers.map((item, idx) => (
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
        <Grid item xs={6} md={2.4}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
            Popular
          </Typography>
          <Stack direction='column'spacing={1}>
          {popular.map((item, idx) => (
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
        <Grid item xs={6} md={2.4} ml={-7}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2} >
            Recruiters
          </Typography>
          <Stack direction='column'spacing={1}>
          {Recruiters.map((item, idx) => (
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
        <Grid item xs={6} md={2.4} ml={-5}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={2}>
            About Altiv
          </Typography>
          <Stack direction='column'spacing={1}>
          {AboutAltiv.map((item, idx) => (
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


        <Grid item xs={6} md={2.4} ml={-12}>
          <Typography
            fontFamily="Arial, sans-serif"
            fontWeight={700}
            fontSize={20}
          >
            ALTIV.<Box component="span" fontWeight={400}>AI</Box>
          </Typography>

          <Typography fontWeight={500} fontSize={13} mb={2}>
            Subscribe to our newsletter
          </Typography>

          <Box display="flex" mb={1.5} width="400px">
            <TextField
              placeholder="Email Address"
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
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
                ml: '10px', // margin before the button
                borderRadius: 0, // removes rounding
                borderColor: '#0040D8',
                color: '#0040D8',
                fontWeight: 600,
                textTransform: 'none',
                padding: '6px 12px',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  borderColor: '#0040D8', // keep the border color on hover
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
                cursor: "pointer",
              }}
            >
              <FaXTwitter />
            </Box>
            <Box
              sx={{
                backgroundColor: '#1976d2',
                color: '#fff',
                borderRadius: '4px',
                px: 1,
                py: 0.5,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: "pointer",
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
