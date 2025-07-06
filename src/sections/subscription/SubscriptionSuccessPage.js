// import React, { useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   useTheme,
//   useMediaQuery,
//   Container,
//   Fade,
// } from '@mui/material';
// import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

// const SubscriptionSuccessCard = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleNavigation = () => {
//     // Use replace to prevent adding to history stack
//     window.location.replace('/');
//   };
//   useEffect(() => {
//     // Handle back button to stay on the current page
//     const handlePopState = () => {
//       window.history.pushState(null, document.title, window.location.pathname);
//     };

//     window.history.pushState(null, document.title, window.location.pathname);
//     window.addEventListener('popstate', handlePopState);

//     // Cleanup listener on component unmount
//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, []);

//   return (
//     <Container maxWidth="sm" sx={{ mt: 2 }}>
//       <Fade in timeout={500}>
//         <Paper
//           elevation={6}
//           sx={{
//             borderRadius: 4,
//             p: { xs: 3, sm: 4 },
//             background: 'white',
//             boxShadow: '0 10px 30px rgba(42, 77, 208, 0.1)',
//             textAlign: 'center',
//             border: '1px solid rgba(42, 77, 208, 0.1)',
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//         >
//           {/* Celebration Text */}
//           <Typography
//             variant="h6"
//             sx={{
//               color: '#00C49F',
//               fontWeight: 600,
//               mb: 1,
//               letterSpacing: 1.1,
//               textTransform: 'uppercase',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: 1,
//             }}
//           >
//             Congratulations!
//           </Typography>

//           {/* Icon */}
//           <Box
//             sx={{
//               display: 'inline-flex',
//               mb: 2,
//             }}
//           >
//             <CheckCircleRoundedIcon
//               sx={{
//                 fontSize: { xs: 64, sm: 80 },
//                 color: '#2A4DD0',
//               }}
//             />
//           </Box>

//           {/* Heading */}
//           <Typography
//             variant={isMobile ? 'h5' : 'h4'}
//             fontWeight={700}
//             sx={{ 
//               color: '#2A4DD0',
//               mb: 2,
//             }}
//             gutterBottom
//           >
//             Subscription Added Successfully!
//           </Typography>

//           {/* Message */}
//           <Typography
//             variant="body1"
//             color="text.secondary"
//             sx={{ 
//               mb: 3, 
//               maxWidth: 400, 
//               mx: 'auto',
//               fontSize: isMobile ? '0.875rem' : '1rem',
//             }}
//           >
//             You are now subscribed! Stay tuned for updates and exclusive content in your inbox.
//           </Typography>

//           <Button
//             variant="contained"
//             size="large"
//             sx={{
//               borderRadius: 2,
//               px: 4,
//               py: 1,
//               textTransform: 'none',
//               fontWeight: 600,
//               fontSize: 15,
//               bgcolor: '#2A4DD0',
//               boxShadow: '0 4px 12px rgba(42, 77, 208, 0.2)',
//               transition: 'all 0.2s ease',
//               '&:hover': {
//                 bgcolor: '#1e3db8',
//                 transform: 'translateY(-2px)',
//                 boxShadow: '0 6px 16px rgba(42, 77, 208, 0.3)',
//               },
//             }}
//             onClick={handleNavigation}
//           >
//             Go to Dashboard
//           </Button>
//         </Paper>
//       </Fade>
//     </Container>
//   );
// };

// export default SubscriptionSuccessCard;

import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Container,
  Fade,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const SubscriptionSuccessCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigation = () => {
    // Replace the current history entry to prevent back navigation
    window.location.replace('/');
  };

  useEffect(() => {
    // Overwrite history stack to minimize previous entries
    // for (let i = 0; i < window.history.length; i++) {
    //   window.history.pushState(null, document.title, window.location.pathname);
    // }

    // Handle back button to stay on the current page
    const handlePopState = () => {
      window.history.pushState(null, document.title, window.location.pathname);
      window.location.reload(); // Force reload to stay on current page
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Fade in timeout={500}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            p: { xs: 3, sm: 4 },
            background: 'white',
            boxShadow: '0 10px 30px rgba(42, 77, 208, 0.1)',
            textAlign: 'center',
            border: '1px solid rgba(42, 77, 208, 0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Celebration Text */}
          <Typography
            variant="h6"
            sx={{
              color: '#00C49F',
              fontWeight: 600,
              mb: 1,
              letterSpacing: 1.1,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            Congratulations!
          </Typography>

          {/* Icon */}
          <Box
            sx={{
              display: 'inline-flex',
              mb: 2,
            }}
          >
            <CheckCircleRoundedIcon
              sx={{
                fontSize: { xs: 64, sm: 80 },
                color: '#2A4DD0',
              }}
            />
          </Box>

          {/* Heading */}
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            fontWeight={700}
            sx={{ 
              color: '#2A4DD0',
              mb: 2,
            }}
            gutterBottom
          >
            Subscription Added Successfully!
          </Typography>

          {/* Message */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ 
              mb: 3, 
              maxWidth: 400, 
              mx: 'auto',
              fontSize: isMobile ? '0.875rem' : '1rem',
            }}
          >
            You are now subscribed! Stay tuned for updates and exclusive content in your inbox.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 15,
              bgcolor: '#2A4DD0',
              boxShadow: '0 4px 12px rgba(42, 77, 208, 0.2)',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: '#1e3db8',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(42, 77, 208, 0.3)',
              },
            }}
            onClick={handleNavigation}
          >
            Go to Dashboard
          </Button>
        </Paper>
      </Fade>
    </Container>
  );
};

export default SubscriptionSuccessCard;