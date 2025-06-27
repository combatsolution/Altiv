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

// ----------------------------------------------------------------------

export default function PricingCard({ card, sx, ...other }) {
  const navigate = useNavigate();
  const { subscription, price, caption, lists, labelAction } = card;

  const basic = subscription === 'basic';

  const starter = subscription === 'starter';

  const premium = subscription === 'premium';

  const renderIcon = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box sx={{ width: 48, height: 48 }}>
        {basic && <PlanFreeIcon />}
        {starter && <PlanStarterIcon />}
        {premium && <PlanPremiumIcon />}
      </Box>

      {starter && <Label color="info">POPULAR</Label>}
    </Stack>
  );

  const renderSubscription = (
    <Stack spacing={1}>
      <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
        {subscription}
      </Typography>
      <Typography variant="subtitle2">{caption}</Typography>
    </Stack>
  );

  const renderPrice = basic ? (
    <Typography variant="h2">Free</Typography>
  ) : (
    <Stack direction="row" justifyContent="center" alignItems="flex-end">
      <Typography variant="h4">$</Typography>

      <Typography variant="h2" color="primary">
        {price}
      </Typography>

      <Typography
        component="span"
        sx={{ alignSelf: 'center', color: 'text.disabled', ml: 1, typography: 'body2' }}
      >
        / mo
      </Typography>
    </Stack>
  );

  const renderList = (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span" sx={{ typography: 'overline' }}>
          Features
        </Box>
        <Link variant="body2" color="inherit" underline="always">
          All
        </Link>
      </Stack>

      {lists.map((item) => (
        <Stack
          key={item}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            typography: 'body2',
          }}
        >
          <Iconify
            icon="eva:checkmark-fill"
            width={24}
            sx={{
              mr: 1,
              color: 'green',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.3) rotate(5deg)',
                boxShadow: '0 0 8px rgba(0, 128, 0, 0.6)',
              },
            }}
          />

          {item}
        </Stack>
      ))}
    </Stack>
  );
  const renderList2 = (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span" sx={{ typography: 'overline' }}>
          Outcomes
        </Box>
      </Stack>

      {lists.map((item) => (
        <Stack
          key={item}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            typography: 'body2',
          }}
        >
          <Iconify
            icon="eva:checkmark-fill"
            width={24}
            sx={{
              mr: 1,
              color: 'green',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.3) rotate(5deg)',
                boxShadow: '0 0 8px rgba(0, 128, 0, 0.6)',
              },
            }}
          />

          {item}
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Stack
      spacing={5}
      alignItems="center"
      textAlign="center"
      sx={{
        p: 5,
        height: '100%',
        borderRadius: 2,
        boxShadow: (theme) => ({
          xs: theme.customShadows.card,
          md: 'none',
        }),
        ...(starter && {
          borderTopRightRadius: { md: 0 },
          borderBottomRightRadius: { md: 0 },
        }),
        ...((starter || premium) && {
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
      {renderIcon}

      {renderSubscription}

      {renderPrice}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderList}

      {/* Transparent Grey Divider */}
      <Divider
        sx={{
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
          borderColor: 'rgba(145, 158, 171, 0.2)', // transparent grey
          mb: 1,
        }}
      />

      {renderList2}

      {/* Pay Now + Learn More buttons */}
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Button
          onClick={() => navigate(paths.payment)}
          fullWidth
          size="large"
          variant="contained"
          disabled={basic}
          sx={{
            backgroundColor: '#0040D8',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#0033aa',
            },
          }}
        >
          {labelAction}
        </Button>

        <Button
          fullWidth
          size="large"
          variant="outlined"
          onClick={() => navigate(`${paths.about}?plan=${subscription}`)}
          sx={{
            border: '1px solid #0040D8',
            color: '#0040D8',
            '&:hover': {
              backgroundColor: 'rgba(0, 64, 216, 0.04)', // light hover effect
              borderColor: '#0040D8',
            },
          }}
        >
          Learn More
        </Button>
      </Stack>
    </Stack>
  );
}

PricingCard.propTypes = {
  card: PropTypes.object,
  sx: PropTypes.object,
};
