import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Stack, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { paths } from 'src/routes/paths';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';

export default function PricingCard({ card, sx, ...other }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    if (user?.activeSubscriptionId && user?.currentPlanId) {
      setActivePlan(user.currentPlanId);
    }
  }, [user]);

  const { id, planName, price, paymentType, recurringPeriod, isFreePlan, subTitle } = card;

  const isCurrentPlan = activePlan === id;

  // 👇 Clean, ESLint-friendly label logic
  let buttonLabel = 'Pay Now';
  if (isCurrentPlan) {
    buttonLabel = 'Current Plan';
  } else if (isFreePlan) {
    buttonLabel = 'Free';
  }

  const renderSubscription = (
    <Stack spacing={1} display="flex" alignItems="center" width="100%">
      <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
        {planName}
      </Typography>
      <Box width="100%" display="flex" justifyContent="center">
        <Typography variant="subtitle2" align="center" color="success.lighter">
          {subTitle}
        </Typography>
      </Box>
    </Stack>
  );

  const renderPrice = isFreePlan ? (
    <Typography variant="h2" sx={{ mb: 0 }}>
      Free
    </Typography>
  ) : (
    <Stack direction="column" justifyContent="center" alignItems="flex-end">
      <Stack direction="row" justifyContent="center" alignItems="flex-end">
        <Typography variant="h4" sx={{ alignSelf: 'center', mr: 1, ml: 1, typography: 'body2' }}>
          ₹
        </Typography>
        <Typography variant="h2" color="primary">
          {price}
        </Typography>
      </Stack>
      <Typography
        component="span"
        sx={{
          alignSelf: 'center',
          color: 'text.disabled',
          ml: 1,
          typography: 'body2',
        }}
      >
        {paymentType === 'oneTime' ? 'One Time Payment' : recurringPeriod}
      </Typography>
    </Stack>
  );

  const renderList = (
    <Stack spacing={2} sx={{ width: '100%', mt:-3}}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span" sx={{ typography: 'overline' }}>
          Features
        </Box>
      </Stack>

      <Stack spacing={1}>
        <Stack direction="row" spacing={1}>
          <Iconify icon="eva:checkmark-fill" width={20} sx={{ color: 'green' }} />
          <Typography variant="body2">Fast performance</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Iconify icon="eva:checkmark-fill" width={20} sx={{ color: 'green' }} />
          <Typography variant="body2">User-friendly interface</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Iconify icon="eva:checkmark-fill" width={20} sx={{ color: 'green' }} />
          <Typography variant="body2">Secure data handling</Typography>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{
        p: 4,
        height: '100%',
        borderRadius: 2,
        boxShadow: (theme) => ({
          xs: theme.customShadows.card,
          md: `-40px 40px 80px 0px ${alpha(
            theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
            0.16
          )}`,
        }),
        ...sx,
      }}
      {...other}
    >
      {isCurrentPlan && (
        <Label color="success" sx={{ mt: -3, mb: -2 }}>
          Active Plan
        </Label>
      )}

      {renderSubscription}
      {renderPrice}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderList}

      <Divider
        sx={{
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
          borderColor: 'rgba(145, 158, 171, 0.2)',
          mb: 0,
        }}
      />

      <Stack spacing={2} sx={{ pt: 0 }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={isCurrentPlan || isFreePlan} // ⬅️ here
          sx={{
            backgroundColor: isCurrentPlan ? 'success.main' : '#0040D8',
            color: '#fff',
            '&:hover': {
              backgroundColor: isCurrentPlan ? 'success.dark' : '#0033aa',
            },
          }}
          onClick={() => {
            if (!isCurrentPlan && !isFreePlan) {
              if (!user) {
                sessionStorage.setItem('redirectAfterLogin', paths.payment(id));
                navigate(paths.auth.jwt.login);
              } else {
                navigate(paths.payment(id));
              }
            }
          }}
        >
          {buttonLabel}
        </Button>
      </Stack>
    </Stack>
  );
}

PricingCard.propTypes = {
  card: PropTypes.object,
  sx: PropTypes.object,
};
