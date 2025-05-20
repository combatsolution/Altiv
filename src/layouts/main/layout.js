import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// routes
import { usePathname } from 'src/routes/hook';
//
import Footer from './footer';
import Header from './header';


// ----------------------------------------------------------------------

export default function MainLayout({ children, subtitle }) {
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 10 },
          }),
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
  subtitle: PropTypes.string
};
