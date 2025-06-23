import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about-us', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.7 },

  // Additional pages
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.5 },
  { url: '/attributions', changefreq: 'yearly', priority: 0.5 },
  { url: '/ai-training-policy', changefreq: 'yearly', priority: 0.5 },
  { url: '/termsandconditions', changefreq: 'yearly', priority: 0.5 },

  // Career/Job related
  { url: '/job-details', changefreq: 'weekly', priority: 0.6 },
  { url: '/career-resume', changefreq: 'monthly', priority: 0.6 },
  { url: '/career-title', changefreq: 'monthly', priority: 0.6 },
  { url: '/job-feed', changefreq: 'daily', priority: 0.8 },

  // Subscription-related
  { url: '/subscription', changefreq: 'monthly', priority: 0.6 },
  { url: '/successpage', changefreq: 'yearly', priority: 0.4 },

  
];
const stream = new SitemapStream({ hostname: 'https://alltiv.ai' });
const writeStream = fs.createWriteStream('./public/sitemap.xml');
stream.pipe(writeStream);

links.forEach(link => stream.write(link));
stream.end();

await streamToPromise(stream);
console.log('✅ Sitemap written to public/sitemap.xml');
