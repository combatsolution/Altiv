import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

export const links = [


  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about-us', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.7 },

  
  { url: '/faqs', changefreq: 'yearly', priority: 0.5 },
  
  // FOBO & Resume
  { url: '/fobo', changefreq: 'monthly', priority: 0.6 },
  { url: '/resume-view', changefreq: 'monthly', priority: 0.6 },
  { url: '/Profile', changefreq: 'monthly', priority: 0.6 },
  { url: '/dashboard-page', changefreq: 'weekly', priority: 0.6 }, // Dynamic, so base route only

  // Career / Jobs
  { url: '/job-details', changefreq: 'weekly', priority: 0.6 },
  { url: '/career-campass', changefreq: 'monthly', priority: 0.6 },
  { url: '/career-title', changefreq: 'monthly', priority: 0.6 },
  { url: '/job-feed', changefreq: 'daily', priority: 0.8 },

  // Subscription
  { url: '/subscription', changefreq: 'monthly', priority: 0.6 },
  { url: '/successpage', changefreq: 'yearly', priority: 0.4 },

  // Legal / Info
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.5 },
  { url: '/attributions', changefreq: 'yearly', priority: 0.5 },
  { url: '/ai-training-policy', changefreq: 'yearly', priority: 0.5 },
  { url: '/termsandconditions', changefreq: 'yearly', priority: 0.5 },

  // Other
  { url: '/coming-soon', changefreq: 'monthly', priority: 0.4 },
  { url: '/maintenance', changefreq: 'monthly', priority: 0.4 },
  { url: '/pricing', changefreq: 'monthly', priority: 0.6 },
  { url: '/payment', changefreq: 'monthly', priority: 0.6 },


  // login&Register
  { url: '/auth/jwt/login', changefreq: 'monthly', priority: 0.6 },
   { url: '/auth/jwt/register', changefreq: 'monthly', priority: 0.6 },

  
];

const stream = new SitemapStream({ hostname: 'https://alltiv.ai' });
const writeStream = fs.createWriteStream('./public/sitemap.xml');
stream.pipe(writeStream);

links.forEach(link => stream.write(link));
stream.end();

await streamToPromise(stream);
console.log('✅ Sitemap written to public/sitemap.xml');
