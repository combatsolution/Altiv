/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
  import PropTypes from 'prop-types';
  import { useNavigate } from 'react-router-dom';
  // @mui
  import { alpha, useTheme } from '@mui/material/styles';
  import Box from '@mui/material/Box';
  import Link from '@mui/material/Link';
  import Stack from '@mui/material/Stack';
  import Tooltip from '@mui/material/Tooltip';
  import Typography from '@mui/material/Typography';
  import { Container } from '@mui/material';
  import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

  // auth
  import { useAuthContext } from 'src/auth/hooks';
  // routes
  import { paths } from 'src/routes/paths';
  import { RouterLink } from 'src/routes/components';
  // hooks
  import { useResponsive } from 'src/hooks/use-responsive';
  // theme
  import { bgGradient } from 'src/theme/css';
  // components
  import Logo from 'src/components/logo';
  import Header from '../main/header';


  // ----------------------------------------------------------------------

  const METHODS = [
    {
      id: 'jwt',
      label: 'Jwt',
      path: paths.auth.jwt.login,
      icon: '/assets/icons/auth/ic_jwt.svg',
    },
    {
      id: 'firebase',
      label: 'Firebase',
      path: paths.auth.firebase.login,
      icon: '/assets/icons/auth/ic_firebase.svg',
    },
    {
      id: 'amplify',
      label: 'Amplify',
      path: paths.auth.amplify.login,
      icon: '/assets/icons/auth/ic_amplify.svg',
    },
    {
      id: 'auth0',
      label: 'Auth0',
      path: paths.auth.auth0.login,
      icon: '/assets/icons/auth/ic_auth0.svg',
    },
  ];

  export default function AuthClassicLayout({ children, image, title, subtitle }) {
    const navigate = useNavigate();
    const { method } = useAuthContext();

    const theme = useTheme();

    const upMd = useResponsive('up', 'md');

    const renderLogo = (
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          m: { xs: 2, md: 5 },
        }}
      />
    );

    const renderContent = (
      <Stack
        sx={{
          width: 1,
          mx: 'auto',
          maxWidth: 480,
          px: { xs: 2, md: 8 },
          py: { xs: 10, md: 10 },
        }}
      >
        {children}
      </Stack>
    );

    const renderSection = (
      <Stack
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
        spacing={10}
        sx={{
          ...bgGradient({
            color: alpha(
              theme.palette.background.default,
              theme.palette.mode === 'light' ? 0.88 : 0.94
            ),
            imgUrl: '/assets/background/overlay_2.jpg',
          }),
        }}
      >
        <Typography variant="h3" sx={{ maxWidth: 480, textAlign: 'center' }}>
          {title || 'Hi, Welcome back'}
        </Typography>

        <Box
          component="img"
          alt="auth"
          src={image || '/assets/illustrations/illustration_dashboard.png'}
          sx={{ maxWidth: 720 }}
        />

        <Stack direction="row" spacing={2}>
          {METHODS.map((option) => (
            <Tooltip key={option.label} title={option.label}>
              <Link component={RouterLink} href={option.path}>
                <Box
                  component="img"
                  alt={option.label}
                  src={option.icon}
                  sx={{
                    width: 32,
                    height: 32,
                    ...(method !== option.id && {
                      filter: 'grayscale(100%)',
                    }),
                  }}
                />
              </Link>
            </Tooltip>
          ))}
        </Stack>
      </Stack>
    );

    return (
      <Stack
        component="main"
        direction="column"
        sx={{
          maxHeight: '70vh',
        }}
      >

        <Header />
        <Box sx={{ backgroundColor: '#E9F4FF', py: 1.5, px: 1, mt:9, width:"100%" }}>
          <Container sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <img src="/assets/home.svg" style={{width: "25px", cursor: 'pointer'}} alt="homesvg" onClick={() => navigate('/', {replace: true})}/>
            <ArrowForwardIosIcon fontSize="small" sx={{ fontSize: '12px' }} />
            <Typography variant="body2">{subtitle}</Typography> 
          </Container>
        </Box>
        {/* {upMd && renderSection} */}

        {renderContent}
      </Stack>
    );
  } 

  AuthClassicLayout.propTypes = {
    children: PropTypes.node,
    image: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string
  };
