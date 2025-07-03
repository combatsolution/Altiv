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

export default function PaymentSummary({ sx, ...other }) {
  const navigate = useNavigate();
  const { planId } = useParams();
  const { user } = useAuthContext();
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => { 
      try {
        const response = await axiosInstance.get(`/plans/${planId}`);
        setPlanData(response.data);
      } catch (error) {
        console.error('Error fetching plan:', error);
      }
    };

    if (planId) fetchPlan();
  }, [planId]);

  const isValidIndianNumber = (number) => {
    const cleanedNumber = number?.replace(/\D/g, '');
    const regex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    return regex.test(cleanedNumber);
  };

  const handleUpgrade = async () => {
    try {
      const userPhone = user?.phoneNumber || '';
      const isIndianUser = isValidIndianNumber(userPhone);

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
    }
  };
  // const launchRazorpay = (data) => {
  //   const payment = data.paymentObject;

  //   const options = {
  //     key: payment.razorpayKeyId,
  //     amount: payment.amount,
  //     currency: payment.currency,
  //     name: 'Altiv AI',
  //     description: 'Plan Purchase',
  //     order_id: payment.orderId,
  //     handler: (response) => {
  //       console.log('Razorpay Success:', response);

  //       // You can also verify payment here before redirecting
  //       navigate('/successpage'); // ✅ Correct usage
  //     },
  //     prefill: {
  //       name: data.customerName || '',
  //       email: data.customerEmail || '',
  //       contact: data.customerPhone || '',
  //     },
  //     notes: {
  //       planId,
  //     },
  //     theme: {
  //       color: '#3399cc',
  //     },
  //   };

  //   const razor = new window.Razorpay(options);
  //   razor.open();
  // };
  
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
           navigate(verifyRes);
          if (verifyRes.data.success) {
            navigate('/payment/success');
            window.location.reload();
          } else {
            navigate('/payment/success');
          }
        } catch (error) {
          console.error('Verification failed:', error);
          alert('Server error verifying payment.');
        }
      },
      prefill: {
        name: data.customerName || '',
        email: data.customerEmail || '',
        contact: data.customerPhone || '',
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

  

//  const launchRazorpay = (data) => {
//   const payment = data.paymentObject;
//   console.log('Launching Razorpay with:', payment);

//   const options = {
//     key: payment.razorpayKeyId,
//     amount: payment.amount,
//     currency: payment.currency,
//     name: 'Altiv AI',
//     description: 'Plan Purchase',
//     order_id: payment.orderId,
//     handler: async (response) => {
//       console.log('Razorpay Success:', response);

//       try {
//         const verifyRes = await axiosInstance.post(
//           '/subscriptions/callback/verify',
// {
//             subscription_id: payment.subscriptionId,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           }          
//           // Optional: if you require token-based auth
//           // {
//           //   headers: {
//           //     Authorization: `Bearer ${user?.accessToken}`,
//           //   },
//           // }
//         );
//         console.log('Razorpay Verification Response:', verifyRes);
//         const resData = verifyRes?.data;
//         console.log('Verification response:', resData);

//         if (verifyRes.status === 200 && resData?.success) {
//           navigate('/successpage');
//           window.location.reload();
//         } else {
//           console.warn('Verification failed, redirecting anyway');
//         }
//       } catch (error) {
//         console.error('Verification request failed:', error?.response || error);
//         alert('Server error verifying payment. Redirecting...');
//       }
//     },
//     prefill: {
//       name: data.customerName || '',
//       email: data.customerEmail || '',
//       contact: data.customerPhone || '',
//     },
//     notes: {
//       planId,
//     },
//     theme: {
//       color: '#3399cc',
//     },
//   };

//   const razor = new window.Razorpay(options);
//   razor.open();
// };

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
          <Label color="error">{planData?.planName}</Label>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="h4">₹</Typography>
          <Typography variant="h2"  color="primary">{planData?.price}</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Total Billed</Typography>
          <Typography variant="subtitle1">₹{planData?.price}</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>

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
      >
        Upgrade My Plan
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
