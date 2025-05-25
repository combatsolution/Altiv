import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { Avatar, IconButton } from '@mui/material';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgBlur } from 'src/theme/css';
// routes
import { paths } from 'src/routes/paths';
// components
import Logo from 'src/components/logo';
import Label from 'src/components/label';
import { useAuthContext } from 'src/auth/hooks';
import { varHover } from 'src/components/animate';
//
import Altivlogo from 'src/images/Altivlogo.svg';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';

//
import { SettingsButton, HeaderShadow, LoginButton } from '../_common';
// import { JwtRegisterView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function Header() {
  const {user} = useAuthContext(); 
  console.log(user)
  const theme = useTheme(); 

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

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
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center', marginLeft:"30px"}}>
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top:10,
                left:20,

              },
            }}
          >

            <img src={Altivlogo} alt="BigCo Inc. logo" />

          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop offsetTop={offsetTop} sx={{marginleft:"20px"}}data={navConfig} />}

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse', color: "#0040D8",  }}>
            {!user && 
            <Button
              variant="contained"
              target="_self"
              rel="noopener"
              href={paths.auth.jwt.register}
              sx={{
                bgcolor: '#2A4DD0',
                textTransform: 'none', // prevents uppercase
                borderRadius: '100px', // apply 39% border radius
                '&:hover': {
                  bgcolor: '#0030aa', // darker on hover
                  width: { xs: '50%', sm: 'auto' },
                  
                },
              }}
            >
              Sign up 
            </Button>}

           {user && <IconButton
            component={m.button}
            whileTap="tap"
            whileHover="hover"
            variants={varHover(1.05)}
            // onClick={popover.onOpen}
            sx={{
              width: 40,
              height: 40,
              // eslint-disable-next-line no-shadow
              background: (theme) => alpha(theme.palette.grey[500], 0.08),
              // ...(popover.open && {
              //   background: (theme) =>
              //     `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              // }),
            }}
          >
            <Avatar
              src={user?.photoURL}
              alt={user?.displayName}
              sx={{
                width: 36,
                height: 36,
                // eslint-disable-next-line no-shadow
                border: (theme) => `solid 2px ${theme.palette.background.default}`,
              }}
            />
          </IconButton>}


            {mdUp && !user && <LoginButton />}

            {/* <SettingsButton
              sx={{
                ml: { xs: 1, md: 0 },
                mr: { md: 2 },
              }}
            /> */}

            {!mdUp && <NavMobile  offsetTop={offsetTop} data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
