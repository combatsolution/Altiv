import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Stack, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { paths } from 'src/routes/paths';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import axiosInstance from 'src/utils/axios';
import { status } from 'nprogress';

export default function PricingCard({ card, sx, ...other }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [activePlan, setActivePlan] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    if (user?.currentPlanId) {
      setActivePlan(user.currentPlanId);
    }
  }, [user]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get(`/subscriptions/user`);
        console.log('Fetched Plans:', response.data);
        if (response?.data) {
          // Filter subscriptions with status === 'success' and extract course names
          const courseNames = response.data
            .filter((sub) => sub?.status === 'success')
            .map((sub) => sub?.planData?.courses?.courseName)
            .filter(Boolean); // removes undefined/null course names

          setSubscriptions(response.data); // keep all subscriptions if needed
          setCourseData(courseNames); // save only course names with 'success' status
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    if (subscriptions?.length > 0) {
      const courses = subscriptions
        .map((sub) => sub?.planData?.courses?.courseName)
        .filter(Boolean);
      setCourseData(courses);
    }
  }, [subscriptions]);
  console.log('Course Data:', courseData);

  const { id, courses = {}, price, paymentType, recurringPeriod, access, features } = card;

  const isCurrentPlan = activePlan === id;
  const isAlreadyPurchased = courseData.includes(courses?.courseName);

  let buttonLabel = 'Pay Now';

  if (isCurrentPlan) {
    buttonLabel = 'Current Plan';
  } else if (access) {
    buttonLabel = 'Free';
  } else if (isAlreadyPurchased) {
    buttonLabel = 'Already Purchased';
  } else if (price === 0) {
    buttonLabel = 'Free';
  }

  const renderSubscription = (
    <Stack spacing={1} display="flex" alignItems="center" width="100%">
      <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
        {courses?.courseName || 'Course'}
      </Typography>
      <Box width="100%" display="flex" justifyContent="center">
        <Typography variant="subtitle2" align="center" color="success.lighter">
          {courses?.courseName}
        </Typography>
      </Box>
    </Stack>
  );

  const renderPrice = access ? (
    <Typography variant="h2" sx={{ mb: 0 }}>
      Free
    </Typography>
  ) : (
    <Stack direction="column" justifyContent="center" alignItems="flex-end">
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h4" sx={{ mr: 1 }}>
          ₹
        </Typography>
        <Typography variant="h2" color="primary" sx={{ mr: 2 }}>
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
    <Stack spacing={2} sx={{ width: '100%', mt: -3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span" sx={{ typography: 'overline' }}>
          Features
        </Box>
      </Stack>
      <Stack spacing={1}>
        {features?.length ? (
          features.map((feature, idx) => (
            <Stack direction="row" spacing={1} key={idx}>
              <Iconify icon="eva:checkmark-fill" width={20} sx={{ color: 'green' }} />
              <Typography variant="body2">{feature}</Typography>
            </Stack>
          ))
        ) : (
          <>
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
          </>
        )}
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
          disabled={isCurrentPlan || access || isAlreadyPurchased || price === 0}
          sx={{
            backgroundColor: isCurrentPlan ? 'success.main' : '#0040D8',
            color: '#fff',
            '&:hover': {
              backgroundColor: isCurrentPlan ? 'success.dark' : '#0033aa',
            },
          }}
          onClick={() => {
            if (!isCurrentPlan && !access) {
              if (!user) {
                sessionStorage.setItem('redirectAfterLogin', paths.payment(id));
                navigate(paths.auth.jwt.login);
              } else {
                sessionStorage.setItem('planId', id);
                navigate(paths.payment);
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
  card: PropTypes.object.isRequired,
  sx: PropTypes.object,
};
