// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { alpha } from '@mui/material/styles';
// import { Box, Stack, Button, Divider, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// import { paths } from 'src/routes/paths';
// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';
// import { useAuthContext } from 'src/auth/hooks';
// import axiosInstance from 'src/utils/axios';


// export default function PricingCard({ card, sx, ...other }) {
//   const navigate = useNavigate();
//   const { user } = useAuthContext();

//   const [activePlan, setActivePlan] = useState(null);
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [courseData, setCourseData] = useState([]);

//   useEffect(() => {
//     if (user?.currentPlanId) {
//       setActivePlan(user.currentPlanId);
//     }
//   }, [user]);

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await axiosInstance.get(`/subscriptions/user`);
//         console.log('Fetched Plans:', response.data);
//         if (response?.data) {
//           // Filter subscriptions with status === 'success' and extract course names
//           const courseNames = response.data
//             .filter((sub) => sub?.status === 'success')
//             .map((sub) => sub?.planData?.courses?.courseName)
//             .filter(Boolean); // removes undefined/null course names

//           setSubscriptions(response.data); // keep all subscriptions if needed
//           setCourseData(courseNames); // save only course names with 'success' status
//         }
//       } catch (error) {
//         console.error('Error fetching plans:', error);
//       }
//     };
//     fetchPlans();
//   }, []);

//   useEffect(() => {
//     if (subscriptions?.length > 0) {
//       const courses = subscriptions
//         .map((sub) => sub?.planData?.courses?.courseName)
//         .filter(Boolean);
//       setCourseData(courses);
//     }
//   }, [subscriptions]);
//    console.log('Course Data:', courseData);

//   const { id, courses = {}, price, paymentType, recurringPeriod, access, features } = card;

//   const isCurrentPlan = activePlan === id;
//   const isAlreadyPurchased = courseData.includes(courses?.courseName);

//   let buttonLabel = 'Pay Now';

//   if (isCurrentPlan) {
//     buttonLabel = 'Current Plan';
//   } else if (access) {
//     buttonLabel = 'Free';
//   } else if (isAlreadyPurchased) {
//     buttonLabel = 'Already Purchased';
//   } else if (price === 0) {
//     buttonLabel = 'Free';
//   }

//   const renderSubscription = (
//     <Stack spacing={1} display="flex" alignItems="center" width="100%">
//       <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
//         {courses?.courseName || 'Course'}
//       </Typography>
//       <Box width="100%" display="flex" justifyContent="center">
//         <Typography variant="subtitle2" align="center" color="success.lighter">
//           {courses?.courseName}
//         </Typography>
//       </Box>
//     </Stack>
//   );

//   const renderPrice = access ? (
//     <Typography variant="h2" sx={{ mb: 0 }}>
//       Free
//     </Typography>
//   ) : (
//     <Stack direction="column" justifyContent="center" alignItems="flex-end">
//       <Stack direction="row" justifyContent="center" alignItems="center">
//         <Typography variant="h4" sx={{ mr: 1 }}>
//           ₹
//         </Typography>
//         <Typography variant="h2" color="primary" sx={{ mr: 2 }}>
//           {price}
//         </Typography>
//       </Stack>
//       <Typography
//         component="span"
//         sx={{
//           alignSelf: 'center',
//           color: 'text.disabled',
//           ml: 1,
//           typography: 'body2',
//         }}
//       > 
//         {paymentType === 'oneTime' ? 'One Time Payment' : recurringPeriod}
//       </Typography>
//     </Stack>
//   );

//   const renderList = (
//     <Stack spacing={2} sx={{ width: '100%', mt: -3 }}>
//       <Stack direction="row" alignItems="center" justifyContent="space-between">
//         <Box component="span" sx={{ typography: 'overline' }}>
//           Features
//         </Box>
//       </Stack>
//       <Stack spacing={1}>
//         {features?.length ? (
//           features.map((feature, idx) => (
//             <Stack direction="row" spacing={1} key={idx}>
//               <Iconify icon="eva:checkmark-fill" width={20} sx={{ color: 'green' }} />
//               <Typography variant="body2">{feature}</Typography>
//             </Stack>
//           ))
//         ) : (
//           <>
//             <Stack direction="row" spacing={1}>
//               <Iconify icon="eva:checkmark-fill" width={20} sx={{ color: 'green' }} />
//               <Typography variant="body2">Fast performance</Typography>
//             </Stack>
//             <Stack direction="row" spacing={1}>
//               <Iconify icon="eva:checkmark-fill" width={20} sx={{ color: 'green' }} />
//               <Typography variant="body2">User-friendly interface</Typography>
//             </Stack>
//             <Stack direction="row" spacing={1}>
//               <Iconify icon="eva:checkmark-fill" width={20} sx={{ color: 'green' }} />
//               <Typography variant="body2">Secure data handling</Typography>
//             </Stack>
//           </>
//         )}
//       </Stack>
//     </Stack>
//   );

//   return (
//     <Stack
//       spacing={2}
//       alignItems="center"
//       sx={{
//         p: 4,
//         height: '100%',
//         borderRadius: 2,
//         boxShadow: (theme) => ({
//           xs: theme.customShadows.card,
//           md: `-40px 40px 80px 0px ${alpha(
//             theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
//             0.16
//           )}`,
//         }),
//         ...sx,
//       }}
//       {...other}
//     >
//       {isCurrentPlan && (
//         <Label color="success" sx={{ mt: -3, mb: -2 }}>
//           Active Plan
//         </Label>
//       )}

//       {renderSubscription}
//       {renderPrice}
//       <Divider sx={{ borderStyle: 'dashed' }} />
//       {renderList}
//       <Divider
//         sx={{
//           width: '100%',
//           maxWidth: 1000,
//           mx: 'auto',
//           borderColor: 'rgba(145, 158, 171, 0.2)',
//           mb: 0,
//         }}
//       />
//       <Stack spacing={2} sx={{ pt: 0 }}>
//         <Button
//           fullWidth
//           size="large"
//           variant="contained"
//           disabled={isCurrentPlan || access || isAlreadyPurchased || price === 0}
//           sx={{
//             backgroundColor: isCurrentPlan ? 'success.main' : '#0040D8',
//             color: '#fff',
//             '&:hover': {
//               backgroundColor: isCurrentPlan ? 'success.dark' : '#0033aa',
//             },
//           }}
//           onClick={() => {
//             if (!isCurrentPlan && !access) {
//               if (!user) {
//                 sessionStorage.setItem('redirectAfterLogin', paths.payment(id));
//                 navigate(paths.auth.jwt.login);
//               } else {
//                 sessionStorage.setItem('planId', id);
//                 navigate(paths.payment);
//               }
//             }
//           }}
//         >
//           {buttonLabel}
//         </Button>
//       </Stack>
//     </Stack>
//   );
// }

// PricingCard.propTypes = {
//   card: PropTypes.object.isRequired,
//   sx: PropTypes.object,
// };

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Stack, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'src/auth/hooks';
import axiosInstance from 'src/utils/axios';
import Iconify from 'src/components/iconify';

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

  // ✅ Destructure card safely
  const {
    id,
    courses: {
      courseName,
      heading,
      description,
      features = [],
      keyOutcomes = [],
    } = {},
    price,
    paymentType,
    recurringPeriod,
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
      spacing={{ xs: 2, sm: 3 }}
      sx={{
        position: 'relative',
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'background.paper',
        width: '100%',
        maxWidth: { xs: '100%', sm: 380, md: 420 },
        minHeight: { xs: 'auto', sm: 420 },
        textAlign: { xs: 'center', sm: 'left' },
        overflow: 'hidden',
        ...sx,
      }}
      {...other}
    >
      {/* 🔵 Gradient background only at the top */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '30%', // adjust height as needed
          background: 'linear-gradient(90deg, #4B69E9 5%, #00A3FF 100%)',

          zIndex: 0,
        }}
      />

      {/* 🔲 Foreground content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Price pill */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 8, sm: 2, },
            right: { xs: 8, sm: 2, md: 2 },
            px: { xs: 1, sm: 2 },
            py: 0.5,
            borderRadius: '24px',
            bgcolor: 'success.main',
            color: 'common.white',
            fontWeight: 600,
            fontSize: { xs: 12, sm: 14 },
          }}
        >
          {access ? 'Free' : `₹${price}${paymentType === 'monthly' ? '/mo' : ''}`}
        </Box>

        {/* Title + tagline */}
        <Stack
          spacing={0.5}
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          sx={{ mb: 1, mt: 1 }}
        >
          {heading && (
            <Typography variant="subtitle2" color="common.white">
              {heading}
            </Typography>
          )}
          <Typography
            variant="h6"
            fontWeight={700}
            color="common.white"
            sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
          >
            {courseName}
          </Typography>

        </Stack>

        {/* Description */}
        {description && (
          <Typography
            variant="body2"
            color="common.white"
            sx={{
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              maxWidth: '90%',

            }}
          >
            {description}
          </Typography>
        )}
      </Box>

      {/* Add space after the gradient section */}
      <Box sx={{ mt: { xs: 6, sm: 8 } }} />

      <Divider sx={{ my: 2 }} />

      {/* Features */}
      {features.length > 0 && (
        <Stack spacing={1} alignItems={{ xs: 'center', sm: 'flex-start' }}>
          {features.map((feature, i) => (
            <Stack
              key={i}
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
              <Iconify
                icon="eva:checkmark-fill"
                width={18}
                sx={{ color: 'success.main' }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
              >
                {feature}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}

      {/* Key Outcomes */}
      {keyOutcomes.length > 0 && (
        <Box
          sx={{
            width: '100%',
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
            {keyOutcomes.map((o, idx) => (
              <Typography
                key={idx}
                variant="body2"
                sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
              >
                • {o}
              </Typography>
            ))}
          </Stack>
        </Box>
      )}

      <Box sx={{ flexGrow: 1 }} />

      {/* CTA Button */}
      <Button
        fullWidth
        size="large"
        variant="contained"
        disabled={isCurrentPlan || access || isAlreadyPurchased || price === 0}
        sx={{
          fontSize: { xs: '0.85rem', sm: '1rem' },
          bgcolor: isCurrentPlan ? 'success.main' : 'primary.main',
          '&:hover': {
            bgcolor: isCurrentPlan ? 'success.dark' : 'primary.dark',
          },
          mt: 2,
        }}
        onClick={() => navigate('/payment')}
      >
        {buttonLabel}
      </Button>
    </Stack>
  );


}

PricingCard.propTypes = {
  card: PropTypes.object.isRequired,
  sx: PropTypes.object,
};
