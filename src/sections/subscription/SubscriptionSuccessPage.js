import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axios';
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
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const SubscriptionSuccessCard = () => {
  const [searchParams] = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  console.log('subscriptionId', subscriptionId);
  const [loading, setLoading] = useState(true);
  const [ssoResponse, setSsoResponse] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);  

  const handleSSOLogin = async () => {
    try {
      const subscriptionRes = await axiosInstance.get(`/subscriptions/${subscriptionId}`);
      const planData = subscriptionRes.data.planData;
      setSubscriptionData(planData);
      console.log('Subscription Data:', planData);

      const normalizedProductId =
       planData.courses.lmsId.charAt(0).toLowerCase() + planData.courses.lmsId.slice(1);

      const ssoRes = await axiosInstance.get(`/sso/sso-login/${normalizedProductId}`);
      console.log('SSO Login Success:', ssoRes.data);
      setSsoResponse(ssoRes.data);

      const userId = localStorage.getItem('User_id');
      if (!userId) {
        console.error('User_id not found in localStorage');
        return;
      }

      if (ssoRes.data?.token && planData?.courses?.lmsId && planData?.price) {
        const courses_userId = ssoRes.data.user_id;

        const enrollRes = await axios.post(
          `https://altiv.learnworlds.com/admin/api/v2/users/${courses_userId}/enrollment`,
          {
            productId: normalizedProductId,
            productType: 'course',
            justification: 'Purchased by Altiv.Ai',
            price: planData.price,
            send_enrollment_email: true,
          },
          {
            headers: {
              Authorization: `Bearer ${ssoRes.data.token}`,
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); // simulate loading
    return () => clearTimeout(timer);
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
