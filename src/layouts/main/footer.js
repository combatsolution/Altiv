

import { useState } from 'react';
import { useSnackbar } from 'notistack'; //
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

// import dayjs from 'dayjs';

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
  { name: 'Contact Us', href: paths.contact },
  { name: 'Terms of Use', href: '#' },
  { name: 'Attributions', href: paths.attributions },
  { name: 'Privacy Policy', href: paths.PolicyView },
  { name: 'FAQ', href: paths.faqs },
];

export default function Footer() {
  const [email, setEmail] = useState('');
   const { enqueueSnackbar } = useSnackbar(); //

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

      enqueueSnackbar('Subscription successful!', { variant: 'success' }); // ✅ Success toast
      setEmail('');
    } catch (error) {
      console.error('Subscription failed:', error);
      enqueueSnackbar('Subscription failed. Please try again.', { variant: 'error' }); // ✅ Error toast
    }
  };

  return (
    <Grid
      container
      columns={14}
      rowSpacing={2}
      columnSpacing={2}
      sx={{ pl: { xs: 3, lg: 9 }, mt: { lg: 15 } }}
    >
      <Grid
        sx={{ display: { xs: 'block', lg: 'none' }, width: { xs: '114px', lg: '120px' }, my: 1 }}
      >
        <img src={Altivlogo} alt="Altiv Logo" />
      </Grid>

      <Grid xs={12} sm={6} md={2}>
        <Typography fontWeight={700} fontSize={16} lineHeight="130%" mb={1.5}>
          Jobseekers
        </Typography>
        <Stack spacing={0.7}>
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

      <Grid xs={12} sm={3} md={2.4} lg={4}>
        <Grid
          sx={{ display: { xs: 'none', lg: 'block' }, width: { xs: '54px', lg: '128px' }, my: 1 }}
        >
          <img src={Altivlogo} alt="Altiv Logo" />
        </Grid>

        <Typography fontWeight={700} fontSize="16px" mb={1.5}>
          Subscribe to our newsletter
        </Typography>

        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap="10px" mb={1}>
          <TextField
            placeholder="Email Address"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: { xs: '100%', lg: '1300px' },
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
            onClick={handleSubscribe}
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
          {/* Twitter Icon */}
          <Box
            component="a"
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
              cursor: 'pointer',
            }}
          >
            <FaXTwitter style={{ color: '#fff', fontSize: 20 }} />
          </Box>

          {/* LinkedIn Icon */}
          <Box
            component="a"
            href="https://linkedin.com/company/altiv-ai"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: '#0a66c2',
              borderRadius: '4px',
              width: 32,
              height: 32,
              cursor: 'pointer',
            }}
          >
            <img src={linkedinlogo} alt="LinkedIn Logo" width="30" height="30" />
          </Box>

          {/* Instagram Icon */}
          <Box
            component="a"
            href="https://instagram.com/altiv.ai"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: '#e4405f',
              borderRadius: '4px',
              width: 32,
              height: 32,
              cursor: 'pointer',
            }}
          >
            <img src={Instagramlogo} alt="LinkedIn Logo" width="30" height="30" />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
