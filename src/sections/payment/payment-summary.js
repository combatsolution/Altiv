import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useNavigate, useParams } from 'react-router';
import { useAuthContext } from 'src/auth/hooks';
import planStarterIcon from 'src/assets/icons/plan-starter-icon';

export default function PaymentSummary({ sx, ...other }) {
  const navigate = useNavigate();
 const {planId} = useParams();
  console.log("fs", planId)
  const { user } = useAuthContext();
  const [planData, setPlanData] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("user is :", user);
  // Fetch plan data
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        // const response = await axiosInstance.get(`/plans/${planId}`);
         const response = await axiosInstance.get(`/plans/${planId}`);
        console.log("MD",response.planData);
        setPlanData(response.data);
      } catch (err) {
        console.error('Error fetching plan:', err);
      }
    };

    if (planId) fetchPlan();
  }, [planId]);

  // Fetch user's country based on IP
  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch IP data');
        }
        const result = await response.json();
        setCountry(result.country_code); // e.g., "IN" for India
      } catch (err) {
        setError(err.message);
        console.error('Error fetching country:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);

  const handleUpgrade = async () => {
    try {
      const isIndianUser = country === 'IN'; // Check if the country is India
      const payload = {
        planId: Number(planId),
        paymentMethod: isIndianUser ? 1 : 0, // 1 = Razorpay (India), 0 = Stripe (International)
        isDeleted: false,
      };

      const res = await axiosInstance.post('/subscriptions', payload);
      const { data } = res;
      console.log('Subscription data:', res);
      if (data.paymentMethod === 1) {
        // Razorpay
        launchRazorpay(data);
      } else {
        // Stripe
        window.location.href = data.paymentObject.sessionUrl;
      }
    } catch (err) {
      console.error('Subscription failed', err);
       navigate('/pricing');
    }
  };

  const launchRazorpay = (data) => {
    const payment = data.paymentObject;
    console.log('Launching Razorpay with:', payment);
    const options = {
      key: payment.razorpayKeyId,
      amount: payment.amount,
      currency: payment.currency,
      name: 'Altiv AI',
      description: 'Plan Purchase',
      order_id: payment.orderId,
      handler: async (response) => {
        console.log('Razorpay Success:', response);
        try {
          const inputData = {
            subscription_id: payment.subscriptionId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          console.log('Verifying payment with data:', inputData);
          const verifyRes = await axiosInstance.post('/subscriptions/callback/verify', inputData);
          console.log('Verification response:', verifyRes.data);
          if (verifyRes.data.success) {
            sessionStorage.setItem('subscriptionId', payment.subscriptionId);
            navigate(`/payment/success`,{replace: true});
            window.location.reload();
          } else {
            navigate('/pricing');
          }
        } catch (err) { // Changed from 'error' to 'err' to avoid shadowing
          console.error('Verification failed:', err);
          alert('Server error verifying payment.');
          navigate('/pricing');
        }
      },
      prefill: {
        name: data.customerName || user.name,
        email: data.customerEmail || user.email,
        contact: data.customerPhone || user.phone,
      },
      notes: {
        planId,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };


  return (
    <Box sx={{ p: 5, borderRadius: 2, bgcolor: 'background.neutral', ...sx }} {...other}>
      <Typography variant="h6" sx={{ mb: 5 }}>
        Summary
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Subscription
          </Typography>
          {console.log("dj",planData)}
          <Label color="error">  {planData?.courses?.courseName || 'Marketing-1199'}</Label>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="h4">₹</Typography>
          <Typography variant="h2" color="primary">{planData?.price}</Typography>
        </Stack>

        <Divider sx={{ borderStyle:'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Total Billed</Typography>
          <Typography variant="subtitle1">₹{planData?.price}</Typography>
        </Stack>

        <Divider sx={{ borderStyle:'dashed' }} />
      </Stack>

      {error && (
        <Typography variant="caption" sx={{ color: 'error.main', mt: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        * Plus applicable taxes
      </Typography>

      

      <Button
        fullWidth
        size="large"
        variant="contained"
        sx={{ mt: 5, mb: 3 }}
        onClick={handleUpgrade}
        color="primary"
        disabled={loading || !country} // Disable button while loading or if country is not fetched
      >
        {loading ? 'Fetching Location...' : 'Upgrade My Plan'}
      </Button>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="solar:shield-check-bold" sx={{ color: 'success.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </Box>
  );
}

PaymentSummary.propTypes = {
  sx: PropTypes.object,
};