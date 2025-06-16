import { Helmet } from 'react-helmet-async';
// sections
import { GoogleLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Google: Login</title>
      </Helmet>

      <GoogleLoginView />
    </>
  );
}
