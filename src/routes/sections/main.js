import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main';
import SimpleLayout from 'src/layouts/simple';
import CompactLayout from 'src/layouts/compact';
// components
import { SplashScreen } from 'src/components/loading-screen';
import { element } from 'prop-types';
import { RolesAuthRoute } from 'src/hooks/RolesAuthRoute';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
const Page500 = lazy(() => import('src/pages/500'));
const Page403 = lazy(() => import('src/pages/403'));
const Page404 = lazy(() => import('src/pages/404'));
const FaqsPage = lazy(() => import('src/pages/faqs'));
const AboutPage = lazy(() => import('src/pages/about-us'));
const ContactPage = lazy(() => import('src/pages/contact-us'));
const PricingPage = lazy(() => import('src/pages/pricing'));
const PaymentPage = lazy(() => import('src/pages/payment'));
const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));
const MaintenancePage = lazy(() => import('src/pages/maintenance'));
// PRODUCT
const ProductListPage = lazy(() => import('src/pages/product/list'));
const ProductDetailsPage = lazy(() => import('src/pages/product/details'));
const ProductCheckoutPage = lazy(() => import('src/pages/product/checkout'));
// BLOG
const PostListPage = lazy(() => import('src/pages/post/list'));
const PostDetailsPage = lazy(() => import('src/pages/post/details'));
// JOB DETAILS
const JobDetailsPage = lazy(() => import('src/pages/job-details/jobDetails'));
const CareerPathResumePage = lazy(() => import('src/pages/career/CareerCompassResume'));
const CareerPathTitlePage = lazy(() => import('src/pages/career/CareerCompassTitle'));

const JobFeedPage = lazy(() => import('src/pages/job-feed/JobFeedPage'));

const JobBoosterpage =lazy(()=> import ('src/pages/job-booster/jobbooster') )

// Payment
const SubscriptionData = lazy(() => import('src/pages/subscription/SubscriptionHistory'));
const Subscriptionsuccess = lazy(() => import('src/pages/subscription/SubscriptionSuccessPage'));

// FOBO
const FoboPage = lazy(() => import('src/pages/Fobo/fobo-view'));

const ProfilePage = lazy(() => import('src/pages/profile/Profile-view'));

const Analysis = lazy(() => import('src/pages/dashboard/dashboard-view'));
const Comingsoon = lazy(() => import('src/pages/Coming-soon/coming-view'));
// const ResumeViewPage = lazy(() => import('src/pages/Resume/resume-view'));
const Policy = lazy(() => import('src/pages/Policies/policies-view'));
const AboutUsPage = lazy(() => import('src/pages/Policies/about-us-page'));
const FaqPage = lazy(() => import('src/pages/Policies/faq-view'));
// const ContactUsPage =lazy(()=>import ('src/pages/Policies/contact-us-page'))
const AttributionsView = lazy(() => import('src/pages/Policies/attributions-view'));
const AitrainingpolicyView = lazy(() => import('src/pages/Policies/aItrainingpolicyview'));
const TermsCondition = lazy(() => import('src/pages/Policies/Terms&ConditionsPage'));
const Paymentdetails = lazy(() => import('src/sections/payment/view/payment-view'));
const ProductPricing = lazy(() => import('src/sections/pricing/view'));

// ---------------------------- -----------------------------------------

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [

      { path: 'attributions', element: <AttributionsView /> },
      { path: 'ai-training-policy', element: <AitrainingpolicyView /> },
      { path: 'about-us', element: <AboutUsPage /> },
      { path: 'contact-us', element: <ContactPage /> },
      { path: 'faqs', element: <FaqPage /> },
      { path: 'job-details', element: <JobDetailsPage /> },
      { path: 'job-details/:job_id', element: <JobDetailsPage /> },
      { path: 'career-compass', element: <CareerPathResumePage /> },
      { path: 'career-title', element: <CareerPathTitlePage /> },
      { path: 'job-feed', element: <JobFeedPage /> },
      {path:'job-booster', element:<JobBoosterpage/>},
      {path:'job-booster/:job_id', element:<JobBoosterpage/>},
      // { path: 'job-board/:job_id', element: <JobBoard /> },
      { path: 'subscription', element: <SubscriptionData /> },
      // { path: 'successpage', element: <Subscriptionsuccess /> },
       { path: 'payment/success', element: <Subscriptionsuccess /> },
      
      { path: 'termsandconditions', element: <TermsCondition /> },

      { path: 'fobo', element: <FoboPage /> },


      {
        path: 'Profile',
        element: (
          <RolesAuthRoute roles={['customer'] || ['admin']}>
            <ProfilePage />
          </RolesAuthRoute>
        ),
      },
  
      { path: 'coming-soon/:type', element: <Comingsoon /> },
      { path: 'Analysis', element: <Analysis /> },
      { path: 'coming-soon', element: <Comingsoon /> },
      //  {path: 'resume-view', element: < ResumeViewPage/>},
      { path: 'privacy-policy', element: <Policy /> },

      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'checkout/:planId', element: <ProductCheckoutPage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <PostListPage />, index: true },
          { path: 'list', element: <PostListPage /> },
          { path: ':title', element: <PostDetailsPage /> },
        ],
      },

      {
        children: [
           { path: 'payment', element: <Paymentdetails /> },
           { path: 'payment/plan', element: <PaymentPage /> },   // ⬅︎ move it here
        ],
      },

      {
        children: [
          { path: 'pricing', element: <ProductPricing /> },
          { path: 'pricing/:type', element: <ProductPricing /> },   // ⬅︎ move it here
        ],
      }
    ],

    
      
    
  },
  {
    element: (
      <SimpleLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </SimpleLayout>
    ),
    children: [
      { path: 'pricing', element: <PricingPage /> },
      { path: 'payment/:planId', element: <PaymentPage /> },
    ],
  },
  {
    element: (
      <CompactLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </CompactLayout>
    ),
    children: [
     
      { path: 'maintenance', element: <MaintenancePage /> },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];
