import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// assets
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from 'src/assets/icons';

// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import { List } from 'src/components/organizational-chart/organizational-chart';
import axiosInstance from 'src/utils/axios';
import { Category } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function PricingCard({ card, sx, ...other }) {
  
  const navigate = useNavigate();
  const { id, planName, price, paymentType, recurringPeriod, isFreePlan, subTitle, features } = card;

  const userCountry = 'IN'; // Replace this with real logic from profile or IP geo lookup
  const paymentMethod = userCountry === 'IN' ? 1 : 0;


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
    <Typography variant="h2">Free</Typography>
  ) : (
    <Stack direction="column" justifyContent="center" alignItems="flex-end">
      <Stack direction="row" justifyContent="center" alignItems="flex-end">
        <Typography
          variant="h4"
          sx={{ alignSelf: 'center', mr: 1, ml: 1, typography: 'body2' }}
        >
          ₹
        </Typography>
        <Typography variant="h2" color="primary">
          {price}
        </Typography>
      </Stack>
      <Typography
        component="span"
        sx={{ alignSelf: 'center', color: 'text.disabled', ml: 1, typography: 'body2' }}
      >
        {paymentType === 'oneTime' ? 'One Time Payment' : recurringPeriod}
      </Typography>
    </Stack>
  );

  const commonListStyle = {
    typography: 'body2',
    alignItems: 'center',
  };

  const commonIconStyle = {
    color: 'green',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const renderList = (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span" sx={{ typography: 'overline' }}>
          Features
        </Box>
        <Link variant="body2" color="inherit" underline="always">
          All
        </Link>
      </Stack>
      {/* {lists.map((item) => (
        <Stack key={item} direction="row" spacing={1} sx={commonListStyle}>
          <Iconify icon="eva:checkmark-fill" width={20} sx={commonIconStyle} />
          {item}
        </Stack>
      ))} */}
    </Stack>
  );

  const renderList2 = (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Stack direction="row" alignItems="left" justifyContent="space-between">
        {/* <Box component="span" sx={{ typography: 'overline' }}>
          Outcomes
        </Box> */}
      </Stack>
      {/* {outcomes.map((item) => (
        <Stack key={item} direction="row" spacing={1} sx={commonListStyle}>
          <Iconify icon="eva:checkmark-fill" width={20} sx={commonIconStyle} />
          {item}
        </Stack>
      ))} */}
    </Stack>
  );

  return (
    <Stack
      spacing={5}
      alignItems="center"
      sx={{
        p: 5,
        height: '100%',
        borderRadius: 2,
        boxShadow: (theme) => ({
          xs: theme.customShadows.card,
          md: 'none',
        }),
        ...(isFreePlan && {
          borderTopRightRadius: { md: 0 },
          borderBottomRightRadius: { md: 0 },
        }),
        ...((isFreePlan || !isFreePlan) && {
          boxShadow: (theme) => ({
            xs: theme.customShadows.card,
            md: `-40px 40px 80px 0px ${alpha(
              theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
              0.16
            )}`,
          }),
        }),
        ...sx,
      }}
      {...other}
    >
      {/* {renderIcon} */}
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
          mb: 1,
        }}
      />
      {renderList2}
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={isFreePlan}
          sx={{
            backgroundColor: '#0040D8',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#0033aa',
            },  
          }}
          onClick={() => navigate(paths.payment(id))}      
        >
          Pay Now
        </Button>

        
      </Stack>
    </Stack>
  );
}

PricingCard.propTypes = {
  card: PropTypes.object,
  sx: PropTypes.object,
};
