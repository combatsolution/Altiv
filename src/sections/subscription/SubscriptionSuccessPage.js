import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,   
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Container,
  Fade,
  CircularProgress,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useSearchParams } from 'react-router-dom';
import axiosInstance, { endpoints } from 'src/utils/axios';

const SubscriptionSuccessCard = () => {
  const subscriptionId = sessionStorage.getItem('subscriptionId');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [loading, setLoading] = useState(true);
  const [ssoResponse, setSsoResponse] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  
useEffect(() => {
  if (!loading) {
    // Check if user paid for the specific service
    const paidServices = JSON.parse(sessionStorage.getItem('paidServices') || '[]');
    if (paidServices.includes('fobo-pro')) {
      sessionStorage.removeItem('paidServices'); // redirect only once
      window.location.href = '/ai-readiness-analysis';
    }
  }
}, [loading]);

  const handleSSOLogin = async () => {
    try {
      const subscriptionRes = await axiosInstance.get(`/subscriptions/${subscriptionId}`);
      const planData = subscriptionRes.data.planData;
      setSubscriptionData(planData);
      console.log('Subscription Data:', planData);

      const normalizedProductId = planData.courses.lmsId.charAt(0).toLowerCase() + planData.courses.lmsId.slice(1);

      const fetchToken = async () => {
       const LmsTokenResp = await axiosInstance.get(endpoints.auth.me);
       const storedToken =LmsTokenResp.data.lmsToken;
        if (storedToken && storedToken !== 'undefined' && storedToken !== 'null') {
            return storedToken;
          }
        const formData = new URLSearchParams();
        formData.append('grant_type', 'client_credentials');
        formData.append('client_id', process.env.REACT_APP_LEARNWORLDS_CLIENT_ID);
        formData.append('client_secret', process.env.REACT_APP_LEARNWORLDS_TOKEN);

        const response = await axios.post(
          'https://altiv.learnworlds.com/admin/api/oauth2/access_token',
          formData.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const token = response.data?.tokenData?.access_token;
        return token;
      };

      const token = await fetchToken();
      console.log('Token:', token);
    
      const ssoRes = await axiosInstance.get(`/sso/sso-login/${normalizedProductId}/${token}`);
      console.log('SSO Login Success:', ssoRes.data);
      setSsoResponse(ssoRes.data);
      console.log('SSO Response:', ssoRes.data);    
      if (planData?.courses?.lmsId && planData?.price) {
        const coursesUserId = ssoRes.data.user_id;
        console.log('Courses User ID:', coursesUserId);
        const enrollRes = await axios.post(
          `https://altiv.learnworlds.com/admin/api/v2/users/${coursesUserId}/enrollment`,
          {
            productId: normalizedProductId,
            productType: 'course',
            justification: 'Purchased by Altiv.Ai',
            price: planData.price,
            send_enrollment_email: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              'lw-client': process.env.REACT_APP_LEARNWORLDS_CLIENT_ID,
            },
          }
        );

        console.log('Enrollment Success:', enrollRes);

        if (ssoRes.data.success && ssoRes.data.url) {
          window.open(ssoRes.data.url, '_blank');
        } else {
          console.error('SSO Login failed: no URL returned');
        }
      } else {
        console.error('Missing data for enrollment');
      }
    } catch (error) {
      console.error('SSO or Enrollment Failed:', error.response?.data || error.message);
    }
  };

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
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
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

          <Box sx={{ display: 'inline-flex', mb: 2 }}>
            <CheckCircleRoundedIcon
              sx={{
                fontSize: { xs: 64, sm: 80 },
                color: '#2A4DD0',
              }}
            />
          </Box>

          <Typography variant="h5" fontWeight={700} sx={{ color: '#2A4DD0', mb: 1 }} gutterBottom>
            Payment Processed Successfully!
          </Typography>

          {loading ? (
            <>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 0.1,
                  fontWeight: 800,
                  maxWidth: 400,
                  mx: 'auto',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                }}
              >
                Creating your learning profile...
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 3,
                  maxWidth: 400,
                  fontWeight: 700,
                  mx: 'auto',
                  fontSize: isMobile ? '0.875rem' : '0.9rem',
                }}
              >
                Adding you to your courses...
              </Typography>
              <CircularProgress size={28} sx={{ mt: 1, color: '#2A4DD0' }} />
            </>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={handleSSOLogin}
              sx={{
                mt: 2,
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
            >
              Start Learning
            </Button>
          )}
        </Paper>
      </Fade>
    </Container>
  );
};

export default SubscriptionSuccessCard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   useTheme,
//   useMediaQuery,
//   Container,
//   Fade,
//   CircularProgress,
// } from '@mui/material';
// import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
// import { useSearchParams } from 'react-router-dom';
// import axiosInstance, { endpoints } from 'src/utils/axios';

// const SubscriptionSuccessCard = () => {
//   const subscriptionId = sessionStorage.getItem('subscriptionId');
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const [loading, setLoading] = useState(true);
//   const [ssoResponse, setSsoResponse] = useState(null);
//   const [subscriptionData, setSubscriptionData] = useState(null);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 5000); // simulate loading
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSSOLogin = async () => {
//     try {
//       const subscriptionRes = await axiosInstance.get(`/subscriptions/${subscriptionId}`);
//       const planData = subscriptionRes.data.planData;
//       setSubscriptionData(planData);
//       console.log('Subscription Data:', planData);

//       const normalizedProductId = planData.courses.lmsId.charAt(0).toLowerCase() + planData.courses.lmsId.slice(1);

//       const fetchToken = async () => {
//        const LmsTokenResp = await axiosInstance.get(endpoints.auth.me);
//        const storedToken =LmsTokenResp.data.lmsToken;
//         if (storedToken && storedToken !== 'undefined' && storedToken !== 'null') {
//             return storedToken;
//           }
//         const formData = new URLSearchParams();
//         formData.append('grant_type', 'client_credentials');
//         formData.append('client_id', process.env.REACT_APP_LEARNWORLDS_CLIENT_ID);
//         formData.append('client_secret', process.env.REACT_APP_LEARNWORLDS_TOKEN);

//         const response = await axios.post(
//           'https://altiv.learnworlds.com/admin/api/oauth2/access_token',
//           formData.toString(),
//           {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//             },
//           }
//         );

//         const token = response.data?.tokenData?.access_token;
//         return token;
//       };

//       const token = await fetchToken();
//       console.log('Token:', token);
    
//       const ssoRes = await axiosInstance.get(`/sso/sso-login/${normalizedProductId}/${token}`);
//       console.log('SSO Login Success:', ssoRes.data);
//       setSsoResponse(ssoRes.data);
//       console.log('SSO Response:', ssoRes.data);    
//       if (planData?.courses?.lmsId && planData?.price) {
//         const coursesUserId = ssoRes.data.user_id;
//         console.log('Courses User ID:', coursesUserId);
//         const enrollRes = await axios.post(
//           `https://altiv.learnworlds.com/admin/api/v2/users/${coursesUserId}/enrollment`,
//           {
//             productId: normalizedProductId,
//             productType: 'course',
//             justification: 'Purchased by Altiv.Ai',
//             price: planData.price,
//             send_enrollment_email: true,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//               'lw-client': process.env.REACT_APP_LEARNWORLDS_CLIENT_ID,
//             },
//           }
//         );

//         console.log('Enrollment Success:', enrollRes);

//         if (ssoRes.data.success && ssoRes.data.url) {
//           window.open(ssoRes.data.url, '_blank');
//         } else {
//           console.error('SSO Login failed: no URL returned');
//         }
//       } else {
//         console.error('Missing data for enrollment');
//       }
//     } catch (error) {
//       console.error('SSO or Enrollment Failed:', error.response?.data || error.message);
//     }
//   };

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
//           <Typography
//             variant="h6"
//             sx={{
//               color: 'primary.main',
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

//           <Box sx={{ display: 'inline-flex', mb: 2 }}>
//             <CheckCircleRoundedIcon
//               sx={{
//                 fontSize: { xs: 64, sm: 80 },
//                 color: '#2A4DD0',
//               }}
//             />
//           </Box>

//           <Typography variant="h5" fontWeight={700} sx={{ color: '#2A4DD0', mb: 1 }} gutterBottom>
//             Payment Processed Successfully!
//           </Typography>

//           {loading ? (
//             <>
//               <Typography
//                 variant="body1"
//                 color="text.secondary"
//                 sx={{
//                   mb: 0.1,
//                   fontWeight: 800,
//                   maxWidth: 400,
//                   mx: 'auto',
//                   fontSize: isMobile ? '0.875rem' : '1rem',
//                 }}
//               >
//                 Creating your learning profile...
//               </Typography>
//               <Typography
//                 variant="body1"
//                 color="text.secondary"
//                 sx={{
//                   mb: 3,
//                   maxWidth: 400,
//                   fontWeight: 700,
//                   mx: 'auto',
//                   fontSize: isMobile ? '0.875rem' : '0.9rem',
//                 }}
//               >
//                 Adding you to your courses...
//               </Typography>
//               <CircularProgress size={28} sx={{ mt: 1, color: '#2A4DD0' }} />
//             </>
//           ) : (
//             <Button
//               variant="contained"
//               size="large"
//               onClick={handleSSOLogin}
//               sx={{
//                 mt: 2,
//                 borderRadius: 2,
//                 px: 4,
//                 py: 1,
//                 textTransform: 'none',
//                 fontWeight: 600,
//                 fontSize: 15,
//                 bgcolor: '#2A4DD0',
//                 boxShadow: '0 4px 12px rgba(42, 77, 208, 0.2)',
//                 transition: 'all 0.2s ease',
//                 '&:hover': {
//                   bgcolor: '#1e3db8',
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 6px 16px rgba(42, 77, 208, 0.3)',
//                 },
//               }}
//             >
//               Start Learning
//             </Button>
//           )}
//         </Paper>
//       </Fade>
//     </Container>
//   );
// };

// export default SubscriptionSuccessCard;