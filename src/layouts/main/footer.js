import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { TextField, Button, Modal, IconButton } from '@mui/material';
import { FaXTwitter } from 'react-icons/fa6';
import Altivlogo from 'src/images/Altivlogo.png';
import linkedinlogo from 'src/images/linkedinlogo.png';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import axiosInstance from 'src/utils/axios';
import Instagramlogo from 'src/images/Instagramlogo.png';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
  { name: 'Software Eng. Track', href: paths.comingSoon },
];

const Recruiters = [
  { name: 'Post Jobs', href: paths.comingSoon },
  { name: 'Register', href: paths.comingSoon },
  { name: 'Find Candidates', href: paths.comingSoon },
];

const AboutAltiv = [
  { name: 'About Us', href: paths.about },
  { name: 'Contact Us', href: paths.contact },
  { name: 'Terms of Use', href: paths.TermsAndConditions },
  { name: 'Attributions', href: paths.attributions },
  { name: 'Privacy Policy', href: paths.PolicyView },
  { name: 'FAQ', href: paths.faqs },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      enqueueSnackbar('Please enter a valid email address.', { variant: 'error' });
      return; 
    }

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
      setEmail('');
      setEmailError('');
      setOpenModal(true);
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
        <Grid xs={12} md={2} lg={1.6}>
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
              variant="outlined"
              onClick={handleSubscribe}
              sx={{
                height: '40px',
                borderRadius: '4px',
                backgroundColor: 'common.white',
                color: 'primary.main',
                border: '1px solid',
                borderColor: 'primary.main',
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                whiteSpace: 'nowrap',
                '&:hover': {
                  borderColor: 'primary.dark',
                  color: 'primary.dark',
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

      {/* ✅ Modal after successful subscription */}
     <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4, textAlign: 'center', maxWidth: 400, width: '90%' }}>
          <IconButton onClick={() => setOpenModal(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
          <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Congratulations!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your subscription has been added successfully.
          </Typography>
          <Button variant="contained" color='primary' halfWidth sx={{ mt: 3, borderRadius: 5, textTransform: 'none' }} onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
