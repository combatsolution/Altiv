import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { GuestGuard } from 'src/auth/guard';
// layouts
import CompactLayout from 'src/layouts/compact';
import AuthClassicLayout from 'src/layouts/auth/classic';
// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// AMPLIFY
// const AmplifyLoginPage = lazy(() => import('src/pages/auth/amplify/login'));
// const AmplifyRegisterPage = lazy(() => import('src/pages/auth/amplify/register'));
// const AmplifyVerifyPage = lazy(() => import('src/pages/auth/amplify/verify'));
// const AmplifyNewPasswordPage = lazy(() => import('src/pages/auth/amplify/new-password'));
// const AmplifyForgotPasswordPage = lazy(() => import('src/pages/auth/amplify/forgot-password'));

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const GoogleLoginPage = lazy(() => import('src/pages/auth/jwt/googleLogin'));

// FIREBASE
// const FirebaseLoginPage = lazy(() => import('src/pages/auth/firebase/login'));
// const FirebaseRegisterPage = lazy(() => import('src/pages/auth/firebase/register'));
// const FirebaseVerifyPage = lazy(() => import('src/pages/auth/firebase/verify'));
// const FirebaseForgotPasswordPage = lazy(() => import('src/pages/auth/firebase/forgot-password'));

//  AUTH0
// const Auth0LoginPage = lazy(() => import('src/pages/auth/auth0/login'));
// const Auth0Callback = lazy(() => import('src/pages/auth/auth0/callback'));

// ----------------------------------------------------------------------

// const authAmplify = {
//   path: 'amplify',
//   element: (
//     <GuestGuard>
//       <Suspense fallback={<SplashScreen />}>
//         <Outlet />
//       </Suspense>
//     </GuestGuard>
//   ),
//   children: [
//     {
//       path: 'login',
//       element: (
//         <AuthClassicLayout>
//           <AmplifyLoginPage />
//         </AuthClassicLayout>
//       ),
//     },
//     {
//       path: 'register',
//       element: (
//         <AuthClassicLayout title="Manage the job more effectively with Minimal">
//           <AmplifyRegisterPage />
//         </AuthClassicLayout>
//       ),
//     },
//     {
//       element: (
//         <CompactLayout>
//           <Outlet />
//         </CompactLayout>
//       ),
//       children: [
//         { path: 'verify', element: <AmplifyVerifyPage /> },
//         { path: 'new-password', element: <AmplifyNewPasswordPage /> },
//         { path: 'forgot-password', element: <AmplifyForgotPasswordPage /> },
//       ],
//     },
//   ],
// };

const authJwt = {
  path: 'jwt',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout subtitle='Login'>
          <JwtLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout title="Manage the job more effectively with Minimal" subtitle="Register">
          <JwtRegisterPage />
        </AuthClassicLayout>
      ),
    },
  ],
};

const authGoogle = {
  path: 'google',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <GoogleLoginPage />
      </Suspense>
    </GuestGuard>
  ),
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authJwt, authGoogle],
  },
];
