

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
import Altivlogo from 'src/images/Altivlogo.png';
//  import SubHeader from 'src/components/subheader/subheader';
import { trackEvent } from 'src/utils/google-analytics';
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
    trackEvent({
      category: 'User',
      action: 'Sign Out',
      label: 'Profile Menu logout',
      value: 97,
    });
    logout(); // Call logout to clear auth context
    localStorage.removeItem('token'); // Clear specific auth-related keys (optional, if logout doesn't handle it)
    navigate(paths.auth.jwt.login, { replace: true }); // Navigate to login page
  };

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          mt: -1,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          backgroundColor: alpha(
            theme.palette.background.paper,
            theme.palette.mode === 'light' ? 0.6 : 0.3
          ),
          borderBottom: `0px solid ${alpha(theme.palette.divider, 0.2)}`,
          zIndex: theme.zIndex.drawer + 1,
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
              onClick={() => {
                trackEvent({
                  category: 'Navigation',
                  action: 'Logo Clicked',
                  label: 'Header Logo',
                  value: 1,
                });
                navigate('/')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  trackEvent({
                    category: 'Navigation',
                    action: 'Logo Keyboard Clicked',
                    label: 'Header Logo',
                    value: 1,
                  });
                  navigate('/');
                }
              }}
              sx={{
                cursor: 'pointer',
                display: 'inline-block',
                width: { xs: '114px', lg: '128px' },

              }}
              aria-label="Go to home"
            >
              <img src={Altivlogo} alt="BigCo Inc. lo go" />
            </Box>
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {isProfilePage ? (
            <m.div initial={{ x: '-100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'row', lg: 'row' },
                  width: '100%',
                  p: 2,
                  gap: 2,
                  borderRadius: 2,
                }}
              >
                {[
                  { name: 'Subscriptions', path: paths.subscription },
                  { name: 'Applied Jobs', path: paths.appliedjobs },
                  { name: 'Saved Jobs', path: paths.savejobs },
                ].map((item) => (
                  <Typography
                    key={item.name}
                    variant="body2"
                    sx={{ cursor: 'pointer', fontSize: 15, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      trackEvent({
                        category: 'Profile Navigation',
                        action: 'Clicked',
                        label: item.name,
                        value:96,
                      });
                      navigate(item.path);
                    }}
                  >
                    {item.name}
                  </Typography>
                ))}

                <Typography
                  variant="body2"
                  sx={{ cursor: 'pointer', fontSize: 15, whiteSpace: 'nowrap' }}
                  onClick={handleSignout}
                >
                  Signout
                </Typography>
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
                    onClick={() => trackEvent({
                      category: 'Navigation',
                      action: 'button clicked',
                      label: 'Sign Up',
                      value: 98,
                    })}
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
                  (!isLoginPage || !isProfilePage) && ( // Hide avatar on login page
                    <IconButton
                      component={m.button}
                      whileTap="tap"
                      whileHover="hover"
                      variants={varHover(1.05)}
                      onClick={() =>{
                        
                           trackEvent({
                          category: 'User',
                          action: 'Avatar Clicked',
                          label: 'Profile Icon',
                          value: 99,
                        });navigate(paths.Profile)}}
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
                  )
                }

                {isProfilePage && <Button variant="none" onClick={() =>
                  handleSignout()} sx={{ mr: 1, color: "#0040D8", }}>
                  Sign out
                </Button>}

                {!user && <LoginButton />}

                { }

                {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
              </Stack>

            </>
          )}

        </Container>

      </Toolbar>

      {offsetTop && <HeaderShadow /> }
     {/* <SubHeader/>   */}

    </AppBar>
  );
}
