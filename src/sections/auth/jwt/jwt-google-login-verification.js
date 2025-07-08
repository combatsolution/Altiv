// import { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useAuthContext } from 'src/auth/hooks';
// import { SplashScreen } from 'src/components/loading-screen';
// import { paths } from 'src/routes/paths';

// export default function GoogleLoginView() {
//   const navigate = useNavigate();  
//   const [searchParams] = useSearchParams();
//   const [userData, setUserData] = useState(null);
//   const { googleLogin } = useAuthContext();

//   useEffect(() => {
//     const accessToken = searchParams.get('accessToken');
//     const userProfileRaw = searchParams.get('userProfile');

//     let userProfile = null;
//     try {
//       if (userProfileRaw) {
//         userProfile = JSON.parse(decodeURIComponent(userProfileRaw));
//       }
//     } catch (err) {
//       console.error('Failed to parse userProfile:', err);
//       navigate(`${paths.auth.jwt.login}?googleError=true&errorMessage=authentication failed`, {
//         replace: true,
//       });
//     }

//     if (accessToken && userProfile) {
//       setUserData({ accessToken, userProfile });
//     } else {
//         navigate(`${paths.auth.jwt.login}?googleError=true&errorMessage=authentication failed`, {
//         replace: true,
//       });
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]);

//   useEffect(() => {
//     if (userData) {
//       googleLogin(userData.accessToken, userData.userProfile);
//       navigate('/', { replace: true });
//     } 
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userData]);

//   return null;
// }



// GoogleLoginView.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuthContext } from 'src/auth/hooks';
import { paths } from 'src/routes/paths';
import { PATH_AFTER_LOGIN } from 'src/config-global';

export default function GoogleLoginView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { googleLogin } = useAuthContext();

  const [userData, setUserData] = useState(null);

  /* ── 1.  Read query params coming back from Google OAuth ─────────────── */
  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const userProfileRaw = searchParams.get('userProfile');

    let userProfile = null;
    if (userProfileRaw) {
      try {
        userProfile = JSON.parse(decodeURIComponent(userProfileRaw));
      } catch (err) {
        console.error('Failed to parse userProfile:', err);
      }
    }

    if (accessToken && userProfile) {
      setUserData({ accessToken, userProfile });
    } else {
      // Missing or bad params → return to login with error flag
      navigate(
        `${paths.auth.jwt.login}?googleError=true&errorMessage=authentication failed`,
        { replace: true }
      );
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── 2.  Once we have the data, finish login and redirect ────────────── */
  useEffect(() => {
    if (!userData) return;

    // Save auth data in context
    googleLogin(userData.accessToken, userData.userProfile);

    // Decide where to go next
    const redirectAfterLogin = sessionStorage.getItem('redirectAfterLogin');
    const returnTo = searchParams.get('returnTo');

    if (redirectAfterLogin) sessionStorage.removeItem('redirectAfterLogin');

    navigate(
      redirectAfterLogin ||          // e.g. /payment/:id (PricingCard flow)
      returnTo            ||         // ?returnTo=/something
      PATH_AFTER_LOGIN,              // fallback dashboard
      { replace: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // Nothing visual for this view
  return null;
}