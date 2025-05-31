import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
// hooks
import { useCountdownDate } from 'src/hooks/use-countdown';
import { ComingSoonIllustration } from 'src/assets/illustrations';


// ----------------------------------------------------------------------

export default function ComingSoonView() {
  const { days, hours, minutes, seconds } = useCountdownDate(new Date('07/07/2024 21:30'));

  return (
    <>
      <Box
  sx={{
    minHeight: '20vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    px: 2, // padding for small screens
  }}
>
  <Typography
    variant="h3"
    component="h1"
    sx={{
      fontWeight: 'bold',
      fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
     
    }}
  >
    Coming Soon!
  </Typography>

  <Typography
    sx={{
      color: 'text.secondary',
      fontSize: { xs: '1rem', sm: '1.25rem' },
      maxWidth: 600,
    }}
  >
    We are currently working hard on this page!
  </Typography>
</Box>

      <ComingSoonIllustration sx={{ my:3, height: 240 }} />

      <Stack
        direction="row"
        justifyContent="center"
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: 'h2' }}
      >
        <TimeBlock label="Days" value={days} />

        <TimeBlock label="Hours" value={hours} />

        <TimeBlock label="Minutes" value={minutes} />

        <TimeBlock label="Seconds" value={seconds} />
      </Stack>

       <TextField
    placeholder="Enter your email"
    sx={{ my: 5, width: 400 , mx:"75vh"}} 
    InputProps={{
      endAdornment: (
        <InputAdornment position="center">
          <Button variant="contained" size="large">
            Notify Me
          </Button>
        </InputAdornment>
      ),
      sx: {
        pr: 0.5,
        [`&.${outlinedInputClasses.focused}`]: {
          boxShadow: (theme) => theme.customShadows.z20,
          transition: (theme) =>
            theme.transitions.create(['box-shadow'], {
              duration: theme.transitions.duration.shorter,
            }),
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
          },
        },
      },
    }}
  />

      {/* <Stack spacing={1} alignItems="center" justifyContent="center" direction="row">
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack> */}
    </>
  );
}

// ----------------------------------------------------------------------

function TimeBlock({ label, value }) {
  return (
    <div>
      <Box> {value} </Box>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}

TimeBlock.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
