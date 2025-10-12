

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Stack, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'src/auth/hooks';
import axiosInstance from 'src/utils/axios';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';

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
        if (response?.data) {
          const courseNames = response.data
            .filter((sub) => sub?.status === 'success')
            .map((sub) => sub?.planData?.courses?.courseName)
            .filter(Boolean);

          setSubscriptions(response.data);
          setCourseData(courseNames);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();
  }, []);

  const {
    id,
    courses: {
      courseName,
      heading,
      description,
      features = [],
      keyOutComes = [],
    } = {},
    price,
    paymentType,
    access,
  } = card;

  const isCurrentPlan = activePlan === id;
  const isAlreadyPurchased = courseData.includes(courseName);

  let buttonLabel = 'Pay Now';
  if (isCurrentPlan) buttonLabel = 'Current Plan';
  else if (access || price === 0) buttonLabel = 'Free';
  else if (isAlreadyPurchased) buttonLabel = 'Already Purchased';

  return (
    <Stack
      spacing={2}
      sx={{
        px:30,
        position: 'relative',
        p: { xs: 2.5, sm: 3  },
        borderRadius: 3,
        // boxShadow: 4,
        bgcolor: 'background.paper',
        width: { xs: '100%', sm: 360, md: 365 },
        height: { xs: 'auto', sm: 560, md:645 }, // ✅ uniform card height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',  
        '&:hover': { transform: 'translateY(-2px)' },
        textAlign: { xs: 'center', md: 'left' },
        ...sx,
      }}
      {...other}
    >
      {/* Top Gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '28%',
          bgcolor: 'primary.main',
          zIndex: 0,
          
        }}
      />

      {/* Foreground Content */}
      <Box sx={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Price Tag */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            px: 2,
            py: 1,
            borderRadius: '20px',
            bgcolor: 'success.main',
            color: 'common.white',
            fontWeight: 600,
            fontSize: { xs: 12, sm: 14 },
          }}
        >
          {access ? 'Free' : `${price}${paymentType === 'monthly' ? '/mo' : ''}`}
        </Box>

        {/* Title */}
        <Stack spacing={0.5} alignItems={{ xs: 'center', sm: 'flex-start' }} sx={{ mt: 1.5, mb: 1 }}>
          {heading && (
            <Typography variant="subtitle2" color="common.white">
              {heading}
            </Typography>
          )}
          <Typography

            variant="h6"
            fontWeight={700}
            color="common.white"
            sx={{ width:{xs:'600px', md:'300px'},
              fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
          >
            {courseName}
          </Typography>
        </Stack>

        {/* Description */}
        {description && (
          <Box
            sx={{
              color: 'common.white',
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              maxWidth: '90%',
              '& p': { margin: 0 },
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        <Divider sx={{ my: 2, pb:1 }} />

        {/* Features */}  
        {features?.length > 0 && (
          <Stack spacing={1} alignItems={{ xs: 'center', sm: 'flex-start' }}>
            {features.map((feature, i) => 
            (
              <Stack key={i} direction="row" spacing={1} alignItems="center"  >
                <Iconify icon="eva:checkmark-fill" width={18} sx={{ color: 'success.main' }} />
                <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
                  {feature}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}

        {/* Key Outcomes */}
        {Array.isArray(keyOutComes) && keyOutComes.length > 0 && (
          <Box
            sx={{
              bgcolor: 'grey.200',
              p: { xs: 1.5, sm: 2 },
              borderRadius: 1,
              mt: 2,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} color="black">
              Key Outcomes:
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Stack spacing={0.5}>
              {keyOutComes.map((outcome, idx) => (
                <Typography
                  key={idx}
                  variant="body2"
                  sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                >
                  • {outcome.heading}
                </Typography>
              ))}
            </Stack>
          </Box>
        )}

        {/* Push Button to Bottom */}
        <Box sx={{ flexGrow: 1 }} />
      </Box>


      {/* 🔘 CTA Buttons Side by Side */}
      <Stack direction="row" spacing={1.5} sx={{ mt: 'auto' }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={isCurrentPlan || access || isAlreadyPurchased || price === 0}
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
            bgcolor: isCurrentPlan ? 'success.main' : 'primary.main',
            '&:hover': { bgcolor: isCurrentPlan ? 'success.dark' : 'primary.dark' },
          }}
          onClick={() => {
            if (!user) navigate(paths.auth.jwt.login);
            else navigate('/payment');
          }}
        >
          {buttonLabel}
        </Button>

        <Button
          fullWidth
          size="large"
          variant="outlined"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
            color: 'primary.main',
            borderColor: 'primary.main',
            bgcolor: 'common.white',
            '&:hover': {
              bgcolor: 'primary.lighter',
              borderColor: 'primary.dark',
            },
          }}
          // onClick={() => navigate(`/plans/${card.id}`)}
          onClick={() => navigate(`/pricing-detail/${id}`)}
        >
          Learn More
        </Button>
      </Stack>
    </Stack>
  );
}

PricingCard.propTypes = {
  card: PropTypes.object.isRequired,
  sx: PropTypes.object,
};
