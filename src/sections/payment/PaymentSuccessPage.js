// import React from 'react';
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

// const PaymentSuccessPage = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         backgroundColor: 'white', // ✅ Removed gradient background
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         py: { xs: 4, md:5 },
//         px: 2,
//       }}
//     >
//       <Container maxWidth="sm">
//         <Fade in timeout={800}>
//           <Paper
//             elevation={6}
//             sx={{
//               borderRadius: 4,
//               p: { xs: 4, sm: 6 },
//               background: 'white',
//               boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
//               textAlign: 'center',
//               border: '1px solid #f0f0f0',
//             }}
//           >
//             {/* Check Icon */}
//             <CheckCircleRoundedIcon
//               sx={{
//                 fontSize: { xs: 70, sm: 90 },
//                 color: '#2A4DD0', // ✅ Updated icon color to match text
//                 mb: 2,
//                 animation: 'bounce 1s ease-in-out',
//               }}
//             />

//             {/* Title */}
//             <Typography
//               variant={isMobile ? 'h5' : 'h4'}
//               fontWeight={700}
//               sx={{ color: '#2A4DD0' }} // ✅ Updated text color
//               gutterBottom
//             >
//               Payment Successful!
//             </Typography>

//             {/* Subtext */}
//             <Typography
//               variant="body1"
//               color="text.secondary"
//               sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}
//             >
//               Thank you for your purchase. A confirmation email has been sent to your inbox.
//             </Typography>

//             {/* CTA Button */}
//             <Button
//               variant="contained"
//               size="large"
//               sx={{
//                 borderRadius: 2,
//                 px: 5,
//                 textTransform: 'none',
//                 fontWeight: 600,
//                 fontSize: 16,
//                 bgcolor: '#2A4DD0', // ✅ Updated button color
//                 '&:hover': {
//                   bgcolor: '#1e3db8',
//                 },
//               }}
//               onClick={() => {
//                 window.location.href = '/dashboard';
//               }}
//             >
//               Go to Dashboard
//             </Button>
//           </Paper>
//         </Fade>
//       </Container>

//       {/* Optional Icon Animation */}
//       <style>{`
//         @keyframes bounce {
//           0%   { transform: scale(0.5); opacity: 0.5; }
//           60%  { transform: scale(1.2); opacity: 1; }
//           100% { transform: scale(1); }
//         }
//       `}</style>
//     </Box>
//   );
// };

// export default PaymentSuccessPage;



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

const SubscriptionSuccessPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Trigger animation or send backend ping here if needed
    console.log("Subscription success screen loaded");
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 6 },
        px: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Confetti Animation */}
  <div className="confetti" />

      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Paper
            elevation={6}
            sx={{
              borderRadius: 4,
              p: { xs: 4, sm: 6 },
              background: 'white',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              textAlign: 'center',
              border: '1px solid #f0f0f0',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Icon */}
            <CheckCircleRoundedIcon
              sx={{
                fontSize: { xs: 70, sm: 90 },
                color: '#2A4DD0',
                mb: 2,
                animation: 'bounce 1s ease-in-out',
              }}
            />

            {/* Heading */}
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              fontWeight={700}
              sx={{ color: '#2A4DD0' }}
              gutterBottom
            >
              Subscription Added Successfully!
            </Typography>

            {/* Message */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}
            >
              You are now subscribed! Stay tuned for updates and exclusive content in your inbox.
            </Typography>

            {/* Button */}
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: 2,
                px: 5,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
                bgcolor: '#2A4DD0',
                '&:hover': {
                  bgcolor: '#1e3db8',
                },
              }}
              onClick={() => {
                window.location.href = '/dashboard';
              }}
            >
              Go to Dashboard
            </Button>
          </Paper>
        </Fade>
      </Container>

      {/* Animations */}
      <style>{`
        @keyframes bounce {
          0%   { transform: scale(0.5); opacity: 0.5; }
          60%  { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); }
        }

        .confetti {
          position: absolute;
          top: 0;
          left: 50%;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: radial-gradient(circle, #2A4DD0 3px, transparent 4px),
                            radial-gradient(circle, #00C49F 3px, transparent 4px),
                            radial-gradient(circle, #FFBB28 3px, transparent 4px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px, 5px 15px;
          animation: confetti-fall 2.5s ease-in-out forwards;
        }

        @keyframes confetti-fall {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </Box>
  );
};

export default SubscriptionSuccessPage;
