import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
// routes
import { RouterLink } from 'src/routes/components';
// config
import { paths } from 'src/routes/paths';
import { trackEvent } from 'src/utils/google-analytics';

// ----------------------------------------------------------------------

export default function LoginButton({ sx }) {
  return (
    <Button component={RouterLink} href={paths.auth.jwt.login} variant="none" sx={{ mr: 1, ...sx, color: "#0040D8", }}
      onClick={() => trackEvent({
        category: 'Navigation',
        action: 'button clicked',
        label: 'Login',
        value: 'login-page'
      })}>
      Login
    </Button>
  );
}

LoginButton.propTypes = {
  sx: PropTypes.object,
};
