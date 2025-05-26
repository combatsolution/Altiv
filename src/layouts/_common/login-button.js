import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
// routes
import { RouterLink } from 'src/routes/components';
// config
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function LoginButton({ sx }) {
  return (
    <Button component={RouterLink} href={paths.auth.jwt.login} variant="none" sx={{ mr: 1, ...sx,  color: "#0040D8", }}>
      Login
    </Button>
  );
}

LoginButton.propTypes = {
  sx: PropTypes.object,
};
