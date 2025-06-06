

import { m } from 'framer-motion';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { Avatar, IconButton, InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';
import { varHover } from 'src/components/animate';
import Altivlogo from 'src/images/Altivlogo.svg';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { SettingsButton, HeaderShadow, LoginButton } from '../_common';

export default function Header() {
  const { user, loading, logout } = useAuthContext(); // Assume logout is provided by useAuthContext
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if the current path is paths.profile or the login page
  const isProfilePage = location.pathname === paths.Profile;
  const isLoginPage = location.pathname === paths.auth.jwt.login;

  // Handle signout
  const handleSignout = () => {
    logout(); // Call logout to clear auth context
    localStorage.removeItem('token'); // Clear specific auth-related keys (optional, if logout doesn't handle it)
    navigate(paths.auth.jwt.login, {replace : true}); // Navigate to login page
  };

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 10,
                left: 30,
              },
            }}
          >
            <Box
              role="button"
              tabIndex={0}
              onClick={() => navigate('/')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate('/');
                }
              }}
              sx={{ cursor: 'pointer', display: 'inline-block' }}
              aria-label="Go to home"
            >
              <img src={Altivlogo} alt="BigCo Inc. lo go" />
            </Box>
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {/* {isProfilePage ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  p: 2,
                  gap: 4,
                  backgroundColor: '#fff',
                }}
              >
                <Box
                  sx={{
                    display: { xs: 'fit-content', lg: 'flex' },
                    alignItems: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    px: 1.5,
                    py: 0.5,
                    width: { xs: 'auto', sm: 'auto', lg: 'auto' },
                  }}
                >
                  <SearchIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                  <InputBase placeholder="Type here…" sx={{ fontSize: 14, flex: 1 }} />
                </Box>

                <Typography
                  variant="body2"
                  sx={{ cursor: 'pointer', fontSize: 15 }}
                  onClick={() => navigate(paths.comingSoon)}
                >
                  My Jobs
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ cursor: 'pointer', fontSize: 15 }}
                  onClick={handleSignout} // Use handleSignout function
                >
                  Signout
                </Typography>

                <IconButton>
                  <Badge badgeContent={0} color="error">
                    <NotificationsIcon sx={{ color: 'black' }} />
                  </Badge>
                </IconButton>
              </Box>
            ) : ( */}
          {isProfilePage ? (
            <m.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: {
                    xs: 'flex-start',
                    lg: 'flex-end',
                  },
                  flexDirection: {
                    xs: 'column',
                    lg: 'row',
                  },
                  p: 2,
                  gap: { xs: 2, lg: 4 },
                  backgroundColor: '#fff',
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    px: 1.5,
                    py: 0.5,
                    width: { xs: '100%', sm: 'auto', lg: 'auto' },
                  }}
                >
                  <SearchIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                  <InputBase placeholder="Type here…" sx={{ fontSize: 14, flex: 1 }} />
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    cursor: 'pointer',
                    fontSize: 15,
                    width: { xs: '100%', lg: 'auto' },
                    textAlign: { xs: 'left', lg: 'inherit' },
                  }}
                  onClick={() => navigate(paths.comingSoon)}
                >
                  My Jobs
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    cursor: 'pointer',
                    fontSize: 15,
                    width: { xs: '100%', lg: 'auto' },
                    textAlign: { xs: 'left', lg: 'inherit' },
                  }}
                  onClick={handleSignout}
                >
                  Signout
                </Typography>

                <IconButton>
                  <Badge badgeContent={0} color="error">
                    <NotificationsIcon sx={{ color: 'black' }} />
                  </Badge>
                </IconButton>
              </Box>
            </m.div>
          ) : (
            <>
              {mdUp && (
                <NavDesktop offsetTop={offsetTop} sx={{ marginLeft: '20px' }} data={navConfig} />
              )}

              <Stack
                alignItems="center"
                direction={{ xs: 'row', md: 'row-reverse' }}
                sx={{ color: '#0040D8' }}
              >
                {!user && (
                  <Button
                    variant="contained"
                    target="_self"
                    rel="noopener"
                    href={paths.auth.jwt.register}
                    sx={{
                      bgcolor: '#2A4DD0',
                      textTransform: 'none',
                      borderRadius: '100px',
                      display: { xs: 'none', sm: 'inline-flex' },
                      '&:hover': {
                        bgcolor: '#0030aa',
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                )}

                {user &&
                  !isLoginPage && ( // Hide avatar on login page
                    <IconButton
                      component={m.button}
                      whileTap="tap"
                      whileHover="hover"
                      variants={varHover(1.05)}
                      onClick={() => navigate(paths.Profile)}
                      sx={{
                        width: 40,
                        height: 40,
                        background: (_theme) => alpha(theme.palette.grey[500], 0.08),
                        '&:hover': {
                          background: (_theme) => alpha(theme.palette.grey[500], 0.16),
                        },
                      }}
                    >
                      <Avatar
                        src={user?.photoURL || ''}
                        alt={user?.displayName || `${user?.firstName} ${user?.lastName}`}
                        sx={{
                          width: 36,
                          height: 36,
                          border: (_theme) => `solid 2px ${theme.palette.background.default}`,
                          backgroundColor: theme.palette.grey[500],
                          color: theme.palette.common.white,
                        }}
                      />
                    </IconButton>
                  )}

                {mdUp && !user && <LoginButton />}

                {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
              </Stack>
            </>
          )}
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
