
import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'src/routes/hook';
import axiosInstance from 'src/utils/axios';

export default function PaymentSummary({ sx, ...other }) {
  const params = useSearchParams();
  const { planId } = params;
  const [planData, setPlansData] = useState(null);
 console.log('planId:', planId);
  

  useEffect(() => {
  console.log('planId:', planId);
  const fetchPlanData = async () => {
    try {
      const response = await axiosInstance.get(`/plans/${planId}`);
      if (response && response.data) {
        setPlansData(response.data);
      }
    } catch (error) {
      console.error('Error fetching plan data:', error);
    }
  };

  if (planId !== null && planId !== undefined) {
    fetchPlanData();
  }
}, [planId]);


  const handleUpgrade = async () => {
    try {
      const payload = {
        planid: 4,
        paymentMethod: 1, // 1 for Indian payment
      };

      const response = await axiosInstance.post('/subscriptions', payload);
      console.log('Subscription successful:', response.data);
      console.log('planId successful:', planId);
      // Optionally redirect or show success UI
    } catch (error) {
      console.error('Subscription failed:', error);
      // Show error UI or snackbar
    }
  };

  const renderPrice = (
    <Stack direction="row" justifyContent="flex-end">
      <Typography variant="h4">₹</Typography>
      <Typography variant="h2">{planData?.price}</Typography>
    </Stack>
  );

  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        ...sx,
      }}
      {...other}
    >
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

        {renderPrice}

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

      <Button fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} onClick={handleUpgrade}>
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
