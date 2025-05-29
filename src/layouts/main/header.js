// import { m } from 'framer-motion';
// // @mui
// import { alpha, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import Toolbar from '@mui/material/Toolbar';
// import Container from '@mui/material/Container';
// import Badge, { badgeClasses } from '@mui/material/Badge';
// import { Avatar, IconButton } from '@mui/material';
// // hooks
// import { useOffSetTop } from 'src/hooks/use-off-set-top';
// import { useResponsive } from 'src/hooks/use-responsive';
// // theme
// import { bgBlur } from 'src/theme/css';
// // routes
// import { paths } from 'src/routes/paths';
// // components
// import Logo from 'src/components/logo';
// import Label from 'src/components/label';
// import { useAuthContext } from 'src/auth/hooks';
// import { varHover } from 'src/components/animate';
// //
// import Altivlogo from 'src/images/Altivlogo.svg';
// import { HEADER } from '../config-layout';
// import { navConfig } from './config-navigation';
// import NavMobile from './nav/mobile';
// import NavDesktop from './nav/desktop';

// //
// import { SettingsButton, HeaderShadow, LoginButton } from '../_common';
// // import { JwtRegisterView } from 'src/sections/auth/jwt';

// // ----------------------------------------------------------------------

// export default function Header() {
//   const { user } = useAuthContext();
//   console.log(user)
//   const theme = useTheme();

//   const mdUp = useResponsive('up', 'md');

//   const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

//   return (
//     <AppBar>
//       <Toolbar
//         disableGutters
//         sx={{
//           height: {
//             xs: HEADER.H_MOBILE,
//             md: HEADER.H_DESKTOP,
//           },
//           transition: theme.transitions.create(['height'], {
//             easing: theme.transitions.easing.easeInOut,
//             duration: theme.transitions.duration.shorter,
//           }),
//           ...(offsetTop && {
//             ...bgBlur({
//               color: theme.palette.background.default,
//             }),
//             height: {
//               md: HEADER.H_DESKTOP_OFFSET,
//             },
//           }),
//         }}
//       >
//         <Container sx={{ height: 1, display: 'flex', alignItems: 'center', marginLeft: "auto" }}>
//           <Badge
//             sx={{
//               [`& .${badgeClasses.badge}`]: {
//                 top: 10,
//                 left: 30,

//               },
//             }}
//           >

//             <img src={Altivlogo} alt="BigCo Inc. logo" />

//           </Badge>

//           <Box sx={{ flexGrow: 1 }} />

//           {mdUp && <NavDesktop offsetTop={offsetTop} sx={{ marginleft: "20px" }} data={navConfig} />}

//           <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse', color: "#0040D8", }}>
//             {!user &&
//               <Button
//                 variant="contained"
//                 target="_self"
//                 rel="noopener"
//                 href={paths.auth.jwt.register}
//                 sx={{
//                   bgcolor: '#2A4DD0',
//                   textTransform: 'none',
//                   borderRadius: '100px',
//                   display: { xs: 'none', sm: 'inline-flex' }, 
//                   '&:hover': {
//                     bgcolor: '#0030aa',
//                   },
//                 }}
//               >
//                 Sign up
//               </Button>}

//             {user && <IconButton
//               component={m.button}
//               whileTap="tap"
//               whileHover="hover"
//               variants={varHover(1.05)}
//               // onClick={popover.onOpen}
//               sx={{
//                 width: 40,
//                 height: 40,
//                 // eslint-disable-next-line no-shadow
//                 background: (theme) => alpha(theme.palette.grey[500], 0.08),
//                 // ...(popover.open && {
//                 //   background: (theme) =>
//                 //     `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
//                 // }),
//               }}
//             >
//               <Avatar
//                 src={user?.photoURL}
//                 alt={user?.displayName}
//                 sx={{
//                   width: 36,
//                   height: 36,
//                   // eslint-disable-next-line no-shadow
//                   border: (theme) => `solid 2px ${theme.palette.background.default}`,
//                 }}
//               />
//             </IconButton>}


//             {mdUp && !user && <LoginButton />}

//             {/* <SettingsButton
//               sx={{
//                 ml: { xs: 1, md: 0 },
//                 mr: { md: 2 },
//               }}
//             /> */}

//             {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
//           </Stack>
//         </Container>
//       </Toolbar>

//       {offsetTop && <HeaderShadow />}
//     </AppBar>
//   );
// }
// C:\Users\Admin\Downloads\public (3)\src\layouts\main\header.js



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
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
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
  const { user, loading } = useAuthContext();
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);
  const navigate = useNavigate();
  const location = useLocation(); // Initialize useLocation to get current path

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if the current path is paths.profile
  const isProfilePage = location.pathname === paths.Profile;

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
            <img src={Altivlogo} alt="BigCo Inc. logo" />
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {isProfilePage ? (
            // Render this Box when on paths.profile
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
              {/* Search Input */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  px: 1.5,
                  py: 0.5,
                  width: 230,
                }}
              >
                <SearchIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                <InputBase
                  placeholder="Type here…"
                  sx={{ fontSize: 14, flex: 1 }}
                />
              </Box>

              {/* Nav Links */}
              <Typography variant="body2" sx={{ cursor: 'pointer', fontSize: 15 }}>
                My Jobs
              </Typography>
              <Typography
                variant="body2"
                sx={{ cursor: 'pointer', fontSize: 15 }}
                onClick={() => {
                  // Clear local storage, session, or auth context if needed
                  localStorage.clear();  // Or your auth clear logic
                  navigate('/login'); // Or '/' to redirect to home page
                }}
              >
                Signout
              </Typography>

              {/* Notification Icon */}
              <IconButton>
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon sx={{ color: 'black' }} />
                </Badge>
              </IconButton>
            </Box>
          ) : (
            // Render the default header content for other pages
            <>
              {mdUp && <NavDesktop offsetTop={offsetTop} sx={{ marginLeft: '20px' }} data={navConfig} />}

              <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }} sx={{ color: '#0040D8' }}>
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
                    Sign up
                  </Button>
                )}

                {user && (
                  <IconButton
                    component={m.button}
                    whileTap="tap"
                    whileHover="hover"
                    variants={varHover(1.05)}
                    onClick={() => navigate(paths.Profile)} // Navigate to /profile
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