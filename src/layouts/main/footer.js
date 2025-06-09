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
import Altivlogo from 'src/images/Altivlogo.png';
import linkedinlogo from 'src/images/linkedinlogo.png';
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
  { name: 'Register', href: paths.auth.jwt.register },
  { name: 'Job Alerts', href: paths.JobAlerts },
  { name: 'Career Advice', href: paths.CareerAdvice },
];

const AICareerCoach = [
  { name: 'FOBO', href: '#' },
  { name: 'Career Compass', href: paths.auth.jwt.register },
  { name: 'Smart Job Feed', href: paths.JobAlerts },
  { name: 'Job Match Boost', href: paths.CareerAdvice },
];

const Programs = [
  { name: 'Marketing Track', href: '#' },
  { name: 'Data Science Track', href: '#' },
  { name: 'Product Track', href: '#' },
  { name: 'Software Engineering Track', href: '#' },
];

const Recruiters = [
  { name: 'Post Jobs', href: '#' },
  { name: 'Register', href: paths.auth.jwt.register },
  { name: 'Find Candidates', href: '#' },
];

const AboutAltiv = [
  { name: 'About Us', href: paths.about },
  { name: 'Contact Us', href:paths.contact },
  { name: 'Terms of Use', href: '#' },
  { name: 'Attributions', href: paths.attributions },
  { name: 'Privacy Policy', href:paths.PolicyView },
  { name: 'FAQ', href: paths.faqs },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const mainFooter = (
    // <Box
    //   component="footer"
    //   sx={{
    //     backgroundColor: '#fff',
    //     borderTop: '1px solid #e0e0e0',
    //     py: 1,
    //     px: { xs: 1, md: 3 },
    //     fontFamily: 'Inter, sans-serif',
    //   }}  
    // >
    <Grid container columns={14} rowSpacing={2} columnSpacing={2} sx={{ pl: { xs: 3 }, mt:{lg:15} }}> {/* Reduced spacing */}
        {/* Column 1: Jobseekers */}
        <Grid xs={12} sm={6} md={2}>
          <Grid
            sx={{
              display: { xs: 'block', lg: 'none' },
               width:{ xs:'114px', lg:'128px'},
              my:1,
            }}
          >
            <img src={Altivlogo} alt="BigCo Inc. lo go" />
          </Grid>

          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={1.5}>
            {' '}
            {/* Reduced margin */}
            Jobseekers
          </Typography>
          <Stack spacing={0}>
            {' '}
            {/* Reduced spacing */}
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
            AI Career Coach
          </Typography>
          <Stack spacing={0.75}>
            {AICareerCoach.map((item) => (
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
        {/* Column 3: Popular */}
        <Grid xs={12} sm={6} md={2}>
          <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={1.5}>
            Programs
          </Typography>
          <Stack spacing={0.75}>
            {Programs.map((item) => (
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
        {/* Column 4: Recruiters */}
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
        {/* Column 5: About Altiv */}
        <Grid xs={12} sm={6} md={2}>
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
        <Grid
          xs={12}
          sm={3}
          md={2.4}
          lg={3}
          sx={{
            ml: { xs: 0, lg: 0 }, // Margin left for larger screens
          }}
        >
          <Grid
            sx={{
              display: { xs: 'none', lg: 'block' },
              width:{ xs:'54px', lg:'128px'},
              my:1,
            }}
          >
            <img src={Altivlogo} alt="BigCo Inc. lo go" />
          </Grid>

          <Typography fontWeight={700} fontSize='16px' mb={1.5} >
       
            {/* Reduced margin */}
            Subscribe to our newsletter
          </Typography>

          <Box 
          display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap='10px' mb={1}
           paddingtop={{xs:'11px'}}
           paddingleft={{xs:'24px'}}
           r={{xs:'11px'}}
           >
         
            {/* Reduced gap and margin */}
            <TextField
              placeholder="Email Address"
              size="small"
              sx={{
                width: { xs: '100%', lg: '1300px' }, // Full width on mobile, half on small screens
                maxWidth: '1441px', 
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
                width: { xs: '50%', lg: '130px' },
                height: '36px',
                borderRadius: 0,
                borderColor: '#0040D8',
                color: '#0040D8',
                fontWeight: 600,
                textTransform: 'none',
                px: 6,
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

          <Box display="flex" alignItems="center" gap={1.5}>
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
                width:'25px',
                height:'25px',
                mb:'5px'
              }}
            >
              <img src={linkedinlogo} alt="linkedinlogo" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    // </Box>
  );

  return mainFooter;
}
